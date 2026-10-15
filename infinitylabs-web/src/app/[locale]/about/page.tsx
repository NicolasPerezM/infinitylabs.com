import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { StageLoop } from "@/components/system/StageLoop";
import { StageStrip } from "@/components/system/StageStrip";
import { Frame } from "@/components/ui/Frame";
import { getPrinciples } from "@/content/principles";
import { siteFacts } from "@/content/site";
import { verifiedTeam } from "@/content/team";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "es";
  const t = getDictionary(locale).pages.about;
  return buildMetadata(locale, { title: t.metaTitle, description: t.metaDescription, path: "/about" });
}

/** About (DEC-027): the why first (Sinek), the story with its turning point, the principles, the people. */
export default async function AboutPage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale).pages.about;
  return (
    <>
      <PageHero title={t.title} lede={t.lede} aside={<StageLoop locale={locale} className="hidden lg:block" />}>
        <StageStrip locale={locale} className="lg:hidden" />
      </PageHero>
      <Frame id="story" title={t.storyTitle}>
        <div className="flex max-w-[62ch] flex-col gap-5 text-body-lg text-text-secondary">
          {t.story.map((p) => <p key={p}>{p}</p>)}
        </div>
      </Frame>
      <Frame id="beliefs" title={t.beliefsTitle} lede={t.beliefsLede} canvas="dark">
        <ol className="grid gap-x-8 sm:grid-cols-2">
          {getPrinciples(locale).map((p) => (
            <li key={p.name} className="flex flex-col gap-2 border-t border-border-subtle py-5">
              <h3 className="text-heading-sm font-semibold">{p.name}</h3>
              <p className="text-body text-text-primary">{p.statement}</p>
              <p className="hidden text-small text-text-secondary md:block">{p.detail}</p>
            </li>
          ))}
        </ol>
      </Frame>
      <Frame id="team" title={t.teamTitle}>
        <div className="flex flex-col gap-6">
          <p className="max-w-[62ch] text-body-lg text-text-secondary">{t.teamBody}</p>
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
            <p className="text-small text-text-tertiary">
              {t.teamPending}{" "}
              <a href={siteFacts.social.linkedin} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">LinkedIn</a>
            </p>
          )}
        </div>
      </Frame>
      <FinalCta locale={locale} />
    </>
  );
}
