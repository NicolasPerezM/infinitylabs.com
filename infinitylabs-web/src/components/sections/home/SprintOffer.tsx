import { ArrowIcon, Button } from "@/components/ui/Button";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { primaryOffer } from "@/content/offers";
import { primaryCta } from "@/content/site";

const phaseLines: Record<string, string> = {
  Map: "How work actually flows, where it waits, what it costs.",
  Score: "Value, feasibility, data readiness, risk. Failures documented too.",
  Design: "Target workflow, architecture, approval points, business case.",
};

/** 06 · AI Opportunity Sprint: the commercial entry point, as a three-step rail. */
export function SprintOffer() {
  const o = primaryOffer;
  return (
    <SectionFrame id="sprint" code="06" title="Where engagements start" state="Discover" stateStage="discover">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="reveal lg:col-span-5">
          <h2 id="sprint-title" className="text-display-xl max-w-[14ch]">
            Engagements start with a decision, not a deck.
          </h2>
          <p className="mt-5 max-w-[44ch] text-body-lg text-text-secondary">
            The {o.name} maps your processes, scores every opportunity and designs the ones worth building.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={primaryCta.href} event="opportunity_sprint_cta" size="lg">
              {primaryCta.label}
              <ArrowIcon />
            </Button>
            <Button href="/offers/ai-opportunity-sprint" event="offer_view" size="lg" variant="secondary">
              What is included
            </Button>
          </div>
        </div>
        <ol className="relative grid gap-6 sm:grid-cols-3 lg:col-span-7">
          <span aria-hidden className="absolute inset-x-0 top-[5px] hidden h-px bg-border-strong sm:block" />
          {o.phases.map((phase, i) => (
            <li key={phase.name} className="reveal relative pt-6" style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}>
              <span aria-hidden className="absolute left-0 top-0 size-[11px] rounded-full border border-text-primary bg-surface-primary" />
              <span className="label-mono text-text-tertiary">Phase {i + 1}</span>
              <h3 className="mt-2 text-heading">{phase.name}</h3>
              <p className="mt-2 text-small text-text-secondary">{phaseLines[phase.name] ?? phase.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </SectionFrame>
  );
}
