"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, localeNames, localeShort, locales, swapLocale, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

function remember(l: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; SameSite=Lax`;
}

/** ES EN FR as plain links; the current one is underlined. Remembered in a cookie for the root redirect. */
export function LanguageSwitcher({ current, label, className }: { current: Locale; label: string; className?: string }) {
  const pathname = usePathname() || `/${current}`;
  return (
    <nav aria-label={label} className={cn("inline-flex h-9 items-center gap-1", className)}>
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
            "label-mono inline-flex h-8 min-w-8 items-center justify-center px-1 underline-offset-[6px] transition-colors duration-150",
            l === current ? "text-text-primary underline decoration-2" : "text-text-tertiary hover:text-text-primary",
          )}
        >
          {localeShort[l]}
        </Link>
      ))}
    </nav>
  );
}
