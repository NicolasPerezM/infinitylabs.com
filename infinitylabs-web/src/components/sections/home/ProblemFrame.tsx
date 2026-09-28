import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const pilot = ["Runs on a sample of data", "Lives outside your systems of record", "Quality judged by a demo", "No one owns it after the demo", "Exceptions handled by hand"];
const system = ["Connected to permissions, records and channels", "Deterministic where rules exist, AI where judgment is needed", "Evaluated against real cases on every change", "Human approval where errors are expensive", "Monitored, governed and improved by a named team"];

export function ProblemFrame() {
  return (
    <Section canvas="secondary" labelledBy="problem-title">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow="02 · The operational gap"
            id="problem-title"
            title="Most companies have AI experiments. Few have AI running inside their operations."
            lede="Pilots prove that a model can answer a question or draft a document. They rarely survive contact with permissions, exceptions, legacy systems, audit requirements and the people who have to trust the output every day. The gap is not intelligence. It is engineering."
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          <div className="reveal rounded-lg border border-dashed border-border-strong p-6">
            <h3 className="label-mono mb-4 text-text-tertiary">A pilot</h3>
            <ul className="flex flex-col gap-3 text-small text-text-secondary">
              {pilot.map((p) => (
                <li key={p} className="flex gap-3">
                  <span aria-hidden className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-border-strong" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal rounded-lg border border-border-subtle bg-surface-elevated p-6 shadow-card" style={{ ["--reveal-delay" as string]: "120ms" }}>
            <h3 className="label-mono mb-4 flex items-center gap-2 text-text-primary">
              <span aria-hidden className="inline-block h-3 w-0.5 state-gradient-vertical" />A production system
            </h3>
            <ul className="flex flex-col gap-3 text-small text-text-primary">
              {system.map((p) => (
                <li key={p} className="flex gap-3">
                  <span aria-hidden className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-operate" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
