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

## Example: What You Get

The site includes two interactive simulations. The **Originator Simulator** lets you drag a slider to increase replication rate and watch a population shift from Prelife (no evolution) to Life (fittest replicators dominate):

```
r = 0.0  ████████████████████  Prelife — no replication, random drift
r = 0.5  ████████▓▓▓▓▓▓██████  Phase transition — fittest begin to replicate
r = 1.5  ▓▓▓▓▓▓▓▓▓▓██████████  Life — selection pressure drives improvement
```

The **Error Threshold Explorer** shows exactly how much mutation an agent system can tolerate before quality collapses — Nowak's error threshold, applied to prompt variation.

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

## FAQ

**Is this a formal proof?** No. It's a structural analogy — a design heuristic, not a mathematical proof. Where the analogy breaks, it's documented in the [Counter-Arguments](https://janrummel.github.io/evolving-agents/research/counter-arguments).

**What can I DO with this?** Start with the [7 Principles](https://janrummel.github.io/evolving-agents/principles/) as a design checklist. If you want to implement, the [Phase 1 Spec](https://janrummel.github.io/evolving-agents/specs/phase-1-feedback-loop) is a SQL schema you can build in an afternoon.

**Were papers actually read?** Core bridge papers (EvoFlow, MCE, AgentFactory) in full. The broader corpus via abstracts, reviews, and cross-verification. All limitations are documented transparently.

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
