import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { OpportunitySpace } from "@/components/system/OpportunitySpace";
import { StageLoop } from "@/components/system/StageLoop";
import { StageStrip } from "@/components/system/StageStrip";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { getOffer, offerSlugs } from "@/content/offers";
import { href, isLocale, type Locale } from "@/i18n/config";
import { fill, getDictionary } from "@/i18n/dictionaries";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";

type Params = { params: Promise<{ locale: string; slug: string }> };

// Phase nodes take the colour of the stage the engagement belongs to (colour means stage, DEC-027).
const ring = { discover: "border-discover-text text-discover-text", build: "border-build-text text-build-text", operate: "border-operate-text text-operate-text" } as const;

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

/**
 * Engagement page (DEC-027): promise, who it is for, how it runs, what you receive, the questions
 * a buyer asks, and a close that asks about this engagement (its own intent), never another one.
 */
export default async function OfferPage({ params }: Params) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const o = getOffer(locale, slug);
  if (!o) notFound();
  const d = getDictionary(locale);
  const t = d.pages.offer;
  const jsonLd: object[] = [serviceJsonLd(locale, { name: o.name, description: o.summary, path: `/offers/${o.slug}` }), breadcrumbJsonLd(locale, [{ name: d.nav.offers, path: "/offers" }, { name: o.name, path: `/offers/${o.slug}` }])];
  if (o.faq) jsonLd.push(faqJsonLd(o.faq));
  const sprint = o.slug === "ai-opportunity-sprint";
  const ask = sprint
    ? { label: d.ask.process, href: href(locale, "/contact?intent=sprint"), event: "opportunity_sprint_cta" }
    : { label: fill(d.ask.scope, { name: o.name }), href: href(locale, `/contact?intent=${o.slug}`), event: "offer_cta" };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        crumb={{ label: d.nav.offers, href: href(locale, "/offers") }}
        current={o.name}
        crumbLabel={d.nav.breadcrumb}
        title={o.promise}
        lede={o.headline}
        aside={<StageLoop locale={locale} stage={o.stage} className="hidden lg:block" />}
      >
        <StageStrip locale={locale} stage={o.stage} className="lg:hidden" />
        <div className="mt-2">
          <Button href={ask.href} event={ask.event} size="lg">
            {ask.label}
            <ArrowIcon />
          </Button>
        </div>
      </PageHero>

      <Frame id="for" title={t.forTitle}>
        <ul className="flex flex-col">
          {o.forWhom.map((f) => (
            <li key={f} className="border-t border-border-subtle py-4 text-body-lg text-text-secondary">{f}</li>
          ))}
        </ul>
      </Frame>

      <section id="phases" aria-labelledby="phases-title" className="theme-dark bg-surface-primary text-text-primary">
        <div className="mx-auto w-full max-w-content px-gutter py-section">
          <div className="flex flex-col gap-4">
            <h2 id="phases-title" className="text-display-lg max-w-[18ch]">{t.phasesTitle}</h2>
            <p className="max-w-[60ch] text-body text-text-secondary">{o.format}</p>
          </div>
          {/* The Sprint is drawn (one scene, three states: DEC-029); other engagements list their phases. */}
          {sprint ? (
            <div className="mt-12">
              <OpportunitySpace phases={o.phases} phaseLabel={t.phase} labels={d.home.sprint.space} kinds={d.workflow.kinds} detail />
            </div>
          ) : (
            <ol className="reveal mt-12 grid border-t border-border-strong pt-10 md:grid-cols-3 md:gap-8">
              {o.phases.map((p, i) => (
                <li key={p.name} className="build-item relative flex gap-4 pb-8 last:pb-0 md:flex-col md:gap-4 md:pb-0" style={{ ["--b" as string]: i } as CSSProperties}>
                  {i < o.phases.length - 1 && (
                    <span aria-hidden className="absolute bottom-0 left-4 top-10 w-px -translate-x-1/2 bg-border-strong md:-right-8 md:bottom-auto md:left-12 md:top-4 md:h-px md:w-auto md:translate-x-0" />
                  )}
                  <span aria-hidden className={`relative grid size-8 shrink-0 place-items-center rounded-full border-[1.5px] text-small font-medium ${ring[o.stage]}`}>{i + 1}</span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-heading">
                      <span className="sr-only">{fill(t.phase, { n: i + 1 })}: </span>
                      {p.name}
                    </h3>
                    <p className="text-small text-text-secondary">{p.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
          <div className="mt-12 grid gap-6 border-t border-border-strong pt-8 md:grid-cols-12">
            <h3 className="text-small font-medium text-text-tertiary md:col-span-3">{t.deliverables}</h3>
            <ul className="grid gap-x-8 sm:grid-cols-2 md:col-span-9">
              {o.deliverables.map((x) => (
                <li key={x} className="border-t border-border-subtle py-3 text-small text-text-primary first:border-t-0 sm:[&:nth-child(2)]:border-t-0">{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {o.faq && (
        <Frame id="faq" title={t.faqTitle}>
          <dl className="flex flex-col divide-y divide-border-subtle border-y border-border-subtle">
            {o.faq.map((f) => (
              <div key={f.question} className="grid gap-2 py-6 md:grid-cols-12 md:gap-6">
                <dt className="text-body font-medium text-text-primary md:col-span-5">{f.question}</dt>
                <dd className="text-small text-text-secondary md:col-span-7">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </Frame>
      )}

      <FinalCta locale={locale} title={o.ask} body={o.summary} ask={ask} />
    </>
  );
}
