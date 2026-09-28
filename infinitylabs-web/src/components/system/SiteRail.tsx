"use client";

import { useEffect, useRef, useState } from "react";
import { emitSection } from "@/lib/section-spy";
import { cn } from "@/lib/utils";

export type RailSection = { id: string; code: string; label: string };

/**
 * SiteRail — the continuous line that runs through the page (DEC-016).
 * A fixed vertical hairline on wide screens; the fill follows scroll progress in the
 * Discover→Build→Operate gradient; one node per section, clickable. Publishes the active
 * section for the header readout. Hidden below xl; nothing is lost on smaller screens.
 */
export function SiteRail({ sections }: { sections: RailSection[] }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    let ticking = false;
    const compute = () => {
      ticking = false;
      const vh = window.innerHeight;
      const probe = window.scrollY + vh * 0.38;
      let idx = 0;
      for (let i = 0; i < els.length; i++) if (els[i].offsetTop <= probe) idx = i;
      const cur = els[idx];
      const next = els[idx + 1];
      const span = next ? next.offsetTop - cur.offsetTop : Math.max(1, cur.offsetHeight);
      const intra = Math.min(1, Math.max(0, (probe - cur.offsetTop) / span));
      const p = els.length > 1 ? (idx + intra) / (els.length - 1) : 1;
      setActive(idx);
      setProgress(p);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      emitSection(null);
    };
  }, [sections]);

  useEffect(() => {
    const s = sections[active];
    if (s) emitSection({ ...s, index: active, total: sections.length });
  }, [active, sections]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  return (
    <nav aria-label="Page sections" className="pointer-events-none fixed inset-y-0 left-0 z-30 hidden w-14 xl:block">
      <div className="absolute bottom-24 left-7 top-24 w-px bg-border-strong/70">
        <div
          ref={fillRef}
          aria-hidden
          className="absolute inset-x-0 top-0 origin-top state-gradient-vertical"
          style={{ height: "100%", transform: `scaleY(${progress})`, transition: "transform 120ms linear" }}
        />
        <ol className="absolute inset-0 m-0 list-none p-0">
          {sections.map((s, i) => {
            const top = sections.length > 1 ? (i / (sections.length - 1)) * 100 : 0;
            const isActive = i === active;
            const isPast = i < active;
            return (
              <li key={s.id} className="absolute -left-[5px]" style={{ top: `calc(${top}% - 5px)` }}>
                <button
                  type="button"
                  onClick={() => go(s.id)}
                  aria-current={isActive ? "true" : undefined}
                  aria-label={`${s.code} ${s.label}`}
                  className={cn(
                    "group pointer-events-auto relative flex size-[11px] items-center justify-center rounded-full border bg-surface-primary transition-[transform,border-color,background-color] duration-300 ease-expo",
                    isActive ? "scale-125 border-text-primary bg-text-primary" : isPast ? "border-text-secondary" : "border-border-strong hover:border-text-primary",
                  )}
                >
                  {/* code only when active (never overlaps content); full label as a chip on hover/focus */}
                  <span
                    aria-hidden
                    className={cn(
                      "label-mono pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-text-tertiary transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  >
                    {s.code}
                  </span>
                  <span
                    aria-hidden
                    className="label-mono pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-sm border border-border-strong bg-surface-primary px-2 py-1 text-text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    <span className="text-text-tertiary">{s.code}</span> {s.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
