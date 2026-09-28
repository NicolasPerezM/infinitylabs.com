import { OperatingLoop } from "@/components/system/OperatingLoop";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { primaryCta, secondaryCta, site } from "@/content/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-surface-primary">
      <Container className="grid items-center gap-12 py-section lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-7 lg:col-span-6">
          <Eyebrow stage="structure">{site.category}</Eyebrow>
          <h1 id="hero-title" className="text-display-2xl max-w-[18ch] text-text-primary">
            {site.tagline}
          </h1>
          <p className="text-body-lg prose-measure text-text-secondary">
            Infinity Labs designs, builds and operates AI-powered business systems for mid-market and enterprise
            companies: knowledge, documents, customer operations and revenue workflows that run in production, with
            evaluation and human control built in.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button href={primaryCta.href} event="hero_primary_cta" size="lg">
              {primaryCta.label}
              <ArrowIcon />
            </Button>
            <Button href={secondaryCta.href} event="hero_secondary_cta" size="lg" variant="secondary">
              {secondaryCta.label}
            </Button>
          </div>
          <dl className="mt-2 grid max-w-xl grid-cols-3 gap-4 border-t border-border-subtle pt-6 text-small">
            {[
              ["Discover", "Where AI creates measurable value"],
              ["Build", "Systems, not prototypes"],
              ["Operate", "Evaluated and improved in production"],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1">
                <dt className="label-mono text-text-tertiary">{k}</dt>
                <dd className="text-text-secondary">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-6">
          <div className="theme-dark relative overflow-hidden rounded-xl border border-border-subtle bg-surface-primary bg-system-grid p-4 text-text-primary sm:p-6">
            <div className="label-mono mb-2 flex items-center justify-between text-text-tertiary">
              <span>Operating model</span>
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden className="size-1.5 animate-[pulse-soft_2.4s_ease-in-out_infinite] rounded-full bg-operate" />
                in production
              </span>
            </div>
            <OperatingLoop />
          </div>
        </div>
      </Container>
    </section>
  );
}
