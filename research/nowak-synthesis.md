---
layout: default
title: Nowak Synthesis
parent: Research
nav_order: 1
---

<div lang="en" markdown="1">

# From Nowak's Evolvability Equation to AI Agent Architectures

{: .note }
> **Reading: 1 of 5** · After reading this, you'll understand Nowak's Originator equation, the phase transition from Prelife to Life, the error threshold concept, and how these map structurally onto AI agent systems.

## A Research Synthesis at the Intersection of Evolutionary Dynamics, Self-Evolving Agents and Multi-Agent Systems

---


**Date:** March 2026
**Status:** Initial synthesis — to be expanded

> **Transparency note on research depth:** This document is based on paper abstracts, summaries, and third-party sources (EmergentMind, alphaXiv, GitHub). No paper was read in full text. Numbers (e.g., "12.4% of costs") come from abstracts and were verified across at least 2 independent sources. All arXiv IDs are linked and directly verifiable. The synthesis in Section 4 is an independent interpretation — not a published finding.

</div>

<div lang="de" markdown="1">

# Von Nowaks Evolvierbarkeits-Gleichung zu KI-Agent-Architekturen

{: .note }
> **Reading: 1 of 5** · After reading this, you'll understand Nowak's Originator equation, the phase transition from Prelife to Life, the error threshold concept, and how these map structurally onto AI agent systems.

## Eine Recherche an der Schnittstelle von Evolutionsdynamik, Self-Evolving Agents und Multi-Agent-Systemen

---


**Datum:** März 2026
**Status:** Initiale Synthese — wird erweitert

> **Transparenzhinweis zur Recherche-Tiefe:** Dieses Dokument basiert auf Paper-Abstracts, Summaries und Drittquellen (EmergentMind, alphaXiv, GitHub). Kein Paper wurde im Volltext gelesen. Zahlen (z.B. "12.4% der Kosten") stammen aus Abstracts und wurden über mindestens 2 unabhängige Quellen geprüft. Alle arXiv-IDs sind verlinkt und direkt prüfbar. Die Synthese in Abschnitt 4 ist eine eigenständige Interpretation — keine publizierte Erkenntnis.

</div>

---

<div lang="en" markdown="1">

## Glossary

| Term | Explanation |
|------|-------------|
| **Originator Equation** | Nowak's mathematical model for the transition from "Prelife" (chemistry without heredity) to "Life" (evolution with heredity). Describes from which replication rate selection takes effect. |
| **Prelife** | State of a system that has variation and selection, but no heredity (replication). It generates novelty, but does not improve cumulatively. |
| **Error Threshold** | From quasispecies theory: The maximum mutation rate at which information can still be maintained. Above it → "mutational meltdown", all information is lost. |
| **Quality-Diversity (QD)** | Optimization paradigm: Instead of searching for THE one best solution, a diverse repertoire of high-performing solutions is maintained. |
| **MAP-Elites** | QD algorithm: Discretizes the behavior space into niches and stores only the best solution ("elite") per niche. New solutions compete within their niche. |
| **Niching** | Evolutionary strategy for diversity maintenance: Individuals are grouped by similarity, selection occurs within groups — prevents a single solution from dominating the entire population. |
| **Fitness Landscape** | Metaphor: Solutions as points on a landscape, height = quality. Hills = local optima, valleys = poor solutions. Evolution "climbs" this landscape. |
| **Pareto Front** | Set of all solutions where one dimension (e.g., quality) cannot be improved without worsening another (e.g., cost). |
| **TextGrad** | Optimization method for natural language: Uses backpropagation-like mechanisms to iteratively refine prompts. |
| **Collaboration Gain (Γ)** | Metric: Measures the true cooperation gain of a multi-agent system = Quality(Multi-Agent) − Quality(Single-Agent at same token budget). |

</div>

<div lang="de" markdown="1">

## Glossar

| Begriff | Erklärung |
|---------|-----------|
| **Originator-Gleichung** | Nowaks mathematisches Modell für den Übergang von "Prelife" (Chemie ohne Vererbung) zu "Life" (Evolution mit Vererbung). Beschreibt, ab welcher Replikationsrate Selektion greift. |
| **Prelife** | Zustand eines Systems, das Variation und Selektion hat, aber keine Vererbung (Replikation). Es generiert Neues, verbessert sich aber nicht kumulativ. |
| **Error Threshold** | Aus der Quasispezies-Theorie: Die maximale Mutationsrate, bei der Information noch erhalten bleibt. Darüber → "mutational meltdown", alle Information geht verloren. |
| **Quality-Diversity (QD)** | Optimierungsparadigma: Statt die EINE beste Lösung zu suchen, wird ein diverses Repertoire hochperformanter Lösungen gepflegt. |
| **MAP-Elites** | QD-Algorithmus: Diskretisiert den Verhaltensraum in Nischen und speichert pro Nische nur die beste Lösung ("Elite"). Neue Lösungen konkurrieren innerhalb ihrer Nische. |
| **Niching** | Evolutionäre Strategie zur Diversitätserhaltung: Individuen werden nach Ähnlichkeit gruppiert, Selektion findet innerhalb der Gruppen statt — verhindert, dass eine Lösung die ganze Population dominiert. |
| **Fitness-Landschaft** | Metapher: Lösungen als Punkte auf einer Landschaft, Höhe = Qualität. Hügel = lokale Optima, Täler = schlechte Lösungen. Evolution "klettert" diese Landschaft. |
| **Pareto-Front** | Menge aller Lösungen, bei denen man eine Dimension (z.B. Qualität) nicht verbessern kann ohne eine andere (z.B. Kosten) zu verschlechtern. |
| **TextGrad** | Optimierungsverfahren für natürliche Sprache: Nutzt Backpropagation-ähnliche Mechanismen, um Prompts iterativ zu verfeinern. |
| **Collaboration Gain (Γ)** | Metrik: Misst den echten Kooperationsgewinn eines Multi-Agent-Systems = Qualität(Multi-Agent) − Qualität(Single-Agent bei gleichem Token-Budget). |

</div>

---

<div lang="en" markdown="1">

## 1. Nowak's Mathematics — The Originator Equation

### 1.1 Core Idea

Martin A. Nowak, Professor of Mathematics and Biology at Harvard University and Director of the Program for Evolutionary Dynamics, has formalized a fundamental question with his work: **When do chemical kinetics become evolutionary dynamics?**

His central insight: Evolution requires three fundamental principles — **Replication, Mutation, and Selection**. Nowak has proposed that cooperation is the third fundamental principle of evolution. His book *Evolutionary Dynamics: Exploring the Equations of Life* (2006) lays the mathematical foundation, his later work *Prevolutionary Dynamics and the Origin of Evolution* (PNAS, 2008, with Hisashi Ohtsuki) introduces the so-called **Originator Equation**.

### 1.2 The Originator Equation

The equation describes the transition from "Prelife" (generative chemistry without replication) to "Life" (systems with replication):

```
ẋᵢ = aᵢ · xᵢ' − (d + aᵢ₀ + aᵢ₁) · xᵢ + r · xᵢ · (fᵢ − φ)
```

