"""
Metropolis-Hastings on a Cox partial likelihood.

Simulates a small right-censored survival dataset with one covariate,
then samples the posterior of the log hazard ratio with a random-walk
proposal. Writes a trace plot to trace.svg and prints the summary
numbers quoted in the note.

    python3 mh_partial_likelihood.py
"""

import numpy as np

RNG_SEED = 20211219

N_SUBJECTS = 400
TRUE_BETA = 0.80
CENSOR_TIME = 1.60

N_DRAWS = 6000
BURN_IN = 750
PROPOSAL_SD = 0.12
START = -1.20          # deliberately far from the mode
PRIOR_SD = 2.0         # weakly informative N(0, 2^2) on beta


# ---------------------------------------------------------------- data

def simulate(rng):
    x = rng.normal(size=N_SUBJECTS)
    rate = np.exp(TRUE_BETA * x)
    t = rng.exponential(scale=1.0 / rate)
    event = t <= CENSOR_TIME
    t = np.minimum(t, CENSOR_TIME)
    return x, t, event


# ------------------------------------------------- partial likelihood

def log_partial_likelihood(beta, x, t, event):
    """Breslow partial log-likelihood; times are continuous, so no ties."""
    order = np.argsort(t)
    x, t, event = x[order], t[order], event[order]
    eta = beta * x
    # risk set at each event time = everyone with time >= that time,
    # which after sorting is the suffix sum of exp(eta)
    suffix = np.cumsum(np.exp(eta)[::-1])[::-1]
    return float(np.sum(eta[event] - np.log(suffix[event])))


def log_posterior(beta, x, t, event):
    log_prior = -0.5 * (beta / PRIOR_SD) ** 2
    return log_partial_likelihood(beta, x, t, event) + log_prior


# -------------------------------------------------------------- MCMC

def metropolis(x, t, event, rng):
    draws = np.empty(N_DRAWS)
    current = START
    current_lp = log_posterior(current, x, t, event)
    accepted = 0

    for i in range(N_DRAWS):
        proposal = current + rng.normal(scale=PROPOSAL_SD)
        proposal_lp = log_posterior(proposal, x, t, event)
        if np.log(rng.uniform()) < proposal_lp - current_lp:
            current, current_lp = proposal, proposal_lp
            accepted += 1
        draws[i] = current

    return draws, accepted / N_DRAWS


def effective_sample_size(draws):
    """Initial-positive-sequence estimator on the post-burn-in chain."""
    d = draws - draws.mean()
    n = len(d)
    var = np.dot(d, d) / n
    rho_sum, lag = 0.0, 1
    while lag < n // 2:
        rho = np.dot(d[:-lag], d[lag:]) / (n * var)
        if rho <= 0.05:
            break
        rho_sum += rho
        lag += 1
    return n / (1 + 2 * rho_sum)


# --------------------------------------------------------------- plot

W, H = 700, 300
PAD_L, PAD_R, PAD_T, PAD_B = 46, 132, 18, 34
PLOT_W = W - PAD_L - PAD_R
PLOT_H = H - PAD_T - PAD_B


