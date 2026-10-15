import type { CSSProperties } from "react";
import Link from "next/link";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * AI × digital marketing (DEC-024, DEC-027). One claim, then a table in which each row is one
 * area of the work: what the team does beside what AI adds (parallel structure means parallel
 * content). The brand-to-lead chain lives on the Marketing Systems page. No results claimed (GAP-021).
 */
export function GrowthMarketing({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home.growth;
  return (
    <SectionFrame id="growth" title={t.title}>
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
        <h2 id="growth-title" className="text-display-xl max-w-[15ch] lg:col-span-7">
          {t.headline}
        </h2>
        <div className="lg:col-span-5">
          <p className="max-w-[44ch] text-body-lg text-text-secondary">{t.lede}</p>
          <Link href={href(locale, "/solutions/marketing-systems")} data-event="solution_view" className="mt-3 inline-flex min-h-11 items-center text-body font-medium text-text-primary underline decoration-border-strong underline-offset-4 hover:decoration-text-primary">
            {t.cta}
          </Link>
        </div>
      </div>

      <table className="reveal mt-14 w-full border-collapse text-left md:mt-16">
        <thead className="hidden md:table-header-group">
          <tr className="border-b border-border-strong text-small font-medium text-text-secondary">
            <th scope="col" className="w-[9rem] pb-3"><span className="sr-only">{t.areaTitle}</span></th>
            <th scope="col" className="pb-3">{t.teamTitle}</th>
            <th scope="col" className="pb-3">{t.aiTitle}</th>
          </tr>
        </thead>
        <tbody>
          {t.rows.map((r, i) => (
            <tr key={r.area} className="build-item grid gap-1 border-b border-border-subtle py-4 md:table-row md:py-0" style={{ ["--b" as string]: i } as CSSProperties}>
              <th scope="row" className="text-left text-small font-medium text-text-tertiary md:py-5">{r.area}</th>
              <td className="text-body-lg text-text-primary md:py-5 md:pr-8">
                <span className="sr-only md:hidden">{t.teamTitle}: </span>
                {r.team}
              </td>
              <td className="text-body-lg text-text-secondary md:py-5">
                <span className="sr-only md:hidden">{t.aiTitle}: </span>
                {r.ai}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionFrame>
  );
}
