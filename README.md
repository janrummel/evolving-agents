```
███████╗██╗   ██╗ ██████╗ ██╗    ██╗   ██╗██╗███╗   ██╗ ██████╗
██╔════╝██║   ██║██╔═══██╗██║    ██║   ██║██║████╗  ██║██╔════╝
█████╗  ██║   ██║██║   ██║██║    ██║   ██║██║██╔██╗ ██║██║  ███╗
██╔══╝  ╚██╗ ██╔╝██║   ██║██║    ╚██╗ ██╔╝██║██║╚██╗██║██║   ██║
███████╗ ╚████╔╝ ╚██████╔╝███████╗╚████╔╝ ██║██║ ╚████║╚██████╔╝
╚══════╝  ╚═══╝   ╚═════╝ ╚══════╝ ╚═══╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝
 █████╗  ██████╗ ███████╗███╗   ██╗████████╗███████╗
██╔══██╗██╔════╝ ██╔════╝████╗  ██║╚══██╔══╝██╔════╝
███████║██║  ███╗█████╗  ██╔██╗ ██║   ██║   ███████╗
██╔══██║██║   ██║██╔══╝  ██║╚██╗██║   ██║   ╚════██║
██║  ██║╚██████╔╝███████╗██║ ╚████║   ██║   ███████║
╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
```

**From Nowak's Evolvability Equations to AI Agent Architectures**

