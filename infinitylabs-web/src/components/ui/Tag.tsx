import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  stage?: "discover" | "build" | "operate" | "structure" | "neutral";
  className?: string;
};

const styles: Record<NonNullable<Props["stage"]>, string> = {
  discover: "bg-discover-soft text-discover-text",
  build: "bg-build-soft text-build-text",
  operate: "bg-operate-soft text-operate-text",
  structure: "bg-structure-soft text-structure-text",
  neutral: "bg-surface-secondary text-text-secondary border border-border-subtle",
};

export function Tag({ children, stage = "neutral", className }: Props) {
  return (
    <span className={cn("label-mono inline-flex h-6 items-center rounded-sm px-2", styles[stage], className)}>
      {children}
    </span>
  );
}
