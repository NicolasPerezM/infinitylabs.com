import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

/**
 * Monochrome buttons (ink on paper, paper on ink) with the brand's only colour gesture:
 * a state-gradient rail that sweeps in on hover. No pills, no glow.
 */
const base =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md font-medium whitespace-nowrap transition-[background-color,color,border-color,transform] duration-200 ease-expo focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.985] disabled:opacity-60 disabled:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:state-gradient after:transition-transform after:duration-500 after:ease-expo hover:after:scale-x-100";

const variants: Record<Variant, string> = {
  primary: "bg-text-primary text-surface-primary hover:bg-ink-700 dark:hover:bg-paper-200",
  secondary: "border border-border-strong bg-transparent text-text-primary hover:border-text-primary",
  ghost: "text-text-primary hover:bg-surface-secondary",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-4 text-small",
  lg: "h-12 px-5 text-body",
};

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode; event?: string };
type LinkProps = Common & { href: string; external?: boolean } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type ButtonProps = Common & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export function Button(props: LinkProps | ButtonProps) {
  const { variant = "primary", size = "md", className, children, event } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, external, variant: _v, size: _s, className: _c, event: _e, children: _ch, ...rest } = props;
    void _v; void _s; void _c; void _e; void _ch;
    if (external) {
      return (
        <a href={href} className={classes} data-event={event} target="_blank" rel="noopener noreferrer" {...(rest as ComponentProps<"a">)}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} data-event={event} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, event: _e, children: _ch, href: _h, ...rest } = props as ButtonProps;
  void _v; void _s; void _c; void _e; void _ch; void _h;
  return (
    <button className={classes} data-event={event} {...rest}>
      {children}
    </button>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" width="16" height="16" fill="none" className={cn("shrink-0 transition-transform duration-200 ease-expo group-hover/btn:translate-x-0.5", className)}>
      <path d="M3 8h9.5M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
