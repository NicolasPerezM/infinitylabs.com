import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { siteFacts } from "@/content/site";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "es";
  const t = getDictionary(locale).pages.privacy;
  return buildMetadata(locale, { title: t.metaTitle, description: t.metaDescription, path: "/privacy", noIndex: true });
}

/** Placeholder until legal review (GAP-004). States only what is true today. */
export default async function PrivacyPage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const t = getDictionary(raw).pages.privacy;
  return (
    <section aria-labelledby="privacy-h" className="bg-surface-primary">
      <Container size="prose" className="flex flex-col gap-6 py-section">
        <span className="label-mono text-text-tertiary">{t.eyebrow}</span>
        <h1 id="privacy-h" className="text-display-lg">{t.title}</h1>
        <p className="text-body text-text-secondary">{t.intro}</p>
        <ul className="flex flex-col gap-3 text-body text-text-secondary">
          <li>{t.items[0]}</li>
          <li>{t.items[1]}</li>
          <li>{t.items[2]} <a href={`mailto:${siteFacts.email}`} className="underline underline-offset-4">{siteFacts.email}</a>.</li>
        </ul>
      </Container>
    </section>
  );
}
