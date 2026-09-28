import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getOffer, offers } from "@/content/offers";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return offers.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const o = getOffer(slug);
  if (!o) return {};
  return buildMetadata({ title: o.name, description: o.summary, path: `/offers/${o.slug}` });
}

export default async function OfferPage({ params }: Props) {
  const { slug } = await params;
  const o = getOffer(slug);
  if (!o) notFound();
  const jsonLd: object[] = [
    serviceJsonLd({ name: o.name, description: o.summary, path: `/offers/${o.slug}` }),
    breadcrumbJsonLd([
      { name: "Offers", path: "/offers" },
      { name: o.name, path: `/offers/${o.slug}` },
    ]),
  ];
  if (o.faq) jsonLd.push(faqJsonLd(o.faq));
  const intent = o.slug === "ai-opportunity-sprint" ? "sprint" : o.slug;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero eyebrow={o.eyebrow} stage={o.stage} title={o.headline} lede={o.summary}>
        <nav aria-label="Breadcrumb" className="text-small text-text-tertiary">
          <Link href="/offers" className="hover:text-text-primary">
            Offers
          </Link>{" "}
          / {o.name}
        </nav>
        <div className="mt-2 flex flex-wrap gap-3">
          <Button href={`/contact?intent=${intent}`} event="opportunity_sprint_cta" size="lg">
            Discuss {o.name}
            <ArrowIcon />
          </Button>
        </div>
      </PageHero>

      <Section labelledBy="for-h">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Who it is for" id="for-h" title="The situation this fits" />
          </div>
          <ul className="flex flex-col gap-4 lg:col-span-8">
            {o.forWhom.map((f) => (
              <li key={f} className="reveal flex gap-4 border-t border-border-subtle pt-4 text-body text-text-secondary">
                <span aria-hidden className="mt-2.5 inline-block size-1.5 shrink-0 rounded-full bg-border-strong" />
                {f}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section canvas="dark" labelledBy="phases-h">
        <Container className="flex flex-col gap-12">
          <SectionHeader eyebrow="Structure" id="phases-h" title="How the engagement runs" lede={o.format} />
          <ol className="grid gap-4 md:grid-cols-3">
            {o.phases.map((p, i) => (
              <li key={p.name} className="reveal relative flex flex-col gap-3 rounded-lg border border-border-subtle bg-surface-secondary p-6" style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
                <span aria-hidden className="absolute inset-x-6 top-0 h-0.5 state-gradient" />
                <span className="label-mono text-text-tertiary">Phase {i + 1}</span>
                <h3 className="text-heading">{p.name}</h3>
                <p className="text-small text-text-secondary">{p.description}</p>
              </li>
            ))}
          </ol>
          <div className="grid gap-8 rounded-lg border border-border-subtle p-6 md:grid-cols-12 md:p-8">
            <h3 className="label-mono text-text-tertiary md:col-span-3">Deliverables</h3>
            <ul className="grid gap-3 sm:grid-cols-2 md:col-span-9">
              {o.deliverables.map((d) => (
                <li key={d} className="flex gap-3 text-small text-text-primary">
                  <span aria-hidden className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-operate" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {o.faq && (
        <Section labelledBy="faq-h">
          <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <SectionHeader eyebrow="Questions" id="faq-h" title="What buyers ask before a Sprint" />
            </div>
            <dl className="flex flex-col divide-y divide-border-subtle border-y border-border-subtle lg:col-span-8">
              {o.faq.map((f) => (
                <div key={f.question} className="reveal grid gap-2 py-6 md:grid-cols-12 md:gap-6">
                  <dt className="text-body font-medium text-text-primary md:col-span-5">{f.question}</dt>
                  <dd className="text-small text-text-secondary md:col-span-7">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </Section>
      )}

      <FinalCta title={`Ready to scope ${o.name}?`} body="Tell us about the process, the systems involved and the outcome you need. We reply with next steps, not a sales sequence." />
    </>
  );
}
