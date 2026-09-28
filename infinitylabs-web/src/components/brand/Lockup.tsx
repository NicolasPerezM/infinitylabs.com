import Link from "next/link";
import { LogoMark } from "./LogoMark";
import { cn } from "@/lib/utils";

/**
 * Provisional lockup: untouched symbol + typeset "Infinity Labs" (DEC-006, GAP-001).
 * Clear space is the symbol height × 0.25 on all sides (applied as padding by the parent).
 */
type Props = {
  size?: number;
  variant?: "color" | "mono";
  href?: string | null;
  className?: string;
  animate?: boolean;
};

export function Lockup({ size = 28, variant = "color", href = "/", className, animate = false }: Props) {
  const wordmarkSize = Math.round(size * 0.78);
  const content = (
    <span className={cn("inline-flex items-center", className)} style={{ gap: Math.round(size * 0.38) }}>
      <LogoMark size={size} variant={variant} animate={animate} decorative />
      <span
        className="font-sans font-semibold leading-none text-text-primary"
        style={{ fontSize: wordmarkSize, letterSpacing: "-0.02em" }}
      >
        Infinity Labs
      </span>
    </span>
  );
  if (href === null) return content;
  return (
    <Link href={href} aria-label="Infinity Labs — home" className="inline-flex rounded-sm">
      {content}
    </Link>
  );
}
