import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms",
  description: "Terms of use for the Infinity Labs website.",
  path: "/terms",
  noIndex: true,
});

/** Placeholder until legal review (GAP-004). */
export default function TermsPage() {
  return (
    <Section labelledBy="terms-h">
      <Container size="prose" className="flex flex-col gap-6">
        <span className="label-mono text-text-tertiary">Legal · under review</span>
        <h1 id="terms-h" className="text-display-lg">
          Terms of use
        </h1>
        <p className="text-body text-text-secondary">
          The terms of use for this website are being prepared with legal counsel. The content of this site is informational and does not constitute an offer; engagements are governed by a written agreement. Questions: <a href={`mailto:${site.email}`} className="underline underline-offset-4">{site.email}</a>.
        </p>
      </Container>
    </Section>
  );
}
