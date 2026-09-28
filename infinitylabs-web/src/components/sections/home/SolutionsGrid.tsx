import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { solutions } from "@/content/solutions";
import { ArrowIcon } from "@/components/ui/Button";

export function SolutionsGrid() {
  return (
    <Section canvas="secondary" labelledBy="solutions-title">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="04 · High-value solutions"
            id="solutions-title"
            title="The processes where intelligent systems pay for themselves."
            lede="Each solution starts from an expensive problem and ends with a system your teams run every day."
          />
          <TextLink href="/solutions" event="solution_view" className="shrink-0">
            All solutions
          </TextLink>
        </div>
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {solutions.map((s, i) => (
            <li key={s.slug} className="reveal" style={{ ["--reveal-delay" as string]: `${(i % 3) * 80}ms` }}>
              <Link
                href={`/solutions/${s.slug}`}
                data-event="solution_view"
                className="group flex h-full flex-col gap-5 rounded-lg border border-border-subtle bg-surface-elevated p-6 shadow-card transition-[border-color,transform] duration-150 ease-out-quart hover:-translate-y-0.5 hover:border-border-strong"
              >
                <span className="label-mono text-text-tertiary">{s.eyebrow}</span>
                <h3 className="text-heading text-text-primary">{s.name}</h3>
                <div className="flex flex-col gap-3 text-small">
                  <p className="text-text-secondary">
                    <span className="font-medium text-text-primary">Problem. </span>
                    {s.problem[0]}
                  </p>
                  <p className="text-text-secondary">
                    <span className="font-medium text-text-primary">Outcome. </span>
                    {s.outcomes[0]}.
                  </p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1.5 text-small font-medium text-text-primary">
                  How it works
                  <ArrowIcon className="transition-transform duration-150 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
          <li className="reveal flex flex-col justify-between gap-4 rounded-lg border border-dashed border-border-strong p-6" style={{ ["--reveal-delay" as string]: "160ms" }}>
            <span className="label-mono text-text-tertiary">Not sure which process first?</span>
            <p className="text-small text-text-secondary">The AI Opportunity Sprint maps your processes and scores where an intelligent system creates measurable value.</p>
            <TextLink href="/offers/ai-opportunity-sprint" event="opportunity_sprint_cta">
              About the Sprint
            </TextLink>
          </li>
        </ul>
      </Container>
    </Section>
  );
}
