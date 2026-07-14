---
layout: page
title: Automated Market Making
description: Solo-built HFT crypto market-making stack — $1bn+ cumulative volume
dropdown: Projects
priority: 3
usemathjax: true
---

# Ainemox — Automated Market Making

A fully automated **high-frequency market-making** platform I designed,
built, and operated solo across five crypto exchanges between 2021 and
2022. **$1bn+ cumulative volume.** Sub-millisecond latency; capable of
1000 trades / second where the venue allows it.

## What it did

Made two-sided markets across spot and derivative books on
**Binance, Bybit, BitMEX, Coinbase,** and **FTX**. On FTX also traded
**MOVE contracts** systematically — one-day-maturity straddles that
price the realised absolute move of BTC over the trading day.

## Architecture

Five independent processes, each written in C/C++ **with no external
libraries** — every exchange adapter, WebSocket client, and pricing
routine implemented from scratch against the raw venue APIs.

- **Algo Trading Server (C/C++).** The hot path. Exchange connectivity,
  market-data ingestion, quoting, order management, inventory and risk
  controls. Launched per algo:

  ```bash
  ./algo_manager -a aggressive_market_maker_v2 -t BTC-USDT
  ```

  or with a JSON parameter file:

  ```json
  {
    "exchange": "BINANCE SPOT",
    "algo-name": "aggressive_market_maker_v2",
    "algo-params-1": "...",
    "algo-params-n": "..."
  }
  ```
- **WebSocket Server (C).** A deliberately tiny C broker between the
  algo processes and the control apps. Routes commands in, market data
  out, and copies everything to the database server for post-trade
  analysis.
- **Web dashboard (JavaScript).** Internal-only. Live order-book and
  own-order visualisation, performance analytics, and full control
  (spin up algos, push parameter changes, kill switches).
- **Telegram bot (Python).** Same control surface reachable from a
  phone. Push a parameter change from mobile → live in ~10 minutes.
- **Monitoring servers (×2, independent).** Two redundant watchdogs.
  Alert on anything from process crashes to risk-limit breaches;
  escalate via SMS / WhatsApp / Telegram; can issue automatic
  stop-and-flatten decisions in red-scenario conditions.

## Infrastructure

Deployed on **AWS** with full CI/CD; PostgreSQL for trade and
market-data persistence; automated test suite; structured logging;
alert-driven on-call (the alerts going to the founder).

## Quoting logic

Classical inventory-aware optimal quoting. For inventory $q$, mid-price
$S$, half-spread $\delta$, and reservation-price shift $\xi(q)$, quotes
are placed at

$$
\text{bid} = S - \delta - \xi(q),
\qquad
\text{ask} = S + \delta - \xi(q),
$$

with $\xi(q)$ scaled by the risk-aversion parameter and the local
realised volatility. Online calibration of $\delta$ and $\xi$ against
fill-rate and adverse-selection metrics keeps the system honest in
regime changes.

## What I learned

- A surprising amount of HFT engineering is boring discipline —
  reproducible builds, careful logging, idempotent restarts. The fancy
  microstructure stuff is the easy part.
- Two independent monitoring stacks felt paranoid until the day they
  weren't. Highly recommended.
- Mobile-first ops (Telegram bot) was the single largest
  quality-of-life upgrade for a one-person desk.
