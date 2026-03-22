---
layout: default
title: "Phase 1: Feedback Loop"
parent: Engineering
nav_order: 1
---

<div lang='en' markdown='1'>

# Phase 1 Spec: Closing the Feedback Loop

**Goal:** Move the evolutionary loop from "Prelife" (feedback dies after Quality Gate) to "Proto-Life" (feedback flows into skill evaluation and triggers improvement).

**Scope:** Minimal Viable Feedback Loop. No automatic mutation — only measure, make visible, set triggers.

**Inspired by:** EvoFlow (Pareto: Quality + Cost), EvoAgentX (Evaluation Layer), MCE (History of skills, executions, evaluations)

</div>

<div lang='de' markdown='1'>

# Phase 1 Spec: Feedback-Loop schließen

**Ziel:** Den evolutionären Loop von "Prelife" (Feedback stirbt nach Quality-Gate) zu "Proto-Life" (Feedback fließt in Skill-Bewertung und triggert Verbesserung) bringen.

**Scope:** Minimal Viable Feedback Loop. Kein automatisches Mutieren — nur Messen, Sichtbar machen, Trigger setzen.

**Inspiriert von:** EvoFlow (Pareto: Quality + Cost), EvoAgentX (Evaluation Layer), MCE (History of skills, executions, evaluations)

</div>

---

<div lang='en' markdown='1'>

## Current State (AS-IS)

| Component | Tool | What It Provides | Where It Ends |
|-----------|------|-------------------|---------------|
| Skill Execution | orchestrator-routing | Which skill for which intent | Log in knowledge.db (skills_usage) |
| Token Usage | Pulse | Tokens/Session, Velocity | Pulse DB (SQLite) |
| Quality | Quality-Gate / signal-check | Quality score per output | memory/quality-scores.md |
| Routing History | routing-log | Skill → Trigger → Outcome | knowledge.db |

**The Problem:** These 4 data streams are not connected. We don't know: "Skill X costs on average Y tokens and delivers quality score Z."

</div>

<div lang='de' markdown='1'>

## Was existiert (IST)

| Komponente | Tool | Was es liefert | Wo es endet |
|-----------|------|---------------|-------------|
| Skill-Ausführung | orchestrator-routing | Welcher Skill für welchen Intent | Log in knowledge.db (skills_usage) |
| Token-Verbrauch | Pulse | Tokens/Session, Velocity | Pulse-DB (SQLite) |
| Qualität | Quality-Gate / signal-check | Quality-Score per Output | memory/quality-scores.md |
| Routing-Historie | routing-log | Skill → Trigger → Outcome | knowledge.db |

**Das Problem:** Diese 4 Datenströme sind nicht verbunden. Wir wissen nicht: "Skill X kostet durchschnittlich Y Tokens und liefert Quality-Score Z."

</div>

---

<div lang='en' markdown='1'>

## What Needs to Be Built (TARGET)

### 1. Skill Performance Log (Core)

**What:** After each skill execution, write a structured entry to a central table.

```sql
CREATE TABLE IF NOT EXISTS skill_performance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL,
    skill_name TEXT NOT NULL,
    task_type TEXT,            -- 'research', 'writing', 'analysis', 'code', 'review'
    quality_score REAL,        -- 0.0-1.0, from Quality-Gate/signal-check
    token_cost INTEGER,        -- Tokens consumed (Input + Output)
    duration_seconds REAL,     -- Wall time
    outcome TEXT,              -- 'success', 'partial', 'failure', 'skipped'
    project TEXT,              -- Project name (from Working Directory / Project State)
    notes TEXT                 -- Optional: Why success/failure
);
```

**Where:** `~/.claude/data/knowledge.db` (already exists, used for skills_usage)

**When:** At the end of each skill execution. Can be implemented as a hook or manually via routing log update.

### 2. Aggregated Skill Metrics (View)

```sql
CREATE VIEW IF NOT EXISTS skill_metrics AS
SELECT
    skill_name,
    COUNT(*) as total_uses,
    AVG(quality_score) as avg_quality,
    AVG(token_cost) as avg_cost,
    AVG(duration_seconds) as avg_duration,
    SUM(CASE WHEN outcome = 'success' THEN 1 ELSE 0 END) * 1.0 / COUNT(*) as success_rate,
    MIN(timestamp) as first_used,
    MAX(timestamp) as last_used
FROM skill_performance
GROUP BY skill_name;
```

