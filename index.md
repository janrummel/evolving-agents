---
layout: default
title: Home
nav_order: 1
---

# Evolving Agents

**From Nowak's Evolvability Equations to AI Agent Architectures**
{: .fs-6 .fw-300 }

A living research collection and practical design principles at the intersection of evolutionary dynamics, self-evolving agents, and multi-agent systems.
{: .fs-5 .fw-300 }

[Browse Research](/evolving-agents/research/){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[6 Principles](/evolving-agents/principles/){: .btn .fs-5 .mb-4 .mb-md-0 .mr-2 }
[Counter-Arguments](/evolving-agents/research/counter-arguments){: .btn .fs-5 .mb-4 .mb-md-0 }

---

<div class="stat-row">
  <div class="stat-item">
    <span class="stat-number">55+</span>
    <span class="stat-label">Papers</span>
  </div>
  <div class="stat-item">
    <span class="stat-number">6</span>
    <span class="stat-label">Principles</span>
  </div>
  <div class="stat-item">
    <span class="stat-number">8</span>
    <span class="stat-label">Counter-Arguments</span>
  </div>
  <div class="stat-item">
    <span class="stat-number">9</span>
    <span class="stat-label">Categories</span>
  </div>
</div>

---

## The Core Insight

{: .key-insight }
> There is a structural analogy between biological evolution and agent system improvement. Replication, mutation, and selection map onto workflow reuse, prompt variation, and evaluation. This analogy is a **design heuristic**, not a formal proof — see [Counter-Arguments](/evolving-agents/research/counter-arguments) for where it breaks.

---

## Explore

<div class="feature-grid">
  <div class="feature-card">
    <h3>Nowak Synthesis</h3>
    <p>The Originator equation, phase transitions, error threshold — mapped to agent systems. With glossary.</p>
    <a href="/evolving-agents/research/nowak-synthesis">Read the synthesis &rarr;</a>
  </div>
  <div class="feature-card">
    <h3>Paper Registry</h3>
    <p>55+ papers across 9 categories. 15 must-reads. Prioritized, with clickable arXiv links.</p>
    <a href="/evolving-agents/research/paper-registry">Browse papers &rarr;</a>
  </div>
  <div class="feature-card">
    <h3>Deep Dive: EvoFlow, MCE, AgentFactory</h3>
    <p>The 3 papers that bridge evolutionary theory to agent practice. Architecture comparison.</p>
    <a href="/evolving-agents/research/deep-dive-evoflow-mce-agentfactory">Read deep dive &rarr;</a>
  </div>
  <div class="feature-card">
    <h3>6 Design Principles</h3>
    <p>Actionable rules derived from evolutionary theory. Including P6 from the strongest counter-argument.</p>
    <a href="/evolving-agents/principles/">See principles &rarr;</a>
  </div>
  <div class="feature-card">
    <h3>Counter-Arguments</h3>
    <p>8 critiques of the Nowak-agent analogy. 3 rated STRONG. Honest about where the thesis breaks.</p>
    <a href="/evolving-agents/research/counter-arguments">Read critiques &rarr;</a>
  </div>
  <div class="feature-card">
    <h3>Phase 1: Feedback Loop</h3>
    <p>Engineering spec: SQL schema, Pareto views, alert triggers. Closing the evolutionary loop.</p>
    <a href="/evolving-agents/specs/phase-1-feedback-loop">See spec &rarr;</a>
  </div>
</div>

---

## The Bridge: Nowak to Agents

| Biology (Nowak) | Agent System | Example |
|:---|:---|:---|
| Sequence / Replicator | Agent config (prompt + tools + memory) | A skill file |
| Fitness | Performance metric | Quality score + token cost |
| Mutation | Prompt variation, tool swap | TextGrad optimization |
| Selection (φ) | Evaluation + keep/discard | Quality gate agent |
| Error Threshold | Max complexity before collapse | Context window limits |
| Phase Transition (rₓ) | When workflows emerge | Manual → automated |

{: .transparency }
> This table shows **structural analogies**, not proven isomorphisms. Agent evolution is [Lamarckian, not Darwinian](/evolving-agents/research/counter-arguments#g1-agent-systeme-sind-lamarckisch-nicht-darwinistisch-stark) — directed optimization, not random mutation. See [Counter-Arguments](/evolving-agents/research/counter-arguments) for the full critique.

---

## The Upgrade Path

```mermaid
graph LR
    P0["Phase 0<br/><b>Prelife</b><br/>Manual curation"]
    P1["Phase 1<br/><b>Feedback Loop</b><br/>Measure quality + cost"]
    P2["Phase 2<br/><b>Mutation</b><br/>A/B test variations"]
    P3["Phase 3<br/><b>Population</b><br/>Niching, diversity"]
    P4["Phase 4<br/><b>Full Evolution</b><br/>Faster than manual"]

    P0 -->|"close the loop"| P1
    P1 -->|"automate changes"| P2
    P2 -->|"manage diversity"| P3
    P3 -->|"phase transition rₓ"| P4

    style P0 fill:#78350f,stroke:#f59e0b,color:#fbbf24
    style P1 fill:#1e3a5f,stroke:#60a5fa,color:#93c5fd
    style P2 fill:#1a2744,stroke:#818cf8,color:#a5b4fc
    style P3 fill:#1a2744,stroke:#818cf8,color:#a5b4fc
    style P4 fill:#064e3b,stroke:#34d399,color:#6ee7b7
```

{: .note }
> Most agent systems (including ours) are in **Phase 0**. [Phase 1 is specified and implemented](/evolving-agents/specs/phase-1-feedback-loop).

---

## Key Discovery: EvoFlow

[EvoFlow](https://arxiv.org/abs/2502.07373) (Zhang et al., 2025) uses niching evolutionary algorithms to evolve agent workflows. It surpassed o1-preview at **12.4% of its inference cost** using open-source models.

The bridge from Nowak to agent systems is not theoretical — it has been built:
- Tag-based parent retrieval
- Crossover + 3 mutation types (LLM, prompt, operator)
- Niching-based selection maintaining diversity along the Pareto front

---

## Limitations

{: .warning }
> **No paper was read in full.** Analysis is based on abstracts and summaries. The structural analogy is our interpretation, not a published result. Counter-arguments have been [documented](/evolving-agents/research/counter-arguments). See [full limitations](/evolving-agents/meta/limitations).
