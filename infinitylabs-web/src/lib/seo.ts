import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Exclude from index (used for placeholder legal pages). */
  noIndex?: boolean;
};

export function buildMetadata({ title, description, path, noIndex }: PageMeta): Metadata {
  const url = new URL(path, site.url).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: "website",
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    ...(site.legalName ? { legalName: site.legalName } : {}),
    url: site.url,
    logo: new URL("/brand/infinity-labs-symbol.svg", site.url).toString(),
    email: site.email,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressCountry: "CO",
    },
    sameAs: [site.social.linkedin, site.social.instagram],
    knowsAbout: [
      "AI transformation",
      "AI engineering",
      "Agentic workflows",
      "Enterprise knowledge systems",
      "Document intelligence",
      "AI evaluation",
      "Managed AI",
    ],
  };
}

export function serviceJsonLd(input: { name: string; description: string; path: string; type?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.type ?? "AI Transformation & Engineering",
    description: input.description,
    url: new URL(input.path, site.url).toString(),
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: ["CO", "US", "CA", "LATAM"],
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.path, site.url).toString(),
    })),
  };
}
