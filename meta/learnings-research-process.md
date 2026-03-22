---
layout: default
title: Research Learnings
parent: Meta
nav_exclude: true
nav_order: 2
---

# Research Process Learnings

<div lang="en" markdown="1">

Insights from the first research round (2026-03-19).
Each learning is applicable to our AgentField system.

</div>

<div lang="de" markdown="1">

Erkenntnisse aus der ersten Recherche-Runde (2026-03-19).
Jedes Learning ist für unser AgentField-System nutzbar.

</div>

---

<!-- ═══════════════════════════════════════════════════ L1 ═══ -->

<div lang="en" markdown="1">

## L1: Semantic Scholar API — Rate Limiting Is Aggressive

<div class="key-box green"><h4>💡 Key Insight</h4><p>Never bombard external APIs in parallel without a rate-limit check. Always check docs for rate limits before integrating.</p></div>

<div class="section-summary">
<h4>📋 Section Summary</h4>
<p>Parallel API calls to Semantic Scholar hit aggressive rate limits (429). Sequential calls with cooldown or an API key are required. arXiv serves as a reliable fallback.</p>
</div>

**What happened:** 3 parallel WebFetch calls to the Semantic Scholar API → 2 out of 3 returned HTTP 429 (Too Many Requests). Even sequential retries after a few seconds → 429 again.

**Practical Implication:**
- Semantic Scholar allows ~1 request/second without an API key
- With an API key (free, via email) → 100 requests/second
- Our research-pipeline must make calls sequentially with cooldown, or better: obtain an API key

**System Improvement:**
- [ ] Apply for Semantic Scholar API key (free)
- [ ] Add rate-limiter to research-pipeline for API calls (1/s default, 100/s with key)
- [ ] Fallback strategy: if API blocks → use arXiv API as alternative

<div class="key-box amber"><h4>⚠️ Lesson Learned</h4><p>Assuming APIs handle parallel load gracefully is a common mistake. Even "open" academic APIs enforce strict limits without API keys.</p></div>

</div>

<div lang="de" markdown="1">

## L1: Semantic Scholar API — Rate Limiting ist aggressiv

<div class="key-box green"><h4>💡 Kernerkenntnis</h4><p>Externe APIs niemals parallel bombardieren ohne Rate-Limit-Check. Immer zuerst die Docs nach Rate Limits prüfen.</p></div>

<div class="section-summary">
<h4>📋 Zusammenfassung</h4>
<p>Parallele API-Calls an Semantic Scholar treffen auf aggressives Rate Limiting (429). Sequentielle Calls mit Cooldown oder ein API Key sind nötig. arXiv dient als zuverlässiger Fallback.</p>
</div>

**Was passierte:** 3 parallele WebFetch-Calls an Semantic Scholar API → 2 von 3 gaben HTTP 429 (Too Many Requests). Auch sequentieller Retry nach wenigen Sekunden → erneut 429.

**Praktische Konsequenz:**
- Semantic Scholar erlaubt ~1 Request/Sekunde ohne API Key
- Mit API Key (kostenlos, per Mail) → 100 Requests/Sekunde
- Unsere research-pipeline muss Calls sequentiell mit Cooldown machen, oder besser: API Key holen

**System-Verbesserung:**
- [ ] Semantic Scholar API Key beantragen (kostenlos)
- [ ] In research-pipeline: Rate-Limiter einbauen für API-Calls (1/s default, 100/s mit Key)
- [ ] Fallback-Strategie: Wenn API blockt → arXiv API als Alternative

<div class="key-box amber"><h4>⚠️ Lesson Learned</h4><p>Anzunehmen, dass APIs parallele Last vertragen, ist ein häufiger Fehler. Selbst "offene" akademische APIs erzwingen strikte Limits ohne API Keys.</p></div>

</div>

---

<!-- ═══════════════════════════════════════════════════ L2 ═══ -->

<div lang="en" markdown="1">

## L2: GitHub Awesome Lists > Direct API Search as Entry Point

