# MOBILE AUDIT — the site on a phone, the way Steve Jobs would review it (v1.5, 2026-10-15)

Decision: DEC-028. Scope: every route in ES (and the EN/FR versions through the route sweep), at 390 × 844 px, light and dark.

## 1. The lens

On a phone a page is a sequence of screens, so the keynote rules become concrete:

1. **One dominant image per page.** No page may run for screens of text without a picture of what it is about.
2. **Less text.** Anything a figure on the same screen already says is cut; detail that matters on a desk can wait for a wider screen.
3. **Nothing said twice.** The same sentence or the same list twice on one page is noise.
4. **Every tap lands.** Standalone links and buttons are at least 44 px tall (Apple HIG; WCAG 2.5.8 asks for 24 px).
5. **The first screen sells.** Idea, one sentence, one ask, the start of the image.

## 2. Method

A script loaded each route at 390 px and measured: page length in screens, visible words in `<main>`, figures taller than 120 px, the longest run of screens without a figure, sentences repeated on the page, text under 14 px, and tap targets under 24 px. Every page was then reviewed visually from full-page captures.

## 3. What the audit found

| Finding | Where | Rule |
|---|---|---|
| **No image at all on phones.** The stage loop and the product screens were desktop-only, so 14 pages showed only text, with runs of 3 to 4.7 screens | Capabilities hub and 7 capability pages, engagements hub and 4 engagements, Labs, About, solutions hub | 1 |
| The reassurance line ("Lo lee un ingeniero senior…") twice on the same page | Home (hero and close), every engagement page (hero and close) | 3 |
| The step-type key repeated, step by step, what the vertical diagram right above it already labelled | Home, "Cómo construimos" | 2, 3 |
| The three Sprint frames stacked at full width: 1.5 screens for one idea | Home and Sprint page | 2 |
| Each operating-model stage listed three areas under its promise: three screens for three stages | Home | 2 |
| Long paragraphs that are desk reading: Labs initiative details, the eight principle details, the five "what we build" bullets under each solution diagram, typical environments, technical notes, industry descriptions | Labs, About, solutions, capabilities, solutions hub | 2 |
| 13 footer links (solutions and capabilities) repeated on every page, already one tap away in the menu | Every page | 3 |
| Standalone links 18–21 px tall | Breadcrumbs, "Capacidades de…", "o agenda una llamada", footer, contact | 4 |
| The hero's first screen held the reassurance line too, pushing the ribbon below the fold | Home | 5 |

No text under 14 px was found; no page overflowed horizontally.

## 4. What changed

| Change | Pages |
|---|---|
| **Stage strip** (`StageStrip`): the operating loop drawn as one line on phones, the page's stage lit (all three on About). On the capabilities hub it is also the in-page index | 7 capability pages, 4 engagements, About, capabilities hub |
| **Product gallery** on phones: the six illustrative screens in a swipeable row, each card the link to its solution (name and promise under the screen); the text rows remain on desktop | Home "Soluciones", solutions hub |
| **Phase timeline**: numbered nodes in the engagement's stage colour, joined by a line, vertical on phones, horizontal on desktop | 4 engagements |
| **The symbol** on the Labs hero at phone size | Labs |
| **Sprint storyboard**: on phones each frame becomes a thumbnail beside its phase text | Home, Sprint page |
| **One reassurance line per page**, in the close next to the final ask | Home, engagements |
| Cut on phones (kept from 768 px up): step-type "in this flow" column, stage areas, Labs details, principle details, solution build bullets, typical environments, technical notes, industry descriptions | Home, Labs, About, solutions, capabilities |
| Footer on phones keeps the company links; solution and capability indexes stay in the menu | Every page |
| 44 px tap targets for standalone links (TextLink, breadcrumbs, text CTAs, footer, contact) | Every page |

## 5. Result (production build, ES, 390 px)

| Page | Screens before → after | Words before → after |
|---|---|---|
| Home | 14.8 → 12.8 | 724 → 857 ¹ |
| Solutions hub | 4.8 → 3.9 (0 → 6 product screens) | 291 → 396 ¹ |
| Solution page (average of 6) | 6.8 → 5.6 | 400 → 304 |
| Capability page (average of 7) | 4.3 → 3.9 (now with the stage strip) | 213 → 193 |
| Engagement page (4, Sprint excluded) | 4.7 → 4.3 (stage strip + phase timeline) | 273 → 252 |
| Sprint page | 7.1 → 6.0 | 543 → 528 |
| Labs | 5.5 → 4.7 | 453 → 303 |
| About | 6.1 → 5.3 | 577 → 412 |
| **Whole site (28 routes)** | **146.2 → 127.8** | |

¹ The count now includes the text inside the product screens of the gallery; the prose itself is shorter.

Checks on the same build: axe 0 violations on 16 routes × 2 themes × 2 widths; 162 route loads (27 paths × 3 languages × 2 widths) with status 200, no horizontal overflow and no page errors; nothing hidden when printing.

## 6. What a phone still cannot show

- Real product screenshots (GAP-023): the gallery shows illustrative screens until a client approves a real one.
- A short demonstration video of a system running would be the strongest mobile asset of all; it needs a real system to film.
