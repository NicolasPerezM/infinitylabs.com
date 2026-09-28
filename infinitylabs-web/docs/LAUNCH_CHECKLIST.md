# LAUNCH CHECKLIST

Legend: ✅ done in repo · 🟡 done, needs founder confirmation · ⛔ blocked on a content gap

| # | Item | Status | Notes |
|---|---|---|---|
| 1 | Brand consistency (tokens, canvases, typography) | ✅ | `docs/BRAND_IMPLEMENTATION.md`; provisional v0.9 pending research phases 3+ |
| 2 | Correct "Infinity Labs" naming everywhere | ✅ | Legacy variants removed; grep for `Infinity Lab\b` returns nothing in `src/` |
| 3 | Approved logo usage | 🟡 | Symbol untouched; provisional typeset wordmark (GAP-001) |
| 4 | All pages responsive (360 → 1920) | ✅ | Playwright screenshots in QA report |
| 5 | Navigation functional (desktop + mobile dialog) | ✅ | Keyboard: Escape closes, focus returns |
| 6 | Forms tested | 🟡 | Validation + honeypot verified; delivery provider not configured (GAP-011) → email fallback |
| 7 | No fake proof | ✅ | Proof/testimonials/logo wall/team hidden behind `verified` flags |
| 8 | No template remnants | ✅ | New codebase; legacy export not shipped |
| 9 | No placeholder content | 🟡 | Privacy/Terms state "under review" honestly (GAP-004) |
| 10 | SEO metadata (title template, descriptions, canonical, OG, Twitter) | ✅ | `src/lib/seo.ts` |
| 11 | Sitemap | ✅ | `/sitemap.xml` from content modules |
| 12 | Robots | ✅ | `/robots.txt` |
| 13 | 404 | ✅ | `not-found.tsx` |
| 14 | Favicon / icons | ✅ | Approved 32 px symbol as `icon.svg`; manifest |
| 15 | Open Graph image | ✅ | Generated `/opengraph-image` (final artwork GAP-020) |
| 16 | Structured data | ✅ | Organization, Service, Breadcrumb, FAQ (Sprint) |
| 17 | Accessibility review | ✅ | Semantic landmarks, skip link, labels, focus ring, AA tokens, diagram text equivalents |
| 18 | Reduced motion | ✅ | Global media query + SMIL packets hidden + reveals disabled |
| 19 | Performance review | ✅ | Static pages, 2 fonts, no raster imagery, no animation libraries |
| 20 | Production build successful | ✅ | `pnpm build` (Next 16.3.6) |
| 21 | Analytics events documented | ✅ | `docs/ANALYTICS_PLAN.md`; provider unset (GAP-012) |
| 22 | Environment variables documented | ✅ | `README.md`, `.env.example` |
| 23 | Legal content reviewed | ⛔ | GAP-003, GAP-004 |
| 24 | Content gaps explicitly documented | ✅ | `docs/CONTENT_GAPS.md` |
| 25 | Legacy redirects | ✅ | `next.config.ts` (301 from Webflow paths) |
| 26 | Domain / DNS cut-over from Webflow | ⛔ | Founder decision; set `NEXT_PUBLIC_SITE_URL` |
| 27 | Trademark clearance before NA push | ⛔ | GAP-002 |
| 28 | Languages: `/es` default, `/en`, `/fr`; switcher; cookie preference; hreflang + x-default; sitemap × 3 | ✅ | DEC-021; French copy needs native review (GAP-015) |
| 29 | Dark mode: light · system · dark toggle; tokens per theme; contrast verified in both themes (text ≥ 4.5:1, inputs ≥ 3:1) | ✅ | DEC-022; `docs/BRAND_IMPLEMENTATION.md` §13 |
| 30 | Automated accessibility audit (axe) on key pages, both themes | ✅ | `docs/qa/README.md` |

## Pre-launch commands

```bash
pnpm install
pnpm lint
pnpm build
pnpm start   # smoke test /, /solutions, /offers/ai-opportunity-sprint, /contact, /sitemap.xml, /robots.txt
```
