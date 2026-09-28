# BRAND IMPLEMENTATION — from research to implementable web rules

Date: 2026-09-28 · Sources: `brand/research/BRAND_RESEARCH_PHASE_1-2.md` (rank 2), `docs/BUSINESS_STRATEGY.md` (rank 1), existing assets in `brand/` (rank 3).

The brand research supplied is Phases 1–2 (audit + research plan). It fixes **direction** with high confidence but explicitly leaves palette (BR-006) and typography (BR-007) unapproved. This document turns the direction into a working web system and records every place where research, strategy and the existing assets pull in different directions.

---

## 1. Conflict register (research vs. business strategy vs. existing assets)

| ID | Conflict | Research says | Strategy / master prompt says | Resolution (and why) | Status |
|---|---|---|---|---|---|
| **C-01** | Wordmark reads **"Infinity Lab."**, masterbrand is **"Infinity Labs"** | BR-004: resolve `Lab.`/`Labs`; normalize verbal masterbrand to Infinity Labs (§7) | §15: one consistent name, "Infinity Labs"; §16: do not redraw the logo, no fake variants, layout adaptation allowed | The **symbol is preserved pixel-for-pixel**. The wordmark is the part that contradicts rank-1 and rank-2 sources, so the site ships a **provisional lockup: untouched symbol + typeset "Infinity Labs"** in the brand typeface. This is layout adaptation plus name normalization, not symbol redesign. Founder must approve or replace it (GAP-001). Shipping "Infinity Lab." next to copy that says "Infinity Labs" would be the worse inconsistency. | Decided, pending approval |
| **C-02** | Research has **not approved** palette/typography; mission requires a design system now | BR-006 / BR-007 locked; direction: gradient must gain function, monochrome behavior required, wordmark needs typographic ownership, enterprise discipline | §24: implement semantic tokens now | Implement a **provisional v0.9 token system** derived only from (a) the symbol's own colors and (b) the research direction. All tokens are centralized (`src/app/globals.css`) so a later Phase 3+ approval swaps values without touching components. | Decided (DEC-007, DEC-008) |
| **C-03** | Dark-everything legacy vs. "black as environment, not dogma" | §1: keep black as environment, not dogma; enterprise credibility needs discipline; §11: undecided whether dark is primary | §17/§55: no generic dark-AI look; premium, precise, trustworthy | **Light-primary canvas** (off-white "paper") for the corporate core, **dark "system" canvases** for sections that show a system in operation (hero graphic, Operate, Labs, footer). Both from the same tokens via a `.theme-dark` scope. Differentiates from the black-and-neon AI default while keeping the symbol's native dark environment where it earns it. | Decided |
| **C-04** | Public category naming | H-005: "AI Systems Company" stronger internally; "AI Transformation & Engineering" better externally | §1: external territory = AI Transformation & Engineering; internal = AI Systems Company | Aligned. Site uses **AI Transformation & Engineering** publicly; "AI systems" appears as what we build, never as a self-label. | Aligned |
| **C-05** | Play-button negative space and small-size loss | §3/§4/H-003: refine negative space, build a responsive logo system (primary → simplified → micro) | §16: geometry must not change; logo redesign is out of scope | **No geometry change.** Mitigations that do not touch geometry: never rotate the symbol; never place it beside media/play UI; below 40 px always pair with the wordmark; use the approved 32 px favicon file as-is; provide a **tonal monochrome treatment** (same paths, three opacities) so the ribbon reads without color. Geometry refinement is handed to the brand's Phase 3+. | Decided (DEC-006) |
| **C-06** | Hero visual narrative | H-006: "intelligent systems in motion", information → action | §22: Data → Reasoning → Action or Discover → Build → Operate | **Discover → Build → Operate** drives the hero and the operating-model section (it doubles as the commercial model, H-007). **Data → Reasoning → Action** becomes the diagram grammar inside solution pages (system boundaries, states, approvals). | Decided |
| **C-07** | Labs expression | H-008 / Whitespace D: Labs = permission to experiment, not the whole personality | §33: Labs may have slightly more experimental expression within the same system | Aligned. Labs pages use the dark canvas, the mono face more prominently and a measured generative grid; same tokens. | Aligned |
| **C-08** | Gradient usage | H-002: gradient cannot remain untreated; Whitespace E: gradient with meaning | §17: no meaningless purple gradient blobs | Gradient appears **only where it encodes a transition**: the symbol itself; the Discover→Build→Operate continuum in diagrams and rails; progress/state indicators. **Never** as background blobs, never as text fill, never as decorative glow. | Decided (DEC-008) |
| **C-09** | Interactive accent color | §13: avoid purple-neon-everywhere | §27/§55: precise, trustworthy | The interactive accent is the symbol's own **indigo `#3E4190`** (8.9:1 on white), not the violet. Violet, sky and mint are **state colors**, not UI chrome. | Decided |
| **C-10** | Name risk | §8–9: US registration "i∞ LABS" (Infinity Labs LLC), Romanian Infinity Labs; clearance required before NA investment | §15: do not invent a new name; no geographic descriptors | Proceed with **Infinity Labs**. No "Colombia" in the masterbrand, handles or schema `name`. Legal name goes in `legalName` once known. Clearance escalated (GAP-002). | Decided |
| **C-11** | Responsive logo variants | §4: real variants needed | §16: no fake variants | Variants are limited to **existing files + color treatment**: full-color symbol (≥ 40 px), approved 32 px favicon file, tonal monochrome (ink or white). No simplified redraw. | Decided |
| **C-12** | Language | Q13 unresolved | Prompt, routes, offers and CTAs all in English; ICP international | English-first, Spanish locale planned; content modules keyed for i18n. Legacy Spanish routes redirect. | Decided (DEC-003), confirm with founder (GAP-015) |

