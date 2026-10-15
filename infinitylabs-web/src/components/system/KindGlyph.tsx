import type { StepKind } from "@/content/solutions";

/**
 * One glyph per step type, drawn on a 20 px grid with a 1.5 px stroke so the type reads
 * without a legend: arrow in, rules, spark, hub, person, arrow out.
 */
export function KindGlyph({ kind, size = 20, className }: { kind: StepKind; size?: number; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {kind === "input" && <path d="M3 10h9M9 6.5 12.5 10 9 13.5M16 4v12" />}
      {kind === "deterministic" && (
        <>
          <rect x="4" y="4" width="12" height="12" rx="2" />
          <path d="M7 8.5h6M7 11.5h4" />
        </>
      )}
      {kind === "ai" && <path d="M10 3.5c.6 3.4 2.4 5.3 6 6-3.6.7-5.4 2.6-6 6-.6-3.4-2.4-5.3-6-6 3.6-.7 5.4-2.6 6-6Z" />}
      {kind === "agent" && (
        <>
          <circle cx="10" cy="10.5" r="2.5" />
          <path d="M10 8V5.2M12.2 11.8l2.5 1.5M7.8 11.8l-2.5 1.5" />
          <circle cx="10" cy="3.8" r="1.3" />
          <circle cx="15.9" cy="14" r="1.3" />
          <circle cx="4.1" cy="14" r="1.3" />
        </>
      )}
      {kind === "human" && (
        <>
          <circle cx="10" cy="7" r="2.75" />
          <path d="M4.5 16.5c.9-3 2.9-4.5 5.5-4.5s4.6 1.5 5.5 4.5" />
        </>
      )}
      {kind === "output" && <path d="M4 4v12M8 10h9M13.5 6.5 17 10l-3.5 3.5" />}
    </svg>
  );
}
