import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { StageLoop } from "@/components/system/StageLoop";
import { StageStrip } from "@/components/system/StageStrip";
import { Frame } from "@/components/ui/Frame";
import { TextLink } from "@/components/ui/TextLink";
import { capabilitySlugs, getCapability } from "@/content/capabilities";
import { getOffer } from "@/content/offers";
import { getSolution } from "@/content/solutions";
import { href, isLocale, type Locale } from "@/i18n/config";
import { fill, getDictionary } from "@/i18n/dictionaries";
import { breadcrumbJsonLd, buildMetadata, serviceJsonLd } from "@/lib/seo";

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return capabilitySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "es";
  const c = getCapability(locale, slug);
  if (!c) return {};
  return buildMetadata(locale, { title: `${c.name} · ${getDictionary(locale).pages.capability.metaSuffix}`, description: c.summary, path: `/capabilities/${c.slug}` });
}

/** Capability page (DEC-027): promise, what it includes, how we decide, where it applies, one step. */
export default async function CapabilityPage({ params }: Params) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const c = getCapability(locale, slug);
  if (!c) notFound();
  const d = getDictionary(locale);
  const t = d.pages.capability;
  const sols = c.solutions.map((s) => getSolution(locale, s)).filter(Boolean);
  const jsonLd = [serviceJsonLd(locale, { name: c.name, description: c.summary, path: `/capabilities/${c.slug}` }), breadcrumbJsonLd(locale, [{ name: t.breadcrumb, path: "/capabilities" }, { name: c.name, path: `/capabilities/${c.slug}` }])];
  // A buyer reading about Managed AI is asked about Managed AI, not sent back to discovery.
  const managed = c.slug === "managed-ai" ? getOffer(locale, "managed-ai") : undefined;
  const ask = managed ? { label: fill(d.ask.scope, { name: managed.name }), href: href(locale, "/contact?intent=managed-ai"), event: "offer_cta" } : undefined;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        crumb={{ label: t.breadcrumb, href: href(locale, "/capabilities") }}
        current={c.name}
        crumbLabel={d.nav.breadcrumb}
        title={c.promise}
        lede={c.headline}
        aside={<StageLoop locale={locale} stage={c.stage} className="hidden lg:block" />}
      >
        <StageStrip locale={locale} stage={c.stage} className="lg:hidden" />
      </PageHero>
      <Frame id="includes" title={t.includesTitle}>
        <ul className="grid gap-x-8 sm:grid-cols-2">
          {c.includes.map((item) => <li key={item} className="border-t border-border-subtle py-3 text-body text-text-primary">{item}</li>)}
        </ul>
      </Frame>
      <Frame id="approach" title={t.approachTitle} canvas="dark">
        <div className="flex flex-col gap-12">
          <ul className="flex flex-col">
            {c.approach.map((a) => (
              <li key={a} className="border-t border-border-subtle py-4 text-body-lg text-text-primary">{a}</li>
            ))}
          </ul>
          <div className="hidden md:block">
            <h3 className="mb-3 text-small font-medium text-text-tertiary">{t.technical}</h3>
            <ul className="grid gap-x-8 sm:grid-cols-3">
              {c.technical.map((x) => <li key={x} className="border-t border-border-subtle py-3 text-small text-text-secondary">{x}</li>)}
            </ul>
          </div>
        </div>
      </Frame>
      <Frame id="applies" title={t.appliesTitle}>
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {sols.map((s) => <li key={s!.slug}><TextLink href={href(locale, `/solutions/${s!.slug}`)} event="solution_view" arrow>{s!.name}</TextLink></li>)}
        </ul>
      </Frame>
      <FinalCta locale={locale} ask={ask} />
    </>
  );
}
