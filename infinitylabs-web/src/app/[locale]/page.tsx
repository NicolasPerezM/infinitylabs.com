import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/home/Hero";
import { Gap } from "@/components/sections/home/Gap";
import { ModelCompare } from "@/components/sections/home/ModelCompare";
import { OperatingModelScrolly } from "@/components/sections/home/OperatingModelScrolly";
import { SolutionsIndex } from "@/components/sections/home/SolutionsIndex";
import { GrowthMarketing } from "@/components/sections/home/GrowthMarketing";
import { HowWeBuild } from "@/components/sections/home/HowWeBuild";
import { SprintOffer } from "@/components/sections/home/SprintOffer";
import { Proof } from "@/components/sections/home/Proof";
import { LabsTeaser } from "@/components/sections/home/LabsTeaser";
import { Commitments } from "@/components/sections/home/Commitments";
import { FinalCta } from "@/components/sections/FinalCta";
import { ProductShot, hasShot } from "@/components/system/ProductShot";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { TextLink } from "@/components/ui/TextLink";
import { getOperatingModel } from "@/content/operating-model";
import { getSite } from "@/content/site";
import { getSolutions } from "@/content/solutions";
import { href, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "es";
  const site = getSite(locale);
  const title = `${site.name} · ${site.category}`;
  return { ...buildMetadata(locale, { title, description: site.description, path: "/" }), title: { absolute: title } };
}

/**
 * Homepage v1.4 (DEC-027): the order the expert panel agreed. The idea; what is (the gap); the
 * engineering that answers it, shown working; the operating model with its comparison; where it
 * applies; marketing; what the work teaches (Labs); what you can hold us to; the first step;
 * the close, which echoes the idea once.
 */
export default async function HomePage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const d = getDictionary(locale);
  const stages = getOperatingModel(locale);
  const m = d.home.model;
  const solutions = getSolutions(locale);

  return (
    <>
      <Hero locale={locale} />
      <Gap locale={locale} />
      <HowWeBuild locale={locale} />
      <SectionFrame id="model" title={m.title}>
        <h2 id="model-title" className="text-display-2xl max-w-[16ch]">{m.headline}</h2>
        <div className="mt-12 md:mt-16">
          <ModelCompare locale={locale} />
        </div>
        <div className="mt-20 md:mt-28">
          <OperatingModelScrolly locale={locale} stages={stages} labels={d.stages} capabilitiesCta={m.capabilitiesCta} />
        </div>
      </SectionFrame>
      <SectionFrame id="solutions" title={d.home.solutions.title} canvas="secondary">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="solutions-title" className="text-display-xl max-w-[16ch]">{d.home.solutions.headline}</h2>
          <TextLink href={href(locale, "/solutions")} event="solution_view" className="shrink-0">{d.home.solutions.all}</TextLink>
        </div>
        <SolutionsIndex
          locale={locale}
          solutions={solutions}
          previews={Object.fromEntries(solutions.filter((s) => hasShot(s.slug)).map((s) => [s.slug, <ProductShot key={s.slug} slug={s.slug as Parameters<typeof ProductShot>[0]["slug"]} locale={locale} label={d.home.solutions.illustrative} />]))}
        />
      </SectionFrame>
      <GrowthMarketing locale={locale} />
      <LabsTeaser locale={locale} />
      <Proof />
      <Commitments locale={locale} />
      <SprintOffer locale={locale} />
      <FinalCta locale={locale} kicker={d.meta.tagline} />
    </>
  );
}
