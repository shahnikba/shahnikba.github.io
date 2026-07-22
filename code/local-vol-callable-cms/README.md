# callable_cms.c

Monte Carlo accompanying the note
[**What local volatility forgets — a callable CMS in two models**](https://shahnikba.github.io/writing/local-vol-callable-cms).

One stochastic-vol model is taken as the truth:

```
dS = sigma_t S dW,   d sigma = kappa(theta - sigma)dt + xi dZ,   dW dZ = rho dt
```

A local-vol model is calibrated to it so the two share every European price.
The local-vol surface is the Dupire local volatility, built through its
conditional-expectation form (Gyöngy's projection),

```
sigma_loc^2(S,t) = E[ sigma_t^2 | S_t = S ],
```

estimated by binning `sigma^2` against the level along the paths. By
construction this reproduces the terminal marginal at every date, so every
European reprices. The program checks that, then prices a callable CMS.

## What you should see

```
European call at T=5y      SV          LV        err
   0.030               0.006269    0.006292   +0.4%
   0.040               0.003729    0.003745   +0.4%

                        SV(truth)   LV
Coupon strip (call off)  0.149938   0.150026
Callable CMS note        0.082153   0.078880
Embedded issuer call     0.067785   0.071146   +5.0%
```

The coupon strip and the whole European smile reprice to Monte-Carlo accuracy
— the local-vol model agrees with the SV world on every marginal. The embedded
issuer call, which depends on the *joint* law across the observation dates,
does not: it is worth ~5% more under the level-only local-vol model, because a
callable sees the forward volatility a local-vol model cannot carry.

## Build & run

```
cc -O2 -o callable_cms callable_cms.c -lm && ./callable_cms
```

Runs in ~10s (5×10^5 paths, 200 steps). Seeds are fixed, so the output is
reproducible.

## Notes

- The `gaussian()` uniforms use `(RAND_MAX + 2.0)` as a `double` denominator on
  purpose: `RAND_MAX + 2` as an `int` overflows where `RAND_MAX == INT_MAX`
  (e.g. macOS), which would send `log()` into `NaN`.
- The SV parameters are illustrative, not calibrated to a market: moderate
  vol-of-vol keeps the marginal well-sampled, while the vol persistence and
  skew give the callable something to register.
