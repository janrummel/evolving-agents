---
layout: default
title: Monitoring Keywords
parent: Meta
nav_order: 4
---

# Research Monitoring Keywords

<div class="section-summary">
<h4><span lang="en">Purpose</span><span lang="de">Zweck</span></h4>
<p><span lang="en">Curated search terms for weekly arXiv scans. 3 tiers: Primary (weekly), Secondary (monthly), Negative (exclude). Last updated: 2026-03-19.</span><span lang="de">Kuratierte Suchbegriffe für wöchentliche arXiv-Scans. 3 Stufen: Primär (wöchentlich), Sekundär (monatlich), Negativ (ausschließen). Letztes Update: 2026-03-19.</span></p>
</div>

<div lang="en" markdown="1">

Search terms for regular paper tracking. Goal: weekly arXiv scan.

</div>

<div lang="de" markdown="1">

Suchbegriffe für regelmäßiges Paper-Tracking. Ziel: Wöchentlicher arXiv-Scan.

</div>

## Primäre Keywords (wöchentlich prüfen)

<div lang="en" markdown="1">

### English
| Query | arXiv Categories | Expected Hits/Week |
|-------|-----------------|------------------------|
| `self-evolving AND agents AND LLM` | cs.AI, cs.MA, cs.CL | 3-5 |
| `quality-diversity AND agents` | cs.AI, cs.NE, cs.LG | 1-2 |
| `evolving AND agentic AND workflows` | cs.AI, cs.SE, cs.MA | 2-3 |
| `multi-agent AND evolution AND LLM` | cs.MA, cs.AI | 2-4 |
| `evolvability AND neural` | cs.NE, cs.LG | 0-1 |

</div>

<div lang="de" markdown="1">

### Englisch
| Query | arXiv-Kategorien | Erwartete Treffer/Woche |
|-------|-----------------|------------------------|
| `self-evolving AND agents AND LLM` | cs.AI, cs.MA, cs.CL | 3-5 |
| `quality-diversity AND agents` | cs.AI, cs.NE, cs.LG | 1-2 |
| `evolving AND agentic AND workflows` | cs.AI, cs.SE, cs.MA | 2-3 |
| `multi-agent AND evolution AND LLM` | cs.MA, cs.AI | 2-4 |
| `evolvability AND neural` | cs.NE, cs.LG | 0-1 |

</div>

<div lang="en" markdown="1">

### Chinese (monthly, manual via WebSearch)
| Query | Platforms |
|-------|-----------|
| `自进化 智能体 大模型` | Zhihu, CNKI, ChinaXiv |
| `多智能体 进化 协作` | Zhihu, Baidu Scholar |
| `质量多样性 进化算法 智能体` | Baidu Scholar |

</div>

<div lang="de" markdown="1">

### Chinesisch (monatlich, manuell via WebSearch)
| Query | Plattformen |
|-------|-----------|
| `自进化 智能体 大模型` | Zhihu, CNKI, ChinaXiv |
| `多智能体 进化 协作` | Zhihu, Baidu Scholar |
| `质量多样性 进化算法 智能体` | Baidu Scholar |

</div>

## Sekundäre Keywords (monatlich)

<div lang="en" markdown="1">

| Query | Why |
|-------|-------|
| `MAP-Elites AND LLM` | QD algorithms for agent systems |
| `niching AND evolutionary AND workflow` | EvoFlow successor |
| `meta context engineering` | MCE evolution |
| `error threshold AND agent` | Our own thesis |
| `collaboration gain metric` | MAS evaluation progress |

</div>

<div lang="de" markdown="1">

| Query | Warum |
|-------|-------|
| `MAP-Elites AND LLM` | QD-Algorithmen für Agent-Systeme |
| `niching AND evolutionary AND workflow` | EvoFlow-Nachfolger |
| `meta context engineering` | MCE-Weiterentwicklung |
| `error threshold AND agent` | Unsere eigene These |
| `collaboration gain metric` | MAS-Evaluationsfortschritt |

