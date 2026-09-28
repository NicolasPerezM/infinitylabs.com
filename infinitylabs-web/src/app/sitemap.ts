import type { MetadataRoute } from "next";
import { capabilities } from "@/content/capabilities";
import { offers } from "@/content/offers";
import { publishedInsights, verifiedCaseStudies } from "@/content/proof";
import { site } from "@/content/site";
import { solutions } from "@/content/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();
  const entry = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly") => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    entry("/", 1, "weekly"),
    entry("/solutions", 0.9),
    ...solutions.map((s) => entry(`/solutions/${s.slug}`, 0.8)),
    entry("/capabilities", 0.8),
    ...capabilities.map((c) => entry(`/capabilities/${c.slug}`, 0.7)),
    entry("/offers", 0.9),
    ...offers.map((o) => entry(`/offers/${o.slug}`, o.primary ? 0.9 : 0.8)),
    entry("/labs", 0.6),
    entry("/about", 0.6),
    entry("/contact", 0.8),
    ...verifiedCaseStudies.map((c) => entry(`/case-studies/${c.slug}`, 0.7)),
    ...publishedInsights.map((i) => entry(`/insights/${i.slug}`, 0.5)),
  ];
}
