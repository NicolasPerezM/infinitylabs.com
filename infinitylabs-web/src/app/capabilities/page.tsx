import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { ProcessFlow } from "@/components/system/ProcessFlow";
import { ArrowIcon } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { capabilities } from "@/content/capabilities";
import { operatingModel } from "@/content/operating-model";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Capabilities",
  description: "AI transformation, AI engineering, agentic systems, data + AI, AI evaluation and managed AI: the capabilities behind every Infinity Labs system, organized by Discover, Build and Operate.",
  path: "/capabilities",
});

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        stage="structure"
        title="What Infinity Labs knows how to build, organized the way we work."
        lede="Capabilities are the engineering disciplines behind every solution. They are not products: you buy an outcome, and these are the skills that make it reliable."
      />
      <Section labelledBy="model-h" padding="sm">
        <Container>
          <h2 id="model-h" className="sr-only">
            Operating model
          </h2>
          <ProcessFlow compact linkTo="none" />
        </Container>
      </Section>
      {operatingModel.map((stage) => {
        const caps = capabilities.filter((c) => c.stage === stage.id);
        return (
          <Section key={stage.id} id={stage.id} labelledBy={`${stage.id}-h`} canvas={stage.id === "build" ? "secondary" : "light"} className="scroll-mt-20">
            <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-4">
                <SectionHeader eyebrow={`${stage.code} · ${stage.name}`} id={`${stage.id}-h`} title={stage.promise} />
              </div>
              <ul className="flex flex-col divide-y divide-border-subtle border-y border-border-subtle lg:col-span-8">
                {caps.map((c) => (
                  <li key={c.slug} className="reveal">
                    <Link href={`/capabilities/${c.slug}`} data-event="capability_view" className="group grid gap-3 py-6 md:grid-cols-12 md:gap-6">
                      <h3 className="text-heading md:col-span-4">{c.name}</h3>
                      <p className="text-small text-text-secondary md:col-span-6">{c.summary}</p>
                      <span className="inline-flex items-center gap-1.5 text-small font-medium md:col-span-2 md:justify-end">
                        Detail
                        <ArrowIcon className="transition-transform duration-150 group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </Section>
        );
      })}
      <FinalCta eyebrow="Next step" />
    </>
  );
}
