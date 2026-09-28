import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Section labelledBy="nf-h" className="min-h-[60vh]">
      <Container size="prose" className="flex flex-col gap-6">
        <span className="label-mono text-text-tertiary">404 · not found</span>
        <h1 id="nf-h" className="text-display-lg">
          This page does not exist or has moved.
        </h1>
        <p className="text-body text-text-secondary">The site was rebuilt around solutions, capabilities and offers. The links below cover most of what people look for.</p>
        <div className="flex flex-wrap gap-3">
          <Button href="/">Home</Button>
          <Button href="/solutions" variant="secondary">
            Solutions
          </Button>
          <Button href="/contact" variant="secondary">
            Contact
          </Button>
        </div>
      </Container>
    </Section>
  );
}
