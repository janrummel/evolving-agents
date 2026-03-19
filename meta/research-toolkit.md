---
layout: default
title: Research Toolkit Audit
parent: Meta
nav_order: 1
---

# Research Toolkit Audit

What we have, what we're missing, and what we need to build for serious cross-disciplinary research on evolving agent systems.

**Last updated:** 2026-03-19

---

## What We Have

### Search & Discovery

| Tool | Capability | Strength | Limitation |
|------|-----------|----------|------------|
| **WebSearch** | General web search | Broad, real-time | No deep academic search, English-biased |
| **WebFetch** | Fetch web pages | Direct access to URLs | No batch processing, no PDF extraction |
| **research-pipeline** | Structured multi-source research | Routes by topic, saves to Knowledge DB | Limited to approved sources, no arXiv API |
| **learn-from-the-best** | Find top sources, people, learning paths | Mondon method — "someone has done this" | English-only, no citation graph |
| **knowledge-check** | Cross-vault search (5 layers) | Fast, comprehensive for stored knowledge | Only searches what we've already captured |

### Analysis & Synthesis

| Tool | Capability | When to Use |
|------|-----------|-------------|
| **analyze** | ReAct cycle investigation | Multi-step structured analysis |
| **synthesize** | Cross-source pattern finding | Connecting insights from different domains |
| **distill** | Progressive summarization (4 layers) | Condensing long papers/documents |
| **signal-check** | Quality/substance check | Evaluating claims, separating signal from noise |
| **challenge** | Adversarial stress-testing | Pressure-testing our own conclusions |
| **briefing** | Topic overview from vault | "What do we know about X?" |

### Knowledge Storage

| Tool | What It Stores | Access |
|------|---------------|--------|
| **Obsidian Vaults** (5x) | Structured notes, concepts, links | MCP servers per vault |
| **Knowledge DB** (SQLite) | Structured data, CSV imports | SQL queries |
| **Episodic Memory** | Conversation history, decisions | Semantic search |
| **Memory System** | Cross-session user/project/feedback context | File-based, indexed |

### Approved External Sources

PubMed, bioRxiv, ChEMBL, ClinicalTrials.gov, Open Targets (ToS-Audit 2026-03-13)

---

## Blind Spots — What's Missing

### 1. Multi-Lingual Research (CRITICAL)

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

### 2. Academic Paper Infrastructure (HIGH)

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

### 3. Research Monitoring & Alerting (MEDIUM)

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

### 4. Code & Reproducibility (MEDIUM)

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

### 5. Community & Discourse (LOW)

**Problem:** We research papers but don't track the communities around them.

**What we're missing:**
- **Twitter/X academic discourse** — Many breakthroughs are discussed informally before formal publication
- **Reddit communities** — r/MachineLearning, r/reinforcementlearning
- **Conference workshops** — Often more cutting-edge than main proceedings
- **Lab websites & blogs** — Uber AI (now OpenAI), DeepMind, Anthropic research blogs

---

## Werkzeugkasten-Prioritäten

### Sofort machbar (diese Woche)

1. **Semantic Scholar via WebFetch** — REST API, no auth needed for basic queries, gives us citation graphs immediately
2. **arXiv via WebFetch** — Simple API, gives us search + metadata + PDF links
3. **Translation-aware search** — Use WebSearch with explicit Chinese/Japanese query terms for key topics

### Kurzfristig (diesen Monat)

4. **Semantic Scholar MCP server** — Structured tool for citation traversal
5. **arXiv monitoring** — Weekly automated search for new papers on our topics
6. **PapersWithCode** — Cross-reference our papers with available implementations

### Mittelfristig (Q2 2026)

7. **Multi-lingual search wrapper** — Systematic CJK research pipeline
8. **Reference management** — BibTeX/Zotero integration
9. **Benchmark runner** — Local experiments with QD algorithms, agent evolution

---

## Nächste Aktion

Start with Semantic Scholar + arXiv queries for our core papers to:
1. Build citation graph outward from Nowak 2008, Gao 2025, Wang 2025
2. Find papers we're missing (especially post-2024 work on self-evolving agents)
3. Identify Chinese/Japanese labs working on this intersection
