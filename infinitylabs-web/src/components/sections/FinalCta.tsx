import { ArrowIcon, Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { primaryCta, site } from "@/content/site";

type Props = { title?: string; body?: string; eyebrow?: string };

export function FinalCta({
  eyebrow = "13 · Next step",
  title = "Where would an intelligent system change your operation first?",
  body = "Start with an AI Opportunity Sprint, or book a 30-minute conversation to describe the process you have in mind.",
}: Props) {
  return (
    <Section canvas="dark" labelledBy="final-cta-title" rail>
      <Container className="grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className="reveal flex flex-col gap-4 lg:col-span-8">
          <span className="label-mono text-text-tertiary">{eyebrow}</span>
          <h2 id="final-cta-title" className="text-display-xl max-w-[20ch]">
            {title}
          </h2>
          <p className="text-body-lg prose-measure text-text-secondary">{body}</p>
        </div>
        <div className="reveal flex flex-col gap-3 lg:col-span-4 lg:items-end" style={{ ["--reveal-delay" as string]: "120ms" }}>
          <Button href={primaryCta.href} event="opportunity_sprint_cta" size="lg" variant="inverse" className="w-full sm:w-auto">
            {primaryCta.label}
            <ArrowIcon />
          </Button>
          <Button href={site.calendly} external event="calendly_click" size="lg" variant="secondary" className="w-full sm:w-auto">
            Book a 30-minute conversation
          </Button>
        </div>
      </Container>
    </Section>
  );
}
