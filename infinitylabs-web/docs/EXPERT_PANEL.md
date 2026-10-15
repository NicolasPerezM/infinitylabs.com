# EXPERT PANEL — how 18 experts became one site (v1.4, 2026-10-14)

The founder asked for the site to be reviewed by eighteen experts working as one team, on every page and in every language, and for everything that reads as the default output of AI coding tools to be removed. This document records the team, the protocol that let them agree, what each council found, how conflicts were resolved and the resulting rules. Decision: DEC-027.

## 1. The team: five councils, one integrator

| Council | Experts | What it protects |
|---|---|---|
| Narrative | Nancy Duarte · Simon Sinek · Chris Anderson (TED) · Carmine Gallo · Jeff Bezos | One idea a COO can repeat to a CFO; every page opens with a belief, tells *what is* before *what could be*, and ends on one step |
| Persuasion & differentiation | Oren Klaff · Robert Cialdini · Rory Sutherland · Guy Kawasaki · Seth Godin · Elon Musk | The ask: one small, true, named next step, primed by levers that are true today |
| Visual & product design | Dieter Rams · Jony Ive · Garr Reynolds | The signal: one signature, one voice per typeface, one image per page |
| Information & data | Edward Tufte · Hans Rosling | The honesty of every mark: comparisons, direct labels, diagrams that match the mechanism |
| Human-centred UX | Don Norman · David Kelley (IDEO) | The gulfs of execution and evaluation for a skeptical buyer between meetings, often on a phone |
| (Research) | Generic-pattern analyst | An evidence-based list of what AI coding tools produce by default, scanned against this site |

Each council audited **every route in ES/EN/FR** from the code and from real captures (1440 / 390 px, light / dark), read-only, and returned a memo with page · issue · principle · exact change · priority. The integrator (the engineering agent) merged the memos and implemented them.

## 2. The protocol (how they understood each other)

1. **Shared North Star.** A buyer leaves able to repeat one idea and take one step. Every recommendation had to say which of the two it served.
2. **Shared evidence.** Same brief, same code, same screenshots; every finding cites a file or a capture.
3. **Order of precedence when experts disagree:** Truth → Understanding (Norman, Kelley) → Story (Duarte, Sinek, Anderson, Gallo, Bezos) → Persuasion (Klaff, Cialdini, Sutherland, Kawasaki, Godin, Musk) → Form (Rams, Ive, Reynolds, Tufte, Rosling). Rams’ “less, but better” is a standing veto on additions that do not earn their place.
4. **Remove before you add.** Additions need a principle; deletions need only a reason.
5. **Concrete or nothing.** Each change names the file and the exact edit or copy.
6. **Disagree and commit** (Bezos). Unresolved points are written down and handed to the founder, not averaged.

## 3. What they found (selected, all fixed unless marked)

**Truth and integrity (precedence 1)**
- “0 traspasos” contradicted the agentic offer (“seguida de Managed AI o de una entrega a tu equipo”). Replaced by a comparison that is true by definition: handoffs *between stages*.
- The typed flow drew every item through the human step; in three solutions that step is conditional. Conditional steps are now drawn and labelled as conditional.
- Two step types were false (marketing “Posicionamiento y marca” typed as human approval; “Monitorear calidad” typed as output). Corrected.
- A confidence meter with no scale, and two “creative variants” drawn as a bar chart and a donut. Replaced by a threshold rule and real ad wireframes.
- Implied social proof without a source: “casi todos empiezan con el Sprint”, “lo que preguntan los compradores”, “Labs toma un número reducido cada año”, industries that “suelen rendir”. Removed or reworded.

**Understanding (precedence 2)**
- The localized 404 never rendered (Next’s default English page, no header). Fixed with a catch-all route and a locale-aware not-found page.
- Contact form: errors and confirmation rendered off-screen with focus lost; selects reset after a server error; free-mail addresses rejected; seven required fields after promising “unas pocas preguntas”. Fixed (focus and scroll to feedback, no reset, four required fields, optional labelled in the label).
- “Digital Growth System” lost its intent on the contact page. Fixed; Labs got its own intent.
- Printing or saving a page as PDF produced blank pages (text hidden behind scroll reveals). Text no longer waits for scroll; print shows everything.
- The page was labelled three times (eyebrow, readout, breadcrumb). One breadcrumb at the top of detail pages, nothing on index pages.

**Story (precedence 3)**
- The idea worth spreading: **“La IA se gana su lugar en producción.” / “AI earns its place in production.” / “L’IA gagne sa place en production.”** Built from words already on the site (“aplica IA en los pasos donde se gana su lugar”).
- The why (Sinek), on About: AI has to earn its place in a company like any other system it depends on.
- Detail pages follow Duarte’s sparkline: today → with the system → what changes for your team → first step. The buyer is the subject, not Infinity Labs.
- The keynote costume of v1.3 (“Y hay algo más”) and the repeated negation kicker were removed.

