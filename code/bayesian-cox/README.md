# bayesian-cox

Code accompanying [Putting a posterior on the hazard
ratio](https://shahnikba.github.io/writing/bayesian-cox/).

Random-walk Metropolis–Hastings targeting the posterior of a single log
hazard ratio, with the Cox partial likelihood standing in for the
likelihood and a weakly informative N(0, 2²) prior on β. The dataset is
simulated: 400 subjects, one standard-normal covariate, exponential
survival times with true β = 0.80, administrative censoring at t = 1.6.

The script produces `trace.svg`, the figure used in the note, and prints
the summary numbers quoted there.

## Build and run

Requires Python 3 and NumPy.

```bash
python3 mh_partial_likelihood.py
```

## Expected output

Seeded with `RNG_SEED = 20211219`, so this reproduces exactly:

```
events / subjects      304 / 400
acceptance rate        0.54
posterior mean beta    0.794
95% credible interval  (0.662, 0.925)
draws after burn-in    5250
effective sample size  1262
P(HR > 1 | D)          1.000
wrote trace.svg
```

## The figure

`trace.svg` carries its own styling, including a
`prefers-color-scheme: dark` block, so it can be served from `public/`
and referenced with a plain `<img>` in either colour mode. Copy it to:

```
public/figures/bayesian-cox-trace.svg
```

Re-run the script and re-copy if any of the constants at the top of the
file change — the numbers in the note must match program output exactly.

## Notes on the implementation

The partial likelihood uses the Breslow form. Times are continuous so
there are no ties, and the risk-set denominator is computed as a suffix
sum of `exp(eta)` over time-sorted subjects rather than an explicit loop
over risk sets. That keeps the O(n) cost per evaluation visible: it is
the reason the sampler is slow on real cohort sizes, which is the point
the note makes at the end.

The effective sample size uses the initial-positive-sequence estimator,
truncating the autocorrelation sum at the first lag where ρ drops to
0.05.
