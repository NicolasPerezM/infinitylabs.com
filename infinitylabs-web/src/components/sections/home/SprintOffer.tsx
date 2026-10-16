import Link from "next/link";
import { OpportunitySpace } from "@/components/system/OpportunitySpace";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { getPrimaryOffer } from "@/content/offers";
import { href, type Locale } from "@/i18n/config";
import { fill, getDictionary } from "@/i18n/dictionaries";

/**
 * Where engagements start (DEC-027): the claim, the two costly signals (it says what not to build;
 * the plan is yours), the decision drawn as one scene in three states (DEC-029), then one ask and one text link.
 */
export function SprintOffer({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.home.sprint;
  const o = getPrimaryOffer(locale);
  return (
    <SectionFrame id="sprint" title={t.title}>
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
        <h2 id="sprint-title" className="text-display-xl max-w-[16ch] lg:col-span-6">{t.headline}</h2>
        <p className="max-w-[46ch] text-body-lg text-text-secondary lg:col-span-6">{fill(t.lede, { name: o.name })}</p>
      </div>
      <div className="mt-14 md:mt-16">
        <OpportunitySpace phases={o.phases} phaseLabel={t.phase} labels={t.space} kinds={d.workflow.kinds} />
      </div>
      <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Button href={href(locale, "/contact?intent=sprint")} event="opportunity_sprint_cta" size="lg">
          {d.ask.process}
          <ArrowIcon />
        </Button>
        <Link href={href(locale, "/offers/ai-opportunity-sprint")} data-event="offer_view" className="inline-flex min-h-11 items-center text-body font-medium text-text-primary underline decoration-border-strong underline-offset-4 hover:decoration-text-primary">
          {t.included}
        </Link>
      </div>
    </SectionFrame>
  );
}
