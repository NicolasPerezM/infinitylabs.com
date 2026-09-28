import { ArrowIcon, Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { primaryOffer } from "@/content/offers";
import { primaryCta } from "@/content/site";

export function SprintOffer() {
  const o = primaryOffer;
  return (
    <Section labelledBy="sprint-title">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <SectionHeader eyebrow="06 · Where engagements start" id="sprint-title" title={o.name} lede={o.headline}>
            <div className="flex flex-wrap gap-2">
              <Tag stage="discover">Discover</Tag>
              <Tag>Senior team</Tag>
              <Tag>Decision-grade output</Tag>
            </div>
          </SectionHeader>
          <div className="flex flex-wrap gap-3">
            <Button href={primaryCta.href} event="opportunity_sprint_cta" size="lg">
              {primaryCta.label}
              <ArrowIcon />
            </Button>
            <Button href="/offers/ai-opportunity-sprint" event="offer_view" size="lg" variant="secondary">
              What is included
            </Button>
          </div>
        </div>
        <ol className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
          {o.phases.map((phase, i) => (
            <li key={phase.name} className="reveal flex flex-col gap-3 rounded-lg border border-border-subtle bg-surface-elevated p-6 shadow-card" style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
              <span className="label-mono text-discover-text">Phase {i + 1}</span>
              <h3 className="text-heading">{phase.name}</h3>
              <p className="text-small text-text-secondary">{phase.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
