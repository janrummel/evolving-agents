---
layout: default
title: "Deep Dive: EvoFlow, MCE, AgentFactory"
parent: Research
nav_order: 3
---

<div lang='en' markdown='1'>

# Deep Dive: EvoFlow, MCE, AgentFactory — and What AgentField Can Learn

{: .note }
> **Reading: 3 of 5** · After reading this, you'll understand how EvoFlow implements niching selection for workflows, how MCE formalizes skill co-evolution, and a concrete 4-phase upgrade path from Prelife to full agent evolution.

**Date:** 2026-03-19
**Type:** Comparative Analysis (3 Papers → 1 System)

</div>

<div lang='de' markdown='1'>

# Deep Dive: EvoFlow, MCE, AgentFactory — und was AgentField daraus lernen kann

{: .note }
> **Lesehinweis: 3 von 5** · Nach der Lektüre verstehst du, wie EvoFlow Niching-Selektion für Workflows implementiert, wie MCE Skill-Ko-Evolution formalisiert, und einen konkreten 4-Phasen-Upgrade-Pfad von Prelife zu voller Agent-Evolution.

**Datum:** 2026-03-19
**Typ:** Vergleichsanalyse (3 Papers → 1 System)

</div>

---

<div lang='en' markdown='1'>

## 1. The Three Papers at a Glance

<div class="section-summary">
<h4>Section Summary</h4>
<p><strong>EvoFlow</strong> evolves a population of workflows (beat o1-preview at 12.4% cost). <strong>MCE</strong> co-evolves skills via meta-agent (+16.9% avg). <strong>AgentFactory</strong> stores solutions as executable code, not text. Together they show three independent paths from manual to evolutionary agent design.</p>
</div>

### EvoFlow (2502.07373) — Population-Based Workflow Evolution

**Core Idea:** Instead of searching for ONE optimal workflow, evolve a POPULATION of heterogeneous workflows. Use niching selection (related to MAP-Elites) to maintain diversity and quality simultaneously.

**Architecture (3 Levels):**

```
Workflow G = (O, Eᵃ)     ← Directed graph of operator nodes
  └── Operator Oⱼ = (Iⱼ, ξⱼ) ← Collection of Invoking Nodes + internal connectivity
       └── Invoking Node Iᵢ = (Mᵢ, Pᵢ, τᵢ) ← LLM model + Prompt + Temperature
```

**Evolutionary Cycle:**
1. **Tag-based Retrieval:** Select parent workflows from the population based on task tags
2. **Crossover:** Combine elements of two parent workflows
3. **Mutation (3 Types):**
   - LLM Mutation: Switch to a different model
   - Prompt Mutation: Refine template
   - Operator Mutation: Modify workflow structure
4. **Niching Selection:** Retain diverse, high-performing workflows along the Pareto front (Quality vs. Cost)

**Optimization:** Multi-Objective: `max{u(G,q), -c(G,q)}` — maximize Utility, minimize Cost.

**Operator Repository** (8 types from the paper): CoT, LLM-Debate (3 debaters, majority voting), Take-a-Step-Back, Self-Consistency (5 CoT paths), Self-Refine (iterative, max 5), Ensemble (3 LLMs + pairwise ranking), ReAct (tool use), ExpertPrompt (dynamic control flows).

**Seed Population:** 4 initial workflow types (Reflective Agent I/O, Arithmetic Collaborator, Lightweight Programmer, Advanced Multi-programmer).

**Results** (verified against full text, Tables 1–4):

| Benchmark | EvoFlow | Best Baseline (AFlow) | Improvement |
|-----------|---------|----------------------|-------------|
| GSM8K | 92.90% | 91.16% | +1.74pp |
| MATH | 57.70% | 51.28% | +6.42pp |
| HumanEval | 92.85% | 90.93% | +1.92pp |
| MBPP | 84.50% | 81.67% | +2.83pp |
| ALFWorld | 68.57% | 59.16% | +9.41pp |

- Outperformed o1-preview by **+2.7%** on MATH at **12.4% of its cost** (using open-source models: LLaMa-3.1-70b, Qwen-2.5-72b, Deepseek-V2.5, Hermes-3-70b)
- Training cost: $0.459 vs. $1.223 (AFlow) — **37.5%**
- Inference cost: $0.513 vs. $2.623 (AFlow) — **19.5%**
- Unique: Only system with **LLM heterogeneity AND complexity adaptivity**

