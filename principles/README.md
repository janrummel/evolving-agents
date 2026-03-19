---
layout: default
title: Principles
nav_order: 3
---

# Design Principles

Actionable principles derived from evolutionary dynamics research, applicable to agent architectures.

Each principle follows the format: **What** (the rule), **Why** (the evolutionary basis), **How** (concrete application).

---

## P1: Evolvability Over Performance

**What:** Optimize your agent architecture for adaptability, not just current task performance.

**Why:** Nowak shows that systems whose evolvability itself evolves are more successful long-term. [Barnett, Meister & Rainey (*Science*, 2024)](https://www.biorxiv.org/content/10.1101/2024.05.01.592015v2) demonstrated at the Max Planck Institute that bacterial lineages under selection pressure developed mutation-prone sequences in a key gene — with up to 10,000x higher local mutation rates enabling rapid state switching. QD algorithms ([MAP-Elites](https://arxiv.org/abs/1504.04909)) outperform pure fitness optimization in complex landscapes.

**How:**
- Modular skills (SKILL.md) over monolithic prompts
- Progressive disclosure (AGENTS.md as table of contents) over flat configuration
- Keep skills independent — a change in one shouldn't break another
- Measure: "How many new task types can this architecture handle without restructuring?"

---

## P2: Diversity as Strategic Resource

**What:** Maintain a diverse repertoire of high-performing solutions, not just the single best one.

**Why:** MAP-Elites fills behavioral niches with elite solutions. When the environment changes, an alternative is immediately available. Pure optimization gets stuck in local optima.

**How:**
- Isolated context windows for subagents = behavioral niches
- Multiple skill variants for the same task type (e.g., different research approaches)
- Don't prune aggressively — retired skills may be useful when context shifts
- Measure: "How many distinct solution strategies does the system have ready?"

---

## P3: Feedback Loops as Selection Pressure

**What:** Without evaluation-as-architecture, there is no directed improvement — only random drift.

**Why:** Nowak's selection term (fᵢ − φ) is the engine of cumulative evolution. Without it, you have prelife — generative but not cumulatively improving. Google's 2025 lesson: real-time autoraters as selection mechanism in the pipeline.

**How:**
- Every output gets evaluated (quality-gate, signal-check)
- Evaluation happens in-loop, not post-hoc
- Karpathy pattern: Modify → Run → Measure → Keep/Discard → Repeat
- Measure: "How fast does the system detect and correct a regression?"

---

## P4: Respect the Error Threshold

**What:** Never change more than you can measure. The number of simultaneous variations must stay below the evaluation system's observability capacity.

**Why:** Nowak's quasispecies theory: if mutation rate per bit exceeds 1/sequence_length, information is lost through mutational meltdown. The analogy for agents: if you change prompts, tools, and workflows simultaneously, you can't attribute improvement or regression to any specific change.

**How:**
- One change per iteration when optimizing
- Isolated experiments (worktrees, branches) for parallel exploration
- Always have a baseline to compare against
- Measure: "Can I tell which change caused this improvement/regression?"

---

## P5: Cooperation Must Be Measured, Not Assumed

**What:** Multi-agent setups must prove they produce genuine cooperation gain, not just resource accumulation.

**Why:** The [Collaboration Gain Metric (Γ)](https://arxiv.org/abs/2602.05289) shows that conventional metrics conflate intrinsic cooperation gain with improvements from more compute. Many multi-agent systems underperform a single agent with equivalent token budget.

**How:**
- For every multi-agent workflow, ask: "Would a single agent with 2x tokens do the same?"
- Track Γ: cooperation gain = multi-agent quality minus single-agent quality at same cost
- If Γ ≤ 0, simplify to single agent
- Measure: "What is the Γ for each of our multi-agent workflows?"

---

*These principles are living documents. They evolve as the research base grows.*
