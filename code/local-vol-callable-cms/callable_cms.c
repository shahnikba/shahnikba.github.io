/*
 * callable_cms.c
 *
 * Monte Carlo accompanying the note
 *   "What local volatility forgets — a callable CMS in two models"
 *   https://shahnikba.github.io/writing/local-vol-callable-cms
 *
 * One stochastic-vol model is taken as the truth:
 *
 *   dS = sigma_t S dW,   d sigma = kappa(theta - sigma)dt + xi dZ,   dW dZ = rho dt
 *
 * We calibrate a local-vol model to it so that the two share every European
 * price, then ask what they disagree about. The local-vol surface is the
 * Dupire local volatility, obtained through its conditional-expectation form
 * (Gyongy's projection),
 *
 *   sigma_loc^2(S,t) = E[ sigma_t^2 | S_t = S ],
 *
 * estimated by binning sigma^2 against the level along the paths. By
 * construction this reproduces the terminal marginal at every date, so every
 * European option reprices; we check that, then price a callable CMS.
 *
 *   coupon strip / European smile  -> MATCH  (marginal is reproduced)
 *   callable CMS / embedded call    -> DIFFER (path / forward vol matters)
 *
 * Build & run:
 *   cc -O2 -o callable_cms callable_cms.c -lm && ./callable_cms
 *
 * Fixed seeds -> reproducible.
 */

#include <stdio.h>
#include <stdlib.h>
#include <math.h>

/* ---- time grid -------------------------------------------------------- */
#define YEARS 5
#define SPY   40                 /* substeps per year */
#define STEPS (YEARS * SPY)      /* 200 nodes */
#define DT    (1.0 / SPY)        /* 0.025y */

/* ---- level grid for the leverage surface ------------------------------ */
#define NK    60
#define K_MIN 0.0
#define K_MAX 0.12
#define DK    ((K_MAX - K_MIN) / NK)
#define KMID(j) (K_MIN + ((j) + 0.5) * DK)

/* ---- product ---------------------------------------------------------- */
#define S0      0.03
#define BARRIER 0.035            /* issuer calls once the rate breaches this  */
#define OBS     (SPY / 2)        /* observed twice a year                     */
#define PERIOD  (OBS * DT)       /* accrual year-fraction per period          */

/* ---- Monte Carlo ------------------------------------------------------ */
#define N_CAL 500000
#define N_SIM 500000
#define HMIN  50.0               /* min cell count to trust a calibration bin */

/* ---- SV model (held fixed — the truth) -------------------------------- */
#define SIG0  0.15
#define KAPPA 0.5
#define THETA 0.15
#define XI    0.20
#define RHO   0.30

/* ---- reporting strikes ------------------------------------------------ */
static const double STRIKES[] = {0.020, 0.025, 0.030, 0.035, 0.040};
#define NREP ((int)(sizeof(STRIKES) / sizeof(STRIKES[0])))

/* Box-Muller, caching the second normal so we pay log()/trig once per two
 * draws. gaussian_reset() drops the cache so a reseed starts a clean stream. */
static int    g_have = 0;
static double g_cache = 0;
static void gaussian_reset(void) { g_have = 0; }

static double gaussian(void)
{
    if (g_have) { g_have = 0; return g_cache; }
    double u1 = ((double)rand() + 1) / (RAND_MAX + 2.0);
    double u2 = ((double)rand() + 1) / (RAND_MAX + 2.0);
    double r = sqrt(-2.0 * log(u1)), a = 2 * M_PI * u2;
    g_cache = r * sin(a); g_have = 1;
    return r * cos(a);
}

static int bin_of(double S)
{
    int b = (int)((S - K_MIN) / DK);
    if (b < 0) b = 0;
    if (b >= NK) b = NK - 1;
    return b;
}

static double SUM2[STEPS][NK];   /* sum of sigma^2 per (level, time) cell     */
static double CNT [STEPS][NK];   /* cell counts                               */
static double SL2 [STEPS][NK];   /* calibrated local variance                 */

/* Complete a partly-known variance surface: cells left at -1 are unknown.
 * Per time slice, interpolate interior gaps and extrapolate the sparse wings
 * by carrying the edge slope (in vol, not variance), then floor/cap. */
static void fill_surface(double S2[STEPS][NK])
{
    for (int k = 0; k < STEPS; k++) {
        double sig[NK];
        int lo = -1, hi = -1;
        for (int j = 0; j < NK; j++) {
            sig[j] = S2[k][j] >= 0 ? sqrt(S2[k][j]) : -1.0;
            if (sig[j] >= 0) { if (lo < 0) lo = j; hi = j; }
        }
        if (lo < 0) { for (int j = 0; j < NK; j++) S2[k][j] = THETA * THETA; continue; }

        for (int j = lo + 1, prev = lo; j <= hi; j++) {
            if (sig[j] < 0) continue;
            if (j > prev + 1)
                for (int m = prev + 1; m < j; m++)
                    sig[m] = sig[prev] + (sig[j] - sig[prev]) * (m - prev) / (double)(j - prev);
            prev = j;
        }
        double slopeLo = hi > lo ? sig[lo + 1] - sig[lo] : 0.0;
        double slopeHi = hi > lo ? sig[hi] - sig[hi - 1] : 0.0;
        for (int j = lo - 1; j >= 0;  j--) sig[j] = sig[j + 1] - slopeLo;
        for (int j = hi + 1; j < NK; j++) sig[j] = sig[j - 1] + slopeHi;
        for (int j = 0; j < NK; j++) {
            double s = sig[j] < 0.02 ? 0.02 : sig[j] > 1.0 ? 1.0 : sig[j];
            S2[k][j] = s * s;
        }
    }
}

