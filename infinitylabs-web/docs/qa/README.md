# Visual QA captures (2026-09-28)

Captured with Playwright (Chromium) against the production build (`pnpm build && pnpm start`).
Checks passed: no horizontal overflow at 390 / 834 / 1280 / 1440 px, no console or page errors on any route,
mobile menu traps focus and closes on Escape, contact form validation (8 field errors) and the
"delivery not configured" fallback, reduced-motion hides the travelling packets in the hero loop.

| File | What it shows |
|---|---|
| `home-hero-desktop-1440.jpg` | First viewport: 5-second test (AI · engineering · business systems · enterprise) |
| `home-full-desktop-1440.jpg` | Full homepage narrative (14 sections, proof/insights hidden by design) |
| `home-full-mobile-390.jpg` | Full homepage on a small phone |
| `mobile-nav-open-390.jpg` | Mobile navigation dialog |
| `solution-document-intelligence-desktop.jpg` | Solution page with typed-step workflow diagram |
| `offer-ai-opportunity-sprint-desktop.jpg` | Primary offer page with phases, deliverables, FAQ |
| `labs-desktop.jpg` | Labs page with honest status labels |
| `contact-validation-desktop.jpg` | Contact form validation states |
| `opengraph-image.jpg` | Generated social preview |
