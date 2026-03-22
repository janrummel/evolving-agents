---
layout: default
title: Principles
nav_order: 3
---

# Design Principles

<div lang="en">

Actionable principles derived from evolutionary dynamics research, applicable to agent architectures.

Each principle follows the format: **What** (the rule), **Why** (the evolutionary basis), **How** (concrete application).

</div>

<div lang="de">

Handlungsorientierte Prinzipien, abgeleitet aus der Forschung zu evolutionärer Dynamik, anwendbar auf Agent-Architekturen.

Jedes Prinzip folgt dem Format: **Was** (die Regel), **Warum** (die evolutionäre Grundlage), **Wie** (konkrete Anwendung).

</div>

---

## P1: Evolvability Over Performance

<div lang="en">

**What:** Optimize your agent architecture for adaptability, not just current task performance.

**Why:** Nowak shows that systems whose evolvability itself evolves are more successful long-term. [Barnett, Meister & Rainey (*Science*, 2024)](https://www.biorxiv.org/content/10.1101/2024.05.01.592015v2) demonstrated at the Max Planck Institute that bacterial lineages under selection pressure developed mutation-prone sequences in a key gene — with up to 10,000x higher local mutation rates enabling rapid state switching. QD algorithms ([MAP-Elites](https://arxiv.org/abs/1504.04909)) outperform pure fitness optimization in complex landscapes.

**How:**
- Modular skills (SKILL.md) over monolithic prompts
- Progressive disclosure (AGENTS.md as table of contents) over flat configuration
- Keep skills independent — a change in one shouldn't break another
- Measure: "How many new task types can this architecture handle without restructuring?"

</div>

<div lang="de">

**Was:** Optimiere deine Agent-Architektur auf Anpassungsfähigkeit, nicht nur auf aktuelle Task-Performance.

**Warum:** Nowak zeigt, dass Systeme, deren Evolvability sich selbst weiterentwickelt, langfristig erfolgreicher sind. [Barnett, Meister & Rainey (*Science*, 2024)](https://www.biorxiv.org/content/10.1101/2024.05.01.592015v2) haben am Max-Planck-Institut gezeigt, dass Bakterienlinien unter Selektionsdruck mutationsanfällige Sequenzen in einem Schlüsselgen entwickelten — mit bis zu 10.000-fach höheren lokalen Mutationsraten, die schnelles State-Switching ermöglichen. QD-Algorithmen ([MAP-Elites](https://arxiv.org/abs/1504.04909)) übertreffen reine Fitness-Optimierung in komplexen Landschaften.

**Wie:**
- Modulare Skills (SKILL.md) statt monolithischer Prompts
- Progressive Disclosure (AGENTS.md als Inhaltsverzeichnis) statt flacher Konfiguration
- Skills unabhängig halten — eine Änderung an einem darf keinen anderen brechen
- Messen: „Wie viele neue Task-Typen kann diese Architektur ohne Umbau bewältigen?"

</div>

---

## P2: Diversity as Strategic Resource

<div lang="en">

**What:** Maintain a diverse repertoire of high-performing solutions, not just the single best one.

**Why:** MAP-Elites fills behavioral niches with elite solutions. When the environment changes, an alternative is immediately available. Pure optimization gets stuck in local optima.

**How:**
- Isolated context windows for subagents = behavioral niches
- Multiple skill variants for the same task type (e.g., different research approaches)
- Don't prune aggressively — retired skills may be useful when context shifts
- Measure: "How many distinct solution strategies does the system have ready?"

</div>

<div lang="de">

**Was:** Halte ein vielfältiges Repertoire leistungsfähiger Lösungen vor — nicht nur die eine beste.

**Warum:** MAP-Elites füllt verhaltensbasierte Nischen mit Elite-Lösungen. Wenn sich die Umgebung ändert, steht sofort eine Alternative bereit. Reine Optimierung bleibt in lokalen Optima stecken.

**Wie:**
- Isolierte Context Windows für Subagents = verhaltensbasierte Nischen
- Mehrere Skill-Varianten für denselben Task-Typ (z. B. verschiedene Research-Ansätze)
- Nicht aggressiv aussortieren — ausgemusterte Skills können bei Kontextwechsel nützlich sein
- Messen: „Wie viele verschiedene Lösungsstrategien hat das System abrufbereit?"

</div>

---

## P3: Feedback Loops as Selection Pressure

<div lang="en">

**What:** Without evaluation-as-architecture, there is no directed improvement — only random drift.

**Why:** Nowak's selection term (fᵢ − φ) is the engine of cumulative evolution. Without it, you have prelife — generative but not cumulatively improving. Google's 2025 lesson: real-time autoraters as selection mechanism in the pipeline.

**How:**
- Every output gets evaluated (quality-gate, signal-check)
- Evaluation happens in-loop, not post-hoc
- Karpathy pattern: Modify → Run → Measure → Keep/Discard → Repeat
- Measure: "How fast does the system detect and correct a regression?"

</div>

<div lang="de">

**Was:** Ohne Evaluation als Architekturbestandteil gibt es keine gerichtete Verbesserung — nur zufälligen Drift.

**Warum:** Nowaks Selektionsterm (fᵢ − φ) ist der Motor kumulativer Evolution. Ohne ihn hat man Prelife — generativ, aber nicht kumulativ verbessernd. Googles Lektion von 2025: Echtzeit-Autorater als Selektionsmechanismus in der Pipeline.

**Wie:**
- Jeder Output wird evaluiert (Quality Gate, Signal-Check)
- Evaluation passiert in-loop, nicht post-hoc
- Karpathy-Pattern: Modify → Run → Measure → Keep/Discard → Repeat
- Messen: „Wie schnell erkennt und korrigiert das System eine Regression?"

</div>

---

## P4: Respect the Error Threshold

<div lang="en">

**What:** Never change more than you can measure. The number of simultaneous variations must stay below the evaluation system's observability capacity.

**Why:** Nowak's quasispecies theory: if mutation rate per bit exceeds 1/sequence_length, information is lost through mutational meltdown. The analogy for agents: if you change prompts, tools, and workflows simultaneously, you can't attribute improvement or regression to any specific change.

**How:**
- One change per iteration when optimizing
- Isolated experiments (worktrees, branches) for parallel exploration
- Always have a baseline to compare against
- Measure: "Can I tell which change caused this improvement/regression?"

</div>

<div lang="de">

**Was:** Ändere nie mehr, als du messen kannst. Die Zahl gleichzeitiger Variationen muss unter der Beobachtungskapazität des Evaluationssystems bleiben.

**Warum:** Nowaks Quasispecies-Theorie: Wenn die Mutationsrate pro Bit 1/Sequenzlänge übersteigt, geht Information durch Mutational Meltdown verloren. Die Analogie für Agents: Wenn du Prompts, Tools und Workflows gleichzeitig änderst, kannst du Verbesserung oder Regression keiner konkreten Änderung zuordnen.

**Wie:**
- Eine Änderung pro Iteration bei der Optimierung
- Isolierte Experimente (Worktrees, Branches) für parallele Exploration
- Immer eine Baseline zum Vergleich haben
- Messen: „Kann ich sagen, welche Änderung diese Verbesserung/Regression verursacht hat?"

</div>

---

## P5: Cooperation Must Be Measured, Not Assumed

<div lang="en">

**What:** Multi-agent setups must prove they produce genuine cooperation gain, not just resource accumulation.

**Why:** The [Collaboration Gain Metric (Γ)](https://arxiv.org/abs/2602.05289) shows that conventional metrics conflate intrinsic cooperation gain with improvements from more compute. Many multi-agent systems underperform a single agent with equivalent token budget.

**How:**
- For every multi-agent workflow, ask: "Would a single agent with 2x tokens do the same?"
- Track Γ: cooperation gain = multi-agent quality minus single-agent quality at same cost
- If Γ ≤ 0, simplify to single agent
- Measure: "What is the Γ for each multi-agent workflow?"

</div>

<div lang="de">

**Was:** Multi-Agent-Setups müssen nachweisen, dass sie echten Kooperationsgewinn erzeugen — nicht nur Ressourcenakkumulation.

**Warum:** Die [Collaboration Gain Metric (Γ)](https://arxiv.org/abs/2602.05289) zeigt, dass konventionelle Metriken intrinsischen Kooperationsgewinn mit Verbesserungen durch mehr Compute vermischen. Viele Multi-Agent-Systeme performen schlechter als ein einzelner Agent mit gleichem Token-Budget.

**Wie:**
- Bei jedem Multi-Agent-Workflow fragen: „Würde ein einzelner Agent mit 2x Tokens dasselbe schaffen?"
- Γ tracken: Kooperationsgewinn = Multi-Agent-Qualität minus Single-Agent-Qualität bei gleichen Kosten
- Wenn Γ ≤ 0, auf Single Agent vereinfachen
- Messen: „Wie hoch ist Γ für jeden Multi-Agent-Workflow?"

</div>

---

---

## P6: The Fitness Function Is the Most Fragile Part

<div lang="en">

**What:** In agent systems, evolution is artificial selection — you design the fitness function. If the function measures the wrong thing, the system evolves in the wrong direction, fast.

**Why:** In biological evolution, the environment IS the selector — there's no designer who can be wrong. In agent systems, humans design the Quality Gate, the benchmarks, the metrics. This makes the fitness function the single point of failure. [Goodhart's Law](https://en.wikipedia.org/wiki/Goodhart%27s_law): "When a measure becomes a target, it ceases to be a good measure." See also: [Counter-Arguments G4](../research/counter-arguments#g4-künstliche-selektion--natürliche-selektion-stark).

**How:**
- Regularly question your metrics: "Would gaming this metric produce a bad outcome?"
- Use multiple metrics (Pareto) rather than a single fitness score
- Keep human review in the loop — humans catch what metrics miss
- Measure: "When was the last time the quality metric was questioned for validity?"

</div>

<div lang="de">

**Was:** In Agent-Systemen ist Evolution künstliche Selektion — du designst die Fitness Function. Wenn die Funktion das Falsche misst, entwickelt sich das System schnell in die falsche Richtung.

**Warum:** In der biologischen Evolution IST die Umgebung der Selektor — es gibt keinen Designer, der falsch liegen kann. In Agent-Systemen designen Menschen die Quality Gate, die Benchmarks, die Metriken. Das macht die Fitness Function zum Single Point of Failure. [Goodhart's Law](https://en.wikipedia.org/wiki/Goodhart%27s_law): „Wenn ein Maß zum Ziel wird, hört es auf, ein gutes Maß zu sein." Siehe auch: [Counter-Arguments G4](../research/counter-arguments#g4-künstliche-selektion--natürliche-selektion-stark).

**Wie:**
- Metriken regelmäßig hinterfragen: „Würde das Gaming dieser Metrik ein schlechtes Ergebnis erzeugen?"
- Mehrere Metriken (Pareto) statt eines einzelnen Fitness-Scores verwenden
- Human Review in der Schleife behalten — Menschen erkennen, was Metriken übersehen
- Messen: „Wann wurde die Qualitätsmetrik zuletzt auf Validität geprüft?"

</div>

---

## P7: Knowledge Must Persist Beyond the Individual

<div lang="en">

**What:** Successful variations must be stored and inherited — without persistent memory, there is no cumulative evolution, only repeated rediscovery.

**Why:** Nowak's Originator equation ([Nowak & Ohtsuki, PNAS 2008](https://www.pnas.org/doi/10.1073/pnas.0806714105)) defines the transition from Prelife to Life as the emergence of **replication** — template-directed copying that carries information forward. Without replication, a system has variation and selection but no heredity. It generates novelty but cannot accumulate improvements. This is the formal difference between drift and evolution.

**How:**
- Successful skill configurations must be saved, not just evaluated and discarded
- Memory systems (MEMORY.md, learned-rules.md, skill_performance DB) are the heredity mechanism
- When an agent discovers a better approach, it must be written down — not just used once
- Cross-agent knowledge transfer (shared memory, shared skills) enables population-level inheritance
- Measure: "If I reset all agents to fresh sessions, what knowledge survives?"

**Connection to other principles:** P3 (Feedback Loops) generates the selection signal, but without P7 that signal has no lasting effect. P7 is what closes the loop from "we measured it" to "future runs benefit from it." Without P7, every session starts at zero — the system is stuck in Prelife.

</div>

<div lang="de">

**Was:** Erfolgreiche Variationen müssen gespeichert und vererbt werden — ohne persistenten Speicher gibt es keine kumulative Evolution, nur wiederholte Neuentdeckung.

**Warum:** Nowaks Originator-Gleichung ([Nowak & Ohtsuki, PNAS 2008](https://www.pnas.org/doi/10.1073/pnas.0806714105)) definiert den Übergang von Prelife zu Life als die Entstehung von **Replikation** — vorlagengesteuertes Kopieren, das Information weiterträgt. Ohne Replikation hat ein System Variation und Selektion, aber keine Vererbung. Es erzeugt Neuheit, kann aber keine Verbesserungen akkumulieren. Das ist der formale Unterschied zwischen Drift und Evolution.

**Wie:**
- Erfolgreiche Skill-Konfigurationen müssen gespeichert werden — nicht nur evaluiert und verworfen
- Memory-Systeme (MEMORY.md, learned-rules.md, skill_performance DB) sind der Vererbungsmechanismus
- Wenn ein Agent einen besseren Ansatz entdeckt, muss er aufgeschrieben werden — nicht nur einmal verwendet
- Cross-Agent-Wissenstransfer (Shared Memory, Shared Skills) ermöglicht Vererbung auf Populationsebene
- Messen: „Wenn ich alle Agents auf frische Sessions zurücksetze, welches Wissen überlebt?"

**Verbindung zu anderen Prinzipien:** P3 (Feedback Loops) erzeugt das Selektionssignal, aber ohne P7 hat dieses Signal keine dauerhafte Wirkung. P7 schließt die Schleife von „wir haben es gemessen" zu „künftige Runs profitieren davon." Ohne P7 startet jede Session bei Null — das System steckt in Prelife fest.

</div>

---

*These principles are living documents. They evolve as the research base grows. See [Counter-Arguments](../research/counter-arguments) for where the evolutionary analogy breaks.*

*Diese Prinzipien sind lebende Dokumente. Sie entwickeln sich weiter, wenn die Forschungsbasis wächst. Siehe [Counter-Arguments](../research/counter-arguments) für die Grenzen der evolutionären Analogie.*
