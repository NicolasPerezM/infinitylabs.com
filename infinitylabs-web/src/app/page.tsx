import type { Metadata } from "next";
import { Hero } from "@/components/sections/home/Hero";
import { Gap } from "@/components/sections/home/Gap";
import { OperatingModelScrolly } from "@/components/sections/home/OperatingModelScrolly";
import { SolutionsIndex } from "@/components/sections/home/SolutionsIndex";
import { HowWeBuild } from "@/components/sections/home/HowWeBuild";
import { SprintOffer } from "@/components/sections/home/SprintOffer";
import { Proof } from "@/components/sections/home/Proof";
import { LabsTeaser } from "@/components/sections/home/LabsTeaser";
import { Commitments } from "@/components/sections/home/Commitments";
import { FinalCta } from "@/components/sections/FinalCta";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { SiteRail } from "@/components/system/SiteRail";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({ title: `${site.name} — ${site.category}`, description: site.description, path: "/" }),
  title: { absolute: `${site.name} — ${site.category}` },
};

const railSections = [
  { id: "top", code: "01", label: "Operating loop" },
  { id: "gap", code: "02", label: "The gap" },
  { id: "model", code: "03", label: "Operating model" },
  { id: "solutions", code: "04", label: "Solutions" },
  { id: "build", code: "05", label: "How we build" },
  { id: "sprint", code: "06", label: "Opportunity Sprint" },
  { id: "labs", code: "07", label: "Labs" },
  { id: "commitments", code: "08", label: "Commitments" },
  { id: "next", code: "09", label: "Next step" },
];

/**
 * Homepage v1.0 (docs/UX_UI_AUDIT.md): one continuous line runs through nine bounded sections.
 * Proof (§07 of the strategy) stays hidden until verified case studies exist.
 */
export default function HomePage() {
  return (
    <>
      <SiteRail sections={railSections} />
      <Hero />
      <Gap />
      <SectionFrame id="model" code="03" title="Operating model" state="Discover → Build → Operate" stateStage="build">
        <div className="reveal mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="model-title" className="text-display-xl max-w-[16ch]">
            One continuous system, not three handoffs.
          </h2>
          <p className="max-w-[40ch] text-body text-text-secondary">The team that maps the opportunity engineers the system and runs it in production.</p>
        </div>
        <OperatingModelScrolly />
      </SectionFrame>
      <SectionFrame id="solutions" code="04" title="Solutions" state="Build" stateStage="build" canvas="secondary">
        <div className="reveal mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="solutions-title" className="text-display-xl max-w-[16ch]">
            The processes where intelligent systems pay for themselves.
          </h2>
          <TextLink href="/solutions" event="solution_view" className="shrink-0">
            All solutions
          </TextLink>
        </div>
        <SolutionsIndex />
      </SectionFrame>
      <HowWeBuild />
      <SprintOffer />
      <Proof />
      <LabsTeaser />
      <Commitments />
      <FinalCta />
    </>
  );
}
