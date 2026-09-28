import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SplitWords } from "@/components/ui/SplitWords";
import { cn } from "@/lib/utils";

type Props = { eyebrow?: string; stage?: "discover" | "build" | "operate" | "structure"; title: string; lede?: ReactNode; children?: ReactNode; canvas?: "light" | "dark"; aside?: ReactNode; readout?: string };
const dot = { discover: "bg-discover", build: "bg-build", operate: "bg-operate", structure: "bg-structure" } as const;

/** Interior page header in the drafting grammar: frame row, settled headline, one lede. */
export function PageHero({ eyebrow, stage, title, lede, children, canvas = "light", aside, readout }: Props) {
  return (
    <section className={cn("border-b border-border-subtle", canvas === "dark" && "theme-dark bg-surface-primary text-text-primary")}>
      <Container>
        <div className="flex items-center justify-between py-3">
          <p className="label-mono inline-flex items-center gap-2 text-text-primary">
            {stage && <span aria-hidden className={cn("inline-block size-1.5 rounded-full", dot[stage])} />}
            {eyebrow}
          </p>
          {readout && <p className="label-mono hidden text-text-tertiary sm:block">{readout}</p>}
        </div>
        <div className={cn("grid gap-10 pb-section-sm pt-10 lg:pb-section lg:pt-16", aside ? "lg:grid-cols-12" : "")}>
          <div className={cn("flex flex-col gap-6", aside ? "lg:col-span-7" : "")}>
            <h1 className="text-display-xl max-w-[20ch] text-text-primary">
              <SplitWords text={title} />
            </h1>
            {lede && (
              <p className="reveal max-w-[56ch] text-body-lg text-text-secondary" style={{ ["--reveal-delay" as string]: "350ms" }}>{lede}</p>
            )}
            {children}
          </div>
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
      </Container>
    </section>
  );
}
