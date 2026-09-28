"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/content/navigation";
import { cn } from "@/lib/utils";

export function NavLinks({ items, onNavigate, className }: { items: NavItem[]; onNavigate?: () => void; className?: string }) {
  const pathname = usePathname();
  return (
    <>
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "whitespace-nowrap rounded-sm px-3 py-2 text-small font-medium transition-colors",
              active ? "text-text-primary" : "text-text-secondary hover:text-text-primary",
              className,
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
