# Audit-Matrix: evolving-agents Website

**Datum:** 2026-03-22
**Methode:** Jede Seite gegen 5 Expertenrollen bewertet
**Skala:** 🔴 kritisch · 🟡 verbesserbar · 🟢 solide

---

## Übersicht: 5 Kernseiten

| Seite | 🔬 Wissenschaft | 🎓 Didaktik | 💻 Engineering | ⚔️ Advocatus | 🌐 Web-UX |
|-------|:-:|:-:|:-:|:-:|:-:|
| **Homepage** | 🟢 | 🟡 | 🟢 | 🟢 | 🟡 |
| **Nowak-Synthese** | 🟢 | 🟡 | 🟡 | 🟢 | 🟡 |
| **Counter-Arguments** | 🟢 | 🟢 | — | 🟢 | 🟡 |
| **Principles** | 🟢 | 🟢 | 🟡 | 🟡 | 🟢 |
| **Deep Dive** | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |

## Übersicht: 11 Nebeseiten

| Seite | 🔬 | 🎓 | 💻 | ⚔️ | 🌐 |
|-------|:-:|:-:|:-:|:-:|:-:|
| Paper Registry | 🟢 | 🟡 | — | 🟡 | 🟡 |
| Open Questions | 🟡 | 🟡 | 🟡 | 🟡 | 🟢 |
| Phase-1 Spec | 🟢 | 🟡 | 🟢 | 🟡 | 🟡 |
| Implementation | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |
| Limitations | 🟢 | 🟢 | — | 🟢 | 🟢 |
| Research Toolkit | 🟡 | 🟡 | — | 🟡 | 🟡 |
| Research Learnings | 🟡 | 🟡 | — | 🟡 | 🟡 |
| AgentField = Prelife | 🟡 | 🟡 | — | 🟡 | 🟡 |
| Monitoring Keywords | 🟡 | 🟡 | — | — | 🟡 |
| research/index.md | — | 🟡 | — | — | 🔴 |
| specs/index.md | — | 🟡 | — | — | 🔴 |

---

## Detaillierte Findings

### 1. Homepage (index.md)

#### 🔬 Wissenschaftler — 🟢 SOLIDE
- ✅ Transparenzhinweis vorhanden
- ✅ Quellenlinks (Nowak PNAS 2008, EvoFlow arXiv)
- ✅ "Strukturelle Analogie, kein formaler Beweis" explizit
- ✅ Counter-Arguments verlinkt
- 🟡 EvoFlow-Claim "12.4% der Kosten von o1-preview" — Quelle nicht direkt verlinkt an der Stelle
- 🟡 "55+ Papers" Zahl sollte verifiziert werden (Paper Registry hat ~25 eingetragene, Rest in welcher Quelle?)

#### 🎓 Didaktiker — 🟡 VERBESSERBAR
- ✅ Hero-Frage als Hook — exzellent
- ✅ Simulator als interaktives Element — stark
- ✅ Bridge-Tabelle (Bio ↔ AI) visuell klar
- ✅ Upgrade-Pfad als Journey-Steps — gut
- 🔴 **Simulator-Erklärung ("How to read") zu lang und textlastig** — 4 Bullet Points + Erklärtext vor dem eigentlichen Erlebnis. Nutzer wollen erst spielen, dann verstehen.
- 🟡 **Zu viel Content auf einer Seite** — Hero + Simulator + Bridge + Journey + Stats + Feature Cards + FAQ + Disclaimer = 7 Sektionen. Cognitive Load hoch.
- 🟡 **"Prelife" nicht erklärt beim ersten Vorkommen** im Hero-Text. Wort taucht als selbstverständlich auf.
- 🟡 **Journey Steps 2-4 sind vage** — "Mutation", "Population", "Full Evolution" ohne konkretes Beispiel was das PRAKTISCH bedeutet.

