import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Dark "system" canvas (docs/BRAND_IMPLEMENTATION.md §1 C-03). */
  canvas?: "light" | "dark" | "secondary";
  padding?: "default" | "sm" | "none";
  /** Adds the Discover→Build→Operate state rail on the left edge (operating-model sections only). */
  rail?: boolean;
  labelledBy?: string;
};

export function Section({ children, id, className, canvas = "light", padding = "default", rail = false, labelledBy }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative",
        canvas === "dark" && "theme-dark bg-surface-primary text-text-primary",
        canvas === "secondary" && "bg-surface-secondary",
        canvas === "light" && "bg-surface-primary",
        padding === "default" && "py-section",
        padding === "sm" && "py-section-sm",
        className,
      )}
    >
      {rail && <span aria-hidden className="absolute inset-y-0 left-0 w-0.5 state-gradient-vertical" />}
      {children}
    </section>
  );
}
