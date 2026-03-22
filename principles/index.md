---
layout: default
title: Principles
nav_order: 3
---

<div lang="en" markdown="1">

# Design Principles

Actionable principles derived from evolutionary dynamics research, applicable to agent architectures.

Each principle follows the format: **What** (the rule), **Why** (the evolutionary basis), **How** (concrete application).

</div>

<div lang="de" markdown="1">

# Design-Prinzipien

Handlungsorientierte Prinzipien aus der Forschung zu Evolutionsdynamik, anwendbar auf Agent-Architekturen.

Jedes Prinzip folgt dem Format: **Was** (die Regel), **Warum** (die evolutionäre Basis), **Wie** (konkrete Anwendung).

</div>

---

## <span lang="en">P1: Evolvability Over Performance</span><span lang="de">P1: Evolvierbarkeit vor Performance</span>

<div lang="en" markdown="1">

<div class='section-summary'><h4>Section Summary</h4><p>Build for adaptability, not peak performance. Systems that can evolve outperform those optimized for today's tasks.</p></div>

**What:** Optimize your agent architecture for adaptability, not just current task performance.

**Why:** Nowak shows that systems whose evolvability itself evolves are more successful long-term. [Barnett, Meister & Rainey (*Science*, 2024)](https://www.biorxiv.org/content/10.1101/2024.05.01.592015v2) demonstrated at the Max Planck Institute that bacterial lineages under selection pressure developed mutation-prone sequences in a key gene — with up to 10,000x higher local mutation rates enabling rapid state switching. QD algorithms ([MAP-Elites](https://arxiv.org/abs/1504.04909)) outperform pure fitness optimization in complex landscapes.

<div class='key-box green'><h4>💡 Key Insight</h4><p>Evolvability is itself evolvable. Bacteria evolved <em>where</em> to mutate — agents can evolve <em>how</em> to learn.</p></div>

**How:**
- Modular skills (SKILL.md) over monolithic prompts
- Progressive disclosure (AGENTS.md as table of contents) over flat configuration
- Keep skills independent — a change in one shouldn't break another
- Measure: "How many new task types can this architecture handle without restructuring?"

</div>

<div lang="de" markdown="1">

<div class='section-summary'><h4>Abschnitt-Zusammenfassung</h4><p>Baue für Anpassungsfähigkeit, nicht für Spitzenleistung. Systeme, die sich weiterentwickeln können, übertreffen solche, die auf heutige Tasks optimiert sind.</p></div>

**Was:** Optimiere deine Agent-Architektur auf Anpassungsfähigkeit, nicht nur auf aktuelle Task-Performance.

**Warum:** Nowak zeigt, dass Systeme, deren Evolvability sich selbst weiterentwickelt, langfristig erfolgreicher sind. [Barnett, Meister & Rainey (*Science*, 2024)](https://www.biorxiv.org/content/10.1101/2024.05.01.592015v2) haben am Max-Planck-Institut gezeigt, dass Bakterienlinien unter Selektionsdruck mutationsanfällige Sequenzen in einem Schlüsselgen entwickelten — mit bis zu 10.000-fach höheren lokalen Mutationsraten, die schnelles State-Switching ermöglichen. QD-Algorithmen ([MAP-Elites](https://arxiv.org/abs/1504.04909)) übertreffen reine Fitness-Optimierung in komplexen Landschaften.

<div class='key-box green'><h4>💡 Kernerkenntnis</h4><p>Evolvability ist selbst evolvierbar. Bakterien haben evolviert, <em>wo</em> sie mutieren — Agents können evolvieren, <em>wie</em> sie lernen.</p></div>

**Wie:**
- Modulare Skills (SKILL.md) statt monolithischer Prompts
- Progressive Disclosure (AGENTS.md als Inhaltsverzeichnis) statt flacher Konfiguration
- Skills unabhängig halten — eine Änderung an einem darf keinen anderen brechen
- Messen: „Wie viele neue Task-Typen kann diese Architektur ohne Umbau bewältigen?"

</div>

---

## <span lang="en">P2: Diversity as Strategic Resource</span><span lang="de">P2: Diversität als strategische Ressource</span>

<div lang="en" markdown="1">

<div class='section-summary'><h4>Section Summary</h4><p>Keep multiple good solutions ready. When conditions change, diversity is your insurance policy.</p></div>

**What:** Maintain a diverse repertoire of high-performing solutions, not just the single best one.

**Why:** MAP-Elites fills behavioral niches with elite solutions. When the environment changes, an alternative is immediately available. Pure optimization gets stuck in local optima.

<div class='key-box amber'><h4>⚠️ Caveat</h4><p>Diversity has a maintenance cost. Don't keep solutions that haven't been useful in any recent context shift — prune with intent, not on autopilot.</p></div>

**How:**
- Isolated context windows for subagents = behavioral niches
- Multiple skill variants for the same task type (e.g., different research approaches)
- Don't prune aggressively — retired skills may be useful when context shifts
- Measure: "How many distinct solution strategies does the system have ready?"

</div>

<div lang="de" markdown="1">

<div class='section-summary'><h4>Abschnitt-Zusammenfassung</h4><p>Halte mehrere gute Lösungen bereit. Wenn sich Bedingungen ändern, ist Diversität deine Versicherung.</p></div>

**Was:** Halte ein vielfältiges Repertoire leistungsfähiger Lösungen vor — nicht nur die eine beste.

**Warum:** MAP-Elites füllt verhaltensbasierte Nischen mit Elite-Lösungen. Wenn sich die Umgebung ändert, steht sofort eine Alternative bereit. Reine Optimierung bleibt in lokalen Optima stecken.

<div class='key-box amber'><h4>⚠️ Einschränkung</h4><p>Diversität hat Wartungskosten. Lösungen, die bei keinem jüngsten Kontextwechsel nützlich waren, gezielt aussortieren — aber nicht automatisiert wegräumen.</p></div>

**Wie:**
- Isolierte Context Windows für Subagents = verhaltensbasierte Nischen
- Mehrere Skill-Varianten für denselben Task-Typ (z. B. verschiedene Research-Ansätze)
- Nicht aggressiv aussortieren — ausgemusterte Skills können bei Kontextwechsel nützlich sein
- Messen: „Wie viele verschiedene Lösungsstrategien hat das System abrufbereit?"

</div>

---

## <span lang="en">P3: Feedback Loops as Selection Pressure</span><span lang="de">P3: Feedback-Loops als Selektionsdruck</span>

<div lang="en" markdown="1">

<div class='section-summary'><h4>Section Summary</h4><p>No evaluation, no evolution. Feedback loops are the selection pressure that turns random variation into directed improvement.</p></div>

**What:** Without evaluation-as-architecture, there is no directed improvement — only random drift.

**Why:** Nowak's selection term (fᵢ − φ) is the engine of cumulative evolution. Without it, you have prelife — generative but not cumulatively improving. Google's 2025 lesson: real-time autoraters as selection mechanism in the pipeline.

<div class='key-box green'><h4>💡 Key Insight</h4><p>The Karpathy loop (Modify → Run → Measure → Keep/Discard → Repeat) is artificial selection in its purest form. Evaluation must happen <em>in-loop</em>, not as an afterthought.</p></div>

**How:**
- Every output gets evaluated (quality-gate, signal-check)
- Evaluation happens in-loop, not post-hoc
- Karpathy pattern: Modify → Run → Measure → Keep/Discard → Repeat
- Measure: "How fast does the system detect and correct a regression?"

</div>

<div lang="de" markdown="1">

<div class='section-summary'><h4>Abschnitt-Zusammenfassung</h4><p>Keine Evaluation, keine Evolution. Feedback Loops sind der Selektionsdruck, der zufällige Variation in gerichtete Verbesserung verwandelt.</p></div>

**Was:** Ohne Evaluation als Architekturbestandteil gibt es keine gerichtete Verbesserung — nur zufälligen Drift.

**Warum:** Nowaks Selektionsterm (fᵢ − φ) ist der Motor kumulativer Evolution. Ohne ihn hat man Prelife — generativ, aber nicht kumulativ verbessernd. Googles Lektion von 2025: Echtzeit-Autorater als Selektionsmechanismus in der Pipeline.

<div class='key-box green'><h4>💡 Kernerkenntnis</h4><p>Der Karpathy-Loop (Modify → Run → Measure → Keep/Discard → Repeat) ist künstliche Selektion in ihrer reinsten Form. Evaluation muss <em>in-loop</em> stattfinden, nicht als Nachgedanke.</p></div>

**Wie:**
- Jeder Output wird evaluiert (Quality Gate, Signal-Check)
- Evaluation passiert in-loop, nicht post-hoc
- Karpathy-Pattern: Modify → Run → Measure → Keep/Discard → Repeat
- Messen: „Wie schnell erkennt und korrigiert das System eine Regression?"

</div>

---

## <span lang="en">P4: Respect the Error Threshold</span><span lang="de">P4: Den Error Threshold respektieren</span>

<div lang="en" markdown="1">

<div class='section-summary'><h4>Section Summary</h4><p>Change one thing at a time. Exceed your measurement capacity and you lose the ability to learn from changes.</p></div>

**What:** Never change more than you can measure. The number of simultaneous variations must stay below the evaluation system's observability capacity.

**Why:** Nowak's quasispecies theory: if mutation rate per bit exceeds 1/sequence_length, information is lost through mutational meltdown. The analogy for agents: if you change prompts, tools, and workflows simultaneously, you can't attribute improvement or regression to any specific change.

<div class='key-box amber'><h4>⚠️ Caveat</h4><p>This principle creates tension with speed. In practice, the constraint is not "literally one change" but "one change per <em>observable dimension</em>." If you can measure prompt quality and tool reliability independently, you can vary both.</p></div>

**How:**
- One change per iteration when optimizing
- Isolated experiments (worktrees, branches) for parallel exploration
- Always have a baseline to compare against
- Measure: "Can I tell which change caused this improvement/regression?"

</div>

<div lang="de" markdown="1">

<div class='section-summary'><h4>Abschnitt-Zusammenfassung</h4><p>Ändere eine Sache nach der anderen. Übersteigst du deine Messkapazität, verlierst du die Fähigkeit, aus Änderungen zu lernen.</p></div>

**Was:** Ändere nie mehr, als du messen kannst. Die Zahl gleichzeitiger Variationen muss unter der Beobachtungskapazität des Evaluationssystems bleiben.

**Warum:** Nowaks Quasispecies-Theorie: Wenn die Mutationsrate pro Bit 1/Sequenzlänge übersteigt, geht Information durch Mutational Meltdown verloren. Die Analogie für Agents: Wenn du Prompts, Tools und Workflows gleichzeitig änderst, kannst du Verbesserung oder Regression keiner konkreten Änderung zuordnen.

<div class='key-box amber'><h4>⚠️ Einschränkung</h4><p>Dieses Prinzip steht in Spannung mit Geschwindigkeit. In der Praxis ist die Einschränkung nicht „buchstäblich eine Änderung", sondern „eine Änderung pro <em>beobachtbarer Dimension</em>." Wenn du Prompt-Qualität und Tool-Zuverlässigkeit unabhängig messen kannst, darfst du beides variieren.</p></div>

**Wie:**
- Eine Änderung pro Iteration bei der Optimierung
- Isolierte Experimente (Worktrees, Branches) für parallele Exploration
- Immer eine Baseline zum Vergleich haben
- Messen: „Kann ich sagen, welche Änderung diese Verbesserung/Regression verursacht hat?"

</div>

---

## <span lang="en">P5: Cooperation Must Be Measured, Not Assumed</span><span lang="de">P5: Kooperation muss gemessen, nicht angenommen werden</span>

<div lang="en" markdown="1">

<div class='section-summary'><h4>Section Summary</h4><p>Multi-agent ≠ better. Prove cooperation gain with data, or simplify to a single agent.</p></div>

**What:** Multi-agent setups must prove they produce genuine cooperation gain, not just resource accumulation.

**Why:** The [Collaboration Gain Metric (Γ)](https://arxiv.org/abs/2602.05289) shows that conventional metrics conflate intrinsic cooperation gain with improvements from more compute. Many multi-agent systems underperform a single agent with equivalent token budget.

<div class='key-box green'><h4>💡 Key Insight</h4><p>The acid test: "Would a single agent with 2x tokens do the same?" If yes, your multi-agent setup is just expensive parallelism, not cooperation.</p></div>

**How:**
- For every multi-agent workflow, ask: "Would a single agent with 2x tokens do the same?"
- Track Γ: cooperation gain = multi-agent quality minus single-agent quality at same cost
- If Γ ≤ 0, simplify to single agent
- Measure: "What is the Γ for each multi-agent workflow?"

</div>

<div lang="de" markdown="1">

<div class='section-summary'><h4>Abschnitt-Zusammenfassung</h4><p>Multi-Agent ≠ besser. Beweise Kooperationsgewinn mit Daten, oder vereinfache auf einen einzelnen Agent.</p></div>

**Was:** Multi-Agent-Setups müssen nachweisen, dass sie echten Kooperationsgewinn erzeugen — nicht nur Ressourcenakkumulation.

**Warum:** Die [Collaboration Gain Metric (Γ)](https://arxiv.org/abs/2602.05289) zeigt, dass konventionelle Metriken intrinsischen Kooperationsgewinn mit Verbesserungen durch mehr Compute vermischen. Viele Multi-Agent-Systeme performen schlechter als ein einzelner Agent mit gleichem Token-Budget.

<div class='key-box green'><h4>💡 Kernerkenntnis</h4><p>Der Lackmustest: „Würde ein einzelner Agent mit 2x Tokens dasselbe schaffen?" Wenn ja, ist dein Multi-Agent-Setup nur teurer Parallelismus, keine Kooperation.</p></div>

**Wie:**
- Bei jedem Multi-Agent-Workflow fragen: „Würde ein einzelner Agent mit 2x Tokens dasselbe schaffen?"
- Γ tracken: Kooperationsgewinn = Multi-Agent-Qualität minus Single-Agent-Qualität bei gleichen Kosten
- Wenn Γ ≤ 0, auf Single Agent vereinfachen
- Messen: „Wie hoch ist Γ für jeden Multi-Agent-Workflow?"

</div>

---

## <span lang="en">P6: The Fitness Function Is the Most Fragile Part</span><span lang="de">P6: Die Fitness-Funktion ist der fragilste Teil</span>

<div lang="en" markdown="1">

<div class='section-summary'><h4>Section Summary</h4><p>You design the selection pressure. If your metrics measure the wrong thing, the system optimizes in the wrong direction — fast.</p></div>

**What:** In agent systems, evolution is artificial selection — you design the fitness function. If the function measures the wrong thing, the system evolves in the wrong direction, fast.

**Why:** In biological evolution, the environment IS the selector — there's no designer who can be wrong. In agent systems, humans design the Quality Gate, the benchmarks, the metrics. This makes the fitness function the single point of failure. [Goodhart's Law](https://en.wikipedia.org/wiki/Goodhart%27s_law): "When a measure becomes a target, it ceases to be a good measure." See also: [Counter-Arguments G4](../research/counter-arguments#g4-künstliche-selektion--natürliche-selektion-stark).

<div class='key-box amber'><h4>⚠️ Caveat</h4><p>This is the strongest disanalogy between biological and artificial evolution. In nature, the fitness function can't be "wrong." In agent systems, it almost always is — at least partially. Build for continuous recalibration.</p></div>

**How:**
- Regularly question your metrics: "Would gaming this metric produce a bad outcome?"
- Use multiple metrics (Pareto) rather than a single fitness score
- Keep human review in the loop — humans catch what metrics miss
- Measure: "When was the last time the quality metric was questioned for validity?"

</div>

<div lang="de" markdown="1">

<div class='section-summary'><h4>Abschnitt-Zusammenfassung</h4><p>Du designst den Selektionsdruck. Wenn deine Metriken das Falsche messen, optimiert das System in die falsche Richtung — schnell.</p></div>

**Was:** In Agent-Systemen ist Evolution künstliche Selektion — du designst die Fitness Function. Wenn die Funktion das Falsche misst, entwickelt sich das System schnell in die falsche Richtung.

**Warum:** In der biologischen Evolution IST die Umgebung der Selektor — es gibt keinen Designer, der falsch liegen kann. In Agent-Systemen designen Menschen die Quality Gate, die Benchmarks, die Metriken. Das macht die Fitness Function zum Single Point of Failure. [Goodhart's Law](https://en.wikipedia.org/wiki/Goodhart%27s_law): „Wenn ein Maß zum Ziel wird, hört es auf, ein gutes Maß zu sein." Siehe auch: [Counter-Arguments G4](../research/counter-arguments#g4-künstliche-selektion--natürliche-selektion-stark).

<div class='key-box amber'><h4>⚠️ Einschränkung</h4><p>Das ist die stärkste Disanalogie zwischen biologischer und künstlicher Evolution. In der Natur kann die Fitness Function nicht „falsch" sein. In Agent-Systemen ist sie es fast immer — zumindest teilweise. Baue für kontinuierliche Rekalibrierung.</p></div>

**Wie:**
- Metriken regelmäßig hinterfragen: „Würde das Gaming dieser Metrik ein schlechtes Ergebnis erzeugen?"
- Mehrere Metriken (Pareto) statt eines einzelnen Fitness-Scores verwenden
- Human Review in der Schleife behalten — Menschen erkennen, was Metriken übersehen
- Messen: „Wann wurde die Qualitätsmetrik zuletzt auf Validität geprüft?"

</div>

---

## <span lang="en">P7: Knowledge Must Persist Beyond the Individual</span><span lang="de">P7: Wissen muss über das Individuum hinaus bestehen</span>

<div lang="en" markdown="1">

<div class='section-summary'><h4>Section Summary</h4><p>Without heredity, there is no evolution — only repeated rediscovery. Persistent memory is what separates cumulative improvement from Groundhog Day.</p></div>

**What:** Successful variations must be stored and inherited — without persistent memory, there is no cumulative evolution, only repeated rediscovery.

**Why:** Nowak's Originator equation ([Nowak & Ohtsuki, PNAS 2008](https://www.pnas.org/doi/10.1073/pnas.0806714105)) defines the transition from Prelife to Life as the emergence of **replication** — template-directed copying that carries information forward. Without replication, a system has variation and selection but no heredity. It generates novelty but cannot accumulate improvements. This is the formal difference between drift and evolution.

<div class='key-box green'><h4>💡 Key Insight</h4><p>P3 (Feedback Loops) generates the selection signal, but without P7 that signal has no lasting effect. P7 closes the loop from "we measured it" to "future runs benefit from it." Without P7, every session starts at zero — the system is stuck in Prelife.</p></div>

**How:**
- Successful skill configurations must be saved, not just evaluated and discarded
- Memory systems (MEMORY.md, learned-rules.md, skill_performance DB) are the heredity mechanism
- When an agent discovers a better approach, it must be written down — not just used once
- Cross-agent knowledge transfer (shared memory, shared skills) enables population-level inheritance
- Measure: "If I reset all agents to fresh sessions, what knowledge survives?"

</div>

<div lang="de" markdown="1">

<div class='section-summary'><h4>Abschnitt-Zusammenfassung</h4><p>Ohne Vererbung gibt es keine Evolution — nur wiederholte Neuentdeckung. Persistenter Speicher trennt kumulative Verbesserung von Und-täglich-grüßt-das-Murmeltier.</p></div>

**Was:** Erfolgreiche Variationen müssen gespeichert und vererbt werden — ohne persistenten Speicher gibt es keine kumulative Evolution, nur wiederholte Neuentdeckung.

**Warum:** Nowaks Originator-Gleichung ([Nowak & Ohtsuki, PNAS 2008](https://www.pnas.org/doi/10.1073/pnas.0806714105)) definiert den Übergang von Prelife zu Life als die Entstehung von **Replikation** — vorlagengesteuertes Kopieren, das Information weiterträgt. Ohne Replikation hat ein System Variation und Selektion, aber keine Vererbung. Es erzeugt Neuheit, kann aber keine Verbesserungen akkumulieren. Das ist der formale Unterschied zwischen Drift und Evolution.

<div class='key-box green'><h4>💡 Kernerkenntnis</h4><p>P3 (Feedback Loops) erzeugt das Selektionssignal, aber ohne P7 hat dieses Signal keine dauerhafte Wirkung. P7 schließt die Schleife von „wir haben es gemessen" zu „künftige Runs profitieren davon." Ohne P7 startet jede Session bei Null — das System steckt in Prelife fest.</p></div>

**Wie:**
- Erfolgreiche Skill-Konfigurationen müssen gespeichert werden — nicht nur evaluiert und verworfen
- Memory-Systeme (MEMORY.md, learned-rules.md, skill_performance DB) sind der Vererbungsmechanismus
- Wenn ein Agent einen besseren Ansatz entdeckt, muss er aufgeschrieben werden — nicht nur einmal verwendet
- Cross-Agent-Wissenstransfer (Shared Memory, Shared Skills) ermöglicht Vererbung auf Populationsebene
- Messen: „Wenn ich alle Agents auf frische Sessions zurücksetze, welches Wissen überlebt?"

</div>

---

<div lang="en" markdown="1">

## Trade-offs: Where Principles Collide

These principles are not independent — they create productive tensions:

<div class="key-box amber">
<h4>P1 (Evolvability) vs. P4 (Error Threshold)</h4>
<p>P1 says: build for change. P4 says: don't change too much at once. The resolution: make the <em>architecture</em> evolvable (P1) while keeping each <em>iteration</em> within measurement capacity (P4). Evolvability is about structure, Error Threshold is about cadence.</p>
</div>

<div class="key-box amber">
<h4>P2 (Diversity) vs. P6 (Fitness Function)</h4>
<p>Maintaining diverse solutions (P2) costs resources — and G6 (Counter-Arguments) warns that evolutionary approaches are expensive. P6 adds: if your fitness function is wrong, diverse solutions just give you more wrong answers, faster. The resolution: diversity pays off only when evaluation is trustworthy.</p>
</div>

<div class="key-box amber">
<h4>P3 (Feedback Loops) vs. P5 (Cooperation Must Be Measured)</h4>
<p>P3 says every output needs evaluation. But P5 reveals that evaluation itself can be misleading — multi-agent metrics often conflate cooperation gain with resource accumulation. The resolution: don't just measure, measure the <em>right thing</em>. Γ (cooperation gain) over raw accuracy.</p>
</div>

</div>

<div lang="de" markdown="1">

## Trade-offs: Wo Prinzipien kollidieren

Diese Prinzipien sind nicht unabhängig — sie erzeugen produktive Spannungen:

<div class="key-box amber">
<h4>P1 (Evolvierbarkeit) vs. P4 (Error Threshold)</h4>
<p>P1 sagt: baue für Veränderung. P4 sagt: ändere nicht zu viel auf einmal. Die Auflösung: Mach die <em>Architektur</em> evolvierbar (P1), aber halte jede <em>Iteration</em> innerhalb der Messkapazität (P4). Evolvierbarkeit ist Struktur, Error Threshold ist Takt.</p>
</div>

<div class="key-box amber">
<h4>P2 (Diversität) vs. P6 (Fitness-Funktion)</h4>
<p>Diverse Lösungen pflegen (P2) kostet Ressourcen — und G6 (Gegenargumente) warnt, dass evolutionäre Ansätze teuer sind. P6 ergänzt: wenn die Fitness-Funktion falsch ist, liefern diverse Lösungen nur mehr falsche Antworten, schneller. Die Auflösung: Diversität lohnt sich nur, wenn die Evaluation vertrauenswürdig ist.</p>
</div>

<div class="key-box amber">
<h4>P3 (Feedback Loops) vs. P5 (Kooperation muss gemessen werden)</h4>
<p>P3 sagt: jeder Output braucht Evaluation. Aber P5 zeigt, dass Evaluation selbst irreführend sein kann — Multi-Agent-Metriken vermischen oft Kooperationsgewinn mit Ressourcenakkumulation. Die Auflösung: nicht nur messen, sondern das <em>Richtige</em> messen. Γ (Kooperationsgewinn) statt roher Accuracy.</p>
</div>

</div>

---

*These principles are living documents. They evolve as the research base grows. See [Counter-Arguments](../research/counter-arguments) for where the evolutionary analogy breaks.*

*Diese Prinzipien sind lebende Dokumente. Sie entwickeln sich weiter, wenn die Forschungsbasis wächst. Siehe [Counter-Arguments](../research/counter-arguments) für die Grenzen der evolutionären Analogie.*