No research recommendation was silently dropped. Items deferred to the brand's later phases: negative-space refinement, final palette approval, final typography approval, competitive matrix outputs, naming clearance.

---

## 2. Positioning and personality (implemented)

- **Category (public):** AI Transformation & Engineering.
- **Proposition:** Infinity Labs designs, builds and operates AI-powered business systems.
- **Working line (hero, subject to founder wording):** "We turn business processes into intelligent systems."
- **Personality:** *engineered, precise, calm, credible* (corporate core) · *curious, exploratory, rigorous* (Labs). Research phrase adopted as the north star: **"AI as a system, not as magic."**
- **Perception targets:** serious AI engineering company; enterprise-ready partner; can deploy and operate in production; future product company.
- **Perception to avoid:** marketing agency, chatbot vendor, agents agency, software factory, speculative AI startup.

## 3. Verbal identity

**Voice: engineered clarity.** Every sentence should be defensible in front of a CTO and useful to a COO.

Rules
1. Lead with the business process and the outcome; name the technology only when it earns credibility.
2. Declarative, specific, short. Prefer nouns of systems (workflow, approval, evaluation, observability, state, throughput) over nouns of hype.
3. No unsupported numbers. If a figure is not client-approved, it is not on the site.
4. Say what we will *not* do (controlled autonomy, no AI without evaluation). Restraint is a trust signal.
5. Technical vocabulary is allowed in "how" sections, never as the offer ("we implement RAG" → "we deploy knowledge systems that answer with sources").

Vocabulary we use: intelligent systems · business systems · workflows · orchestration · agents (as a component, never the product) · human approval · evaluation · observability · governance · production · operate · continuous improvement · controlled autonomy · minimum sufficient architecture.

Banned unless given specific meaning: unlock the power of AI · revolutionize · empower · cutting-edge · innovative solutions · transform your future · next-generation · magic · disruptive · game-changing · seamless · leverage (verb).

Naming rules: **Infinity Labs** (never Lab, Lab., InfinityLab, Infinity Labs Colombia) · stage names capitalised as proper nouns: **Discover, Build, Operate, Labs** · products: **AI Opportunity Sprint**, **Managed AI**, **NOIT** (all caps), **Möbius** (with diaeresis) · buyers by role (COO, CIO), not "stakeholders".

## 4. Logo rules (implemented in `src/components/brand/`)

| Rule | Implementation |
|---|---|
| Symbol geometry | Paths copied verbatim from `brand/logo/infinity-labs-symbol-256.svg` (three faces) into `LogoMark`. Never edited. |
| Color treatments | `color` (approved gradients, ids namespaced per instance) · `mono` (currentColor; faces at 100 % / 72 % / 48 % opacity to keep the ribbon reading) |
| Minimum sizes | Color symbol ≥ 40 px; mono symbol ≥ 24 px; below that use the approved favicon file (`src/app/icon.svg` = `favicon.svg`) |
| Clear space | ≥ 25 % of symbol height on all sides (`Lockup` adds it via padding) |
| Lockup | Symbol + typeset wordmark "Infinity Labs" (Schibsted Grotesk 600, tracking −0.02em, optical size = 0.78 × symbol height, baseline aligned to the lower face) |
| Placement | Never rotated, never mirrored, never on the state gradient, never beside play/media controls, never inside a circle (the white-circle file is retired) |
| Motion | One animation only: on first paint the three faces may fade/draw in sequence Discover→Build→Operate (600 ms, ease-out); off under reduced motion |
| Files served | `public/brand/infinity-labs-symbol.svg`, `public/brand/infinity-labs-symbol-mono-ink.svg`, `public/brand/infinity-labs-symbol-mono-white.svg`, `public/brand/infinity-labs-lockup.svg` (provisional) |

