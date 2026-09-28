# UX/UI RESEARCH, AUDIT AND REDESIGN — v1.0 "engineering drawing"

Date: 2026-09-28 · Scope: homepage + shared shell (header, footer, buttons, page headers) · Method below.

## 1. Method

1. **Reference capture** (Playwright, 1440×900, full page): Linear, Stripe, Anthropic, Palantir, Databricks, Scale, Cursor, Vercel, Artefact, Glean, Sierra, Writer, Cohere. Effect catalogs: 21st.dev, Magic UI, Aceternity, React Bits, Motion Primitives, Hover.dev, cult-ui, ui-layouts. Raw captures in the session scratchpad; extracted data (fonts, canvas/video usage, word counts, H1s) summarised in §2.
2. **Design-intelligence engine** (`ui-ux-pro-max`, 50 styles / 161 palettes / 99 UX guidelines): design-system query for "enterprise AI engineering, premium, technical". Output used as guardrails, not as the design (§3).
3. **Heuristic audit** of the v0.9 site: Nielsen's 10 heuristics + 6 brand/positioning criteria from the master prompt (§4), scored 1–5 by section.
4. **Effect selection matrix**: every candidate effect from the catalogs evaluated against the brand rules (function-only motion, anti-cliché, performance, reduced motion) (§5).
5. **Text budget** measured against references (§6).
6. **Decisions and implementation** (§7), then Playwright visual/functional re-verification (§8).

## 2. What the credible references actually do

| Site | Canvas | Type | Hero device | Motion | Home words |
|---|---|---|---|---|---|
| Linear | dark #08090a | Inter Var + Berkeley Mono | short headline + product UI | restrained, calm | 1 427 |
| Stripe | white | Söhne | text + one signature WebGL gradient ribbon | one signature gesture | 1 934 |
| Anthropic | warm bone #faf9f5 | custom serif + sans | editorial text + macro photo | almost none | 439 |
| Palantir | dark video | Alliance | giant thin headline over industrial footage | cinematic | 3 021 |
| Scale | white | Aeonik + mono | industrial photo + one sentence | restrained | 871 |
| Cursor | warm #f7f7f4 | CursorGothic | small headline + product UI over painting | restrained | 1 751 |
| Vercel | white | Geist + Geist Mono | two words + black triangle glow (canvas) | one gesture | 134 |
| Glean | white | Polysans + mono eyebrow | headline + 3D gradient ribbon render | one gesture | 1 913 |
| Sierra | photo | GT America | real people + chat overlay | none | 607 |
| Cohere | white | serif display + textured art | "Your AI. Your rules." + product | none | 829 |
| Artefact | pink/purple gradient + glossy 3D blobs | IBM Plex | the AI cliché | carousel | 834 |

Read-outs. (a) The credible set is light or warm-paper first, typography-led, with **one** signature visual gesture and a mono face for technical labels. (b) Dark + neon gradients belong to the creative-dev component libraries (React Bits, 21st) and to consultancies chasing the AI look (Artefact), which is the sameness the brand research warns about. (c) Word counts of the strongest brand statements sit between 130 and 900.

## 3. Design-intelligence engine output (used as guardrails)

