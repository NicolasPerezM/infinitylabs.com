/**
 * Site-wide facts. Everything here is either verified from the legacy site
 * (see docs/SITE_AUDIT.md §7) or an explicit TODO tracked in docs/CONTENT_GAPS.md.
 * Never put unverified claims in this file.
 */

export const site = {
  name: "Infinity Labs",
  /** Public category (rank-1 business strategy §1). */
  category: "AI Transformation & Engineering",
  /** Provisional working line; founder may replace wording (BUSINESS_STRATEGY §1). */
  tagline: "We turn business processes into intelligent systems.",
  description:
    "Infinity Labs is an AI Transformation & Engineering company. We design, build and operate AI-powered business systems for mid-market and enterprise organizations.",
  /** Production URL. Update when the domain decision is final (GAP-016). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://infinitylabscol.com",
  locale: "en",
  /** Planned locales (DEC-003). */
  locales: ["en", "es"] as const,
  email: "info@infinitylabscol.com",
  /** Street address verified; city pending (GAP-003). */
  address: {
    street: "Carrera 11 #114-20",
    city: "Bogotá",
    country: "Colombia",
    cityVerified: false,
  },
  calendly: "https://calendly.com/admin-infinitylabscol/30min",
  social: {
    linkedin: "https://www.linkedin.com/company/infinity-lab-col/",
    instagram: "https://www.instagram.com/infinitylabco/",
  },
  /** Legal name, NIT etc. unknown (GAP-003). */
  legalName: undefined as string | undefined,
  foundingYear: undefined as number | undefined,
} as const;

export const primaryCta = {
  label: "Start an AI Opportunity Sprint",
  href: "/contact?intent=sprint",
  event: "opportunity_sprint_cta",
} as const;

export const secondaryCta = {
  label: "Explore solutions",
  href: "/solutions",
  event: "solution_view",
} as const;
