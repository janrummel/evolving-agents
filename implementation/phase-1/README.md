---
layout: default
title: "Phase 1: Implementation"
parent: Engineering
nav_order: 2
---

<div lang='en' markdown='1'>

# Phase 1 Implementation

<div class="section-summary">
<h4>TL;DR</h4>
<p>SQLite schema + shell scripts to measure skill fitness across 5 agents. 3 commands to start: create DB, log executions, view metrics. Pareto classification after ≥3 uses per skill.</p>
</div>

**Status:** ✅ Deployed (2026-03-22)
**Platform:** Multi-agent system (5 agents: main + α/β/γ/δ)
**Spec:** [Phase 1: Feedback Loop](../../specs/phase-1-feedback-loop.md)

## Quickstart (3 commands)

```bash
# 1. Create the database
sqlite3 ~/.openclaw/data/metrics.db < implementation/phase-1/schema.sql

# 2. Log a skill execution
skill-log.sh deep-research success --quality 0.85 --tokens 15000 --duration 120

# 3. View metrics
skill-metrics.sh overview
```

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
4. **Manual logging, not hooks** — The platform doesn't have post-execution hooks yet; agents are instructed via AGENTS.md to log after every skill use

## Adaptation from Spec

The original spec targets `knowledge.db` and post_tool_call hooks. This implementation adapts to the target platform:

| Original Spec | Adapted Implementation |
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

</div>

<div lang='de' markdown='1'>

# Phase 1 Implementierung

<div class="section-summary">
<h4>Kurzfassung</h4>
<p>SQLite-Schema + Shell-Scripts zur Messung der Skill-Fitness über 5 Agents. 3 Befehle zum Start: DB erstellen, Ausführungen loggen, Metriken anzeigen. Pareto-Klassifikation ab ≥3 Nutzungen pro Skill.</p>
</div>

**Status:** ✅ Deployed (2026-03-22)
**Plattform:** Multi-Agent-System (5 Agents: main + α/β/γ/δ)
**Spec:** [Phase 1: Feedback Loop](../../specs/phase-1-feedback-loop.md)

## Schnellstart (3 Befehle)

```bash
# 1. Datenbank erstellen
sqlite3 ~/.openclaw/data/metrics.db < implementation/phase-1/schema.sql

# 2. Skill-Ausführung loggen
skill-log.sh deep-research success --quality 0.85 --tokens 15000 --duration 120

# 3. Metriken anzeigen
skill-metrics.sh overview
```

## Was gebaut wurde

### 1. SQLite-Schema (`metrics.db`)

Die bestehende `~/.openclaw/data/metrics.db` wurde erweitert um:

- **`skill_performance`**-Tabelle — loggt jede Skill-Ausführung mit agent_id, quality_score, token_cost, duration, outcome
- **`skill_metrics`**-View — aggregierte Statistiken pro Skill (Ø Qualität, Kosten, Erfolgsrate)
- **`skill_pareto`**-View — Pareto-Klassifikation (PARETO-OPTIMAL / DOMINATED / TRADE-OFF)
- **`agent_skill_metrics`**-View — Aufschlüsselung pro Agent

### 2. Logging-Script (`skill-log.sh`)

```bash
~/.openclaw/scripts/skill-log.sh <skill_name> <outcome> [--agent <id>] [--quality <0-1>] [--tokens <n>] [--duration <sec>] [--task-type <type>] [--project <name>] [--notes <text>]
```

Wird nach jeder Skill-Ausführung aufgerufen. Alle 5 Agents haben das als Pflicht in ihrer AGENTS.md.

### 3. Metriken-Script (`skill-metrics.sh`)

```bash
~/.openclaw/scripts/skill-metrics.sh overview   # Überblick
~/.openclaw/scripts/skill-metrics.sh pareto     # Qualität vs. Kosten
~/.openclaw/scripts/skill-metrics.sh agents     # Pro-Agent-Aufschlüsselung
~/.openclaw/scripts/skill-metrics.sh alerts     # Qualitätseinbrüche, Kosten-Ausreißer
~/.openclaw/scripts/skill-metrics.sh detail <name>  # Historie eines Skills
~/.openclaw/scripts/skill-metrics.sh recent [n]     # Letzte n Einträge
```

### 4. Alert-Trigger

| Trigger | Bedingung | Aktion |
|---------|-----------|--------|
| Qualitätseinbruch | avg_quality < 0.5 UND uses >= 5 | Alert an User |
| Kosten-Ausreißer | avg_cost > 2× Median | Alert an User |
| Unbenutzter Skill | last_used > 30 Tage | Alert an User |

Alerts sind rein informativ — keine automatischen Änderungen (Phase-1-Prinzip).

## Architektur-Entscheidungen

1. **Bestehende `metrics.db` wiederverwendet** statt neue DB — alles an einem Ort
2. **Shell-Scripts, nicht Python** — keine Abhängigkeiten, funktioniert von jedem Agent
3. **agent_id-Feld** — trackt welcher der 5 Agents welchen Skill ausgeführt hat, ermöglicht Q3-Analyse (Collaboration Gain) später
4. **Manuelles Logging, keine Hooks** — Die Plattform hat noch keine Post-Execution-Hooks; Agents werden via AGENTS.md angewiesen, nach jeder Skill-Nutzung zu loggen

## Anpassung gegenüber Spec

Die ursprüngliche Spec zielt auf `knowledge.db` und post_tool_call Hooks. Diese Implementierung ist an die Zielplattform angepasst:

| Original-Spec | Angepasste Implementierung |
|---------------------|---------------------------|
| knowledge.db | metrics.db (existierte bereits) |
| post_tool_call Hook | Manuelles Logging via AGENTS.md-Anweisung |
| Einzelner Agent | 5 Agents (main + α/β/γ/δ) mit agent_id-Tracking |
| improve-Skill | skill-metrics.sh alerts Befehl |

## Verbindung zu Nowak

Dies implementiert den **Messapparat** — Nowaks `fᵢ` (Fitness pro Individuum) und `φ` (Populations-Durchschnitt). Ohne diese Messung gibt es keinen Selektionsdruck, nur Drift.

- `skill_metrics`-View = Fitness-Landschaft der Population
- `skill_pareto`-View = Multi-Objective-Selektion (EvoFlows Kernidee)
- `alerts` = Selektionsdruck-Signale (keine automatische Aktion)
- `agent_skill_metrics` = Nischen-Performance (MAP-Elites-Analogie pro Agent)

## Nächste Schritte (Phase-2-Voraussetzungen)

- [ ] ≥50 Einträge über alle Agents sammeln
- [ ] Erste Pareto-Analyse mit ≥3 Nutzungen pro Skill
- [ ] Erster Alert feuert (Qualitätseinbruch oder Kosten-Ausreißer)
- [ ] Bewertung: Ist manuelles Logging nachhaltig oder brauchen wir Automatisierung?

</div>
