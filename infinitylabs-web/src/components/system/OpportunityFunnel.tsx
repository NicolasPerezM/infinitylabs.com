import type { CSSProperties } from "react";
import type { StepKind } from "@/content/solutions";
import { fill } from "@/i18n/dictionaries";

/**
 * The AI Opportunity Sprint as three frames of one decision (DEC-026, revised DEC-027 after Tufte):
 * every opportunity on the table → each placed by value × feasibility, the three that clear both
 * thresholds lettered A/B/C while the discards stay visible (they are documented too) → the design
 * of A, B and C as typed flows (what the "Diseñar" phase actually produces). Illustrative: the dots
 * are not client data, and the caption says so next to the figure.
 */
const FLOWS: StepKind[][] = [
  ["input", "ai", "deterministic", "human", "output"],
  ["input", "deterministic", "ai", "human", "output"],
  ["input", "agent", "deterministic", "human", "output"],
];
const KIND_COLOR: Record<StepKind, string> = {
  input: "var(--text-tertiary)",
  deterministic: "var(--text-secondary)",
  ai: "var(--state-build-text)",
  agent: "var(--state-discover-text)",
  human: "var(--state-operate-text)",
  output: "var(--text-tertiary)",
};
const LETTERS = ["A", "B", "C"];

// [feasibility, value] in 0..1; the first three are the ones that clear both thresholds.
const DOTS: [number, number][] = [
  [0.72, 0.9], [0.92, 0.78], [0.8, 0.68],
  [0.15, 0.2], [0.3, 0.35], [0.22, 0.6], [0.45, 0.25], [0.55, 0.45], [0.35, 0.75], [0.62, 0.3],
  [0.8, 0.4], [0.12, 0.45], [0.5, 0.62], [0.7, 0.15], [0.9, 0.25], [0.28, 0.12], [0.42, 0.5],
  [0.58, 0.72], [0.18, 0.85], [0.75, 0.55], [0.4, 0.88], [0.88, 0.52], [0.08, 0.7], [0.62, 0.58],
];
const KEEP = 3;
const T = 0.64; // threshold on both axes

// plot area inside a 200 × 150 frame
const X0 = 26, X1 = 192, Y0 = 10, Y1 = 124;
const px = (f: number) => X0 + f * (X1 - X0);
const py = (v: number) => Y1 - v * (Y1 - Y0);

// frame 1: the same dots as an unsorted inventory (6 × 4 grid with a fixed jitter)
const inventory = DOTS.map((_, i) => {
  const c = i % 6, r = Math.floor(i / 6);
  const j = ((i * 37) % 11) / 11 - 0.5;
  return { x: 22 + c * 31 + j * 8, y: 24 + r * 28 + (((i * 53) % 7) / 7 - 0.5) * 8 };
});

type Phase = { name: string; short: string; description?: string };
type Props = { phases: Phase[]; phaseLabel: string; labels: { value: string; feasibility: string; illustrative: string }; /** Use each phase's full description (offer page) instead of the short line. */ detail?: boolean };

export function OpportunityFunnel({ phases, phaseLabel, labels, detail = false }: Props) {
  return (
    <figure className="reveal">
      <ol className="grid gap-6 md:grid-cols-3 md:gap-8">
        {phases.slice(0, 3).map((phase, i) => (
          <li key={phase.name} className="build-item relative grid grid-cols-[7.5rem_1fr] items-start gap-4 md:flex md:flex-col" style={{ ["--b" as string]: i * 2 } as CSSProperties}>
            {i > 0 && (
              <span aria-hidden className="absolute -left-[1.3rem] top-[34%] hidden -translate-y-1/2 text-text-tertiary md:block">
                <svg viewBox="0 0 8 8" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 1 5.5 4 2.5 7" />
                </svg>
              </span>
            )}
            <div className="rounded-lg border border-border-subtle bg-surface-elevated p-1.5 md:p-3">
              <svg viewBox="0 0 200 150" className="w-full" role="presentation">
                {i === 1 && (
                  <g>
                    <rect x={px(T)} y={Y0} width={X1 - px(T)} height={py(T) - Y0} fill="var(--state-discover-soft)" />
                    <path d={`M${X0} ${Y0}V${Y1}H${X1}`} fill="none" stroke="var(--border-strong)" strokeWidth="1" />
                    <path d={`M${px(T)} ${Y0}V${Y1}M${X0} ${py(T)}H${X1}`} fill="none" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="3 3" />
                    <text x={X1} y={Y1 + 16} textAnchor="end" fontSize="10" fill="var(--text-tertiary)" style={{ fontFamily: "var(--font-mono)" }}>
                      {labels.feasibility.toUpperCase()} →
                    </text>
                    <text x="0" y="0" transform={`translate(${X0 - 10} ${Y0}) rotate(-90)`} textAnchor="end" fontSize="10" fill="var(--text-tertiary)" style={{ fontFamily: "var(--font-mono)" }}>
                      {labels.value.toUpperCase()} →
                    </text>
                  </g>
                )}
                {i < 2 &&
                  DOTS.map(([f, v], d) => {
                    const pos = i === 0 ? inventory[d] : { x: px(f), y: py(v) };
                    const kept = i === 1 && d < KEEP;
                    return (
                      <g key={d}>
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="4.5"
                          fill={i === 0 ? "none" : kept ? "var(--state-discover)" : "var(--text-tertiary)"}
                          stroke={i === 0 ? "var(--text-tertiary)" : "none"}
                          strokeWidth="1.2"
                          opacity={i === 0 || kept ? 1 : 0.55}
                        />
                        {kept && (
                          <text x={pos.x + 7} y={pos.y - 5} fontSize="9" fill="var(--text-primary)" style={{ fontFamily: "var(--font-mono)" }}>
                            {LETTERS[d]}
                          </text>
                        )}
                      </g>
                    );
                  })}
                {i === 2 &&
                  FLOWS.map((flow, r) => {
                    const y = 34 + r * 40;
                    const xs = flow.map((_, n) => 52 + n * 34);
                    return (
                      <g key={r}>
                        <text x="14" y={y + 3.5} fontSize="10" fill="var(--text-primary)" style={{ fontFamily: "var(--font-mono)" }}>
                          {LETTERS[r]}
                        </text>
                        <path d={`M${xs[0] + 8} ${y}H${xs[xs.length - 1] - 8}`} stroke="var(--border-strong)" strokeWidth="1" />
                        {flow.map((kind, n) => (
                          <circle
                            key={n}
                            cx={xs[n]}
                            cy={y}
                            r="7"
                            fill={kind === "human" ? "var(--state-operate-soft)" : "var(--surface-elevated)"}
                            stroke={KIND_COLOR[kind]}
                            strokeWidth="1.4"
                            strokeDasharray={kind === "input" || kind === "output" ? "2.5 2" : undefined}
                          />
                        ))}
                      </g>
                    );
                  })}
              </svg>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-small text-text-tertiary">{fill(phaseLabel, { n: i + 1 })}</span>
              <h3 className="text-heading font-semibold">{phase.name}</h3>
              <p className={detail ? "text-small text-text-secondary" : "text-body text-text-secondary"}>{detail ? (phase.description ?? phase.short) : phase.short}</p>
            </div>
          </li>
        ))}
      </ol>
      <figcaption className="mt-5 text-small text-text-tertiary">{labels.illustrative}</figcaption>
    </figure>
  );
}