**Usage:** `SELECT * FROM skill_metrics ORDER BY avg_quality DESC;` instantly shows the best/worst skills.

### 3. Pareto View (Quality vs. Cost)

```sql
-- Skills that deliver above-average quality for their cost
SELECT
    skill_name,
    avg_quality,
    avg_cost,
    total_uses,
    CASE
        WHEN avg_quality > (SELECT AVG(avg_quality) FROM skill_metrics)
         AND avg_cost < (SELECT AVG(avg_cost) FROM skill_metrics)
        THEN 'PARETO-OPTIMAL'
        WHEN avg_quality < (SELECT AVG(avg_quality) FROM skill_metrics)
         AND avg_cost > (SELECT AVG(avg_cost) FROM skill_metrics)
        THEN 'DOMINATED'
        ELSE 'TRADE-OFF'
    END as pareto_status
FROM skill_metrics
WHERE total_uses >= 3  -- At least 3 uses for reliable data
ORDER BY avg_quality DESC;
```

### 4. Automatic Triggers (Alerts, Not Actions)

| Trigger | Condition | Action |
|---------|-----------|--------|
| **Quality Drop** | avg_quality < 0.5 AND total_uses >= 5 | "Skill X has low quality. Review needed?" |
| **Cost Outlier** | avg_cost > 2× median of all skills | "Skill X costs twice the median." |
| **Unused Skill** | last_used > 30 days | "Skill X unused for 30 days. Still relevant?" |
| **New Champion** | New skill has higher avg_quality than current default for task_type | "Skill Y outperforms Skill X for [task_type]." |

**Important:** Phase 1 only triggers alerts to the user. No automatic changes. The human decides.

</div>

<div lang='de' markdown='1'>

## Was gebaut werden muss (SOLL)

### 1. Skill-Performance-Log (Kern)

**Was:** Nach jeder Skill-Ausführung einen strukturierten Eintrag in eine zentrale Tabelle.

```sql
CREATE TABLE IF NOT EXISTS skill_performance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL,
    skill_name TEXT NOT NULL,
    task_type TEXT,            -- 'research', 'writing', 'analysis', 'code', 'review'
    quality_score REAL,        -- 0.0-1.0, aus Quality-Gate/signal-check
    token_cost INTEGER,        -- Tokens verbraucht (Input + Output)
    duration_seconds REAL,     -- Wandzeit
    outcome TEXT,              -- 'success', 'partial', 'failure', 'skipped'
    project TEXT,              -- Projekt-Name (aus Working Directory / Projekt-State)
    notes TEXT                 -- Optional: Warum Erfolg/Misserfolg
);
```

**Wo:** `~/.claude/data/knowledge.db` (existiert bereits, wird für skills_usage genutzt)

**Wann:** Am Ende jeder Skill-Execution. Kann als Hook oder manuell per Routing-Log-Update implementiert werden.

### 2. Aggregierte Skill-Metriken (View)

```sql
CREATE VIEW IF NOT EXISTS skill_metrics AS
SELECT
    skill_name,
    COUNT(*) as total_uses,
    AVG(quality_score) as avg_quality,
    AVG(token_cost) as avg_cost,
    AVG(duration_seconds) as avg_duration,
    SUM(CASE WHEN outcome = 'success' THEN 1 ELSE 0 END) * 1.0 / COUNT(*) as success_rate,
    MIN(timestamp) as first_used,
    MAX(timestamp) as last_used
FROM skill_performance
GROUP BY skill_name;
```

**Nutzung:** `SELECT * FROM skill_metrics ORDER BY avg_quality DESC;` zeigt sofort die besten/schlechtesten Skills.

### 3. Pareto-Ansicht (Quality vs. Cost)

```sql
-- Skills die für ihren Cost überdurchschnittliche Quality liefern
SELECT
    skill_name,
    avg_quality,
    avg_cost,
    total_uses,
    CASE
        WHEN avg_quality > (SELECT AVG(avg_quality) FROM skill_metrics)
         AND avg_cost < (SELECT AVG(avg_cost) FROM skill_metrics)
        THEN 'PARETO-OPTIMAL'
        WHEN avg_quality < (SELECT AVG(avg_quality) FROM skill_metrics)
         AND avg_cost > (SELECT AVG(avg_cost) FROM skill_metrics)
        THEN 'DOMINATED'
        ELSE 'TRADE-OFF'
    END as pareto_status
FROM skill_metrics
WHERE total_uses >= 3  -- Mindestens 3 Nutzungen für belastbare Daten
ORDER BY avg_quality DESC;
```