/* Price the callable note, the (call-off) coupon strip and the European smile
 * under a local-vol surface. The surface at the START of each step is used
 * (predictable coefficient). */
static void price_lv(double S2[STEPS][NK], double *callable, double *strip,
                     double *calls, double *meanST)
{
    srand(777); gaussian_reset();
    double cb = 0, st = 0, mS = 0, ck[NREP] = {0};
    for (long p = 0; p < N_SIM; p++) {
        double S = S0, c = 0, s_strip = 0;
        int called = 0;
        for (int k = 0; k < STEPS; k++) {
            double s = sqrt(S2[k > 0 ? k - 1 : 0][bin_of(S)]);
            S *= exp(-0.5 * s * s * DT + s * sqrt(DT) * gaussian());
            if (S < 1e-8) S = 1e-8;
            if ((k + 1) % OBS == 0) {
                s_strip += S * PERIOD;
                if (!called && S > BARRIER) called = 1;
                if (!called) c += S * PERIOD;
            }
        }
        cb += c; st += s_strip; mS += S;
        for (int j = 0; j < NREP; j++) ck[j] += S > STRIKES[j] ? S - STRIKES[j] : 0.0;
    }
    *callable = cb / N_SIM; *strip = st / N_SIM; *meanST = mS / N_SIM;
    for (int j = 0; j < NREP; j++) calls[j] = ck[j] / N_SIM;
}

int main(void)
{
    double sv_call[NREP] = {0};
    double sv_callable = 0, sv_strip = 0, sv_meanST = 0;

    /* ---- Phase 1: simulate the SV truth; accumulate E[sigma^2 | S]; price SV */
    srand(2024); gaussian_reset();
    for (long p = 0; p < N_CAL; p++) {
        double S = S0, sig = SIG0, callable = 0, strip = 0;
        int called = 0;
        for (int k = 0; k < STEPS; k++) {
            double z1 = gaussian(), z2 = gaussian();
            double zc = RHO * z1 + sqrt(1.0 - RHO * RHO) * z2;

            S *= exp(-0.5 * sig * sig * DT + sig * sqrt(DT) * z1);  /* martingale */
            if (S < 1e-8) S = 1e-8;
            sig += KAPPA * (THETA - sig) * DT + XI * sqrt(DT) * zc;
            if (sig < 0.02) sig = 0.02;

            int b = bin_of(S);
            SUM2[k][b] += sig * sig;         /* sample of E[sigma^2 | S_t] */
            CNT [k][b] += 1.0;

            if ((k + 1) % OBS == 0) {
                strip += S * PERIOD;
                if (!called && S > BARRIER) called = 1;
                if (!called) callable += S * PERIOD;
            }
        }
        sv_callable += callable; sv_strip += strip; sv_meanST += S;
        for (int j = 0; j < NREP; j++)
            sv_call[j] += S > STRIKES[j] ? S - STRIKES[j] : 0.0;
    }
    sv_callable /= N_CAL; sv_strip /= N_CAL; sv_meanST /= N_CAL;
    for (int j = 0; j < NREP; j++) sv_call[j] /= N_CAL;

    /* ---- calibrate: sigma_loc^2 = E[sigma^2 | S], then complete the wings - */
    for (int k = 0; k < STEPS; k++)
        for (int j = 0; j < NK; j++)
            SL2[k][j] = CNT[k][j] >= HMIN ? SUM2[k][j] / CNT[k][j] : -1.0;
    fill_surface(SL2);

    /* ---- Phase 2: reprice under the local-vol surface -------------------- */
    double lv_call[NREP], lv_callable, lv_strip, lv_meanST;
    price_lv(SL2, &lv_callable, &lv_strip, lv_call, &lv_meanST);

    /* ---- report ---------------------------------------------------------- */
    printf("Local vol at T=2.5y:  ");
    for (double K = 0.026; K <= 0.036; K += 0.004)
        printf("K=%.3f s=%.1f%%   ", K, 100 * sqrt(SL2[STEPS/2][bin_of(K)]));
    printf("\n\nMartingale E[S_T]:  SV=%.5f  LV=%.5f  (S0=%.5f)\n",
           sv_meanST, lv_meanST, S0);

    printf("\nEuropean call on the CMS rate at T=%dy   (must MATCH: same marginal)\n", YEARS);
    printf("   strike       SV          LV        err\n");
    for (int j = 0; j < NREP; j++)
        printf("   %.3f     %.6f    %.6f   %+4.1f%%\n",
               STRIKES[j], sv_call[j], lv_call[j], 100 * (lv_call[j] - sv_call[j]) / sv_call[j]);

    printf("\n                        SV(truth)   LV\n");
    printf("Coupon strip (call off)  %.6f   %.6f\n", sv_strip, lv_strip);
    printf("Callable CMS note        %.6f   %.6f\n", sv_callable, lv_callable);
    double so = sv_strip - sv_callable, lo = lv_strip - lv_callable;
    printf("Embedded issuer call     %.6f   %.6f   %+.1f%%\n", so, lo, 100 * (lo - so) / so);

    return 0;
}
