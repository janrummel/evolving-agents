<div align="center">

# Evolving Agents

### From Nowak's Evolvability Equations to AI Agent Architectures

*The math for how systems improve already exists. Biology solved it 20 years ago.*

[![Website](https://img.shields.io/badge/Website-Live-10b981?style=for-the-badge)](https://janrummel.github.io/evolving-agents/)
[![Papers](https://img.shields.io/badge/Papers-60%2B-818cf8?style=for-the-badge)](https://janrummel.github.io/evolving-agents/research/paper-registry)
[![Principles](https://img.shields.io/badge/Principles-7-34d399?style=for-the-badge)](https://janrummel.github.io/evolving-agents/principles/)
[![License](https://img.shields.io/badge/License-CC_BY--SA_4.0-94a3b8?style=for-the-badge)](https://creativecommons.org/licenses/by-sa/4.0/)

</div>

---

## The Problem

Most AI agent systems are stuck in what Martin Nowak calls **"Prelife"** — they have diversity and selection, but no closed evolutionary loop. The feedback dies after evaluation.

This project connects Nowak's mathematical framework for evolutionary dynamics to AI agent architectures — exploring when and how agent systems can genuinely evolve, and what breaks when they try.

## What's Inside

| | Section | Contents |
|:--|:--------|:---------|
| :microscope: | **[Nowak Synthesis](https://janrummel.github.io/evolving-agents/research/nowak-synthesis)** | Originator equation, phase transitions, error threshold — mapped to agents |
| :compass: | **[7 Principles](https://janrummel.github.io/evolving-agents/principles/)** | Actionable design principles derived from evolutionary theory |
| :crossed_swords: | **[9 Counter-Arguments](https://janrummel.github.io/evolving-agents/research/counter-arguments)** | Steel-manned critiques — 3 rated STRONG |
| :books: | **[60+ Paper Registry](https://janrummel.github.io/evolving-agents/research/paper-registry)** | Categorized across 9 domains with priority ratings |
| :mag: | **[Deep Dive](https://janrummel.github.io/evolving-agents/research/deep-dive-evoflow-mce-agentfactory)** | EvoFlow, MCE, AgentFactory — three paths to evolutionary agents |
| :wrench: | **[Engineering Spec](https://janrummel.github.io/evolving-agents/specs/)** | Phase 1 feedback loop: SQL schema, KPIs, Pareto views |

## Interactive Simulations

The site includes two interactive visualizations:

**Originator Simulator** — drag a slider to increase replication rate and watch a population shift from Prelife to Life:

```
r = 0.0  ████████████████████  Prelife — no replication, random drift
r = 0.5  ████████▓▓▓▓▓▓██████  Phase transition — fittest begin to replicate
r = 1.5  ▓▓▓▓▓▓▓▓▓▓██████████  Life — selection pressure drives improvement
```

**Error Threshold Explorer** — adjust mutation rate and sequence length to find the boundary between Life and information loss.

## The Core Bridge

| Biology (Nowak) | Agent System | Example |
|:---|:---|:---|
| Sequence / Replicator | Agent config (prompt + tools + memory) | A skill file |
| Fitness | Performance metric | Quality score + cost |
| Mutation | Prompt variation, tool swap | TextGrad optimization |
| Selection | Evaluation + keep/discard | Quality gate |
| Error Threshold | Max complexity before collapse | Context window limits |
| Phase Transition | When structured workflows emerge | Manual to automated orchestration |

## FAQ

<details>
<summary><strong>Is this a formal proof?</strong></summary>
No. It's a structural analogy — a design heuristic, not a mathematical proof. Where the analogy breaks, it's documented in the <a href="https://janrummel.github.io/evolving-agents/research/counter-arguments">9 Counter-Arguments</a>.
</details>

<details>
<summary><strong>What can I DO with this?</strong></summary>
Start with the <a href="https://janrummel.github.io/evolving-agents/principles/">7 Principles</a> as a design checklist. If you want to implement, the <a href="https://janrummel.github.io/evolving-agents/specs/phase-1-feedback-loop">Phase 1 Spec</a> is a SQL schema you can build in an afternoon.
</details>

<details>
<summary><strong>Were papers actually read?</strong></summary>
Core bridge papers (EvoFlow, MCE, AgentFactory) in full. The broader corpus via abstracts, reviews, and cross-verification. All limitations are documented transparently.
</details>

## Limitations

- Research synthesis, not a peer-reviewed publication
- The structural analogy is an interpretation, not a formal proof
- Counter-arguments are documented — [9 critiques, 3 rated STRONG](https://janrummel.github.io/evolving-agents/research/counter-arguments)
- ~15 papers have incomplete metadata (flagged with :warning:)

## Contributing

If you work at the intersection of evolutionary computation and LLM-based agent systems — issues and PRs welcome. Especially interested in:

- Counter-arguments challenging the Nowak-agent analogy
- Empirical error threshold measurements for agentic workflows
- Quality-diversity applications to prompt optimization
- Multi-lingual research leads (Chinese, Japanese sources)

## License

[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

---

<div align="center">
<sub>Built with <a href="https://claude.com/claude-code">Claude Code</a></sub>
</div>