**Where:**

- **First term** (`aᵢ · xᵢ'`): Prelife dynamics — sequences arise from precursors through addition of activated monomers
- **Second term** (`(d + aᵢ₀ + aᵢ₁) · xᵢ`): Decay and processing into longer sequences
- **Third term** (`r · xᵢ · (fᵢ − φ)`): Standard selection equation of evolutionary dynamics

**Critical parameters:**

- `r` scales the ratio of template-directed replication to template-independent sequence growth
- `fᵢ` is the fitness of sequence i
- `φ` is the average fitness of the population (frequency-dependent death rate)

**The two limiting cases:**

- **r → 0**: No replication → pure Prelife dynamics (mutation and selection without heredity)
- **r → ∞**: Replication dominates → standard selection equation of evolutionary dynamics

### 1.3 The Phase Transition

Between Prelife and Life there exists a **phase transition**. The critical replication rate `rₓ` is defined by the condition that the net reproduction rate of the replicators becomes positive:

```
gᵢ = r · (fᵢ − φ) − (d + aᵢ₀ + aᵢ₁)
```

Below `rₓ`, Prelife dominates — longer sequences are exponentially rarer than shorter ones. Above `rₓ`, the fastest replicator dominates the population. There is selection *for and against* replication itself.

### 1.4 Key Insights from Nowak's Work

- **Prelife is already generative**: Even without replication, a system produces information, diversity, and is subject to selection
- **Replication is not a prerequisite for selection**, but a prerequisite for cumulative evolution
- **The error rate has a threshold** (Error Threshold from quasispecies theory): Adaptation is only possible when the mutation rate per bit is less than the inverse of the sequence length
- **Cooperation as the third principle**: In finite populations, a single cooperator (e.g., with a tit-for-tat strategy) can invade a population of defectors — with a probability that corresponds to a net selection advantage
- **Evolutionary graph theory**: The structure of the network (who interacts with whom) massively influences which strategies survive

### 1.5 Nowak's Toolkit

Beyond the Originator Equation, Nowak's framework offers a range of analytical tools: fitness landscapes, mutation matrices, genomic sequence space, random drift, quasispecies, replicator dynamics, the Prisoner's Dilemma, games in finite and infinite populations, evolutionary graph theory, games on lattices, evolutionary kaleidoscopes, fractals, and spatial chaos.

</div>

<div lang="de" markdown="1">

## 1. Nowaks Mathematik — Die Originator-Gleichung

### 1.1 Kernidee

Martin A. Nowak, Professor für Mathematik und Biologie an der Harvard University und Direktor des Program for Evolutionary Dynamics, hat mit seiner Arbeit eine fundamentale Frage formalisiert: **Wann werden chemische Kinetiken zu evolutionärer Dynamik?**

Seine zentrale Erkenntnis: Evolution benötigt drei Grundprinzipien — **Replikation, Mutation und Selektion**. Nowak hat vorgeschlagen, dass Kooperation das dritte fundamentale Prinzip der Evolution ist. Sein Buch *Evolutionary Dynamics: Exploring the Equations of Life* (2006) legt das mathematische Fundament, seine spätere Arbeit *Prevolutionary Dynamics and the Origin of Evolution* (PNAS, 2008, mit Hisashi Ohtsuki) führt die sogenannte **Originator-Gleichung** ein.

### 1.2 Die Originator-Gleichung

Die Gleichung beschreibt den Übergang von "Prelife" (generative Chemie ohne Replikation) zu "Life" (Systeme mit Replikation):

```
ẋᵢ = aᵢ · xᵢ' − (d + aᵢ₀ + aᵢ₁) · xᵢ + r · xᵢ · (fᵢ − φ)
```

**Wobei:**

- **Erster Term** (`aᵢ · xᵢ'`): Prelife-Dynamik — Sequenzen entstehen aus Vorläufern durch Addition aktivierter Monomere
- **Zweiter Term** (`(d + aᵢ₀ + aᵢ₁) · xᵢ`): Abbau und Weiterverarbeitung zu längeren Sequenzen
- **Dritter Term** (`r · xᵢ · (fᵢ − φ)`): Standard-Selektionsgleichung der Evolutionsdynamik

**Entscheidende Parameter:**

- `r` skaliert das Verhältnis von template-gesteuerter Replikation zu template-unabhängigem Sequenzwachstum
- `fᵢ` ist die Fitness von Sequenz i
- `φ` ist die durchschnittliche Fitness der Population (frequenzabhängige Todesrate)

**Die zwei Grenzfälle:**

- **r → 0**: Keine Replikation → reine Prelife-Dynamik (Mutation und Selektion ohne Vererbung)
- **r → ∞**: Replikation dominiert → Standard-Selektionsgleichung der Evolutionsdynamik

### 1.3 Der Phasenübergang

Zwischen Prelife und Life existiert ein **Phasenübergang**. Die kritische Replikationsrate `rₓ` ist definiert durch die Bedingung, dass die Netto-Reproduktionsrate der Replikatoren positiv wird:

```
gᵢ = r · (fᵢ − φ) − (d + aᵢ₀ + aᵢ₁)
```

Unterhalb von `rₓ` dominiert Prelife — längere Sequenzen sind exponentiell seltener als kürzere. Oberhalb von `rₓ` dominiert der schnellste Replikator die Population. Es gibt Selektion *für und gegen* Replikation selbst.

### 1.4 Schlüsselerkenntnisse aus Nowaks Werk

- **Prelife ist bereits generativ**: Auch ohne Replikation erzeugt ein System Information, Diversität und unterliegt Selektion
- **Replikation ist nicht Voraussetzung für Selektion**, aber Voraussetzung für kumulative Evolution
- **Die Fehlerrate hat einen Schwellenwert** (Error Threshold aus der Quasispezies-Theorie): Anpassung ist nur möglich, wenn die Mutationsrate pro Bit kleiner ist als die Inverse der Sequenzlänge
- **Kooperation als drittes Prinzip**: In endlichen Populationen kann ein einzelner Kooperator (z.B. mit Tit-for-Tat-Strategie) eine Population von Defektoren invadieren — mit einer Wahrscheinlichkeit, die einem Netto-Selektionsvorteil entspricht
- **Evolutionäre Graphentheorie**: Die Struktur des Netzwerks (wer mit wem interagiert) beeinflusst massiv, welche Strategien überleben

### 1.5 Nowaks Werkzeugkasten

Über die Originator-Gleichung hinaus bietet Nowaks Framework eine Reihe analytischer Werkzeuge: Fitness-Landschaften, Mutationsmatrizen, genomischer Sequenzraum, Random Drift, Quasispezies, Replikator-Dynamik, das Prisoner's Dilemma, Spiele in endlichen und unendlichen Populationen, evolutionäre Graphentheorie, Spiele auf Gittern, evolutionäre Kaleidoskope, Fraktale und räumliches Chaos.

</div>

---

<div lang="en" markdown="1">

## 2. Evolvability in AI — Current Research

### 2.1 Evolvability ES (Evolutionary Strategies)

