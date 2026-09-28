import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/config";

/**
 * Locale-level 404. The segment param is not available here, so the page is bilingual-safe:
 * Spanish (default) copy with locale-neutral links resolved by the proxy.
 */
export default function NotFound() {
  const t = getDictionary("es").pages.notFound;
  const d = getDictionary("es");
  return (
    <section aria-labelledby="nf-h" className="min-h-[60vh] bg-surface-primary">
      <Container size="prose" className="flex flex-col gap-6 py-section">
        <span className="label-mono text-text-tertiary">{t.eyebrow}</span>
        <h1 id="nf-h" className="text-display-lg">{t.title}</h1>
        <p className="text-body text-text-secondary">{t.body}</p>
        <div className="flex flex-wrap gap-3">
          <Button href={href("es", "/")}>{t.home}</Button>
          <Button href={href("es", "/solutions")} variant="secondary">{d.common.solutions}</Button>
          <Button href={href("es", "/contact")} variant="secondary">{d.common.contact}</Button>
        </div>
      </Container>
    </section>
  );
}
