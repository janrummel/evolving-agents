---
layout: default
title: "AgentField = Prelife"
parent: Meta
nav_order: 3
nav_exclude: true
---

# Learning L9: AgentField ist in der Prelife-Phase

**Erkannt:** 2026-03-19, während EvoFlow/MCE/AgentFactory Deep Dive

## Erkenntnis

Nach Nowaks Terminologie befindet sich AgentField in der **"Prelife"-Phase**: Es gibt Diversität (~30 Skills) und Selektion (Quality-Gate), aber keine **Replikation** — keine automatische Vererbung erfolgreicher Muster.

Das ist nicht schlimm. Prelife ist bereits generativ. Aber es fehlt der Schritt zum "Life"-Modus: der geschlossene evolutionäre Loop.

## Der fehlende Loop

```
IST:  Task → Skill-Auswahl → Execution → [Quality-Gate] → Output
                                                ↓
                                         (Feedback stirbt hier)

SOLL: Task → Skill-Auswahl → Execution → [Quality-Gate] → Output
                ↑                              ↓
                └──── Skill-Mutation ←── Evaluation + Cost ──┘
```

## Was den Loop schließen würde

1. **Cost-Tracking** als zweite Optimierungsachse (Usage-Tracking liefert die Daten)
2. **Skill-Performance-Historie** (welcher Skill → welcher Task → welcher Score)
3. **Automatisierte Prompt-Mutation** (kleine Variationen, A/B-Test)
4. **Niching** (mehrere Skill-Varianten pro Task-Typ, Diversität erhalten)

## Warum das ein Learning und nicht nur Theorie ist

EvoFlow zeigt empirisch: Der Schritt von Phase 0 (manuelle Workflows) zu Phase 3 (evolvierte Population) bringt 1.23-29.86% Verbesserung bei 12.4% der Kosten. Das ist kein hypothetischer Gewinn.

## Implikation

Nicht alles auf einmal. Phase 1 (Feedback-Loop schließen) ist der einzige nächste Schritt. Alles andere folgt, sobald der Loop läuft.
