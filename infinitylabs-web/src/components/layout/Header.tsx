import { Lockup } from "@/components/brand/Lockup";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { headerCta, primaryNav } from "@/content/navigation";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";
import { SectionReadout } from "./SectionReadout";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-surface-primary/85 backdrop-blur supports-[backdrop-filter]:bg-surface-primary/75">
      <Container className="flex h-16 items-center gap-6">
        <div className="py-2 pr-2">
          <Lockup size={26} />
        </div>
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          <NavLinks items={primaryNav} />
        </nav>
        <div className="ml-auto flex items-center gap-6">
          <SectionReadout />
          <div className="hidden md:block">
            <Button href={headerCta.href} event={headerCta.event} size="md">
              {headerCta.label}
            </Button>
          </div>
          <MobileNav items={primaryNav} cta={headerCta} />
        </div>
      </Container>
    </header>
  );
}