**Ablation** (what matters most): Tag-based Retrieval and LLM Mutation are critical — removing either causes significant performance drops + variance increase. Operator Mutation contributes 3.5–7.3%.

<div class="key-box green">
<h4>💡 Key Insight</h4>
<p>EvoFlow beat o1-preview on MATH at just 12.4% of the cost — by evolving a population of heterogeneous workflows with open-source models. Population diversity + multi-objective selection is the key mechanism.</p>
</div>

---

### MCE — Meta Context Engineering (2601.21557) — Skill Co-evolution

**Core Idea:** Context Engineering (CE) should not be designed manually. Instead: A Meta-Agent that automatically refines CE skills while a Base-Agent executes those skills.

**Bi-Level Architecture:**

```
Meta-Agent (upper level)
  ├── Deliberative Search over: historical skills, executions, evaluations
  ├── "Agentic Crossover": Combine successful skill elements
  └── Refine skills iteratively

Base-Agent (lower level)
  ├── Executes skills
  ├── Optimizes context artifacts
  └── Provides feedback to Meta-Agent
```

**Results:** 5.6–53.8% improvement over SOTA CE methods (mean: 16.9%), tested across 5 domains, offline + online.

<div class="key-box green">
<h4>💡 Key Insight</h4>
<p>MCE's bi-level architecture (Meta-Agent refines skills, Base-Agent executes them) is directly applicable to AgentField: our Quality-Gate + Pulse already provide the evaluation signal — we just need to close the loop.</p>
</div>

---

### AgentFactory (2603.18000) — Executable Subagent Accumulation

**Core Idea:** Don't store successful solutions as text experience (fragile), but as **executable subagent code** (Python). These subagents are continuously refined and reused.

**Key Innovation:**
- Textual reflection (e.g., "do it differently next time") ≠ reliable re-execution
- Executable code = deterministically repeatable
- Standardized Python documentation → portability across systems
- Library grows over time → progressive effort reduction

<div class="key-box green">
<h4>💡 Key Insight</h4>
<p>AgentFactory's core lesson: executable code beats textual reflection for reliable reuse. Our SKILL.md files are already semi-structured code — we're closer to this pattern than it seems.</p>
</div>

</div>

<div lang='de' markdown='1'>

## 1. Die drei Papers im Überblick

<div class="section-summary">
<h4>Abschnitt-Zusammenfassung</h4>
<p><strong>EvoFlow</strong> evolviert eine Population von Workflows (o1-preview geschlagen bei 12,4% der Kosten). <strong>MCE</strong> ko-evolviert Skills via Meta-Agent (+16,9% Ø). <strong>AgentFactory</strong> speichert Lösungen als ausführbaren Code, nicht Text. Zusammen zeigen sie drei unabhängige Wege von manuellem zu evolutionärem Agent-Design.</p>
</div>

### EvoFlow (2502.07373) — Populationsbasierte Workflow-Evolution

**Kernidee:** Statt EINEN optimalen Workflow zu suchen, evolve eine POPULATION heterogener Workflows. Nutze Niching-Selektion (verwandt mit MAP-Elites) um Diversität und Qualität gleichzeitig zu erhalten.

**Architektur (3 Ebenen):**

```
Workflow G = (O, Eᵃ)     ← Gerichteter Graph von Operator-Knoten
  └── Operator Oⱼ = (Iⱼ, ξⱼ) ← Sammlung von Invoking Nodes + interne Konnektivität
       └── Invoking Node Iᵢ = (Mᵢ, Pᵢ, τᵢ) ← LLM-Modell + Prompt + Temperature
```

**Evolutionärer Zyklus:**
1. **Tag-based Retrieval:** Wähle Eltern-Workflows aus der Population basierend auf Aufgaben-Tags
2. **Crossover:** Kombiniere Elemente zweier Eltern-Workflows
3. **Mutation (3 Typen):**
   - LLM-Mutation: Anderes Modell einsetzen
   - Prompt-Mutation: Template verfeinern
   - Operator-Mutation: Workflow-Struktur ändern
4. **Niching Selection:** Behalte diverse, hochperformante Workflows entlang der Pareto-Front (Quality vs. Cost)

