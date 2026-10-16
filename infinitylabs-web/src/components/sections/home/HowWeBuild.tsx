import type { CSSProperties } from "react";
import { KindGlyph } from "@/components/system/KindGlyph";
import { KIND_STYLE, WorkflowDiagram } from "@/components/system/WorkflowDiagram";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { getSolution, type StepKind } from "@/content/solutions";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * The demonstration (DEC-026, DEC-027). The system first, built in front of the visitor, unframed;
 * then a key that ties each step type to the condition that earns it and to where it appears in
 * this very flow (Tufte: integrate words and image). The agent is not used here, and the key says
 * so: restraint shown, not claimed.
 */
export function HowWeBuild({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.home.build;
  const example = getSolution(locale, "document-intelligence")!;
  return (
    <SectionFrame id="build" title={t.title} canvas="dark">
      <h2 id="build-title" className="text-display-xl max-w-[18ch]">{t.headline}</h2>

      <div className="mt-12 border-t border-border-strong pt-10 md:mt-16">
        <WorkflowDiagram steps={example.diagram} kinds={d.workflow.kinds} title={d.workflow.title} caption={t.caption} />
      </div>

      <table className="reveal mt-14 w-full border-collapse text-left">
        <thead className="hidden sm:table-header-group">
          <tr className="border-b border-border-strong text-small font-medium text-text-secondary">
            <th scope="col" className="w-[30%] pb-3">{t.key.type}</th>
            <th scope="col" className="w-[32%] pb-3">{t.key.when}</th>
            <th scope="col" className="hidden pb-3 sm:table-cell">{t.key.inFlow}</th>
          </tr>
        </thead>
        <tbody>
          {t.kinds.map((k, i) => {
            const kind = k.kind as StepKind;
            const inFlow = example.diagram.filter((s) => s.kind === kind).map((s) => s.label).join(" · ");
            return (
              <tr key={k.kind} className="build-item grid gap-1 border-b border-border-subtle py-4 sm:table-row sm:py-0" style={{ ["--b" as string]: i } as CSSProperties}>
                <th scope="row" className="font-normal sm:py-4">
                  <span className="inline-flex items-center gap-2.5 text-body font-semibold text-text-primary">
                    <span style={{ color: KIND_STYLE[kind].color }} className="inline-flex">
                      <KindGlyph kind={kind} size={16} className="shrink-0" />
                    </span>
                    {d.workflow.kinds[kind]}
                  </span>
                </th>
                <td className="text-body text-text-secondary sm:py-4 sm:pr-6">{k.where}</td>
                <td className="hidden text-body sm:table-cell sm:py-4">{inFlow ? <span className="text-text-primary">{inFlow}</span> : <span className="text-text-tertiary">{t.notHere}</span>}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </SectionFrame>
  );
}
