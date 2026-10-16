import { RibbonScene } from "@/components/system/RibbonScene";
import type { Stage } from "@/content/operating-model";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

/**
 * The one image of an interior page that has no product screen (capabilities, offers, about): the
 * operating loop with the page's stage lit, or the whole loop when no stage is given. Unframed;
 * the stage is named once, on the figure (DEC-027). Decorative for assistive tech: the page text
 * already names the stage.
 */
export function StageLoop({ locale, stage = null, className }: { locale: Locale; stage?: Stage | null; className?: string }) {
  const d = getDictionary(locale);
  const labels = { discover: d.stages.discover, build: d.stages.build, operate: d.stages.operate };
  return (
    <div aria-hidden className={cn("reveal relative aspect-[690/440] w-full", className)}>
      <RibbonScene layout="panel" labels={labels} active={stage} />
    </div>
  );
}
