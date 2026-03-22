---
layout: default
title: Research Toolkit Audit
parent: Meta
nav_order: 1
---

# Research Toolkit Audit

<div lang="en" markdown="1">

What we have, what we're missing, and what we need to build for serious cross-disciplinary research on evolving agent systems.

**Last updated:** 2026-03-19

</div>

<div lang="de" markdown="1">

Was wir haben, was uns fehlt und was wir für seriöse interdisziplinäre Forschung zu Evolving Agent Systems aufbauen müssen.

**Zuletzt aktualisiert:** 2026-03-19

</div>

---

## What We Have / Was wir haben

### Search & Discovery

<div lang="en" markdown="1">

| Tool | Capability | Strength | Limitation |
|------|-----------|----------|------------|
| **WebSearch** | General web search | Broad, real-time | No deep academic search, English-biased |
| **WebFetch** | Fetch web pages | Direct access to URLs | No batch processing, no PDF extraction |
| **research-pipeline** | Structured multi-source research | Routes by topic, saves to Knowledge DB | Limited to approved sources, no arXiv API |
| **learn-from-the-best** | Find top sources, people, learning paths | Mondon method — "someone has done this" | English-only, no citation graph |
| **knowledge-check** | Cross-vault search (5 layers) | Fast, comprehensive for stored knowledge | Only searches what we've already captured |

</div>

<div lang="de" markdown="1">

| Tool | Fähigkeit | Stärke | Einschränkung |
|------|-----------|--------|---------------|
| **WebSearch** | Allgemeine Websuche | Breit, Echtzeit | Keine tiefe akademische Suche, English-biased |
| **WebFetch** | Webseiten abrufen | Direkter Zugriff auf URLs | Kein Batch-Processing, keine PDF-Extraktion |
| **research-pipeline** | Strukturierte Multi-Source-Recherche | Routet nach Thema, speichert in Knowledge DB | Nur genehmigte Quellen, kein arXiv API |
| **learn-from-the-best** | Top-Quellen, Personen, Lernpfade finden | Mondon-Methode — „jemand hat das schon gemacht" | Nur Englisch, kein Citation Graph |
| **knowledge-check** | Cross-Vault-Suche (5 Layer) | Schnell, umfassend für gespeichertes Wissen | Durchsucht nur bereits Erfasstes |

</div>

### Analysis & Synthesis

<div lang="en" markdown="1">

| Tool | Capability | When to Use |
|------|-----------|-------------|
| **analyze** | ReAct cycle investigation | Multi-step structured analysis |
| **synthesize** | Cross-source pattern finding | Connecting insights from different domains |
| **distill** | Progressive summarization (4 layers) | Condensing long papers/documents |
| **signal-check** | Quality/substance check | Evaluating claims, separating signal from noise |
| **challenge** | Adversarial stress-testing | Pressure-testing our own conclusions |
| **briefing** | Topic overview from vault | "What do we know about X?" |

</div>

<div lang="de" markdown="1">

| Tool | Fähigkeit | Einsatzzweck |
|------|-----------|-------------|
| **analyze** | ReAct-Zyklus-Untersuchung | Mehrstufige strukturierte Analyse |
| **synthesize** | Quellübergreifende Mustererkennung | Erkenntnisse aus verschiedenen Domänen verbinden |
| **distill** | Progressive Summarization (4 Layer) | Lange Papers/Dokumente verdichten |
| **signal-check** | Qualitäts-/Substanzprüfung | Claims bewerten, Signal vom Rauschen trennen |
| **challenge** | Adversarial Stress-Testing | Eigene Schlussfolgerungen unter Druck testen |
| **briefing** | Themenüberblick aus dem Vault | „Was wissen wir über X?" |

</div>

### Knowledge Storage

<div lang="en" markdown="1">

| Tool | What It Stores | Access |
|------|---------------|--------|
| **Obsidian Vaults** (5x) | Structured notes, concepts, links | MCP servers per vault |
| **Knowledge DB** (SQLite) | Structured data, CSV imports | SQL queries |
| **Episodic Memory** | Conversation history, decisions | Semantic search |
| **Memory System** | Cross-session user/project/feedback context | File-based, indexed |

</div>

<div lang="de" markdown="1">

| Tool | Was es speichert | Zugriff |
|------|-----------------|---------|
| **Obsidian Vaults** (5x) | Strukturierte Notizen, Konzepte, Links | MCP-Server pro Vault |
| **Knowledge DB** (SQLite) | Strukturierte Daten, CSV-Importe | SQL Queries |
| **Episodic Memory** | Gesprächsverläufe, Entscheidungen | Semantische Suche |
| **Memory System** | Session-übergreifender User-/Projekt-/Feedback-Kontext | Dateibasiert, indiziert |

</div>

### Approved External Sources

<div lang="en" markdown="1">

