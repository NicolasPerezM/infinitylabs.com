"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { OperatingLoop } from "@/components/system/OperatingLoop";
import { operatingModel, type Stage } from "@/content/operating-model";
import { labsIntro } from "@/content/labs";
import { cn } from "@/lib/utils";

const text: Record<Stage, string> = { discover: "text-discover-text", build: "text-build-text", operate: "text-operate-text" };
const dot: Record<Stage, string> = { discover: "bg-discover", build: "bg-build", operate: "bg-operate" };

/**
 * 03 · Operating model as scrollytelling (DEC-017): the loop stays, the stages pass.
 * Active stage is driven by which block is nearest the viewport centre.
 * Below lg the loop sits on top and the blocks stack; nothing is hidden.
 */
export function OperatingModelScrolly() {
  const [active, setActive] = useState<Stage>("discover");
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        // choose the entry closest to the viewport centre among intersecting ones
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

  const current = operatingModel.find((s) => s.id === active)!;

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
      {/* sticky system view */}
      <div className="lg:col-span-6">
        <div className="lg:sticky lg:top-24">
          <div className="reveal relative overflow-hidden rounded-xl border border-border-subtle bg-surface-elevated p-4 sm:p-6">
            <div className="label-mono mb-2 flex items-center justify-between text-text-tertiary">
              <span>Operating model</span>
              <span className="inline-flex items-center gap-2">
                <span aria-hidden className={cn("size-1.5 rounded-full transition-colors duration-500", dot[active])} />
                {current.code} {current.name}
              </span>
            </div>
            <OperatingLoop active={active} draw={false} />
          </div>
          <p key={active} className={cn("mt-5 hidden text-body-lg text-text-secondary lg:block", "animate-[face-in_600ms_var(--ease-expo)_both]")}>
            <span className={cn("font-medium", text[active])}>{current.name}. </span>
            {current.promise}
          </p>
        </div>
      </div>

      {/* passing stages */}
      <ol className="flex flex-col lg:col-span-6">
        {operatingModel.map((s, i) => (
          <li
            key={s.id}
            data-stage={s.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={cn("border-t border-border-subtle py-10 transition-opacity duration-500 lg:min-h-[62vh] lg:py-14", active === s.id ? "opacity-100" : "lg:opacity-40")}
          >
            <div className="flex items-center gap-3">
              <span aria-hidden className={cn("inline-block size-2 rounded-full", dot[s.id])} />
              <span className="label-mono text-text-tertiary">
                {s.code} · {s.method.join(" · ")}
              </span>
            </div>
            <h3 className="mt-4 text-display-xl">{s.name}</h3>
            <p className="mt-4 max-w-[40ch] text-body-lg text-text-secondary lg:hidden">{s.promise}</p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {s.items.map((item) => (
                <li key={item} className="flex gap-3 border-t border-border-subtle pt-2.5 text-small text-text-primary">
                  {item}
                </li>
              ))}
            </ul>
            <Link href={`/capabilities#${s.id}`} data-event="capability_view" className={cn("mt-6 inline-block text-small font-medium underline underline-offset-4", text[s.id])}>
              {s.name} capabilities
            </Link>
          </li>
        ))}
        <li className="border-t border-border-subtle py-10">
          <span className="label-mono text-text-tertiary">04 · Labs · feeds all three</span>
          <p className="mt-3 max-w-[46ch] text-body text-text-secondary">{labsIntro.short}</p>
          <Link href="/labs" data-event="labs_view" className="mt-4 inline-block text-small font-medium underline underline-offset-4">
            Inside Labs
          </Link>
        </li>
      </ol>
    </div>
  );
}
