import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { WorkflowDiagram } from "@/components/system/WorkflowDiagram";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { TextLink } from "@/components/ui/TextLink";
import { getCapability } from "@/content/capabilities";
import { getOffer } from "@/content/offers";
import { getSolution, solutions } from "@/content/solutions";
import { breadcrumbJsonLd, buildMetadata, serviceJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  return buildMetadata({ title: `${s.name} — AI solution`, description: s.summary, path: `/solutions/${s.slug}` });
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();
  const caps = s.capabilities.map(getCapability).filter(Boolean);
  const offs = s.offers.map(getOffer).filter(Boolean);
  const jsonLd = [
    serviceJsonLd({ name: s.name, description: s.summary, path: `/solutions/${s.slug}` }),
    breadcrumbJsonLd([
      { name: "Solutions", path: "/solutions" },
      { name: s.name, path: `/solutions/${s.slug}` },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero eyebrow={s.eyebrow} stage={s.stageEmphasis} title={s.headline} lede={s.summary}>
        <nav aria-label="Breadcrumb" className="text-small text-text-tertiary">
          <Link href="/solutions" className="hover:text-text-primary">
            Solutions
          </Link>{" "}
          / {s.name}
        </nav>
      </PageHero>

      <Section labelledBy="problem-h">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="The problem" id="problem-h" title="What this costs today" />
          </div>
          <ul className="flex flex-col gap-4 lg:col-span-8">
            {s.problem.map((p) => (
              <li key={p} className="reveal flex gap-4 border-t border-border-subtle pt-4 text-body text-text-secondary">
                <span aria-hidden className="mt-2.5 inline-block size-1.5 shrink-0 rounded-full bg-border-strong" />
                {p}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section canvas="dark" labelledBy="build-h">
        <Container className="flex flex-col gap-12">
          <SectionHeader eyebrow="The system" id="build-h" title="What Infinity Labs builds" lede="Data → reasoning → action, with typed steps and explicit human control." />
          <div className="reveal rounded-xl border border-border-subtle bg-surface-secondary p-4 sm:p-6">
            <WorkflowDiagram steps={s.diagram} caption="Illustrative workflow. Actual step types are decided with you during design." />
          </div>
          <ul className="grid gap-x-8 gap-y-6 md:grid-cols-2">
            {s.build.map((b, i) => (
              <li key={b} className="reveal flex gap-4 border-t border-border-subtle pt-4 text-body text-text-secondary" style={{ ["--reveal-delay" as string]: `${(i % 2) * 80}ms` }}>
                <span className="label-mono mt-1.5 shrink-0 text-text-tertiary">{String(i + 1).padStart(2, "0")}</span>
                {b}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section labelledBy="outcomes-h">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-8 lg:col-span-5">
            <SectionHeader eyebrow="Outcomes" id="outcomes-h" title="What changes for the business" lede="Quantified results are published only with client approval. Until then, this is what the system is designed to change." />
            <ul className="flex flex-col gap-3">
              {s.outcomes.map((o) => (
                <li key={o} className="reveal flex gap-3 text-body text-text-primary">
                  <span aria-hidden className="mt-2.5 inline-block size-1.5 shrink-0 rounded-full bg-operate" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-10 lg:col-span-6 lg:col-start-7">
            <div className="reveal">
              <h3 className="label-mono mb-4 text-text-tertiary">Typical environments</h3>
              <ul className="flex flex-wrap gap-2">
                {s.environments.map((e) => (
                  <li key={e}>
                    <Tag>{e}</Tag>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal">
              <h3 className="label-mono mb-4 text-text-tertiary">Capabilities involved</h3>
              <ul className="flex flex-col divide-y divide-border-subtle border-y border-border-subtle">
                {caps.map((c) => (
                  <li key={c!.slug}>
                    <Link href={`/capabilities/${c!.slug}`} data-event="capability_view" className="flex items-center justify-between py-3 text-small hover:text-text-primary">
                      <span className="font-medium text-text-primary">{c!.name}</span>
                      <span className="text-text-tertiary">{c!.stage}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal">
              <h3 className="label-mono mb-4 text-text-tertiary">How to buy it</h3>
              <ul className="flex flex-col gap-3">
                {offs.map((o) => (
                  <li key={o!.slug}>
                    <TextLink href={`/offers/${o!.slug}`} event="offer_view">
                      {o!.name}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCta title={`Is ${s.name.toLowerCase()} the process to start with?`} body="A Sprint scores it against the other opportunities in your operation, or we can go straight to a scoped build if the case is clear." />
    </>
  );
}
