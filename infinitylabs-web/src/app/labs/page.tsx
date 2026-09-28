import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/brand/LogoMark";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { labsInitiatives, labsIntro, labsPractices } from "@/content/labs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Labs",
  description: "Infinity Labs research, experiments and reusable technology: evaluation harnesses, workflow orchestration patterns, document pipeline components and NOIT.",
  path: "/labs",
});

export default function LabsPage() {
  return (
    <>
      <PageHero
        canvas="dark"
        eyebrow="Labs"
        stage="operate"
        title={labsIntro.headline}
        lede={labsIntro.body}
        aside={
          <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-border-subtle bg-system-grid">
            <LogoMark size={160} variant="mono" className="text-text-primary" animate title="Infinity Labs symbol" />
            <span className="label-mono absolute bottom-4 left-4 text-text-tertiary">experiments · benchmarks · reusable IP</span>
          </div>
        }
      />
      <Section canvas="dark" labelledBy="initiatives-h">
        <Container className="flex flex-col gap-10">
          <SectionHeader eyebrow="Initiatives" id="initiatives-h" title="What Labs is working on" lede="Status is shown as it is. Nothing here is presented as finished until it is." />
          <ul className="grid gap-px overflow-hidden rounded-lg border border-border-subtle bg-border-subtle md:grid-cols-2">
            {labsInitiatives.map((i) => (
              <li key={i.slug} className="reveal flex flex-col gap-4 bg-surface-primary p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="label-mono text-text-tertiary">{i.kind}</span>
                  <Tag stage={i.kind === "product" ? "discover" : i.kind === "research" ? "structure" : "operate"}>{i.status}</Tag>
                </div>
                <h3 className="text-heading">{i.name}</h3>
                <p className="text-body text-text-primary">{i.summary}</p>
                <p className="text-small text-text-secondary">{i.detail}</p>
              </li>
            ))}
            {labsInitiatives.length % 2 === 1 && (
              <li className="reveal flex flex-col justify-between gap-4 bg-surface-secondary p-6 sm:p-8">
                <span className="label-mono text-text-tertiary">Propose an experiment</span>
                <p className="text-body text-text-secondary">Have a process where the outcome is uncertain and the learning would be valuable to both sides? Labs takes on a small number of these each year.</p>
                <Link href="/contact" data-event="labs_view" className="inline-flex items-center gap-1.5 text-small font-medium text-text-primary underline underline-offset-4">
                  Talk to Labs
                </Link>
              </li>
            )}
          </ul>
        </Container>
      </Section>
      <Section labelledBy="practices-h">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Practice" id="practices-h" title="How Labs works" />
          </div>
          <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-8">
            {labsPractices.map((p) => (
              <div key={p.name} className="reveal flex flex-col gap-1.5 border-t border-border-subtle pt-4">
                <dt className="text-heading-sm font-semibold">{p.name}</dt>
                <dd className="text-small text-text-secondary">{p.description}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>
      <FinalCta eyebrow="Next step" title="Have a problem worth an experiment?" body="Labs takes on a small number of exploratory engagements where the outcome is uncertain and the learning is valuable to both sides." />
    </>
  );
}
