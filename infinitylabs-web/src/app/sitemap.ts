import type { MetadataRoute } from "next";
import { capabilitySlugs } from "@/content/capabilities";
import { offerSlugs } from "@/content/offers";
import { publishedInsights, verifiedCaseStudies } from "@/content/proof";
import { siteFacts } from "@/content/site";
import { solutionSlugs } from "@/content/solutions";
import { href, locales } from "@/i18n/config";
import { languageAlternates } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteFacts.url.replace(/\/$/, "");
  const now = new Date();
  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/solutions", priority: 0.9, changeFrequency: "monthly" },
    ...solutionSlugs.map((s) => ({ path: `/solutions/${s}`, priority: 0.8, changeFrequency: "monthly" as const })),
    { path: "/capabilities", priority: 0.8, changeFrequency: "monthly" },
    ...capabilitySlugs.map((s) => ({ path: `/capabilities/${s}`, priority: 0.7, changeFrequency: "monthly" as const })),
    { path: "/offers", priority: 0.9, changeFrequency: "monthly" },
    ...offerSlugs.map((s) => ({ path: `/offers/${s}`, priority: s === "ai-opportunity-sprint" ? 0.9 : 0.8, changeFrequency: "monthly" as const })),
    { path: "/labs", priority: 0.6, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    ...verifiedCaseStudies.map((c) => ({ path: `/case-studies/${c.slug}`, priority: 0.7, changeFrequency: "monthly" as const })),
    ...publishedInsights.map((i) => ({ path: `/insights/${i.slug}`, priority: 0.5, changeFrequency: "monthly" as const })),
  ];
  return routes.flatMap((r) =>
    locales.map((l) => ({
      url: `${base}${href(l, r.path)}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
      alternates: { languages: languageAlternates(r.path) },
    })),
  );
}
