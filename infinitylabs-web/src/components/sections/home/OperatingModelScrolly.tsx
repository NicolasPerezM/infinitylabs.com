"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { RibbonScene, type StageLabels } from "@/components/system/RibbonScene";
import type { Stage, StageDefinition } from "@/content/operating-model";
import { href, type Locale } from "@/i18n/config";
import { fill } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

const text: Record<Stage, string> = { discover: "text-discover-text", build: "text-build-text", operate: "text-operate-text" };
const dot: Record<Stage, string> = { discover: "bg-discover", build: "bg-build", operate: "bg-operate" };

type Props = {
  locale: Locale;
  stages: StageDefinition[];
  labels: StageLabels;
  panelTitle: string;
  /** Template with {stage}, e.g. "{stage} capabilities". */
  capabilitiesCta: string;
  labs: { label: string; body: string; cta: string };
};

/**
 * Operating model as scrollytelling (DEC-017): the ribbon stays (same signature graphic as the hero,
 * with the active segment coloured) while the stages pass. Below lg the ribbon sits on top and the blocks stack.
 */
export function OperatingModelScrolly({ locale, stages, labels, panelTitle, capabilitiesCta, labs }: Props) {
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

  const current = stages.find((s) => s.id === active)!;

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-6">
        <div className="lg:sticky lg:top-24">
          <div className="reveal relative overflow-hidden rounded-xl border border-border-subtle bg-surface-elevated">
            <div className="label-mono flex items-center justify-between p-4 text-text-tertiary sm:px-6 sm:pt-6">
              <span>{panelTitle}</span>
              <span className="inline-flex items-center gap-2">
                <span aria-hidden className={cn("size-1.5 rounded-full transition-colors duration-500", dot[active])} />
                {current.name}
              </span>
            </div>
            <div className="relative aspect-[690/440] w-full">
              <RibbonScene layout="panel" labels={labels} active={active} />
            </div>
          </div>
          <p key={active} className={cn("mt-5 hidden text-body-lg text-text-secondary lg:block", "animate-[face-in_600ms_var(--ease-expo)_both]")}>
            <span className={cn("font-medium", text[active])}>{current.name}. </span>
            {current.promise}
          </p>
        </div>
      </div>

      <ol className="flex flex-col lg:col-span-6">
        {stages.map((s, i) => (
          <li
            key={s.id}
            data-stage={s.id}
            ref={(el) => { refs.current[i] = el; }}
            className="border-t border-border-subtle py-10 lg:min-h-[62vh] lg:py-14"
          >
            {/* Inactive stages recede by colour, never by opacity: every text token stays ≥ 4.5:1 (WCAG 1.4.3). */}
            <div className="flex items-center gap-3">
              <span aria-hidden className={cn("inline-block size-2 rounded-full transition-opacity duration-500", active === s.id ? "opacity-100" : "lg:opacity-50", dot[s.id])} />
              <span className="label-mono text-text-tertiary">{s.method.join(" · ")}</span>
            </div>
            <h3 className={cn("mt-4 text-display-xl transition-colors duration-500", active === s.id ? "text-text-primary" : "lg:text-text-tertiary")}>{s.name}</h3>
            <p className="mt-4 max-w-[40ch] text-body-lg text-text-secondary lg:hidden">{s.promise}</p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {s.items.map((item) => (
                <li key={item} className={cn("flex gap-3 border-t border-border-subtle pt-2.5 text-small transition-colors duration-500", active === s.id ? "text-text-primary" : "lg:text-text-secondary")}>{item}</li>
              ))}
            </ul>
            <Link href={href(locale, `/capabilities#${s.id}`)} data-event="capability_view" className={cn("mt-6 inline-block text-small font-medium underline underline-offset-4", text[s.id])}>
              {fill(capabilitiesCta, { stage: s.name })}
            </Link>
          </li>
        ))}
        <li className="border-t border-border-subtle py-10">
          <span className="label-mono text-text-tertiary">{labs.label}</span>
          <p className="mt-3 max-w-[46ch] text-body text-text-secondary">{labs.body}</p>
          <Link href={href(locale, "/labs")} data-event="labs_view" className="mt-4 inline-block text-small font-medium underline underline-offset-4">{labs.cta}</Link>
        </li>
      </ol>
    </div>
  );
}
