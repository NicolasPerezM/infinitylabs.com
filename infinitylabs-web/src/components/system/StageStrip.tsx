import Link from "next/link";
import type { Stage } from "@/content/operating-model";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

const ORDER: Stage[] = ["discover", "build", "operate"];
const bar: Record<Stage, string> = { discover: "bg-discover", build: "bg-build", operate: "bg-operate" };

/**
 * The operating loop as one line, for phones (DEC-028): three segments in order, the page's stage
 * lit (all three when no stage is given). It is the mobile image of pages whose loop figure is
 * desktop-only, and with `links` it doubles as the in-page index of the capabilities hub.
 */
export function StageStrip({ locale, stage = null, links = false, className }: { locale: Locale; stage?: Stage | null; links?: boolean; className?: string }) {
  const d = getDictionary(locale);
  const Wrapper = links ? "nav" : "div";
  return (
    <Wrapper aria-label={d.home.model.panel} role={links ? undefined : "group"} className={cn("w-full", className)}>
      <ol className="grid grid-cols-3 gap-1.5">
        {ORDER.map((s) => {
          const lit = stage === null || stage === s;
          const body = (
            <>
              <span aria-hidden className={cn("block h-1.5 rounded-full", lit ? bar[s] : "bg-border-strong")} />
              <span className={cn("mt-2 block text-small", lit ? "font-medium text-text-primary" : "text-text-tertiary")}>{d.stages[s].name}</span>
            </>
          );
          return (
            <li key={s} aria-current={stage === s ? "step" : undefined}>
              {links ? (
                <Link href={`#${s}`} className="block min-h-11 py-1">
                  {body}
                </Link>
              ) : (
                <div className="py-1">{body}</div>
              )}
            </li>
          );
        })}
      </ol>
    </Wrapper>
  );
}