**Optimierung:** Multi-Objective: `max{u(G,q), -c(G,q)}` — Utility maximieren, Cost minimieren.

**Operator-Repository** (8 Typen aus dem Paper): CoT, LLM-Debate (3 Debatter, Majority Voting), Take-a-Step-Back, Self-Consistency (5 CoT-Pfade), Self-Refine (iterativ, max 5), Ensemble (3 LLMs + Pairwise Ranking), ReAct (Tool-Nutzung), ExpertPrompt (dynamische Control Flows).

**Seed Population:** 4 initiale Workflow-Typen (Reflective Agent I/O, Arithmetic Collaborator, Lightweight Programmer, Advanced Multi-programmer).

**Ergebnisse** (verifiziert am Volltext, Tabellen 1–4):

| Benchmark | EvoFlow | Beste Baseline (AFlow) | Verbesserung |
|-----------|---------|----------------------|-------------|
| GSM8K | 92,90% | 91,16% | +1,74pp |
| MATH | 57,70% | 51,28% | +6,42pp |
| HumanEval | 92,85% | 90,93% | +1,92pp |
| MBPP | 84,50% | 81,67% | +2,83pp |
| ALFWorld | 68,57% | 59,16% | +9,41pp |

- o1-preview um **+2,7%** auf MATH übertroffen bei **12,4% der Kosten** (mit Open-Source-Modellen: LLaMa-3.1-70b, Qwen-2.5-72b, Deepseek-V2.5, Hermes-3-70b)
- Training-Kosten: $0,459 vs. $1,223 (AFlow) — **37,5%**
- Inferenz-Kosten: $0,513 vs. $2,623 (AFlow) — **19,5%**
- Einzigartig: Einziges System mit **LLM-Heterogenität UND Komplexitäts-Adaptivität**

**Ablation** (was am meisten zählt): Tag-based Retrieval und LLM-Mutation sind kritisch — das Entfernen einer Komponente verursacht signifikante Performance-Einbrüche + Varianzanstieg. Operator-Mutation trägt 3,5–7,3% bei.

<div class="key-box green">
<h4>💡 Kernerkenntnis</h4>
<p>EvoFlow schlägt o1-preview auf MATH bei nur 12,4% der Kosten — durch Evolution einer Population heterogener Workflows mit Open-Source-Modellen. Populationsdiversität + Multi-Objective-Selektion ist der Schlüsselmechanismus.</p>
</div>

---

### MCE — Meta Context Engineering (2601.21557) — Skill-Koevolution

**Kernidee:** Context Engineering (CE) sollte nicht manuell designt werden. Stattdessen: Ein Meta-Agent, der CE-Skills automatisch verfeinert, während ein Base-Agent diese Skills ausführt.

**Bi-Level-Architektur:**

```
Meta-Agent (obere Ebene)
  ├── Deliberative Search über: historische Skills, Ausführungen, Evaluationen
  ├── "Agentic Crossover": Kombiniere erfolgreiche Skill-Elemente
  └── Verfeinere Skills iterativ

Base-Agent (untere Ebene)
  ├── Führt Skills aus
  ├── Optimiert Context-Artefakte
  └── Liefert Feedback an Meta-Agent
```

**Ergebnisse:** 5.6–53.8% Verbesserung über SOTA CE-Methoden (Mittel: 16.9%), getestet in 5 Domänen, offline + online.

<div class="key-box green">
<h4>💡 Kernerkenntnis</h4>
<p>MCEs Bi-Level-Architektur (Meta-Agent verfeinert Skills, Base-Agent führt sie aus) ist direkt auf AgentField übertragbar: Unser Quality-Gate + Pulse liefern bereits das Evaluationssignal — wir müssen nur den Loop schließen.</p>
</div>

---

### AgentFactory (2603.18000) — Executable Subagent Accumulation

**Kernidee:** Erfolgreiche Lösungen nicht als Text-Erfahrung speichern (fragil), sondern als **ausführbaren Subagent-Code** (Python). Diese Subagents werden kontinuierlich verfeinert und wiederverwendet.

**Schlüsselinnovation:**
- Textuelle Reflexion (z.B. "nächstes Mal anders machen") ≠ zuverlässige Re-Execution
- Ausführbarer Code = deterministisch wiederholbar
- Standardisierte Python-Dokumentation → Portabilität über Systeme hinweg
- Bibliothek wächst über Zeit → progressive Aufwandsreduktion