Gajewski, Clune, Stanley, and Lehman (2019) developed **Evolvability ES**, an evolutionary algorithm that explicitly optimizes for evolvability — i.e., the ability to quickly adapt to different tasks after random mutations.

**Core idea:** It is possible to derive a novel objective function in the spirit of Natural Evolution Strategies that maximizes the diversity of behaviors an individual exhibits under random mutations. The algorithm scales efficiently with compute.

**Connection to Meta-Learning:** Evolvability ES shows a direct connection to the meta-learning algorithm MAML (Model-Agnostic Meta-Learning): Both optimize for rapid adaptability, but Evolvability ES discovers solutions with distinct properties — it finds representations that are inherently more adaptable.

### 2.2 Quality-Diversity (QD) Algorithms

QD algorithms, particularly **MAP-Elites** (Multi-dimensional Archive of Phenotypic Elites), represent a paradigmatic break with classical optimization:

- **Classical optimization:** Find the one best solution
- **QD optimization:** Find a diverse collection of high-performing solutions — fill a space of possibilities with the best example of each reachable behavior class

MAP-Elites discretizes the behavior space into niches ("cells") and stores only the elite solution in each cell. New individuals (through genetic variation) compete within their niche with the existing elite.

**Recent developments:**

- **PGA-MAP-Elites and DCG-MAP-Elites**: Combination of actor-critic methods from reinforcement learning with MAP-Elites for drastically improved sample efficiency in high-dimensional tasks
- **ME-ES (MAP-Elites with Evolution Strategies)**: Scaling to high-dimensional controllers with deep neural networks
- **Surrogate-Assisted Illumination (SAIL)**: Use of Gaussian Process surrogates to reduce expensive evaluations by orders of magnitude

**Significance:** QD algorithms solve a fundamental problem — in complex landscapes with many local optima, pure fitness optimization gets stuck. Diversity as an optimization objective produces a repertoire of strategies that are immediately available when the environment changes.

### 2.3 Self-Evolving Agents — The Current Wave (2024–2026)

A comprehensive survey by Gao et al. (2025/2026, arXiv:2507.21046) systematizes the field of **Self-Evolving Agents** for the first time along three dimensions: **What, When, and How** to evolve.

**Core problem:** LLMs are fundamentally static — they cannot adapt their internal parameters to new tasks, evolving knowledge domains, or dynamic interaction contexts. This static character becomes a critical bottleneck as soon as agents are deployed in open, interactive environments.

**Evolving dimensions:**

1. **Parameter Evolution**: SFT + RL for continuous improvement of model weights
2. **Prompt Evolution**: Iterative refinement of instructions (TextGrad, MIPRO)
3. **Workflow Evolution**: Automatic adaptation of agent topology and task distribution (AFlow)
4. **Tool Evolution**: Agents learn to use new tools or use existing ones more effectively
5. **Memory Evolution**: Building and curation of long-term knowledge

**Key patterns:**

- **Self-Challenging Agent (SCA)**: Agent autonomously generates novel tasks, executes them, filters successful trajectories for retraining
- **EXIF Framework**: Exploration Agent (Alice) trains Target Agent (Bob) through iterative feedback loops — Alice evaluates Bob's performance and adjusts her next exploration round. Interestingly: Even when Alice uses the same model as Bob, performance improves significantly
- **AgentGen**: Synthesizes diverse simulation worlds from an initial corpus and implements a bidirectional evolution loop with progressive difficulty adjustment

### 2.4 EvoAgentX — Evolving Agent Workflows (EMNLP 2025)

EvoAgentX (Wang et al., 2025) is an open-source platform that unifies automated generation, execution, and evolutionary optimization of multi-agent workflows. The architecture consists of five core layers:

1. **Basic Components Layer**: Configuration, logging, storage
2. **Agent Layer**: Individual agent configuration
3. **Workflow Layer**: Graph-based workflow structures
4. **Evolving Layer**: Integration of TextGrad, AFlow, and MIPRO as optimization algorithms
5. **Evaluation Layer**: Automatic evaluation of agent performance

**Results:** Consistent performance improvements — up to 20% accuracy increase on the GAIA benchmark. The Evolving Layer iteratively refines agent prompts, tool configurations, and workflow topologies.

</div>

<div lang="de" markdown="1">

## 2. Evolvierbarkeit in der KI — Aktuelle Forschung

### 2.1 Evolvability ES (Evolutionary Strategies)

Gajewski, Clune, Stanley und Lehman (2019) haben mit **Evolvability ES** einen evolutionären Algorithmus entwickelt, der explizit auf Evolvierbarkeit optimiert — also auf die Fähigkeit, sich nach zufälligen Mutationen schnell an unterschiedliche Aufgaben anzupassen.

**Kernidee:** Es ist möglich, eine neuartige Zielfunktion im Geist von Natural Evolution Strategies abzuleiten, die die Diversität von Verhaltensweisen maximiert, die ein Individuum bei zufälligen Mutationen zeigt. Der Algorithmus skaliert effizient mit der Rechenkraft.

**Verbindung zu Meta-Learning:** Evolvability ES zeigt eine direkte Verbindung zum Meta-Learning-Algorithmus MAML (Model-Agnostic Meta-Learning): Beide optimieren für schnelle Anpassungsfähigkeit, aber Evolvability ES entdeckt Lösungen mit distinkten Eigenschaften — es findet Repräsentationen, die inherent anpassungsfähiger sind.

### 2.2 Quality-Diversity (QD) Algorithmen

QD-Algorithmen, insbesondere **MAP-Elites** (Multi-dimensional Archive of Phenotypic Elites), repräsentieren einen paradigmatischen Bruch mit klassischer Optimierung:

- **Klassische Optimierung:** Finde die eine beste Lösung
- **QD-Optimierung:** Finde eine diverse Sammlung hochperformanter Lösungen — fülle einen Raum von Möglichkeiten mit dem besten Beispiel jeder erreichbaren Verhaltensklasse

MAP-Elites diskretisiert den Verhaltensraum in Nischen ("Zellen") und speichert in jeder Zelle nur die Elite-Lösung. Neue Individuen (durch genetische Variation) konkurrieren innerhalb ihrer Nische mit der bestehenden Elite.

**Aktuelle Entwicklungen:**

- **PGA-MAP-Elites und DCG-MAP-Elites**: Kombination von Actor-Critic-Methoden aus dem Reinforcement Learning mit MAP-Elites für drastisch verbesserte Sample-Effizienz in hochdimensionalen Aufgaben
- **ME-ES (MAP-Elites with Evolution Strategies)**: Skalierung auf hochdimensionale Controller mit tiefen neuronalen Netzwerken
- **Surrogate-Assisted Illumination (SAIL)**: Nutzung von Gaussian Process Surrogates zur Reduktion teurer Evaluierungen um Größenordnungen

**Bedeutung:** QD-Algorithmen lösen ein fundamentales Problem — in komplexen Landschaften mit vielen lokalen Optima bleibt reine Fitness-Optimierung stecken. Diversität als Optimierungsziel erzeugt ein Repertoire von Strategien, die bei Umgebungsänderungen sofort verfügbar sind.

