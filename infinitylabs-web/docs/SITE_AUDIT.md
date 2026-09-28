# SITE AUDIT — Legacy Infinity Labs website

Date: 2026-09-28 · Branch: `redesign/infinity-ai-systems` · Auditor: autonomous engineering/brand team (Claude)
Legacy location: repository root (`../*.html`, `../css`, `../js`, `../images`, `../fonts`, `../infinity-lab.webflow.zip`)
New project location: `infinitylabs-web/` (this folder)

## 1. Current stack

| Item | Finding |
|---|---|
| Framework | **None.** Static HTML export from Webflow (generator meta `Webflow`, last published 2025-08-05). |
| Template origin | Commercial Webflow template **"Monday 128 CMS" by BRIX Templates**. 22 of 38 pages still carry the template `<title>` ("… - Monday 128 CMS"). |
| Runtime / package manager | None. No `package.json`, no build step, no tests, no lint. |
| Hosting assumption | Webflow hosting. Live at `https://infinitylabscol.com` (HTTP 200) and `https://infinity-lab.webflow.io`. Forms post to Webflow (`data-wf-*`, `/.wf_auth`), which does **not work** from a self-hosted export. |
| CSS | 3 files: `normalize.css` (7.7 KB), `webflow.css` (38 KB), `infinity-lab.webflow.css` (230 KB, Webflow-generated class soup, hundreds of unused template rules). Inline `<style>` blocks per page for star animations. |
| JS | `js/webflow.js` (1.7 MB compiled Webflow runtime) + jQuery 3.5.1 from Webflow CDN + inline chatbot script duplicated in ~10 pages. |
| Fonts | Google Fonts loaded via `webfont.js`: **Lato (10 styles), Space Grotesk (5), DM Sans (6)** + local Font Awesome (684 KB of TTF). Three families, render-blocking loader. |
| Third-party scripts | `webfont.js`, jQuery (cloudfront), Calendly widget (`contact-us-1.html`). No analytics tag found (no GA/GTM/Meta Pixel IDs). |
| Language | All pages `lang="es"`. Copy is Spanish; template pages remain English. |
| Git | 2 commits ("first commit", "cambio botones"). Clean tree at audit start. |

## 2. Current routes (38 HTML files)

| Route | Type | Verdict |
|---|---|---|
| `index.html` | Company home (hero "Impulsamos tu crecimiento digital", robot hand, 4 service cards, client logo loop, CTA) | **Replace.** Positioning is marketing agency + chatbot vendor. |
| `nuestros-servicios.html` | Services (Agentes AI, NOIT, Publicidad y Marketing, Consultoría + FAQ) | **Replace.** Mixes capabilities/solutions/offers; unverifiable claims ("ROAS promedio 6.4×", "recupera hasta 30 % del costo operativo en 90 días"). |
| `nosotros.html` | About (Misión/Visión marketing-centric, 5 pillars) | **Rewrite.** Mission/vision contradict the new strategy. |
| `growth-partner.html` | Landing "Growth Partner Lab" + team (5 people) | **Retire page; salvage team roster** (see §7). |
| `our-process.html` | 6-step "process" (Möbius chatbot, dashboard) | **Replace.** Describes a chatbot funnel, not an engineering method. |
| `mobius-chatbot.html` | Chatbot product landing with fabricated metrics (+30 % ventas, −25 % costos, +40 % satisfacción) | **Delete.** Fake proof. Backend dead. |
| `landing-marketing.html` | Lead magnet "Manual Definitivo de Marketing Digital" (Nike/Pepsi/Got Milk case cards) | **Delete.** Off-strategy. |
| `contact-us-1.html`, `contact-us-3.html` | Calendly embed / Webflow form | **Replace** with structured qualification form; keep Calendly link as secondary. |
| `blog.html`, `detail_blog-*.html` | Empty CMS collections ("No items found") | **Delete.** Rebuild as `/insights` only when content exists. |
| `career.html`, `detail_job-positions.html` | Careers (no open positions) | **Delete for v1.** Register in CONTENT_GAPS. |
| `faq.html`, `detail_faqs.html`, `detail_preguntas-frecuentes.html` | Lorem-style SaaS template FAQ ("How does SAASworld make money?") | **Delete.** Template content. |
| `testimonials.html` | 15 **template testimonials** with fake names ("Tank Rich", "King World") | **Delete.** Fake social proof. |
| `pricing-2.html`, `pricing-3.html` | Template pricing | **Delete.** |
| `checkout.html`, `paypal-checkout.html`, `order-confirmation.html`, `detail_product.html`, `detail_sku.html`, `detail_category.html` | Webflow Ecommerce template pages | **Delete.** |
| `home-2..5.html`, `old-home.html` | Template home variants | **Delete.** |
| `search.html`, `coming-soon.html`, `401.html`, `404.html` | Utility pages (template-branded) | **Rebuild** `not-found` in new stack. |
| `templates/style-guide.html`, `changelog.html`, `licensing.html` | Template vendor pages (Unsplash/FontAwesome licensing, "Buy this Template") | **Delete.** |

