import type { Metadata } from "next";
import { href, locales, ogLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { siteFacts } from "@/content/site";

type PageMeta = { title: string; description: string; path: string; noIndex?: boolean };

const abs = (locale: Locale, path: string) => new URL(href(locale, path), siteFacts.url).toString();

export function languageAlternates(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of locales) map[l] = abs(l, path);
  map["x-default"] = abs("es", path);
  return map;
}

export function buildMetadata(locale: Locale, { title, description, path, noIndex }: PageMeta): Metadata {
  const url = abs(locale, path);
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: { title, description, url, siteName: siteFacts.name, type: "website", locale: ogLocale[locale] },
    twitter: { card: "summary_large_image", title, description },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

export function organizationJsonLd(locale: Locale) {
  const d = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteFacts.name,
    ...(siteFacts.legalName ? { legalName: siteFacts.legalName } : {}),
    url: siteFacts.url,
    logo: new URL("/brand/infinity-labs-symbol.svg", siteFacts.url).toString(),
    email: siteFacts.email,
    description: d.meta.description,
    address: { "@type": "PostalAddress", streetAddress: siteFacts.address.street, addressCountry: "CO" },
    sameAs: [siteFacts.social.linkedin, siteFacts.social.instagram],
    knowsAbout: ["AI transformation", "AI engineering", "Agentic workflows", "Enterprise knowledge systems", "Document intelligence", "AI evaluation", "Managed AI"],
  };
}

export function serviceJsonLd(locale: Locale, input: { name: string; description: string; path: string; type?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.type ?? getDictionary(locale).meta.category,
    description: input.description,
    url: abs(locale, input.path),
    provider: { "@type": "Organization", name: siteFacts.name, url: siteFacts.url },
    areaServed: ["CO", "US", "CA", "FR", "LATAM"],
    inLanguage: locale,
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.question, acceptedAnswer: { "@type": "Answer", text: i.answer } })),
  };
}

export function breadcrumbJsonLd(locale: Locale, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: abs(locale, item.path) })),
  };
}
