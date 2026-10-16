"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";

/** The header's single ask. Hidden on the contact page, where it would point at the page you are on. */
export function HeaderCta({ label, href, event }: { label: string; href: string; event: string }) {
  const pathname = usePathname() ?? "";
  if (/\/contact\/?$/.test(pathname)) return null;
  return (
    <Button href={href} event={event} size="md" className="whitespace-nowrap">
      {label}
    </Button>
  );
}