<div class="key-box green">
<h4>💡 Kernerkenntnis</h4>
<p>AgentFactorys Kernlektion: Ausführbarer Code schlägt textuelle Reflexion für zuverlässige Wiederverwendung. Unsere SKILL.md-Dateien sind bereits semi-strukturierter Code — wir sind diesem Pattern näher als gedacht.</p>
</div>

</div>

---

<div lang='en' markdown='1'>

## 2. The Isomorphism Table: EvoFlow → MCE → AgentFactory → AgentField

<div class="key-box amber">
<h4>⚠️ Gap Analysis</h4>
<p>5 of 11 concepts are missing or partial: Mutation (not automated), Crossover (missing entirely), Diversity mechanism (none), Cost awareness (no tracking), and Feedback loop (open). These are the targets for Phases 1–3.</p>
</div>

| Concept | EvoFlow | MCE | AgentFactory | AgentField | Status |
|---------|---------|-----|-------------|------------|------------|
| **Base Unit** | Invoking Node (M, P, τ) | CE Skill | Executable Subagent (Python) | Skill (SKILL.md) | ✅ Available |
| **Composition** | Operator Node (node cluster) | Skill chain | Subagent library | Skill-Chain (max 4) | ✅ Available |
| **Overall System** | Workflow (DAG) | Meta+Base-Agent | Growing library | Orchestrator + Skills | ✅ Available |
| **Selection** | Niching (Pareto: Quality/Cost) | Evaluation + Deliberative Search | Execution Feedback | Quality-Gate | ⚠️ Quality only, no Cost |
| **Mutation** | LLM/Prompt/Operator Mutation | Skill refinement | Code refinement via feedback | Manual skill editing | ❌ Not automated |
| **Crossover** | Workflow recombination | "Agentic Crossover" | — | — | ❌ Missing entirely |
| **Retrieval** | Tag-based (κ tags/individual) | History-based | Code search in library | orchestrator-routing | ⚠️ Intent-based, not tag-based |
| **Population** | N workflows in parallel | Skill variants | Subagent library | ~30 Skills | ⚠️ Static, no evolution |
| **Diversity** | Niching Selection enforces diversity | Domain diversity | Natural growth | Manually curated | ❌ No diversity mechanism |
| **Feedback Loop** | Benchmark evaluation → Selection | Meta-Agent evaluation | Execution feedback → Refinement | Pulse metrics + Quality-Gate | ⚠️ Feedback exists, loop missing |
| **Cost Awareness** | Multi-Objective (Quality + Cost) | Efficiency as secondary goal | Effort reduction as goal | — | ❌ No token cost tracking |

**Legend:** ✅ = we have it, ⚠️ = partial, ❌ = missing

</div>

<div lang='de' markdown='1'>

## 2. Die Isomorphie-Tabelle: EvoFlow → MCE → AgentFactory → AgentField

<div class="key-box amber">
<h4>⚠️ Gap-Analyse</h4>
<p>5 von 11 Konzepten fehlen oder sind unvollständig: Mutation (nicht automatisiert), Crossover (fehlt komplett), Diversitäts-Mechanismus (keiner), Cost-Awareness (kein Tracking), Feedback-Loop (offen). Das sind die Ziele für Phase 1–3.</p>
</div>

