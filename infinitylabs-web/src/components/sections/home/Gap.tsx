import type { CSSProperties } from "react";
import { SectionFrame } from "@/components/ui/SectionFrame";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * The operational gap (DEC-026, DEC-027): one short claim, then a table that names what each row
 * compares (Tufte: row heads), a pilot against a production system, then the answer in one line.
 */
export function Gap({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home.gap;
  return (
    <SectionFrame id="gap" title={t.title} canvas="secondary">
      <h2 id="gap-title" className="text-display-2xl max-w-[14ch]">
        {t.headline}
      </h2>

      <table className="reveal mt-14 w-full border-collapse text-left md:mt-20">
        <thead className="hidden md:table-header-group">
          <tr className="border-b border-border-strong">
            <th scope="col" className="w-[9rem] pb-3"><span className="sr-only">{t.dimensionTitle}</span></th>
            <th scope="col" className="pb-3 text-small font-medium text-text-tertiary">{t.before}</th>
            <th scope="col" className="pb-3 text-small font-medium text-text-primary">{t.after}</th>
          </tr>
        </thead>
        <tbody>
          {t.rows.map((r, i) => (
            <tr key={r.after} className="build-item grid gap-1.5 border-b border-border-subtle py-5 md:table-row md:py-0" style={{ ["--b" as string]: i } as CSSProperties}>
              <th scope="row" className="text-left align-middle text-small font-medium text-text-tertiary md:py-7">{t.dimensions[i]}</th>
              <td className="text-body-lg text-text-tertiary md:py-7 md:pr-8">
                <span className="sr-only md:hidden">{t.before}: </span>
                {r.before}
              </td>
              <td className="text-[clamp(1.35rem,2.4vw,2rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-text-primary md:py-7">
                <span className="sr-only md:hidden">{t.after}: </span>
                {r.after}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-16 text-display-xl max-w-[22ch] md:mt-24">
        <span className="text-text-tertiary">{t.insight[0]}</span> <span className="text-text-primary">{t.insight[1]}</span>
      </p>
    </SectionFrame>
  );
}
