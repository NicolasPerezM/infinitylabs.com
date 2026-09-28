import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, LOCALE_COOKIE } from "@/i18n/config";

/**
 * Locale routing (DEC-021): every page lives under /es, /en or /fr. Spanish is the default.
 * Unprefixed paths are redirected to the visitor's saved locale (cookie) or to Spanish.
 * Static/metadata files are left alone.
 */
const PASSTHROUGH = /^\/(_next|api|brand|robots\.txt|sitemap\.xml|manifest\.webmanifest|icon\.svg|favicon\.ico|.*\.[a-z0-9]+)(\/|$)/i;

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (PASSTHROUGH.test(pathname)) return NextResponse.next();
  const first = pathname.split("/")[1];
  if (isLocale(first)) return NextResponse.next();
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(saved) ? saved : defaultLocale;
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.redirect(url, 307);
}

export const proxyConfig = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
