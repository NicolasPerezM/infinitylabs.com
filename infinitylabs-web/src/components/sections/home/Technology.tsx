import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { method, technologyPosture, trustSignals } from "@/content/principles";
import { cn } from "@/lib/utils";

const stageDot = { discover: "bg-discover", build: "bg-build", operate: "bg-operate" } as const;

export function TechnologyAndMethod() {
  return (
    <Section labelledBy="tech-title">
      <Container className="flex flex-col gap-20">
        {/* 09 technology */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="09 · Technology posture"
              id="tech-title"
              title="Model-agnostic, integration-first, evaluated end to end."
              lede="Technical primitives are capabilities, not products. What matters is how they are assembled around your systems."
            />
          </div>
          <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-8">
            {technologyPosture.map((t, i) => (
              <div key={t.area} className="reveal flex flex-col gap-1.5 border-t border-border-subtle pt-4" style={{ ["--reveal-delay" as string]: `${(i % 2) * 80}ms` }}>
                <dt className="label-mono text-text-tertiary">{t.area}</dt>
                <dd className="text-small text-text-secondary">{t.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 10 method */}
        <div className="flex flex-col gap-10">
          <SectionHeader eyebrow="10 · Method" title="From discovery to operation in six steps." as="h3" />
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {method.map((m, i) => (
              <li key={m.code} className="reveal relative flex flex-col gap-2 pt-5" style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}>
                <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-border-subtle" />
                <span aria-hidden className={cn("absolute left-0 top-0 h-px w-10", stageDot[m.stage])} />
                <span className="label-mono text-text-tertiary">{m.code}</span>
                <h4 className="text-heading-sm font-semibold">{m.name}</h4>
                <p className="text-small text-text-secondary">{m.description}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* 11 trust */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="11 · What you can hold us to"
              title="Trust is built into the system, not claimed on a badge."
              as="h3"
              lede="No certifications are listed here until they exist. These are the commitments that apply to every engagement."
            />
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {trustSignals.map((t, i) => (
              <li key={t.name} className="reveal rounded-lg border border-border-subtle bg-surface-elevated p-5 shadow-card" style={{ ["--reveal-delay" as string]: `${(i % 2) * 80}ms` }}>
                <h4 className="text-heading-sm font-semibold">{t.name}</h4>
                <p className="mt-1.5 text-small text-text-secondary">{t.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
