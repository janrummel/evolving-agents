---
layout: default
title: Open Questions
parent: Research
nav_order: 4
---

# Open Questions

Research questions that need investigation. Prioritized by tractability and relevance.

## Priority 1 — Directly Tractable

### Q1: Error Threshold for Agentic Workflows
**Source:** Nowak's quasispecies theory → agent systems analogy (Section 4.3)
**Question:** What is the maximum number of simultaneous workflow changes before the evaluation pipeline loses the ability to detect improvement direction?
**Approach:** Empirical measurement with controlled agent workflow experiments. Vary mutation rate (number of changes per iteration), measure signal-to-noise in quality metrics.
**Status:** Not started

### Q2: When Does Structured Workflow Emerge from Random Configuration Search?
**Source:** Nowak's phase transition (rₓ) → agent systems (Section 4.4, Q1)
**Question:** Can we define a critical "replication rate" for agent workflows — the point at which template reuse (AGENTS.md, SKILL.md) begins to dominate over ad-hoc configuration?
**Approach:** Observational study on AgentField usage patterns. Track when skills stabilize vs. keep changing.
**Status:** Not started

### Q3: Collaboration Gain vs. Resource Accumulation in Our Multi-Agent Setup
**Source:** arXiv:2602.05289 — Collaboration Gain Metric Γ
**Question:** Do our subagent workflows (quality-gate, research-pipeline) produce genuine cooperation gain, or would a single agent with more tokens achieve the same result?
**Approach:** Controlled experiment — same task, single-agent vs. multi-agent, measure quality + token cost.
**Status:** Not started

## Priority 2 — Needs More Research First

### Q4: Optimal Diversity in Subagent Pools
**Source:** MAP-Elites / Quality-Diversity literature
**Question:** Is there a sweet spot for how many different skill configurations to maintain? Too few = no adaptability. Too many = maintenance cost explodes.
**Needs:** Literature review of QD archive sizing strategies. Survey of emerging QD-for-LLMs papers.

### Q5: Can Agent Topologies Be Evolved Rather Than Designed?
**Source:** Evolutionary Graph Theory (Nowak) + MultiAgentBench topologies
**Question:** Could we use Γ as a fitness function to evolve star/chain/graph topologies for specific task types?
**Needs:** Access to EvoAgentX codebase, understanding of AFlow algorithm.

## Priority 3 — Long-Term / Speculative

### Q6: Self-Evolving AgentField
**Question:** Can AgentField evolve its own skill library? Skills that perform well get reinforced, poor performers get mutated or removed, new skills emerge from combinations.
**Connection:** This is the full loop — Nowak's evolution applied to our own system.

### Q7: Cross-System Evolvability
**Question:** How do design choices in one project (C2C, CloakCode) transfer evolutionary fitness to another? Is there an "ecosystem fitness" beyond individual project fitness?
**Connection:** Nowak's spatial evolution / evolutionary graph theory on project networks.
