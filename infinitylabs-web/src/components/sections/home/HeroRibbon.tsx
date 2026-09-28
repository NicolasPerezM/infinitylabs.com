"use client";

import { useState } from "react";
import { RibbonField, type NodePosition } from "@/components/system/RibbonField";

const LABELS: Record<string, { code: string; name: string; note: string; dx: number; dy: number }> = {
  discover: { code: "01", name: "Discover", note: "map · score · design", dx: -8, dy: -58 },
  build: { code: "02", name: "Build", note: "integrate · approve", dx: 26, dy: -12 },
  operate: { code: "03", name: "Operate", note: "evaluate · improve", dx: -8, dy: 26 },
};

/**
 * Canvas ribbon + crisp HTML labels positioned from the canvas layout.
 * `layout="section"` fills the hero (desktop, loop on the right); `layout="block"` fills its own block (mobile).
 */
export function HeroRibbon({ layout = "section" }: { layout?: "section" | "block" }) {
  const [nodes, setNodes] = useState<NodePosition[]>([]);
  const stage = layout === "section" ? { x: 0.4, y: 0.04, w: 0.62, h: 0.92 } : { x: 0.04, y: 0.06, w: 0.92, h: 0.88 };
  return (
    <>
      <RibbonField stage={stage} stageMobile={stage} onLayout={(_box, n) => setNodes(n)} />
      {nodes.map((n) => {
        const l = LABELS[n.id];
        if (!l) return null;
        return (
          <div key={n.id} aria-hidden className="pointer-events-none absolute z-10 select-none" style={{ left: n.x + l.dx, top: n.y + l.dy }}>
            <p className="label-mono whitespace-nowrap text-text-primary">
              <span className="text-text-tertiary">{l.code} </span>
              {l.name}
            </p>
            <p className="font-mono text-[11px] text-text-tertiary">{l.note}</p>
          </div>
        );
      })}
    </>
  );
}