def write_svg(draws, path="trace.svg"):
    lo, hi = draws.min(), draws.max()
    span = hi - lo
    lo, hi = lo - 0.08 * span, hi + 0.08 * span

    def sx(i):
        return PAD_L + PLOT_W * i / (len(draws) - 1)

    def sy(b):
        return PAD_T + PLOT_H * (hi - b) / (hi - lo)

    # chain path, thinned for file size (every 2nd draw keeps the shape)
    pts = " ".join(f"{sx(i):.1f},{sy(b):.1f}"
                   for i, b in enumerate(draws) if i % 2 == 0)

    post = draws[BURN_IN:]
    mean = post.mean()

    # marginal density in the right margin, from a histogram of the
    # post-burn-in draws
    counts, edges = np.histogram(post, bins=44, range=(lo, hi))
    peak = counts.max()
    dens_w = PAD_R - 46
    dens_x = PAD_L + PLOT_W + 16
    dens = []
    for c, e0, e1 in zip(counts, edges[:-1], edges[1:]):
        y = sy((e0 + e1) / 2)
        dens.append(f"{dens_x + dens_w * c / peak:.1f},{y:.1f}")
    dens_path = " ".join(dens)

    ticks = np.linspace(lo, hi, 5)
    y_ticks = "".join(
        f'<text x="{PAD_L - 9}" y="{sy(v) + 4:.1f}" text-anchor="end" '
        f'class="tick">{v:.1f}</text>\n' for v in ticks)
    x_ticks = "".join(
        f'<text x="{PAD_L + PLOT_W * v / N_DRAWS:.1f}" y="{H - 12}" '
        f'text-anchor="middle" class="tick">{v}</text>\n'
        for v in [0, 2000, 4000, 6000])

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}"
     role="img" aria-label="Trace plot of a Metropolis-Hastings chain
     targeting the posterior of the log hazard ratio. The chain starts
     below the posterior mass, climbs during the first few hundred
     iterations, then mixes around the mode.">
  <style>
    svg {{ font-family: Charter, "Iowan Old Style", Palatino, Georgia, serif;
          --ink: #262A33; --acc: #990F3D; }}
    @media (prefers-color-scheme: dark) {{
      svg {{ --ink: #EDE3D8; --acc: #E8879F; }}
    }}
    .tick   {{ font-size: 12px; fill: var(--ink); opacity: .55;
              font-variant-numeric: oldstyle-nums tabular-nums; }}
    .label  {{ font-size: 12.5px; fill: var(--ink); opacity: .55;
              font-variant: small-caps; letter-spacing: .07em; }}
    .axis   {{ stroke: var(--ink); opacity: .22; stroke-width: 1; }}
    .chain  {{ fill: none; stroke: var(--ink); opacity: .62;
              stroke-width: .8; stroke-linejoin: round; }}
    .accent {{ stroke: var(--acc); }}
    .accent-fill {{ fill: var(--acc); }}
    .burn   {{ fill: var(--ink); opacity: .05; }}
  </style>

  <rect x="{PAD_L}" y="{PAD_T}" width="{sx(BURN_IN) - PAD_L:.1f}"
        height="{PLOT_H}" class="burn"/>
  <line x1="{sx(BURN_IN):.1f}" y1="{PAD_T}" x2="{sx(BURN_IN):.1f}"
        y2="{PAD_T + PLOT_H}" class="axis" stroke-dasharray="3 3"/>
  <text x="{sx(BURN_IN) + 7:.1f}" y="{PAD_T + 13}" class="label">burn-in</text>

  <line x1="{PAD_L}" y1="{PAD_T}" x2="{PAD_L}" y2="{PAD_T + PLOT_H}"
        class="axis"/>
  <line x1="{PAD_L}" y1="{PAD_T + PLOT_H}" x2="{PAD_L + PLOT_W}"
        y2="{PAD_T + PLOT_H}" class="axis"/>
  {y_ticks}{x_ticks}
  <text x="{PAD_L + PLOT_W / 2:.0f}" y="{H - 1}" text-anchor="middle"
        class="label">iteration</text>
  <text x="{PAD_L - 9}" y="{PAD_T - 5}" text-anchor="end"
        class="label">&#946;</text>

  <polyline points="{pts}" class="chain"/>

  <line x1="{PAD_L}" y1="{sy(mean):.1f}" x2="{PAD_L + PLOT_W}"
        y2="{sy(mean):.1f}" class="axis accent" stroke-width="1"
        stroke-dasharray="4 4" opacity=".85"/>

  <polyline points="{dens_path}" class="accent" fill="none"
            stroke-width="1.1" opacity=".9"/>
  <text x="{W - 6}" y="{PAD_T + 13}" text-anchor="end"
        class="label accent-fill" opacity=".95">posterior</text>
</svg>
"""
    with open(path, "w") as f:
        f.write(svg)


# --------------------------------------------------------------- main

def main():
    rng = np.random.default_rng(RNG_SEED)
    x, t, event = simulate(rng)
    draws, acc = metropolis(x, t, event, rng)
    post = draws[BURN_IN:]
    ess = effective_sample_size(post)
    q025, q975 = np.percentile(post, [2.5, 97.5])

    write_svg(draws)

    print(f"events / subjects      {int(event.sum())} / {N_SUBJECTS}")
    print(f"acceptance rate        {acc:.2f}")
    print(f"posterior mean beta    {post.mean():.3f}")
    print(f"95% credible interval  ({q025:.3f}, {q975:.3f})")
    print(f"draws after burn-in    {len(post)}")
    print(f"effective sample size  {ess:.0f}")
    print(f"P(HR > 1 | D)          {np.mean(post > 0):.3f}")
    print("wrote trace.svg")


if __name__ == "__main__":
    main()
