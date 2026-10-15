import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { ProductShot, hasShot } from "@/components/system/ProductShot";
import { WorkflowDiagram } from "@/components/system/WorkflowDiagram";
import { ArrowIcon } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
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
  return buildMetadata(locale, { title: `${s.name} · ${getDictionary(locale).pages.solution.metaSuffix}`, description: s.summary, path: `/solutions/${s.slug}` });
}

/**
 * Solution page (DEC-027), told as Duarte's sparkline: the promise and today → with the system in
 * the hero (with the screen beside it and the ways to buy it); how it works today; how it works with
 * the system (the typed flow); what changes for your team; the first step.
 */
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
  // Marketing buyers are sent to their own offer; every other solution starts with a process.
  const dgs = s.slug === "marketing-systems" ? getOffer(locale, "digital-growth-system") : undefined;
  const ask = dgs ? { label: fill(d.ask.scope, { name: dgs.name }), href: href(locale, "/contact?intent=digital-growth-system"), event: "offer_cta" } : undefined;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        crumb={{ label: t.breadcrumb, href: href(locale, "/solutions") }}
        current={s.name}
        crumbLabel={d.nav.breadcrumb}
        title={s.promise}
        lede={s.headline}
        aside={hasShot(s.slug) ? <ProductShot slug={s.slug} locale={locale} label={d.home.solutions.illustrative} /> : undefined}
      >
        <div className="flex flex-col gap-2">
          <p className="text-small font-medium text-text-tertiary">{t.buy}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {offs.map((o) => (
              <li key={o!.slug}>
                <TextLink href={href(locale, `/offers/${o!.slug}`)} event="offer_view">{o!.name}</TextLink>
              </li>
            ))}
          </ul>
        </div>
      </PageHero>

      <Frame id="problem" title={t.problemTitle}>
        <ul className="flex flex-col">
          {s.problem.map((p) => (
            <li key={p} className="border-t border-border-subtle py-4 text-body-lg text-text-secondary">{p}</li>
          ))}
        </ul>
      </Frame>

      <section id="system" aria-labelledby="system-title" className="theme-dark bg-surface-primary text-text-primary">
        <div className="mx-auto w-full max-w-content px-gutter py-section">
          <div className="flex flex-col gap-4">
            <h2 id="system-title" className="text-display-lg max-w-[22ch]">{t.systemTitle}</h2>
            <p className="max-w-[60ch] text-body-lg text-text-secondary">{t.systemLede}</p>
          </div>
          <div className="mt-12 border-t border-border-strong pt-10">
            <WorkflowDiagram steps={s.diagram} kinds={d.workflow.kinds} title={d.workflow.title} caption={t.diagramCaption} />
          </div>
          <ul className="mt-14 hidden gap-x-8 md:grid md:grid-cols-2">
            {s.build.map((b) => (
              <li key={b} className="border-t border-border-subtle py-4 text-body text-text-secondary">{b}</li>
            ))}
          </ul>
        </div>
      </section>

      <Frame id="outcomes" title={t.outcomesTitle} lede={t.outcomesLede}>
        <div className="grid gap-12 md:grid-cols-2">
          <ul className="flex flex-col">
            {s.outcomes.map((o) => (
              <li key={o} className="border-t border-border-subtle py-4 text-heading font-medium text-text-primary">{o}</li>
            ))}
          </ul>
          <div className="flex flex-col gap-10">
            <div className="hidden md:block">
              <h3 className="mb-3 text-small font-medium text-text-tertiary">{t.environments}</h3>
              <ul className="flex flex-col divide-y divide-border-subtle border-y border-border-subtle">
                {s.environments.map((e) => <li key={e} className="py-2.5 text-small text-text-secondary">{e}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-small font-medium text-text-tertiary">{t.capabilities}</h3>
              <ul className="flex flex-col divide-y divide-border-subtle border-y border-border-subtle">
                {caps.map((c) => (
                  <li key={c!.slug}>
                    <Link href={href(locale, `/capabilities/${c!.slug}`)} data-event="capability_view" className="group flex min-h-11 items-center justify-between gap-4 py-3 text-small">
                      <span className="font-medium text-text-primary underline decoration-border-strong underline-offset-4 group-hover:decoration-text-primary">{c!.name}</span>
                      <span className="flex items-center gap-2 text-text-tertiary">
                        {d.stages[c!.stage].name}
                        <ArrowIcon />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Frame>

      <FinalCta locale={locale} title={fill(t.nextTitle, { name: s.name })} body={t.nextBody} ask={ask} />
    </>
  );
}
