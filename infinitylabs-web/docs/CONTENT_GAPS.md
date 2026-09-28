# CONTENT GAPS — items required before launch

Rule: nothing below is invented on the site. Where a gap exists the site uses honest neutral language or hides the component.

| ID | Gap | Where it matters | Owner | Status |
|---|---|---|---|---|
| GAP-001 | **Approved "Infinity Labs" vector wordmark.** The only master lockup says "Infinity Lab." The site ships the untouched symbol + a typeset "Infinity Labs" wordmark as a provisional lockup (DEC-006). Founder must approve or supply the official wordmark. | Header, footer, OG image | Founder / designer | Open |
| GAP-002 | **Trademark / naming clearance** for "Infinity Labs" in Colombia (SIC), USA (conflict: Infinity Labs LLC, US reg. 7,228,026) and Canada, per brand research §8–9. | Legal; NA expansion | Founder + IP counsel | Open |
| GAP-003 | **Legal company information**: registered legal name (razón social), NIT, registered address with city, jurisdiction. Footer currently shows "Carrera 11 #114-20" without city. | Footer, Privacy, Terms, Organization schema | Founder | Open |
| GAP-004 | **Privacy policy and terms** (Colombian Ley 1581 data-protection notice for the contact form; cookie statement). Pages exist as placeholders that state they are pending. | `/privacy`, `/terms`, form consent text | Legal | Open |
| GAP-005 | **Client permissions.** Legacy home showed IBM, Meta, Juan Valdez, Fincaraíz and an unidentified shield. Relationship type (client, partner, tooling, event) and written permission are unknown. Logo wall is not shipped. | Home "proof" section | Founder | Open |
| GAP-006 | **Case studies** with client-approved metrics. None verifiable today. `CaseStudy` component and `/case-studies` route are built but hidden until at least one entry has `verified: true`. | Home §07, `/case-studies` | Founder + delivery leads | Open |
| GAP-007 | **Team confirmation.** Legacy roster: Felipe Madero, Andrés Hurtado, Camilo Sanabria, Harrison Hoyos, Andrés Márquez with marketing-era titles. New titles, bios, LinkedIn URLs and high-resolution photos (≥ 1200 px, consistent lighting) needed. Team section is hidden until confirmed. | `/about` | Founder | Open |
| GAP-008 | **NOIT status and positioning.** Legacy copy describes a working market-intelligence product. Confirm: is it live, in beta, or a Labs prototype? Which claims are demonstrable? Site currently presents NOIT as a Labs initiative in development. | `/labs`, home §08 | Founder | Open |
| GAP-009 | **Labs artifacts.** Real experiments, benchmarks, open-source repos, internal accelerators that can be named publicly. Currently the Labs page describes practice areas without fictional research. | `/labs` | Engineering | Open |
| GAP-010 | **Insights / articles.** Zero published articles. `/insights` is excluded from navigation and sitemap until the first article exists. | Nav, home §12 | Marketing | Open |
| GAP-011 | **Form delivery provider.** No email/CRM provider configured. Contact form validates and stores nothing until `CONTACT_DELIVERY_*` env variables are set (see README). Calendly link works today. | `/contact` | Founder / DevOps | Open |
| GAP-012 | **Analytics provider decision** (GA4 / Plausible / PostHog). Event plan is implemented behind a no-op adapter. | All CTAs | Founder | Open |
| GAP-013 | **Industry claims.** Legacy listed 10 sectors. Only sectors with real delivery experience may be named. Site uses "typical environments" language, not "we specialize in". Provide a confirmed list with at least one anonymized example each. | Home, `/solutions` | Founder | Open |
| GAP-014 | **Offer packaging details** for AI Opportunity Sprint: duration, deliverables, price band or "from" price, who participates. Site describes structure without price. | `/offers/ai-opportunity-sprint` | Founder | Open |
| GAP-015 | **Language decision** confirmed: English-first with Spanish locale planned (DEC-003). Confirm and prioritise Spanish translation budget. | All | Founder | Open |
| GAP-016 | **Social handle consolidation.** Instagram appears as `@infinitylabco` and `@infinitylab.col`; LinkedIn slug is `infinity-lab-col`. Decide the canonical handles (ideally `infinitylabs…`). | Footer | Founder | Open |
| GAP-017 | **Phone / WhatsApp business number** (legacy contact page carries a placeholder `+(123)1800-567-8990`). | `/contact`, schema | Founder | Open |
| GAP-018 | **Enterprise trust facts**: security practices, data handling, model providers used, SLA for Managed AI. Site states principles, not certifications. Confirm anything certifiable (ISO, SOC2) before adding. | Trust section, Managed AI | Founder | Open |
| GAP-019 | **Möbius concierge backend.** Legacy endpoint `infinitylabchat.com` is dead. Concierge is documented (`MOBIUS_CONCIERGE.md`) and not live. | Site-wide | Engineering | Open |
| GAP-020 | **OG image / social preview** final artwork once GAP-001 is resolved (generated programmatically today from the provisional lockup). | Sharing | Design | Open |
