import type { SolutionDiagramStep } from "@/content/solutions";
import { cn } from "@/lib/utils";

/**
 * Illustrative workflow strip: every step is typed as input / deterministic / AI / agent / human approval / output.
 * This is the "controlled autonomy" grammar (BRAND_IMPLEMENTATION §7). Restacks vertically below md.
 */

const KIND: Record<SolutionDiagramStep["kind"], { label: string; dot: string; box: string }> = {
  input: { label: "Input", dot: "bg-text-tertiary", box: "border-dashed" },
  deterministic: { label: "Deterministic", dot: "bg-structure", box: "" },
  ai: { label: "AI", dot: "bg-build", box: "" },
  agent: { label: "Agent", dot: "bg-discover", box: "" },
  human: { label: "Human approval", dot: "bg-operate", box: "" },
  output: { label: "Output", dot: "bg-text-tertiary", box: "border-dashed" },
};

type Props = { steps: SolutionDiagramStep[]; title?: string; className?: string; legend?: boolean; caption?: string };

export function WorkflowDiagram({ steps, title = "Illustrative workflow", className, legend = true, caption }: Props) {
  return (
    <figure className={cn("w-full", className)} aria-label={`${title}: ${steps.map((s) => `${s.label} (${KIND[s.kind].label})`).join(" → ")}`}>
      <ol className="grid gap-3 md:grid-flow-col md:auto-cols-fr md:gap-0">
        {steps.map((step, i) => (
          <li key={i} className="relative flex md:flex-col">
            <div
              className={cn(
                "relative z-10 flex min-h-[4.5rem] w-full flex-col justify-between gap-2 rounded-md border border-border-strong bg-surface-elevated p-3 md:mx-2",
                KIND[step.kind].box,
              )}
            >
              <span className="label-mono flex items-center gap-1.5 text-text-tertiary">
                <span aria-hidden className={cn("inline-block size-1.5 rounded-full", KIND[step.kind].dot)} />
                {KIND[step.kind].label}
              </span>
              <span className="text-small font-medium leading-snug text-text-primary">{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <span aria-hidden className="absolute left-1/2 top-full h-3 w-px bg-text-tertiary/60 md:left-auto md:right-0 md:top-1/2 md:h-px md:w-4 md:translate-x-2" />
            )}
          </li>
        ))}
      </ol>
      {legend && (
        <figcaption className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-small text-text-tertiary">
          {(["deterministic", "ai", "agent", "human"] as const).map((k) => (
            <span key={k} className="inline-flex items-center gap-1.5">
              <span aria-hidden className={cn("inline-block size-1.5 rounded-full", KIND[k].dot)} />
              {KIND[k].label}
            </span>
          ))}
          {caption && <span className="basis-full text-text-tertiary">{caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}
