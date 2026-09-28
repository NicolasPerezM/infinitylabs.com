import { Lockup } from "@/components/brand/Lockup";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getNavigation } from "@/content/navigation";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";
import { SectionReadout } from "./SectionReadout";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const { primaryNav, headerCta } = getNavigation(locale);
  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-surface-primary/85 backdrop-blur supports-[backdrop-filter]:bg-surface-primary/75">
      <Container className="flex h-16 items-center gap-4 xl:gap-6">
        <div className="py-2 pr-2">
          <Lockup size={26} href={href(locale, "/")} />
        </div>
        <nav aria-label={d.nav.primary} className="hidden items-center gap-1 lg:flex">
          <NavLinks items={primaryNav} />
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-3">
          <SectionReadout />
          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitcher current={locale} label={d.nav.language} />
            <ThemeToggle labels={d.nav.theme} />
          </div>
          <div className="hidden lg:block">
            <Button href={headerCta.href} event={headerCta.event} size="md">
              {headerCta.label}
            </Button>
          </div>
          <MobileNav items={primaryNav} cta={headerCta} locale={locale} labels={{ open: d.nav.openMenu, close: d.nav.closeMenu, menu: d.nav.menu, language: d.nav.language, theme: d.nav.theme, home: `${d.nav.menu}` }} />
        </div>
      </Container>
    </header>
  );
}
