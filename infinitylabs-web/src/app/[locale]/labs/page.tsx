import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LogoMark } from "@/components/brand/LogoMark";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { Tag } from "@/components/ui/Tag";
import { getLabs } from "@/content/labs";
import { href, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "es";
  const t = getDictionary(locale).pages.labs;
  return buildMetadata(locale, { title: t.metaTitle, description: t.metaDescription, path: "/labs" });
}

export default async function LabsPage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const d = getDictionary(locale);
  const t = d.pages.labs;
  const labs = getLabs(locale);
  return (
    <>
      <PageHero
        canvas="dark"
        eyebrow={t.eyebrow}
        stage="operate"
        title={labs.intro.headline}
        lede={labs.intro.body}
        readout={t.readout}
        aside={
          <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-border-subtle bg-system-grid">
            <LogoMark size={160} variant="mono" className="text-text-primary" animate title="Infinity Labs" />
            <span className="label-mono absolute bottom-4 left-4 text-text-tertiary">{t.asideNote}</span>
          </div>
        }
      />
      <section id="initiatives" aria-labelledby="initiatives-title" className="theme-dark bg-surface-primary text-text-primary">
        <Container className="py-section">
          <div className="reveal flex flex-col gap-4">
            <span className="label-mono text-text-tertiary">{t.initiativesEyebrow}</span>
            <h2 id="initiatives-title" className="text-display-lg max-w-[18ch]">{t.initiativesTitle}</h2>
            <p className="max-w-[60ch] text-body text-text-secondary">{t.initiativesLede}</p>
          </div>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border-subtle bg-border-subtle md:grid-cols-2">
            {labs.initiatives.map((i) => (
              <li key={i.slug} className="reveal flex flex-col gap-4 bg-surface-primary p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="label-mono text-text-tertiary">{t.kinds[i.kind]}</span>
                  <Tag stage={i.kind === "product" ? "discover" : i.kind === "research" ? "structure" : "operate"}>{i.status}</Tag>
                </div>
                <h3 className="text-heading">{i.name}</h3>
                <p className="text-body text-text-primary">{i.summary}</p>
                <p className="text-small text-text-secondary">{i.detail}</p>
              </li>
            ))}
            {labs.initiatives.length % 2 === 1 && (
              <li className="reveal flex flex-col justify-between gap-4 bg-surface-secondary p-6 sm:p-8">
                <span className="label-mono text-text-tertiary">{t.proposeEyebrow}</span>
                <p className="text-body text-text-secondary">{t.proposeBody}</p>
                <Link href={href(locale, "/contact")} data-event="labs_view" className="inline-flex items-center gap-1.5 text-small font-medium text-text-primary underline underline-offset-4">{t.proposeCta}</Link>
              </li>
            )}
          </ul>
        </Container>
      </section>
      <Frame id="practice" eyebrow={t.practiceEyebrow} title={t.practiceTitle}>
        <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {labs.practices.map((p) => (
            <div key={p.name} className="reveal flex flex-col gap-1.5 border-t border-border-subtle pt-4">
              <dt className="text-heading-sm font-semibold">{p.name}</dt>
              <dd className="text-small text-text-secondary">{p.description}</dd>
            </div>
          ))}
        </dl>
      </Frame>
      <FinalCta locale={locale} title={t.nextTitle} body={t.nextBody} />
    </>
  );
}
