import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href: string };
type Props = { title: string; lede?: ReactNode; children?: ReactNode; canvas?: "light" | "dark"; aside?: ReactNode; crumb?: Crumb; current?: string; crumbLabel?: string };

/**
 * Interior page header (DEC-027): one wayfinding signal at the top (a breadcrumb on detail pages,
 * nothing on index pages), a short promise set large, one lede, and at most one image beside it.
 * The headline is plain text: it is there the moment the page is.
 */
export function PageHero({ title, lede, children, canvas = "light", aside, crumb, current, crumbLabel = "Breadcrumb" }: Props) {
  return (
    <section className={cn("border-b border-border-subtle", canvas === "dark" && "theme-dark bg-surface-primary text-text-primary")}>
      <Container>
        <div className="min-h-11 py-1">
          {crumb && (
            <nav aria-label={crumbLabel} className="text-small text-text-tertiary">
              <Link href={crumb.href} className="inline-flex min-h-11 items-center underline decoration-border-strong underline-offset-4 hover:text-text-primary hover:decoration-text-primary">
                {crumb.label}
              </Link>
              <span aria-hidden> / </span>
              <span aria-current="page" className="text-text-secondary">{current}</span>
            </nav>
          )}
        </div>
        <div className={cn("grid gap-12 pb-section-sm pt-6 lg:pb-section lg:pt-12", aside ? "lg:grid-cols-12 lg:items-center lg:gap-8" : "")}>
          <div className={cn("flex flex-col gap-6", aside ? "lg:col-span-6" : "")}>
            <h1 className="text-display-2xl max-w-[16ch] text-text-primary">{title}</h1>
            {lede && <p className="max-w-[56ch] text-body-lg text-text-secondary">{lede}</p>}
            {children}
          </div>
          {aside && <div className="lg:col-span-6 xl:col-span-5 xl:col-start-8">{aside}</div>}
        </div>
      </Container>
    </section>
  );
}