**Persuasion (precedence 4)**
- One primary button per page, named for what actually happens: **“Cuéntanos un proceso”** (it opens a form; it does not start a paid engagement). Offer pages ask for their own offer (“Dimensionar {name}”). Labs asks for an experiment.
- The two costly signals that make the company remarkable are now said where the buyer decides: the Sprint documents what *not* to build, and the plan is the client’s to execute with anyone.
- One risk-reversal line next to the ask, built only from claims already on the site: a senior engineer reads it, reply in two business days, and if there is no fit we say so.

**Form (precedence 5)**
- Removed: corner crosshairs, right-hand section “state” labels, pointer-revealed grid, scroll cue, dot rail and header section readout, footer watermark, decorative gradient lines and hover sweeps, arrows on every link, tinted pill tags, coloured bullet dots, card boxes around diagrams, the 4-up icon-in-a-circle legend, ruler ticks and pulse rings on the ribbon, ambient loops.
- Mono type now means “the system wrote this”: step kinds, axes, screen chrome, language codes. Everything a person wrote is in Schibsted, sentence case.
- Colour means stage or step type only.

## 4. Conflicts and how they were resolved

| Conflict | Positions | Resolution (precedence) |
|---|---|---|
| Primary button label | Persuasion: “Cuéntanos un proceso”. Understanding: “Solicitar un Sprint” (name the real step) | “Cuéntanos un proceso” names the real step *and* avoids an unexplained product name in the first screen, so it satisfies Understanding (2) and Persuasion (4). Offer pages keep the offer name in their own ask |
| The 1 · 3 · 0 numbers | Story wanted big numbers; Form called it a metrics costume; Data found it untrue as written | Truth (1) → two-row comparison, true by definition: a team per stage (3 teams, 2 handoffs between stages) vs Infinity Labs (1 team, 0 handoffs between stages) |
| Labs position | Story (v1.3) closed with Labs; Persuasion objected that “in development” tags sat right before the ask | Story (3) moves Labs before the commitments and the Sprint, without the “one more thing” line |
| Motion | Brand system (DEC-019) vs Understanding and the generic-pattern research | Understanding (2): text never waits for scroll. Motion stays only where something is built (diagram builds, ribbon packets) |
| The packet running through the flow | Visual wanted it; Data showed it sends every item through a conditional human step | Truth (1): the packet is removed; the build-in stays |
| Repeating the core line at the close | Research flagged repetition; Duarte wants the end to echo the beginning | Story (3): the close echoes the H1 once, in small type; the old negation line is gone |
| Product names (Growth Engineering, Digital Growth System, Intelligent Operations) | Narrative asked for one marketing vocabulary and to drop “inteligentes” | Not changed: names are founder decisions (DEC-024). Logged for the founder |

## 5. Rules adopted (they bind future changes)

1. Every H1 and its first sentence trace back to the idea (production, earned place, someone operating it).
2. At most one rhetorical “no X / es Y” per page, never in an H1 or H2. At most two two-fragment slogans on the whole site.
3. Banned in headlines: “sistema inteligente”, “impulsado por IA”, “tipar”, “de punta a punta”. Stage 1 is always “Descubrir”.
4. One primary button per page, from the lexicon, naming the true next step. Everything else is a text link. The final ask matches its page.
5. No number without a comparison and a unit, and a source or “by definition”. Illustrative visuals are labelled once, next to the figure.
6. One colour, one meaning: violet / sky / mint encode stage or step type only.
7. Mono only for system output. One label per section (a hairline and a name). One image per page.
8. Text is never hidden waiting for scroll; print shows everything. Motion builds images, never text.
9. Every action gets feedback where the eyes are; nothing the user typed is ever discarded; ask only what is needed to reply.
10. Remove before you add.

## 6. Open items for the founder

- Sprint duration, participants and price band (GAP-014): the single biggest lever for both understanding and persuasion.
- Confirm operationally that a senior engineer reads every request and that the reply comes within two business days (the line now sits next to every ask).
- Form delivery provider (GAP-011): today every lead still ends in a pre-filled email.
- Product naming for the marketing practice and “Operaciones inteligentes” (see §4).
- Per-outcome measures on solution pages (“Se mide como…”), proposed by Rosling/Tufte; each needs validation before it is published.

## 7. Measured result (production build, 2026-10-14)

| Check | Before (v1.3) | After (v1.4) |
|---|---|---|
| “not X, Y” sentences in the copy (ES / EN / FR) | 42 / 42 / 46 | 13 / 18 / 18, none in a headline |
| `label-mono` uses in components | 54 | 7 (system output only) |
| Elements that wait for scroll to appear | 75 | 9 (figures only) |
| Gradient uses | 8 | 1 (the loop strip in the model comparison) |
| Localized 404 | Next default, English, no header | Localized, inside the site, three ways out |
| Contact form after an error | Alert off-screen, focus lost, selects reset | Focus on the first invalid field, nothing discarded |
| Elements hidden when printing the Sprint page | 13 of 15 | 0 |
| Accessibility (axe, 16 routes × 2 themes × 2 widths) | — | 0 violations |
| Route sweep (27 paths × 3 languages × 2 widths) | — | 162 / 162 with status 200, no overflow, no page errors |

