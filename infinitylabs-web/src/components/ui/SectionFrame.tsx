import type { ReactNode } from "react";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  title: string;
  canvas?: "light" | "dark" | "secondary";
  className?: string;
  children: ReactNode;
  padding?: "default" | "sm";
};

/**
 * SectionFrame — one label per section (DEC-027): a hairline that marks a real boundary and the
 * section's name in plain type. No crosshairs, no right-hand state, no background grid.
 */
export function SectionFrame({ id, title, canvas = "light", className, children, padding = "default" }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("relative scroll-mt-16", canvas === "dark" && "theme-dark bg-surface-primary text-text-primary", canvas === "secondary" && "bg-surface-secondary", canvas === "light" && "bg-surface-primary", className)}
    >
      <Container className="relative">
        <div className="relative py-3">
          <span className="absolute inset-x-0 top-0 h-px bg-border-strong" />
          <p className="text-small font-medium text-text-secondary">{title}</p>
        </div>
        <div className={cn(padding === "default" ? "pb-section pt-10 md:pt-14" : "pb-section-sm pt-8")}>{children}</div>
      </Container>
    </section>
  );
}
