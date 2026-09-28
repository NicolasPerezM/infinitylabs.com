import type { ReactNode } from "react";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  title: string;
  state?: string;
  stateStage?: "discover" | "build" | "operate" | "structure";
  canvas?: "light" | "dark" | "secondary";
  className?: string;
  children: ReactNode;
  padding?: "default" | "sm";
  grid?: boolean;
};

const dot = { discover: "bg-discover", build: "bg-build", operate: "bg-operate", structure: "bg-structure" } as const;

/**
 * SectionFrame — every section is a bounded module of the system: a hairline that draws in,
 * corner crosshairs and a mono readout (title left, state right). No numerals (they were internal).
 */
export function SectionFrame({ id, title, state, stateStage, canvas = "light", className, children, padding = "default", grid = false }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("relative scroll-mt-16", canvas === "dark" && "theme-dark bg-surface-primary text-text-primary", canvas === "secondary" && "bg-surface-secondary", canvas === "light" && "bg-surface-primary", className)}
    >
      {grid && <div aria-hidden className="grid-reveal pointer-events-none absolute inset-0 bg-system-grid" data-grid-reveal />}
      <Container className="relative">
        <div className="relative flex items-center justify-between gap-4 py-3">
          <Crosshair className="-left-[5px]" />
          <Crosshair className="-right-[5px]" />
          <span className="rule absolute inset-x-0 top-0" data-reveal-rule />
          <p className="label-mono text-text-primary">{title}</p>
          {state && (
            <p className="label-mono hidden items-center gap-2 text-text-tertiary sm:inline-flex">
              {stateStage && <span aria-hidden className={cn("inline-block size-1.5 rounded-full", dot[stateStage])} />}
              {state}
            </p>
          )}
        </div>
        <div className={cn(padding === "default" ? "pb-section pt-10 md:pt-14" : "pb-section-sm pt-8")}>{children}</div>
      </Container>
    </section>
  );
}

function Crosshair({ className }: { className?: string }) {
  return (
    <svg aria-hidden width="11" height="11" viewBox="0 0 11 11" className={cn("absolute -top-[5px] text-border-strong", className)}>
      <path d="M5.5 0v11M0 5.5h11" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
