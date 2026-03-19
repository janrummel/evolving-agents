---
layout: default
title: "Phase 1: Feedback Loop"
parent: Engineering
nav_order: 1
---

# Phase 1 Spec: Feedback-Loop schließen

**Ziel:** Den evolutionären Loop von "Prelife" (Feedback stirbt nach Quality-Gate) zu "Proto-Life" (Feedback fließt in Skill-Bewertung und triggert Verbesserung) bringen.

**Scope:** Minimal Viable Feedback Loop. Kein automatisches Mutieren — nur Messen, Sichtbar machen, Trigger setzen.

**Inspiriert von:** EvoFlow (Pareto: Quality + Cost), EvoAgentX (Evaluation Layer), MCE (History of skills, executions, evaluations)

---

## Was existiert (IST)

| Komponente | Tool | Was es liefert | Wo es endet |
|-----------|------|---------------|-------------|
| Skill-Ausführung | orchestrator-routing | Welcher Skill für welchen Intent | Log in knowledge.db (skills_usage) |
| Token-Verbrauch | Pulse | Tokens/Session, Velocity | Pulse-DB (SQLite) |
| Qualität | Quality-Gate / signal-check | Quality-Score per Output | memory/quality-scores.md |
| Routing-Historie | routing-log | Skill → Trigger → Outcome | knowledge.db |

**Das Problem:** Diese 4 Datenströme sind nicht verbunden. Wir wissen nicht: "Skill X kostet durchschnittlich Y Tokens und liefert Quality-Score Z."

---

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

---

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

---

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

---

## Was Phase 1 NICHT tut

- ❌ Automatisches Mutieren von Skills
- ❌ A/B-Testing von Skill-Varianten
- ❌ Crossover (neue Skills aus bestehenden)
- ❌ Populationsmanagement (Niching)
- ❌ Automatische Workflow-Topologie-Änderungen

All das ist Phase 2+. Phase 1 liefert die **Datenbasis**, ohne die keine Evolution möglich ist.

---

## Erfolgskriterien

| Kriterium | Messung |
|-----------|---------|
| Performance-Daten werden gesammelt | ≥ 50 Einträge nach 2 Wochen |
| Pareto-Ansicht funktioniert | Mindestens 1 Skill als PARETO-OPTIMAL, 1 als DOMINATED identifiziert |
| Erster Alert feuert | Mindestens 1 Quality-Drop oder Cost-Outlier-Alert |
| improve-Skill nutzt Daten | improve-Output referenziert skill_metrics |
| User-Entscheidung wird getroffen | Mindestens 1 Skill-Änderung basierend auf Performance-Daten |

---

## Verbindung zu Nowak

Diese Phase 1 implementiert den **Messapparat** — Nowaks `fᵢ` (Fitness pro Individuum) und `φ` (Populations-Durchschnitt). Ohne diese Messung gibt es keinen Selektionsdruck, nur Drift.

Die Pareto-Ansicht (Quality vs. Cost) ist der erste Schritt zu Multi-Objective-Selektion — EvoFlow's Kernidee, auf unser System übertragen.

Die Trigger sind der **Selektionsdruck** — sie erzwingen keine Änderung, aber sie machen sichtbar, WO Änderung nötig wäre. Das ist der Übergang von "kein Signal" zu "Signal vorhanden" — der erste Schritt des Phasenübergangs.
