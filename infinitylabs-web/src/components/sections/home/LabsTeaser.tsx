import Link from "next/link";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { Tag } from "@/components/ui/Tag";
import { getLabs } from "@/content/labs";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/** Labs (DEC-027): what the work teaches us. Three initiatives, status in plain words, one link. */
export function LabsTeaser({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home.labs;
  const items = getLabs(locale).initiatives.filter((i) => ["noit", "evaluation-harness", "workflow-orchestration-patterns"].includes(i.slug));
  return (
    <SectionFrame id="labs" title={t.title} canvas="dark">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col lg:col-span-5">
          <h2 id="labs-title" className="text-display-xl max-w-[12ch]">{t.headline}</h2>
          <Link href={href(locale, "/labs")} data-event="labs_view" className="mt-6 inline-flex min-h-11 items-center self-start text-body font-medium underline decoration-border-strong underline-offset-4 hover:decoration-text-primary">{t.inside}</Link>
        </div>
        <ul className="self-end border-t border-border-strong lg:col-span-7">
          {items.map((i) => (
            <li key={i.slug} className="grid gap-2 border-b border-border-subtle py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-heading font-semibold">{i.name}</h3>
                <p className="text-body text-text-secondary">{i.summary}</p>
              </div>
              <Tag>{i.status}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </SectionFrame>
  );
}