PubMed, bioRxiv, ChEMBL, ClinicalTrials.gov, Open Targets (ToS-Audit 2026-03-13)

</div>

<div lang="de" markdown="1">

PubMed, bioRxiv, ChEMBL, ClinicalTrials.gov, Open Targets (ToS-Audit vom 13.03.2026)

</div>

---

## Blind Spots — What's Missing / Blinde Flecken — Was fehlt

### 1. Multi-Lingual Research (CRITICAL)

<div lang="en" markdown="1">

**Problem:** Our entire research pipeline is English/German. This topic spans communities that publish heavily in Chinese, Japanese, and Korean.

**What we're missing:**
- **Chinese AI research** — CNKI (中国知网), Wanfang Data, Baidu Scholar, WeChat/Zhihu technical articles. China has massive output on multi-agent systems and evolutionary computation.
- **Japanese research** — CiNii, J-STAGE. Japan has strong evolutionary computation and robotics communities.
- **Korean research** — RISS, KCI. Korean labs are active in LLM agent research.
- **Translation pipeline** — No systematic way to search in one language and synthesize in another.
- **Non-Latin script handling** — Our search tools don't handle CJK characters well.

**Impact:** We're likely missing 30-50% of relevant work, especially from Chinese labs (Tsinghua, PKU, BAAI, Alibaba DAMO, etc.) that publish in Chinese first.

**Possible solutions:**
- [ ] Add Semantic Scholar API (multilingual, covers Chinese conferences like AAAI-CN)
- [ ] Add Google Scholar integration (broader language coverage)
- [ ] Build a translation-aware search wrapper (search in EN → translate query to ZH/JA/KO → search again → translate results back)
- [ ] Evaluate DeepL API or similar for batch paper abstract translation
- [ ] Monitor Chinese preprint servers (ChinaXiv) and conference proceedings

</div>

<div lang="de" markdown="1">

**Problem:** Unsere gesamte Research-Pipeline ist Englisch/Deutsch. Das Thema umfasst Communities, die stark auf Chinesisch, Japanisch und Koreanisch publizieren.

**Was uns fehlt:**
- **Chinesische KI-Forschung** — CNKI (中国知网), Wanfang Data, Baidu Scholar, WeChat/Zhihu-Fachartikel. China hat massiven Output zu Multi-Agent Systems und Evolutionary Computation.
- **Japanische Forschung** — CiNii, J-STAGE. Japan hat starke Communities in Evolutionary Computation und Robotik.
- **Koreanische Forschung** — RISS, KCI. Koreanische Labs sind aktiv in der LLM-Agent-Forschung.
- **Translation Pipeline** — Kein systematischer Weg, in einer Sprache zu suchen und in einer anderen zu synthetisieren.
- **Non-Latin-Script-Handling** — Unsere Suchtools können CJK-Zeichen schlecht verarbeiten.

**Auswirkung:** Wir verpassen wahrscheinlich 30–50 % der relevanten Arbeiten, besonders von chinesischen Labs (Tsinghua, PKU, BAAI, Alibaba DAMO etc.), die zuerst auf Chinesisch publizieren.

**Mögliche Lösungen:**
- [ ] Semantic Scholar API hinzufügen (multilingual, deckt chinesische Konferenzen wie AAAI-CN ab)
- [ ] Google Scholar Integration (breitere Sprachabdeckung)
- [ ] Translation-aware Search Wrapper bauen (Suche auf EN → Query nach ZH/JA/KO übersetzen → erneut suchen → Ergebnisse zurückübersetzen)
- [ ] DeepL API o. ä. für Batch-Übersetzung von Paper-Abstracts evaluieren
- [ ] Chinesische Preprint-Server (ChinaXiv) und Konferenz-Proceedings monitoren

</div>

### 2. Academic Paper Infrastructure (HIGH)

<div lang="en" markdown="1">

**Problem:** No native integration with academic search systems. We rely on WebSearch to find papers, which is imprecise and misses citation context.

**What we're missing:**
- **Semantic Scholar API** — Citation graph traversal, related papers, author tracking, paper embeddings for similarity search
- **arXiv API** — Direct search, category filtering, new paper monitoring, bulk metadata access
- **Google Scholar** — Broader coverage including books, theses, patents
- **Citation graph traversal** — "Find all papers that cite Nowak 2008" or "Find papers cited by both Gao 2025 and Wang 2025"
- **PDF processing pipeline** — Bulk download, text extraction, summarization
- **BibTeX/reference management** — No structured bibliography, just markdown lists

**Impact:** We can find papers but can't systematically follow citation chains, track research fronts, or discover related work through structural (non-keyword) similarity.

**Possible solutions:**
- [ ] Semantic Scholar MCP server or API integration
- [ ] arXiv API wrapper (simple REST calls via WebFetch)
- [ ] Automated citation graph builder (start from our 20 known papers, expand outward)
- [ ] Zotero or similar for reference management

