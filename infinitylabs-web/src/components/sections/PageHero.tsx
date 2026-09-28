import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  stage?: "discover" | "build" | "operate" | "structure";
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  canvas?: "light" | "dark";
  aside?: ReactNode;
};

/** Interior page header. Keeps the H1 text-first; optional aside for a system graphic or key facts. */
export function PageHero({ eyebrow, stage, title, lede, children, canvas = "light", aside }: Props) {
  return (
    <section className={cn("border-b border-border-subtle", canvas === "dark" && "theme-dark bg-surface-primary text-text-primary")}>
      <Container className={cn("grid gap-10 py-section-sm lg:py-section", aside ? "lg:grid-cols-12" : "")}>
        <div className={cn("flex flex-col gap-5", aside ? "lg:col-span-7" : "")}>
          {eyebrow && <Eyebrow stage={stage}>{eyebrow}</Eyebrow>}
          <h1 className="text-display-xl max-w-[18ch] text-text-primary">{title}</h1>
          {lede && <p className="text-body-lg prose-measure text-text-secondary">{lede}</p>}
          {children}
        </div>
        {aside && <div className="lg:col-span-5">{aside}</div>}
      </Container>
    </section>
  );
}