</div>

## Autoren-Tracking

<div lang="en" markdown="1">

| Author | Field | Why Relevant |
|-------|------|---------------|
| Martin A. Nowak | Evolutionary Dynamics | Fundamental theory |
| Jeff Clune | AI + Evolution | Evolvability ES, QD |
| Kenneth O. Stanley | Open-endedness | Novelty Search, QD |
| Joel Lehman | AI Safety + Evolution | Evolvability ES |
| Jean-Baptiste Mouret | QD Algorithms | MAP-Elites |
| Guibin Zhang | Agent Workflows | EvoFlow |
| Zaiqiao Meng | Agent Evolution | EvoAgentX |
| Haoran Ye | Context Engineering | MCE |

</div>

<div lang="de" markdown="1">

| Autor | Feld | Warum relevant |
|-------|------|---------------|
| Martin A. Nowak | Evolutionary Dynamics | Fundamentaltheorie |
| Jeff Clune | AI + Evolution | Evolvability ES, QD |
| Kenneth O. Stanley | Open-endedness | Novelty Search, QD |
| Joel Lehman | AI Safety + Evolution | Evolvability ES |
| Jean-Baptiste Mouret | QD Algorithms | MAP-Elites |
| Guibin Zhang | Agent Workflows | EvoFlow |
| Zaiqiao Meng | Agent Evolution | EvoAgentX |
| Haoran Ye | Context Engineering | MCE |

</div>

## arXiv-API-Queries (Copy-Paste-Ready)

<div lang="en" markdown="1">

```
# Self-Evolving Agents (last 7 days)
https://export.arxiv.org/api/query?search_query=all:self-evolving+AND+all:agents+AND+all:LLM&sortBy=submittedDate&sortOrder=descending&max_results=10

# Quality-Diversity + Agents
https://export.arxiv.org/api/query?search_query=all:quality-diversity+AND+all:agents&sortBy=submittedDate&sortOrder=descending&max_results=10

# Evolving Workflows
https://export.arxiv.org/api/query?search_query=all:evolving+AND+all:agentic+AND+all:workflows&sortBy=submittedDate&sortOrder=descending&max_results=10

# Multi-Agent Evolution
https://export.arxiv.org/api/query?search_query=all:multi-agent+AND+all:evolution+AND+all:LLM&sortBy=submittedDate&sortOrder=descending&max_results=10
```

</div>

<div lang="de" markdown="1">

```
# Self-Evolving Agents (letzte 7 Tage)
https://export.arxiv.org/api/query?search_query=all:self-evolving+AND+all:agents+AND+all:LLM&sortBy=submittedDate&sortOrder=descending&max_results=10

# Quality-Diversity + Agents
https://export.arxiv.org/api/query?search_query=all:quality-diversity+AND+all:agents&sortBy=submittedDate&sortOrder=descending&max_results=10

# Evolving Workflows
https://export.arxiv.org/api/query?search_query=all:evolving+AND+all:agentic+AND+all:workflows&sortBy=submittedDate&sortOrder=descending&max_results=10

# Multi-Agent Evolution
https://export.arxiv.org/api/query?search_query=all:multi-agent+AND+all:evolution+AND+all:LLM&sortBy=submittedDate&sortOrder=descending&max_results=10
```

</div>

## Monitoring-Rhythmus

<div lang="en" markdown="1">

| Frequency | What | How |
|----------|-----|-----|
| Weekly | arXiv EN keywords | arXiv API queries above |
| Monthly | CJK keywords + author check | WebSearch manually |
| Quarterly | Awesome list re-check | WebFetch on GitHub |

</div>

<div lang="de" markdown="1">

| Frequenz | Was | Wie |
|----------|-----|-----|
| Wöchentlich | arXiv EN-Keywords | arXiv API Queries oben |
| Monatlich | CJK-Keywords + Autoren-Check | WebSearch manuell |
| Quartalsweise | Awesome-Liste re-check | WebFetch auf GitHub |

</div>
