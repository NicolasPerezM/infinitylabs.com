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
  const t = getDictionary(locale).pages.terms;
  return buildMetadata(locale, { title: t.metaTitle, description: t.metaDescription, path: "/terms", noIndex: true });
}

/** Placeholder until legal review (GAP-004). */
export default async function TermsPage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const t = getDictionary(raw).pages.terms;
  return (
    <section aria-labelledby="terms-h" className="bg-surface-primary">
      <Container size="prose" className="flex flex-col gap-6 py-section">
        <span className="label-mono text-text-tertiary">{t.eyebrow}</span>
        <h1 id="terms-h" className="text-display-lg">{t.title}</h1>
        <p className="text-body text-text-secondary">
          {t.body} <a href={`mailto:${siteFacts.email}`} className="underline underline-offset-4">{siteFacts.email}</a>
        </p>
      </Container>
    </section>
  );
}