#### 💻 Ingenieur — 🟢 SOLIDE
- ✅ Phase-1-Spec verlinkt (umsetzbar)
- ✅ Simulator-Code sauber, IIFE, keine globalen Variablen
- 🟡 Simulator-JS nicht minifiziert (Micro-Optimierung, unwichtig)

#### ⚔️ Advocatus Diaboli — 🟢 SOLIDE
- ✅ "Structural analogy, not formal proof" — Disclaimer prominent
- ✅ Counter-Arguments verlinkt mit Zahl (9, davon 3 STRONG)
- ✅ FAQ "Is this a formal proof?" — beantwortet direkt
- ✅ "Lamarckian, not Darwinian" verlinkt
- 🟡 Hero-Answer "We mapped it to AI agents" klingt definitiver als der tatsächliche Stand — eher "We explored the mapping"

#### 🌐 Web-UX — 🟡 VERBESSERBAR
- ✅ Responsive Feature-Grid
- ✅ Bilingualer Toggle funktioniert
- 🔴 **Bridge-Grid bricht auf Mobile** — 3-Spalten-Grid (bio | ↔ | agent) wird auf schmalen Screens unlesbar
- 🟡 **Keine OG-Image/Meta-Description** für Social Sharing
- 🟡 **Canvas hardcoded 600×240** — skaliert per CSS, aber wird auf Retina-Displays unscharf
- 🟡 **Farbkontrast im Simulator** — amber auf dunklem Hintergrund ist grenzwertig (WCAG AA nicht geprüft)
- 🟡 **Kein Loading State** für den Simulator — Canvas ist kurz weiß bevor JS lädt
- 🟡 **Stats-Row (55+ / 7 / 9) ohne Kontext** — Zahlen ohne erklärenden Satz wirken wie Marketing

---

### 2. Nowak-Synthese (nowak-synthesis.md)

#### 🔬 Wissenschaftler — 🟢 SOLIDE
- ✅ Volltext-verifizierte Variablen (12 Definitionen aus Paper)
- ✅ Numerische Beispiele mit konkreten Werten (rc=1.572, uc=0.058)
- ✅ Theorem korrekt wiedergegeben
- ✅ Transparenzhinweis: "Kern-Papers im Volltext gelesen"
- ✅ Quellenliste mit arXiv-Links
- 🟡 **§2.3 "Self-Evolving Agents" zitiert arXiv:2507.21046 (Juli 2025)** — existiert die ID wirklich? Jahreszahl 2507 im arXiv-System wäre Juli 2025
- 🟡 **Barnett et al. Zitat**: Link geht auf bioRxiv-Preprint, nicht auf den publizierten Science-Artikel
- 🟡 **§3.3 "Google's Lessons from 2025"** — Quelle mit ⚠ markiert, kein permanenter Link. Schwächt die Glaubwürdigkeit.

#### 🎓 Didaktiker — 🟡 VERBESSERBAR
- ✅ Glossar als Progressive Disclosure (einklappbar)
- ✅ Section Summaries an jedem Abschnitt
- ✅ Lesehinweis "1 von 5" gibt Orientierung
- 🔴 **7163 Wörter — zu lang für ein Web-Dokument**. Kein Inhaltsverzeichnis (Table of Contents) sichtbar.
- 🟡 **Sprung von §1 (Nowak-Mathematik) zu §2 (AI-Forschung) ist abrupt** — keine Überleitung die erklärt "warum lesen wir jetzt über Evolvability ES?"
- 🟡 **§2 und §3 sind Literature Reviews** die sich in Paper-Beschreibungen verlieren. Dem Leser fehlt: "Was lerne ich daraus für MEIN System?"
- 🟡 **§4.1 Analogie-Tabelle kommt zu spät** (nach ~4000 Wörtern). Wer es bis hierher schafft, hat den Kontext. Wer vorher abbricht, verpasst den Kern.
- 🟡 **§5 "Priorisierung" hat keine visuelle Hierarchie** — Tier 1/2/3 sind nur Bullet-Listen.

