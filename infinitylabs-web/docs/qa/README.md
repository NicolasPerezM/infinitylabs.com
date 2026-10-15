# Visual QA captures — v1.6 (expert panel, mobile pass, Sprint scene) — 2026-10-15

Captured with Playwright (Chromium) against the production build (`pnpm build && pnpm start`). Section captures hide the sticky header so the section is seen whole. Decisions: DEC-027 (expert panel, `docs/EXPERT_PANEL.md`), DEC-028 (mobile audit, `docs/MOBILE_AUDIT.md`) and DEC-029 (the Sprint scene, `docs/BRAND_IMPLEMENTATION.md` §17). Full pages are captured with reduced motion, so the Sprint scene shows its final state.

**Checks passing on this build**

- **Accessibility**: axe-core (WCAG 2.0/2.1/2.2 A + AA + best-practice) on 16 routes across ES/EN/FR (home ×3, solutions index and two solutions, capabilities index and one capability, engagements index and two engagements, Labs, About, Contact, Privacy, a 404) × 2 themes × 2 widths (1440, 390) = **0 violations**.
- **Route sweep**: 27 paths × 3 languages × 2 widths = 162 loads, all status 200, no horizontal overflow, no page errors. Unknown paths return a localized 404 inside the site.
- **Contact form**: a personal email is accepted; after an error, focus lands on the first invalid field (in view) and every value and selection is kept; after sending, the confirmation is focused and in view; the Digital Growth System and Labs intents keep their own title.
- **Print**: nothing on the Sprint page stays hidden behind a scroll reveal; the Sprint scene prints its outcome (the designed flows) whatever state it was in, and dark sections print as paper.
- **Build**: `pnpm lint` clean, `tsc` clean, `pnpm build` generates all 87 static pages.

| File | What it shows |
|---|---|
| `home-hero-es-light.jpg` · `home-hero-es-mobile-390.jpg` | The idea worth spreading as H1, one ask with its reassurance, the stages and the buyer's line written on the ribbon |
| `home-full-es-light.jpg` · `home-full-en-dark.jpg` | The home in the panel's order: idea → gap → demonstration → model → solutions → marketing → Labs → commitments → Sprint → close |
| `home-gap-es.jpg` | What is: a table with named rows (data, quality, operation), then the answer in one line |
| `home-build-demo-es.jpg` · `home-build-mobile-390.jpg` | The typed flow with the conditional human step drawn as conditional, then the key that ties each type to this flow ("Agente: no hace falta aquí") |
| `home-model-compare-fr.jpg` | The comparison that is true by definition: a team per stage (3 teams, 2 handoffs between stages) against one team (1, 0) |
| `home-solutions-screens-en.jpg` | Solutions as name + promise, with the illustrative screen of the focused one |
| `home-growth-table-es.jpg` | AI × marketing as parallel rows: what the team does beside what AI adds |
| `home-sprint-space-es-map.jpg` · `home-sprint-space-es-score.jpg` · `home-sprint-space-es-design.jpg` | The Sprint as one scene in three states: four processes as a plan (cost, waits, handoffs) → every opportunity in three dimensions, the threshold volume, A, B, C inside and a high-value discard outside on data readiness, the five criteria in the key → discards filed in a register, A, B, C as typed flows wired to the systems |
| `home-sprint-space-en-rotated.jpg` | The same scene rotated by dragging: the discard's depth is now obvious |
| `home-close-es.jpg` | The close: the idea echoed once, a question to the buyer, one ask, the reassurance, a call as a text link |
| `solution-document-intelligence-es.jpg` · `solution-knowledge-en-dark.jpg` · `solution-marketing-es-full.jpg` | Solution pages: breadcrumb, promise, today → with the system, ways to engage, the screen; the marketing page asks for its own offer |
| `engagements-es.jpg` · `engagement-sprint-fr-dark.jpg` · `engagement-managed-ai-en.jpg` | Engagements as rows in loop order; the Sprint scene on its own page (French, dark, scoring phase); each engagement asks about itself |
| `capabilities-fr-dark.jpg` | Capabilities by stage, each row a link with its promise |
| `labs-es.jpg` · `about-fr.jpg` | Labs with the symbol as its image and status in plain words; About with the why first |
| `contact-es-390.jpg` | Contact on a phone: what happens next before the form, four required fields, optional ones labelled |
| `not-found-en.jpg` | The localized 404 with three ways out |

**Mobile pass (390 × 844, DEC-028)**

| File | What it shows |
|---|---|
| `mobile-home-full-390.jpg` | The whole home on a phone: 13.5 screens (14.8 before DEC-028; +0.7 for the Sprint scene), an image in every section |
| `mobile-solutions-gallery-390.jpg` | The six product screens as a swipeable gallery, each card the link to its solution |
| `mobile-capability-strip-390.jpg` | A capability page with the stage strip as its image |
| `mobile-engagement-timeline-390-dark.jpg` | Engagement phases as a numbered timeline in the stage colour |
| `mobile-sprint-space-390-score.jpg` · `mobile-sprint-space-390-design.jpg` | The Sprint scene on a phone: the stage, then the key of the phase (the discard's five scores; the step types and integrations) |
| `mobile-labs-390.jpg` · `mobile-about-390-fr.jpg` | Labs with the symbol at phone size; About with the strip and the why first |

