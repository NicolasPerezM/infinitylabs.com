import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { Frame } from "@/components/ui/Frame";
import { TextLink } from "@/components/ui/TextLink";
import { capabilitySlugs, getCapability } from "@/content/capabilities";
import { getSolution } from "@/content/solutions";
import { href, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
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
  return buildMetadata(locale, { title: `${c.name} — ${getDictionary(locale).pages.capability.metaSuffix}`, description: c.summary, path: `/capabilities/${c.slug}` });
}

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
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero eyebrow={c.eyebrow} stage={c.stage} title={c.headline} lede={c.summary} readout={d.common.details}>
        <nav aria-label="Breadcrumb" className="text-small text-text-tertiary">
          <Link href={href(locale, "/capabilities")} className="hover:text-text-primary">{t.breadcrumb}</Link> / {c.name}
        </nav>
      </PageHero>
      <Frame id="includes" eyebrow={t.includesEyebrow} title={t.includesTitle}>
        <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {c.includes.map((item) => <li key={item} className="reveal border-t border-border-subtle pt-3 text-body text-text-primary">{item}</li>)}
        </ul>
      </Frame>
      <Frame id="approach" eyebrow={t.approachEyebrow} title={t.approachTitle} canvas="dark">
        <div className="flex flex-col gap-10">
          <ul className="flex flex-col gap-5">
            {c.approach.map((a) => (
              <li key={a} className="reveal flex gap-4 text-body-lg text-text-primary">
                <span aria-hidden className="mt-3 inline-block h-px w-6 shrink-0 state-gradient" />
                {a}
              </li>
            ))}
          </ul>
          <div className="reveal rounded-lg border border-border-subtle bg-surface-secondary p-6">
            <h3 className="label-mono mb-4 text-text-tertiary">{t.technical}</h3>
            <ul className="grid gap-3 sm:grid-cols-3">{c.technical.map((x) => <li key={x} className="font-mono text-small text-text-secondary">{x}</li>)}</ul>
          </div>
        </div>
      </Frame>
      <Frame id="applies" eyebrow={t.appliesEyebrow} title={t.appliesTitle} padding="sm">
        <ul className="flex flex-col gap-3">
          {sols.map((s) => <li key={s!.slug}><TextLink href={href(locale, `/solutions/${s!.slug}`)} event="solution_view">{s!.name}</TextLink></li>)}
        </ul>
      </Frame>
      <FinalCta locale={locale} />
    </>
  );
}
