"use client";

import { useState } from "react";
import Link from "next/link";
import { WorkflowDiagram, type KindLabels } from "@/components/system/WorkflowDiagram";
import { ArrowIcon } from "@/components/ui/Button";
import type { Solution } from "@/content/solutions";
import { href, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

type Props = { locale: Locale; solutions: Solution[]; kinds: KindLabels; illustrative: string; howItWorks: string; workflowTitle: string };

/** Solutions as an index (DEC-018): rows, not cards; hover/focus renders the typed workflow preview on wide screens. */
export function SolutionsIndex({ locale, solutions, kinds, illustrative, howItWorks, workflowTitle }: Props) {
  const hrefFor = (slug: string) => href(locale, `/solutions/${slug}`);
  const [active, setActive] = useState(solutions[0].slug);
  const current = solutions.find((s) => s.slug === active) ?? solutions[0];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <ol className="flex flex-col border-t border-border-strong lg:col-span-6" onMouseLeave={() => setActive(solutions[0].slug)}>
        {solutions.map((s, i) => {
          const isActive = s.slug === active;
          return (
            <li key={s.slug} className="reveal" style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}>
              <Link
                href={hrefFor(s.slug)}
                data-event="solution_view"
                onMouseEnter={() => setActive(s.slug)}
                onFocus={() => setActive(s.slug)}
                aria-describedby={isActive ? "solution-preview" : undefined}
                className={cn("group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-b border-border-subtle py-5 transition-colors duration-200", isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary")}
              >
                <span className="label-mono text-text-tertiary">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex flex-col gap-1">
                  <span className="text-heading font-semibold text-text-primary">{s.name}</span>
                  <span className="text-small">{s.problem[0]}</span>
                </span>
                <ArrowIcon className={cn("mt-1 transition-transform duration-200", isActive && "translate-x-0.5")} />
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="hidden lg:col-span-6 lg:block">
        <div id="solution-preview" aria-live="polite" className="sticky top-24 rounded-xl border border-border-subtle bg-surface-elevated p-6">
          <div className="label-mono flex items-center justify-between text-text-tertiary">
            <span>{current.name}</span>
            <span>{illustrative}</span>
          </div>
          <p key={current.slug} className="mt-4 text-heading font-semibold animate-[face-in_500ms_var(--ease-expo)_both]">{current.headline}</p>
          <div key={`${current.slug}-d`} className="reveal is-visible mt-6 animate-[face-in_500ms_var(--ease-expo)_both]">
            <WorkflowDiagram steps={current.diagram} kinds={kinds} title={workflowTitle} compact legend={false} />
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-border-subtle pt-4 text-small">
            <span className="text-text-tertiary">{current.outcomes[0]}</span>
            <Link href={hrefFor(current.slug)} className="font-medium underline underline-offset-4">{howItWorks}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
