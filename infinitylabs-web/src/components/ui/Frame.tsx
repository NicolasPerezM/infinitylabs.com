import type { ReactNode } from "react";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

/** Interior-page section: the heading names the section (no eyebrow above it), content on the right. */
export function Frame({ id, title, lede, children, canvas = "light", padding = "sm", className }: { id: string; title: string; lede?: ReactNode; children: ReactNode; canvas?: "light" | "dark" | "secondary"; padding?: "default" | "sm"; className?: string }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("relative scroll-mt-16", canvas === "dark" && "theme-dark bg-surface-primary text-text-primary", canvas === "secondary" && "bg-surface-secondary", canvas === "light" && "bg-surface-primary", className)}
    >
      <Container className={cn("grid gap-10 lg:grid-cols-12 lg:gap-8", padding === "default" ? "py-section" : "py-section-sm")}>
        <div className="flex flex-col gap-4 lg:col-span-4">
          <h2 id={`${id}-title`} className="text-display-lg max-w-[18ch]">{title}</h2>
          {lede && <p className="text-body text-text-secondary">{lede}</p>}
        </div>
        <div className="lg:col-span-8">{children}</div>
      </Container>
    </section>
  );
}