| Konzept | EvoFlow | MCE | AgentFactory | AgentField | Status |
|---------|---------|-----|-------------|------------|----------------|
| **Basiseinheit** | Invoking Node (M, P, τ) | CE Skill | Executable Subagent (Python) | Skill (SKILL.md) | ✅ Vorhanden |
| **Komposition** | Operator Node (Knoten-Cluster) | Skill-Kette | Subagent-Bibliothek | Skill-Chain (max 4) | ✅ Vorhanden |
| **Gesamtsystem** | Workflow (DAG) | Meta+Base-Agent | Wachsende Bibliothek | Orchestrator + Skills | ✅ Vorhanden |
| **Selektion** | Niching (Pareto: Quality/Cost) | Evaluation + Deliberative Search | Execution Feedback | Quality-Gate | ⚠️ Nur Quality, kein Cost |
| **Mutation** | LLM/Prompt/Operator-Mutation | Skill-Verfeinerung | Code-Refinement via Feedback | Manuelles Skill-Editing | ❌ Nicht automatisiert |
| **Crossover** | Workflow-Rekombination | "Agentic Crossover" | — | — | ❌ Fehlt komplett |
| **Retrieval** | Tag-based (κ Tags/Individual) | History-basiert | Code-Suche in Bibliothek | orchestrator-routing | ⚠️ Intent-basiert, nicht tag-basiert |
| **Population** | N Workflows parallel | Skill-Varianten | Subagent-Bibliothek | ~30 Skills | ⚠️ Statisch, keine Evolution |
| **Diversität** | Niching Selection erzwingt Diversität | Domänen-Diversität | Natürliches Wachstum | Manuell kuratiert | ❌ Kein Diversitäts-Mechanismus |
| **Feedback-Loop** | Benchmark-Evaluation → Selection | Meta-Agent-Evaluation | Execution Feedback → Refinement | Pulse-Metriken + Quality-Gate | ⚠️ Feedback existiert, Loop fehlt |
| **Cost-Awareness** | Multi-Objective (Quality + Cost) | Effizienz als Nebenziel | Aufwandsreduktion als Ziel | — | ❌ Kein Token-Cost-Tracking |

**Legende:** ✅ = haben wir, ⚠️ = teilweise, ❌ = fehlt

</div>

---

<div lang='en' markdown='1'>

## 3. What AgentField Can Concretely Learn

### 3.1 Immediately Actionable: Cost Tracking as a Second Optimization Axis

**EvoFlow Insight:** Multi-Objective (Quality + Cost) is better than Single-Objective (Quality only).

**For Us:** Pulse already tracks token usage. Integrate this signal as a second axis in Quality-Gate:
- Quality score ≥ threshold AND token cost ≤ budget → Keep
- Alternatively: Pareto visualization per skill (Quality vs. Cost)

**Effort:** Low. Pulse data exists, Quality-Gate just needs to be extended.

### 3.2 Short-term: Tag-based Skill Retrieval

**EvoFlow Insight:** Tag-based Retrieval (κ tags per workflow) is better than free text search for skill selection. Ablation: -3–4% performance without tags.

**For Us:** orchestrator-routing works intent-based (text classification). Supplement with structured tags:
- Each skill gets tags: `domain`, `complexity`, `input-type`, `output-type`
- Routing uses tag matching as first stage, intent classification as fallback

**Effort:** Medium. Define tag schema, tag skills, adjust routing.

### 3.3 Medium-term: Automated Skill Mutation

**MCE Insight:** A Meta-Agent can automatically refine skills through "deliberative search over history of skills, executions, and evaluations."

**AgentFactory Insight:** Executable code > textual reflection for reliable reuse.

**For Us:** Our skills ARE already semi-structured code (SKILL.md with workflow steps). The step toward automatic mutation:
1. **Prompt Mutation:** Small variations in skill instructions, A/B test via Pulse metrics
2. **Workflow Mutation:** Add/remove steps, change ordering
3. **Evaluation:** Quality-Gate + token cost as fitness

**Effort:** High. Requires: skill versioning, A/B testing infrastructure, automatic evaluation.

### 3.4 Long-term: Crossover — Combining Existing Skills into New Ones

**EvoFlow Insight:** Crossover (combining elements of two parent workflows) produces solutions that neither parent could achieve alone.

**MCE Insight:** "Agentic Crossover" = not random recombination, but deliberative search over historical successes.

**For Us:** Could we, for example, cross research-pipeline + challenge into an "adversarial research" skill? Or express + signal-check into a "self-checked writing" skill?

**Prerequisite:** Skill mutation must work first. Crossover is the next step.

</div>

<div lang='de' markdown='1'>

## 3. Was AgentField konkret lernen kann

### 3.1 Sofort umsetzbar: Cost-Tracking als zweite Optimierungsachse

**EvoFlow-Insight:** Multi-Objective (Quality + Cost) ist besser als Single-Objective (nur Quality).

**Für uns:** Pulse trackt bereits Token-Verbrauch. Dieses Signal als zweite Achse in Quality-Gate einbauen:
- Quality-Score ≥ Schwelle UND Token-Cost ≤ Budget → Keep
- Alternativ: Pareto-Darstellung pro Skill (Quality vs. Cost)

**Aufwand:** Gering. Pulse-Daten existieren, Quality-Gate muss nur erweitert werden.

