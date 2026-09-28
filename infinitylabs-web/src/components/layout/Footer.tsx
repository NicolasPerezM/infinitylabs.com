import Link from "next/link";
import { Lockup } from "@/components/brand/Lockup";
import { Container } from "@/components/ui/Container";
import { footerColumns, legalNav } from "@/content/navigation";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="theme-dark relative bg-surface-primary text-text-primary">
      <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 state-gradient" />
      <Container className="grid gap-12 py-16 md:grid-cols-12 md:gap-8">
        <div className="flex flex-col gap-5 md:col-span-4">
          <Lockup size={28} />
          <p className="max-w-[36ch] text-small text-text-secondary">{site.category}. We design, build and operate AI-powered business systems.</p>
          <address className="not-italic text-small text-text-secondary">
            <a href={`mailto:${site.email}`} className="text-text-primary hover:underline">
              {site.email}
            </a>
            <br />
            {site.address.street}
            <br />
            {site.address.country}
          </address>
          <ul className="flex gap-4 text-small">
            <li>
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary">
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h2 className="label-mono mb-4 text-text-tertiary">{col.heading}</h2>
              <ul className="flex flex-col gap-2.5">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-small text-text-secondary transition-colors hover:text-text-primary">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>
      <div className="border-t border-border-subtle">
        <Container className="flex flex-col gap-3 py-6 text-small text-text-tertiary sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex gap-5">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