Legacy nav exposes only: Servicios · Nosotros · Contacto. Footer links "Licensing" to `coming-soon.html`.

## 3. Current design system

- No tokens. Webflow CSS variables present but decorative: `--bg-blue #030020`, `--dark-blue #161827`, `--thirdcolor #829fd5`, `--paragraph-grey #b6b6b6`, `--lines-color-dark #282828c2`.
- Black page background, white text, grey paragraphs, violet→sky gradient text spans (`#A662E6`, `#5ABEFF`).
- Typography: Lato body, Space Grotesk / DM Sans headings, heavy weights; no scale, no rhythm.
- Motion: blinking "stars" (`@keyframes appearing`), Webflow fade-ins with `style="opacity:0"` (content invisible if JS fails), logo marquee.
- Imagery: AI-generated robot hand hero (`hand.png`), "nanotechnology" / "idea" / "promotion" flat icons, starfield backgrounds, planet imagery, WhatsApp photos. **All fall under the anti-cliché rule.**

## 4. Content architecture

Everything hard-coded per page; nav + footer + chatbot markup duplicated in every file. No content layer, no CMS collections populated (blog/jobs empty).

## 5. Forms and lead flows

| Flow | Status |
|---|---|
| Contact form (`contact-us-3.html`, `method="get"`, no action) | **Broken outside Webflow.** |
| Lead magnet forms (`landing-marketing.html`) | Broken outside Webflow. Off-strategy. |
| Möbius chat widget (all main pages) → `POST https://infinitylabchat.com/api/chat/` | **Dead.** Domain does not resolve (DNS NXDOMAIN, curl exit 6). Widget shows on every page and silently fails. |
| Calendly | `calendly.com/admin-infinitylabscol/30min` (working link; also a "growth partner" demo link `calendly.com/info-jime/...`). |
| Newsletter (`wf-form-Subscribe-Form`) | Template, unwired. |

## 6. SEO / metadata

- 22 titles still "… - Monday 128 CMS"; one page literally "Monday 128 CMS - Webflow HTML website template".
- Meta description on home: marketing-agency copy ("marketing digital … disruptiva").
- OG tags present only on home (no image). No canonical, no sitemap, no robots, no structured data, `lang="es"` everywhere including English template pages.
- Images have empty `alt=""` throughout.

## 7. Verified real company information (reusable)

| Item | Value | Source |
|---|---|---|
| Public email | `Info@infinitylabscol.com` | footer, all pages |
| Address | Carrera 11 #114-20 (city not stated; Bogotá implied) | footer |
| LinkedIn company | `linkedin.com/company/infinity-lab-col` | footer |
| Instagram | `instagram.com/infinitylabco` (career page says `@infinitylab.col` — inconsistent) | footer / career |
| Facebook | `facebook.com/profile.php?id=61556969677761` | footer |
| Calendly | `calendly.com/admin-infinitylabscol/30min` | contact page |
| Team (legacy roles, marketing-era) | Felipe Madero — Business Executive · Andrés Hurtado — Director Trafficker and Strategy · Camilo Sanabria — Leader in Digital Strategies · Harrison Hoyos — Head of Innovation and Technological Development · Andrés Márquez — Director of AI and Technological Development | `growth-partner.html` (photos `IMG_25xx.jpg`, 333×500, low-res) |
| NOIT (product) | Competitive/market intelligence: conversational brief, competitor detection, multichannel scraping (Instagram, LinkedIn, FB Ad Library), sentiment, audience profile, benchmarks, dashboards, insight chat, alerts | `nuestros-servicios.html`, NOIT logo `logoDark.png` |
| Möbius (concept) | AI chat concierge that "guides visitors and discovers needs" | `our-process.html`, `mobius.svg` |
| Client/partner logos shown | IBM, Meta, Juan Valdez, Fincaraíz, one unidentified shield | home logo loop — **relationship unverified; not to be reused without written confirmation** |
| Fabricated/unsupported numbers | "ROAS promedio 6.4×", "recupera hasta 30 % del costo operativo en 90 días", "+30 % ventas / −25 % costos / +40 % satisfacción", "7/8 cifras en 2024" | services / chatbot / growth pages — **excluded** |

