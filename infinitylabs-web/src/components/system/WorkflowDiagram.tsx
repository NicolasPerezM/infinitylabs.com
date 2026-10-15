import type { CSSProperties } from "react";
import type { SolutionDiagramStep, StepKind } from "@/content/solutions";
import { KindGlyph } from "./KindGlyph";
import { cn } from "@/lib/utils";

/**
 * Typed workflow (DEC-026, revised DEC-027). Built like a keynote diagram: few elements, labelled
 * directly (glyph + name; kind in mono because the system assigns it), arrows between nodes, and a
 * build that brings the steps in one at a time. It draws the real mechanism: a conditional step
 * (only some items take it) has dashed links in and out and states its condition. No looping
 * packet: it would send every item through a step most items skip. Colour encodes step type only;
 * deterministic, input and output are neutral. Vertical by default, horizontal once the figure is
 * ≥ 48rem wide (container query). `compact` stays vertical. Reduced motion and print: final state.
 */

export const KIND_STYLE: Record<StepKind, { color: string; soft: string }> = {
  input: { color: "var(--text-tertiary)", soft: "var(--surface-secondary)" },
  deterministic: { color: "var(--text-secondary)", soft: "var(--surface-secondary)" },
  ai: { color: "var(--state-build-text)", soft: "var(--state-build-soft)" },
  agent: { color: "var(--state-discover-text)", soft: "var(--state-discover-soft)" },
  human: { color: "var(--state-operate-text)", soft: "var(--state-operate-soft)" },
  output: { color: "var(--text-tertiary)", soft: "var(--surface-secondary)" },
};

export type KindLabels = Record<StepKind, string>;

type Props = { steps: SolutionDiagramStep[]; kinds: KindLabels; title: string; className?: string; caption?: string; compact?: boolean };

export function WorkflowDiagram({ steps, kinds, title, className, caption, compact = false }: Props) {
  const label = `${title}: ${steps.map((s) => `${s.label} (${kinds[s.kind]}${s.when ? `, ${s.when}` : ""})`).join(" → ")}`;
  return (
    <figure className={cn("wf2 reveal relative w-full", !compact && "@container/wf", className)} aria-label={label}>
      <ol className="wf2-list" aria-hidden>
        {steps.map((step, i) => {
          const k = KIND_STYLE[step.kind];
          const io = step.kind === "input" || step.kind === "output";
          const next = steps[i + 1];
          const dashedLink = !!(step.when || next?.when);
          return (
            <li key={i} className="wf2-step build-item" style={{ ["--b" as string]: i } as CSSProperties}>
              {next && (
                <span className="wf2-link build-line" style={{ ["--b" as string]: i + 0.6 } as CSSProperties}>
                  <span className={cn("wf2-line", dashedLink && "wf2-line-dashed")} />
                  <svg viewBox="0 0 8 8" width="8" height="8" className="wf2-head" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 1 5.5 4 2.5 7" />
                  </svg>
                </span>
              )}
              <span
                className={cn("relative grid size-10 shrink-0 place-items-center rounded-full border-[1.5px]", io && "border-dashed", step.kind === "human" && "bg-[var(--wf-soft)]")}
                style={{ borderColor: k.color, color: k.color, ["--wf-soft" as string]: k.soft } as CSSProperties}
              >
                <KindGlyph kind={step.kind} size={18} />
              </span>
              <span className="wf2-text">
                <span className="text-[0.95rem] font-medium leading-snug text-balance text-text-primary">{step.label}</span>
                {!io && (
                  <span className="wf-kind" style={{ color: k.color }}>
                    {kinds[step.kind]}
                  </span>
                )}
                {step.when && <span className="text-[0.8rem] leading-snug text-text-tertiary">{step.when}</span>}
              </span>
            </li>
          );
        })}
      </ol>
      {caption && <figcaption className="mt-8 text-small text-text-tertiary">{caption}</figcaption>}
    </figure>
  );
}
