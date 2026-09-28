"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, localeNames, localeShort, locales, swapLocale, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

function remember(l: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; SameSite=Lax`;
}

/** ES · EN · FR segmented links. Remembers the choice in a cookie so the root redirect follows it. */
export function LanguageSwitcher({ current, label, className }: { current: Locale; label: string; className?: string }) {
  const pathname = usePathname() || `/${current}`;
  return (
    <nav aria-label={label} className={cn("inline-flex h-9 items-center rounded-md border border-border-input p-0.5", className)}>
      {locales.map((l) => (
        <Link
          key={l}
          href={swapLocale(pathname, l)}
          hrefLang={l}
          lang={l}
          aria-current={l === current ? "true" : undefined}
          aria-label={localeNames[l]}
          onClick={() => remember(l)}
          className={cn(
            "label-mono inline-flex h-8 items-center rounded-sm px-2 transition-colors duration-150",
            l === current ? "bg-text-primary text-surface-primary" : "text-text-tertiary hover:text-text-primary",
          )}
        >
          {localeShort[l]}
        </Link>
      ))}
    </nav>
  );
}
