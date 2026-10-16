import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Plain status text (DEC-027): no pill, no tint. Colour is reserved for stages and step types. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("text-small text-text-secondary", className)}>{children}</span>;
}