### 4. Automatische Trigger (Alerts, nicht Aktionen)

| Trigger | Bedingung | Aktion |
|---------|-----------|--------|
| **Quality Drop** | avg_quality < 0.5 UND total_uses >= 5 | "Skill X hat niedrige Quality. Review nötig?" |
| **Cost Outlier** | avg_cost > 2× Median aller Skills | "Skill X kostet doppelt so viel wie der Median." |
| **Unused Skill** | last_used > 30 Tage | "Skill X seit 30 Tagen ungenutzt. Noch relevant?" |
| **New Champion** | Neuer Skill hat höhere avg_quality als bisheriger Default für task_type | "Skill Y übertrifft Skill X für [task_type]." |

**Wichtig:** Phase 1 triggert nur Alerts an den User. Keine automatischen Änderungen. Der Mensch entscheidet.

</div>

---

<div lang='en' markdown='1'>

## Integration into Existing Components

### orchestrator-routing (modify)

After skill execution → `INSERT INTO skill_performance`. The routing log entry (`skills_usage`) is either extended with performance fields OR skill_performance is maintained as a separate, more detailed log.

**Recommendation:** Separate log. skills_usage remains the routing log (why was it routed), skill_performance is the performance log (how good was the result).

### Quality-Gate (modify)

Quality score is currently written to `memory/quality-scores.md`. Additionally: `INSERT INTO skill_performance` with the score.

### Pulse (read, don't modify)

Pulse tracks token usage per session. For Phase 1: Manually derive the token count per skill usage from the session. For Phase 2: Link Pulse events directly to skill_performance.

### improve Skill (modify)

The improve skill ("improve routing") gets access to the `skill_metrics` view. Instead of only routing logs: real performance data as a basis for improvement suggestions.

</div>

<div lang='de' markdown='1'>

## Integration in bestehende Komponenten

### orchestrator-routing (anpassen)

Nach Skill-Ausführung → `INSERT INTO skill_performance`. Der Routing-Log-Eintrag (`skills_usage`) wird um die Performance-Felder erweitert ODER skill_performance als separater, detaillierterer Log geführt.

**Empfehlung:** Separater Log. skills_usage bleibt das Routing-Log (warum wurde geroutet), skill_performance ist das Performance-Log (wie gut war das Ergebnis).

### Quality-Gate (anpassen)

Quality-Score wird aktuell in `memory/quality-scores.md` geschrieben. Zusätzlich: `INSERT INTO skill_performance` mit dem Score.

### Pulse (auslesen, nicht ändern)

Pulse trackt Token-Verbrauch pro Session. Für Phase 1: Manuell den Token-Count pro Skill-Nutzung aus der Session ableiten. Für Phase 2: Pulse-Events direkt mit skill_performance verknüpfen.

### improve-Skill (anpassen)

Der improve-Skill ("Routing verbessern") bekommt Zugriff auf `skill_metrics` View. Statt nur Routing-Logs: echte Performance-Daten als Basis für Verbesserungsvorschläge.

</div>

---

<div lang='en' markdown='1'>

## Implementation Plan

### Step 1: Create Schema (5 min)
```bash
sqlite3 ~/.claude/data/knowledge.db < schema.sql
```

### Step 2: Define Logging Hook (30 min)
- Option A: Claude Code Hook (`post_tool_call`) that writes the performance entry after a skill tool call
- Option B: Manual block at the end of each skill: "Log Performance"
- **Recommendation:** Option A (Hook) — automatic, no manual effort

### Step 3: Extend Routing Log Entry (15 min)
```sql
-- Update existing skills_usage entry with outcome
UPDATE skills_usage SET outcome = '<success|partial|failure>' WHERE id = <last_insert>;
```

### Step 4: Test Metrics Query (15 min)
- Create view
- Insert test data
- Validate `SELECT * FROM skill_metrics`

### Step 5: Build Trigger Logic into improve Skill (1h)
- Alerts as part of the improve output
- Pareto classification per skill

### Step 6: Collect for 2 Weeks, Then Evaluate
- At least 50 skill executions for reliable statistics
- First insights: Which skills are Pareto-optimal? Which are dominated?

</div>

<div lang='de' markdown='1'>

## Implementierungsplan

### Schritt 1: Schema erstellen (5 Min)
```bash
sqlite3 ~/.claude/data/knowledge.db < schema.sql
```

