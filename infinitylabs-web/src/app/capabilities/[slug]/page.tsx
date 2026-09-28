import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { capabilities, getCapability } from "@/content/capabilities";
import { getSolution } from "@/content/solutions";
import { breadcrumbJsonLd, buildMetadata, serviceJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return capabilities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCapability(slug);
  if (!c) return {};
  return buildMetadata({ title: `${c.name} — capability`, description: c.summary, path: `/capabilities/${c.slug}` });
}

export default async function CapabilityPage({ params }: Props) {
  const { slug } = await params;
  const c = getCapability(slug);
  if (!c) notFound();
  const sols = c.solutions.map(getSolution).filter(Boolean);
  const jsonLd = [
    serviceJsonLd({ name: c.name, description: c.summary, path: `/capabilities/${c.slug}` }),
    breadcrumbJsonLd([
      { name: "Capabilities", path: "/capabilities" },
      { name: c.name, path: `/capabilities/${c.slug}` },
    ]),
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero eyebrow={c.eyebrow} stage={c.stage} title={c.headline} lede={c.summary}>
        <nav aria-label="Breadcrumb" className="text-small text-text-tertiary">
          <Link href="/capabilities" className="hover:text-text-primary">
            Capabilities
          </Link>{" "}
          / {c.name}
        </nav>
      </PageHero>
      <Section labelledBy="includes-h">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="What it includes" id="includes-h" title="Scope of the capability" />
          </div>
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:col-span-8">
            {c.includes.map((item) => (
              <li key={item} className="reveal border-t border-border-subtle pt-3 text-body text-text-primary">
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <Section canvas="dark" labelledBy="approach-h">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="How we work" id="approach-h" title="The engineering stance" />
          </div>
          <div className="flex flex-col gap-10 lg:col-span-8">
            <ul className="flex flex-col gap-5">
              {c.approach.map((a) => (
                <li key={a} className="reveal flex gap-4 text-body-lg text-text-primary">
                  <span aria-hidden className="mt-3 inline-block h-px w-6 shrink-0 state-gradient" />
                  {a}
                </li>
              ))}
            </ul>
            <div className="reveal rounded-lg border border-border-subtle bg-surface-secondary p-6">
              <h3 className="label-mono mb-4 text-text-tertiary">Technical notes</h3>
              <ul className="grid gap-3 sm:grid-cols-3">
                {c.technical.map((t) => (
                  <li key={t} className="font-mono text-small text-text-secondary">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>
      <Section labelledBy="applies-h" padding="sm">
        <Container className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Where it applies" id="applies-h" title="Solutions that rely on it" />
          </div>
          <ul className="flex flex-col gap-3 lg:col-span-8">
            {sols.map((s) => (
              <li key={s!.slug}>
                <TextLink href={`/solutions/${s!.slug}`} event="solution_view">
                  {s!.name}
                </TextLink>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <FinalCta eyebrow="Next step" />
    </>
  );
}
