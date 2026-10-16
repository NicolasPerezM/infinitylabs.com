import Link from "next/link";
import { RibbonScene } from "@/components/system/RibbonScene";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SplitWords } from "@/components/ui/SplitWords";
import { getSite } from "@/content/site";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * Hero (DEC-015, DEC-027): the idea worth spreading, set large; one sentence on what we do; one
 * ask with its reassurance; one text link. The ribbon carries the stages and the buyer's line for
 * each, written on the figure, so there is no legend underneath and no scroll cue.
 */
export function Hero({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const site = getSite(locale);
  return (
    <section id="top" aria-labelledby="hero-title" className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-surface-primary">
      <div aria-hidden className="absolute inset-0 hidden lg:block">
        <RibbonScene layout="section" labels={d.stages} />
      </div>
      <p className="sr-only">{d.hero.loop}</p>

      <Container className="relative z-10 flex flex-1 flex-col">
        <p className="py-3 text-small font-medium text-text-secondary">{site.category}</p>

        <div className="grid flex-1 items-center py-8 lg:grid-cols-12 lg:py-4">
          <div className="relative lg:col-span-6">
            <h1 id="hero-title" className="text-hero max-w-[11ch] font-semibold text-text-primary">
              <SplitWords text={site.tagline} />
            </h1>
            <p className="mt-6 max-w-[44ch] text-body-lg text-text-secondary">{site.heroLede}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href={href(locale, "/contact?intent=sprint")} event="hero_primary_cta" size="lg">
                {d.ask.process}
                <ArrowIcon />
              </Button>
              <Link href="#solutions" data-event="hero_secondary_cta" className="inline-flex min-h-11 items-center text-body font-medium text-text-primary underline decoration-border-strong underline-offset-4 hover:decoration-text-primary">
                {d.hero.secondary}
              </Link>
            </div>
          </div>
          <div aria-hidden className="hidden lg:col-span-6 lg:block" />
        </div>

        <div aria-hidden className="relative -mx-gutter mb-6 h-[64vw] max-h-[26rem] lg:hidden">
          <RibbonScene layout="block" labels={d.stages} />
        </div>
      </Container>
    </section>
  );
}
