import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { ArrowIcon } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { offers } from "@/content/offers";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Offers",
  description: "What you can buy from Infinity Labs: the AI Opportunity Sprint, Agentic Workflow Systems, Enterprise Knowledge + Document AI deployments and Managed AI.",
  path: "/offers",
});

export default function OffersPage() {
  return (
    <>
      <PageHero
        eyebrow="Offers"
        stage="structure"
        title="Four ways to work with Infinity Labs, one per stage of the operating model."
        lede="Capabilities are what we know. Solutions are what we solve. Offers are what you actually buy: scoped engagements with defined phases, deliverables and an accountable team."
      />
      <Section labelledBy="offers-h">
        <Container>
          <h2 id="offers-h" className="sr-only">
            All offers
          </h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {offers.map((o, i) => (
              <li key={o.slug} className="reveal" style={{ ["--reveal-delay" as string]: `${(i % 2) * 90}ms` }}>
                <Link
                  href={`/offers/${o.slug}`}
                  data-event="offer_view"
                  className="group flex h-full flex-col gap-5 rounded-lg border border-border-subtle bg-surface-elevated p-6 shadow-card transition-[border-color,transform] duration-150 ease-out-quart hover:-translate-y-0.5 hover:border-border-strong sm:p-8"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="label-mono text-text-tertiary">{o.eyebrow}</span>
                    {o.primary && <Tag stage="discover">Start here</Tag>}
                  </div>
                  <h3 className="text-display-lg">{o.name}</h3>
                  <p className="text-body text-text-secondary">{o.summary}</p>
                  <ul className="mt-auto flex flex-col gap-1.5 border-t border-border-subtle pt-4 text-small text-text-secondary">
                    {o.phases.map((p) => (
                      <li key={p.name} className="flex gap-3">
                        <span className="font-mono text-text-tertiary">→</span>
                        {p.name}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-1.5 text-small font-medium text-text-primary">
                    Details
                    <ArrowIcon className="transition-transform duration-150 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <FinalCta eyebrow="Next step" />
    </>
  );
}
