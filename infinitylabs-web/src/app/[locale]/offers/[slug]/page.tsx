import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { getOffer, offerSlugs } from "@/content/offers";
import { href, isLocale, type Locale } from "@/i18n/config";
import { fill, getDictionary } from "@/i18n/dictionaries";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return offerSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "es";
  const o = getOffer(locale, slug);
  if (!o) return {};
  return buildMetadata(locale, { title: o.name, description: o.summary, path: `/offers/${o.slug}` });
}

export default async function OfferPage({ params }: Params) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const o = getOffer(locale, slug);
  if (!o) notFound();
  const d = getDictionary(locale);
  const t = d.pages.offer;
  const jsonLd: object[] = [serviceJsonLd(locale, { name: o.name, description: o.summary, path: `/offers/${o.slug}` }), breadcrumbJsonLd(locale, [{ name: t.breadcrumb, path: "/offers" }, { name: o.name, path: `/offers/${o.slug}` }])];
  if (o.faq) jsonLd.push(faqJsonLd(o.faq));
  const intent = o.slug === "ai-opportunity-sprint" ? "sprint" : o.slug;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero eyebrow={o.eyebrow} stage={o.stage} title={o.headline} lede={o.summary} readout={d.common.details}>
        <nav aria-label="Breadcrumb" className="text-small text-text-tertiary">
          <Link href={href(locale, "/offers")} className="hover:text-text-primary">{t.breadcrumb}</Link> / {o.name}
        </nav>
        <div className="mt-2 flex flex-wrap gap-3">
          <Button href={href(locale, `/contact?intent=${intent}`)} event="opportunity_sprint_cta" size="lg">
            {fill(t.discuss, { name: o.name })}
            <ArrowIcon />
          </Button>
        </div>
      </PageHero>

      <Frame id="for" eyebrow={t.forEyebrow} title={t.forTitle}>
        <ul className="flex flex-col gap-4">
          {o.forWhom.map((f) => (
            <li key={f} className="reveal flex gap-4 border-t border-border-subtle pt-4 text-body text-text-secondary">
              <span aria-hidden className="mt-2.5 inline-block size-1.5 shrink-0 rounded-full bg-border-strong" />
              {f}
            </li>
          ))}
        </ul>
      </Frame>

      <section id="phases" aria-labelledby="phases-title" className="theme-dark bg-surface-primary text-text-primary">
        <div className="mx-auto w-full max-w-content px-gutter py-section">
          <div className="reveal flex flex-col gap-4">
            <span className="label-mono text-text-tertiary">{t.phasesEyebrow}</span>
            <h2 id="phases-title" className="text-display-lg max-w-[18ch]">{t.phasesTitle}</h2>
            <p className="max-w-[60ch] text-body text-text-secondary">{o.format}</p>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {o.phases.map((p, i) => (
              <li key={p.name} className="reveal relative flex flex-col gap-3 rounded-lg border border-border-subtle bg-surface-secondary p-6" style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
                <span aria-hidden className="absolute inset-x-6 top-0 h-0.5 state-gradient" />
                <span className="label-mono text-text-tertiary">{fill(t.phase, { n: i + 1 })}</span>
                <h3 className="text-heading">{p.name}</h3>
                <p className="text-small text-text-secondary">{p.description}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 grid gap-8 rounded-lg border border-border-subtle p-6 md:grid-cols-12 md:p-8">
            <h3 className="label-mono text-text-tertiary md:col-span-3">{t.deliverables}</h3>
            <ul className="grid gap-3 sm:grid-cols-2 md:col-span-9">
              {o.deliverables.map((x) => (
                <li key={x} className="flex gap-3 text-small text-text-primary">
                  <span aria-hidden className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-operate" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {o.faq && (
        <Frame id="faq" eyebrow={t.faqEyebrow} title={t.faqTitle}>
          <dl className="flex flex-col divide-y divide-border-subtle border-y border-border-subtle">
            {o.faq.map((f) => (
              <div key={f.question} className="reveal grid gap-2 py-6 md:grid-cols-12 md:gap-6">
                <dt className="text-body font-medium text-text-primary md:col-span-5">{f.question}</dt>
                <dd className="text-small text-text-secondary md:col-span-7">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </Frame>
      )}

      <FinalCta locale={locale} title={fill(t.nextTitle, { name: o.name })} body={t.nextBody} />
    </>
  );
}
