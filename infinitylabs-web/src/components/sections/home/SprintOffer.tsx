import { ArrowIcon, Button } from "@/components/ui/Button";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { getPrimaryOffer } from "@/content/offers";
import { href, type Locale } from "@/i18n/config";
import { fill, getDictionary } from "@/i18n/dictionaries";

/** The commercial entry point as a three-node rail. */
export function SprintOffer({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.home.sprint;
  const o = getPrimaryOffer(locale);
  return (
    <SectionFrame id="sprint" title={t.title} state={t.state} stateStage="discover">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="reveal lg:col-span-5">
          <h2 id="sprint-title" className="text-display-xl max-w-[14ch]">{t.headline}</h2>
          <p className="mt-5 max-w-[44ch] text-body-lg text-text-secondary">{fill(t.lede, { name: o.name })}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={href(locale, "/contact?intent=sprint")} event="opportunity_sprint_cta" size="lg">
              {d.hero.primary}
              <ArrowIcon />
            </Button>
            <Button href={href(locale, "/offers/ai-opportunity-sprint")} event="offer_view" size="lg" variant="secondary">
              {t.included}
            </Button>
          </div>
        </div>
        <ol className="relative grid gap-6 sm:grid-cols-3 lg:col-span-7">
          <span aria-hidden className="absolute inset-x-0 top-[5px] hidden h-px bg-border-strong sm:block" />
          {o.phases.map((phase, i) => (
            <li key={phase.name} className="reveal relative pt-6" style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}>
              <span aria-hidden className="absolute left-0 top-0 size-[11px] rounded-full border border-text-primary bg-surface-primary" />
              <span className="label-mono text-text-tertiary">{fill(t.phase, { n: i + 1 })}</span>
              <h3 className="mt-2 text-heading">{phase.name}</h3>
              <p className="mt-2 text-small text-text-secondary">{phase.short}</p>
            </li>
          ))}
        </ol>
      </div>
    </SectionFrame>
  );
}