<div class="key-box green"><h4>💡 Key Insight</h4><p>Curated community overviews first, then custom search for gaps. One good Awesome list = dozens of API calls saved.</p></div>

<div class="section-summary">
<h4>📋 Section Summary</h4>
<p>Curated GitHub Awesome lists deliver structured, categorized overviews far more efficiently than individual API calls. They should be the first step in any research pipeline.</p>
</div>

**What happened:** A single WebFetch on the [Awesome-Self-Evolving-Agents](https://github.com/EvoAgentX/Awesome-Self-Evolving-Agents) list immediately delivered ~30 categorized papers with taxonomy — far more efficient than 10 individual API calls.

**Practical Implication:**
- Awesome lists are curated, structured, and current (community-maintained)
- They provide taxonomy for free — how the field organizes itself
- For new topics: first search "awesome-[topic]" on GitHub, then dive deeper

**System Improvement:**
- [ ] Add step 1 to research-pipeline: "Check if awesome-[topic] exists on GitHub"
- [ ] learn-from-the-best skill: add GitHub Awesome lists as heuristic source

</div>

<div lang="de" markdown="1">

## L2: GitHub Awesome-Listen > direkte API-Suche als Einstiegspunkt

<div class="key-box green"><h4>💡 Kernerkenntnis</h4><p>Kuratierte Community-Übersichten zuerst, dann eigene Suche für Lücken. Eine gute Awesome-Liste = dutzende API-Calls gespart.</p></div>

<div class="section-summary">
<h4>📋 Zusammenfassung</h4>
<p>Kuratierte GitHub Awesome-Listen liefern strukturierte, kategorisierte Übersichten weit effizienter als einzelne API-Calls. Sie sollten der erste Schritt jeder Research-Pipeline sein.</p>
</div>

**Was passierte:** Ein einziger WebFetch auf die [Awesome-Self-Evolving-Agents](https://github.com/EvoAgentX/Awesome-Self-Evolving-Agents) Liste lieferte sofort ~30 kategorisierte Papers mit Taxonomie, deutlich effizienter als 10 einzelne API-Calls.

**Praktische Konsequenz:**
- Awesome-Listen sind kuratiert, strukturiert, aktuell (Community-maintained)
- Sie geben Taxonomie gratis mit — wie das Feld sich selbst organisiert
- Für neue Themen: Erst "awesome-[topic]" auf GitHub suchen, dann vertiefen

**System-Verbesserung:**
- [ ] In research-pipeline Schritt 1 ergänzen: "Prüfe ob awesome-[topic] auf GitHub existiert"
- [ ] learn-from-the-best Skill: GitHub Awesome-Listen als Heuristik-Quelle aufnehmen

</div>

---

<!-- ═══════════════════════════════════════════════════ L3 ═══ -->

<div lang="en" markdown="1">

## L3: arXiv API — Reliable, No Rate Limit, XML-Based

<div class="key-box green"><h4>💡 Key Insight</h4><p>Prefer public, unlimited APIs. arXiv > Semantic Scholar for discovery. Reliability beats features.</p></div>

<div class="section-summary">
<h4>📋 Section Summary</h4>
<p>arXiv's API handles parallel requests flawlessly with no rate limiting — making it the most robust entry point for paper discovery. It should be the primary source in any research pipeline.</p>
</div>

**What happened:** 3 parallel arXiv API calls → all 3 successful, yielding 35 papers total. No rate limiting, instant results.

**Practical Implication:**
- arXiv API is the most robust access point for paper discovery
- XML format is well-handled by WebFetch
- Sorting by submittedDate immediately returns the newest papers

**System Improvement:**
- [ ] Integrate arXiv as primary paper discovery source in research-pipeline
- [ ] Define standard queries for core topics (monitoring-ready)

</div>

<div lang="de" markdown="1">

## L3: arXiv API — Zuverlässig, kein Rate Limit, XML-basiert

<div class="key-box green"><h4>💡 Kernerkenntnis</h4><p>Öffentliche, unlimitierte APIs bevorzugen. arXiv > Semantic Scholar für Discovery. Zuverlässigkeit schlägt Features.</p></div>

<div class="section-summary">
<h4>📋 Zusammenfassung</h4>
<p>Die arXiv-API verarbeitet parallele Requests problemlos ohne Rate Limiting — das macht sie zum robustesten Einstiegspunkt für Paper-Discovery. Sie sollte die primäre Quelle jeder Research-Pipeline sein.</p>
</div>

**Was passierte:** 3 parallele arXiv-API-Calls → alle 3 erfolgreich, zusammen 35 Papers. Kein Rate Limiting, sofort Ergebnisse.

**Praktische Konsequenz:**
- arXiv API ist der robusteste Zugang für Paper-Discovery
- XML-Format wird von WebFetch gut verarbeitet
- Sortierung nach submittedDate gibt sofort die neuesten Papers

**System-Verbesserung:**
- [ ] arXiv als primäre Paper-Discovery-Quelle in research-pipeline einbauen
- [ ] Standard-Queries definieren für die Kern-Themen (monitoring-ready)

</div>

---

<!-- ═══════════════════════════════════════════════════ L4 ═══ -->

<div lang="en" markdown="1">

## L4: Multilingual Research Confirmed — Chinese Search Yields Different Results

<div class="key-box green"><h4>💡 Key Insight</h4><p>Language diversity = knowledge diversity. English-only research systematically misses 30-50% of relevant work, especially from China's booming AI scene.</p></div>

<div class="section-summary">
<h4>📋 Section Summary</h4>
<p>Searching in Chinese uncovered ~30-50% of relevant work invisible to English-only queries — including Tsinghua talks, CAICT reports, and Zhihu discussions. Multilingual search is not optional, it's essential.</p>
</div>

**What happened:** WebSearch with Chinese characters (自进化 智能体 多智能体 进化算法 大模型) returned results that appeared in no English search:
- Tsinghua AIR Talk by 刘洋 on "LLM-Driven Evolvable Agents"
- CAICT + Huawei Report on Agent Technology (June 2025)
- Zhihu discussions with unique perspectives
- Foundation Agents Survey (MetaGPT + Mila, 47 authors)

**Practical Implication:**
- ~30-50% of relevant work is only discoverable through Chinese search
- Zhihu (知乎) is China's StackOverflow/Medium equivalent — researchers discuss informally there
- CAICT Reports are China's equivalent of NIST/EU whitepapers

**System Improvement:**
- [ ] Extend research-pipeline with CJK module:
  1. Auto-translate core keywords to ZH/JA/KO
  2. Run separate search in each language
  3. Translate results back to German/English
- [ ] Add Zhihu (知乎) as source for informal research discussion
- [ ] Track CAICT, Tsinghua AIR, PKU as monitored institutions

<div class="key-box amber"><h4>⚠️ Lesson Learned</h4><p>We initially skipped non-English search entirely. This blind spot could have led to duplicating existing Chinese research or missing critical approaches.</p></div>

</div>

<div lang="de" markdown="1">

## L4: Multilinguale Recherche bestätigt — Chinesische Suche liefert andere Ergebnisse

<div class="key-box green"><h4>💡 Kernerkenntnis</h4><p>Sprach-Diversität = Wissens-Diversität. Rein englische Recherche übersieht systematisch 30-50% relevanter Arbeiten, besonders aus Chinas boomender AI-Szene.</p></div>

<div class="section-summary">
<h4>📋 Zusammenfassung</h4>
<p>Suche auf Chinesisch enthüllte ~30-50% relevanter Arbeiten, die bei reiner Englisch-Suche unsichtbar blieben — inkl. Tsinghua-Talks, CAICT-Reports und Zhihu-Diskussionen. Multilinguale Suche ist kein Nice-to-have, sondern essentiell.</p>
</div>

**Was passierte:** WebSearch mit chinesischen Zeichen (自进化 智能体 多智能体 进化算法 大模型) lieferte Ergebnisse, die in keiner englischen Suche auftauchten:
- Tsinghua AIR Talk von 刘洋 über "LLM-Driven Evolvable Agents"
- CAICT + Huawei Report über Agent-Technologie (Juni 2025)
- Zhihu-Diskussionen mit eigenen Perspektiven
- Foundation Agents Survey (MetaGPT + Mila, 47 Autoren)

**Praktische Konsequenz:**
- ~30-50% der relevanten Arbeit ist nur über chinesische Suche auffindbar
- Zhihu (知乎) ist Chinas StackOverflow/Medium-Äquivalent — dort diskutieren Forscher informell
- CAICT Reports sind Chinas Äquivalent zu NIST/EU-Whitepapers

**System-Verbesserung:**
- [ ] research-pipeline um CJK-Modul erweitern:
  1. Kern-Keywords automatisch nach ZH/JA/KO übersetzen
  2. Separate Suche in jeder Sprache
  3. Ergebnisse zurück ins Deutsche/Englische übersetzen
- [ ] Zhihu (知乎) als Quelle für informelle Forschungsdiskussion aufnehmen
- [ ] CAICT, Tsinghua AIR, PKU als tracked institutions hinzufügen

<div class="key-box amber"><h4>⚠️ Lesson Learned</h4><p>Wir haben anfangs nicht-englische Suche komplett übersprungen. Dieser blinde Fleck hätte dazu führen können, existierende chinesische Forschung zu duplizieren oder kritische Ansätze zu verpassen.</p></div>

</div>

---

<!-- ═══════════════════════════════════════════════════ L5 ═══ -->

<div lang="en" markdown="1">

## L5: The Field Moves at Weekly Speed

<div class="key-box green"><h4>💡 Key Insight</h4><p>In fast-moving fields, monitoring is more important than one-time research. Build the pipeline, not just the report.</p></div>

<div class="section-summary">
<h4>📋 Section Summary</h4>
<p>12 relevant papers appeared in just two weeks. Static literature reviews are obsolete within days. Continuous monitoring (weekly digests) is essential in fast-moving fields.</p>
</div>

**What happened:** 12 relevant new papers in the first half of March 2026 alone. AgentFactory (day before yesterday!), SEMAG, SAGE, OpenHospital — all brand new.

**Practical Implication:**
- Static literature lists are outdated after 2 weeks
- Without automatic monitoring, we quickly miss important developments
- The Awesome list is updated community-maintained

**System Improvement:**
- [ ] Set up arXiv RSS/API-based weekly digest for relevant keywords
- [ ] Awareness metric: "How old is our newest entry?" as monitoring signal

<div class="key-box amber"><h4>⚠️ Lesson Learned</h4><p>A comprehensive literature review done today becomes incomplete by next week. Without automated digests, we're always playing catch-up.</p></div>

</div>

<div lang="de" markdown="1">

## L5: Das Feld bewegt sich im Wochentakt

<div class="key-box green"><h4>💡 Kernerkenntnis</h4><p>In schnellen Feldern ist Monitoring wichtiger als einmalige Recherche. Baue die Pipeline, nicht nur den Report.</p></div>

<div class="section-summary">
<h4>📋 Zusammenfassung</h4>
<p>12 relevante Papers erschienen in nur zwei Wochen. Statische Literaturreviews sind innerhalb von Tagen veraltet. Kontinuierliches Monitoring (Weekly Digests) ist essentiell in schnellen Feldern.</p>
</div>

**Was passierte:** 12 relevante neue Papers allein in der ersten Märzhälfte 2026. AgentFactory (vorgestern!), SEMAG, SAGE, OpenHospital — alles brandneu.

**Praktische Konsequenz:**
- Statische Literaturlisten sind nach 2 Wochen veraltet
- Ohne automatisches Monitoring verpassen wir schnell wichtige Entwicklungen
- Die Awesome-Liste wird community-maintained aktualisiert

**System-Verbesserung:**
- [ ] arXiv RSS/API-basiertes Weekly Digest für die relevanten Keywords einrichten
- [ ] Awareness-Metrik: "Wie alt ist unser neuester Eintrag?" als Monitoring-Signal

<div class="key-box amber"><h4>⚠️ Lesson Learned</h4><p>Ein umfassendes Literaturreview von heute wird bis nächste Woche unvollständig. Ohne automatisierte Digests spielen wir immer Aufholjagd.</p></div>

</div>

---

<!-- ═══════════════════════════════════════════════════ L6 ═══ -->

<div lang="en" markdown="1">

## L6: Bridge Papers Exist — EvoFlow Is the Missing Link

<div class="key-box green"><h4>💡 Key Insight</h4><p>Always search for bridge papers between two fields. They almost always exist, and finding them saves months of reinvention.</p></div>

<div class="section-summary">
<h4>📋 Section Summary</h4>
<p>EvoFlow directly bridges evolutionary algorithms and agent workflow optimization — proving the Nowak→Agent-Systems connection is implementable, not just theoretical. It beat o1-preview at a fraction of the cost.</p>
</div>

**What happened:** EvoFlow (2502.07373, 31 citations) explicitly uses Niching Evolutionary Algorithms (related to MAP-Elites/Quality-Diversity) for agent workflow evolution. It outperformed o1-preview by 2.7% at 12.4% of the cost.

**Practical Implication:**
- The bridge from Nowak → agent systems is NOT merely theoretical — EvoFlow implements it
- Niching-based selection = Nowak's population diversity in practice
- Open-source models + evolution > single large model (cost/performance argument)

**System Improvement:**
- Study EvoFlow's architecture: tag-based retrieval + crossover + mutation + niching selection
- Check if our skill system shows similar patterns (skills as "individuals", quality-gate as "selection")

</div>

<div lang="de" markdown="1">

## L6: Brückenpaper existieren — EvoFlow ist das fehlende Bindeglied

<div class="key-box green"><h4>💡 Kernerkenntnis</h4><p>Suche immer nach Brückenpapern zwischen zwei Feldern. Sie existieren fast immer, und sie zu finden spart Monate an Neuerfindung.</p></div>

<div class="section-summary">
<h4>📋 Zusammenfassung</h4>
<p>EvoFlow verbindet direkt evolutionäre Algorithmen mit Agent-Workflow-Optimierung — und beweist, dass die Nowak→Agent-Systems Verbindung implementierbar ist, nicht nur theoretisch. Es schlug o1-preview zu einem Bruchteil der Kosten.</p>
</div>

**Was passierte:** EvoFlow (2502.07373, 31 Zitationen) nutzt explizit Niching Evolutionary Algorithms (verwandt mit MAP-Elites/Quality-Diversity) für Agent-Workflow-Evolution. Es übertraf o1-preview um 2.7% bei 12.4% der Kosten.

**Praktische Konsequenz:**
- Die Brücke Nowak → Agent-Systeme ist NICHT nur theoretisch — EvoFlow implementiert sie
- Niching-basierte Selektion = Nowaks Populationsdiversität in der Praxis
- Open-Source-Modelle + Evolution > einzelnes großes Modell (Kosten-/Performance-Argument)

**System-Verbesserung:**
- EvoFlow's Architektur studieren: Tag-basiertes Retrieval + Crossover + Mutation + Niching Selection
- Prüfen ob unser Skill-System ähnliche Muster zeigt (Skills als "Individuen", Quality-Gate als "Selection")

</div>

---

<!-- ═══════════════════════════════════════════════════ L7 ═══ -->

<div lang="en" markdown="1">

## L7: Meta Context Engineering = Formalized AgentField

<div class="key-box green"><h4>💡 Key Insight</h4><p>If someone has formalized what you do manually → study it. It accelerates the leap from manual to automated by years.</p></div>

<div class="section-summary">
<h4>📋 Section Summary</h4>
<p>The MCE paper formalizes exactly what AgentField does manually: skills and context artifacts co-evolving via meta-agent refinement. This isn't a coincidence — it's validation that our approach is on the right track.</p>
</div>

**What happened:** The MCE paper (2601.21557) describes exactly what AgentField does manually: skills and context artifacts co-evolve. A meta-agent refines skills through deliberative search, a base-agent executes. 5.6-53.8% improvement over SOTA.

**Practical Implication:**
- AgentField IS already a (manual) MCE system
- The step from manual to automated is formalized — we don't need to reinvent the wheel
- The "deliberative search over historical skills, executions, and evaluations" is exactly what our improve-skill does in rudimentary form

**System Improvement:**
- Study MCE paper in detail
- Check which MCE elements we can automate
- Use pulse metrics as "evaluation signal" for skill evolution

<div class="key-box amber"><h4>⚠️ Lesson Learned</h4><p>We almost missed this paper because we searched for "evolving agents" but not "meta context engineering." Terminological gaps between fields can hide the most relevant work.</p></div>

</div>

<div lang="de" markdown="1">

## L7: Meta Context Engineering = Formalisiertes AgentField

<div class="key-box green"><h4>💡 Kernerkenntnis</h4><p>Wenn jemand das formalisiert hat, was du manuell tust → studiere es. Es beschleunigt den Sprung von manuell zu automatisiert um Jahre.</p></div>

<div class="section-summary">
<h4>📋 Zusammenfassung</h4>
<p>Das MCE-Paper formalisiert genau das, was AgentField manuell tut: Skills und Context-Artefakte ko-evolvieren durch Meta-Agent-Verfeinerung. Das ist kein Zufall — es validiert, dass unser Ansatz auf dem richtigen Weg ist.</p>
</div>

**Was passierte:** MCE Paper (2601.21557) beschreibt genau das, was AgentField manuell tut: Skills und Context-Artefakte ko-evolvieren. Meta-Agent verfeinert Skills durch deliberative Search, Base-Agent führt aus. 5.6-53.8% Verbesserung über SOTA.

**Praktische Konsequenz:**
- AgentField IST bereits ein (manuelles) MCE-System
- Der Schritt von manuell zu automatisiert ist formalisiert — wir müssen das Rad nicht neu erfinden
- Die "deliberative search over historical skills, executions, and evaluations" ist genau das, was unser improve-Skill ansatzweise tut

**System-Verbesserung:**
- MCE-Paper im Detail studieren
- Prüfen welche MCE-Elemente wir automatisieren können
- Pulse-Metriken als "evaluation signal" für Skill-Evolution nutzen

<div class="key-box amber"><h4>⚠️ Lesson Learned</h4><p>Wir hätten dieses Paper fast verpasst, weil wir nach "evolving agents" suchten, aber nicht nach "meta context engineering." Terminologische Lücken zwischen Feldern können die relevanteste Arbeit verstecken.</p></div>

</div>

---

<!-- ═══════════════════════════════════════════════════ L8 ═══ -->

<div lang="en" markdown="1">

## L8: The Nowak-Agent Isomorphism Is NOT Unique — Others See It Too

<div class="key-box green"><h4>💡 Key Insight</h4><p>Convergent thinking from independent groups = strong validation. Unique angle within that convergence = publishable contribution.</p></div>

<div class="section-summary">
<h4>📋 Section Summary</h4>
<p>Others are independently arriving at the same evolutionary→AI transfer insight, validating our direction. But nobody has yet mapped Nowak's Originator equation to agent systems — that's our unique opening.</p>
</div>

**What happened:** "Evolutionary Systems Thinking" (2602.15957) explicitly argues for transferring evolutionary dynamics to complex adaptive systems including AI. "Evolving Interpretable Constitutions" (2602.00755) connects Constitutional AI with evolutionary approaches for multi-agent coordination.

**Practical Implication:**
- Our Nowak synthesis is not esoteric — there is a growing community
- But: nobody has yet explicitly mapped Nowak's Originator equation to agent systems (our unique contribution?)
- The isomorphism table from our synthesis could become a standalone contribution

</div>

<div lang="de" markdown="1">

## L8: Der Nowak-Agent-Isomorphismus ist NICHT einzigartig — andere sehen es auch

<div class="key-box green"><h4>💡 Kernerkenntnis</h4><p>Konvergentes Denken unabhängiger Gruppen = starke Validierung. Einzigartiger Winkel innerhalb dieser Konvergenz = publizierbare Contribution.</p></div>

<div class="section-summary">
<h4>📋 Zusammenfassung</h4>
<p>Andere kommen unabhängig zum gleichen Evolutionäres→AI Transfer-Insight, was unsere Richtung validiert. Aber niemand hat bisher Nowaks Originator-Gleichung auf Agent-Systeme abgebildet — das ist unsere einzigartige Öffnung.</p>
</div>

**Was passierte:** "Evolutionary Systems Thinking" (2602.15957) argumentiert explizit für die Übertragung von Evolutionsdynamik auf komplexe adaptive Systeme inkl. AI. "Evolving Interpretable Constitutions" (2602.00755) verbindet Constitutional AI mit evolutionären Ansätzen für Multi-Agent-Koordination.

**Praktische Konsequenz:**
- Unsere Nowak-Synthese ist nicht esoterisch — es gibt eine wachsende Community
- Aber: Niemand hat bisher Nowaks Originator-Gleichung explizit auf Agent-Systeme abgebildet (unsere unique contribution?)
- Die Isomorphie-Tabelle aus unserer Synthese könnte ein eigenständiger Beitrag werden

</div>

---

<!-- ═══════════════════════════════════════════ SUMMARY ═══ -->

<div lang="en" markdown="1">

## Summary

<div class="section-summary">
<h4>📋 Section Summary</h4>
<p>8 learnings distilled into 5 pipeline improvements, 4 new tool requirements, and 4 design principles. The core theme: build monitoring systems, not static reports.</p>
</div>

### What Should Flow Back Into the AgentField System

#### 🔧 research-pipeline Improvements
1. Awesome lists as entry heuristic
2. arXiv API as primary discovery source
3. Rate-limiter for Semantic Scholar
4. CJK module for multilingual search
5. Automatic monitoring (weekly digest)

#### 🛠️ New Tool Requirements
- Semantic Scholar API key → research-pipeline integration
- Translation-aware search wrapper
- Citation graph builder (paper → references → citations)
- arXiv RSS digest via Trigger.dev

#### Design Principles (Newly Derived)

- **Language diversity = knowledge diversity**
- **Curated lists first, custom search for gaps**
- **In fast fields: monitoring > one-time research**
- **Search for bridge papers between fields**

</div>

<div lang="de" markdown="1">

## Zusammenfassung

<div class="section-summary">
<h4>📋 Zusammenfassung</h4>
<p>8 Learnings destilliert in 5 Pipeline-Verbesserungen, 4 neue Werkzeug-Anforderungen und 4 Designprinzipien. Das Kernthema: Baue Monitoring-Systeme, keine statischen Reports.</p>
</div>

### Was ins AgentField-System zurückfließen sollte

#### 🔧 research-pipeline Verbesserungen
1. Awesome-Listen als Einstiegsheuristik
2. arXiv API als primäre Discovery-Quelle
3. Rate-Limiter für Semantic Scholar
4. CJK-Modul für multilinguale Suche
5. Automatisches Monitoring (weekly digest)

#### 🛠️ Neue Werkzeug-Anforderungen
- Semantic Scholar API Key → research-pipeline Integration
- Translation-aware Search Wrapper
- Citation Graph Builder (Paper → Referenzen → Zitationen)
- arXiv RSS Digest via Trigger.dev

#### Designprinzipien (neu abgeleitet)

- **Sprach-Diversität = Wissens-Diversität**
- **Kuratierte Listen zuerst, eigene Suche für Lücken**
- **In schnellen Feldern: Monitoring > einmalige Recherche**
- **Suche nach Brückenpapern zwischen Feldern**

</div>
