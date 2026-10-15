"use client";

import { useRef, useState } from "react";
import type { Stage } from "@/content/operating-model";
import { RibbonField, type NodePosition, type Rect } from "./RibbonField";
import { cn } from "@/lib/utils";

export type StageLabels = Record<Stage, { name: string; note: string }>;

const LAYOUTS: Record<"section" | "block" | "panel", { stage: Rect; density: "full" | "light"; plate: string }> = {
  section: { stage: { x: 0.4, y: 0.04, w: 0.62, h: 0.92 }, density: "full", plate: "var(--surface-primary)" },
  block: { stage: { x: 0.04, y: 0.06, w: 0.92, h: 0.88 }, density: "full", plate: "var(--surface-primary)" },
  panel: { stage: { x: 0.06, y: 0.12, w: 0.8, h: 0.78 }, density: "light", plate: "var(--surface-primary)" },
};

const OFFSETS: Record<Stage, { dx: number; dy: number; flip?: boolean }> = {
  discover: { dx: -8, dy: -58 },
  build: { dx: 26, dy: -12 },
  operate: { dx: -8, dy: 26 },
};
// When the Build node sits near the right edge, its label moves inside the loop, to the left of the node.
const OFFSETS_BLOCK: Record<Stage, { dx: number; dy: number; flip?: boolean }> = { ...OFFSETS, build: { dx: -24, dy: 6, flip: true } };
const CODES: Record<Stage, string> = { discover: "01", build: "02", operate: "03" };

type Props = { layout?: keyof typeof LAYOUTS; labels: StageLabels; active?: Stage | null; className?: string };

/**
 * Canvas ribbon + crisp, localized HTML labels positioned from the canvas layout.
 * Labels sit on a translucent plate so they stay legible where they cross the strands.
 */
export function RibbonScene({ layout = "section", labels, active = null, className }: Props) {
  const [nodes, setNodes] = useState<NodePosition[]>([]);
  const [width, setWidth] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const cfg = LAYOUTS[layout];
  return (
    <div ref={wrap} className={cn("absolute inset-0", className)}>
      <RibbonField
        stage={cfg.stage}
        stageMobile={cfg.stage}
        density={cfg.density}
        active={active}
        onLayout={(_b, n) => {
          setNodes(n);
          setWidth(wrap.current?.clientWidth ?? 0);
        }}
      />
      {nodes.map((n) => {
        const l = labels[n.id];
        // A label that would run past the right edge flips to the left of its node.
        const tight = width > 0 && n.x + (layout === "panel" ? 110 : 210) > width;
        const o = (layout === "block" || tight ? OFFSETS_BLOCK : OFFSETS)[n.id];
        const isActive = active === n.id;
        return (
          <div
            key={n.id}
            aria-hidden
            className="pointer-events-none absolute z-10 select-none rounded-sm px-2 py-1 backdrop-blur-[2px]"
            style={{ left: n.x + o.dx + (o.flip ? 8 : -8), top: n.y + o.dy - 4, transform: o.flip ? "translateX(-100%)" : undefined, textAlign: o.flip ? "right" : undefined, background: `color-mix(in srgb, ${cfg.plate} 82%, transparent)` }}
          >
            <p className={cn("label-mono whitespace-nowrap transition-colors duration-500", active && !isActive ? "text-text-tertiary" : "text-text-primary")}>
              <span className="text-text-tertiary">{CODES[n.id]} </span>
              {l.name}
            </p>
            {layout !== "panel" && <p className="whitespace-nowrap text-small text-text-secondary">{l.note}</p>}
          </div>
        );
      })}
    </div>
  );
}
