import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { ArrowIcon } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { industries, industriesIntro } from "@/content/industries";
import { solutions } from "@/content/solutions";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Solutions",
  description:
    "AI-powered business systems for enterprise knowledge, document intelligence, customer operations, revenue systems and intelligent operations. Built, evaluated and operated in production.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        stage="build"
        title="Expensive business problems, solved with systems that run in production."
        lede="A solution is not a technology. It is a process that works differently: fewer manual steps, decisions prepared by the system, people approving where it matters, and quality you can measure."
      />
      <Section labelledBy="solutions-list">
        <Container className="flex flex-col gap-10">
          <h2 id="solutions-list" className="sr-only">
            All solutions
          </h2>
          <ul className="flex flex-col divide-y divide-border-subtle border-y border-border-subtle">
            {solutions.map((s) => (
              <li key={s.slug} className="reveal">
                <Link href={`/solutions/${s.slug}`} data-event="solution_view" className="group grid gap-4 py-8 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-3">
                    <span className="label-mono text-text-tertiary">{s.eyebrow}</span>
                    <h3 className="mt-2 text-heading text-text-primary">{s.name}</h3>
                  </div>
                  <div className="flex flex-col gap-3 md:col-span-7">
                    <p className="text-body text-text-primary">{s.headline}</p>
                    <p className="text-small text-text-secondary">{s.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.environments.slice(0, 2).map((e) => (
                        <Tag key={e}>{e}</Tag>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start md:col-span-2 md:justify-end">
                    <span className="inline-flex items-center gap-1.5 text-small font-medium text-text-primary">
                      How it works
                      <ArrowIcon className="transition-transform duration-150 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <Section canvas="secondary" labelledBy="industries-title">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Typical environments" id="industries-title" title="Where these systems tend to pay off." lede={industriesIntro} />
          </div>
          <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:col-span-8">
            {industries.map((i) => (
              <li key={i.name} className="reveal flex flex-col gap-1 border-t border-border-subtle pt-3">
                <span className="text-small font-medium text-text-primary">{i.name}</span>
                <span className="text-small text-text-secondary">{i.where}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}
