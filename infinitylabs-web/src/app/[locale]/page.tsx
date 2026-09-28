import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/home/Hero";
import { Gap } from "@/components/sections/home/Gap";
import { OperatingModelScrolly } from "@/components/sections/home/OperatingModelScrolly";
import { SolutionsIndex } from "@/components/sections/home/SolutionsIndex";
import { GrowthMarketing } from "@/components/sections/home/GrowthMarketing";
import { HowWeBuild } from "@/components/sections/home/HowWeBuild";
import { SprintOffer } from "@/components/sections/home/SprintOffer";
import { Proof } from "@/components/sections/home/Proof";
import { LabsTeaser } from "@/components/sections/home/LabsTeaser";
import { Commitments } from "@/components/sections/home/Commitments";
import { FinalCta } from "@/components/sections/FinalCta";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { SiteRail } from "@/components/system/SiteRail";
import { TextLink } from "@/components/ui/TextLink";
import { getLabs } from "@/content/labs";
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
  const title = `${site.name} — ${site.category}`;
  return { ...buildMetadata(locale, { title, description: site.description, path: "/" }), title: { absolute: title } };
}

/** Homepage v1.1: nine framed sections on one continuous line, in the visitor's language. */
export default async function HomePage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const d = getDictionary(locale);
  const stages = getOperatingModel(locale);
  const labs = getLabs(locale);
  const stageLabels = { discover: d.stages.discover, build: d.stages.build, operate: d.stages.operate };
  const railSections = (["top", "gap", "model", "solutions", "growth", "build", "sprint", "labs", "commitments", "next"] as const).map((id) => ({ id, label: d.rail[id] }));

  return (
    <>
      <SiteRail sections={railSections} ariaLabel={d.rail.sections} />
      <Hero locale={locale} />
      <Gap locale={locale} />
      <SectionFrame id="model" title={d.home.model.title} state={d.home.model.state} stateStage="build">
        <div className="reveal mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="model-title" className="text-display-xl max-w-[16ch]">{d.home.model.headline}</h2>
          <p className="max-w-[40ch] text-body text-text-secondary">{d.home.model.lede}</p>
        </div>
        <OperatingModelScrolly
          locale={locale}
          stages={stages}
          labels={stageLabels}
          panelTitle={d.home.model.panel}
          capabilitiesCta={d.home.model.capabilitiesCta}
          labs={{ label: d.home.model.labsLabel, body: labs.intro.short, cta: d.home.model.labsCta }}
        />
      </SectionFrame>
      <SectionFrame id="solutions" title={d.home.solutions.title} state={d.home.solutions.state} stateStage="build" canvas="secondary">
        <div className="reveal mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="solutions-title" className="text-display-xl max-w-[16ch]">{d.home.solutions.headline}</h2>
          <TextLink href={href(locale, "/solutions")} event="solution_view" className="shrink-0">{d.home.solutions.all}</TextLink>
        </div>
        <SolutionsIndex locale={locale} solutions={getSolutions(locale)} kinds={d.workflow.kinds} illustrative={d.home.solutions.illustrative} howItWorks={d.home.solutions.howItWorks} workflowTitle={d.workflow.title} />
      </SectionFrame>
      <GrowthMarketing locale={locale} />
      <HowWeBuild locale={locale} />
      <SprintOffer locale={locale} />
      <Proof />
      <LabsTeaser locale={locale} />
      <Commitments locale={locale} />
      <FinalCta locale={locale} />
    </>
  );
}
