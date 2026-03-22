---
layout: default
title: Engineering
description: "Engineering specifications and implementation roadmap for the Prelife-to-Life transition in agent systems."
nav_order: 4
has_children: true
---

<div lang="en" markdown="1">

# Engineering Specs

Concrete implementation plans derived from the research.
{: .fs-6 .fw-300 }

## Phase 1: Feedback Loop — Measuring Before Optimizing

The foundation: before an agent system can evolve, it must be observable. Phase 1 builds the measurement infrastructure.

| Document | Focus |
|:---------|:------|
| [Feedback Loop Spec](phase-1-feedback-loop) | **What to measure:** SQL schema, 7 KPIs, Pareto views, alert triggers |
| [Implementation Guide](../implementation/phase-1/README) | **How to build it:** Scripts, automation, deployment details |

## Roadmap

| Phase | Goal | Status |
|:------|:-----|:-------|
| **Phase 1: Measure** | Observe quality + cost per skill execution | Spec ready, partially deployed |
| Phase 2: Mutate | A/B test prompt variations automatically | Planned |
| Phase 3: Population | Maintain diverse skill variants via niching | Research phase |
| Phase 4: Full Evolution | Autonomous improvement faster than manual curation | Long-term |

Each phase builds on the previous one — see [Principles P3](/evolving-agents/principles/#p3-feedback-loops-as-selection-pressure) and [P4](/evolving-agents/principles/#p4-respect-the-error-threshold) for the theoretical basis.

</div>

<div lang="de" markdown="1">

# Engineering-Specs

Konkrete Implementierungspläne, abgeleitet aus der Forschung.
{: .fs-6 .fw-300 }

## Phase 1: Feedback-Loop — Messen vor Optimieren

Das Fundament: Bevor ein Agent-System evolvieren kann, muss es beobachtbar sein. Phase 1 baut die Messinfrastruktur.

| Dokument | Fokus |
|:---------|:------|
| [Feedback-Loop-Spec](phase-1-feedback-loop) | **Was messen:** SQL-Schema, 7 KPIs, Pareto-Views, Alert-Trigger |
| [Implementierungs-Guide](../implementation/phase-1/README) | **Wie bauen:** Scripts, Automatisierung, Deployment-Details |

## Roadmap

| Phase | Ziel | Status |
|:------|:-----|:-------|
| **Phase 1: Messen** | Qualität + Kosten pro Skill-Ausführung beobachten | Spec bereit, teilweise deployed |
| Phase 2: Mutieren | Prompt-Variationen automatisch A/B-testen | Geplant |
| Phase 3: Population | Diverse Skill-Varianten via Niching pflegen | Forschungsphase |
| Phase 4: Volle Evolution | Autonome Verbesserung schneller als manuelle Kuration | Langfristig |

Jede Phase baut auf der vorherigen auf — siehe [Prinzipien P3](/evolving-agents/principles/#p3-feedback-loops-als-selektionsdruck) und [P4](/evolving-agents/principles/#p4-den-error-threshold-respektieren) für die theoretische Basis.

</div>
