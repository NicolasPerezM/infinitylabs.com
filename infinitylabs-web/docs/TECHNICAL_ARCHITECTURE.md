# TECHNICAL ARCHITECTURE

Date: 2026-09-28 · Status: decided (DEC-001 in `DECISION_LOG.md`)

## 1. Migration decision: replace the Webflow export with a Next.js application

### Why the current stack is replaced

The master prompt asks for an intelligent refactor when the existing stack can support SEO, accessibility, performance, maintainability, responsive design, motion, structured content, analytics and future AI features. The legacy site fails the test on structural grounds, not on taste:

| Requirement | Legacy Webflow export | Verdict |
|---|---|---|
| Maintainability | 38 hand-exported HTML files; nav/footer/chat duplicated in each; Webflow-generated class names; 230 KB template CSS impossible to prune safely; a 1.7 MB opaque runtime | Fails |
| Structured content | No content layer; empty CMS collections; copy hard-coded | Fails |
| Forms / lead flow | Webflow form endpoints only work on Webflow hosting; chatbot backend is dead | Fails |
| Design system | No tokens, no components | Fails |
| Motion | Webflow IX2 (requires runtime; hides content until JS runs) | Fails |
| SEO/metadata architecture | Per-file, template titles, no sitemap/robots/canonical | Weak |
| Future AI-native features (Möbius concierge, diagnostics) | Requires server routes, streaming, secrets handling | Impossible |
| Performance | jQuery + webflow.js + 3 font families + Font Awesome per page | Poor |

Refactoring in place would mean rewriting every file anyway, while inheriting the class soup. A rewrite in a component framework is cheaper and produces the maintainable base the mission requires.

### Why Next.js (and not "because it is fashionable")

- Component-driven React with TypeScript gives the reusable component and token system the brief demands.
- App Router metadata API, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` give first-class technical SEO.
- Server Components + static generation: every marketing page renders to static HTML at build time (no hydration cost where not needed), which is the performance profile of a content site.
- Route Handlers / Server Actions give a secure home for the contact form and, later, the Möbius concierge and diagnostic tools without exposing keys.
- `next/font` self-hosts fonts with zero layout shift; `next/image` handles responsive images.
- The founder's ecosystem already uses Next.js + pnpm + Vercel (sibling projects, Vercel CLI plugin configured). Team familiarity lowers maintenance risk.

Alternatives considered: **Astro** (excellent for static content, lighter JS; rejected because future AI-native interactive features and the team's stack favour Next.js) and **keeping Webflow** (rejected: hosted editor lock-in, no engineering-grade system, no server logic).

## 2. Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js 16 (App Router, React 19, TypeScript strict) | Above |
| Styling | Tailwind CSS v4 with CSS-first `@theme` tokens (all tokens are CSS custom properties) | Semantic tokens, no runtime CSS-in-JS |
| Fonts | `next/font/google`: Schibsted Grotesk (display + body, variable) and JetBrains Mono (system labels, diagrams) | Two families total, self-hosted |
| Motion | CSS transitions/keyframes, SVG animation, IntersectionObserver reveals. No Framer Motion, GSAP or WebGL in v1 | Minimum sufficient architecture; `prefers-reduced-motion` respected globally |
| Content | Typed TypeScript content modules in `src/content/` (navigation, solutions, capabilities, offers, principles, labs, team, site metadata) | No CMS until editorial volume justifies it |
| Forms | Server Action → provider-agnostic delivery (Resend/SMTP/webhook selectable by env) with validation; graceful fallback to `mailto` + Calendly when no provider is configured | Preserve a real lead path without pretending a backend exists |
| Analytics | Event hooks (`src/lib/analytics.ts`) with a no-op default; provider wired only when `NEXT_PUBLIC_ANALYTICS_*` env is set | No silent trackers |
| Testing | `pnpm build` + `pnpm lint` + `tsc --noEmit`; Playwright optional (not installed in v1) | No large frameworks for appearance |
| Deployment | Vercel (root directory = `infinitylabs-web`) or any Node host | |

## 3. Folder structure

```
infinitylabs-web/
  brand/                 source brand assets + research (not served)
  docs/                  audit, architecture, brand implementation, decisions, gaps, analytics, Möbius, launch
  public/                served static assets (logo SVGs, icons, og)
  src/
    app/                 routes (App Router), metadata files, sitemap, robots
    components/
      ui/                primitives: Container, Section, Button, Tag, Eyebrow, TextLink
      brand/             LogoMark, Wordmark, Lockup, StateGradient
      system/            SystemGraphic, ProcessFlow (Discover→Build→Operate), ArchitectureDiagram
      sections/          page sections (Hero, Problem, OperatingModel, Solutions, Principles, Sprint, Labs, CTA)
      layout/            Header, Footer, MobileNav, SkipLink
    content/             typed content: site, navigation, solutions, capabilities, offers, principles, labs, team
    lib/                 utils, analytics, seo helpers, form actions
    styles/              (tokens live in app/globals.css)
```

## 4. Rendering and routes

All marketing routes are statically generated. Deep routes are created only where content exists (see `DECISION_LOG.md` DEC-004): `/`, `/solutions`, `/solutions/[slug]`, `/capabilities`, `/capabilities/[slug]`, `/offers/ai-opportunity-sprint`, `/labs`, `/about`, `/contact`, `/insights` (placeholder-free: only shown when at least one article exists), `not-found`.

## 5. Risk register

| Risk | Mitigation |
|---|---|
| URL changes vs. live Webflow site (`/nuestros-servicios`, `/nosotros`, `/contact-us-1`) | `next.config.ts` redirects from legacy paths to new routes (301). |
| Language shift (legacy Spanish) | English-first with i18n-ready content modules; Spanish locale planned (DEC-003). Legacy Spanish routes redirect to English equivalents until `/es` exists. |
| No form backend today | Server Action with env-selected provider; documented in README; Calendly link always available. |
| Team/clients unverified | Components exist but render only from content modules flagged `verified: true`. |
| Trademark exposure of the name (brand research §8) | Out of scope for code; flagged in CONTENT_GAPS as a legal prerequisite for North American expansion. |

## 6. Performance budget (targets)

- JS shipped to the client on the home page: < 90 KB gzipped (framework + minimal client islands).
- Fonts: 2 variable families, latin subset, `display: swap`.
- LCP element: text hero (no LCP image); hero graphic is inline SVG.
- Images: only `next/image` with explicit dimensions; no raster backgrounds.
- Lighthouse targets: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100.

## 7. SEO / deployment implications

Static output is crawlable HTML with canonical, OG, Twitter, JSON-LD Organization/Service schema, `sitemap.xml`, `robots.txt`. Deployment on Vercel with the project root set to `infinitylabs-web` (or promote the folder to repo root when the legacy export is removed).
