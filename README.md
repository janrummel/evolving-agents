# Evolving Agents

**From Nowak's Evolvability Equations to AI Agent Architectures**

🌐 **[Live Site →](https://janrummel.github.io/evolving-agents/)**

[![Website](https://img.shields.io/badge/Website-Live-brightgreen)](https://janrummel.github.io/evolving-agents/)
[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC_BY--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)
[![Papers](https://img.shields.io/badge/Papers-60%2B-blue)](https://janrummel.github.io/evolving-agents/research/paper-registry)
[![Principles](https://img.shields.io/badge/Principles-7-green)](https://janrummel.github.io/evolving-agents/principles/)

---

## What Is This?

Most AI agent systems are stuck in what Martin Nowak calls **"Prelife"** — they have diversity and selection, but no closed evolutionary loop. The feedback dies after evaluation.

This project connects Nowak's mathematical framework for evolutionary dynamics to AI agent architectures — exploring when and how agent systems can genuinely evolve, and what breaks when they try.

## What's Inside

| Section | Contents |
|:--------|:---------|
| **[Nowak Synthesis](https://janrummel.github.io/evolving-agents/research/nowak-synthesis)** | Originator equation, phase transitions, error threshold — mapped to agents |
| **[7 Principles](https://janrummel.github.io/evolving-agents/principles/)** | Actionable design principles derived from evolutionary theory |
| **[9 Counter-Arguments](https://janrummel.github.io/evolving-agents/research/counter-arguments)** | Steel-manned critiques (Lamarckian ≠ Darwinian, no true reproduction, ...) |
| **[50+ Paper Registry](https://janrummel.github.io/evolving-agents/research/paper-registry)** | Categorized across 9 domains with priority ratings |
| **[Deep Dive: EvoFlow, MCE, AgentFactory](https://janrummel.github.io/evolving-agents/research/deep-dive-evoflow-mce-agentfactory)** | Three independent paths from manual to evolutionary agent design |
| **[Engineering Spec](https://janrummel.github.io/evolving-agents/specs/)** | Phase 1 feedback loop: SQL schema, KPIs, Pareto views |

### Interactive Visualizations

- **Originator Simulator** — watch populations shift from Prelife to Life as replication rate increases
- **Error Threshold Explorer** — adjust mutation rate and sequence length to find the boundary between Life and information loss

## The Core Bridge

| Biology (Nowak) | Agent System | Example |
|:---|:---|:---|
| Sequence / Replicator | Agent config (prompt + tools + memory) | A skill file |
| Fitness | Performance metric | Quality score + cost |
| Mutation | Prompt variation, tool swap | TextGrad optimization |
| Selection (φ̄) | Evaluation + keep/discard | Quality gate agent |
| Error Threshold | Max complexity before collapse | Context window limits |
| Phase Transition (rₓ) | When structured workflows emerge | Manual → automated orchestration |

## Tech Stack

- [Jekyll](https://jekyllrb.com/) + [just-the-docs v0.10](https://just-the-docs.com/)
- [KaTeX](https://katex.org/) for math rendering
- [Mermaid](https://mermaid.js.org/) for diagrams
- Bilingual (EN/DE) with client-side language toggle
- Custom interactive simulations (vanilla JS + Canvas)

## Limitations

- Research synthesis, not a peer-reviewed publication
- The structural analogy between Nowak and agents is an interpretation, not a formal proof
- Counter-arguments are documented — see the [9 critiques](https://janrummel.github.io/evolving-agents/research/counter-arguments)
- ~15 papers have incomplete metadata (flagged with ⚠)

## Contributing

If you work at the intersection of evolutionary computation and LLM-based agent systems — issues and PRs welcome. Especially interested in:

- Counter-arguments challenging the Nowak-agent analogy
- Empirical error threshold measurements for agentic workflows
- Quality-diversity applications to prompt optimization
- Multi-lingual research leads (Chinese, Japanese sources)

## License

[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