## 5. Color system (provisional v0.9)

Derived from the symbol's five stops, checked for WCAG 2.2 AA (ratios computed 2026-09-28).

**Semantic surfaces and text (light canvas)**

| Token | Value | Contrast vs `#FAFAFC` |
|---|---|---|
| `--surface-primary` | `#FAFAFC` | |
| `--surface-secondary` | `#F3F4F8` | |
| `--surface-elevated` | `#FFFFFF` | |
| `--text-primary` | `#0F1020` | 18.1 |
| `--text-secondary` | `#4A4E63` | 7.9 |
| `--text-tertiary` | `#6B7088` | 4.7 (AA) |
| `--border-subtle` / `--border-strong` | `#E8E9F0` / `#D6D8E2` | |
| `--brand-accent` (links, primary buttons) | `#3E4190` (symbol indigo) | 8.5; white on it 8.9 |

**Dark "system" canvas (`.theme-dark`)**

| Token | Value | Contrast vs `#0A0B12` |
|---|---|---|
| `--surface-primary` | `#0A0B12` | |
| `--surface-secondary` / `--surface-elevated` | `#12131C` / `#1B1D2A` | |
| `--text-primary` | `#F4F4F9` | 17.9 |
| `--text-secondary` | `#B4B7C9` | 9.9 |
| `--text-tertiary` | `#9296AE` | 6.7 |
| `--brand-accent` | `#9D97FF` | 7.8 |

**State colors (gradient with meaning)**

| Stage | Fill (graphics, tags) | Deep (text on light) | Meaning |
|---|---|---|---|
| Discover | `#A662E6` violet | `#6E36B8` (7.3) | opportunity, signals, mapping |
| Build | `#5ABEFF` sky | `#176FB0` (5.3) | engineering, orchestration |
| Operate | `#5DE7C8` mint | `#0B7A63` (5.3) | evaluation, observability, continuity |
| Structure | `#3E4190` indigo | same | infrastructure, governance, interactive accent |

Usage law: **the state gradient always runs Discover → Build → Operate (violet → sky → mint)** in that order. It is never reversed, never cropped to a decorative blob, never used as a text fill. Ink on mint (12.3) and ink on sky (9.2) are AA for tags; ink on violet (4.9) AA for ≥ 14 px bold only.

NOIT keeps its own orange (`#E05E12`) as a product color inside Labs only, always on the dark canvas.

## 6. Typography (provisional v0.9)

| Role | Family | Rationale |
|---|---|---|
| Display + body | **Schibsted Grotesk** (variable 400–900, italics) via `next/font` | Precise Scandinavian grotesk built for legibility at small sizes; not saturated in AI/SaaS templates; distinctive `a`/`g`/`R` give more ownership than Inter/Geist/Manrope while staying enterprise-credible |
| System labels, diagram annotations, data | **JetBrains Mono** (variable) | Reads "engineering" instantly; used for eyebrows, stage codes (`01 · DISCOVER`), diagram labels, metrics |

Scale (fluid): display-2xl `clamp(2.75rem, 6vw, 5.25rem)` / lh 0.98 / tracking −0.03em · display-xl `clamp(2.25rem, 4.5vw, 3.75rem)` / 1.02 / −0.025em · display-lg `clamp(1.75rem, 3vw, 2.5rem)` / 1.1 / −0.02em · heading `1.375rem` / 1.25 · body-lg `1.125rem` / 1.6 · body `1rem` / 1.6 · small `0.875rem` / 1.5 · label (mono) `0.75rem` / uppercase / tracking 0.12em.

Weights: 400 body, 500 UI, 600 headings and wordmark. 700+ only for display-2xl. Max line length 68ch for prose.

## 7. Visual language and graphic system

The symbol inspires a **grammar**, not decoration (research Whitespace B/C; prompt §18–19):

