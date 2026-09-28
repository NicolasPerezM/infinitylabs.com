import { SectionFrame } from "@/components/ui/SectionFrame";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/** Commitments that are true today. No certifications claimed (GAP-018). */
export function Commitments({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home.commitments;
  return (
    <SectionFrame id="commitments" title={t.title} state={t.state} stateStage="operate" canvas="secondary" padding="sm">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
        <h2 id="commitments-title" className="reveal text-display-lg max-w-[16ch] lg:col-span-4">{t.headline}</h2>
        <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:col-span-8">
          {t.items.map((c, i) => (
            <div key={c.name} className="reveal border-t border-border-strong pt-3" style={{ ["--reveal-delay" as string]: `${(i % 2) * 80}ms` }}>
              <dt className="text-heading-sm font-semibold">{c.name}</dt>
              <dd className="mt-1 text-small text-text-secondary">{c.line}</dd>
            </div>
          ))}
        </dl>
      </div>
    </SectionFrame>
  );
}