</div>

<div lang="de" markdown="1">

**Problem:** Keine native Integration mit akademischen Suchsystemen. Wir nutzen WebSearch zum Finden von Papers, was ungenau ist und Citation-Kontext verpasst.

**Was uns fehlt:**
- **Semantic Scholar API** — Citation Graph Traversal, verwandte Papers, Author Tracking, Paper Embeddings für Ähnlichkeitssuche
- **arXiv API** — Direkte Suche, Category Filtering, New-Paper-Monitoring, Bulk-Metadaten-Zugriff
- **Google Scholar** — Breitere Abdeckung inkl. Bücher, Dissertationen, Patente
- **Citation Graph Traversal** — „Finde alle Papers, die Nowak 2008 zitieren" oder „Finde Papers, die sowohl von Gao 2025 als auch Wang 2025 zitiert werden"
- **PDF Processing Pipeline** — Bulk-Download, Textextraktion, Zusammenfassung
- **BibTeX/Reference Management** — Keine strukturierte Bibliografie, nur Markdown-Listen

**Auswirkung:** Wir können Papers finden, aber nicht systematisch Citation Chains verfolgen, Research Fronts tracken oder verwandte Arbeiten über strukturelle (nicht keyword-basierte) Ähnlichkeit entdecken.

**Mögliche Lösungen:**
- [ ] Semantic Scholar MCP-Server oder API-Integration
- [ ] arXiv API Wrapper (einfache REST Calls via WebFetch)
- [ ] Automatisierter Citation Graph Builder (Start bei unseren 20 bekannten Papers, nach außen expandieren)
- [ ] Zotero o. ä. für Reference Management

</div>

### 3. Research Monitoring & Alerting (MEDIUM)

<div lang="en" markdown="1">

**Problem:** `research-monitor` skill exists but is manual. No automated tracking of new papers on our specific topics.

**What we're missing:**
- **Automated arXiv digests** for keywords: "self-evolving agents", "quality-diversity", "evolvable AI", "multi-agent collaboration"
- **Author tracking** — New papers from Nowak, Clune, Stanley, Lehman, Mouret
- **Conference tracking** — NeurIPS, ICML, GECCO, EMNLP, ACL accepted paper lists
- **RSS/Atom feeds** from key journals and preprint servers

**Impact:** We react instead of proactively tracking. New relevant work may sit for weeks before we notice it.

**Possible solutions:**
- [ ] arXiv RSS feeds + daily digest via Trigger.dev automation
- [ ] Semantic Scholar alerts API
- [ ] Manual weekly check schedule (low-tech but effective)

</div>

<div lang="de" markdown="1">

**Problem:** Der `research-monitor` Skill existiert, ist aber manuell. Kein automatisiertes Tracking neuer Papers zu unseren spezifischen Themen.

**Was uns fehlt:**
- **Automatisierte arXiv-Digests** für Keywords: "self-evolving agents", "quality-diversity", "evolvable AI", "multi-agent collaboration"
- **Author Tracking** — Neue Papers von Nowak, Clune, Stanley, Lehman, Mouret
- **Conference Tracking** — NeurIPS, ICML, GECCO, EMNLP, ACL Accepted-Paper-Listen
- **RSS/Atom Feeds** von wichtigen Journals und Preprint-Servern

**Auswirkung:** Wir reagieren statt proaktiv zu tracken. Neue relevante Arbeiten können wochenlang unbemerkt bleiben.

**Mögliche Lösungen:**
- [ ] arXiv RSS Feeds + Daily Digest via Trigger.dev-Automation
- [ ] Semantic Scholar Alerts API
- [ ] Manueller wöchentlicher Check-Plan (Low-Tech, aber effektiv)

</div>

### 4. Code & Reproducibility (MEDIUM)

<div lang="en" markdown="1">

**Problem:** Many papers we reference have open-source implementations we've never looked at.

**What we're missing:**
- **GitHub search** for paper implementations (PapersWithCode integration)
- **Ability to clone, read, and understand reference codebases** systematically
- **Experiment reproduction** — running MAP-Elites, EvoAgentX, or similar locally
- **Benchmarking infrastructure** — testing our own agent configs against published benchmarks

**Known open-source repos:**
- [ ] EvoAgentX (Wang et al.) — GitHub, Python
- [ ] MAP-Elites reference implementations — pyribs, QDax
- [ ] MultiAgentBench (Zhu et al.) — likely on GitHub

</div>

<div lang="de" markdown="1">

**Problem:** Viele Papers, die wir referenzieren, haben Open-Source-Implementierungen, die wir nie angeschaut haben.

