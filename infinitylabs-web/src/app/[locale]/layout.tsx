import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Enhancements } from "@/components/layout/Enhancements";
import { THEME_INIT_SCRIPT } from "@/components/layout/ThemeToggle";
import { siteFacts } from "@/content/site";
import { htmlLang, isLocale, locales, ogLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { languageAlternates, organizationJsonLd } from "@/lib/seo";
import "../globals.css";

const sans = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-schibsted", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

type Params = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "es";
  const d = getDictionary(locale);
  const title = `${siteFacts.name} — ${d.meta.category}`;
  return {
    metadataBase: new URL(siteFacts.url),
    title: { default: title, template: `%s · ${siteFacts.name}` },
    description: d.meta.description,
    applicationName: siteFacts.name,
    alternates: { canonical: new URL(`/${locale}`, siteFacts.url).toString(), languages: languageAlternates("/") },
    openGraph: { type: "website", siteName: siteFacts.name, locale: ogLocale[locale], title, description: d.meta.description },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0f17" },
  ],
};

export default async function LocaleLayout({ children, params }: { children: React.ReactNode } & Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const d = getDictionary(locale);
  return (
    <html lang={htmlLang[locale]} className={`${sans.variable} ${mono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Theme before first paint (localStorage or OS preference). Static string; no user input. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {/* Flags JS availability so .reveal can animate without hiding content for no-JS users. */}
        <Script id="js-flag" strategy="beforeInteractive">{`document.documentElement.classList.add('js')`}</Script>
        {/* Organization schema (static, JSON-serialized). */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(locale)) }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a href="#main" className="sr-only z-[60] rounded-md bg-text-primary px-4 py-2 text-surface-primary focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          {d.nav.skip}
        </a>
        <Header locale={locale} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} />
        <Enhancements />
      </body>
    </html>
  );
}
