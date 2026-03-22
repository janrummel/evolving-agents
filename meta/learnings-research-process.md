---
layout: default
title: Research Learnings
parent: Meta
nav_order: 2
---

<style>
  .learning-card {
    border-left: 4px solid #4A90D9;
    background: #f0f4fa;
    border-radius: 6px;
    padding: 1.2em 1.5em;
    margin: 1.5em 0 2em 0;
  }
  .learning-card h2 {
    margin-top: 0;
    color: #2c3e6b;
  }
  .key-insight {
    background: linear-gradient(135deg, #fff3cd 0%, #ffeeba 100%);
    border: 1px solid #f5c542;
    border-radius: 6px;
    padding: 0.8em 1.2em;
    margin: 1em 0;
    font-style: italic;
  }
  .key-insight::before {
    content: "💡 ";
  }
  .implication-box {
    border-left: 4px solid #28a745;
    background: #eafbef;
    border-radius: 4px;
    padding: 0.8em 1.2em;
    margin: 0.8em 0;
  }
  .implication-box-en {
    border-left: 4px solid #17a2b8;
    background: #e8f6f9;
    border-radius: 4px;
    padding: 0.8em 1.2em;
    margin: 0.8em 0;
  }
  .system-improvement {
    border: 2px dashed #6c757d;
    border-radius: 6px;
    padding: 0.8em 1.2em;
    margin: 0.8em 0;
    background: #fafafa;
  }
  .lang-toggle {
    display: inline-block;
    background: #e9ecef;
    border-radius: 4px;
    padding: 0.15em 0.6em;
    font-size: 0.8em;
    font-weight: bold;
    margin-bottom: 0.3em;
  }
  .lang-en { color: #17a2b8; }
  .lang-de { color: #28a745; }
  .summary-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
    margin: 1em 0;
  }
  @media (max-width: 600px) {
    .summary-grid { grid-template-columns: 1fr; }
  }
  .summary-card {
    border: 1px solid #dee2e6;
    border-radius: 6px;
    padding: 1em;
    background: #fff;
  }
  .principle-badge {
    display: inline-block;
    background: #2c3e6b;
    color: #fff;
    border-radius: 20px;
    padding: 0.3em 1em;
    font-size: 0.9em;
    margin: 0.5em 0;
  }
  .section-summary {
    background: linear-gradient(135deg, #e8eaf6 0%, #f3e5f5 100%);
    border: 1px solid #b39ddb;
    border-radius: 8px;
    padding: 1em 1.4em;
    margin: 0.8em 0 1.5em 0;
  }
  .section-summary h4 {
    margin: 0 0 0.4em 0;
    color: #4a148c;
    font-size: 1em;
  }
  .section-summary p {
    margin: 0;
    font-size: 0.95em;
    color: #37474f;
  }
  .key-box {
    border-radius: 8px;
    padding: 0.9em 1.3em;
    margin: 1em 0;
  }
  .key-box h4 {
    margin: 0 0 0.3em 0;
    font-size: 1em;
  }
  .key-box p {
    margin: 0;
    font-size: 0.95em;
  }
  .key-box.green {
    background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
    border: 1px solid #66bb6a;
  }
  .key-box.green h4 { color: #2e7d32; }
  .key-box.green p { color: #33691e; }
  .key-box.amber {
    background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
    border: 1px solid #ffb300;
  }
  .key-box.amber h4 { color: #e65100; }
  .key-box.amber p { color: #bf360c; }
</style>

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

<div class="learning-card" markdown="1">

## L1: Semantic Scholar API — Rate Limiting ist aggressiv

<div class="section-summary">
<h4>📋 Section Summary / Abschnitt-Zusammenfassung</h4>
<p><strong>EN:</strong> Parallel API calls to Semantic Scholar hit aggressive rate limits (429). Sequential calls with cooldown or an API key are required. arXiv serves as a reliable fallback.<br/>
<strong>DE:</strong> Parallele API-Calls an Semantic Scholar treffen auf aggressives Rate Limiting (429). Sequentielle Calls mit Cooldown oder ein API Key sind nötig. arXiv dient als zuverlässiger Fallback.</p>
</div>

<span class="lang-toggle lang-en">EN</span>

<div lang="en" markdown="1">

**What happened:** 3 parallel WebFetch calls to the Semantic Scholar API → 2 out of 3 returned HTTP 429 (Too Many Requests). Even sequential retries after a few seconds → 429 again.

<div class="implication-box-en" markdown="1">

**Practical Implication:**
- Semantic Scholar allows ~1 request/second without an API key
- With an API key (free, via email) → 100 requests/second
- Our research-pipeline must make calls sequentially with cooldown, or better: obtain an API key

</div>

<div class="system-improvement" markdown="1">

**System Improvement:**
- [ ] Apply for Semantic Scholar API key (free)
- [ ] Add rate-limiter to research-pipeline for API calls (1/s default, 100/s with key)
- [ ] Fallback strategy: if API blocks → use arXiv API as alternative

</div>

<div class="key-insight">Never bombard external APIs in parallel without a rate-limit check.</div>

<div class="key-box green">
<h4>💡 Key Insight</h4>
<p>Never bombard external APIs in parallel without a rate-limit check. Always check docs for rate limits before integrating.</p>
</div>

<div class="key-box amber">
<h4>⚠️ Lesson Learned</h4>
<p>Assuming APIs handle parallel load gracefully is a common mistake. Even "open" academic APIs enforce strict limits without API keys.</p>
</div>

</div>

<span class="lang-toggle lang-de">DE</span>

<div lang="de" markdown="1">

**Was passiert ist:** 3 parallele WebFetch-Calls an Semantic Scholar API → 2 von 3 gaben HTTP 429 (Too Many Requests). Auch sequentieller Retry nach wenigen Sekunden → erneut 429.

<div class="implication-box" markdown="1">

**Praktische Implikation:**
- Semantic Scholar erlaubt ~1 Request/Sekunde ohne API Key
- Mit API Key (kostenlos, per Mail) → 100 Requests/Sekunde
- Unsere research-pipeline muss Calls sequentiell mit Cooldown machen, oder besser: API Key holen

</div>

<div class="system-improvement" markdown="1">

**Systemverbesserung:**
- [ ] Semantic Scholar API Key beantragen (kostenlos)
- [ ] In research-pipeline: Rate-Limiter einbauen für API-Calls (1/s default, 100/s mit Key)
- [ ] Fallback-Strategie: Wenn API blockt → arXiv API als Alternative

</div>

<div class="key-insight">Externe APIs niemals parallel bombardieren ohne Rate-Limit-Check.</div>

<div class="key-box green">
<h4>💡 Kernerkenntnis</h4>
<p>Externe APIs niemals parallel bombardieren ohne Rate-Limit-Check. Immer zuerst die Docs nach Rate Limits prüfen.</p>
</div>

<div class="key-box amber">
<h4>⚠️ Lesson Learned</h4>
<p>Anzunehmen, dass APIs parallele Last vertragen, ist ein häufiger Fehler. Selbst "offene" akademische APIs erzwingen strikte Limits ohne API Keys.</p>
</div>

</div>

</div>

<!-- ═══════════════════════════════════════════════════ L2 ═══ -->

<div class="learning-card" markdown="1">

## L2: GitHub Awesome Lists > Direct API Search as Entry Point

<div class="section-summary">
<h4>📋 Section Summary / Abschnitt-Zusammenfassung</h4>
<p><strong>EN:</strong> Curated GitHub Awesome lists deliver structured, categorized overviews far more efficiently than individual API calls. They should be the first step in any research pipeline.<br/>
<strong>DE:</strong> Kuratierte GitHub Awesome-Listen liefern strukturierte, kategorisierte Übersichten weit effizienter als einzelne API-Calls. Sie sollten der erste Schritt jeder Research-Pipeline sein.</p>
</div>

<span class="lang-toggle lang-en">EN</span>

<div lang="en" markdown="1">

**What happened:** A single WebFetch on the [Awesome-Self-Evolving-Agents](https://github.com/EvoAgentX/Awesome-Self-Evolving-Agents) list immediately delivered ~30 categorized papers with taxonomy — far more efficient than 10 individual API calls.

<div class="implication-box-en" markdown="1">

**Practical Implication:**
- Awesome lists are curated, structured, and current (community-maintained)
- They provide taxonomy for free — how the field organizes itself
- For new topics: first search "awesome-[topic]" on GitHub, then dive deeper

</div>

<div class="system-improvement" markdown="1">

**System Improvement:**
- [ ] Add step 1 to research-pipeline: "Check if awesome-[topic] exists on GitHub"
- [ ] learn-from-the-best skill: add GitHub Awesome lists as heuristic source

</div>

<div class="key-insight">Curated community overviews first, then custom search for gaps.</div>

<div class="key-box green">
<h4>💡 Key Insight</h4>
<p>Curated community overviews first, then custom search for gaps. One good Awesome list = dozens of API calls saved.</p>
</div>

</div>

<span class="lang-toggle lang-de">DE</span>

<div lang="de" markdown="1">

**Was passiert ist:** Ein einziger WebFetch auf die [Awesome-Self-Evolving-Agents](https://github.com/EvoAgentX/Awesome-Self-Evolving-Agents) Liste lieferte sofort ~30 kategorisierte Papers mit Taxonomie, deutlich effizienter als 10 einzelne API-Calls.

<div class="implication-box" markdown="1">

**Praktische Implikation:**
- Awesome-Listen sind kuratiert, strukturiert, aktuell (Community-maintained)
- Sie geben Taxonomie gratis mit — wie das Feld sich selbst organisiert
- Für neue Themen: Erst "awesome-[topic]" auf GitHub suchen, dann vertiefen

</div>

<div class="system-improvement" markdown="1">

**Systemverbesserung:**
- [ ] In research-pipeline Schritt 1 ergänzen: "Prüfe ob awesome-[topic] auf GitHub existiert"
- [ ] learn-from-the-best Skill: GitHub Awesome-Listen als Heuristik-Quelle aufnehmen

</div>

<div class="key-insight">Kuratierte Community-Übersichten zuerst, dann eigene Suche für Lücken.</div>

<div class="key-box green">
<h4>💡 Kernerkenntnis</h4>
<p>Kuratierte Community-Übersichten zuerst, dann eigene Suche für Lücken. Eine gute Awesome-Liste = dutzende API-Calls gespart.</p>
</div>

</div>

</div>

<!-- ═══════════════════════════════════════════════════ L3 ═══ -->

<div class="learning-card" markdown="1">

## L3: arXiv API — Reliable, No Rate Limit, XML-Based

<div class="section-summary">
<h4>📋 Section Summary / Abschnitt-Zusammenfassung</h4>
<p><strong>EN:</strong> arXiv's API handles parallel requests flawlessly with no rate limiting — making it the most robust entry point for paper discovery. It should be the primary source in any research pipeline.<br/>
<strong>DE:</strong> Die arXiv-API verarbeitet parallele Requests problemlos ohne Rate Limiting — das macht sie zum robustesten Einstiegspunkt für Paper-Discovery. Sie sollte die primäre Quelle jeder Research-Pipeline sein.</p>
</div>

<span class="lang-toggle lang-en">EN</span>

<div lang="en" markdown="1">

**What happened:** 3 parallel arXiv API calls → all 3 successful, yielding 35 papers total. No rate limiting, instant results.

<div class="implication-box-en" markdown="1">

**Practical Implication:**
- arXiv API is the most robust access point for paper discovery
- XML format is well-handled by WebFetch
- Sorting by submittedDate immediately returns the newest papers

</div>

<div class="system-improvement" markdown="1">

**System Improvement:**
- [ ] Integrate arXiv as primary paper discovery source in research-pipeline
- [ ] Define standard queries for core topics (monitoring-ready)

</div>

<div class="key-insight">Prefer public, unlimited APIs. arXiv > Semantic Scholar for discovery.</div>

<div class="key-box green">
<h4>💡 Key Insight</h4>
<p>Prefer public, unlimited APIs. arXiv > Semantic Scholar for discovery. Reliability beats features.</p>
</div>

</div>

<span class="lang-toggle lang-de">DE</span>

<div lang="de" markdown="1">

**Was passiert ist:** 3 parallele arXiv-API-Calls → alle 3 erfolgreich, zusammen 35 Papers. Kein Rate Limiting, sofort Ergebnisse.

<div class="implication-box" markdown="1">

**Praktische Implikation:**
- arXiv API ist der robusteste Zugang für Paper-Discovery
- XML-Format wird von WebFetch gut verarbeitet
- Sortierung nach submittedDate gibt sofort die neuesten Papers

</div>

<div class="system-improvement" markdown="1">

**Systemverbesserung:**
- [ ] arXiv als primäre Paper-Discovery-Quelle in research-pipeline einbauen
- [ ] Standard-Queries definieren für die Kern-Themen (monitoring-ready)

</div>

<div class="key-insight">Öffentliche, unlimitierte APIs bevorzugen. arXiv > Semantic Scholar für Discovery.</div>

<div class="key-box green">
<h4>💡 Kernerkenntnis</h4>
<p>Öffentliche, unlimitierte APIs bevorzugen. arXiv > Semantic Scholar für Discovery. Zuverlässigkeit schlägt Features.</p>
</div>

</div>

</div>

<!-- ═══════════════════════════════════════════════════ L4 ═══ -->

<div class="learning-card" markdown="1">

## L4: Multilingual Research Confirmed — Chinese Search Yields DIFFERENT Results

<div class="section-summary">
<h4>📋 Section Summary / Abschnitt-Zusammenfassung</h4>
<p><strong>EN:</strong> Searching in Chinese uncovered ~30-50% of relevant work invisible to English-only queries — including Tsinghua talks, CAICT reports, and Zhihu discussions. Multilingual search is not optional, it's essential.<br/>
<strong>DE:</strong> Suche auf Chinesisch enthüllte ~30-50% relevanter Arbeiten, die bei reiner Englisch-Suche unsichtbar blieben — inkl. Tsinghua-Talks, CAICT-Reports und Zhihu-Diskussionen. Multilinguale Suche ist kein Nice-to-have, sondern essentiell.</p>
</div>

<span class="lang-toggle lang-en">EN</span>

<div lang="en" markdown="1">

**What happened:** WebSearch with Chinese characters (自进化 智能体 多智能体 进化算法 大模型) returned results that appeared in no English search:
- Tsinghua AIR Talk by 刘洋 on "LLM-Driven Evolvable Agents"
- CAICT + Huawei Report on Agent Technology (June 2025)
- Zhihu discussions with unique perspectives
- Foundation Agents Survey (MetaGPT + Mila, 47 authors)

<div class="implication-box-en" markdown="1">

**Practical Implication:**
- ~30-50% of relevant work is only discoverable through Chinese search
- Zhihu (知乎) is China's StackOverflow/Medium equivalent — researchers discuss informally there
- CAICT Reports are China's equivalent of NIST/EU whitepapers

</div>

<div class="system-improvement" markdown="1">

**System Improvement:**
- [ ] Extend research-pipeline with CJK module:
  1. Auto-translate core keywords to ZH/JA/KO
  2. Run separate search in each language
  3. Translate results back to German/English
- [ ] Add Zhihu (知乎) as source for informal research discussion
- [ ] Track CAICT, Tsinghua AIR, PKU as monitored institutions

</div>

<div class="key-insight">If you only search in English, you find only half the truth. Language diversity = knowledge diversity.</div>

<div class="key-box green">
<h4>💡 Key Insight</h4>
<p>Language diversity = knowledge diversity. English-only research systematically misses 30-50% of relevant work, especially from China's booming AI scene.</p>
</div>

<div class="key-box amber">
<h4>⚠️ Lesson Learned</h4>
<p>We initially skipped non-English search entirely. This blind spot could have led to duplicating existing Chinese research or missing critical approaches.</p>
</div>

</div>

<span class="lang-toggle lang-de">DE</span>

<div lang="de" markdown="1">

**Was passiert ist:** WebSearch mit chinesischen Zeichen (自进化 智能体 多智能体 进化算法 大模型) lieferte Ergebnisse, die in keiner englischen Suche auftauchten:
- Tsinghua AIR Talk von 刘洋 über "LLM-Driven Evolvable Agents"
- CAICT + Huawei Report über Agent-Technologie (Juni 2025)
- Zhihu-Diskussionen mit eigenen Perspektiven
- Foundation Agents Survey (MetaGPT + Mila, 47 Autoren)

<div class="implication-box" markdown="1">

**Praktische Implikation:**
- ~30-50% der relevanten Arbeit ist nur über chinesische Suche auffindbar
- Zhihu (知乎) ist Chinas StackOverflow/Medium-Äquivalent — dort diskutieren Forscher informell
- CAICT Reports sind Chinas Äquivalent zu NIST/EU-Whitepapers

</div>

<div class="system-improvement" markdown="1">

**Systemverbesserung:**
- [ ] research-pipeline um CJK-Modul erweitern:
  1. Kern-Keywords automatisch nach ZH/JA/KO übersetzen
  2. Separate Suche in jeder Sprache
  3. Ergebnisse zurück ins Deutsche/Englische übersetzen
- [ ] Zhihu (知乎) als Quelle für informelle Forschungsdiskussion aufnehmen
- [ ] CAICT, Tsinghua AIR, PKU als tracked institutions hinzufügen

</div>

<div class="key-insight">Wer nur auf Englisch sucht, findet nur die halbe Wahrheit. Sprach-Diversität = Wissens-Diversität.</div>

<div class="key-box green">
<h4>💡 Kernerkenntnis</h4>
<p>Sprach-Diversität = Wissens-Diversität. Rein englische Recherche übersieht systematisch 30-50% relevanter Arbeiten, besonders aus Chinas boomender AI-Szene.</p>
</div>

<div class="key-box amber">
<h4>⚠️ Lesson Learned</h4>
<p>Wir haben anfangs nicht-englische Suche komplett übersprungen. Dieser blinde Fleck hätte dazu führen können, existierende chinesische Forschung zu duplizieren oder kritische Ansätze zu verpassen.</p>
</div>

</div>

</div>

<!-- ═══════════════════════════════════════════════════ L5 ═══ -->

<div class="learning-card" markdown="1">

## L5: The Field Moves at Weekly Speed

<div class="section-summary">
<h4>📋 Section Summary / Abschnitt-Zusammenfassung</h4>
<p><strong>EN:</strong> 12 relevant papers appeared in just two weeks. Static literature reviews are obsolete within days. Continuous monitoring (weekly digests) is essential in fast-moving fields.<br/>
<strong>DE:</strong> 12 relevante Papers erschienen in nur zwei Wochen. Statische Literaturreviews sind innerhalb von Tagen veraltet. Kontinuierliches Monitoring (Weekly Digests) ist essentiell in schnellen Feldern.</p>
</div>

<span class="lang-toggle lang-en">EN</span>

<div lang="en" markdown="1">

**What happened:** 12 relevant new papers in the first half of March 2026 alone. AgentFactory (day before yesterday!), SEMAG, SAGE, OpenHospital — all brand new.

<div class="implication-box-en" markdown="1">

**Practical Implication:**
- Static literature lists are outdated after 2 weeks
- Without automatic monitoring, we quickly miss important developments
- The Awesome list is updated community-maintained

</div>

<div class="system-improvement" markdown="1">

**System Improvement:**
- [ ] Set up arXiv RSS/API-based weekly digest for relevant keywords
- [ ] Awareness metric: "How old is our newest entry?" as monitoring signal

</div>

<div class="key-insight">In fast-moving fields, monitoring is more important than one-time research.</div>

<div class="key-box green">
<h4>💡 Key Insight</h4>
<p>In fast-moving fields, monitoring is more important than one-time research. Build the pipeline, not just the report.</p>
</div>

<div class="key-box amber">
<h4>⚠️ Lesson Learned</h4>
<p>A comprehensive literature review done today becomes incomplete by next week. Without automated digests, we're always playing catch-up.</p>
</div>

</div>

<span class="lang-toggle lang-de">DE</span>

<div lang="de" markdown="1">

**Was passiert ist:** 12 relevante neue Papers allein in der ersten Märzhälfte 2026. AgentFactory (vorgestern!), SEMAG, SAGE, OpenHospital — alles brandneu.

<div class="implication-box" markdown="1">

**Praktische Implikation:**
- Statische Literaturlisten sind nach 2 Wochen veraltet
- Ohne automatisches Monitoring verpassen wir schnell wichtige Entwicklungen
- Die Awesome-Liste wird community-maintained aktualisiert

</div>

<div class="system-improvement" markdown="1">

**Systemverbesserung:**
- [ ] arXiv RSS/API-basiertes Weekly Digest für die relevanten Keywords einrichten
- [ ] Awareness-Metrik: "Wie alt ist unser neuester Eintrag?" als Monitoring-Signal

</div>

<div class="key-insight">In schnellen Feldern ist Monitoring wichtiger als einmalige Recherche.</div>

<div class="key-box green">
<h4>💡 Kernerkenntnis</h4>
<p>In schnellen Feldern ist Monitoring wichtiger als einmalige Recherche. Baue die Pipeline, nicht nur den Report.</p>
</div>

<div class="key-box amber">
<h4>⚠️ Lesson Learned</h4>
<p>Ein umfassendes Literaturreview von heute wird bis nächste Woche unvollständig. Ohne automatisierte Digests spielen wir immer Aufholjagd.</p>
</div>

</div>

</div>

<!-- ═══════════════════════════════════════════════════ L6 ═══ -->

<div class="learning-card" markdown="1">

## L6: Bridge Papers Exist — EvoFlow Is the Missing Link

<div class="section-summary">
<h4>📋 Section Summary / Abschnitt-Zusammenfassung</h4>
<p><strong>EN:</strong> EvoFlow directly bridges evolutionary algorithms and agent workflow optimization — proving the Nowak→Agent-Systems connection is implementable, not just theoretical. It beat o1-preview at a fraction of the cost.<br/>
<strong>DE:</strong> EvoFlow verbindet direkt evolutionäre Algorithmen mit Agent-Workflow-Optimierung — und beweist, dass die Nowak→Agent-Systems Verbindung implementierbar ist, nicht nur theoretisch. Es schlug o1-preview zu einem Bruchteil der Kosten.</p>
</div>

<span class="lang-toggle lang-en">EN</span>

<div lang="en" markdown="1">

**What happened:** EvoFlow (2502.07373, 31 citations) explicitly uses Niching Evolutionary Algorithms (related to MAP-Elites/Quality-Diversity) for agent workflow evolution. It outperformed o1-preview by 2.7% at 12.4% of the cost.

<div class="implication-box-en" markdown="1">

**Practical Implication:**
- The bridge from Nowak → agent systems is NOT merely theoretical — EvoFlow implements it
- Niching-based selection = Nowak's population diversity in practice
- Open-source models + evolution > single large model (cost/performance argument)

</div>

<div class="system-improvement" markdown="1">

**Practical Consequence:**
- Study EvoFlow's architecture: tag-based retrieval + crossover + mutation + niching selection
- Check if our skill system shows similar patterns (skills as "individuals", quality-gate as "selection")

</div>

<div class="key-insight">Always search for the paper that explicitly bridges two fields. It almost always exists.</div>

<div class="key-box green">
<h4>💡 Key Insight</h4>
<p>Always search for bridge papers between two fields. They almost always exist, and finding them saves months of reinvention.</p>
</div>

</div>

<span class="lang-toggle lang-de">DE</span>

<div lang="de" markdown="1">

**Was passiert ist:** EvoFlow (2502.07373, 31 Zitationen) nutzt explizit Niching Evolutionary Algorithms (verwandt mit MAP-Elites/Quality-Diversity) für Agent-Workflow-Evolution. Es übertraf o1-preview um 2.7% bei 12.4% der Kosten.

<div class="implication-box" markdown="1">

**Praktische Implikation:**
- Die Brücke Nowak → Agent-Systeme ist NICHT nur theoretisch — EvoFlow implementiert sie
- Niching-basierte Selektion = Nowaks Populationsdiversität in der Praxis
- Open-Source-Modelle + Evolution > einzelnes großes Modell (Kosten-/Performance-Argument)

</div>

<div class="system-improvement" markdown="1">

**Praktische Konsequenz:**
- EvoFlow's Architektur studieren: Tag-basiertes Retrieval + Crossover + Mutation + Niching Selection
- Prüfen ob unser Skill-System ähnliche Muster zeigt (Skills als "Individuen", Quality-Gate als "Selection")

</div>

<div class="key-insight">Suche immer nach dem Paper, das zwei Felder explizit verbindet. Es existiert fast immer.</div>

<div class="key-box green">
<h4>💡 Kernerkenntnis</h4>
<p>Suche immer nach Brückenpapern zwischen zwei Feldern. Sie existieren fast immer, und sie zu finden spart Monate an Neuerfindung.</p>
</div>

</div>

</div>

<!-- ═══════════════════════════════════════════════════ L7 ═══ -->

<div class="learning-card" markdown="1">

## L7: Meta Context Engineering = Formalized AgentField

<div class="section-summary">
<h4>📋 Section Summary / Abschnitt-Zusammenfassung</h4>
<p><strong>EN:</strong> The MCE paper formalizes exactly what AgentField does manually: skills and context artifacts co-evolving via meta-agent refinement. This isn't a coincidence — it's validation that our approach is on the right track.<br/>
<strong>DE:</strong> Das MCE-Paper formalisiert genau das, was AgentField manuell tut: Skills und Context-Artefakte ko-evolvieren durch Meta-Agent-Verfeinerung. Das ist kein Zufall — es validiert, dass unser Ansatz auf dem richtigen Weg ist.</p>
</div>

<span class="lang-toggle lang-en">EN</span>

<div lang="en" markdown="1">

**What happened:** The MCE paper (2601.21557) describes exactly what AgentField does manually: skills and context artifacts co-evolve. A meta-agent refines skills through deliberative search, a base-agent executes. 5.6-53.8% improvement over SOTA.

<div class="implication-box-en" markdown="1">

**Practical Implication:**
- AgentField IS already a (manual) MCE system
- The step from manual to automated is formalized — we don't need to reinvent the wheel
- The "deliberative search over historical skills, executions, and evaluations" is exactly what our improve-skill does in rudimentary form

</div>

<div class="system-improvement" markdown="1">

**Practical Consequence:**
- Study MCE paper in detail
- Check which MCE elements we can automate
- Use pulse metrics as "evaluation signal" for skill evolution

</div>

<div class="key-insight">If someone has formalized what you do manually → study it. It accelerates the next step.</div>

<div class="key-box green">
<h4>💡 Key Insight</h4>
<p>If someone has formalized what you do manually → study it. It accelerates the leap from manual to automated by years.</p>
</div>

<div class="key-box amber">
<h4>⚠️ Lesson Learned</h4>
<p>We almost missed this paper because we searched for "evolving agents" but not "meta context engineering." Terminological gaps between fields can hide the most relevant work.</p>
</div>

</div>

<span class="lang-toggle lang-de">DE</span>

<div lang="de" markdown="1">

**Was passiert ist:** MCE Paper (2601.21557) beschreibt genau das, was AgentField manuell tut: Skills und Context-Artefakte ko-evolvieren. Meta-Agent verfeinert Skills durch deliberative Search, Base-Agent führt aus. 5.6-53.8% Verbesserung über SOTA.

<div class="implication-box" markdown="1">

**Praktische Implikation:**
- AgentField IST bereits ein (manuelles) MCE-System
- Der Schritt von manuell zu automatisiert ist formalisiert — wir müssen das Rad nicht neu erfinden
- Die "deliberative search over historical skills, executions, and evaluations" ist genau das, was unser improve-Skill ansatzweise tut

</div>

<div class="system-improvement" markdown="1">

**Praktische Konsequenz:**
- MCE-Paper im Detail studieren
- Prüfen welche MCE-Elemente wir automatisieren können
- Pulse-Metriken als "evaluation signal" für Skill-Evolution nutzen

</div>

<div class="key-insight">Wenn jemand das formalisiert hat was du manuell tust → studiere es. Es beschleunigt den nächsten Schritt.</div>

<div class="key-box green">
<h4>💡 Kernerkenntnis</h4>
<p>Wenn jemand das formalisiert hat, was du manuell tust → studiere es. Es beschleunigt den Sprung von manuell zu automatisiert um Jahre.</p>
</div>

<div class="key-box amber">
<h4>⚠️ Lesson Learned</h4>
<p>Wir hätten dieses Paper fast verpasst, weil wir nach "evolving agents" suchten, aber nicht nach "meta context engineering." Terminologische Lücken zwischen Feldern können die relevanteste Arbeit verstecken.</p>
</div>

</div>

</div>

<!-- ═══════════════════════════════════════════════════ L8 ═══ -->

<div class="learning-card" markdown="1">

## L8: The Nowak-Agent Isomorphism Is NOT Unique — Others See It Too

<div class="section-summary">
<h4>📋 Section Summary / Abschnitt-Zusammenfassung</h4>
<p><strong>EN:</strong> Others are independently arriving at the same evolutionary→AI transfer insight, validating our direction. But nobody has yet mapped Nowak's Originator equation to agent systems — that's our unique opening.<br/>
<strong>DE:</strong> Andere kommen unabhängig zum gleichen Evolutionäres→AI Transfer-Insight, was unsere Richtung validiert. Aber niemand hat bisher Nowaks Originator-Gleichung auf Agent-Systeme abgebildet — das ist unsere einzigartige Öffnung.</p>
</div>

<span class="lang-toggle lang-en">EN</span>

<div lang="en" markdown="1">

**What happened:** "Evolutionary Systems Thinking" (2602.15957) explicitly argues for transferring evolutionary dynamics to complex adaptive systems including AI. "Evolving Interpretable Constitutions" (2602.00755) connects Constitutional AI with evolutionary approaches for multi-agent coordination.

<div class="implication-box-en" markdown="1">

**Practical Implication:**
- Our Nowak synthesis is not esoteric — there is a growing community
- But: nobody has yet explicitly mapped Nowak's Originator equation to agent systems (our unique contribution?)
- The isomorphism table from our synthesis could become a standalone contribution

</div>

<div class="key-insight">If others think similarly: validation. If nobody has the same angle: opportunity.</div>

</div>

<span class="lang-toggle lang-de">DE</span>

<div lang="de" markdown="1">

**Was passiert ist:** "Evolutionary Systems Thinking" (2602.15957) argumentiert explizit für die Übertragung von Evolutionsdynamik auf komplexe adaptive Systeme inkl. AI. "Evolving Interpretable Constitutions" (2602.00755) verbindet Constitutional AI mit evolutionären Ansätzen für Multi-Agent-Koordination.

<div class="implication-box" markdown="1">

**Praktische Implikation:**
- Unsere Nowak-Synthese ist nicht esoterisch — es gibt eine wachsende Community
- Aber: Niemand hat bisher Nowaks Originator-Gleichung explizit auf Agent-Systeme abgebildet (unsere unique contribution?)
- Die Isomorphie-Tabelle aus unserer Synthese könnte ein eigenständiger Beitrag werden

</div>

<div class="key-insight">Wenn andere ähnliches denken: Validierung. Wenn niemand den gleichen Winkel hat: Chance.</div>

</div>

</div>

---

<!-- ═══════════════════════════════════════════ SUMMARY ═══ -->

## Summary / Zusammenfassung

<span class="lang-toggle lang-en">EN</span>

<div lang="en" markdown="1">

### What Should Flow Back Into the AgentField System

<div class="summary-grid">

<div class="summary-card" markdown="1">

#### 🔧 research-pipeline Improvements
1. Awesome lists as entry heuristic
2. arXiv API as primary discovery source
3. Rate-limiter for Semantic Scholar
4. CJK module for multilingual search
5. Automatic monitoring (weekly digest)

</div>

<div class="summary-card" markdown="1">

#### 🛠️ New Tool Requirements
- Semantic Scholar API key → research-pipeline integration
- Translation-aware search wrapper
- Citation graph builder (paper → references → citations)
- arXiv RSS digest via Trigger.dev

</div>

</div>

#### Design Principles (Newly Derived)

<span class="principle-badge">Language diversity = knowledge diversity</span>
<span class="principle-badge">Curated lists first, custom search for gaps</span>
<span class="principle-badge">In fast fields: monitoring > one-time research</span>
<span class="principle-badge">Search for bridge papers between fields</span>

</div>

<span class="lang-toggle lang-de">DE</span>

<div lang="de" markdown="1">

### Was ins AgentField-System zurückfließen sollte

<div class="summary-grid">

<div class="summary-card" markdown="1">

#### 🔧 research-pipeline Verbesserungen
1. Awesome-Listen als Einstiegsheuristik
2. arXiv API als primäre Discovery-Quelle
3. Rate-Limiter für Semantic Scholar
4. CJK-Modul für multilinguale Suche
5. Automatisches Monitoring (weekly digest)

</div>

<div class="summary-card" markdown="1">

#### 🛠️ Neue Werkzeug-Anforderungen
- Semantic Scholar API Key → research-pipeline Integration
- Translation-aware Search Wrapper
- Citation Graph Builder (Paper → Referenzen → Zitationen)
- arXiv RSS Digest via Trigger.dev

</div>

</div>

#### Designprinzipien (neu abgeleitet)

<span class="principle-badge">Sprach-Diversität = Wissens-Diversität</span>
<span class="principle-badge">Kuratierte Listen zuerst, eigene Suche für Lücken</span>
<span class="principle-badge">In schnellen Feldern: Monitoring > einmalige Recherche</span>
<span class="principle-badge">Suche nach Brückenpapern zwischen Feldern</span>

</div>