### Schritt 2: Logging-Hook definieren (30 Min)
- Option A: Claude Code Hook (`post_tool_call`) der nach Skill-Tool-Aufruf den Performance-Eintrag schreibt
- Option B: Manueller Block am Ende jedes Skills: "Log Performance"
- **Empfehlung:** Option A (Hook) — automatisch, kein manueller Aufwand

### Schritt 3: Routing-Log-Eintrag erweitern (15 Min)
```sql
-- Bestehenden skills_usage Eintrag mit outcome updaten
UPDATE skills_usage SET outcome = '<success|partial|failure>' WHERE id = <last_insert>;
```

### Schritt 4: Metriken-Abfrage testen (15 Min)
- View erstellen
- Test-Daten einfügen
- `SELECT * FROM skill_metrics` validieren

### Schritt 5: Trigger-Logik in improve-Skill einbauen (1h)
- Alerts als Teil des improve-Outputs
- Pareto-Klassifikation pro Skill

### Schritt 6: 2 Wochen sammeln, dann auswerten
- Mindestens 50 Skill-Ausführungen für belastbare Statistik
- Erste Erkenntnisse: Welche Skills sind Pareto-optimal? Welche dominated?

</div>

---

<div lang='en' markdown='1'>

## What Phase 1 Does NOT Do

- ❌ Automatic mutation of skills
- ❌ A/B testing of skill variants
- ❌ Crossover (new skills from existing ones)
- ❌ Population management (Niching)
- ❌ Automatic workflow topology changes

All of that is Phase 2+. Phase 1 delivers the **data foundation**, without which no evolution is possible.

</div>

<div lang='de' markdown='1'>

## Was Phase 1 NICHT tut

- ❌ Automatisches Mutieren von Skills
- ❌ A/B-Testing von Skill-Varianten
- ❌ Crossover (neue Skills aus bestehenden)
- ❌ Populationsmanagement (Niching)
- ❌ Automatische Workflow-Topologie-Änderungen

All das ist Phase 2+. Phase 1 liefert die **Datenbasis**, ohne die keine Evolution möglich ist.

</div>

---

<div lang='en' markdown='1'>

## Success Criteria

| Criterion | Measurement |
|-----------|-------------|
| Performance data is being collected | ≥ 50 entries after 2 weeks |
| Pareto view works | At least 1 skill identified as PARETO-OPTIMAL, 1 as DOMINATED |
| First alert fires | At least 1 Quality Drop or Cost Outlier alert |
| improve skill uses data | improve output references skill_metrics |
| User decision is made | At least 1 skill change based on performance data |

</div>

<div lang='de' markdown='1'>

## Erfolgskriterien

| Kriterium | Messung |
|-----------|---------|
| Performance-Daten werden gesammelt | ≥ 50 Einträge nach 2 Wochen |
| Pareto-Ansicht funktioniert | Mindestens 1 Skill als PARETO-OPTIMAL, 1 als DOMINATED identifiziert |
| Erster Alert feuert | Mindestens 1 Quality-Drop oder Cost-Outlier-Alert |
| improve-Skill nutzt Daten | improve-Output referenziert skill_metrics |
| User-Entscheidung wird getroffen | Mindestens 1 Skill-Änderung basierend auf Performance-Daten |

</div>

---

<div lang='en' markdown='1'>

## Connection to Nowak

This Phase 1 implements the **measurement apparatus** — Nowak's `fᵢ` (fitness per individual) and `φ` (population average). Without this measurement there is no selection pressure, only drift.

The Pareto view (Quality vs. Cost) is the first step toward multi-objective selection — EvoFlow's core idea, applied to our system.

The triggers are the **selection pressure** — they don't force change, but they make visible WHERE change would be needed. This is the transition from "no signal" to "signal present" — the first step of the phase transition.

</div>

<div lang='de' markdown='1'>

## Verbindung zu Nowak

Diese Phase 1 implementiert den **Messapparat** — Nowaks `fᵢ` (Fitness pro Individuum) und `φ` (Populations-Durchschnitt). Ohne diese Messung gibt es keinen Selektionsdruck, nur Drift.

Die Pareto-Ansicht (Quality vs. Cost) ist der erste Schritt zu Multi-Objective-Selektion — EvoFlow's Kernidee, auf unser System übertragen.

Die Trigger sind der **Selektionsdruck** — sie erzwingen keine Änderung, aber sie machen sichtbar, WO Änderung nötig wäre. Das ist der Übergang von "kein Signal" zu "Signal vorhanden" — der erste Schritt des Phasenübergangs.

</div>
