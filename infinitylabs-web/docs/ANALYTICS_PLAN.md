# ANALYTICS PLAN

Status: implemented behind a no-op adapter (DEC-012). No tracker is loaded until a provider is chosen (GAP-012).

## 1. Principles

- No marketing trackers without an explicit decision and a consent approach.
- Events describe business intent, not UI mechanics.
- Every CTA carries a `data-event`; the `Enhancements` component forwards clicks to `track()` in `src/lib/analytics.ts`.
- The provider is selected with `NEXT_PUBLIC_ANALYTICS_PROVIDER` = `gtag` | `plausible` | `datalayer` | unset (no-op, logs in development).

## 2. Conversion model

| Level | Conversion | Event(s) |
|---|---|---|
| Primary | AI Opportunity Sprint / discovery conversation | `opportunity_sprint_cta` → `contact_start` → `contact_submit` |
| Secondary | Calendly conversation | `calendly_click` |
| Engagement | Solution / capability / offer / Labs exploration | `solution_view`, `capability_view`, `offer_view`, `labs_view` |
| Future | Case studies, insights | `case_study_view`, `insight_view` |

## 3. Event dictionary

| Event | Fired when | Properties | Where |
|---|---|---|---|
| `hero_primary_cta` | Click on hero primary button | `label`, `path` | Home hero |
| `hero_secondary_cta` | Click on hero secondary button | `label`, `path` | Home hero |
| `nav_cta` | Header "Start a Sprint" | `label`, `path` | Header / mobile nav |
| `opportunity_sprint_cta` | Any Sprint CTA outside the hero | `label`, `path` | Sprint section, final CTA, offer pages |
| `solution_view` | Click into a solution | `label`, `path` | Home grid, hubs, footer |
| `capability_view` | Click into a capability | `label`, `path` | Hubs, solution pages |
| `offer_view` | Click into an offer | `label`, `path` | Hubs, solution pages |
| `labs_view` | Click into Labs | `label`, `path` | Home, operating model |
| `calendly_click` | Outbound Calendly link | `label`, `path` | Final CTA, contact page |
| `contact_start` | First focus inside the contact form | `intent` | Contact |
| `contact_submit` | Server action returns success | `intent` | Contact |
| `contact_error` | Server action returns validation/delivery error | `intent` | Contact |

`path` is added automatically. `intent` values: `sprint`, `agentic-workflow-systems`, `enterprise-knowledge-document-ai`, `managed-ai`, `general`.

## 4. Page-level KPIs

| Page | Objective | KPI |
|---|---|---|
| Home | Route to Sprint or a solution | CTR to `/contact?intent=sprint` and `/solutions` |
| Solutions / solution detail | Qualify interest | Scroll to "How to buy it", clicks to offers |
| Offers / Sprint | Start the conversation | `contact_start` rate |
| Contact | Submit | `contact_submit` / `contact_start` |
| Labs / About | Credibility | Time on page, exits to contact |

## 5. Provider wiring (when decided)

- **GA4**: add `@next/third-parties/google` `GoogleAnalytics` in `layout.tsx` with `NEXT_PUBLIC_GA_ID`, set provider `gtag`. Requires cookie consent copy in `/privacy` and a banner only if non-essential cookies are used.
- **Plausible** (recommended default: cookieless, no banner): add the Plausible script via `next/script` (`afterInteractive`) and set provider `plausible`.
- **Tag Manager / dataLayer**: set provider `datalayer`; events are pushed as `{ event, ...props }`.

## 6. Reporting cadence

Monthly: conversions by intent, top solution pages, Sprint funnel drop-off, Calendly vs form ratio. Feed into the DECISION_LOG when structure changes.