#### 💻 Ingenieur — 🟡 VERBESSERBAR
- 🟡 **Kein konkretes Code-Beispiel** für die Prinzipien. §4.2 sagt "Karpathy-Pattern", aber zeigt keinen Pseudocode.
- 🟡 **Phase-Transition hat keine Formel-Visualisierung** auf dieser Seite (nur auf Homepage). Hier wäre ein statisches Diagramm sinnvoll.
- 🟡 **Quellen-§ ist in <details> versteckt** — für Wissenschaftler gehören Quellen ans Ende, sichtbar.

#### ⚔️ Advocatus Diaboli — 🟢 SOLIDE
- ✅ Transparenzhinweis explizit
- ✅ "Eigenständige Interpretation — keine publizierte Erkenntnis"
- ✅ Counter-Arguments nicht nur verlinkt, sondern referenziert (G4)
- ✅ ⚠-Markierung bei nicht-verifizierten Links
- 🟡 **§4.3 "Error Threshold und Agent-Systeme"** — Formulierung "könnte existieren" ist angemessen, aber der Absatz suggeriert mehr Substanz als vorhanden (keine quantitativen Daten)

#### 🌐 Web-UX — 🟡 VERBESSERBAR
- ✅ Key-Boxes mit Farbcodierung (grün, amber)
- ✅ Disclosure-Elemente für Glossar und Details
- 🔴 **Kein Table of Contents** bei 7163 Wörtern — Nutzer hat keine Orientierung
- 🟡 **Duplicate Content EN/DE** macht die Datei 14000+ Wörter Roh-Markdown — Ladezeit?
- 🟡 **Code-Blöcke für Formeln** — nicht optimal. MathJax/KaTeX wäre schöner.

---

### 3. Counter-Arguments (counter-arguments.md)

#### 🔬 Wissenschaftler — 🟢 SOLIDE
- ✅ Jedes Argument mit Quelle belegt
- ✅ Bewertungen differenziert (STRONG/MEDIUM/LOW/META)
- ✅ McDermott 1981 korrekt zitiert
- ✅ LaBar & Adami 2016 mit PMC-Link
- 🟡 **AI & Society 2025 Link** — als generische Quelle für G1 etwas dünn. Bessere Primärquelle wäre ein spezifischer Lamarckismus-Paper.

#### 🎓 Didaktiker — 🟢 SOLIDE
- ✅ Klare Struktur: Einwand → Konsequenz → Bewertung
- ✅ Summary-Table am Ende — exzellente Übersicht
- ✅ "Was bleibt" vs. "Was korrigiert werden muss" — ehrlich
- 🟡 **G8 (Evo-Devo) bleibt oberflächlich** — wer damit nicht vertraut ist, versteht die Relevanz nicht

#### ⚔️ Advocatus Diaboli — 🟢 SOLIDE
- ✅ Stärkstes Dokument im Repo — die Selbstkritik ist echt
- ✅ 3 STRONG Ratings zeigen Ehrlichkeit
- ✅ Neue Prinzipien aus Kritik abgeleitet (P6)
- 🟡 **Kein Gegenargument zum Simulator selbst** — "Ist die Simulation wissenschaftlich korrekt oder eine vereinfachte Spielerei?"

