import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { SolutionsIndex } from "@/components/sections/home/SolutionsIndex";
import { ProductShot, hasShot } from "@/components/system/ProductShot";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { getIndustries } from "@/content/industries";
import { getSolutions } from "@/content/solutions";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "es";
  const t = getDictionary(locale).pages.solutions;
  return buildMetadata(locale, { title: t.metaTitle, description: t.metaDescription, path: "/solutions" });
}

/** Solutions index (DEC-027): the six processes as rows, each with its screen; then where they fit. */
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
      <PageHero title={t.title} lede={t.lede} />
      <section aria-labelledby="solutions-list" className="bg-surface-primary">
        <Container className="py-section-sm">
          <h2 id="solutions-list" className="sr-only">{t.listTitle}</h2>
          <SolutionsIndex
            locale={locale}
            solutions={solutions}
            previews={Object.fromEntries(solutions.filter((s) => hasShot(s.slug)).map((s) => [s.slug, <ProductShot key={s.slug} slug={s.slug as Parameters<typeof ProductShot>[0]["slug"]} locale={locale} label={d.home.solutions.illustrative} />]))}
          />
        </Container>
      </section>
      <Frame id="industries" title={t.industriesTitle} lede={industries.intro} canvas="secondary">
        <ul className="grid gap-x-8 sm:grid-cols-2">
          {industries.items.map((i) => (
            <li key={i.name} className="flex flex-col gap-1 border-t border-border-subtle py-3">
              <span className="text-small font-medium text-text-primary">{i.name}</span>
              <span className="hidden text-small text-text-secondary sm:block">{i.where}</span>
            </li>
          ))}
        </ul>
      </Frame>
      <FinalCta locale={locale} />
    </>
  );
}
