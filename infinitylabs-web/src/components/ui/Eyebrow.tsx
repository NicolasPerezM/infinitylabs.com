import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = { children: ReactNode; className?: string; stage?: "discover" | "build" | "operate" | "structure" };

const dot: Record<NonNullable<Props["stage"]>, string> = {
  discover: "bg-discover",
  build: "bg-build",
  operate: "bg-operate",
  structure: "bg-structure",
};

/** Mono uppercase label used for section codes and stage names. */
export function Eyebrow({ children, className, stage }: Props) {
  return (
    <span className={cn("label-mono inline-flex items-center gap-2 text-text-tertiary", className)}>
      {stage && <span aria-hidden className={cn("inline-block size-1.5 rounded-full", dot[stage])} />}
      {children}
    </span>
  );
}
