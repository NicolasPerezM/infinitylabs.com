import Link from "next/link";
import { WorkflowDiagram } from "@/components/system/WorkflowDiagram";
import { ArrowIcon } from "@/components/ui/Button";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { getSolution } from "@/content/solutions";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * AI × digital marketing (DEC-024). The marketing practice is real and staffed, so it is shown
 * in the same grammar as every other system: a full-width typed brand-to-lead chain, plus an
 * explicit split between what the marketing team runs and what the AI layer adds.
 * No results are claimed (GAP-021).
 */
export function GrowthMarketing({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.home.growth;
  const solution = getSolution(locale, "marketing-systems")!;
  return (
    <SectionFrame id="growth" title={t.title} state={t.state} stateStage="operate">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="reveal lg:col-span-5">
          <h2 id="growth-title" className="text-display-xl max-w-[15ch]">
            {t.headline}
          </h2>
          <p className="mt-5 max-w-[46ch] text-body-lg text-text-secondary">{t.lede}</p>
          <Link
            href={href(locale, "/solutions/marketing-systems")}
            data-event="solution_view"
            className="group mt-7 inline-flex items-center gap-1.5 text-small font-medium text-text-primary underline underline-offset-4"
          >
            {t.cta}
            <ArrowIcon />
          </Link>
        </div>

        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-7">
          <div className="reveal">
            <h3 className="label-mono border-b border-text-primary pb-3 text-text-primary">{t.teamTitle}</h3>
            <ul className="divide-y divide-border-subtle">
              {t.team.map((x) => (
                <li key={x} className="py-2.5 text-small text-text-primary">
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal" style={{ ["--reveal-delay" as string]: "80ms" }}>
            <h3 className="label-mono flex items-center gap-2 border-b border-border-strong pb-3 text-text-primary">
              <span aria-hidden className="inline-block h-3 w-0.5 state-gradient-vertical" />
              {t.aiTitle}
            </h3>
            <ul className="divide-y divide-border-subtle">
              {t.ai.map((x) => (
                <li key={x} className="flex gap-3 py-2.5 text-small text-text-secondary">
                  <span aria-hidden className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-build" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* The chain is the anchor of the section: full width so six typed steps stay readable in every language. */}
      <div className="reveal mt-12 rounded-xl border border-border-subtle bg-surface-elevated p-4 sm:p-6" style={{ ["--reveal-delay" as string]: "120ms" }}>
        <p className="label-mono mb-5 text-text-tertiary">{t.chain}</p>
        <WorkflowDiagram steps={solution.diagram} kinds={d.workflow.kinds} title={d.workflow.title} legend />
      </div>
    </SectionFrame>
  );
}
