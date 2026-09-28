import { useId } from "react";
import type { Stage } from "@/content/operating-model";
import { cn } from "@/lib/utils";

/**
 * The operating model as one continuous loop (SVG). Used large in the scrollytelling section
 * and small as a panel. `active` emphasises one segment/node (driven by scroll).
 * Packets use SMIL animateMotion; hidden under prefers-reduced-motion.
 */

const SEGMENTS = [
  { id: "discover", d: "M140 100 C280 40, 450 60, 500 150", from: "#A662E6", to: "#5ABEFF", x1: 140, y1: 100, x2: 500, y2: 150 },
  { id: "build", d: "M500 150 C560 240, 420 330, 250 360", from: "#5ABEFF", to: "#5DE7C8", x1: 500, y1: 150, x2: 250, y2: 360 },
  { id: "operate", d: "M250 360 C120 380, 70 260, 95 170 C105 135, 118 112, 140 100", from: "#5DE7C8", to: "#A662E6", x1: 250, y1: 360, x2: 140, y2: 100 },
] as const;

const LOOP = "M140 100 C280 40, 450 60, 500 150 C560 240, 420 330, 250 360 C120 380, 70 260, 95 170 C105 135, 118 112, 140 100 Z";

const NODES = [
  { id: "discover" as Stage, code: "01", name: "DISCOVER", note: "map · score · design", x: 140, y: 100, color: "#A662E6", labelDx: -24, labelDy: -52, anchor: "start" as const },
  { id: "build" as Stage, code: "02", name: "BUILD", note: "integrate · approve", x: 500, y: 150, color: "#5ABEFF", labelDx: 26, labelDy: 4, anchor: "start" as const },
  { id: "operate" as Stage, code: "03", name: "OPERATE", note: "evaluate · improve", x: 250, y: 360, color: "#5DE7C8", labelDx: -14, labelDy: 48, anchor: "start" as const },
];

type Props = { className?: string; active?: Stage | null; labels?: boolean; draw?: boolean };

export function OperatingLoop({ className, active = null, labels = true, draw = true }: Props) {
  const uid = useId().replace(/[:]/g, "");
  return (
    <svg
      viewBox="0 0 690 440"
      className={cn("h-auto w-full", className)}
      role="img"
      data-active={active ?? undefined}
      aria-label="The Infinity Labs operating model as a continuous loop: Discover, Build and Operate, with work flowing from one stage to the next and back."
    >
      <defs>
        {SEGMENTS.map((s, i) => (
          <linearGradient key={i} id={`${uid}-seg${i}`} gradientUnits="userSpaceOnUse" x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}>
            <stop stopColor={s.from} />
            <stop offset="1" stopColor={s.to} />
          </linearGradient>
        ))}
        <path id={`${uid}-loop`} d={LOOP} />
        <style>{`
          @media (prefers-reduced-motion: reduce) { .${uid}-motion { display: none; } .${uid}-draw { animation: none !important; stroke-dashoffset: 0 !important; } }
        `}</style>
      </defs>

      <path d={LOOP} fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1" />

      {SEGMENTS.map((s, i) => (
        <path
          key={s.id}
          d={s.d}
          fill="none"
          stroke={`url(#${uid}-seg${i})`}
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={1}
          className={cn("loop-seg", draw && `${uid}-draw`)}
          data-seg-active={active === s.id ? "true" : undefined}
          style={draw ? { strokeDasharray: 1, strokeDashoffset: 1, animation: `draw-path 1.4s var(--ease-system) ${0.25 + i * 0.35}s forwards` } : undefined}
        />
      ))}

      {NODES.map((n) => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r="14" fill={n.color} fillOpacity="0.16" />
          <circle cx={n.x} cy={n.y} r="6" fill={n.color} className="loop-node" data-node-active={active === n.id ? "true" : undefined} />
          <circle cx={n.x} cy={n.y} r="6" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
          {labels && (
            <>
              <text x={n.x + n.labelDx} y={n.y + n.labelDy} textAnchor={n.anchor} fill="currentColor" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="0.12em">
                <tspan fillOpacity="0.55">{n.code} </tspan>
                <tspan fontWeight="600">{n.name}</tspan>
              </text>
              <text x={n.x + n.labelDx} y={n.y + n.labelDy + 18} textAnchor={n.anchor} fill="currentColor" fillOpacity="0.6" fontFamily="var(--font-mono)" fontSize="11">
                {n.note}
              </text>
            </>
          )}
        </g>
      ))}

      <g className={`${uid}-motion`}>
        {[0, -4.6].map((begin, i) => (
          <g key={i}>
            <circle r="5" fill="currentColor" />
            <circle r="9" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1">
              <animate attributeName="r" values="7;11;7" dur="2.4s" repeatCount="indefinite" begin={`${begin}s`} />
            </circle>
            <animateMotion dur="9.2s" repeatCount="indefinite" begin={`${begin}s`} calcMode="linear">
              <mpath href={`#${uid}-loop`} />
            </animateMotion>
          </g>
        ))}
      </g>
    </svg>
  );
}
