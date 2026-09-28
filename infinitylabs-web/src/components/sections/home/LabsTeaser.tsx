import { LogoMark } from "@/components/brand/LogoMark";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { TextLink } from "@/components/ui/TextLink";
import { labsInitiatives, labsIntro } from "@/content/labs";

export function LabsTeaser() {
  const items = labsInitiatives.filter((i) => i.slug !== "mobius");
  return (
    <Section canvas="dark" labelledBy="labs-title">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <SectionHeader eyebrow="08 · Labs" id="labs-title" title={labsIntro.headline} lede={labsIntro.body} />
          <TextLink href="/labs" event="labs_view">
            Inside Labs
          </TextLink>
          <div className="mt-auto hidden lg:block">
            <LogoMark size={96} variant="mono" className="text-text-primary opacity-30" decorative />
          </div>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-lg border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:col-span-7">
          {items.map((i) => (
            <li key={i.slug} className="reveal flex flex-col gap-3 bg-surface-primary p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-heading-sm font-semibold">{i.name}</h3>
                <Tag stage={i.kind === "product" ? "discover" : "neutral"}>{i.status}</Tag>
              </div>
              <p className="text-small text-text-secondary">{i.summary}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
