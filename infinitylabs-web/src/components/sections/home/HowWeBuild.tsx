import { WorkflowDiagram } from "@/components/system/WorkflowDiagram";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { principles } from "@/content/principles";
import { solutions } from "@/content/solutions";

/** 05 · How Infinity Labs builds: typed workflow in motion + principles as a ledger. */
export function HowWeBuild() {
  const example = solutions.find((s) => s.slug === "document-intelligence")!;
  return (
    <SectionFrame id="build" code="05" title="How Infinity Labs builds" state="Controlled autonomy" stateStage="build" canvas="dark" grid>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="reveal lg:col-span-5">
          <h2 id="build-title" className="text-display-xl max-w-[14ch]">
            Every step is typed before it is coded.
          </h2>
          <p className="mt-5 max-w-[44ch] text-body-lg text-text-secondary">
            Deterministic where rules are known. AI where judgment is needed. Agents where autonomy is safe. A person where errors are expensive.
          </p>
        </div>
        <div className="reveal lg:col-span-7" style={{ ["--reveal-delay" as string]: "120ms" }}>
          <div className="rounded-xl border border-border-subtle bg-surface-secondary/70 p-4 sm:p-6">
            <div className="label-mono mb-5 flex flex-wrap items-center justify-between gap-2 text-text-tertiary">
              <span>Illustrative · document intake</span>
              <span>every decision logged</span>
            </div>
            <WorkflowDiagram steps={example.diagram} legend caption="Illustrative, not a client case." />
          </div>
        </div>
      </div>

      <ol className="mt-16 border-t border-border-strong">
        {principles.map((p, i) => (
          <li key={p.code} className="reveal grid grid-cols-[2.5rem_1fr] gap-4 border-b border-border-subtle py-4 md:grid-cols-[3rem_16rem_1fr]" style={{ ["--reveal-delay" as string]: `${(i % 4) * 50}ms` }}>
            <span className="label-mono pt-1 text-text-tertiary">{p.code}</span>
            <h3 className="text-heading-sm font-semibold text-text-primary">{p.name}</h3>
            <p className="col-start-2 text-small text-text-secondary md:col-start-3">{p.statement}</p>
          </li>
        ))}
      </ol>
    </SectionFrame>
  );
}
