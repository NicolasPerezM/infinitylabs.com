import { WorkflowDiagram } from "@/components/system/WorkflowDiagram";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { principles } from "@/content/principles";
import { solutions } from "@/content/solutions";

export function HowWeBuild() {
  const example = solutions.find((s) => s.slug === "document-intelligence")!;
  return (
    <Section canvas="dark" labelledBy="build-title">
      <Container className="flex flex-col gap-14">
        <SectionHeader
          eyebrow="05 · How Infinity Labs builds"
          id="build-title"
          title="Controlled autonomy: every step in a workflow is typed before it is coded."
          lede="Deterministic where the rules are known. AI where judgment is needed. Agents where autonomy is safe. A person where the cost of an error is high. The type of each step is a design decision we make with you, and it is visible in the system."
        />
        <div className="reveal rounded-xl border border-border-subtle bg-surface-secondary p-4 sm:p-6">
          <div className="label-mono mb-4 flex flex-wrap items-center justify-between gap-2 text-text-tertiary">
            <span>Illustrative workflow · document intake</span>
            <span>each step typed · exceptions routed · every decision logged</span>
          </div>
          <WorkflowDiagram steps={example.diagram} caption="Illustrative, not a client case." />
        </div>
        <ol className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <li key={p.code} className="reveal flex flex-col gap-2 border-t border-border-subtle pt-4" style={{ ["--reveal-delay" as string]: `${(i % 4) * 70}ms` }}>
              <span className="label-mono text-text-tertiary">{p.code}</span>
              <h3 className="text-heading-sm font-semibold text-text-primary">{p.name}</h3>
              <p className="text-small text-text-secondary">{p.statement}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