## 8. Brand inconsistencies

- Name: `Infinity Lab` ×25 in copy and titles, `Infinity Lab.` in the logo wordmark, `InfinityLab` (no space) in copy, `Infinity Lab Col` in handles, email domain `infinitylabscol`. Never "Infinity Labs".
- Logo files: 3 different symbol treatments (plain symbol; symbol with inner Möbius "Y" mark; symbol on white circle) used interchangeably in nav / mobile nav / footer.
- Two unrelated gradients: symbol (violet #A662E6 · sky #5ABEFF · indigo #3E4190 · mint #5DE7C8) and Möbius mark (#7C96F5 · #61E1CA · #965DD6).
- NOIT uses an unrelated orange (~#E05E12) with a white wordmark that is invisible on light backgrounds.
- Footer year frozen at 2024.

## 9. Assets

- `images/` = 243 files / 14 MB. 220 referenced, 23 orphaned. Includes a 5215×3280 PNG (`landing_2.png`), 1.36 MB SVG with embedded PNG (`control_1.svg`), template stock, WhatsApp photos, robot hand.
- **Salvaged into `brand/`:** the symbol SVGs (256, 32/favicon, on-white-circle), both legacy lockups (for reference), Möbius mark + avatar, NOIT logo, 5 team photos, 5 unverified client logos (quarantined).
- Everything else is template or off-brand and is **not carried forward**.

## 10. Performance risks

1.7 MB `webflow.js` + jQuery on every page; 230 KB template CSS; 3 font families + Font Awesome TTFs (~1 MB); 10+ decorative full-width raster backgrounds; content hidden with `opacity:0` until Webflow IX2 runs; no image dimensions on many `<img>`; no lazy strategy beyond `loading="lazy"`.

## 11. Accessibility risks

Empty `alt` on all images (including logo), `<h1>` used for service cards (multiple H1s per page), nav built from `<div>` with duplicated hover text, no focus styles, no reduced-motion handling for blinking stars, contrast of grey `#b6b6b6` on black fine but violet gradient text on black ~3:1, chat widget is an unlabeled `div` button, forms with placeholder-only labels.

## 12. Technical debt / template remnants

Template titles, "More Templates / Buy this Template" links in FAQ/career/testimonials/process pages, BRIX close icon asset, Webflow `data-wf-*` attributes, ecommerce pages, password page, empty CMS collections, 5 duplicate homes, `Licensing` footer link, dead chatbot endpoint duplicated inline on ~10 pages, `tel:+(123)1800-567-8990` placeholder phone in contact-us-3.

## 13. Reuse decision

| Category | Decision |
|---|---|
| **Keep** | Symbol geometry (all three faces), favicon geometry, NOIT logo, Möbius mark, verified contact data, team roster (pending confirmation), NOIT feature list (pending confirmation), Calendly link. |
| **Refactor** | Nothing from the code base is refactorable; the Webflow export cannot be componentized or tokenized without rewriting it. |
| **Delete** | All HTML, CSS, JS, fonts, template images (kept untouched in the repo root for reference until the new site ships; not shipped). |

Conclusion: the legacy site is a **technical starting point only**. It contributes brand geometry and a handful of facts, not code. See `TECHNICAL_ARCHITECTURE.md` for the migration decision.
