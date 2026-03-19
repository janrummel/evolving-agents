---
layout: default
title: Research Learnings
parent: Meta
nav_order: 2
---

# Research Process Learnings

Erkenntnisse aus der ersten Recherche-Runde (2026-03-19).
Jedes Learning ist für unser AgentField-System nutzbar.

---

## L1: Semantic Scholar API — Rate Limiting ist aggressiv

**Was passiert ist:** 3 parallele WebFetch-Calls an Semantic Scholar API → 2 von 3 gaben HTTP 429 (Too Many Requests). Auch sequentieller Retry nach wenigen Sekunden → erneut 429.

**Implikation für uns:**
- Semantic Scholar erlaubt ~1 Request/Sekunde ohne API Key
- Mit API Key (kostenlos, per Mail) → 100 Requests/Sekunde
- Unsere research-pipeline muss Calls sequentiell mit Cooldown machen, oder besser: API Key holen

**Systemverbesserung:**
- [ ] Semantic Scholar API Key beantragen (kostenlos)
- [ ] In research-pipeline: Rate-Limiter einbauen für API-Calls (1/s default, 100/s mit Key)
- [ ] Fallback-Strategie: Wenn API blockt → arXiv API als Alternative

**Prinzip:** *Externe APIs niemals parallel bombardieren ohne Rate-Limit-Check.*

---

## L2: GitHub Awesome-Listen > direkte API-Suche als Einstieg

