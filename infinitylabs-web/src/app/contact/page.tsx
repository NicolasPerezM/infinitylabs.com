import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { getOffer } from "@/content/offers";
import { site } from "@/content/site";
import { INTENTS } from "@/lib/contact";
import { buildMetadata } from "@/lib/seo";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Start an AI Opportunity Sprint or discuss an AI system with Infinity Labs. Tell us about the process, the systems involved and the outcome you need.",
  path: "/contact",
});

type Props = { searchParams: Promise<{ intent?: string }> };

const intentCopy: Record<string, { eyebrow: string; title: string; lede: string }> = {
  sprint: {
    eyebrow: "AI Opportunity Sprint",
    title: "Tell us where the manual work is. We will tell you where an intelligent system pays off.",
    lede: "A few structured questions so the first conversation starts with your processes, not with a pitch.",
  },
  general: {
    eyebrow: "Contact",
    title: "Describe the process you have in mind.",
    lede: "Tell us about the systems involved, the volume and the outcome you need. We reply with next steps, not a sales sequence.",
  },
};

export default async function ContactPage({ searchParams }: Props) {
  const { intent: raw } = await searchParams;
  const intent = raw && (INTENTS as readonly string[]).includes(raw) ? raw : "general";
  const offer = intent !== "sprint" && intent !== "general" ? getOffer(intent) : undefined;
  const copy = intentCopy[intent] ?? {
    eyebrow: offer?.name ?? "Contact",
    title: `Let’s scope ${offer?.name ?? "the system"}.`,
    lede: "Tell us about the process, the systems involved and the outcome you need.",
  };

  return (
    <Section labelledBy="contact-title" className="border-b border-border-subtle">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <Eyebrow stage="discover">{copy.eyebrow}</Eyebrow>
          <h1 id="contact-title" className="text-display-xl max-w-[18ch]">
            {copy.title}
          </h1>
          <p className="text-body-lg text-text-secondary">{copy.lede}</p>
          <dl className="mt-4 flex flex-col gap-5 border-t border-border-subtle pt-6 text-small">
            <div>
              <dt className="label-mono mb-1 text-text-tertiary">Prefer a call</dt>
              <dd>
                <a href={site.calendly} target="_blank" rel="noopener noreferrer" data-event="calendly_click" className="font-medium underline underline-offset-4">
                  Book a 30-minute conversation
                </a>
              </dd>
            </div>
            <div>
              <dt className="label-mono mb-1 text-text-tertiary">Email</dt>
              <dd>
                <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label-mono mb-1 text-text-tertiary">What happens next</dt>
              <dd className="text-text-secondary">A senior engineer reads your request. If there is a fit, we propose a first working session focused on your process. If there is not, we say so.</dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-7">
          <ContactForm intent={intent} email={site.email} />
        </div>
      </Container>
    </Section>
  );
}
