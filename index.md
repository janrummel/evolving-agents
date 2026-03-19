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

[Research (55+ Papers)](/evolving-agents/research/paper-registry){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[5 Principles](/evolving-agents/principles/){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## The Core Insight

Current AI agent systems are fundamentally static. Martin Nowak's work on evolutionary dynamics provides a mathematical framework to understand **when** and **how** agent systems can evolve — and what breaks when they try.

> There is a formal isomorphism between biological evolution and agent system improvement.
> Replication, mutation, and selection map directly onto workflow reuse, prompt variation, and evaluation.

## The Bridge: Nowak to Agent Architectures

| Biology (Nowak) | Agent System | Example |
|:---|:---|:---|
| Sequence / Replicator | Agent config (prompt + tools + memory) | A skill file (SKILL.md) |
| Fitness | Performance metric | Quality score + token cost |
| Mutation | Prompt variation, tool swap, workflow change | TextGrad optimization |
| Selection (φ) | Evaluation + keep/discard decision | Quality gate agent |
| Replication | Persistent context / template reuse | AGENTS.md inheritance |
| Error Threshold | Max complexity before quality collapses | Context window limits |
| Phase Transition (rₓ) | When structured workflows emerge | Manual → automated orchestration |

## Key Discovery: EvoFlow

[EvoFlow](https://arxiv.org/abs/2502.07373) (Zhang et al., 2025) uses niching evolutionary algorithms — directly related to MAP-Elites and quality-diversity — to evolve agent workflows. It surpassed o1-preview at **12.4% of its inference cost** using open-source models.

This is not theoretical. The bridge from Nowak to agent systems has been built.

## The Upgrade Path: Prelife → Life

Most agent systems are in Nowak's **"Prelife" phase**: diversity and selection exist, but there's no closed evolutionary loop.

```
Phase 0 (most systems): Prelife — manual curation, no inheritance
Phase 1: Close the feedback loop — measure skill performance (quality + cost)
Phase 2: Automated mutation — A/B test prompt variations
Phase 3: Population management — niching, multiple skill variants per task
Phase 4: Full evolution — automatic cycle, faster than manual curation
```

---

## Limitations and Honest Assessment

{: .warning }
> **No paper was read in full.** All analysis is based on abstracts, summaries, and third-party reviews. Numbers were cross-checked against 2+ sources. The structural analogy between Nowak and agent systems is our interpretation, not a published result. See [full limitations](/evolving-agents/meta/limitations).

---

## What You Can Do With This

**If you build agent systems:** The [5 principles](/evolving-agents/principles/) give you a checklist. Start with [Phase 1](/evolving-agents/specs/phase-1-feedback-loop) — it's a SQL schema and 3 views.

**If you research agent evolution:** The [paper registry](/evolving-agents/research/paper-registry) organizes 55+ papers into 9 categories. The [open questions](/evolving-agents/research/open-questions) identify 7 tractable research directions.

**If you're curious about biology × AI:** The [synthesis](/evolving-agents/research/nowak-synthesis) walks through Nowak's math and maps it to agent systems — with a glossary.
