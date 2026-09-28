import { WorkflowDiagram } from "@/components/system/WorkflowDiagram";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { getPrinciples } from "@/content/principles";
import { getSolution } from "@/content/solutions";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/** How Infinity Labs builds: typed workflow in motion + principles as a ledger (no codes). */
export function HowWeBuild({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.home.build;
  const example = getSolution(locale, "document-intelligence")!;
  const principles = getPrinciples(locale);
  return (
    <SectionFrame id="build" title={t.title} state={t.state} stateStage="build" canvas="dark" grid>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="reveal lg:col-span-5">
          <h2 id="build-title" className="text-display-xl max-w-[14ch]">{t.headline}</h2>
          <p className="mt-5 max-w-[44ch] text-body-lg text-text-secondary">{t.line}</p>
        </div>
        <div className="reveal lg:col-span-7" style={{ ["--reveal-delay" as string]: "120ms" }}>
          <div className="rounded-xl border border-border-subtle bg-surface-secondary/70 p-4 sm:p-6">
            <div className="label-mono mb-5 flex flex-wrap items-center justify-between gap-2 text-text-tertiary">
              <span>{t.panelLeft}</span>
              <span>{t.panelRight}</span>
            </div>
            <WorkflowDiagram steps={example.diagram} kinds={d.workflow.kinds} title={d.workflow.title} legend caption={t.caption} />
          </div>
        </div>
      </div>
      <ol className="mt-16 border-t border-border-strong">
        {principles.map((p, i) => (
          <li key={p.name} className="reveal grid gap-2 border-b border-border-subtle py-4 md:grid-cols-[17rem_1fr] md:gap-6" style={{ ["--reveal-delay" as string]: `${(i % 4) * 50}ms` }}>
            <h3 className="text-heading-sm font-semibold text-text-primary">{p.name}</h3>
            <p className="text-small text-text-secondary">{p.statement}</p>
          </li>
        ))}
      </ol>
    </SectionFrame>
  );
}
