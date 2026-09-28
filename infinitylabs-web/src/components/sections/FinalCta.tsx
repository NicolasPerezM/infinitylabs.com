import { ArrowIcon, Button } from "@/components/ui/Button";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { primaryCta, site } from "@/content/site";

type Props = { title?: string; body?: string; code?: string; id?: string };

export function FinalCta({
  id = "next",
  code = "09",
  title = "Where would an intelligent system change your operation first?",
  body = "Start with an AI Opportunity Sprint, or book a 30-minute conversation about the process you have in mind.",
}: Props) {
  return (
    <SectionFrame id={id} code={code} title="Next step" state="Start" canvas="dark">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="reveal lg:col-span-8">
          <h2 id={`${id}-title`} className="text-display-2xl max-w-[18ch]">
            {title}
          </h2>
          <p className="mt-5 max-w-[52ch] text-body-lg text-text-secondary">{body}</p>
        </div>
        <div className="reveal flex flex-col gap-3 lg:col-span-4 lg:items-end" style={{ ["--reveal-delay" as string]: "120ms" }}>
          <Button href={primaryCta.href} event="opportunity_sprint_cta" size="lg" className="w-full sm:w-auto">
            {primaryCta.label}
            <ArrowIcon />
          </Button>
          <Button href={site.calendly} external event="calendly_click" size="lg" variant="secondary" className="w-full sm:w-auto">
            Book a 30-minute conversation
          </Button>
        </div>
      </div>
    </SectionFrame>
  );
}
