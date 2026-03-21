---
layout: default
title: "Phase 1: Implementation"
parent: Engineering
nav_order: 2
---

# Phase 1 Implementation — OpenClaw / Mac mini

**Status:** ✅ Deployed (2026-03-22)
**Platform:** OpenClaw on Mac mini (5 agents: main + α/β/γ/δ)
**Spec:** [Phase 1: Feedback Loop](../../specs/phase-1-feedback-loop.md)

## What Was Built

### 1. SQLite Schema (`metrics.db`)

Extended the existing `~/.openclaw/data/metrics.db` with:

- **`skill_performance`** table — logs every skill execution with agent_id, quality_score, token_cost, duration, outcome
- **`skill_metrics`** view — aggregated per-skill stats (avg quality, cost, success rate)
- **`skill_pareto`** view — Pareto classification (PARETO-OPTIMAL / DOMINATED / TRADE-OFF)
- **`agent_skill_metrics`** view — per-agent breakdown

### 2. Logging Script (`skill-log.sh`)

```bash
~/.openclaw/scripts/skill-log.sh <skill_name> <outcome> [--agent <id>] [--quality <0-1>] [--tokens <n>] [--duration <sec>] [--task-type <type>] [--project <name>] [--notes <text>]
```

Called after every skill execution. All 5 agents have this in their AGENTS.md as mandatory.

### 3. Metrics Script (`skill-metrics.sh`)

```bash
~/.openclaw/scripts/skill-metrics.sh overview   # Summary
~/.openclaw/scripts/skill-metrics.sh pareto     # Quality vs. Cost
~/.openclaw/scripts/skill-metrics.sh agents     # Per-agent breakdown
~/.openclaw/scripts/skill-metrics.sh alerts     # Quality drops, cost outliers
~/.openclaw/scripts/skill-metrics.sh detail <name>  # History for one skill
~/.openclaw/scripts/skill-metrics.sh recent [n]     # Last n entries
```

### 4. Alert Triggers

| Trigger | Condition | Action |
|---------|-----------|--------|
| Quality Drop | avg_quality < 0.5 AND uses >= 5 | Alert to user |
| Cost Outlier | avg_cost > 2× median | Alert to user |
| Unused Skill | last_used > 30 days | Alert to user |

Alerts are advisory only — no automatic changes (Phase 1 principle).

## Architecture Decisions

1. **Reused existing `metrics.db`** instead of creating a new DB — keeps everything in one place
2. **Shell scripts, not Python** — zero dependencies, works from any agent
3. **agent_id field** — tracks which of the 5 agents executed which skill, enabling Q3 (Collaboration Gain) analysis later
4. **Manual logging, not hooks** — OpenClaw doesn't have post-execution hooks yet; agents are instructed via AGENTS.md to log after every skill use

## Adaptation from Spec

The original spec targets Claude Code with `knowledge.db` and post_tool_call hooks. This implementation adapts to OpenClaw:

| Spec (Claude Code) | Implementation (OpenClaw) |
|---------------------|---------------------------|
| knowledge.db | metrics.db (already existed) |
| post_tool_call hook | Manual logging via AGENTS.md instruction |
| Single agent | 5 agents (main + α/β/γ/δ) with agent_id tracking |
| improve-Skill | skill-metrics.sh alerts command |

## Connection to Nowak

This implements the **measurement apparatus** — Nowak's `fᵢ` (fitness per individual) and `φ` (population average). Without this measurement, there is no selection pressure, only drift.

- `skill_metrics` view = population fitness landscape
- `skill_pareto` view = multi-objective selection (EvoFlow's core idea)
- `alerts` = selection pressure signals (not automatic action)
- `agent_skill_metrics` = niche performance (MAP-Elites analogy per agent)

## Next Steps (Phase 2 Prerequisites)

- [ ] Accumulate ≥50 entries across all agents
- [ ] First Pareto analysis with ≥3 uses per skill
- [ ] First alert fires (quality drop or cost outlier)
- [ ] Evaluate: Is manual logging sustainable or do we need automation?
