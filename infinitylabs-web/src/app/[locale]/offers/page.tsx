import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { ArrowIcon } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
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

const dot = { discover: "bg-discover", build: "bg-build", operate: "bg-operate" } as const;

/** Engagements as an index (DEC-018, DEC-027): rows in loop order, the Sprint marked as the start. No card grid. */
export default async function OffersPage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const d = getDictionary(locale);
  const t = d.pages.offers;
  return (
    <>
      <PageHero title={t.title} lede={t.lede} />
      <section aria-labelledby="offers-h" className="bg-surface-primary">
        <Container className="py-section-sm">
          <h2 id="offers-h" className="sr-only">{t.listTitle}</h2>
          <ul className="flex flex-col divide-y divide-border-subtle border-y border-border-strong">
            {getOffers(locale).map((o) => (
              <li key={o.slug}>
                <Link href={href(locale, `/offers/${o.slug}`)} data-event="offer_view" className="group grid grid-cols-[1fr_auto] items-center gap-4 py-7 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto] md:gap-6">
                  <span className="col-start-1 row-start-1 flex flex-col gap-1.5">
                    <span className="flex items-center gap-3">
                      <span aria-hidden className={`size-2 shrink-0 rounded-full ${dot[o.stage]}`} />
                      <span className="text-[clamp(1.4rem,2.4vw,1.9rem)] font-semibold leading-[1.1] tracking-[-0.02em]">{o.name}</span>
                    </span>
                    <span className="pl-5 text-small text-text-tertiary">
                      {d.stages[o.stage].name}
                      {o.primary && <span className="font-medium text-discover-text"> · {t.startHere}</span>}
                    </span>
                  </span>
                  <span className="col-span-2 row-start-2 text-body-lg text-text-secondary md:col-span-1 md:col-start-2 md:row-start-1">{o.promise}</span>
                  <ArrowIcon className="col-start-2 row-start-1 transition-transform duration-150 group-hover:translate-x-0.5 md:col-start-3" />
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
