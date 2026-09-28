import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { ArrowIcon } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { getCapabilities } from "@/content/capabilities";
import { getOperatingModel } from "@/content/operating-model";
import { getTechnologyPosture } from "@/content/principles";
import { href, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "es";
  const t = getDictionary(locale).pages.capabilities;
  return buildMetadata(locale, { title: t.metaTitle, description: t.metaDescription, path: "/capabilities" });
}

export default async function CapabilitiesPage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const d = getDictionary(locale);
  const t = d.pages.capabilities;
  const stages = getOperatingModel(locale);
  const capabilities = getCapabilities(locale);
  return (
    <>
      <PageHero eyebrow={t.eyebrow} stage="structure" title={t.title} lede={t.lede} readout={t.readout} />
      {stages.map((stage, si) => {
        const caps = capabilities.filter((c) => c.stage === stage.id);
        return (
          <Frame key={stage.id} id={stage.id} eyebrow={`${stage.name} · ${stage.method.join(" · ")}`} title={stage.promise} canvas={si % 2 === 1 ? "secondary" : "light"}>
            <ul className="flex flex-col divide-y divide-border-subtle border-y border-border-subtle">
              {caps.map((c) => (
                <li key={c.slug} className="reveal">
                  <Link href={href(locale, `/capabilities/${c.slug}`)} data-event="capability_view" className="group grid gap-3 py-6 md:grid-cols-12 md:gap-6">
                    <h3 className="text-heading md:col-span-4">{c.name}</h3>
                    <p className="text-small text-text-secondary md:col-span-6">{c.summary}</p>
                    <span className="inline-flex items-center gap-1.5 text-small font-medium md:col-span-2 md:justify-end">
                      {t.detail}
                      <ArrowIcon className="transition-transform duration-150 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Frame>
        );
      })}
      <Frame id="technology" eyebrow={t.techEyebrow} title={t.techTitle} lede={t.techLede} canvas="dark">
        <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {getTechnologyPosture(locale).map((x, i) => (
            <div key={x.area} className="reveal flex flex-col gap-1.5 border-t border-border-subtle pt-4" style={{ ["--reveal-delay" as string]: `${(i % 2) * 80}ms` }}>
              <dt className="label-mono text-text-tertiary">{x.area}</dt>
              <dd className="text-small text-text-secondary">{x.description}</dd>
            </div>
          ))}
        </dl>
      </Frame>
      <FinalCta locale={locale} />
    </>
  );
}
