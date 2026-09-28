import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * Site-wide facts. Verified from the legacy site (docs/SITE_AUDIT.md §7) or tracked in docs/CONTENT_GAPS.md.
 */
export const siteFacts = {
  name: "Infinity Labs",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://infinitylabscol.com",
  email: "info@infinitylabscol.com",
  address: { street: "Carrera 11 #114-20", city: "Bogotá", country: "Colombia", cityVerified: false },
  calendly: "https://calendly.com/admin-infinitylabscol/30min",
  social: {
    linkedin: "https://www.linkedin.com/company/infinity-lab-col/",
    instagram: "https://www.instagram.com/infinitylabco/",
  },
  legalName: undefined as string | undefined,
} as const;

export function getSite(locale: Locale) {
  const d = getDictionary(locale);
  return { ...siteFacts, category: d.meta.category, tagline: d.meta.tagline, heroLede: d.meta.heroLede, description: d.meta.description };
}

/** Kept for modules that only need constants. */
export const site = siteFacts;
