import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { ArrowIcon } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { getOffers } from "@/content/offers";
import { href, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "es";
  const t = getDictionary(locale).pages.offers;
  return buildMetadata(locale, { title: t.metaTitle, description: t.metaDescription, path: "/offers" });
}

export default async function OffersPage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale).pages.offers;
  return (
    <>
      <PageHero eyebrow={t.eyebrow} stage="structure" title={t.title} lede={t.lede} readout={t.readout} />
      <section aria-labelledby="offers-h" className="bg-surface-primary">
        <Container className="py-section">
          <h2 id="offers-h" className="sr-only">{t.listTitle}</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {getOffers(locale).map((o, i) => (
              <li key={o.slug} className="reveal" style={{ ["--reveal-delay" as string]: `${(i % 2) * 90}ms` }}>
                <Link href={href(locale, `/offers/${o.slug}`)} data-event="offer_view" className="group flex h-full flex-col gap-5 rounded-lg border border-border-subtle bg-surface-elevated p-6 transition-[border-color,transform] duration-150 ease-expo hover:-translate-y-0.5 hover:border-border-strong sm:p-8">
                  <div className="flex items-center justify-between gap-3">
                    <span className="label-mono text-text-tertiary">{o.eyebrow}</span>
                    {o.primary && <Tag stage="discover">{t.startHere}</Tag>}
                  </div>
                  <h3 className="text-display-lg">{o.name}</h3>
                  <p className="text-body text-text-secondary">{o.summary}</p>
                  <ul className="mt-auto flex flex-col gap-1.5 border-t border-border-subtle pt-4 text-small text-text-secondary">
                    {o.phases.map((p) => (
                      <li key={p.name} className="flex gap-3"><span className="font-mono text-text-tertiary">→</span>{p.name}</li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-1.5 text-small font-medium text-text-primary">
                    {t.details}
                    <ArrowIcon className="transition-transform duration-150 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <FinalCta locale={locale} />
    </>
  );
}
