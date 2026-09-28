import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCapabilities } from "./capabilities";
import { getSolutions } from "./solutions";

export type NavItem = { label: string; href: string };

export function getNavigation(locale: Locale) {
  const d = getDictionary(locale);
  const primaryNav: NavItem[] = [
    { label: d.nav.solutions, href: href(locale, "/solutions") },
    { label: d.nav.capabilities, href: href(locale, "/capabilities") },
    { label: d.nav.offers, href: href(locale, "/offers") },
    { label: d.nav.labs, href: href(locale, "/labs") },
    { label: d.nav.about, href: href(locale, "/about") },
  ];
  const headerCta = { label: d.nav.cta, href: href(locale, "/contact?intent=sprint"), event: "nav_cta" };
  const footerColumns: { heading: string; items: NavItem[] }[] = [
    { heading: d.footer.solutions, items: getSolutions(locale).map((s) => ({ label: s.name, href: href(locale, `/solutions/${s.slug}`) })) },
    { heading: d.footer.capabilities, items: getCapabilities(locale).map((c) => ({ label: c.name, href: href(locale, `/capabilities/${c.slug}`) })) },
    {
      heading: d.footer.company,
      items: [
        { label: d.nav.offers, href: href(locale, "/offers") },
        { label: d.footer.sprint, href: href(locale, "/offers/ai-opportunity-sprint") },
        { label: d.nav.labs, href: href(locale, "/labs") },
        { label: d.nav.about, href: href(locale, "/about") },
        { label: d.nav.contact, href: href(locale, "/contact") },
      ],
    },
  ];
  const legalNav: NavItem[] = [
    { label: d.footer.privacy, href: href(locale, "/privacy") },
    { label: d.footer.terms, href: href(locale, "/terms") },
  ];
  return { primaryNav, headerCta, footerColumns, legalNav };
}