**[janrummel.github.io/evolving-agents](https://janrummel.github.io/evolving-agents/)** — Living research + design principles

[![Website](https://img.shields.io/badge/Website-Live-brightgreen)](https://janrummel.github.io/evolving-agents/)
[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC_BY--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)
[![Papers](https://img.shields.io/badge/Papers-55%2B-blue)](https://janrummel.github.io/evolving-agents/research/)
[![Principles](https://img.shields.io/badge/Principles-6-green)](https://janrummel.github.io/evolving-agents/principles/)

---

## The Core Insight

Current AI agent systems are fundamentally static. Martin Nowak's work on evolutionary dynamics provides a mathematical framework to understand **when** and **how** agent systems can evolve — and what breaks when they try.

> There is a structural analogy between biological evolution and agent system improvement.
> Replication, mutation, and selection map onto workflow reuse, prompt variation, and evaluation.

This repo connects the math to the practice — through 55+ papers, 6 actionable principles, and a concrete engineering spec for making agent systems evolvable.

## Who Is This For?

| You are... | You'll get... | Start here |
|:---|:---|:---|
| **An agent system builder** | Design checklist + engineering spec | [6 Principles](principles/README.md) → [Phase 1 Spec](specs/phase-1-feedback-loop.md) |
| **An AI/ML researcher** | 55+ categorized papers + open questions | [Paper Registry](research/paper-registry.md) → [Open Questions](research/open-questions.md) |
| **Curious about biology × AI** | Accessible synthesis with glossary | [Nowak Synthesis](research/nowak-synthesis.md) |

**Prerequisites:** None for the principles and synthesis (glossary included). Familiarity with LLM-based agent systems helps for the engineering spec. No math background needed — the equations are explained in plain language.

## FAQ

See the [full FAQ on the website](https://janrummel.github.io/evolving-agents/#faq) — covers: "Is this a formal proof?", "Were papers actually read?", "What can I DO with this?", "Why counter-arguments?", "Is this just an awesome list?"

## The Bridge: Nowak to Agent Architectures

| Biology (Nowak) | Agent System | Example |
|---|---|---|
| Sequence / Replicator | Agent config (prompt + tools + memory) | A skill file (SKILL.md) |
| Fitness | Performance metric | Quality score + token cost |
| Mutation | Prompt variation, tool swap, workflow change | TextGrad optimization |
| Selection (φ) | Evaluation + keep/discard decision | Quality gate agent |
| Replication | Persistent context / template reuse | AGENTS.md inheritance |
| Error Threshold | Max complexity before quality collapses | Context window limits |
| Phase Transition (rₓ) | When structured workflows emerge | Manual → automated orchestration |

## What's Inside

### Research

| Document | What It Contains |
|----------|-----------------|
| [Nowak Synthesis](research/nowak-synthesis.md) | Originator equation, phase transitions, error threshold — mapped to agents |
| [Paper Registry](research/paper-registry.md) | 55+ papers across 9 categories, 15 must-reads, prioritized |
| [Deep Dive: EvoFlow, MCE, AgentFactory](research/deep-dive-evoflow-mce-agentfactory.md) | The 3 bridge papers analyzed and compared |
| [Open Questions](research/open-questions.md) | 7 research questions, from tractable to speculative |

### Principles

Five actionable design principles derived from evolutionary theory: [principles/](principles/README.md)

1. **Evolvability over Performance** — Optimize for adaptability, not just current task success
2. **Diversity as Strategic Resource** — Maintain a repertoire of solutions, not just the best one
3. **Feedback Loops as Selection Pressure** — Without evaluation-as-architecture, only random drift
4. **Respect the Error Threshold** — Never change more than you can measure
5. **Cooperation Must Be Measured** — Multi-agent setups must prove genuine cooperation gain (Γ)
6. **The Fitness Function Is the Most Fragile Part** — Artificial selection is only as good as your metrics

### Engineering

| Document | What It Contains |
|----------|-----------------|
| [Phase 1 Spec: Feedback Loop](specs/phase-1-feedback-loop.md) | SQL schema, Pareto views, alert triggers — closing the evolutionary loop |
| [Research Toolkit Audit](meta/research-toolkit.md) | Available tools, gaps, and blind spots |
| [Monitoring Keywords](meta/monitoring-keywords.md) | arXiv queries, CJK keywords, tracked authors |

### Learnings

| Document | What It Contains |
|----------|-----------------|
| [Research Process Learnings](meta/learnings-research-process.md) | 8 findings: rate limiting, CJK search, awesome lists, arXiv reliability |
| [AgentField = Prelife](meta/learning-agentfield-prelife.md) | The central insight — and the 4-phase upgrade path |

## Key Discovery: EvoFlow

[EvoFlow](https://arxiv.org/abs/2502.07373) (Zhang et al., 2025) uses niching evolutionary algorithms — directly related to MAP-Elites and quality-diversity — to evolve agent workflows. It surpassed o1-preview at **12.4% of its inference cost** using open-source models.

This is not theoretical. The bridge from Nowak to agent systems has been built. EvoFlow implements population-based workflow evolution with:
- Tag-based parent retrieval
- Crossover + 3 mutation types (LLM, prompt, operator)
- Niching-based selection maintaining diversity along the Pareto front (quality vs. cost)

## The Upgrade Path: Prelife → Life

Most agent systems are in Nowak's **"Prelife" phase**: diversity and selection exist, but there's no closed evolutionary loop. The feedback dies after evaluation.

```
Phase 0 (most systems): Prelife — manual curation, no inheritance
Phase 1: Close the feedback loop — measure skill performance (quality + cost)
Phase 2: Automated mutation — A/B test prompt variations
Phase 3: Population management — niching, multiple skill variants per task
Phase 4: Full evolution — automatic cycle, faster than manual curation
```

Phase 1 is specified and [ready to implement](specs/phase-1-feedback-loop.md).

## Structure

```
research/           Syntheses, paper notes, open questions, deep dives
principles/         5 design principles derived from evolutionary theory
specs/              Engineering specs (Phase 1 feedback loop)
meta/               Research methodology, toolkit audit, learnings, monitoring
```

## What You Can Do With This

**If you build agent systems:** The 5 principles give you a checklist. Are you optimizing for evolvability or just current performance? Do you have a feedback loop? Are you changing more than you can measure? Start with [Phase 1](specs/phase-1-feedback-loop.md) — it's a SQL schema and 3 views.

**If you research agent evolution:** The [paper registry](research/paper-registry.md) organizes 55+ papers into 9 categories with priority ratings. The [open questions](research/open-questions.md) identify 7 tractable research directions, starting with the error threshold for agentic workflows.

**If you're curious about the intersection of biology and AI:** The [synthesis](research/nowak-synthesis.md) walks through Nowak's math and maps it to agent systems — with a glossary that explains every term.

## Limitations and Honest Assessment

**What this is:** A structured research collection with actionable engineering output, built in one intensive session.

**What this is NOT:** A peer-reviewed publication or rigorous formal proof.

Specific limitations:

- **No paper was read in full.** All analysis is based on abstracts, summaries, and third-party reviews (EmergentMind, alphaXiv). Numbers from papers were cross-checked against 2+ sources.
- **The "structural analogy" between Nowak and agent systems is this project's interpretation**, not a published result. The mappings are plausible heuristics, not mathematical proofs. Whether the structures are truly isomorphic is an open question.
- **~15 papers in the registry have incomplete metadata** (missing authors, IDs). These are marked. Sources without verified links are flagged with ⚠.
- **Chinese-language sources were found but not read in depth.** Their existence and relevance is confirmed, but the actual content was not translated or analyzed.
- **Counter-arguments have been researched and documented.** See [Counter-Arguments](research/counter-arguments.md) for 8 critiques — the 3 strongest: agent evolution is Lamarckian not Darwinian, there's no true reproduction, and artificial selection is only as good as the fitness function.
- **The 5 principles are derived, not empirically validated.** They're useful design heuristics, but their effectiveness has not been measured.

## Contributing

This is a living research collection. If you're working at the intersection of evolutionary computation and LLM-based agent systems, open an issue or PR. Especially interested in:

- **Counter-arguments:** Papers or reasoning that challenge the Nowak-agent analogy
- Empirical measurements of the error threshold for agentic workflows
- Quality-diversity applications to prompt/skill optimization
- Multi-lingual research leads (especially Chinese and Japanese sources)

## License

[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

---

*Built with [Claude Code](https://claude.com/claude-code) as part of the [AgentField](https://github.com/janrummel) ecosystem.*