### 3.2 Kurzfristig: Tag-basiertes Skill-Retrieval

**EvoFlow-Insight:** Tag-based Retrieval (κ Tags pro Workflow) ist besser als freie Textsuche für Skill-Auswahl. Ablation: -3-4% Performance ohne Tags.

**Für uns:** orchestrator-routing arbeitet intent-basiert (Textklassifikation). Ergänzung um strukturierte Tags:
- Jeder Skill bekommt Tags: `domain`, `complexity`, `input-type`, `output-type`
- Routing nutzt Tag-Matching als erste Stufe, Intent-Klassifikation als Fallback

**Aufwand:** Mittel. Tag-Schema definieren, Skills taggen, Routing anpassen.

### 3.3 Mittelfristig: Automatisierte Skill-Mutation

**MCE-Insight:** Ein Meta-Agent kann Skills durch "deliberative search over history of skills, executions, and evaluations" automatisch verfeinern.

**AgentFactory-Insight:** Executable Code > textuelle Reflexion für zuverlässige Wiederverwendung.

**Für uns:** Unsere Skills SIND bereits semi-strukturierter Code (SKILL.md mit Workflow-Steps). Der Schritt zu automatischer Mutation:
1. **Prompt-Mutation:** Kleine Variationen in Skill-Anweisungen, A/B-Test über Pulse-Metriken
2. **Workflow-Mutation:** Schritte hinzufügen/entfernen, Reihenfolge ändern
3. **Bewertung:** Quality-Gate + Token-Cost als Fitness

**Aufwand:** Hoch. Braucht: Skill-Versionierung, A/B-Test-Infrastruktur, automatische Evaluation.

### 3.4 Langfristig: Crossover — neue Skills aus bestehenden kombinieren

**EvoFlow-Insight:** Crossover (Elemente zweier Eltern-Workflows kombinieren) erzeugt Lösungen, die keiner der Eltern allein erreicht hätte.

**MCE-Insight:** "Agentic Crossover" = nicht zufällige Rekombination, sondern deliberative Search über historische Erfolge.

**Für uns:** Könnten wir z.B. research-pipeline + challenge zu einem "adversarial research" Skill kreuzen? Oder express + signal-check zu einem "self-checked writing" Skill?

**Voraussetzung:** Skill-Mutation muss erst funktionieren. Crossover ist der nächste Schritt.

</div>

---

<div lang='en' markdown='1'>

## 4. The Nowak Bridge — Formal Correspondences

| Nowak | EvoFlow | AgentField (Current) | AgentField (Target) |
|-------|---------|----------------------|---------------------|
| Sequence/Replicator | Invoking Node (M,P,τ) | Skill (SKILL.md) | Skill with version + tags |
| Fitness fᵢ | Utility u(G,q) | Quality score | Quality + Cost (Pareto) |
| Mutation | 3 mutation types | Manual editing | Automated skill mutation |
| Selection (φ) | Niching (Pareto) | Quality-Gate (binary) | Multi-Objective Niching |
| Replication | Seed population → inheritance | SKILL.md remains static | Skill versioning + inheritance |
| Population size | N workflows | ~30 Skills | 30+ Skills, actively managed |
| Error Threshold | Max. mutations/iteration | Deviation Rules (max 3 fixes) | Formalized: 1 change/iteration |
| Prelife → Life | Seed → evolved population | Manual → ? | Manual → automatic |
| Cooperation (Γ) | Workflow composition | Skill chains | Measurable cooperation gains |

**Key Observation:** AgentField is currently in the **"Prelife" phase** according to Nowak's terminology — there is diversity and selection (Quality-Gate), but no **replication** (automatic inheritance of successful patterns). EvoFlow shows what the phase transition to "Life" could look like.

</div>

<div lang='de' markdown='1'>

## 4. Die Nowak-Brücke — formale Entsprechungen