### 2.3 Self-Evolving Agents — Die aktuelle Welle (2024–2026)

Ein umfassender Survey von Gao et al. (2025/2026, arXiv:2507.21046) systematisiert erstmals das Feld der **Self-Evolving Agents** entlang dreier Dimensionen: **Was, Wann und Wie** evolviert werden soll.

**Kernproblem:** LLMs sind fundamental statisch — sie können ihre internen Parameter nicht an neue Aufgaben, sich entwickelnde Wissensdomänen oder dynamische Interaktionskontexte anpassen. Dieser statische Charakter wird zum kritischen Flaschenhals, sobald Agents in offenen, interaktiven Umgebungen eingesetzt werden.

**Evolvierende Dimensionen:**

1. **Parameter-Evolution**: SFT + RL für kontinuierliche Verbesserung der Modellgewichte
2. **Prompt-Evolution**: Iterative Verfeinerung von Anweisungen (TextGrad, MIPRO)
3. **Workflow-Evolution**: Automatische Anpassung der Agent-Topologie und Aufgabenverteilung (AFlow)
4. **Tool-Evolution**: Agents lernen, neue Tools zu nutzen oder bestehende besser einzusetzen
5. **Memory-Evolution**: Aufbau und Kuratierung von Langzeit-Wissen

**Schlüsselmuster:**

- **Self-Challenging Agent (SCA)**: Agent generiert autonom neuartige Aufgaben, führt sie aus, filtert erfolgreiche Trajektorien für Retraining
- **EXIF-Framework**: Exploration Agent (Alice) trainiert Target Agent (Bob) durch iterative Feedback-Loops — Alice evaluiert Bobs Performance und passt ihre nächste Explorationsrunde an. Interessant: Selbst wenn Alice dasselbe Modell wie Bob nutzt, verbessert sich die Performance signifikant
- **AgentGen**: Synthetisiert diverse Simulationswelten aus einem initialen Corpus und implementiert eine bidirektionale Evolutionsschleife mit progressiver Schwierigkeitsanpassung

### 2.4 EvoAgentX — Evolvierende Agent-Workflows (EMNLP 2025)

EvoAgentX (Wang et al., 2025) ist eine Open-Source-Plattform, die automatisierte Generierung, Ausführung und evolutionäre Optimierung von Multi-Agent-Workflows vereint. Die Architektur besteht aus fünf Kernschichten:

1. **Basic Components Layer**: Konfiguration, Logging, Storage
2. **Agent Layer**: Individuelle Agent-Konfiguration
3. **Workflow Layer**: Graph-basierte Workflow-Strukturen
4. **Evolving Layer**: Integration von TextGrad, AFlow und MIPRO als Optimierungsalgorithmen
5. **Evaluation Layer**: Automatische Bewertung der Agent-Performance

**Ergebnisse:** Konsistente Performance-Verbesserungen — bis zu 20% Genauigkeitssteigerung auf dem GAIA-Benchmark. Die Evolving Layer verfeinert iterativ Agent-Prompts, Tool-Konfigurationen und Workflow-Topologien.

</div>

---

<div lang="en" markdown="1">

## 3. Multi-Agent Systems — From Trial-and-Error to Rigorous Science

### 3.1 The Attribution Problem

A central paper (arXiv:2602.05289, Feb 2026) argues that LLM-based multi-agent systems suffer from a fundamental **ambiguity of attribution**:

**Problem 1 — Unguided search in the factor space:** A structured taxonomy of influencing factors is missing. Researchers are limited to unguided adjustments — like a blind search in a vast design space.

**Problem 2 — Metrics do not distinguish between genuine cooperation gain and resource accumulation:** Conventional metrics measure end results, but they conflate intrinsic cooperation gain (capability growth through agent collaboration) with improvements that merely result from increased compute budget (more tokens, more agents).

**Proposed solution:** Establishment of a **Collaboration Gain Metric (Γ)** that serves as a diagnostic signal, combined with a **Factor Attribution Paradigm** that systematically identifies which factors actually lead to cooperation gains.

The factors are structured in two levels:

- **Control Level**: Static architecture presets (topology, roles, communication structure) — the foundation that limits cooperation potential
- **Information Level**: Dynamic execution mechanisms — how this potential is activated and transformed into actual gains

### 3.2 MAST — Why Multi-Agent Systems Fail

Empirical analysis of MAS failures identifies systematic failure patterns:

- **Premature Execution Termination**: Agents terminate tasks too early
- **Insufficient Task Verification**: Inadequate mechanisms for accuracy, completeness, and reliability
- **Coordination Failures**: Missed opportunities for collaboration, suboptimal decisions

Evaluation of six popular multi-agent frameworks (including MetaGPT) shows that none systematically addresses the identified failure modes. The MAST dataset is the first empirically derived, comprehensive taxonomy specific to MAS failures.

### 3.3 Google's Lessons from 2025

Google's Office of the CTO draws central conclusions from the broad agent deployment experience of 2025:

- **Evaluation as an active architecture component**: Evaluation evolved from a passive metric to an integrated component of agentic pipelines — an autorater (LLM as Judge) evaluates every output in real-time and provides corrective feedback
- **Self-correction solves the cascading error problem**: When an agent makes an error in step 2, traditional evaluation only catches it after step 10 fails. Real-time autoraters correct errors at the source
- **Dynamic simulation instead of static benchmarks**: Game arena approach where agents compete against each other in complex scenarios — with a game-theoretic framework for credit attribution
- **On-the-job learning**: Agents don't need to be perfect at launch — the critical building block is the learning loop that integrates signals from the environment and humans in production

### 3.4 Benchmarks for Multi-Agent Collaboration

**MultiAgentBench** (ACL 2025, Zhu et al.) evaluates LLM-based multi-agent systems across diverse scenarios with novel, milestone-based KPIs. It tests various coordination protocols (Star, Chain, Tree, Graph topologies) and strategies such as Group Discussion and Cognitive Planning.

New metrics capture cooperation through: cooperation and coordination rates, trust scores for agent reliability, consensus metrics after multiple negotiation rounds, and communication efficiency (protocol compliance and temporal synchronization).

</div>

<div lang="de" markdown="1">

## 3. Multi-Agent-Systeme — Von Trial-and-Error zu rigoroser Wissenschaft

### 3.1 Das Attributions-Problem

Ein zentrales Paper (arXiv:2602.05289, Feb 2026) argumentiert, dass LLM-basierte Multi-Agent-Systeme an einer fundamentalen **Ambiguität der Attribution** leiden:

**Problem 1 — Ungeführte Suche im Faktorraum:** Es fehlt eine strukturierte Taxonomie der Einflussfaktoren. Forscher sind auf ungeleitete Anpassungen beschränkt — wie eine blinde Suche in einem riesigen Designraum.

**Problem 2 — Metriken unterscheiden nicht zwischen echtem Kooperationsgewinn und Ressourcenakkumulation:** Konventionelle Metriken messen End-Ergebnisse, aber sie vermischen intrinsischen Kooperationsgewinn (Fähigkeitswachstum durch Agent-Zusammenarbeit) mit Verbesserungen, die bloß aus erhöhtem Rechenbudget resultieren (mehr Tokens, mehr Agents).

