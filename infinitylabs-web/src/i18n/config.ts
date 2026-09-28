export const locales = ["es", "en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const localeNames: Record<Locale, string> = { es: "Español", en: "English", fr: "Français" };
export const localeShort: Record<Locale, string> = { es: "ES", en: "EN", fr: "FR" };
export const ogLocale: Record<Locale, string> = { es: "es_CO", en: "en_US", fr: "fr_FR" };
export const htmlLang: Record<Locale, string> = { es: "es", en: "en", fr: "fr" };

export const LOCALE_COOKIE = "il_locale";

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** Build a locale-prefixed href. External links, mailto/tel and hashes pass through. */
export function href(locale: Locale, path: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  if (path === "/" || path === "") return `/${locale}`;
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Swap the locale prefix of a pathname (language switcher). */
export function swapLocale(pathname: string, next: Locale): string {
  const parts = pathname.split("/");
  if (isLocale(parts[1])) parts[1] = next;
  else parts.splice(1, 0, next);
  return parts.join("/") || `/${next}`;
}
