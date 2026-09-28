import type { CSSProperties } from "react";
import type { SolutionDiagramStep } from "@/content/solutions";
import { cn } from "@/lib/utils";

/**
 * Typed workflow strip: input / deterministic / AI / agent / human approval / output.
 * A packet travels the track and each step lights up as it passes (pure CSS, synced by
 * negative delays; runs only while the parent `.reveal` is visible; off under reduced motion).
 * Horizontal on md+; vertical below md and always in `compact` mode (previews, narrow panels).
 */

const KIND: Record<SolutionDiagramStep["kind"], { label: string; dot: string; color: string; soft: string }> = {
  input: { label: "Input", dot: "bg-text-tertiary", color: "var(--border-strong)", soft: "transparent" },
  deterministic: { label: "Deterministic", dot: "bg-structure", color: "var(--state-structure)", soft: "var(--state-structure-soft)" },
  ai: { label: "AI", dot: "bg-build", color: "var(--state-build)", soft: "var(--state-build-soft)" },
  agent: { label: "Agent", dot: "bg-discover", color: "var(--state-discover)", soft: "var(--state-discover-soft)" },
  human: { label: "Human approval", dot: "bg-operate", color: "var(--state-operate)", soft: "var(--state-operate-soft)" },
  output: { label: "Output", dot: "bg-text-tertiary", color: "var(--border-strong)", soft: "transparent" },
};

type Props = { steps: SolutionDiagramStep[]; title?: string; className?: string; legend?: boolean; caption?: string; compact?: boolean; animate?: boolean };

export function WorkflowDiagram({ steps, title = "Illustrative workflow", className, legend = true, caption, compact = false, animate = true }: Props) {
  const n = steps.length;
  const label = `${title}: ${steps.map((s) => `${s.label} (${KIND[s.kind].label})`).join(" → ")}`;

  if (compact) {
    return (
      <figure className={cn("wf-track wf-vertical relative w-full", className)} aria-label={label} style={{ ["--n" as string]: n } as CSSProperties}>
        {animate && (
          <div aria-hidden className="pointer-events-none absolute bottom-3 left-[7px] top-3">
            <div className="absolute inset-y-0 left-0 w-px bg-border-subtle" />
            <div className="wf-packet absolute left-0 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-text-primary ring-4 ring-surface-elevated" />
          </div>
        )}
        <ol className="relative flex flex-col gap-1.5 pl-6">
          {steps.map((step, i) => (
            <li key={i}>
              <div
                className={cn("wf-step flex items-center justify-between gap-3 rounded-md border border-border-strong bg-surface-elevated px-3 py-2", (step.kind === "input" || step.kind === "output") && "border-dashed")}
                style={{ ["--i" as string]: i, ["--wf-color" as string]: KIND[step.kind].color, ["--wf-soft" as string]: KIND[step.kind].soft } as CSSProperties}
              >
                <span className="text-small font-medium text-text-primary">{step.label}</span>
                <span className="label-mono flex shrink-0 items-center gap-1.5 text-text-tertiary">
                  <span aria-hidden className={cn("inline-block size-1.5 rounded-full", KIND[step.kind].dot)} />
                  {KIND[step.kind].label}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </figure>
    );
  }

  return (
    <figure className={cn("wf-track relative w-full", className)} aria-label={label} style={{ ["--n" as string]: n } as CSSProperties}>
      {animate && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-full w-px bg-border-subtle md:left-0 md:top-1/2 md:h-px md:w-full" />
          <div className="wf-packet absolute left-1/2 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-text-primary ring-4 ring-surface-primary md:top-1/2" />
        </div>
      )}
      <ol className="relative grid gap-3 md:grid-flow-col md:auto-cols-fr">
        {steps.map((step, i) => (
          <li key={i} className="relative flex md:flex-col">
            <div
              className={cn("wf-step relative z-10 flex min-h-[4.5rem] w-full flex-col justify-between gap-2 rounded-md border border-border-strong bg-surface-elevated p-3", (step.kind === "input" || step.kind === "output") && "border-dashed")}
              style={{ ["--i" as string]: i, ["--wf-color" as string]: KIND[step.kind].color, ["--wf-soft" as string]: KIND[step.kind].soft } as CSSProperties}
            >
              <span className="label-mono flex items-center gap-1.5 text-text-tertiary">
                <span aria-hidden className={cn("inline-block size-1.5 rounded-full", KIND[step.kind].dot)} />
                {KIND[step.kind].label}
              </span>
              <span className="text-small font-medium leading-snug text-text-primary">{step.label}</span>
            </div>
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
          {caption && <span className="basis-full">{caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}
