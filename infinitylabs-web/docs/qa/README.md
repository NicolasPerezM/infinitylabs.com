# Visual QA captures — v1.0 "engineering drawing" (2026-09-28)

Captured with Playwright (Chromium) against the production build (`pnpm build && pnpm start`).
Checks passed on this build: no horizontal overflow at 390 / 834 / 1280 / 1440 px; no console or page errors on
any route; mobile menu traps focus and closes on Escape; reduced motion renders the ribbon static, hides the
packets and shows headlines instantly; contact validation and the "delivery not configured" fallback; home
text budget 895 words with no paragraph over 40 words.

| File | What it shows |
|---|---|
| `home-hero-desktop-1440.jpg` | Plotter ribbon hero, word settle, instrument strip, site rail, header readout |
| `home-hero-tablet-834.jpg` / `home-hero-mobile-390.jpg` | Ribbon gets its own block below the statement on narrow screens |
| `home-hero-reduced-motion.jpg` | Static ribbon, no packets, headline visible immediately |
| `home-full-desktop-1440.jpg` | Nine framed sections on one continuous line |
| `home-operating-model-scrolly.jpg` | Sticky loop highlighting the active stage while stages pass |
| `home-solutions-index-preview.jpg` | Index rows with the live typed-workflow preview |
| `home-how-we-build-ledger.jpg` | Principles ledger on the dark canvas with pointer-revealed grid |
| `home-labs-commitments.jpg` | Labs lines with status tags; commitments |
| `home-next-step-footer.jpg` | Final CTA and footer with the loop closing on the symbol |
| `site-rail-hover-chip.jpg` | Rail node hover chip (code only when active, never over content) |
| `offer-sprint-hero.jpg` | Interior page header in the drafting grammar |
| `mobile-nav-open-390.jpg` | Mobile navigation dialog |
| `contact-validation-desktop.jpg` | Contact form validation states |
| `opengraph-image.jpg` | Generated social preview |
