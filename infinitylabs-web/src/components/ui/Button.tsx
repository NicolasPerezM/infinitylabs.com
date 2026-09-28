import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-[background-color,color,border-color,transform] duration-150 ease-out-quart focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-contrast hover:bg-accent-hover active:translate-y-px",
  secondary: "border border-border-strong bg-transparent text-text-primary hover:border-text-primary",
  ghost: "text-text-primary underline-offset-4 hover:underline",
  inverse: "bg-surface-inverse text-text-inverse hover:opacity-90",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-4 text-small",
  lg: "h-12 px-5 text-body",
};

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Analytics event name, picked up by AnalyticsProvider via data-event. */
  event?: string;
};

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
    <svg aria-hidden viewBox="0 0 16 16" width="16" height="16" fill="none" className={cn("shrink-0", className)}>
      <path d="M3 8h9.5M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
