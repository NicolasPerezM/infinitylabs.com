import Link from "next/link";
import { LogoMark } from "@/components/brand/LogoMark";
import { Lockup } from "@/components/brand/Lockup";
import { Container } from "@/components/ui/Container";
import { getNavigation } from "@/content/navigation";
import { siteFacts } from "@/content/site";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function Footer({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const { footerColumns, legalNav } = getNavigation(locale);
  const year = new Date().getFullYear();
  return (
    <footer className="theme-dark relative overflow-hidden bg-surface-primary text-text-primary">
      <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 state-gradient" />
      <div aria-hidden className="pointer-events-none absolute -right-10 -top-6 opacity-[0.07] md:right-8">
        <LogoMark size={260} variant="mono" decorative className="text-text-primary" />
      </div>
      <Container className="relative grid gap-12 py-16 md:grid-cols-12 md:gap-8">
        <div className="flex flex-col gap-5 md:col-span-4">
          <Lockup size={28} href={href(locale, "/")} />
          <p className="max-w-[34ch] text-small text-text-secondary">{d.footer.tagline}</p>
          <address className="not-italic text-small text-text-secondary">
            <a href={`mailto:${siteFacts.email}`} className="text-text-primary hover:underline">
              {siteFacts.email}
            </a>
            <br />
            {siteFacts.address.street}
            <br />
            {siteFacts.address.country}
          </address>
          <ul className="flex gap-4 text-small">
            <li>
              <a href={siteFacts.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary">LinkedIn</a>
            </li>
            <li>
              <a href={siteFacts.social.instagram} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary">Instagram</a>
            </li>
          </ul>
        </div>
        <nav aria-label={d.footer.nav} className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h2 className="label-mono mb-4 text-text-tertiary">{col.heading}</h2>
              <ul className="flex flex-col gap-2.5">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-small text-text-secondary transition-colors hover:text-text-primary">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>
      <div className="relative border-t border-border-subtle">
        <Container className="flex flex-col gap-3 py-6 text-small text-text-tertiary sm:flex-row sm:items-center sm:justify-between">
          <p className="label-mono">© {year} {siteFacts.name} · Bogotá · Colombia</p>
          <ul className="flex gap-5">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-text-primary">{item.label}</Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
