import Link from "next/link";
import { ProcessFlow } from "@/components/system/ProcessFlow";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { labsIntro } from "@/content/labs";

export function OperatingModel() {
  return (
    <Section id="operating-model" labelledBy="model-title" rail>
      <Container className="flex flex-col gap-14">
        <SectionHeader
          eyebrow="03 · How Infinity Labs works"
          id="model-title"
          title="Discover, build, operate. One continuous system, not three handoffs."
          lede="The same team maps the opportunity, engineers the system and runs it in production. What we learn operating one system shortens the next build."
        />
        <ProcessFlow />
        <div className="reveal grid gap-6 rounded-lg border border-border-subtle bg-surface-secondary p-6 md:grid-cols-12 md:items-center md:p-8">
          <div className="md:col-span-3">
            <span className="label-mono text-text-tertiary">04 · Labs</span>
            <h3 className="mt-2 text-heading">Feeds all three</h3>
          </div>
          <p className="text-body text-text-secondary md:col-span-7">{labsIntro.body}</p>
          <div className="md:col-span-2 md:text-right">
            <Link href="/labs" data-event="labs_view" className="text-small font-medium underline underline-offset-4">
              Inside Labs
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