- Style: **Trust & Authority** + **Swiss Modernism 2.0** (12-column rational grid, single accent, high contrast). Landing pattern: **Scroll-triggered storytelling** (chapters, progressive reveal, progress indicator, simplified on mobile).
- Its own anti-pattern list flags "AI purple/pink gradients" and "playful design". Its default palette suggestion (purple #7C3AED + pink) was rejected for exactly that reason; its typography default (Inter) rejected for lack of ownership.
- Animation rules adopted verbatim: 150–300 ms micro-interactions, 1–2 key animations per view, transform/opacity only, ease-out entrances, reduced-motion respected, no scroll-jacking.

## 4. Heuristic audit of v0.9 (before) and v1.0 (after)

Scale 1–5. Criteria: N1 visibility of system status · N2 match with real world · N4 consistency · N6 recognition over recall · N8 aesthetic/minimalist · A11y · B1 five-second test · B2 distinctiveness ("could this belong to 20 other AI companies?") · B3 brand grammar expressed · B4 motion with meaning · B5 text density · B6 enterprise credibility.

| Section | v0.9 finding | v0.9 | v1.0 change | v1.0 |
|---|---|---|---|---|
| Hero | Two-column SaaS layout, small loop in a dark "dashboard card"; generic fade-ups; five-line headline | B2 2 · B4 3 · B1 4 | Text-first statement over a **plotter-style ribbon** (canvas) that carries the operating loop; pointer displacement; colour packets Discover→Build→Operate; words settle in weight; instrument strip as legend | B2 5 · B4 5 · B1 5 |
| Problem | Two cards with two 5-item lists and a 60-word lede | B5 2 · N8 3 | Ledger of 4 vs 4 lines, gradient divider, one-sentence claim | B5 5 · N8 5 |
| Operating model | Three columns + descriptions + Labs card: 260 words | B5 2 · B4 2 | **Sticky scrollytelling**: the loop stays and highlights the active stage; stages pass with 4 items and their method steps; descriptions moved to hubs | B5 4 · B4 5 |
| Solutions | 6 shadowed cards (generic SaaS grid) | B2 2 · N8 3 | **Index rows** with a sticky preview rendering the illustrative typed workflow of the hovered/focused solution | B2 4 · N8 5 |
| How we build | Diagram + 8 mini-cards | B5 3 | Animated packet through the typed workflow (steps light up as it passes) + 8-line **ledger** | B5 4 · B4 5 |
| Sprint | 3 cards with 40-word descriptions | B5 3 | Three-node rail with 10-word lines | B5 5 |
| Labs | 4 boxed tiles | B2 3 | Three ledger lines with status tags and the mono symbol | B2 4 |
| Technology + method + trust | Three sub-sections, 18 items, 330 words: redundant with model and principles | B5 1 · N8 2 | Technology posture moved to `/capabilities`; method merged into the scrollytelling; trust reduced to 4 commitments | B5 5 |
| Global | Cards with shadows, cool white, 20 px reveals, no continuity between sections | B3 2 · N1 3 | Warm bone paper, hairlines only, **section frames** with codes/crosshairs, **site rail** with progress and header readout, monochrome buttons with the gradient rail on hover | B3 5 · N1 5 |

Overall: v0.9 3.0 → v1.0 4.7 (average across criteria; A11y stays 5: AA tokens, reduced motion, keyboard, labels).

## 5. Effect selection matrix (catalog candidate → decision)

| Candidate (source) | Decision | Reason |
|---|---|---|
| Aurora / gradient blob backgrounds (Aceternity, Magic UI) | Reject | Explicit anti-cliché rule; category sameness |
| Particles, meteors, sparkles, shooting stars | Reject | "Random glowing node clouds" prohibited |
| Spotlight card / glare card | Reject | Now ubiquitous; no brand meaning |
| Globe, world map, orbiting circles | Reject | Not a claim we can make (no global footprint proof) |
| Number ticker / animated metrics | Reject | No verified metrics (GAP-006); would invite invention |
| Custom cursor / magnetic buttons | Reject | Usability cost; no meaning |
| Tracing beam (Aceternity) | **Adapt → Site rail** | Continuity is the brand principle; ours carries the state gradient and section nodes, clickable, with a header readout |
| Sticky scroll reveal (Aceternity) | **Adapt → Operating-model scrollytelling** | Explains the model; the shared loop element gives spatial continuity |
| Text generate / word reveal (Aceternity, Motion Primitives) | **Adapt → Word settle** | Masked rise + variable-font weight 300→600: the system "settling", not a typewriter |
| Animated beam (Magic UI) | **Adapt → Workflow packet** | A packet travelling the typed workflow demonstrates system behaviour; steps activate as it passes |
| Grid / dot pattern backgrounds | **Adapt → Pointer-revealed grid** | Grid only where you look (observability metaphor); never behind copy |
| Terminal component (Magic UI, Aceternity) | Defer | Credible for Labs later (evaluation logs), only with real output |
| Border beam / shine border | Reject | Decorative glow |
| Bento grid | Reject | Generic SaaS structure (prompt §54) |
| Stripe-style WebGL ribbon | **Reinterpret → Plotter ribbon (canvas 2D)** | Same idea of one signature gesture, executed as an engineering drawing in ink with meaning-bearing colour; no WebGL, no glow |
| View transitions | Defer | Stability first; revisit after launch |

## 6. Text budget

| Page | v0.9 words | v1.0 target | Reference band |
|---|---|---|---|
| Home | 1 627 (55 paragraphs, 7 over 40 words, 15 cards) | ≤ 900 (no paragraph over 40 words, ≤ 2 cards) | Scale 871 · Cohere 829 · Sierra 607 |
| Solutions hub | 487 | keep | |
| Sprint | 442 | keep | |
| About | 470 | keep | |

Rules applied: every section answers one question in one sentence; lists carry the detail; descriptions live on hub/detail pages; nothing is repeated across sections (the stage names appear in the ribbon legend and the model, nowhere else on the home).

## 7. Decisions implemented (see DECISION_LOG DEC-015…DEC-020)

- **Colorimetry**: warm bone paper (`#F7F5F0` / `#EFECE4`) against cool indigo-black ink; symbol state colours unchanged; deep text variants re-checked (all ≥ 4.5:1 on both papers). Warm ground + cool signals separates the site from blue-white SaaS and from black-neon AI.
- **Radius and elevation**: 2–12 px radii, no shadows anywhere, hairlines only (Swiss/engineering).
- **Typographic scale**: hero `clamp(2.9rem, 8vw, 7.4rem)` at −0.045em; display sizes tightened; mono labels at 0.14em tracking.
- **Motion tokens**: expo-out entrances (700 ms reveal, 1 s rule draw, 1 s word settle with 45 ms stagger), 200 ms micro-interactions, 11 s colour-flow period, 7.2 s workflow cycle. Everything transform/opacity/stroke only. Reduced motion: ribbon static, packets hidden, reveals instant.
- **Dependencies added**: none.

## 8. Verification

Playwright: full-page captures at 390 / 834 / 1280 / 1440, overflow check, console errors, mobile nav, reduced-motion state, form validation. Results are recorded in `docs/qa/README.md` after each run.
