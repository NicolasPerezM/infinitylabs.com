import { SectionFrame } from "@/components/ui/SectionFrame";

const commitments = [
  { name: "Evaluation before launch", line: "A test set from your real cases. A change that lowers quality does not ship." },
  { name: "Human approval by design", line: "Where an error is expensive, a person decides. The system prepares the decision." },
  { name: "Least-privilege data access", line: "Agents and pipelines get the minimum access, enforced in code and logged." },
  { name: "One accountable owner", line: "Managed AI or a structured handover. Someone is always responsible in production." },
];

/** 08 · Commitments that are true today. No certifications claimed (GAP-018). */
export function Commitments() {
  return (
    <SectionFrame id="commitments" code="08" title="What you can hold us to" state="Operate" stateStage="operate" canvas="secondary" padding="sm">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
        <h2 id="commitments-title" className="reveal text-display-lg max-w-[16ch] lg:col-span-4">
          Trust is built into the system, not claimed on a badge.
        </h2>
        <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:col-span-8">
          {commitments.map((c, i) => (
            <div key={c.name} className="reveal border-t border-border-strong pt-3" style={{ ["--reveal-delay" as string]: `${(i % 2) * 80}ms` }}>
              <dt className="text-heading-sm font-semibold">{c.name}</dt>
              <dd className="mt-1 text-small text-text-secondary">{c.line}</dd>
            </div>
          ))}
        </dl>
      </div>
    </SectionFrame>
  );
}