| Nowak | EvoFlow | AgentField (Ist) | AgentField (Soll) |
|-------|---------|-------------------|-------------------|
| Sequenz/Replikator | Invoking Node (M,P,τ) | Skill (SKILL.md) | Skill mit Version + Tags |
| Fitness fᵢ | Utility u(G,q) | Quality-Score | Quality + Cost (Pareto) |
| Mutation | 3 Mutations-Typen | Manuelles Editing | Automatisierte Skill-Mutation |
| Selektion (φ) | Niching (Pareto) | Quality-Gate (binary) | Multi-Objective Niching |
| Replikation | Seed-Population → Vererbung | SKILL.md bleibt statisch | Skill-Versionierung + Vererbung |
| Populationsgröße | N Workflows | ~30 Skills | 30+ Skills, aktiv gemanagt |
| Error Threshold | Max. Mutationen/Iteration | Deviation Rules (max 3 Fixes) | Formalisiert: 1 Änderung/Iteration |
| Prelife → Life | Seed → evolvierte Population | Manuell → ? | Manuell → automatisch |
| Kooperation (Γ) | Workflow-Komposition | Skill-Chains | Messbare Kooperationsgewinne |

**Schlüsselbeobachtung:** AgentField befindet sich derzeit in der **"Prelife"-Phase** nach Nowaks Terminologie — es gibt Diversität und Selektion (Quality-Gate), aber keine **Replikation** (automatische Vererbung erfolgreicher Muster). EvoFlow zeigt, wie der Phasenübergang zu "Life" aussehen könnte.

</div>

---

<div lang='en' markdown='1'>

## 5. The Upgrade Path: Prelife → Life for AgentField

<div class="key-box green">
<h4>💡 The Roadmap</h4>
<p>4 phases: (0) Manual curation → (1) Close the feedback loop → (2) Automated mutation → (3) Population management. Each phase builds on the previous one. Phase 1 is specified and ready to implement.</p>
</div>

```
Phase 0 (NOW): Prelife
  - Skills exist, are manually curated
  - Quality-Gate selects, but without consequences for skills themselves
  - Pulse measures, but metrics don't flow into skill changes

Phase 1: Close the Feedback Loop
  - Cost tracking as second axis (Pulse → Quality-Gate)
  - Tag-based retrieval in the Orchestrator
  - Skill performance history (which skill, which task, which score)

Phase 2: Automated Mutation
  - Automatically test prompt variations (A/B)
  - MCE pattern: Meta-Agent proposes skill changes
  - Human decides (keep/discard) → Human-in-the-Loop selection

Phase 3: Population Management
  - Multiple skill variants per task type
  - Niching: Explicitly preserve diversity
  - Crossover: Generate new skills from existing ones

Phase 4: Full Evolution (= "Life")
  - Automatic cycle: Task → Skill selection → Execution → Evaluation → Mutation/Selection
  - The phase transition rₓ: From here, the system improves faster through evolution than through manual curation
```

</div>

<div lang='de' markdown='1'>

## 5. Der Upgrade-Pfad: Prelife → Life für AgentField

<div class="key-box green">
<h4>💡 Die Roadmap</h4>
<p>4 Phasen: (0) Manuelle Kuration → (1) Feedback-Loop schließen → (2) Automatisierte Mutation → (3) Populationsmanagement. Jede Phase baut auf der vorherigen auf. Phase 1 ist spezifiziert und implementierungsbereit.</p>
</div>

```
Phase 0 (JETZT): Prelife
  - Skills existieren, werden manuell kuratiert
  - Quality-Gate selektiert, aber ohne Konsequenz für Skills selbst
  - Pulse misst, aber Metriken fließen nicht in Skill-Änderungen

Phase 1: Feedback-Loop schließen
  - Cost-Tracking als zweite Achse (Pulse → Quality-Gate)
  - Tag-basiertes Retrieval im Orchestrator
  - Skill-Performance-Historie (welcher Skill, welcher Task, welcher Score)

Phase 2: Automatisierte Mutation
  - Prompt-Variationen automatisch testen (A/B)
  - MCE-Pattern: Meta-Agent schlägt Skill-Änderungen vor
  - Mensch entscheidet (keep/discard) → Human-in-the-Loop Selektion

Phase 3: Population Management
  - Mehrere Skill-Varianten pro Task-Typ
  - Niching: Diversität explizit erhalten
  - Crossover: Neue Skills aus bestehenden generieren

Phase 4: Full Evolution (= "Life")
  - Automatischer Zyklus: Task → Skill-Auswahl → Execution → Evaluation → Mutation/Selection
  - Der Phasenübergang rₓ: Ab hier verbessert sich das System schneller durch Evolution als durch manuelle Kuration
```

</div>

---

<div lang='en' markdown='1'>

## 6. Critical Assessment