**Vorgeschlagene Lösung:** Etablierung einer **Collaboration Gain Metric (Γ)**, die als diagnostisches Signal fungiert, kombiniert mit einem **Factor Attribution Paradigm**, das systematisch identifiziert, welche Faktoren tatsächlich zu Kooperationsgewinnen führen.

Die Faktoren werden in zwei Ebenen strukturiert:

- **Control Level**: Statische Architektur-Presets (Topologie, Rollen, Kommunikationsstruktur) — das Fundament, das Kooperationspotential begrenzt
- **Information Level**: Dynamische Ausführungsmechanismen — wie dieses Potential aktiviert und in tatsächliche Gewinne transformiert wird
### 3.2 MAST — Warum Multi-Agent-Systeme scheitern

Empirische Analyse von MAS-Fehlern identifiziert systematische Failure Patterns:

- **Premature Execution Termination**: Agents beenden Aufgaben zu früh
- **Insufficient Task Verification**: Unzureichende Mechanismen für Genauigkeit, Vollständigkeit und Zuverlässigkeit
- **Coordination Failures**: Verpasste Gelegenheiten für Zusammenarbeit, suboptimale Entscheidungen

Evaluation von sechs populären Multi-Agent-Frameworks (darunter MetaGPT) zeigt, dass keines die identifizierten Failure Modes systematisch adressiert. Das MAST-Dataset ist die erste empirisch abgeleitete, umfassende Taxonomie spezifisch für MAS-Fehler.

### 3.3 Google's Lessons from 2025

Google's Office of the CTO zieht aus der breiten Agent-Deployment-Erfahrung 2025 zentrale Schlüsse:

- **Evaluation als aktive Architekturkomponente**: Evaluation wurde von einer passiven Metrik zu einem integrierten Bestandteil agentischer Pipelines — ein Autorater (LLM als Judge) bewertet jeden Output in Echtzeit und gibt korrigierbares Feedback
- **Self-Correction löst das Cascading-Error-Problem**: Wenn ein Agent in Schritt 2 einen Fehler macht, fängt traditionelle Evaluation diesen erst nach dem Scheitern von Schritt 10. Echtzeit-Autorater korrigieren Fehler an der Quelle
- **Dynamic Simulation statt statische Benchmarks**: Game-Arena-Ansatz, bei dem Agents gegeneinander in komplexen Szenarien antreten — mit spieltheoretischem Framework für Credit Attribution
- **On-the-job Learning**: Agents müssen nicht bei Launch perfekt sein — der kritische Baustein ist die Lernschleife, die Signale aus Umgebung und Menschen in Produktion integriert

### 3.4 Benchmarks für Multi-Agent-Kollaboration

**MultiAgentBench** (ACL 2025, Zhu et al.) evaluiert LLM-basierte Multi-Agent-Systeme über diverse Szenarien mit neuartigen, milestone-basierten KPIs. Es testet verschiedene Koordinationsprotokolle (Star, Chain, Tree, Graph-Topologien) und Strategien wie Group Discussion und Cognitive Planning.

Neue Metriken erfassen Kooperation über: Kooperations- und Koordinationsraten, Trust-Scores für Agent-Zuverlässigkeit, Konsens-Metriken nach mehreren Verhandlungsrunden und Kommunikationseffizienz (Protokoll-Compliance und temporale Synchronisation).

</div>

---

<div lang="en" markdown="1">

## 4. Synthesis — The Bridge from Nowak to Agent Architectures

### 4.1 Structural Analogy

> **Transparency note:** The following table shows *structural analogies*, not a mathematically proven isomorphism. The mappings are plausible and heuristically useful, but not formally verified. Whether the structures are actually isomorphic is an open research question.

Nowak's concepts can be mapped onto AI agent systems — as a thinking aid, not as proof:

| Nowak (Biology) | AI Agent System | Example |
|---|---|---|
| **Sequence / Replicator** | Agent configuration (Prompt + Tools + Memory) | A Claude subagent with specific SKILL.md |
| **Fitness fᵢ** | Performance metric (Quality Score) | Karpathy's Measure phase |
| **Mutation** | Prompt variation, tool swap, workflow restructuring | TextGrad optimization |
| **Selection (φ)** | Evaluation Layer + Keep/Discard decision | Quality-Gate Agent |
| **Replication** | Persistent context / Workflow template reuse | CLAUDE.md / AGENTS.md inheritance |
| **Prelife** | Explorative phase without fixed workflows | Initial agent configuration search |
| **Phase transition (rₓ)** | Point at which structured workflows emerge | From manual to automated orchestration |
| **Error Threshold** | Maximum complexity before quality collapse | Context window limits in agent chains |
| **Fitness landscape** | Context-as-Infrastructure | The overall system as a navigable possibility space |
| **Evolutionary graph theory** | Agent topology (Star, Chain, Graph) | MultiAgentBench topologies |
| **Cooperation vs. Defection** | Genuine cooperation gains vs. resource accumulation | Collaboration Gain Metric Γ |

### 4.2 Three Principles Derivable from Nowak

**Principle 1 — Evolvability over Performance**

