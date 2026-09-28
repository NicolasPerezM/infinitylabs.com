import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { verifiedCaseStudies } from "@/content/proof";

/**
 * Selected proof (home §07). Renders nothing until verified, permissioned case studies exist (DEC-013).
 */
export function Proof() {
  if (verifiedCaseStudies.length === 0) return null;
  return (
    <Section canvas="secondary" labelledBy="proof-title">
      <Container className="flex flex-col gap-10">
        <SectionHeader eyebrow="07 · Selected work" id="proof-title" title="Systems in production." />
        <ul className="grid gap-4 md:grid-cols-2">
          {verifiedCaseStudies.map((c) => (
            <li key={c.slug} className="rounded-lg border border-border-subtle bg-surface-elevated p-6 shadow-card">
              <span className="label-mono text-text-tertiary">
                {c.client} · {c.industry}
              </span>
              <h3 className="mt-3 text-heading">{c.headline}</h3>
              <p className="mt-2 text-small text-text-secondary">{c.summary}</p>
              <Link href={`/case-studies/${c.slug}`} data-event="case_study_view" className="mt-4 inline-block text-small font-medium underline underline-offset-4">
                Read the case
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