**Was uns fehlt:**
- **GitHub-Suche** nach Paper-Implementierungen (PapersWithCode Integration)
- **Fähigkeit, Referenz-Codebases systematisch zu clonen, lesen und verstehen**
- **Experiment-Reproduktion** — MAP-Elites, EvoAgentX o. ä. lokal ausführen
- **Benchmarking-Infrastruktur** — eigene Agent-Konfigurationen gegen publizierte Benchmarks testen

**Bekannte Open-Source-Repos:**
- [ ] EvoAgentX (Wang et al.) — GitHub, Python
- [ ] MAP-Elites Referenz-Implementierungen — pyribs, QDax
- [ ] MultiAgentBench (Zhu et al.) — vermutlich auf GitHub

</div>

### 5. Community & Discourse (LOW)

<div lang="en" markdown="1">

**Problem:** We research papers but don't track the communities around them.

**What we're missing:**
- **Twitter/X academic discourse** — Many breakthroughs are discussed informally before formal publication
- **Reddit communities** — r/MachineLearning, r/reinforcementlearning
- **Conference workshops** — Often more cutting-edge than main proceedings
- **Lab websites & blogs** — Uber AI (now OpenAI), DeepMind, Anthropic research blogs

</div>

<div lang="de" markdown="1">

**Problem:** Wir recherchieren Papers, aber tracken nicht die Communities dahinter.

**Was uns fehlt:**
- **Twitter/X akademischer Diskurs** — Viele Durchbrüche werden informell diskutiert, bevor sie formal publiziert werden
- **Reddit Communities** — r/MachineLearning, r/reinforcementlearning
- **Conference Workshops** — Oft innovativer als die Hauptkonferenz-Proceedings
- **Lab-Websites & Blogs** — Uber AI (jetzt OpenAI), DeepMind, Anthropic Research Blogs

</div>

---

## Toolkit Priorities / Werkzeugkasten-Prioritäten

### Immediately Feasible (This Week) / Sofort machbar (diese Woche)

<div lang="en" markdown="1">

1. **Semantic Scholar via WebFetch** — REST API, no auth needed for basic queries, gives us citation graphs immediately
2. **arXiv via WebFetch** — Simple API, gives us search + metadata + PDF links
3. **Translation-aware search** — Use WebSearch with explicit Chinese/Japanese query terms for key topics

</div>

<div lang="de" markdown="1">

1. **Semantic Scholar via WebFetch** — REST API, keine Auth für Basis-Queries nötig, liefert sofort Citation Graphs
2. **arXiv via WebFetch** — Einfache API, liefert Suche + Metadaten + PDF-Links
3. **Translation-aware Search** — WebSearch mit expliziten chinesischen/japanischen Query-Begriffen für Kernthemen nutzen

</div>

### Short-Term (This Month) / Kurzfristig (diesen Monat)

<div lang="en" markdown="1">

4. **Semantic Scholar MCP server** — Structured tool for citation traversal
5. **arXiv monitoring** — Weekly automated search for new papers on our topics
6. **PapersWithCode** — Cross-reference our papers with available implementations

</div>

<div lang="de" markdown="1">

4. **Semantic Scholar MCP-Server** — Strukturiertes Tool für Citation Traversal
5. **arXiv-Monitoring** — Wöchentliche automatisierte Suche nach neuen Papers zu unseren Themen
6. **PapersWithCode** — Unsere Papers mit verfügbaren Implementierungen abgleichen

</div>

### Mid-Term (Q2 2026) / Mittelfristig (Q2 2026)

<div lang="en" markdown="1">

7. **Multi-lingual search wrapper** — Systematic CJK research pipeline
8. **Reference management** — BibTeX/Zotero integration
9. **Benchmark runner** — Local experiments with QD algorithms, agent evolution

</div>

<div lang="de" markdown="1">

7. **Multi-lingual Search Wrapper** — Systematische CJK-Research-Pipeline
8. **Reference Management** — BibTeX/Zotero-Integration
9. **Benchmark Runner** — Lokale Experimente mit QD-Algorithmen, Agent Evolution

</div>

---

## Next Action / Nächste Aktion

<div lang="en" markdown="1">

Start with Semantic Scholar + arXiv queries for our core papers to:
1. Build citation graph outward from Nowak 2008, Gao 2025, Wang 2025
2. Find papers we're missing (especially post-2024 work on self-evolving agents)
3. Identify Chinese/Japanese labs working on this intersection

</div>

<div lang="de" markdown="1">

Mit Semantic Scholar + arXiv Queries für unsere Kern-Papers starten, um:
1. Citation Graph ausgehend von Nowak 2008, Gao 2025, Wang 2025 aufzubauen
2. Papers zu finden, die wir verpassen (besonders Post-2024-Arbeiten zu Self-Evolving Agents)
3. Chinesische/japanische Labs identifizieren, die an dieser Schnittstelle arbeiten

</div>
