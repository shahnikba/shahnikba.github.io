---
layout: page
title: Chess AI
description: Neural-network position evaluation for the ambiguous positional game
dropdown: Projects
priority: 1
---

# Chess AI — a stronger evaluation function

Modern engines like Stockfish are formidable in **tactical** positions
because they can search enormous variation trees. Where they falter is
in **positional** situations — the kind of game where nothing forces a
particular reply and the "right" move depends on subtle long-term
structural judgement.

The bet behind this project: **the evaluation function is the
bottleneck, not search depth**. If we can build an evaluator that
understands positional themes the way a strong human player does, we can
outperform engines that rely on shallow hand-crafted heuristics plus
brute force.

## Approach

- **Deep neural network trained on human games,** with the target being
  the move (or evaluation) played by strong players in the position.
- **Positional feature encoding** rather than raw board tensors — piece
  activity, king safety, pawn structure, and space are represented
  explicitly so the network can compose them.
- **Trained against annotated grandmaster games** for the evaluation
  signal, then bootstrapped by self-play against a fixed baseline
  engine.

## What was hard

Two things:

1. **Data quality for positional judgement.** Raw win/loss labels are
   noisy for a single move; getting a per-position label that reflects
   positional understanding (rather than eventual game outcome) required
   engineered targets from annotated master games.
2. **Latency at inference time.** Any evaluator that plugs into a
   conventional alpha-beta search has to return an evaluation in
   microseconds. A large network won't do — the interesting engineering
   problem is deciding how much of the evaluation logic lives in the
   network and how much stays in cheap hand-crafted rules.

## Related

Deep-learning ideas that came out of AlphaZero (self-play + policy /
value heads) later matured this whole area — this project predates that
and takes a more explicitly *supervised* route.
