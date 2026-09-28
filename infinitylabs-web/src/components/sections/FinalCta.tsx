import { ArrowIcon, Button } from "@/components/ui/Button";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { siteFacts } from "@/content/site";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type Props = { locale: Locale; title?: string; body?: string; id?: string };

export function FinalCta({ locale, id = "next", title, body }: Props) {
  const d = getDictionary(locale);
  const t = d.home.next;
  return (
    <SectionFrame id={id} title={t.title} state={t.state} canvas="dark">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="reveal lg:col-span-8">
          <h2 id={`${id}-title`} className="text-display-2xl max-w-[18ch]">{title ?? t.headline}</h2>
          <p className="mt-5 max-w-[52ch] text-body-lg text-text-secondary">{body ?? t.body}</p>
        </div>
        <div className="reveal flex flex-col gap-3 lg:col-span-4 lg:items-end" style={{ ["--reveal-delay" as string]: "120ms" }}>
          <Button href={href(locale, "/contact?intent=sprint")} event="opportunity_sprint_cta" size="lg" className="w-full sm:w-auto">
            {d.hero.primary}
            <ArrowIcon />
          </Button>
          <Button href={siteFacts.calendly} external event="calendly_click" size="lg" variant="secondary" className="w-full sm:w-auto">
            {t.calendly}
          </Button>
        </div>
      </div>
    </SectionFrame>
  );
}
