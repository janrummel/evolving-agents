---
layout: default
title: Home
nav_order: 1
description: "Why do some AI agent systems get better over time? Nowak's math, 50+ papers, 7 principles, and an interactive simulation."
---

<style>
.hero-question{font-size:1.6em;font-weight:300;color:#c9d1d9;line-height:1.4;margin:2em 0 0.5em}
.hero-answer{font-size:1.1em;color:#8b949e;margin-bottom:2em}
.sim-container{background:#0d1117;border:1px solid #30363d;border-radius:12px;padding:24px;margin:2em 0}
.sim-container canvas{width:100%;max-width:600px;display:block;margin:0 auto 16px;border-radius:6px;touch-action:none}
.sim-controls{display:flex;align-items:center;gap:12px;justify-content:center;flex-wrap:wrap;padding:0 8px}
.sim-controls input[type=range]{width:200px;max-width:50vw}
.sim-controls label{color:#8b949e;font-size:0.9em}
.sim-controls input[type=range]{width:200px;accent-color:#1f6feb}
.sim-controls .r-val{font-family:monospace;color:#e6edf3;font-size:1.1em;min-width:3em}
#phase-label{text-align:center;margin-top:12px;font-size:0.95em;font-weight:600;min-height:1.5em}
.eq-highlight{background:#161b22;border-left:3px solid #1f6feb;padding:16px 20px;margin:1.5em 0;border-radius:0 8px 8px 0;overflow-x:auto}
.eq-highlight code{font-size:1.15em;color:#e6edf3;letter-spacing:0.3px}
@media(max-width:480px){.eq-highlight code{font-size:0.9em;letter-spacing:0}.eq-highlight>div{gap:8px!important}}
.bridge-grid{display:grid;grid-template-columns:1fr 40px 1fr;gap:0;margin:2em 0}
.bridge-col{padding:20px}
.bridge-col h3{margin-top:0;font-size:1em;text-transform:uppercase;letter-spacing:1px}
.bridge-col.bio{border-right:none}
.bridge-col.arrow{display:flex;align-items:center;justify-content:center;font-size:1.5em;color:#1f6feb}
.bridge-col.agent{border-left:none}
@media(max-width:600px){.bridge-grid{grid-template-columns:1fr;gap:8px}.bridge-col.arrow{transform:rotate(90deg);padding:4px}}
.bridge-item{background:#161b22;border:1px solid #30363d;border-radius:8px;padding:12px 16px;margin-bottom:8px;font-size:0.9em}
.bridge-item .term{color:#58a6ff;font-weight:600}
.bridge-item .desc{color:#8b949e;font-size:0.85em;margin-top:4px}
.journey-step{display:flex;align-items:flex-start;gap:20px;margin:1.5em 0;padding:16px;border-radius:8px;background:#161b22;border:1px solid #30363d}
.journey-step .step-num{background:#1f6feb;color:white;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0}
.journey-step .step-content h4{margin:0 0 4px;color:#e6edf3}
.journey-step .step-content p{margin:0;color:#8b949e;font-size:0.9em}
.cta-box{background:linear-gradient(135deg,#1e3a5f,#0d1117);border:1px solid #30363d;border-radius:12px;padding:32px;text-align:center;margin:2em 0}
.cta-box h3{color:#e6edf3;margin-top:0}
.cta-box p{color:#8b949e}
.stat-row{display:flex;justify-content:center;gap:32px;flex-wrap:wrap;margin:1em 0}
.stat-item{text-align:center}
.stat-number{display:block;font-size:2em;font-weight:700;color:#58a6ff}
.stat-label{font-size:0.85em;color:#8b949e}
</style>

<!-- HERO -->
<div lang="en" markdown="1">
<p class="hero-question">Why do some AI agent systems get <em>better</em> over time — while others just get more complex?</p>
<p class="hero-answer">Martin Nowak answered this question for biology 20 years ago. The math already exists. We explored how it maps to AI agents.</p>
</div>

<div lang="de" markdown="1">
<p class="hero-question">Warum werden manche KI-Agent-Systeme mit der Zeit <em>besser</em> — während andere nur komplexer werden?</p>
<p class="hero-answer">Martin Nowak hat diese Frage für die Biologie vor 20 Jahren beantwortet. Die Mathematik existiert bereits. Wir untersuchen, wie sie sich auf KI-Agents übertragen lässt.</p>
</div>

---

<!-- INTERACTIVE ORIGINATOR EQUATION -->
<div lang="en" markdown="1">
<h2>Try It: The Phase Transition</h2>
<p>Nowak's Originator Equation describes when a system transitions from random diversity (<strong>Prelife</strong>) to directed evolution (<strong>Life</strong>).</p>
</div>

<div lang="de" markdown="1">
<h2>Ausprobieren: Der Phasenübergang</h2>
<p>Nowaks Originator-Gleichung beschreibt, wann ein System von zufälliger Diversität (<strong>Prelife</strong>) zu gerichteter Evolution (<strong>Life</strong>) übergeht.</p>
</div>

<div class="sim-container">
  <div lang="en" style="text-align:center;color:#8b949e;font-size:0.9em;margin-bottom:8px">Drag the slider to see the phase transition →</div>
  <div lang="de" style="text-align:center;color:#8b949e;font-size:0.9em;margin-bottom:8px">Ziehe den Regler, um den Phasenübergang zu sehen →</div>
  <canvas id="originator-canvas"></canvas>
  <div class="sim-controls">
    <label for="r-slider"><span lang="en">Replication rate</span><span lang="de">Replikationsrate</span> <code>r</code></label>
    <input type="range" id="r-slider" min="0" max="1" step="0.01" value="0">
    <span class="r-val" id="r-value">0.00</span>
  </div>
  <div id="phase-label">◀ Prelife — no replication, random diversity</div>
</div>

<details style="margin:12px 0;font-size:0.85em">
  <summary style="cursor:pointer;color:#8b949e"><span lang="en"><strong style="color:#e6edf3">ℹ How to read this chart</strong></span><span lang="de"><strong style="color:#e6edf3">ℹ So liest du die Grafik</strong></span></summary>
  <div style="padding:12px 16px;background:rgba(255,255,255,.03);border:1px solid var(--border-color,#30363d);border-radius:0 0 8px 8px">
    <div lang="en">
      <ul style="margin:6px 0 0;padding-left:18px;color:#8b949e;line-height:1.7">
        <li><strong style="color:#c9d1d9">80 bars</strong> = 80 molecular sequences competing in a chemical soup</li>
        <li><strong style="color:#c9d1d9">Bar height</strong> = frequency (share of the population)</li>
        <li><strong style="color:#c9d1d9">Bar color</strong>: <span style="color:#f59e0b">■ amber</span> = Prelife dominates · <span style="color:#34d399">■ green</span> = Selection dominates · brighter = fitter</li>
        <li><strong style="color:#c9d1d9">Slider r</strong> = replication rate — how much template-directed copying happens</li>
      </ul>
    </div>
    <div lang="de">
      <ul style="margin:6px 0 0;padding-left:18px;color:#8b949e;line-height:1.7">
        <li><strong style="color:#c9d1d9">80 Balken</strong> = 80 molekulare Sequenzen, die in einer chemischen Suppe konkurrieren</li>
        <li><strong style="color:#c9d1d9">Balkenhöhe</strong> = Häufigkeit (Anteil an der Population)</li>
        <li><strong style="color:#c9d1d9">Balkenfarbe</strong>: <span style="color:#f59e0b">■ amber</span> = Prelife dominiert · <span style="color:#34d399">■ grün</span> = Selektion dominiert · heller = fitter</li>
        <li><strong style="color:#c9d1d9">Regler r</strong> = Replikationsrate — wie viel template-gesteuerte Kopierung stattfindet</li>
      </ul>
    </div>
  </div>
</details>

<div class="eq-highlight">
  <code style="font-size:1.1em">ẋᵢ = <span style="color:#f59e0b;font-weight:700">aᵢ · xᵢ'</span> − <span style="color:#f87171;font-weight:700">(d + aᵢ₀ + aᵢ₁) · xᵢ</span> + <span style="color:#34d399;font-weight:700">r · xᵢ · (fᵢ − φ)</span></code>
  <div style="display:flex;gap:16px;margin-top:12px;flex-wrap:wrap;justify-content:center">
    <div style="text-align:center;min-width:120px">
      <div style="color:#f59e0b;font-size:0.8em;font-weight:600;text-transform:uppercase;letter-spacing:1px"><span lang="en">Prelife</span><span lang="de">Prelife</span></div>
      <div style="color:#f59e0b;font-family:monospace;font-size:1.3em;font-weight:700" id="term-prelife">0.00</div>
      <div style="color:#8b949e;font-size:0.75em"><span lang="en">chemistry creates</span><span lang="de">Chemie erzeugt</span></div>
    </div>
    <div style="text-align:center;min-width:120px">
      <div style="color:#f87171;font-size:0.8em;font-weight:600;text-transform:uppercase;letter-spacing:1px"><span lang="en">Decay</span><span lang="de">Zerfall</span></div>
      <div style="color:#f87171;font-family:monospace;font-size:1.3em;font-weight:700" id="term-decay">0.00</div>
      <div style="color:#8b949e;font-size:0.75em"><span lang="en">champion degrades</span><span lang="de">Champion zerfällt</span></div>
    </div>
    <div style="text-align:center;min-width:120px">
      <div style="color:#34d399;font-size:0.8em;font-weight:600;text-transform:uppercase;letter-spacing:1px"><span lang="en">Selection</span><span lang="de">Selektion</span></div>
      <div style="color:#34d399;font-family:monospace;font-size:1.3em;font-weight:700" id="term-selection">0.00</div>
      <div style="color:#8b949e;font-size:0.75em"><span lang="en">champion replicates</span><span lang="de">Champion repliziert</span></div>
    </div>
  </div>
</div>

<div lang="en" markdown="1">
<a href="/evolving-agents/research/nowak-synthesis" style="color:#58a6ff">Full mathematical synthesis →</a>
</div>
<div lang="de" markdown="1">
<a href="/evolving-agents/research/nowak-synthesis" style="color:#58a6ff">Vollständige mathematische Synthese →</a>
</div>

---

<!-- PRELIFE INSIGHT -->
<div lang="en" markdown="1">
<details style="margin:1.5em 0;background:#161b22;border:1px solid #30363d;border-radius:8px;padding:4px 16px">
<summary style="cursor:pointer;padding:12px 0;font-size:1.05em"><strong>🔬 Why Current Agent Systems Are in the Prelife Phase</strong></summary>

Following Nowak's terminology, most agent systems today — including AgentField — are in the **"Prelife" phase**: There is diversity (~30 skills) and selection (Quality Gate), but no **replication** — no automatic inheritance of successful patterns.

This is not a problem. Prelife is already generative. But the step to "Life" mode is missing: the closed evolutionary loop.

**The Missing Loop:**

```
IS:   Task → Skill Selection → Execution → [Quality Gate] → Output
                                                ↓
                                         (Feedback dies here)

SHOULD: Task → Skill Selection → Execution → [Quality Gate] → Output
                ↑                                ↓
                └──── Skill Mutation ←── Evaluation + Cost ──┘
```

**What would close the loop:**

1. **Cost tracking** as a second optimization axis
2. **Skill performance history** (which skill → which task → which score)
3. **Automated prompt mutation** (small variations, A/B testing)
4. **Niching** (multiple skill variants per task type, preserving diversity)

EvoFlow shows empirically: The step from Phase 0 (manual workflows) to Phase 3 (evolved population) yields 1.23–29.86% improvement at 12.4% of the cost. This is not a hypothetical gain.

*Identified: 2026-03-19, during EvoFlow/MCE/AgentFactory Deep Dive*

</details>
</div>

<div lang="de" markdown="1">
<details style="margin:1.5em 0;background:#161b22;border:1px solid #30363d;border-radius:8px;padding:4px 16px">
<summary style="cursor:pointer;padding:12px 0;font-size:1.05em"><strong>🔬 Warum aktuelle Agent-Systeme in der Prelife-Phase sind</strong></summary>

Nach Nowaks Terminologie befinden sich die meisten Agent-Systeme heute — einschließlich AgentField — in der **"Prelife"-Phase**: Es gibt Diversität (~30 Skills) und Selektion (Quality-Gate), aber keine **Replikation** — keine automatische Vererbung erfolgreicher Muster.

Das ist nicht schlimm. Prelife ist bereits generativ. Aber es fehlt der Schritt zum "Life"-Modus: der geschlossene evolutionäre Loop.

**Der fehlende Loop:**

```
IST:  Task → Skill-Auswahl → Execution → [Quality-Gate] → Output
                                                ↓
                                         (Feedback stirbt hier)

SOLL: Task → Skill-Auswahl → Execution → [Quality-Gate] → Output
                ↑                              ↓
                └──── Skill-Mutation ←── Evaluation + Cost ──┘
```

**Was den Loop schließen würde:**

1. **Cost-Tracking** als zweite Optimierungsachse
2. **Skill-Performance-Historie** (welcher Skill → welcher Task → welcher Score)
3. **Automatisierte Prompt-Mutation** (kleine Variationen, A/B-Test)
4. **Niching** (mehrere Skill-Varianten pro Task-Typ, Diversität erhalten)

EvoFlow zeigt empirisch: Der Schritt von Phase 0 (manuelle Workflows) zu Phase 3 (evolvierte Population) bringt 1.23–29.86% Verbesserung bei 12,4% der Kosten. Das ist kein hypothetischer Gewinn.

*Erkannt: 2026-03-19, während EvoFlow/MCE/AgentFactory Deep Dive*

</details>
</div>

---

<!-- THE BRIDGE -->
<div lang="en" markdown="1">
<h2>The Bridge: Biology → AI Agents</h2>
<p>The same dynamics that govern biological evolution map structurally onto AI agent systems:</p>
</div>
<div lang="de" markdown="1">
<h2>Die Brücke: Biologie → KI-Agents</h2>
<p>Dieselben Dynamiken, die biologische Evolution bestimmen, lassen sich strukturell auf KI-Agent-Systeme übertragen:</p>
</div>

<div class="bridge-grid">
  <div class="bridge-col bio">
    <h3 style="color:#34d399"><span lang="en">Biology (Nowak)</span><span lang="de">Biologie (Nowak)</span></h3>
    <div class="bridge-item">
      <div class="term">Sequence / Replicator</div>
      <div class="desc"><span lang="en">DNA that gets copied</span><span lang="de">DNA die kopiert wird</span></div>
    </div>
    <div class="bridge-item">
      <div class="term">Fitness fᵢ</div>
      <div class="desc"><span lang="en">Reproductive success</span><span lang="de">Reproduktionserfolg</span></div>
    </div>
    <div class="bridge-item">
      <div class="term">Mutation</div>
      <div class="desc"><span lang="en">Random copying errors</span><span lang="de">Zufällige Kopierfehler</span></div>
    </div>
    <div class="bridge-item">
      <div class="term">Selection φ</div>
      <div class="desc"><span lang="en">Survive or die</span><span lang="de">Überleben oder sterben</span></div>
    </div>
    <div class="bridge-item">
      <div class="term">Error Threshold</div>
      <div class="desc"><span lang="en">Too many mutations → meltdown</span><span lang="de">Zu viele Mutationen → Meltdown</span></div>
    </div>
  </div>
  <div class="bridge-col arrow">↔</div>
  <div class="bridge-col agent">
    <h3 style="color:#58a6ff"><span lang="en">AI Agent System</span><span lang="de">KI-Agent-System</span></h3>
    <div class="bridge-item">
      <div class="term"><span lang="en">Agent Config</span><span lang="de">Agent-Konfiguration</span></div>
      <div class="desc"><span lang="en">Prompt + tools + memory</span><span lang="de">Prompt + Tools + Memory</span></div>
    </div>
    <div class="bridge-item">
      <div class="term">Performance Metric</div>
      <div class="desc"><span lang="en">Quality score + token cost</span><span lang="de">Quality Score + Token-Kosten</span></div>
    </div>
    <div class="bridge-item">
      <div class="term"><span lang="en">Prompt Variation</span><span lang="de">Prompt-Variation</span></div>
      <div class="desc"><span lang="en">A/B testing, TextGrad</span><span lang="de">A/B-Testing, TextGrad</span></div>
    </div>
    <div class="bridge-item">
      <div class="term">Quality Gate</div>
      <div class="desc"><span lang="en">Keep or discard</span><span lang="de">Behalten oder verwerfen</span></div>
    </div>
    <div class="bridge-item">
      <div class="term">Context Limit</div>
      <div class="desc"><span lang="en">Too many changes → quality collapse</span><span lang="de">Zu viele Änderungen → Qualitätskollaps</span></div>
    </div>
  </div>
</div>

<div lang="en" markdown="1">

> This is a **structural analogy**, not a formal proof. Agent evolution is [Lamarckian, not Darwinian](/evolving-agents/research/counter-arguments#g1-agent-systeme-sind-lamarckisch-nicht-darwinistisch-stark). We document [9 counter-arguments](/evolving-agents/research/counter-arguments) — 3 rated STRONG.
{: .transparency }

</div>
<div lang="de" markdown="1">

> Dies ist eine **strukturelle Analogie**, kein formaler Beweis. Agent-Evolution ist [lamarckisch, nicht darwinistisch](/evolving-agents/research/counter-arguments#g1-agent-systeme-sind-lamarckisch-nicht-darwinistisch-stark). Wir dokumentieren [9 Gegenargumente](/evolving-agents/research/counter-arguments) — 3 als STARK bewertet.
{: .transparency }

</div>

---

<!-- THE JOURNEY -->
<div lang="en" markdown="1">
<h2>The Upgrade Path</h2>
<p>Where is your agent system on the evolutionary ladder?</p>
</div>
<div lang="de" markdown="1">
<h2>Der Upgrade-Pfad</h2>
<p>Wo steht dein Agent-System auf der evolutionären Leiter?</p>
</div>

<div lang="en" markdown="1">
<div class="journey-step">
  <div class="step-num" style="background:#78350f">0</div>
  <div class="step-content">
    <h4>Prelife <span style="color:#f59e0b;font-size:0.8em">← Most systems are here</span></h4>
    <p>Manual curation. You write prompts, pick tools, evaluate by hand. There's diversity, but no heredity — good patterns don't automatically persist.</p>
  </div>
</div>
<div class="journey-step">
  <div class="step-num" style="background:#1e3a5f">1</div>
  <div class="step-content">
    <h4>Feedback Loop <span style="color:#60a5fa;font-size:0.8em">← Spec ready</span></h4>
    <p>Measure quality + cost per skill execution. SQL schema, Pareto views, alert triggers. You can see what works — but changes are still manual.</p>
  </div>
</div>
<div class="journey-step">
  <div class="step-num">2</div>
  <div class="step-content">
    <h4>Mutation</h4>
    <p>A/B test prompt variations automatically. Keep winners, discard losers. The system starts improving itself.</p>
  </div>
</div>
<div class="journey-step">
  <div class="step-num">3</div>
  <div class="step-content">
    <h4>Population</h4>
    <p>Maintain diverse skill variants via niching. Quality-Diversity optimization instead of single-best-solution thinking.</p>
  </div>
</div>
<div class="journey-step">
  <div class="step-num" style="background:#064e3b">4</div>
  <div class="step-content">
    <h4>Full Evolution</h4>
    <p>The phase transition: autonomous improvement faster than manual curation. EvoFlow shows this is already possible — at 12.4% the cost of o1-preview.</p>
  </div>
</div>
</div>

<div lang="de" markdown="1">
<div class="journey-step">
  <div class="step-num" style="background:#78350f">0</div>
  <div class="step-content">
    <h4>Prelife <span style="color:#f59e0b;font-size:0.8em">← Die meisten Systeme sind hier</span></h4>
    <p>Manuelle Kuration. Du schreibst Prompts, wählst Tools, evaluierst von Hand. Es gibt Diversität, aber keine Vererbung — gute Muster persistieren nicht automatisch.</p>
  </div>
</div>
<div class="journey-step">
  <div class="step-num" style="background:#1e3a5f">1</div>
  <div class="step-content">
    <h4>Feedback-Loop <span style="color:#60a5fa;font-size:0.8em">← Spec bereit</span></h4>
    <p>Qualität + Kosten pro Skill-Ausführung messen. SQL-Schema, Pareto-Views, Alert-Trigger. Du siehst was funktioniert — aber Änderungen sind noch manuell.</p>
  </div>
</div>
<div class="journey-step">
  <div class="step-num">2</div>
  <div class="step-content">
    <h4>Mutation</h4>
    <p>Prompt-Variationen automatisch A/B-testen. Gewinner behalten, Verlierer verwerfen. Das System beginnt, sich selbst zu verbessern.</p>
  </div>
</div>
<div class="journey-step">
  <div class="step-num">3</div>
  <div class="step-content">
    <h4>Population</h4>
    <p>Diverse Skill-Varianten via Niching pflegen. Quality-Diversity-Optimierung statt Single-Best-Solution-Denken.</p>
  </div>
</div>
<div class="journey-step">
  <div class="step-num" style="background:#064e3b">4</div>
  <div class="step-content">
    <h4>Volle Evolution</h4>
    <p>Der Phasenübergang: Autonome Verbesserung schneller als manuelle Kuration. EvoFlow zeigt, dass das bereits möglich ist — bei 12,4% der Kosten von o1-preview.</p>
  </div>
</div>
</div>

---

<div class="stat-row">
  <div class="stat-item">
    <span class="stat-number">50+</span>
    <span class="stat-label">Papers</span>
  </div>
  <div class="stat-item">
    <span class="stat-number">7</span>
    <span class="stat-label"><span lang="en">Principles</span><span lang="de">Prinzipien</span></span>
  </div>
  <div class="stat-item">
    <span class="stat-number">9</span>
    <span class="stat-label"><span lang="en">Counter-Arguments</span><span lang="de">Gegenargumente</span></span>
  </div>
</div>

---

<!-- EXPLORE -->
<div lang="en" markdown="1">
<h2>Dive Deeper</h2>
<div class="feature-grid">
  <div class="feature-card">
    <h3>📐 Nowak Synthesis</h3>
    <p>The Originator equation, phase transitions, error threshold — the full mathematical bridge.</p>
    <a href="/evolving-agents/research/nowak-synthesis">Read →</a>
  </div>
  <div class="feature-card">
    <h3>📄 50+ Papers</h3>
    <p>9 categories, 15 must-reads. Prioritized and linked to arXiv.</p>
    <a href="/evolving-agents/research/paper-registry">Browse →</a>
  </div>
  <div class="feature-card">
    <h3>🔬 EvoFlow Deep Dive</h3>
    <p>How 3 papers bridge evolutionary theory to agent practice.</p>
    <a href="/evolving-agents/research/deep-dive-evoflow-mce-agentfactory">Read →</a>
  </div>
  <div class="feature-card">
    <h3>🧭 7 Principles</h3>
    <p>Actionable design rules from evolutionary theory.</p>
    <a href="/evolving-agents/principles/">Explore →</a>
  </div>
  <div class="feature-card">
    <h3>⚔️ Counter-Arguments</h3>
    <p>9 critiques. 3 rated STRONG. Where the thesis breaks.</p>
    <a href="/evolving-agents/research/counter-arguments">Read →</a>
  </div>
  <div class="feature-card">
    <h3>🔧 Phase 1 Spec</h3>
    <p>SQL schema, Pareto views. Ready to implement today.</p>
    <a href="/evolving-agents/specs/phase-1-feedback-loop">See spec →</a>
  </div>
</div>
</div>

<div lang="de" markdown="1">
<h2>Tiefer eintauchen</h2>
<div class="feature-grid">
  <div class="feature-card">
    <h3>📐 Nowak-Synthese</h3>
    <p>Die Originator-Gleichung, Phasenübergänge, Error Threshold — die vollständige mathematische Brücke.</p>
    <a href="/evolving-agents/research/nowak-synthesis">Lesen →</a>
  </div>
  <div class="feature-card">
    <h3>📄 50+ Papers</h3>
    <p>9 Kategorien, 15 Must-Reads. Priorisiert und mit arXiv verlinkt.</p>
    <a href="/evolving-agents/research/paper-registry">Durchsuchen →</a>
  </div>
  <div class="feature-card">
    <h3>🔬 EvoFlow Deep Dive</h3>
    <p>Wie 3 Papers Evolutionstheorie mit Agent-Praxis verbinden.</p>
    <a href="/evolving-agents/research/deep-dive-evoflow-mce-agentfactory">Lesen →</a>
  </div>
  <div class="feature-card">
    <h3>🧭 7 Prinzipien</h3>
    <p>Handlungsorientierte Design-Regeln aus der Evolutionstheorie.</p>
    <a href="/evolving-agents/principles/">Erkunden →</a>
  </div>
  <div class="feature-card">
    <h3>⚔️ Gegenargumente</h3>
    <p>9 Kritiken. 3 als STARK bewertet. Wo die These bricht.</p>
    <a href="/evolving-agents/research/counter-arguments">Lesen →</a>
  </div>
  <div class="feature-card">
    <h3>🔧 Phase-1-Spec</h3>
    <p>SQL-Schema, Pareto-Views. Heute implementierbar.</p>
    <a href="/evolving-agents/specs/phase-1-feedback-loop">Spec ansehen →</a>
  </div>
</div>
</div>

---

<div lang="en" markdown="1">
<h2>FAQ</h2>
<details>
<summary><strong>Is this a formal proof?</strong></summary>
<p>No. It's a structural analogy — a design heuristic, not a mathematical proof. See <a href="/evolving-agents/research/counter-arguments">9 counter-arguments</a>.</p>
</details>
<details>
<summary><strong>Were these papers actually read?</strong></summary>
<p>Core papers read in full text. Broader corpus based on abstracts and summaries, cross-checked against 2+ sources. See <a href="/evolving-agents/meta/limitations">Limitations</a>.</p>
</details>
<details>
<summary><strong>What can I DO with this?</strong></summary>
<p>Use the <a href="/evolving-agents/principles/">7 principles</a> as a design checklist. Implement the <a href="/evolving-agents/specs/phase-1-feedback-loop">Phase 1 feedback loop</a>. Read the <a href="/evolving-agents/research/paper-registry">50+ papers</a>.</p>
</details>
</div>

<div lang="de" markdown="1">
<h2>FAQ</h2>
<details>
<summary><strong>Ist das ein formaler Beweis?</strong></summary>
<p>Nein. Es ist eine strukturelle Analogie — eine Design-Heuristik, kein mathematischer Beweis. Siehe <a href="/evolving-agents/research/counter-arguments">9 Gegenargumente</a>.</p>
</details>
<details>
<summary><strong>Wurden die Papers gelesen?</strong></summary>
<p>Kern-Papers im Volltext gelesen. Breiterer Corpus basierend auf Abstracts und Zusammenfassungen, gegen 2+ Quellen geprüft. Siehe <a href="/evolving-agents/meta/limitations">Limitationen</a>.</p>
</details>
<details>
<summary><strong>Was kann ich damit machen?</strong></summary>
<p>Die <a href="/evolving-agents/principles/">7 Prinzipien</a> als Design-Checkliste nutzen. Den <a href="/evolving-agents/specs/phase-1-feedback-loop">Phase-1-Feedback-Loop</a> implementieren. Die <a href="/evolving-agents/research/paper-registry">50+ Papers</a> lesen.</p>
</details>
</div>

---

<div lang="en" markdown="1">
> This is a **research synthesis**, not a systematic review. Analysis is based on abstracts, summaries, and cross-verified data from 50+ papers. Counter-arguments [documented](/evolving-agents/research/counter-arguments). [Full limitations →](/evolving-agents/meta/limitations)
{: .warning }
</div>
<div lang="de" markdown="1">
> Dies ist eine **Forschungssynthese**, kein systematisches Review. Die Analyse basiert auf Abstracts, Zusammenfassungen und kreuzverifizierten Daten aus 50+ Papers. Gegenargumente [dokumentiert](/evolving-agents/research/counter-arguments). [Vollständige Limitationen →](/evolving-agents/meta/limitations)
{: .warning }
</div>

<script src="/evolving-agents/assets/js/originator-sim.js"></script>
