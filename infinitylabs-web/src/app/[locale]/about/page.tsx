import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { getPrinciples } from "@/content/principles";
import { siteFacts } from "@/content/site";
import { verifiedTeam } from "@/content/team";
import { href, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "es";
  const t = getDictionary(locale).pages.about;
  return buildMetadata(locale, { title: t.metaTitle, description: t.metaDescription, path: "/about" });
}

export default async function AboutPage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale).pages.about;
  return (
    <>
      <PageHero eyebrow={t.eyebrow} stage="structure" title={t.title} lede={t.lede} readout={t.readout} />
      <Frame id="story" eyebrow={t.storyEyebrow} title={t.storyTitle}>
        <div className="flex max-w-[62ch] flex-col gap-5 text-body text-text-secondary">
          {t.story.map((p) => <p key={p} className="reveal">{p}</p>)}
        </div>
      </Frame>
      <Frame id="beliefs" eyebrow={t.beliefsEyebrow} title={t.beliefsTitle} lede={t.beliefsLede} canvas="dark">
        <ol className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {getPrinciples(locale).map((p, i) => (
            <li key={p.name} className="reveal flex flex-col gap-2 border-t border-border-subtle pt-4" style={{ ["--reveal-delay" as string]: `${(i % 2) * 70}ms` }}>
              <h3 className="text-heading-sm font-semibold">{p.name}</h3>
              <p className="text-small text-text-secondary">{p.detail}</p>
            </li>
          ))}
        </ol>
      </Frame>
      <Frame id="team" eyebrow={t.teamEyebrow} title={t.teamTitle}>
        <div className="flex flex-col gap-6">
          <p className="reveal max-w-[62ch] text-body text-text-secondary">{t.teamBody}</p>
          {verifiedTeam.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {verifiedTeam.map((m) => (
                <li key={m.name} className="flex flex-col gap-1 border-t border-border-subtle pt-4">
                  <span className="font-medium text-text-primary">{m.name}</span>
                  <span className="text-small text-text-secondary">{m.title}</span>
                  {m.linkedin && <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="text-small underline underline-offset-4">LinkedIn</a>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="reveal text-small text-text-tertiary">
              {t.teamPending}{" "}
              <a href={siteFacts.social.linkedin} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">LinkedIn</a>
            </p>
          )}
        </div>
      </Frame>
      <section aria-labelledby="contact-h" className="bg-surface-secondary">
        <Container className="grid gap-6 py-section-sm md:grid-cols-12 md:items-center">
          <h2 id="contact-h" className="label-mono text-text-tertiary md:col-span-4">{t.contact}</h2>
          <div className="flex flex-col gap-2 text-body text-text-secondary md:col-span-8">
            <a href={`mailto:${siteFacts.email}`} className="text-text-primary underline underline-offset-4">{siteFacts.email}</a>
            <span>{siteFacts.address.street}, {siteFacts.address.country}</span>
            <Link href={href(locale, "/contact")} className="text-small font-medium text-text-primary underline underline-offset-4">{t.startConversation}</Link>
          </div>
        </Container>
      </section>
      <FinalCta locale={locale} />
    </>
  );
}
