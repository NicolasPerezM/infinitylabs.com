import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "./Button";

type Props = { href: string; children: ReactNode; className?: string; arrow?: boolean; event?: string };

export function TextLink({ href, children, className, arrow = true, event }: Props) {
  return (
    <Link
      href={href}
      data-event={event}
      className={cn(
        "group inline-flex items-center gap-1.5 font-medium text-text-primary underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-text-primary",
        className,
      )}
    >
      {children}
      {arrow && <ArrowIcon className="transition-transform duration-150 group-hover:translate-x-0.5" />}
    </Link>
  );
}
