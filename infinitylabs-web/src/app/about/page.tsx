import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { principles } from "@/content/principles";
import { site } from "@/content/site";
import { verifiedTeam } from "@/content/team";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: "Infinity Labs is an AI Transformation & Engineering company based in Colombia. We design, build and operate AI-powered business systems.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        stage="structure"
        title="An engineering company for the part of AI that happens after the demo."
        lede="Infinity Labs designs, builds and operates AI-powered business systems. We exist because the hard part of AI in a company is not the model. It is the integration, the evaluation, the control and the operation."
      />
      <Section labelledBy="story-h">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Where we come from" id="story-h" title="From growth work to intelligent systems" />
          </div>
          <div className="flex flex-col gap-5 text-body text-text-secondary lg:col-span-7">
            <p className="reveal">
              Infinity Labs started by helping companies grow through digital operations and automation. That work kept leading to the same conclusion: the value was never in a single tool or campaign. It was in the process underneath, and in whether a system could run it reliably.
            </p>
            <p className="reveal">
              So the company changed shape. Today Infinity Labs is an {site.category} company. We start from business processes, engineer the systems that run them with AI where it belongs, and stay accountable for those systems in production.
            </p>
            <p className="reveal">
              We are based in Colombia and work in Spanish and English, built to serve mid-market and enterprise organizations in Latin America and North America.
            </p>
          </div>
        </Container>
      </Section>

      <Section canvas="dark" labelledBy="beliefs-h">
        <Container className="flex flex-col gap-10">
          <SectionHeader eyebrow="What we believe" id="beliefs-h" title="Eight principles that decide how we build" lede="They are not values on a wall. They are constraints on every architecture we propose." />
          <ol className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <li key={p.code} className="reveal flex flex-col gap-2 border-t border-border-subtle pt-4" style={{ ["--reveal-delay" as string]: `${(i % 4) * 70}ms` }}>
                <span className="label-mono text-text-tertiary">{p.code}</span>
                <h3 className="text-heading-sm font-semibold">{p.name}</h3>
                <p className="text-small text-text-secondary">{p.detail}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section labelledBy="team-h">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Team" id="team-h" title="Senior, cross-functional, accountable" />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-8">
            <p className="reveal text-body text-text-secondary">
              Engagements are staffed by a senior team combining process design, AI engineering, data and operations. The people who run discovery are the people who build and operate the system.
            </p>
            {verifiedTeam.length > 0 ? (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {verifiedTeam.map((m) => (
                  <li key={m.name} className="flex flex-col gap-1 border-t border-border-subtle pt-4">
                    <span className="font-medium text-text-primary">{m.name}</span>
                    <span className="text-small text-text-secondary">{m.title}</span>
                    {m.linkedin && (
                      <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="text-small underline underline-offset-4">
                        LinkedIn
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="reveal text-small text-text-tertiary">
                Team profiles are being updated for the new company. Meet the team on{" "}
                <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                  LinkedIn
                </a>{" "}
                or in a first conversation.
              </p>
            )}
          </div>
        </Container>
      </Section>

      <Section canvas="secondary" padding="sm" labelledBy="contact-h">
        <Container className="grid gap-6 md:grid-cols-12 md:items-center">
          <h2 id="contact-h" className="label-mono text-text-tertiary md:col-span-3">
            Contact
          </h2>
          <div className="flex flex-col gap-2 text-body text-text-secondary md:col-span-9">
            <a href={`mailto:${site.email}`} className="text-text-primary underline underline-offset-4">
              {site.email}
            </a>
            <span>
              {site.address.street}, {site.address.country}
            </span>
            <Link href="/contact" className="text-small font-medium text-text-primary underline underline-offset-4">
              Start a conversation
            </Link>
          </div>
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}
