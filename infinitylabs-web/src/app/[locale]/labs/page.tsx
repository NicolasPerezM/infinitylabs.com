import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LogoMark } from "@/components/brand/LogoMark";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { Tag } from "@/components/ui/Tag";
import { getLabs } from "@/content/labs";
import { href, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "es";
  const t = getDictionary(locale).pages.labs;
  return buildMetadata(locale, { title: t.metaTitle, description: t.metaDescription, path: "/labs" });
}

/**
 * Labs (DEC-027): the symbol is the image (a continuous ribbon: what repeats returns), unframed.
 * Initiatives as rows with their status in plain words; one invitation, with its own intent.
 */
export default async function LabsPage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const d = getDictionary(locale);
  const t = d.pages.labs;
  const labs = getLabs(locale);
  const ask = { label: d.ask.experiment, href: href(locale, "/contact?intent=labs"), event: "labs_cta" };
  return (
    <>
      <PageHero
        canvas="dark"
        title={labs.intro.headline}
        lede={labs.intro.body}
        aside={
          <div className="hidden justify-center lg:flex">
            <LogoMark size={200} variant="mono" className="text-text-primary" animate decorative />
          </div>
        }
      >
        <div className="lg:hidden">
          <LogoMark size={88} variant="mono" className="text-text-primary" decorative />
        </div>
      </PageHero>
      <section id="initiatives" aria-labelledby="initiatives-title" className="theme-dark bg-surface-primary text-text-primary">
        <Container className="py-section-sm">
          <div className="flex flex-col gap-4">
            <h2 id="initiatives-title" className="text-display-lg max-w-[18ch]">{t.initiativesTitle}</h2>
            <p className="max-w-[60ch] text-body text-text-secondary">{t.initiativesLede}</p>
          </div>
          <ul className="mt-10 border-t border-border-strong">
            {labs.initiatives.map((i) => (
              <li key={i.slug} className="grid gap-3 border-b border-border-subtle py-7 md:grid-cols-12 md:gap-8">
                <div className="flex flex-col gap-1 md:col-span-4">
                  <h3 className="text-heading">{i.name}</h3>
                  <p className="text-small text-text-tertiary">
                    {t.kinds[i.kind]} · <Tag>{i.status}</Tag>
                  </p>
                </div>
                <div className="flex flex-col gap-2 md:col-span-8">
                  <p className="text-body text-text-primary">{i.summary}</p>
                  <p className="hidden text-small text-text-secondary md:block">{i.detail}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-[60ch] text-body text-text-secondary">
            {t.proposeBody}{" "}
            <Link href={ask.href} data-event="labs_view" className="font-medium text-text-primary underline decoration-border-strong underline-offset-4 hover:decoration-text-primary">
              {ask.label}
            </Link>
          </p>
        </Container>
      </section>
      <Frame id="practice" title={t.practiceTitle}>
        <dl className="grid gap-x-8 sm:grid-cols-2">
          {labs.practices.map((p) => (
            <div key={p.name} className="flex flex-col gap-1.5 border-t border-border-subtle py-4">
              <dt className="text-heading-sm font-semibold">{p.name}</dt>
              <dd className="text-small text-text-secondary">{p.description}</dd>
            </div>
          ))}
        </dl>
      </Frame>
      <FinalCta locale={locale} title={t.nextTitle} body={t.nextBody} ask={ask} />
    </>
  );
}
