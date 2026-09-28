import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy",
  description: "How Infinity Labs handles personal data submitted through this website.",
  path: "/privacy",
  noIndex: true,
});

/** Placeholder until legal review (GAP-004). States only what is true today. */
export default function PrivacyPage() {
  return (
    <Section labelledBy="privacy-h">
      <Container size="prose" className="flex flex-col gap-6">
        <span className="label-mono text-text-tertiary">Legal · under review</span>
        <h1 id="privacy-h" className="text-display-lg">
          Privacy notice
        </h1>
        <p className="text-body text-text-secondary">
          The full privacy policy for {site.name}, including the data-protection notice required under Colombian law (Ley 1581 de 2012), is being prepared with legal counsel. Until it is published, the following applies.
        </p>
        <ul className="flex flex-col gap-3 text-body text-text-secondary">
          <li>Data submitted through the contact form is used only to respond to your request.</li>
          <li>This website sets no advertising or third-party tracking cookies.</li>
          <li>Requests to access, correct or delete your data: write to <a href={`mailto:${site.email}`} className="underline underline-offset-4">{site.email}</a>.</li>
        </ul>
      </Container>
    </Section>
  );
}
