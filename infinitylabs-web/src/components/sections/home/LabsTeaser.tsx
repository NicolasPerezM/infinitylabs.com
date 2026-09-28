import Link from "next/link";
import { LogoMark } from "@/components/brand/LogoMark";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { Tag } from "@/components/ui/Tag";
import { getLabs } from "@/content/labs";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/** Labs: three lines, honest status, one link. */
export function LabsTeaser({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home.labs;
  const items = getLabs(locale).initiatives.filter((i) => ["noit", "evaluation-harness", "workflow-orchestration-patterns"].includes(i.slug));
  return (
    <SectionFrame id="labs" title={t.title} state={t.state} stateStage="operate" canvas="dark" grid>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="reveal lg:col-span-5">
          <h2 id="labs-title" className="text-display-xl max-w-[14ch]">{t.headline}</h2>
          <Link href={href(locale, "/labs")} data-event="labs_view" className="mt-6 inline-block text-small font-medium underline underline-offset-4">{t.inside}</Link>
          <div className="mt-10 hidden lg:block">
            <LogoMark size={72} variant="mono" className="text-text-primary opacity-25" decorative />
          </div>
        </div>
        <ul className="border-t border-border-strong lg:col-span-7">
          {items.map((i, idx) => (
            <li key={i.slug} className="reveal grid gap-2 border-b border-border-subtle py-5 sm:grid-cols-[12rem_1fr_auto] sm:items-baseline sm:gap-6" style={{ ["--reveal-delay" as string]: `${idx * 80}ms` }}>
              <h3 className="text-heading-sm font-semibold">{i.name}</h3>
              <p className="text-small text-text-secondary">{i.summary}</p>
              <Tag stage={i.kind === "product" ? "discover" : "operate"}>{i.status}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </SectionFrame>
  );
}
