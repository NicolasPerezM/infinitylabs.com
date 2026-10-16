import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { getOffer } from "@/content/offers";
import { siteFacts } from "@/content/site";
import { isLocale, type Locale } from "@/i18n/config";
import { fill, getDictionary } from "@/i18n/dictionaries";
import { INTENTS } from "@/lib/contact";
import { buildMetadata } from "@/lib/seo";
import { ContactForm } from "./ContactForm";

type Params = { params: Promise<{ locale: string }>; searchParams: Promise<{ intent?: string }> };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "es";
  const t = getDictionary(locale).pages.contact;
  return buildMetadata(locale, { title: t.metaTitle, description: t.metaDescription, path: "/contact" });
}

/**
 * Contact (DEC-027): the page keeps the context of the link that brought the visitor (Sprint,
 * an engagement, Labs). What happens next is said first, at reading size, before the form.
 */
export default async function ContactPage({ params, searchParams }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const { intent: rawIntent } = await searchParams;
  const intent = rawIntent && (INTENTS as readonly string[]).includes(rawIntent) ? rawIntent : "general";
  const d = getDictionary(locale);
  const t = d.pages.contact;
  const offer = !["sprint", "general", "labs"].includes(intent) ? getOffer(locale, intent) : undefined;
  const copy =
    intent === "sprint" ? t.sprint : intent === "labs" ? t.labs : offer ? { title: fill(t.offer.title, { name: offer.name }), lede: t.offer.lede } : t.general;

  return (
    <section aria-labelledby="contact-title" className="border-b border-border-subtle bg-surface-primary">
      <Container className="grid gap-12 py-section lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <h1 id="contact-title" className="text-display-xl max-w-[16ch]">{copy.title}</h1>
          <p className="text-body-lg text-text-secondary">{copy.lede}</p>
          <div className="border-t border-border-strong pt-5">
            <h2 className="text-small font-medium text-text-primary">{t.whatNext}</h2>
            <p className="mt-2 text-body text-text-secondary">{t.whatNextBody}</p>
          </div>
          <dl className="flex flex-col gap-4 border-t border-border-subtle pt-5 text-small">
            <div>
              <dt className="mb-1 text-text-tertiary">{t.preferCall}</dt>
              <dd><a href={siteFacts.calendly} target="_blank" rel="noopener noreferrer" data-event="calendly_click" className="inline-flex min-h-11 items-center font-medium underline underline-offset-4">{t.calendly}</a></dd>
            </div>
            <div>
              <dt className="mb-1 text-text-tertiary">{t.email}</dt>
              <dd><a href={`mailto:${siteFacts.email}`} className="inline-flex min-h-11 items-center underline underline-offset-4">{siteFacts.email}</a></dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-7">
          <ContactForm locale={locale} intent={intent} email={siteFacts.email} t={d.contact} />
        </div>
      </Container>
    </section>
  );
}