**Was passiert ist:** Ein einziger WebFetch auf die [Awesome-Self-Evolving-Agents](https://github.com/EvoAgentX/Awesome-Self-Evolving-Agents) Liste lieferte sofort ~30 kategorisierte Papers mit Taxonomie, deutlich effizienter als 10 einzelne API-Calls.

**Implikation für uns:**
- Awesome-Listen sind kuratiert, strukturiert, aktuell (Community-maintained)
- Sie geben Taxonomie gratis mit — wie das Feld sich selbst organisiert
- Für neue Themen: Erst "awesome-[topic]" auf GitHub suchen, dann vertiefen

**Systemverbesserung:**
- [ ] In research-pipeline Schritt 1 ergänzen: "Prüfe ob awesome-[topic] auf GitHub existiert"
- [ ] learn-from-the-best Skill: GitHub Awesome-Listen als Heuristik-Quelle aufnehmen

**Prinzip:** *Kuratierte Community-Übersichten zuerst, dann eigene Suche für Lücken.*

---

## L3: arXiv API — zuverlässig, kein Rate Limit, XML-basiert

**Was passiert ist:** 3 parallele arXiv-API-Calls → alle 3 erfolgreich, zusammen 35 Papers. Kein Rate Limiting, sofort Ergebnisse.

**Implikation für uns:**
- arXiv API ist der robusteste Zugang für Paper-Discovery
- XML-Format wird von WebFetch gut verarbeitet
- Sortierung nach submittedDate gibt sofort die neuesten Papers

**Systemverbesserung:**
- [ ] arXiv als primäre Paper-Discovery-Quelle in research-pipeline einbauen
- [ ] Standard-Queries definieren für unsere Kern-Themen (monitoring-ready)

**Prinzip:** *Öffentliche, unlimitierte APIs bevorzugen. arXiv > Semantic Scholar für Discovery.*

---

## L4: Multilinguale Recherche bestätigt — chinesische Suche liefert ANDERE Ergebnisse

**Was passiert ist:** WebSearch mit chinesischen Zeichen (自进化 智能体 多智能体 进化算法 大模型) lieferte Ergebnisse, die in keiner englischen Suche auftauchten:
- Tsinghua AIR Talk von 刘洋 über "LLM-Driven Evolvable Agents"
- CAICT + Huawei Report über Agent-Technologie (Juni 2025)
- Zhihu-Diskussionen mit eigenen Perspektiven
- Foundation Agents Survey (MetaGPT + Mila, 47 Autoren)

**Implikation für uns:**
- ~30-50% der relevanten Arbeit ist nur über chinesische Suche auffindbar
- Zhihu (知乎) ist Chinas StackOverflow/Medium-Äquivalent — dort diskutieren Forscher informell
- CAICT Reports sind Chinas Äquivalent zu NIST/EU-Whitepapers

**Systemverbesserung:**
- [ ] research-pipeline um CJK-Modul erweitern:
  1. Kern-Keywords automatisch nach ZH/JA/KO übersetzen
  2. Separate Suche in jeder Sprache
  3. Ergebnisse zurück ins Deutsche/Englische übersetzen
- [ ] Zhihu (知乎) als Quelle für informelle Forschungsdiskussion aufnehmen
- [ ] CAICT, Tsinghua AIR, PKU als tracked institutions hinzufügen

**Prinzip:** *Wer nur auf Englisch sucht, findet nur die halbe Wahrheit. Sprach-Diversität = Wissens-Diversität.*

---

## L5: Das Feld bewegt sich mit Wochengeschwindigkeit

**Was passiert ist:** 12 relevante neue Papers allein in der ersten Märzhälfte 2026. AgentFactory (vorgestern!), SEMAG, SAGE, OpenHospital — alles brandneu.

**Implikation für uns:**
- Statische Literaturlisten sind nach 2 Wochen veraltet
- Ohne automatisches Monitoring verpassen wir schnell wichtige Entwicklungen
- Die Awesome-Liste wird community-maintained aktualisiert

**Systemverbesserung:**
- [ ] arXiv RSS/API-basiertes Weekly Digest für unsere Keywords einrichten
- [ ] Awareness-Metrik: "Wie alt ist unser neuester Eintrag?" als Monitoring-Signal

**Prinzip:** *In schnellen Feldern ist Monitoring wichtiger als einmalige Recherche.*

---

## L6: Brückenpaper existieren — EvoFlow ist der Missing Link

**Was passiert ist:** EvoFlow (2502.07373, 31 Zitationen) nutzt explizit Niching Evolutionary Algorithms (verwandt mit MAP-Elites/Quality-Diversity) für Agent-Workflow-Evolution. Es übertraf o1-preview um 2.7% bei 12.4% der Kosten.

**Implikation für uns:**
- Die Brücke Nowak → Agent-Systeme ist NICHT nur theoretisch — EvoFlow implementiert sie
- Niching-basierte Selektion = Nowaks Populationsdiversität in der Praxis
- Open-Source-Modelle + Evolution > einzelnes großes Modell (Kosten-/Performance-Argument)

**Für AgentField konkret:**
- EvoFlow's Architektur studieren: Tag-basiertes Retrieval + Crossover + Mutation + Niching Selection
- Prüfen ob unser Skill-System ähnliche Muster zeigt (Skills als "Individuen", Quality-Gate als "Selection")

**Prinzip:** *Suche immer nach dem Paper, das zwei Felder explizit verbindet. Es existiert fast immer.*

---

## L7: Meta Context Engineering = formalisiertes AgentField

**Was passiert ist:** MCE Paper (2601.21557) beschreibt genau das, was AgentField manuell tut: Skills und Context-Artefakte ko-evolvieren. Meta-Agent verfeinert Skills durch deliberative Search, Base-Agent führt aus. 5.6-53.8% Verbesserung über SOTA.

**Implikation für uns:**
- AgentField IST bereits ein (manuelles) MCE-System
- Der Schritt von manuell zu automatisiert ist formalisiert — wir müssen das Rad nicht neu erfinden
- Die "deliberative search over historical skills, executions, and evaluations" ist genau das, was unser improve-Skill ansatzweise tut

**Für AgentField konkret:**
- MCE-Paper im Detail studieren
- Prüfen welche MCE-Elemente wir automatisieren können
- Pulse-Metriken als "evaluation signal" für Skill-Evolution nutzen

**Prinzip:** *Wenn jemand das formalisiert hat was du manuell tust → studiere es. Es beschleunigt den nächsten Schritt.*

---

## L8: Die Nowak-Agent-Isomorphie ist NICHT einzigartig — andere sehen sie auch

**Was passiert ist:** "Evolutionary Systems Thinking" (2602.15957) argumentiert explizit für die Übertragung von Evolutionsdynamik auf komplexe adaptive Systeme inkl. AI. "Evolving Interpretable Constitutions" (2602.00755) verbindet Constitutional AI mit evolutionären Ansätzen für Multi-Agent-Koordination.

**Implikation für uns:**
- Unsere Nowak-Synthese ist nicht esoterisch — es gibt eine wachsende Community
- Aber: Niemand hat bisher Nowaks Originator-Gleichung explizit auf Agent-Systeme abgebildet (unsere unique contribution?)
- Die Isomorphie-Tabelle aus unserer Synthese könnte ein eigenständiger Beitrag werden

**Prinzip:** *Wenn andere ähnliches denken: Validierung. Wenn niemand den gleichen Winkel hat: Chance.*

---

## Zusammenfassung: Was ins AgentField-System zurückfließen sollte

### research-pipeline Verbesserungen
1. Awesome-Listen als Einstiegsheuristik
2. arXiv API als primäre Discovery-Quelle
3. Rate-Limiter für Semantic Scholar
4. CJK-Modul für multilinguale Suche
5. Automatisches Monitoring (weekly digest)

### Neue Werkzeug-Anforderungen
- Semantic Scholar API Key → research-pipeline Integration
- Translation-aware Search Wrapper
- Citation Graph Builder (Paper → Referenzen → Zitationen)
- arXiv RSS Digest via Trigger.dev

### Designprinzipien (neu abgeleitet)
- "Sprach-Diversität = Wissens-Diversität"
- "Kuratierte Listen zuerst, eigene Suche für Lücken"
- "In schnellen Feldern: Monitoring > einmalige Recherche"
- "Suche nach Brückenpapern zwischen Feldern"
