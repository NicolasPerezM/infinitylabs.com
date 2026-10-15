"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { href, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * Localized 404 (DEC-027). not-found receives no params, so the locale is read from the path.
 * No dead end: the three places almost every visit starts from.
 */
export default function NotFound() {
  const seg = usePathname()?.split("/")[1];
  const locale: Locale = isLocale(seg) ? seg : "es";
  const d = getDictionary(locale);
  const t = d.pages.notFound;
  return (
    <section aria-labelledby="nf-h" className="min-h-[60vh] bg-surface-primary">
      <Container size="prose" className="flex flex-col gap-6 py-section">
        <p className="text-small font-medium text-text-tertiary">404</p>
        <h1 id="nf-h" className="text-display-lg">{t.title}</h1>
        <p className="text-body-lg text-text-secondary">{t.body}</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button href={href(locale, "/contact?intent=sprint")}>{d.ask.process}</Button>
          <Button href={href(locale, "/solutions")} variant="secondary">{d.common.solutions}</Button>
          <Button href={href(locale, "/")} variant="ghost">{t.home}</Button>
        </div>
      </Container>
    </section>
  );
}
