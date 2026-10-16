"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { RibbonScene, type StageLabels } from "@/components/system/RibbonScene";
import type { Stage, StageDefinition } from "@/content/operating-model";
import { href, type Locale } from "@/i18n/config";
import { fill } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

const dot: Record<Stage, string> = { discover: "bg-discover", build: "bg-build", operate: "bg-operate" };

type Props = {
  locale: Locale;
  stages: StageDefinition[];
  labels: StageLabels;
  /** Template with {stage}, e.g. "{stage} capabilities". */
  capabilitiesCta: string;
};

/**
 * Operating model as scrollytelling (DEC-017): the ribbon stays (same signature graphic as the hero,
 * with the active segment coloured) while the stages pass. Below lg the ribbon sits on top and the blocks stack.
 */
export function OperatingModelScrolly({ locale, stages, labels, capabilitiesCta }: Props) {
  const [active, setActive] = useState<Stage>("discover");
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        let best: { id: Stage; d: number } | null = null;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const r = e.boundingClientRect;
          const d = Math.abs(r.top + r.height / 2 - window.innerHeight / 2);
          const id = (e.target as HTMLElement).dataset.stage as Stage;
          if (!best || d < best.d) best = { id, d };
        }
        if (best) setActive(best.id);
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0, 0.2, 0.5, 0.8, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
      {/* The ribbon is the only image; below lg it would be the second ribbon in three screens, so it stays hidden there. */}
      <div aria-hidden className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-24">
          <div className="reveal relative aspect-[690/440] w-full">
            <RibbonScene layout="panel" labels={labels} active={active} />
          </div>
        </div>
      </div>

      <ol className="flex flex-col lg:col-span-6">
        {stages.map((s, i) => (
          <li
            key={s.id}
            data-stage={s.id}
            ref={(el) => { refs.current[i] = el; }}
            className="border-t border-border-subtle py-10 lg:min-h-[48vh] lg:py-12"
          >
            {/* Inactive stages recede by colour, never by opacity: every text token stays ≥ 4.5:1 (WCAG 1.4.3). */}
            <h3 className={cn("flex items-center gap-4 text-display-2xl transition-colors duration-500", active === s.id ? "text-text-primary" : "lg:text-text-tertiary")}>
              <span aria-hidden className={cn("inline-block size-3 shrink-0 rounded-full", dot[s.id])} />
              {s.name}
            </h3>
            {/* One idea per stage: the promise carries it; the three areas are supporting detail. */}
            <p className="mt-5 max-w-[26ch] text-[clamp(1.35rem,2.2vw,1.85rem)] font-medium leading-[1.2] tracking-[-0.015em] text-text-secondary">{s.promise}</p>
            <ul className="mt-8 hidden flex-col md:flex">
              {s.items.map((item) => (
                <li key={item} className={cn("border-t border-border-subtle py-2.5 text-body transition-colors duration-500", active === s.id ? "text-text-primary" : "lg:text-text-secondary")}>
                  {item}
                </li>
              ))}
            </ul>
            <Link href={href(locale, `/capabilities#${s.id}`)} data-event="capability_view" className="mt-4 inline-flex min-h-11 items-center text-small font-medium text-text-primary underline decoration-border-strong underline-offset-4 hover:decoration-text-primary">
              {fill(capabilitiesCta, { stage: s.name })}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
