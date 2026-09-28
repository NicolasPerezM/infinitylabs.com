import { SectionFrame } from "@/components/ui/SectionFrame";

const pilot = ["Runs on sample data", "Lives outside your systems", "Judged by a demo", "No owner after the demo"];
const system = ["Connected to permissions and records", "Typed steps: code, AI, agents, people", "Evaluated on every change", "Operated by a named team"];

/** 02 · The operational gap. Ledger, not paragraphs. */
export function Gap() {
  return (
    <SectionFrame id="gap" code="02" title="The operational gap" state="Why engineering" canvas="secondary">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="reveal lg:col-span-6">
          <h2 id="gap-title" className="text-display-xl max-w-[16ch]">
            Most companies have AI experiments. Few have AI running inside operations.
          </h2>
          <p className="mt-5 text-body-lg text-text-secondary">The gap is not intelligence. It is engineering.</p>
        </div>
        <div className="reveal lg:col-span-6" style={{ ["--reveal-delay" as string]: "120ms" }}>
          <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-x-3 sm:gap-x-6">
            <Column heading="A pilot" items={pilot} muted />
            <div aria-hidden className="flex flex-col items-center justify-center">
              <span className="h-full w-px state-gradient-vertical" />
            </div>
            <Column heading="A production system" items={system} />
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

function Column({ heading, items, muted = false }: { heading: string; items: string[]; muted?: boolean }) {
  return (
    <div>
      <h3 className={`label-mono border-b pb-3 ${muted ? "border-border-subtle text-text-tertiary" : "border-text-primary text-text-primary"}`}>{heading}</h3>
      <ul className="divide-y divide-border-subtle">
        {items.map((i) => (
          <li key={i} className={`flex gap-3 py-3 text-small ${muted ? "text-text-tertiary" : "text-text-primary"}`}>
            <span aria-hidden className={`mt-2 inline-block size-1.5 shrink-0 rounded-full ${muted ? "bg-border-strong" : "bg-operate"}`} />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
