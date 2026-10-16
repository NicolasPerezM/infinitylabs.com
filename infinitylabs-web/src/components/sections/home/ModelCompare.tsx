import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * Number → meaning, with its comparison (Rosling, DEC-027). Two rows that are true by definition:
 * a team per stage (3 teams, 2 handoffs between stages) against one team through the loop
 * (1 team, 0 handoffs between stages). The strip draws the same fact: three segments with gaps
 * (the gaps are the handoffs) against one continuous line. The note keeps it honest about the
 * optional handover to the client's own team.
 */
export function ModelCompare({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home.model.compare;
  const num = "text-[clamp(2.75rem,6.5vw,5.5rem)] font-semibold leading-none tracking-[-0.04em] tabular-nums";
  return (
    <figure className="reveal">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-border-strong">
            <th scope="col" className="pb-3"><span className="sr-only">{t.perStage} / {t.us}</span></th>
            <th scope="col" className="w-[22%] pb-3 text-small font-medium text-text-secondary">{t.teams}</th>
            <th scope="col" className="w-[30%] pb-3 text-small font-medium text-text-secondary">{t.handoffs}</th>
          </tr>
        </thead>
        <tbody>
          <tr className="build-item border-b border-border-subtle" style={{ ["--b" as string]: 0 }}>
            <th scope="row" className="py-6 pr-4 align-middle font-normal">
              <span className="block text-body text-text-tertiary">{t.perStage}</span>
              <span aria-hidden className="mt-3 flex max-w-xs gap-1.5">
                <span className="h-1 flex-1 rounded-full bg-discover" />
                <span className="h-1 flex-1 rounded-full bg-build" />
                <span className="h-1 flex-1 rounded-full bg-operate" />
              </span>
            </th>
            <td className={`${num} py-6 text-text-tertiary`}>3</td>
            <td className={`${num} py-6 text-text-tertiary`}>2</td>
          </tr>
          <tr className="build-item border-b border-border-subtle" style={{ ["--b" as string]: 1 }}>
            <th scope="row" className="py-6 pr-4 align-middle font-normal">
              <span className="block text-body font-semibold text-text-primary">{t.us}</span>
              <span aria-hidden className="mt-3 block h-1 max-w-xs rounded-full state-gradient" />
            </th>
            <td className={`${num} py-6 text-text-primary`}>1</td>
            <td className={`${num} py-6 text-text-primary`}>0</td>
          </tr>
        </tbody>
      </table>
      <figcaption className="mt-4 max-w-[60ch] text-small text-text-tertiary">{t.note}</figcaption>
    </figure>
  );
}