#### 🌐 Web-UX — 🟡 VERBESSERBAR
- ✅ Farbcodierte Boxen (rot=STRONG, amber=MEDIUM, grün=LOW)
- 🟡 **Lange Seite ohne Sprungmarken-Navigation** — 9 Argumente ohne schnellen Zugriff auf einzelne
- 🟡 **Anchor-IDs nutzen deutsche Titel** (#g1-agent-systeme-sind-lamarckisch...) — lange, schwer zu merken

---

### 4. Principles (principles/index.md)

#### 🔬 Wissenschaftler — 🟢 SOLIDE
- ✅ Jedes Prinzip mit Quelle belegt
- ✅ Barnett et al. korrekt referenziert
- ✅ Collaboration Gain Metric verlinkt
- 🟡 **P7 referenziert Nowak & Ohtsuki PNAS 2008** — korrekt, aber der Link zur Persistence-Argumentation im Paper ist implizit, nicht explizit zitiert (Seite/Theorem)

#### 🎓 Didaktiker — 🟢 SOLIDE
- ✅ Was/Warum/Wie-Format — konsistent und klar
- ✅ Key Insight Boxes heben die Kernbotschaft hervor
- ✅ Caveats bei P2 und P4 — zeigt Nuancen
- ✅ "Messen:" Zeile bei jedem Prinzip — actionable
- 🟡 **Keine Priorisierung** — alle 7 Prinzipien wirken gleichgewichtig. Welches ist das wichtigste für einen Anfänger?

#### 💻 Ingenieur — 🟡 VERBESSERBAR
- 🟡 **"Wie" bleibt abstrakt** — z.B. P3 "Every output gets evaluated" aber kein konkretes Schema oder Code
- 🟡 **Kein Link zur Phase-1-Spec bei P3** — obwohl die Spec exakt P3 implementiert
- 🟡 **P5 Γ-Metrik** — Formel fehlt: Γ = Q(multi) − Q(single) bei gleichem Tokenbudget

#### ⚔️ Advocatus Diaboli — 🟡 VERBESSERBAR
- 🟡 **P1 Barnett-Referenz**: "10.000x höhere Mutationsrate" — steht das exakt so im Paper oder ist es eine Interpretation? Sollte "up to" oder Primärzitat haben.
- 🟡 **P7 ist das jüngste Prinzip** und hat weniger empirische Basis als P1-P6. Das sollte transparent sein.
- 🟡 **Fehlend: Spannungen zwischen Prinzipien** — P1 (Evolvierbarkeit) vs. P4 (Error Threshold) stehen in Spannung. P2 (Diversität) kostet Geld, was G6 betrifft. Diese Trade-offs werden nicht diskutiert.

#### 🌐 Web-UX — 🟢 SOLIDE
- ✅ Konsistentes Layout
- ✅ Section Summaries
- ✅ Farbcodierte Boxen
- 🟡 Kein Inhaltsverzeichnis (aber bei 7 Prinzipien weniger kritisch als bei Nowak-Synthese)

---

### 5. Deep Dive: EvoFlow, MCE, AgentFactory

_(Nicht vollständig gelesen in dieser Session, aber basierend auf Struktur und Summary)_

#### 🔬 Wissenschaftler — 🟡 VERBESSERBAR
- 🟡 **EvoFlow-Volltext-Daten teilweise eingearbeitet**, aber Ablation Study und Operator-Typen fehlen noch in der finalen Version
- 🟡 **MCE und AgentFactory** — basieren vermutlich noch auf Abstracts, nicht Volltext
- 🟡 **Benchmark-Zahlen** — Quelle für jeden einzelnen Zahlenwert sollte angegeben sein

#### 🎓 Didaktiker — 🟡 VERBESSERBAR
- 🟡 **4779 Wörter über 3 Papers** — ohne klaren roten Faden, der erklärt WARUM gerade diese 3
- 🟡 **Kein Vergleichs-Table** der 3 Papers (Gemeinsamkeiten/Unterschiede)

#### 💻 Ingenieur — 🟡 VERBESSERBAR
- 🟡 **Kein Pseudocode** aus den Papers übernommen
- 🟡 **Keine "So würdest du das bauen"-Sektion**

#### ⚔️ Advocatus Diaboli — 🟡 VERBESSERBAR
- 🟡 **Limitationen der einzelnen Papers nicht diskutiert**
- 🟡 **Kein Disclaimer** welche Papers Volltext vs. nur Abstract

#### 🌐 Web-UX — 🟡 VERBESSERBAR
- 🟡 Ähnliche Probleme wie Nowak-Synthese: lang, kein ToC

---

## Nebensteiten (Kurzaudit)

### research/index.md + specs/index.md — 🔴 KRITISCH
- Nur 42 bzw. 44 Wörter. Praktisch leere Hub-Seiten.
- **Fix:** Kurze Übersicht + Links zu Unterseiten mit 1-Satz-Beschreibung.

### Paper Registry — 🟡
- Gute Struktur, aber "55+ Papers" zählen und verifizieren
- Einige Links mit ⚠ — sollten aufgelöst oder entfernt werden

### Research Toolkit + Research Learnings — 🟡
- Intern wertvoll, extern unklar warum jemand das lesen sollte
- Zielgruppe fehlt ("Für wen ist das?")

### Limitations — 🟢
- Stärkstes Meta-Dokument. Ehrlich, strukturiert, nützlich.

### AgentField = Prelife — 🟡
- Interessante Idee, aber zu kurz und ohne Kontext
- Könnte in die Homepage oder Nowak-Synthese integriert werden

### Monitoring Keywords — 🟡
- Nützlich als Arbeitsdokument, aber als öffentliche Seite fragwürdig
- Besser: in README oder separates Tooling verschieben

---

## Top-10 Findings (nach Impact sortiert)

| # | Finding | Seite | Rolle | Schwere |
|---|---------|-------|-------|---------|
| 1 | **Kein Table of Contents** bei 7000+ Wörter-Seiten | Nowak, Deep Dive | 🌐🎓 | 🔴 |
| 2 | **Hub-Seiten leer** (research/index, specs/index) | Navigation | 🌐 | 🔴 |
| 3 | **Bridge-Grid bricht auf Mobile** | Homepage | 🌐 | 🔴 |
| 4 | **Simulator-Erklärung VOR dem Erlebnis** — erst spielen, dann erklären | Homepage | 🎓 | 🔴 |
| 5 | **Nowak §2-§3 verlieren sich in Paper-Beschreibungen** ohne "So what?" | Nowak | 🎓 | 🟡 |
| 6 | **Analogie-Tabelle kommt zu spät** (nach 4000 Wörtern) | Nowak | 🎓 | 🟡 |
| 7 | **Keine Spannungen zwischen Prinzipien** diskutiert | Principles | ⚔️ | 🟡 |
| 8 | **"55+ Papers" nicht verifiziert** — tatsächliche Zahl prüfen | Überall | 🔬 | 🟡 |
| 9 | **OG-Images/Meta-Descriptions fehlen** | Überall | 🌐 | 🟡 |
| 10 | **Hero-Text "We mapped it" zu definitiv** | Homepage | ⚔️ | 🟡 |

---

## Empfohlene Reihenfolge

### Sofort (Quick Wins, < 1h)
- [ ] Hub-Seiten füllen (research/index, specs/index)
- [ ] Hero-Text abschwächen ("We mapped" → "We explored the mapping")
- [ ] Simulator-Erklärung UNTER die Grafik verschieben (erst spielen!)
- [ ] "55+" Zahl verifizieren

### Kurzfristig (1-3h)
- [ ] ToC-Komponente für lange Seiten (just-the-docs hat `toc: true`)
- [ ] Bridge-Grid auf Mobile fixen (1-Spalten-Stack)
- [ ] Nowak §4 Analogie-Tabelle nach vorn holen oder eigene Seite
- [ ] Paper Registry: ⚠-Links auflösen

### Mittelfristig (halber Tag)
- [ ] Nowak §2-§3 straffen: Paper-Reviews → "Key Findings + Source" Format
- [ ] Principles: Trade-off-Sektion ergänzen
- [ ] Deep Dive: Vergleichs-Table der 3 Papers
- [ ] OG-Images generieren
- [ ] Canvas Retina-fähig machen (devicePixelRatio)

### Langfristig
- [ ] KaTeX/MathJax für Formeln
- [ ] Monitoring Keywords aus der öffentlichen Seite entfernen
- [ ] AgentField-Prelife in größeres Dokument integrieren
