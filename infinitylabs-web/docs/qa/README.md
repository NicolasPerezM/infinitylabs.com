# Visual QA captures — v1.2 (AI × marketing, audited copy) — 2026-09-28

Captured with Playwright (Chromium) against the production build (`pnpm build && pnpm start`).

**Checks passing on this build**

- **Accessibility**: axe-core (WCAG 2.0/2.1/2.2 A + AA + best-practice) on 7 key routes × 2 themes = **0 violations**. Transitions disabled during the audit so final colours are measured.
- **Routing**: `/` → `/es`, cookie preference honoured, legacy Webflow paths → `/es/…`, `hreflang` + `x-default` on every page, `<html lang>` per locale, 75 sitemap entries (25 routes × 3 locales).
- **Layout**: no horizontal overflow at 390 / 834 / 1280 / 1440 px; no workflow step label clips its box in any language.
- **Behaviour**: no console or page errors; theme persists across navigation; mobile menu carries language and theme controls; reduced motion renders the ribbon static.
- **Copy**: home 1 064 words (EN) / 1 202 (ES) / 1 214 (FR); zero paragraphs over 40 words; metrics in `docs/COPY_AUDIT.md`.

| File | What it shows |
|---|---|
| `home-hero-es-light.jpg` · `home-hero-es-dark.jpg` | Spanish (default) hero, ribbon v2, light and dark |
| `home-hero-en-light.jpg` · `home-hero-fr-light.jpg` | English and French heroes with the ES · EN · FR switcher |
| `home-full-es-light.jpg` · `home-full-en-dark.jpg` | Full homepage, ten framed sections on one continuous line |
| `home-ai-marketing-es-light.jpg` · `-es-dark` · `-en` · `-fr` | The AI × marketing section: what the team runs, what the AI layer adds, and the full-width brand→lead chain |
| `home-ai-marketing-mobile-390.jpg` | The same section stacked on a small phone |
| `solution-marketing-systems-es.jpg` | Marketing Systems solution page |
| `offer-digital-growth-system-es-dark.jpg` | Digital Growth System offer in dark mode |
| `home-operating-model-es-dark.jpg` | Scrollytelling with the ribbon's active segment coloured |
| `contact-es-dark.jpg` | Contact form, dark mode |
| `home-hero-es-mobile.jpg` · `mobile-menu-es.jpg` | Mobile hero and menu |
| `home-hero-reduced-motion.jpg` | Static ribbon under `prefers-reduced-motion` |
| `opengraph-image-es.jpg` | Generated social preview (one per locale) |
