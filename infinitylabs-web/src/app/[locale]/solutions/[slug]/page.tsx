import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { WorkflowDiagram } from "@/components/system/WorkflowDiagram";
import { Frame } from "@/components/ui/Frame";
import { Tag } from "@/components/ui/Tag";
import { TextLink } from "@/components/ui/TextLink";
import { getCapability } from "@/content/capabilities";
import { getOffer } from "@/content/offers";
import { getSolution, solutionSlugs } from "@/content/solutions";
import { href, isLocale, type Locale } from "@/i18n/config";
import { fill, getDictionary } from "@/i18n/dictionaries";
import { breadcrumbJsonLd, buildMetadata, serviceJsonLd } from "@/lib/seo";

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return solutionSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "es";
  const s = getSolution(locale, slug);
  if (!s) return {};
  return buildMetadata(locale, { title: `${s.name} — ${getDictionary(locale).pages.solution.metaSuffix}`, description: s.summary, path: `/solutions/${s.slug}` });
}

export default async function SolutionPage({ params }: Params) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const s = getSolution(locale, slug);
  if (!s) notFound();
  const d = getDictionary(locale);
  const t = d.pages.solution;
  const caps = s.capabilities.map((c) => getCapability(locale, c)).filter(Boolean);
  const offs = s.offers.map((o) => getOffer(locale, o)).filter(Boolean);
  const jsonLd = [serviceJsonLd(locale, { name: s.name, description: s.summary, path: `/solutions/${s.slug}` }), breadcrumbJsonLd(locale, [{ name: t.breadcrumb, path: "/solutions" }, { name: s.name, path: `/solutions/${s.slug}` }])];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero eyebrow={s.eyebrow} stage={s.stageEmphasis} title={s.headline} lede={s.summary} readout={d.common.details}>
        <nav aria-label="Breadcrumb" className="text-small text-text-tertiary">
          <Link href={href(locale, "/solutions")} className="hover:text-text-primary">{t.breadcrumb}</Link> / {s.name}
        </nav>
      </PageHero>

      <Frame id="problem" eyebrow={t.problemEyebrow} title={t.problemTitle}>
        <ul className="flex flex-col gap-4">
          {s.problem.map((p) => (
            <li key={p} className="reveal flex gap-4 border-t border-border-subtle pt-4 text-body text-text-secondary">
              <span aria-hidden className="mt-2.5 inline-block size-1.5 shrink-0 rounded-full bg-border-strong" />
              {p}
            </li>
          ))}
        </ul>
      </Frame>

      <section id="system" aria-labelledby="system-title" className="theme-dark bg-surface-primary text-text-primary">
        <div className="mx-auto w-full max-w-content px-gutter py-section">
          <div className="reveal flex flex-col gap-4">
            <span className="label-mono text-text-tertiary">{t.systemEyebrow}</span>
            <h2 id="system-title" className="text-display-lg max-w-[18ch]">{t.systemTitle}</h2>
            <p className="max-w-[60ch] text-body-lg text-text-secondary">{t.systemLede}</p>
          </div>
          <div className="reveal mt-10 rounded-xl border border-border-subtle bg-surface-secondary p-4 sm:p-6">
            <WorkflowDiagram steps={s.diagram} kinds={d.workflow.kinds} title={d.workflow.title} caption={t.diagramCaption} />
          </div>
          <ul className="mt-10 grid gap-x-8 gap-y-6 md:grid-cols-2">
            {s.build.map((b, i) => (
              <li key={b} className="reveal flex gap-4 border-t border-border-subtle pt-4 text-body text-text-secondary" style={{ ["--reveal-delay" as string]: `${(i % 2) * 80}ms` }}>
                <span aria-hidden className="mt-2.5 inline-block size-1.5 shrink-0 rounded-full bg-build" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Frame id="outcomes" eyebrow={t.outcomesEyebrow} title={t.outcomesTitle} lede={t.outcomesLede}>
        <div className="grid gap-10 md:grid-cols-2">
          <ul className="flex flex-col gap-3">
            {s.outcomes.map((o) => (
              <li key={o} className="reveal flex gap-3 text-body text-text-primary">
                <span aria-hidden className="mt-2.5 inline-block size-1.5 shrink-0 rounded-full bg-operate" />
                {o}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-8">
            <div className="reveal">
              <h3 className="label-mono mb-4 text-text-tertiary">{t.environments}</h3>
              <ul className="flex flex-wrap gap-2">{s.environments.map((e) => <li key={e}><Tag>{e}</Tag></li>)}</ul>
            </div>
            <div className="reveal">
              <h3 className="label-mono mb-4 text-text-tertiary">{t.capabilities}</h3>
              <ul className="flex flex-col divide-y divide-border-subtle border-y border-border-subtle">
                {caps.map((c) => (
                  <li key={c!.slug}>
                    <Link href={href(locale, `/capabilities/${c!.slug}`)} data-event="capability_view" className="flex items-center justify-between py-3 text-small hover:text-text-primary">
                      <span className="font-medium text-text-primary">{c!.name}</span>
                      <span className="text-text-tertiary">{d.stages[c!.stage].name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal">
              <h3 className="label-mono mb-4 text-text-tertiary">{t.buy}</h3>
              <ul className="flex flex-col gap-3">
                {offs.map((o) => (
                  <li key={o!.slug}><TextLink href={href(locale, `/offers/${o!.slug}`)} event="offer_view">{o!.name}</TextLink></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Frame>

      <FinalCta locale={locale} title={fill(t.nextTitle, { name: s.name })} body={t.nextBody} />
    </>
  );
}
