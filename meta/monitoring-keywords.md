# Research Monitoring Keywords

Suchbegriffe für regelmäßiges Paper-Tracking. Ziel: Wöchentlicher arXiv-Scan.

## Primäre Keywords (wöchentlich prüfen)

### Englisch
| Query | arXiv-Kategorien | Erwartete Treffer/Woche |
|-------|-----------------|------------------------|
| `self-evolving AND agents AND LLM` | cs.AI, cs.MA, cs.CL | 3-5 |
| `quality-diversity AND agents` | cs.AI, cs.NE, cs.LG | 1-2 |
| `evolving AND agentic AND workflows` | cs.AI, cs.SE, cs.MA | 2-3 |
| `multi-agent AND evolution AND LLM` | cs.MA, cs.AI | 2-4 |
| `evolvability AND neural` | cs.NE, cs.LG | 0-1 |

### Chinesisch (monatlich, manuell via WebSearch)
| Query | Plattformen |
|-------|-----------|
| `自进化 智能体 大模型` | Zhihu, CNKI, ChinaXiv |
| `多智能体 进化 协作` | Zhihu, Baidu Scholar |
| `质量多样性 进化算法 智能体` | Baidu Scholar |

## Sekundäre Keywords (monatlich)

| Query | Warum |
|-------|-------|
| `MAP-Elites AND LLM` | QD-Algorithmen für Agent-Systeme |
| `niching AND evolutionary AND workflow` | EvoFlow-Nachfolger |
| `meta context engineering` | MCE-Weiterentwicklung |
| `error threshold AND agent` | Unsere eigene These |
| `collaboration gain metric` | MAS-Evaluationsfortschritt |

## Autoren-Tracking

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

## arXiv-API-Queries (Copy-Paste-Ready)

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

## Monitoring-Rhythmus

| Frequenz | Was | Wie |
|----------|-----|-----|
| Wöchentlich | arXiv EN-Keywords | arXiv API Queries oben |
| Monatlich | CJK-Keywords + Autoren-Check | WebSearch manuell |
| Quartalsweise | Awesome-Liste re-check | WebFetch auf GitHub |
