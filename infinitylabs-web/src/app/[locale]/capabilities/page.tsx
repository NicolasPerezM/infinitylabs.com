import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { StageStrip } from "@/components/system/StageStrip";
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

const dot = { discover: "bg-discover", build: "bg-build", operate: "bg-operate" } as const;

/** Capabilities in the order they come in: one section per stage (name, promise), each row a link. */
export default async function CapabilitiesPage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale).pages.capabilities;
  const stages = getOperatingModel(locale);
  const capabilities = getCapabilities(locale);
  return (
    <>
      <PageHero title={t.title} lede={t.lede}>
        <StageStrip locale={locale} links className="max-w-xl" />
      </PageHero>
      {stages.map((stage, si) => {
        const caps = capabilities.filter((c) => c.stage === stage.id);
        return (
          <Frame key={stage.id} id={stage.id} title={stage.name} lede={stage.promise} canvas={si % 2 === 1 ? "secondary" : "light"}>
            <span aria-hidden className={`-mt-2 mb-6 block h-1 w-16 rounded-full ${dot[stage.id]}`} />
            <ul className="flex flex-col divide-y divide-border-subtle border-y border-border-subtle">
              {caps.map((c) => (
                <li key={c.slug}>
                  <Link href={href(locale, `/capabilities/${c.slug}`)} data-event="capability_view" className="group grid grid-cols-[1fr_auto] items-center gap-4 py-6 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto] md:gap-6">
                    <h3 className="col-start-1 row-start-1 text-heading">{c.name}</h3>
                    <p className="col-span-2 row-start-2 text-body-lg text-text-secondary md:col-span-1 md:col-start-2 md:row-start-1">{c.promise}</p>
                    <ArrowIcon className="col-start-2 row-start-1 transition-transform duration-150 group-hover:translate-x-0.5 md:col-start-3" />
                  </Link>
                </li>
              ))}
            </ul>
          </Frame>
        );
      })}
      <Frame id="technology" title={t.techTitle} lede={t.techLede} canvas="dark">
        <dl className="grid gap-x-8 sm:grid-cols-2">
          {getTechnologyPosture(locale).map((x) => (
            <div key={x.area} className="flex flex-col gap-1.5 border-t border-border-subtle py-4">
              <dt className="text-small font-medium text-text-primary">{x.area}</dt>
              <dd className="text-small text-text-secondary">{x.description}</dd>
            </div>
          ))}
        </dl>
      </Frame>
      <FinalCta locale={locale} />
    </>
  );
}