- **Continuous path**: a single stroked path with rounded joins connects stages; it may fold (the ribbon principle) but never breaks.
- **States**: nodes are circles or rounded rectangles filled with the stage color; transitions are stroked in the gradient between the two states.
- **Boundaries**: dashed hairline rectangles mark system boundaries (company systems, AI system, human approval).
- **Rails**: a 2 px vertical or horizontal rail in the state gradient marks sections that belong to the operating model.
- **Grid**: a faint 48 px hairline grid (`.bg-system-grid`) is allowed only behind system graphics, never behind copy.
- **Diagrams** are inline SVG/HTML, labelled in mono, readable at 360 px (they restack vertically).

Forbidden imagery (prompt §17, research §13): robots or robot hands, brains, holograms, binary rain, node clouds, particles, cyberpunk cities, generic blue tech stock, gradient blobs, glassmorphism everywhere, crypto aesthetics, stars/space backgrounds (legacy).

Image direction (when photography arrives): real people at work, real screens, documentary light, no stock "future office". Until then the site uses system graphics only.

## 8. Motion

Function-only motion (prompt §23): explain (path draw, packet travelling Discover→Build→Operate), guide (reveal on scroll, 24 px translate, 500 ms, ease-out-quart, staggered 60 ms), hierarchise (hover lifts of 2 px, 150 ms), brand memory (symbol faces sequence once). All animations are CSS/SVG; everything is disabled under `prefers-reduced-motion: reduce`. No parallax, no cursor effects, no WebGL.

## 9. Spacing, layout, radius, shadow, z-index

- Spacing: 4 px base; section padding `clamp(4rem, 8vw, 7.5rem)`; container 72 rem; prose 42 rem; gutter 1 rem (mobile) / 1.5 rem / 2 rem.
- Grid: 12 columns ≥ 64 rem; 6 columns ≥ 40 rem; 4 columns below.
- Radius: 4 / 8 / 12 / 20 px. Cards 12 px. Buttons 8 px (not pills; pills read consumer-SaaS).
- Shadow: one card shadow only (`0 1px 2px rgba(15,16,32,.04), 0 8px 24px -12px rgba(15,16,32,.12)`); dark canvas uses borders instead of shadows.
- Z-index: header 40, mobile nav 50, skip link 60.

## 10. Accessibility rules baked into tokens

Body text ≥ 16 px; AA on every token pair listed above; focus ring 2 px `--focus-ring` with 2 px offset; hit targets ≥ 44 px; headings in order; diagrams carry `role="img"` + `aria-label` and a text equivalent; reduced-motion honoured globally.

## 11. Do / Don't summary

Do: light canvas by default · dark canvas for systems in operation · symbol untouched · gradient only as Discover→Build→Operate · mono for system labels · diagrams over illustrations · specific copy · honest gaps.
Don't: recolor or rotate the symbol · gradient text · glow · robots · logo walls without permission · invented metrics · "Infinity Lab" · pills and blobs · more than two font families.

---

## 12. v1.0 addendum — engineering-drawing system (2026-09-28)

Following the UX/UI research (`docs/UX_UI_AUDIT.md`), the web system was pushed from "clean SaaS" to an ownable grammar:

- **Colorimetry**: paper is now warm bone (`#F7F5F0` / `#EFECE4` / borders `#E4E0D6`, `#D2CDC0`) against cool indigo-black ink. Text tokens re-verified: primary 17.3:1, secondary 7.9:1, tertiary 5.4:1, accent 8.2:1; deep state text ≥ 4.5:1 on both papers. No shadows anywhere; radii 2–12 px.
- **Signature gesture**: the operating loop as a plotter ribbon (24 ink strands, one Möbius twist, pointer displacement, colour packets in the only permitted order). Nodes are drawn on canvas; labels are HTML for crispness and accessibility.
- **Drafting frame**: every section is a bounded module with a hairline that draws in, corner crosshairs and a mono readout (`03 / OPERATING MODEL · STATE BUILD`). The header shows the active section; a fixed rail carries progress and nodes on wide screens.
- **Typography behaviour**: headlines settle (masked rise + weight 300→600, 45 ms stagger). Hero scale `clamp(2.9rem, 8vw, 7.4rem)` at −0.045em.
- **Buttons**: monochrome (ink on paper / paper on ink) with the state-gradient rail sweeping in on hover. The gradient never appears as a fill.
- **Diagrams in motion**: the typed workflow runs a packet; steps light up in their type colour as it passes; runs only while visible; off under reduced motion.
- **Text**: home ≤ 900 words; one sentence per section question; lists carry detail.
