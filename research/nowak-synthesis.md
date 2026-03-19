---
layout: default
title: Nowak Synthesis
parent: Research
nav_order: 1
---

# Von Nowaks Evolvierbarkeits-Gleichung zu KI-Agent-Architekturen

## Eine Recherche an der Schnittstelle von Evolutionsdynamik, Self-Evolving Agents und Multi-Agent-Systemen

---

**Autor:** Jan Rummel (mit Claude)
**Datum:** März 2026
**Status:** Initiale Synthese — wird erweitert

> **Transparenzhinweis zur Recherche-Tiefe:** Dieses Dokument basiert auf Paper-Abstracts, Summaries und Drittquellen (EmergentMind, alphaXiv, GitHub). Kein Paper wurde im Volltext gelesen. Zahlen (z.B. "12.4% der Kosten") stammen aus Abstracts und wurden über mindestens 2 unabhängige Quellen geprüft. Alle arXiv-IDs sind verlinkt und direkt prüfbar. Die Synthese in Abschnitt 4 ist unsere eigene Interpretation — keine publizierte Erkenntnis.

---

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

---

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

---

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

---

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

---

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

---

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

---

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

---

*Dieses Dokument ist als lebende Referenz konzipiert und wird im Rahmen des Evolving Agents Projekts weiterentwickelt.*
