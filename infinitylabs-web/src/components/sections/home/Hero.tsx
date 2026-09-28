import { ArrowIcon, Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SplitWords } from "@/components/ui/SplitWords";
import { primaryCta, secondaryCta, site } from "@/content/site";
import { HeroRibbon } from "./HeroRibbon";

const legend = [
  { code: "01", name: "Discover", note: "where AI pays off", dot: "bg-discover" },
  { code: "02", name: "Build", note: "systems, not prototypes", dot: "bg-build" },
  { code: "03", name: "Operate", note: "evaluated in production", dot: "bg-operate" },
];

/**
 * Hero (DEC-015): the operating loop as a plotter ribbon behind a text-first statement.
 * Paper canvas; the ribbon reacts to the pointer; colour flows Discover → Build → Operate.
 * On small screens the ribbon gets its own block below the statement instead of sitting behind it.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-surface-primary">
      <div aria-hidden className="absolute inset-0 hidden lg:block">
        <HeroRibbon layout="section" />
      </div>

      <Container className="relative z-10 flex flex-1 flex-col">
        <div className="flex items-center justify-between py-3">
          <p className="label-mono text-text-tertiary">
            <span className="text-text-primary">01</span>
            <span aria-hidden className="mx-2">/</span>
            {site.category}
          </p>
          <p className="label-mono hidden text-text-tertiary sm:block">System · operating loop</p>
        </div>

        <div className="grid flex-1 items-center py-8 lg:grid-cols-12 lg:py-4">
          <div className="lg:text-halo relative lg:col-span-7 lg:-mx-6 lg:px-6 lg:py-6">
            <h1 id="hero-title" className="text-hero max-w-[12ch] font-semibold text-text-primary">
              <SplitWords text={site.tagline} />
            </h1>
            <p className="reveal mt-6 max-w-[46ch] text-body-lg text-text-secondary" style={{ ["--reveal-delay" as string]: "500ms" }}>
              {site.heroLede}
            </p>
            <div className="reveal mt-7 flex flex-wrap items-center gap-3" style={{ ["--reveal-delay" as string]: "650ms" }}>
              <Button href={primaryCta.href} event="hero_primary_cta" size="lg">
                {primaryCta.label}
                <ArrowIcon />
              </Button>
              <Button href={secondaryCta.href} event="hero_secondary_cta" size="lg" variant="secondary">
                {secondaryCta.label}
              </Button>
            </div>
          </div>
          <div aria-hidden className="hidden lg:col-span-5 lg:block" />
        </div>

        {/* small screens: the ribbon in its own block */}
        <div aria-hidden className="relative -mx-gutter mb-6 h-[64vw] max-h-[26rem] lg:hidden">
          <HeroRibbon layout="block" />
        </div>

        {/* instrument strip: legend of the ribbon + scroll cue */}
        <div className="relative flex items-end justify-between gap-6 border-t border-border-subtle py-4">
          <dl className="grid grid-cols-3 gap-4 sm:gap-8">
            {legend.map((l) => (
              <div key={l.code} className="flex flex-col gap-1">
                <dt className="label-mono flex items-center gap-2 text-text-primary">
                  <span aria-hidden className={`inline-block size-1.5 rounded-full ${l.dot}`} />
                  {l.code} {l.name}
                </dt>
                <dd className="hidden text-small text-text-tertiary sm:block">{l.note}</dd>
              </div>
            ))}
          </dl>
          <a href="#gap" className="label-mono hidden items-center gap-2 text-text-tertiary hover:text-text-primary md:inline-flex">
            Scroll
            <svg aria-hidden width="10" height="14" viewBox="0 0 10 14" className="animate-[tick_2s_ease-in-out_infinite]">
              <path d="M5 0v12M1 8l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </a>
        </div>
      </Container>
    </section>
  );
}
