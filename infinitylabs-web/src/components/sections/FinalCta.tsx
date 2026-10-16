import { ArrowIcon, Button } from "@/components/ui/Button";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { siteFacts } from "@/content/site";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type Ask = { label: string; href: string; event: string };
type Props = {
  locale: Locale;
  id?: string;
  /** A question to the buyer, matching what the page primed. */
  title?: string;
  body?: string;
  /** The page's own ask; defaults to "describe a process" (DEC-027). */
  ask?: Ask;
  /** The line the visitor should leave with (home only): the opening idea, echoed once. */
  kicker?: string;
};

/** The close of every page: one question, one ask, the reassurance that sits beside it, and a call as a text link. */
export function FinalCta({ locale, id = "next", title, body, ask, kicker }: Props) {
  const d = getDictionary(locale);
  const t = d.home.next;
  const primary = ask ?? { label: d.ask.process, href: href(locale, "/contact?intent=sprint"), event: "opportunity_sprint_cta" };
  return (
    <SectionFrame id={id} title={t.title} canvas="secondary">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-7">
          {kicker && <p className="mb-6 text-heading text-text-tertiary">{kicker}</p>}
          <h2 id={`${id}-title`} className="text-display-xl max-w-[20ch]">{title ?? t.headline}</h2>
          <p className="mt-5 max-w-[52ch] text-body-lg text-text-secondary">{body ?? t.body}</p>
        </div>
        <div className="flex flex-col gap-4 lg:col-span-5 lg:items-start">
          <Button href={primary.href} event={primary.event} size="lg" className="w-full sm:w-auto">
            {primary.label}
            <ArrowIcon />
          </Button>
          <p className="max-w-[44ch] text-small text-text-tertiary">{d.ask.reassurance}</p>
          <a href={siteFacts.calendly} target="_blank" rel="noopener noreferrer" data-event="calendly_click" className="inline-flex min-h-11 items-center text-small font-medium text-text-primary underline decoration-border-strong underline-offset-4 hover:decoration-text-primary">
            {d.ask.call}
          </a>
        </div>
      </div>
    </SectionFrame>
  );
}
