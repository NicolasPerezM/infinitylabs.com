# Infinity Labs — website

The digital platform of Infinity Labs, an **AI Transformation & Engineering** company. Next.js 16 · React 19 · TypeScript · Tailwind CSS v4.

This folder replaces the legacy Webflow export that still lives at the repository root (kept for reference until the domain is cut over; see `docs/SITE_AUDIT.md`).

## Setup

```bash
pnpm install
cp .env.example .env.local   # optional: form delivery, analytics, site URL
pnpm dev                     # http://localhost:3000
```

## Scripts

| Command | Purpose |
|---|---|
| `pnpm dev` | Development server (Turbopack) |
| `pnpm lint` | ESLint (next/core-web-vitals + TypeScript) |
| `pnpm build` | Production build; also runs type checking |
| `pnpm start` | Serve the production build |

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical origin for metadata, sitemap, robots (default `https://infinitylabscol.com`) |
| `CONTACT_WEBHOOK_URL` | one of | Contact form delivery: POST JSON to a CRM / automation webhook |
| `RESEND_API_KEY` + `CONTACT_TO` (+ optional `CONTACT_FROM`) | one of | Contact form delivery by email via Resend HTTP API |
| `NEXT_PUBLIC_ANALYTICS_PROVIDER` | optional | `gtag` \| `plausible` \| `datalayer`; unset = no tracking (events logged in dev) |

If no delivery variable is set, the contact form validates and then offers a pre-filled email to `info@infinitylabscol.com` instead of pretending to send. Never commit `.env.local`.

## Languages and theme

Routes are prefixed by locale: `/es` (default), `/en`, `/fr`. `src/proxy.ts` redirects unprefixed paths to the saved locale (cookie `il_locale`) or Spanish. UI strings live in `src/i18n/dictionaries/{es,en,fr}.ts`; content modules in `src/content/*` expose `getX(locale)`. Every page emits `hreflang` alternates and the sitemap lists all locales.

The theme toggle (light · system · dark) is in the header; tokens for both themes live in `src/app/globals.css` under `[data-theme]`, with contrast verified in `docs/BRAND_IMPLEMENTATION.md` §13.

## Architecture overview

```
src/app          [locale]/ routes (App Router), sitemap/robots/manifest at the root, OG image per locale
src/i18n         locale config, dictionaries (es/en/fr)
src/content      typed content modules: site, navigation, operating model, solutions, capabilities, offers, principles, labs, team, industries, proof
src/components   ui (primitives, SectionFrame, SplitWords) · brand (LogoMark, Lockup) · system (RibbonField, RibbonScene, SiteRail, WorkflowDiagram) · sections · layout
src/lib          seo helpers, analytics adapter, contact validation/delivery, utils
public/brand     served logo files (approved symbol + mono treatments)
brand/           source assets and the brand research (not served)
docs/            audit, architecture, brand implementation, decisions, content gaps, analytics, Möbius, launch checklist
```

Design tokens live in `src/app/globals.css` (Tailwind v4 `@theme`), with a warm-paper canvas by default and a `.theme-dark` scope for "system" sections. The visual system ("engineering drawing": plotter ribbon hero, section frames, site rail, typed workflows, word settle) is documented in `docs/BRAND_IMPLEMENTATION.md` §12 and the research behind it in `docs/UX_UI_AUDIT.md`. No animation or UI library is used: canvas 2D, CSS and SVG only.

Content rules: nothing renders as proof (clients, case studies, testimonials, team) unless its content entry is `verified: true`. Gaps are tracked in `docs/CONTENT_GAPS.md`.

## Deployment

- Vercel: import the repository and set **Root Directory** to `infinitylabs-web`. Add the environment variables above. Legacy Webflow URLs are redirected (301) in `next.config.ts`.
- Any Node host: `pnpm build && pnpm start`.

## Documentation

`docs/SITE_AUDIT.md` · `docs/UX_UI_AUDIT.md` · `docs/COPY_AUDIT.md` · `docs/TECHNICAL_ARCHITECTURE.md` · `docs/BRAND_IMPLEMENTATION.md` · `docs/DECISION_LOG.md` · `docs/CONTENT_GAPS.md` · `docs/ANALYTICS_PLAN.md` · `docs/MOBIUS_CONCIERGE.md` · `docs/LAUNCH_CHECKLIST.md` · `docs/BUSINESS_STRATEGY.md` · `docs/MASTER_PROMPT.md` · `brand/research/BRAND_RESEARCH_PHASE_1-2.md`
