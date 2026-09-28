import { RibbonScene } from "@/components/system/RibbonScene";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SplitWords } from "@/components/ui/SplitWords";
import { getSite } from "@/content/site";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * Hero (DEC-015): the operating loop as a plotter ribbon behind a text-first statement.
 * On small screens the ribbon gets its own block below the statement.
 */
export function Hero({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const site = getSite(locale);
  const labels = { discover: d.stages.discover, build: d.stages.build, operate: d.stages.operate };
  const legend = (["discover", "build", "operate"] as const).map((s, i) => ({ code: String(i + 1).padStart(2, "0"), name: d.stages[s].name, note: d.stages[s].legend, dot: `bg-${s}` }));
  return (
    <section id="top" aria-labelledby="hero-title" className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-surface-primary">
      <div aria-hidden className="absolute inset-0 hidden lg:block">
        <RibbonScene layout="section" labels={labels} />
      </div>

      <Container className="relative z-10 flex flex-1 flex-col">
        <div className="flex items-center justify-between py-3">
          <p className="label-mono text-text-primary">{site.category}</p>
          <p className="label-mono hidden text-text-tertiary sm:block">{d.hero.system}</p>
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
              <Button href={href(locale, "/contact?intent=sprint")} event="hero_primary_cta" size="lg">
                {d.hero.primary}
                <ArrowIcon />
              </Button>
              <Button href={href(locale, "/solutions")} event="hero_secondary_cta" size="lg" variant="secondary">
                {d.hero.secondary}
              </Button>
            </div>
          </div>
          <div aria-hidden className="hidden lg:col-span-5 lg:block" />
        </div>

        <div aria-hidden className="relative -mx-gutter mb-6 h-[64vw] max-h-[26rem] lg:hidden">
          <RibbonScene layout="block" labels={labels} />
        </div>

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
            {d.hero.scroll}
            <svg aria-hidden width="10" height="14" viewBox="0 0 10 14" className="animate-[tick_2s_ease-in-out_infinite]">
              <path d="M5 0v12M1 8l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </a>
        </div>
      </Container>
    </section>
  );
}
