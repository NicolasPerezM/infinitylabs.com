"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/Button";
import type { Solution } from "@/content/solutions";
import { href, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

type Props = { locale: Locale; solutions: Solution[]; previews: Record<string, ReactNode> };

/**
 * Solutions as an index (DEC-018, DEC-026, DEC-027): each row is a link (name + one-line promise,
 * arrow at the row end). Hover or focus shows that system's screen on wide screens; the screen is
 * a picture, not a control, so nothing beside it changes its target.
 * On phones (DEC-028) there is no hover, so the product leads: a swipeable gallery of the six
 * screens, each card the link to its solution (name and promise under the screen).
 */
export function SolutionsIndex({ locale, solutions, previews }: Props) {
  const hrefFor = (slug: string) => href(locale, `/solutions/${slug}`);
  const [active, setActive] = useState(solutions[0].slug);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <ul className="-mx-gutter flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-gutter px-gutter pb-2 [scrollbar-width:none] lg:hidden">
        {solutions.map((s) => (
          <li key={s.slug} className="w-[82%] max-w-sm shrink-0 snap-start">
            <Link href={hrefFor(s.slug)} data-event="solution_view" className="group flex flex-col gap-3">
              {previews[s.slug]}
              <span className="flex items-start justify-between gap-3">
                <span className="flex flex-col gap-0.5">
                  <span className="text-heading-sm font-semibold text-text-primary">{s.name}</span>
                  <span className="text-small text-text-secondary">{s.promise}</span>
                </span>
                <ArrowIcon className="mt-1" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <ol className="hidden flex-col border-t border-border-strong lg:col-span-6 lg:flex">
        {solutions.map((s) => {
          const isActive = s.slug === active;
          return (
            <li key={s.slug}>
              <Link
                href={hrefFor(s.slug)}
                data-event="solution_view"
                onMouseEnter={() => setActive(s.slug)}
                onFocus={() => setActive(s.slug)}
                className={cn("group grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border-subtle py-5 transition-colors duration-200", isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary")}
              >
                <span className="flex flex-col gap-1">
                  <span className="text-heading font-semibold text-text-primary">{s.name}</span>
                  <span className="text-body">{s.promise}</span>
                </span>
                <ArrowIcon className={cn("transition-transform duration-200", isActive && "translate-x-0.5")} />
              </Link>
            </li>
          );
        })}
      </ol>

      <div aria-hidden className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-24">
          {solutions.map((s) => (
            <div key={s.slug} hidden={s.slug !== active}>
              {previews[s.slug]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
