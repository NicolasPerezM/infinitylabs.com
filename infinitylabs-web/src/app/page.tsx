import type { Metadata } from "next";
import { Hero } from "@/components/sections/home/Hero";
import { ProblemFrame } from "@/components/sections/home/ProblemFrame";
import { OperatingModel } from "@/components/sections/home/OperatingModel";
import { SolutionsGrid } from "@/components/sections/home/SolutionsGrid";
import { HowWeBuild } from "@/components/sections/home/HowWeBuild";
import { SprintOffer } from "@/components/sections/home/SprintOffer";
import { Proof } from "@/components/sections/home/Proof";
import { LabsTeaser } from "@/components/sections/home/LabsTeaser";
import { TechnologyAndMethod } from "@/components/sections/home/Technology";
import { FinalCta } from "@/components/sections/FinalCta";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${site.name} — ${site.category}`,
    description: site.description,
    path: "/",
  }),
  title: { absolute: `${site.name} — ${site.category}` },
};

/**
 * Homepage narrative (BUSINESS_STRATEGY §21, DEC-005):
 * 01 Hero · 02 Problem · 03 Discover→Build→Operate · 04 Solutions · 05 How we build · 06 Sprint ·
 * 07 Proof (hidden until verified) · 08 Labs · 09 Technology · 10 Method · 11 Trust · 12 Insights (hidden) · 13 CTA · 14 Footer
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemFrame />
      <OperatingModel />
      <SolutionsGrid />
      <HowWeBuild />
      <SprintOffer />
      <Proof />
      <LabsTeaser />
      <TechnologyAndMethod />
      <FinalCta />
    </>
  );
}