### What EvoFlow Does NOT Address (and We Must Consider)

1. **No persistent memory:** EvoFlow evaluates on benchmarks, has no session history. AgentField's memory system is a fundamental advantage.
2. **No Human-in-the-Loop:** EvoFlow is fully automatic. Our human feedback is a richer signal than automatic evaluation.
3. **No context:** EvoFlow works on isolated tasks. Our projects have rich context (project state, Vault, Episodic Memory).
4. **Benchmark ≠ Real World:** EvoFlow's 29.86% improvement is on MATH/GSM8K. Whether this transfers to open, creative tasks (our core domain) remains unclear.

### What MCE Does NOT Address

1. **No population diversity:** MCE co-evolves ONE skill set, not a population. No niching.
2. **No cost optimization:** Only performance as a goal.

### What AgentFactory Does NOT Address

1. **Code tasks only:** Executable subagents = Python code. Our skills are broader (Research, Writing, Analysis).
2. **No composition:** Subagents are accumulated individually, not combined.

### Our Unique Position

AgentField sits at an intersection that none of the three papers covers:
- **Population diversity** (EvoFlow) + **Skill co-evolution** (MCE) + **Persistent Memory** (us)
- Additionally: **Human-in-the-Loop** as the richest feedback signal
- And: **Project context** as information that none of the benchmark papers have

</div>

<div lang='de' markdown='1'>

## 6. Kritische Einordnung

### Was EvoFlow NICHT adressiert (und wir berücksichtigen müssen)

1. **Kein persistentes Gedächtnis:** EvoFlow evaluiert auf Benchmarks, hat keine Session-History. AgentField's memory-System ist ein fundamentaler Vorteil.
2. **Keine Human-in-the-Loop:** EvoFlow ist voll automatisch. Unser Human-Feedback ist reicheres Signal als automatische Evaluation.
3. **Kein Kontext:** EvoFlow arbeitet auf isolierten Tasks. Unsere Projekte haben reichen Kontext (Projekt-State, Vault, Episodic Memory).
4. **Benchmark ≠ Real World:** EvoFlow's 29.86% Verbesserung ist auf MATH/GSM8K. Ob das auf offene, kreative Aufgaben (unsere Kerndomäne) übertragbar ist: unklar.

### Was MCE NICHT adressiert

1. **Keine Populationsdiversität:** MCE ko-evolviert EIN Skill-Set, nicht eine Population. Kein Niching.
2. **Keine Cost-Optimierung:** Nur Performance als Ziel.

### Was AgentFactory NICHT adressiert

1. **Nur Code-Aufgaben:** Executable Subagents = Python-Code. Unsere Skills sind breiter (Research, Writing, Analysis).
2. **Keine Komposition:** Subagents werden einzeln akkumuliert, nicht kombiniert.

### Unsere einzigartige Position

Agent systems sit an einer Kreuzung, die keines der drei Papers abdeckt:
- **Populationsdiversität** (EvoFlow) + **Skill-Koevolution** (MCE) + **Persistent Memory** (wir)
- Dazu: **Human-in-the-Loop** als reichstes Feedback-Signal
- Und: **Projektkontext** als Information, die keines der Benchmark-Papers hat

</div>

---

<div lang='en' markdown='1'>

## References

- [EvoFlow Paper](https://arxiv.org/abs/2502.07373) | [EmergentMind Analysis](https://www.emergentmind.com/papers/2502.07373)
- [MCE Paper](https://arxiv.org/abs/2601.21557)
- [AgentFactory Paper](https://arxiv.org/abs/2603.18000)
- [EvoAgentX GitHub](https://github.com/EvoAgentX/EvoAgentX)
- [OpenReview: EvoFlow](https://openreview.net/forum?id=gdmiLfXZG5)

</div>

<div lang='de' markdown='1'>

## Quellen

- [EvoFlow Paper](https://arxiv.org/abs/2502.07373) | [EmergentMind Analysis](https://www.emergentmind.com/papers/2502.07373)
- [MCE Paper](https://arxiv.org/abs/2601.21557)
- [AgentFactory Paper](https://arxiv.org/abs/2603.18000)
- [EvoAgentX GitHub](https://github.com/EvoAgentX/EvoAgentX)
- [OpenReview: EvoFlow](https://openreview.net/forum?id=gdmiLfXZG5)

</div>