Nowak shows that systems whose evolvability *itself evolves* are more successful in the long run than those that only optimize for momentary fitness. Experimental evidence: [Barnett, Meister & Rainey, *Science*, 2024](https://www.biorxiv.org/content/10.1101/2024.05.01.592015v2) at the Max Planck Institute for Evolutionary Biology in Plön showed that bacterial lineages under selection pressure developed mutation-prone sequences in a key gene — with a locally increased mutation rate of up to 10,000-fold, enabling rapid phenotypic state switching.

*Transfer:* An agent system should not only be optimized for the current task, but architecturally built so that it can easily adapt to new task types. Progressive Disclosure (AGENTS.md as table of contents) and modular skills are exactly this property — they make the system *evolvable*, not just performant.

**Principle 2 — Diversity as a Strategic Resource (not a Byproduct)**

QD algorithms like MAP-Elites show: Maintaining a diverse repertoire of high-performing solutions is superior to searching for a single optimal solution. When the environment changes, an alternative behavior is immediately available.

*Transfer:* Isolated context windows for subagents (as in the Quality-Gate Agent) are formally analogous to MAP-Elites niches — each subagent explores a different region of the solution space. The orchestrator selects the best contributions, just as MAP-Elites keeps the elite per niche.

**Principle 3 — Feedback Loops as Selection Pressure are the Actual Differentiator**

Nowak's equation shows: Without the selection term (`fᵢ − φ`) there is no cumulative improvement — only random drift. The strength of selection pressure (`r`) determines whether the system remains in the Prelife phase or transitions to full evolutionary mode.

*Transfer:* Karpathy's Modify → Run → Measure → Keep/Discard → Repeat is a discrete implementation of Nowak's selection equation. Code is the ideal use case because compilation/testing provides objective, binary selection pressure. The Evaluation-as-Architecture insight (Google 2025) confirms this: real-time autoraters as selection mechanism in the pipeline.

### 4.3 Nowak's Error Threshold and Agent Systems

A direct, still barely explored parallel: Nowak's Error Threshold from quasispecies theory states that adaptation is only possible when the mutation rate per bit is less than the inverse of the sequence length. If the mutation rate becomes too high, information is lost through "mutational meltdown."

For agent systems, an analogous Error Threshold could exist: When the **variation rate** (prompt changes, workflow restructurings, tool swaps per iteration) exceeds the **observability capacity** of the evaluation system, the system loses the ability for directed improvement. You change more than you can measure.

This would be a formal justification for the practice of making changes incrementally and in isolation — not because it is more convenient, but because there is a mathematical limit beyond which evolution collapses into noise.

### 4.4 Open Research Questions

1. **Can the phase transition (rₓ) be formally calculated for agent systems?** At what point does directed workflow improvement emerge from random configuration search?

2. **Is there an optimal population diversity for subagent pools?** MAP-Elites research suggests the answer is task-dependent — but are there general heuristics?

3. **Can the Collaboration Gain Metric (Γ) serve as an evolutionary fitness function for multi-agent topologies?** Instead of manually designing topologies, they could be evolved — with Γ as selection pressure.

4. **What is the Error Threshold for agentic workflows?** Maximum number of simultaneous workflow changes before the evaluation pipeline loses the improvement direction?

</div>

<div lang="de" markdown="1">

## 4. Synthese — Die Brücke von Nowak zu Agent-Architekturen

### 4.1 Strukturelle Analogie

> **Transparenzhinweis:** Die folgende Tabelle zeigt *strukturelle Analogien*, keine mathematisch bewiesene Isomorphie. Die Zuordnungen sind plausibel und heuristisch nützlich, aber nicht formal verifiziert. Ob die Strukturen tatsächlich isomorph sind, ist eine offene Forschungsfrage.

Nowaks Konzepte lassen sich auf KI-Agent-Systeme abbilden — als Denkhilfe, nicht als Beweis:

| Nowak (Biologie) | KI-Agent-System | Beispiel |
|---|---|---|
| **Sequenz / Replikator** | Agent-Konfiguration (Prompt + Tools + Memory) | Ein Claude-Subagent mit spezifischem SKILL.md |
| **Fitness fᵢ** | Performance-Metrik (Quality Score) | Karpathys Measure-Phase |
| **Mutation** | Prompt-Variation, Tool-Swap, Workflow-Umbau | TextGrad-Optimierung |
| **Selektion (φ)** | Evaluation Layer + Keep/Discard-Entscheidung | Quality-Gate Agent |
| **Replikation** | Persistenter Kontext / Workflow-Template-Reuse | CLAUDE.md / AGENTS.md Vererbung |
| **Prelife** | Explorative Phase ohne fixierte Workflows | Initiale Agent-Konfigurationssuche |
| **Phasenübergang (rₓ)** | Punkt, ab dem strukturierte Workflows emergieren | Von manuellem zu automatisiertem Orchestration |
| **Error Threshold** | Maximale Komplexität vor Qualitätszusammenbruch | Context-Window-Grenzen bei Agent-Chains |
| **Fitness-Landschaft** | Context-as-Infrastructure | Das Gesamtsystem als navigierbarer Möglichkeitsraum |
| **Evolutionäre Graphentheorie** | Agent-Topologie (Star, Chain, Graph) | MultiAgentBench-Topologien |
| **Kooperation vs. Defektion** | Echte Kooperationsgewinne vs. Ressourcenakkumulation | Collaboration Gain Metric Γ |

### 4.2 Drei Prinzipien, die sich aus Nowak ableiten lassen

**Prinzip 1 — Evolvierbarkeit vor Performance**

Nowak zeigt, dass Systeme, deren Evolvierbarkeit *selbst evolviert*, langfristig erfolgreicher sind als solche, die nur auf momentane Fitness optimieren. Experimenteller Beweis: [Barnett, Meister & Rainey, *Science*, 2024](https://www.biorxiv.org/content/10.1101/2024.05.01.592015v2) am Max-Planck-Institut für Evolutionsbiologie in Plön zeigten, dass bakterielle Abstammungslinien unter Selektionsdruck mutationsanfällige Sequenzen in einem Schlüsselgen entwickelten — mit einer bis zu 10.000-fach erhöhten lokalen Mutationsrate, die schnelle phänotypische Zustandswechsel ermöglichte.

*Übertragung:* Ein Agent-System sollte nicht nur für die aktuelle Aufgabe optimiert sein, sondern architektonisch so gebaut, dass es sich leicht an neue Aufgabentypen anpassen kann. Progressive Disclosure (AGENTS.md als Inhaltsverzeichnis) und modulare Skills sind genau diese Eigenschaft — sie machen das System *evolvierbar*, nicht nur performant.

**Prinzip 2 — Diversität als strategische Ressource (nicht als Nebenprodukt)**

QD-Algorithmen wie MAP-Elites zeigen: Die Pflege eines diversen Repertoires hochperformanter Lösungen ist überlegen gegenüber der Suche nach einer einzigen optimalen Lösung. Bei Umgebungsänderungen steht sofort ein Alternativverhalten zur Verfügung.

*Übertragung:* Isolierte Kontextfenster bei Subagents (wie im Quality-Gate Agent) sind formal analog zu MAP-Elites-Nischen — jeder Subagent exploriert einen anderen Bereich des Lösungsraums. Der Orchestrator wählt die besten Beiträge aus, genau wie MAP-Elites die Elite pro Nische behält.

**Prinzip 3 — Feedback-Loops als Selektionsdruck sind der eigentliche Differenziator**

Nowaks Gleichung zeigt: Ohne den Selektionsterm (`fᵢ − φ`) gibt es keine kumulative Verbesserung — nur zufällige Drift. Die Stärke des Selektionsdrucks (`r`) entscheidet, ob das System in der Prelife-Phase verharrt oder zum vollen evolutionären Modus übergeht.

*Übertragung:* Karpathys Modify → Run → Measure → Keep/Discard → Repeat ist eine diskrete Implementierung von Nowaks Selektionsgleichung. Code ist dabei der ideale Anwendungsfall, weil Kompilierung/Testing objektiven, binären Selektionsdruck liefert. Die Evaluation-as-Architecture-Erkenntnis (Google 2025) bestätigt dies: Echtzeit-Autorater als Selektionsmechanismus in der Pipeline.

### 4.3 Nowaks Error Threshold und Agent-Systeme

Eine direkte, noch kaum erforschte Parallele: Nowaks Error Threshold aus der Quasispezies-Theorie besagt, dass Anpassung nur möglich ist, wenn die Mutationsrate pro Bit kleiner ist als die Inverse der Sequenzlänge. Wird die Mutationsrate zu hoch, geht Information durch "mutational meltdown" verloren.

Für Agent-Systeme könnte ein analoger Error Threshold existieren: Wenn die **Variationsrate** (Prompt-Änderungen, Workflow-Umbauten, Tool-Swaps pro Iteration) die **Beobachtbarkeitskapazität** des Evaluationsystems übersteigt, verliert das System die Fähigkeit zur gerichteten Verbesserung. Man ändert mehr als man messen kann.

Dies wäre eine formale Begründung für die Praxis, Änderungen inkrementell und isoliert vorzunehmen — nicht weil es bequemer ist, sondern weil es eine mathematische Grenze gibt, jenseits derer Evolution in Noise zusammenbricht.

### 4.4 Offene Fragen für die Forschung

1. **Lässt sich der Phasenübergang (rₓ) formal für Agent-Systeme berechnen?** Ab welchem Punkt emergiert gerichtete Workflow-Verbesserung aus zufälliger Konfigurationssuche?

2. **Gibt es eine optimale Populations-Diversität für Subagent-Pools?** MAP-Elites-Forschung deutet an, dass die Antwort aufgabenabhängig ist — aber gibt es allgemeine Heuristiken?

3. **Kann die Collaboration Gain Metric (Γ) als evolutionäre Fitness-Funktion für Multi-Agent-Topologien dienen?** Statt Topologien manuell zu designen, könnten sie evolviert werden — mit Γ als Selektionsdruck.

4. **Was ist der Error Threshold für agentic workflows?** Maximale Anzahl simultaner Workflow-Änderungen, bevor die Evaluation-Pipeline die Verbesserungsrichtung verliert?

</div>

---

<div lang="en" markdown="1">

## 5. Prioritization — What is Most Relevant?

### Tier 1: Directly Applicable to Existing Architecture

- **Feedback loops as selection pressure** — already implemented through the Karpathy pattern in the Quality-Gate Agent
- **Isolated context windows as niches** — MAP-Elites analogy validates the subagent design
- **Error Threshold as a design principle** — formal justification for incremental changes
- **Evaluation-as-Architecture** — autorater integration into the pipeline

### Tier 2: Explorable in the Medium Term

- **EvoAgentX patterns** (TextGrad + AFlow + MIPRO) as inspiration for automated skill optimization
- **Collaboration Gain Metric Γ** as a basis for Quality-Gate evaluation: Does the multi-agent approach measure genuine cooperation gain or just resource accumulation?
- **Self-Evolving Workflows** — automatic adaptation of agent topology based on task feedback

### Tier 3: Long-term Research Direction

- **Formal calculation of the phase transition** for agent systems
- **Quality-Diversity for prompt repertoires** — MAP-Elites for skill libraries
- **Evolutionary Graph Theory for agent topologies** — which network structures favor which cooperation patterns?

</div>

<div lang="de" markdown="1">

## 5. Priorisierung — Was ist am relevantesten?

### Tier 1: Direkt anwendbar auf bestehende Architektur

- **Feedback-Loops als Selektionsdruck** — bereits durch Karpathy-Pattern im Quality-Gate Agent umgesetzt
- **Isolierte Kontextfenster als Nischen** — MAP-Elites-Analogie validiert das Subagent-Design
- **Error Threshold als Designprinzip** — formale Begründung für inkrementelle Änderungen
- **Evaluation-as-Architecture** — Autorater-Integration in die Pipeline

### Tier 2: Mittelfristig erforschbar

- **EvoAgentX-Muster** (TextGrad + AFlow + MIPRO) als Inspiration für automatisierte Skill-Optimierung
- **Collaboration Gain Metric Γ** als Grundlage für Quality-Gate-Bewertung: Misst der Multi-Agent-Ansatz echten Kooperationsgewinn oder nur Ressourcenakkumulation?
- **Self-Evolving Workflows** — automatische Anpassung der Agent-Topologie basierend auf Task-Feedback

### Tier 3: Langfristige Forschungsrichtung

- **Formale Berechnung des Phasenübergangs** für Agent-Systeme
- **Quality-Diversity für Prompt-Repertoires** — MAP-Elites für Skill-Bibliotheken
- **Evolutionary Graph Theory für Agent-Topologien** — welche Netzwerkstrukturen favorisieren welche Kooperationsmuster?

</div>

---

<div lang="en" markdown="1">

## 6. Sources

> All arXiv links are directly clickable. Sources without a link could not be assigned a unique URL — these are marked with ⚠.

### Nowak — Core Works
- Nowak, M.A. (2006). *Evolutionary Dynamics: Exploring the Equations of Life*. Harvard University Press. [Harvard UP](https://www.hup.harvard.edu/books/9780674023383)
- Nowak, M.A. & Ohtsuki, H. (2008). "Prevolutionary dynamics and the origin of evolution." *PNAS*, 105(39), 14924–14927. [DOI:10.1073/pnas.0806714105](https://www.pnas.org/doi/10.1073/pnas.0806714105)
- Manapat, M., Ohtsuki, H., Bürger, R. & Nowak, M.A. (2009). "Originator dynamics." *Journal of Theoretical Biology*, 256(4), 586–595. ⚠ No open access link available
- Barnett, M., Meister, L. & Rainey, P. (2024). "Experimental evolution of evolvability." *Science*. [bioRxiv:2024.05.01.592015](https://www.biorxiv.org/content/10.1101/2024.05.01.592015v2) | [MPI Press Release](https://www.evolbio.mpg.de/3807853/news_publication_24229222_transferred)

### Evolvability in AI
- Gajewski, A., Clune, J., Stanley, K.O. & Lehman, J. (2019). "Evolvability ES: Scalable and Direct Optimization of Evolvability." *GECCO 2019*. [arXiv:1907.06077](https://arxiv.org/abs/1907.06077)
- Mouret, J.-B. & Clune, J. (2015). "Illuminating search spaces by mapping elites." [arXiv:1504.04909](https://arxiv.org/abs/1504.04909)
- Pugh, J.K., Soros, L.B. & Stanley, K.O. (2016). "Quality Diversity: A New Frontier for Evolutionary Computation." *Frontiers in Robotics and AI*, 3:40. ⚠ No direct link verified

### Self-Evolving Agents
- Gao, H. et al. (2025). "A Survey of Self-Evolving Agents." [arXiv:2507.21046](https://arxiv.org/abs/2507.21046)
- Fang, J. et al. (2025). "A Comprehensive Survey of Self-Evolving AI Agents." [arXiv:2508.07407](https://arxiv.org/abs/2508.07407) | [GitHub: Awesome-Self-Evolving-Agents](https://github.com/EvoAgentX/Awesome-Self-Evolving-Agents)
- Wang, Y. et al. (2025). "EvoAgentX: An Automated Framework for Evolving Agentic Workflows." *EMNLP 2025 Demos*. [arXiv:2507.03616](https://arxiv.org/abs/2507.03616) | [GitHub](https://github.com/EvoAgentX/EvoAgentX)
- Liu, S. et al. (2025). "SEW: Self-Evolving Agentic Workflows for Automated Code Generation." [arXiv:2505.18646](https://arxiv.org/abs/2505.18646)

### Evolving Agent Workflows (Core of Our Topic)
- Zhang, G. et al. (2025). "EvoFlow: Evolving Diverse Agentic Workflows On The Fly." [arXiv:2502.07373](https://arxiv.org/abs/2502.07373) | [OpenReview](https://openreview.net/forum?id=gdmiLfXZG5)
- Ye, H. et al. (2026). "Meta Context Engineering via Agentic Skill Evolution." [arXiv:2601.21557](https://arxiv.org/abs/2601.21557)
- Zhang, Z. et al. (2026). "AgentFactory: Self-Evolving via Executable Subagent Accumulation." [arXiv:2603.18000](https://arxiv.org/abs/2603.18000)

### Multi-Agent Systems — Scientific Foundations
- "Towards a Science of Collective AI" (2026). [arXiv:2602.05289](https://arxiv.org/abs/2602.05289) — Collaboration Gain Metric and Factor Attribution
- Zhu, K. et al. (2025). "MultiAgentBench: Evaluating the Collaboration and Competition of LLM agents." *ACL 2025*. ⚠ arXiv ID not verified
- Tran, K.-T. et al. (2025). "Multi-Agent Collaboration Mechanisms: A Survey of LLMs." [arXiv:2501.06322](https://arxiv.org/abs/2501.06322)
- Cemri, M. et al. (2025). "Why Do Multi-Agent LLM Systems Fail?" (MAST taxonomy). [arXiv:2503.13657](https://arxiv.org/abs/2503.13657)
- Google Cloud (2025). "Lessons from 2025 on Agents and Trust." ⚠ No permanent link available

### Quality-Diversity
- Flageat, M. et al. (2023). "Evolving Populations of Diverse RL Agents with MAP-Elites." [arXiv:2303.12803](https://arxiv.org/abs/2303.12803)
- Colas, C. et al. (2020). "Scaling MAP-Elites to Deep Neuroevolution." *GECCO 2020*. ⚠ arXiv ID not verified

</div>

<div lang="de" markdown="1">

## 6. Quellen

> Alle arXiv-Links sind direkt klickbar. Quellen ohne Link konnten nicht mit einem eindeutigen URL versehen werden — diese sind mit ⚠ markiert.

### Nowak — Kernwerke
- Nowak, M.A. (2006). *Evolutionary Dynamics: Exploring the Equations of Life*. Harvard University Press. [Harvard UP](https://www.hup.harvard.edu/books/9780674023383)
- Nowak, M.A. & Ohtsuki, H. (2008). "Prevolutionary dynamics and the origin of evolution." *PNAS*, 105(39), 14924–14927. [DOI:10.1073/pnas.0806714105](https://www.pnas.org/doi/10.1073/pnas.0806714105)
- Manapat, M., Ohtsuki, H., Bürger, R. & Nowak, M.A. (2009). "Originator dynamics." *Journal of Theoretical Biology*, 256(4), 586–595. ⚠ Kein Open-Access-Link verfügbar
- Barnett, M., Meister, L. & Rainey, P. (2024). "Experimental evolution of evolvability." *Science*. [bioRxiv:2024.05.01.592015](https://www.biorxiv.org/content/10.1101/2024.05.01.592015v2) | [MPI-Pressemitteilung](https://www.evolbio.mpg.de/3807853/news_publication_24229222_transferred)

### Evolvierbarkeit in der KI
- Gajewski, A., Clune, J., Stanley, K.O. & Lehman, J. (2019). "Evolvability ES: Scalable and Direct Optimization of Evolvability." *GECCO 2019*. [arXiv:1907.06077](https://arxiv.org/abs/1907.06077)
- Mouret, J.-B. & Clune, J. (2015). "Illuminating search spaces by mapping elites." [arXiv:1504.04909](https://arxiv.org/abs/1504.04909)
- Pugh, J.K., Soros, L.B. & Stanley, K.O. (2016). "Quality Diversity: A New Frontier for Evolutionary Computation." *Frontiers in Robotics and AI*, 3:40. ⚠ Kein direkter Link verifiziert

### Self-Evolving Agents
- Gao, H. et al. (2025). "A Survey of Self-Evolving Agents." [arXiv:2507.21046](https://arxiv.org/abs/2507.21046)
- Fang, J. et al. (2025). "A Comprehensive Survey of Self-Evolving AI Agents." [arXiv:2508.07407](https://arxiv.org/abs/2508.07407) | [GitHub: Awesome-Self-Evolving-Agents](https://github.com/EvoAgentX/Awesome-Self-Evolving-Agents)
- Wang, Y. et al. (2025). "EvoAgentX: An Automated Framework for Evolving Agentic Workflows." *EMNLP 2025 Demos*. [arXiv:2507.03616](https://arxiv.org/abs/2507.03616) | [GitHub](https://github.com/EvoAgentX/EvoAgentX)
- Liu, S. et al. (2025). "SEW: Self-Evolving Agentic Workflows for Automated Code Generation." [arXiv:2505.18646](https://arxiv.org/abs/2505.18646)

### Evolving Agent Workflows (Kern unseres Themas)
- Zhang, G. et al. (2025). "EvoFlow: Evolving Diverse Agentic Workflows On The Fly." [arXiv:2502.07373](https://arxiv.org/abs/2502.07373) | [OpenReview](https://openreview.net/forum?id=gdmiLfXZG5)
- Ye, H. et al. (2026). "Meta Context Engineering via Agentic Skill Evolution." [arXiv:2601.21557](https://arxiv.org/abs/2601.21557)
- Zhang, Z. et al. (2026). "AgentFactory: Self-Evolving via Executable Subagent Accumulation." [arXiv:2603.18000](https://arxiv.org/abs/2603.18000)

### Multi-Agent-Systeme — Wissenschaftliche Grundlagen
- "Towards a Science of Collective AI" (2026). [arXiv:2602.05289](https://arxiv.org/abs/2602.05289) — Collaboration Gain Metric und Factor Attribution
- Zhu, K. et al. (2025). "MultiAgentBench: Evaluating the Collaboration and Competition of LLM agents." *ACL 2025*. ⚠ arXiv-ID nicht verifiziert
- Tran, K.-T. et al. (2025). "Multi-Agent Collaboration Mechanisms: A Survey of LLMs." [arXiv:2501.06322](https://arxiv.org/abs/2501.06322)
- Cemri, M. et al. (2025). "Why Do Multi-Agent LLM Systems Fail?" (MAST taxonomy). [arXiv:2503.13657](https://arxiv.org/abs/2503.13657)
- Google Cloud (2025). "Lessons from 2025 on Agents and Trust." ⚠ Kein permanenter Link verfügbar

### Quality-Diversity
- Flageat, M. et al. (2023). "Evolving Populations of Diverse RL Agents with MAP-Elites." [arXiv:2303.12803](https://arxiv.org/abs/2303.12803)
- Colas, C. et al. (2020). "Scaling MAP-Elites to Deep Neuroevolution." *GECCO 2020*. ⚠ arXiv-ID nicht verifiziert

</div>

---

*This document is conceived as a living reference and will be further developed as part of the Evolving Agents project.*

*Dieses Dokument ist als lebende Referenz konzipiert und wird im Rahmen des Evolving Agents Projekts weiterentwickelt.*
