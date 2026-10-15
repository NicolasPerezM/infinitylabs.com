import Link from "next/link";
import { Lockup } from "@/components/brand/Lockup";
import { Container } from "@/components/ui/Container";
import { getNavigation } from "@/content/navigation";
import { siteFacts } from "@/content/site";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ThemeToggle } from "./ThemeToggle";

/** Footer: the facts, the index, the legal links and the theme. No watermark, no gradient line (DEC-027). */
export function Footer({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const { footerColumns, legalNav } = getNavigation(locale);
  const year = new Date().getFullYear();
  return (
    <footer className="theme-dark relative border-t border-border-subtle bg-surface-primary text-text-primary">
      <Container className="relative grid gap-12 py-16 md:grid-cols-12 md:gap-8">
        <div className="flex flex-col gap-5 md:col-span-4">
          <Lockup size={28} href={href(locale, "/")} />
          <p className="max-w-[34ch] text-small text-text-secondary">{d.footer.tagline}</p>
          <address className="not-italic text-small text-text-secondary">
            <a href={`mailto:${siteFacts.email}`} className="inline-flex min-h-11 items-center text-text-primary underline decoration-border-strong underline-offset-4 hover:decoration-text-primary">
              {siteFacts.email}
            </a>
            <br />
            {siteFacts.address.street}
            <br />
            {siteFacts.address.country}
          </address>
          <ul className="flex gap-6 text-small">
            <li>
              <a href={siteFacts.social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-text-secondary hover:text-text-primary">LinkedIn</a>
            </li>
            <li>
              <a href={siteFacts.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-text-secondary hover:text-text-primary">Instagram</a>
            </li>
          </ul>
        </div>
        <nav aria-label={d.footer.nav} className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8">
          {/* On phones the solution and capability indexes are one tap away in the menu; the footer keeps the company links. */}
          {footerColumns.map((col, i) => (
            <div key={col.heading} className={i < 2 ? "hidden sm:block" : undefined}>
              <h2 className="mb-4 text-small font-medium text-text-primary">{col.heading}</h2>
              <ul className="flex flex-col">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="inline-flex min-h-10 items-center text-small text-text-secondary transition-colors hover:text-text-primary">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>
      <div className="relative border-t border-border-subtle">
        <Container className="flex flex-col gap-4 py-6 text-small text-text-tertiary md:flex-row md:items-center md:justify-between">
          <p>© {year} {siteFacts.name} · Bogotá, Colombia</p>
          <ThemeToggle labels={d.nav.theme} />
          <ul className="flex gap-5">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center hover:text-text-primary">{item.label}</Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
