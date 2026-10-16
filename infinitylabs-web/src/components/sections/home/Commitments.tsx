import { SectionFrame } from "@/components/ui/SectionFrame";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/** Commitments that are true today, stated plainly. No certifications claimed (GAP-018). */
export function Commitments({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home.commitments;
  return (
    <SectionFrame id="commitments" title={t.title} canvas="secondary">
      <h2 id="commitments-title" className="text-display-xl max-w-[16ch]">{t.headline}</h2>
      <dl className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 md:mt-14">
        {t.items.map((c) => (
          <div key={c.name} className="border-t border-border-strong pt-5">
            <dt className="text-[clamp(1.4rem,2.4vw,1.9rem)] font-semibold leading-[1.15] tracking-[-0.02em]">{c.name}</dt>
            <dd className="mt-3 max-w-[42ch] text-body-lg text-text-secondary">{c.line}</dd>
          </div>
        ))}
      </dl>
    </SectionFrame>
  );
}
