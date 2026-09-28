import Link from "next/link";
import { operatingModel, type Stage } from "@/content/operating-model";
import { cn } from "@/lib/utils";

const dot: Record<Stage, string> = { discover: "bg-discover", build: "bg-build", operate: "bg-operate" };
const text: Record<Stage, string> = { discover: "text-discover-text", build: "text-build-text", operate: "text-operate-text" };

/**
 * Discover → Build → Operate as three connected columns with the state rail on top.
 * `compact` renders names + promises only (used on hubs); full renders descriptions and items.
 */
export function ProcessFlow({ compact = false, linkTo = "capabilities" }: { compact?: boolean; linkTo?: "capabilities" | "none" }) {
  return (
    <div className="relative">
      <div aria-hidden className="absolute inset-x-0 top-[9px] hidden h-0.5 state-gradient md:block" />
      <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
        {operatingModel.map((stage, i) => (
          <li key={stage.id} className="reveal relative flex flex-col gap-4" style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
            <div className="flex items-center gap-3">
              <span aria-hidden className={cn("relative z-10 inline-block size-5 rounded-full ring-4 ring-surface-primary", dot[stage.id])} />
              <span className="label-mono text-text-tertiary">{stage.code}</span>
            </div>
            <h3 className={cn("text-display-lg", compact && "text-heading")}>{stage.name}</h3>
            <p className="text-body-lg text-text-secondary">{stage.promise}</p>
            {!compact && (
              <>
                <p className="text-body text-text-secondary">{stage.description}</p>
                <ul className="mt-2 flex flex-col gap-2 border-l border-border-subtle pl-4 text-small">
                  {stage.items.map((item) => (
                    <li key={item} className="text-text-primary">
                      {item}
                    </li>
                  ))}
                </ul>
                {linkTo === "capabilities" && (
                  <Link href={`/capabilities#${stage.id}`} className={cn("mt-2 text-small font-medium underline underline-offset-4", text[stage.id])}>
                    {stage.name} capabilities
                  </Link>
                )}
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
