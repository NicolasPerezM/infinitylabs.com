import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { ArrowIcon } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { Tag } from "@/components/ui/Tag";
import { getIndustries } from "@/content/industries";
import { getSolutions } from "@/content/solutions";
import { href, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "es";
  const t = getDictionary(locale).pages.solutions;
  return buildMetadata(locale, { title: t.metaTitle, description: t.metaDescription, path: "/solutions" });
}

export default async function SolutionsPage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const d = getDictionary(locale);
  const t = d.pages.solutions;
  const solutions = getSolutions(locale);
  const industries = getIndustries(locale);
  return (
    <>
      <PageHero eyebrow={t.eyebrow} stage="build" title={t.title} lede={t.lede} readout={t.readout} />
      <section aria-labelledby="solutions-list" className="bg-surface-primary">
        <Container className="py-section">
          <h2 id="solutions-list" className="sr-only">{t.listTitle}</h2>
          <ul className="flex flex-col divide-y divide-border-subtle border-y border-border-subtle">
            {solutions.map((s) => (
              <li key={s.slug} className="reveal">
                <Link href={href(locale, `/solutions/${s.slug}`)} data-event="solution_view" className="group grid gap-4 py-8 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-3">
                    <span className="label-mono text-text-tertiary">{s.eyebrow}</span>
                    <h3 className="mt-2 text-heading text-text-primary">{s.name}</h3>
                  </div>
                  <div className="flex flex-col gap-3 md:col-span-7">
                    <p className="text-body text-text-primary">{s.headline}</p>
                    <p className="text-small text-text-secondary">{s.summary}</p>
                    <div className="flex flex-wrap gap-2">{s.environments.slice(0, 2).map((e) => <Tag key={e}>{e}</Tag>)}</div>
                  </div>
                  <div className="flex items-start md:col-span-2 md:justify-end">
                    <span className="inline-flex items-center gap-1.5 text-small font-medium text-text-primary">
                      {d.common.howItWorks}
                      <ArrowIcon className="transition-transform duration-150 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <Frame id="industries" eyebrow={t.industriesEyebrow} title={t.industriesTitle} lede={industries.intro} canvas="secondary">
        <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {industries.items.map((i) => (
            <li key={i.name} className="reveal flex flex-col gap-1 border-t border-border-subtle pt-3">
              <span className="text-small font-medium text-text-primary">{i.name}</span>
              <span className="text-small text-text-secondary">{i.where}</span>
            </li>
          ))}
        </ul>
      </Frame>
      <FinalCta locale={locale} />
    </>
  );
}
