"use client";

import { useEffect, useState } from "react";
import { onSection, type SectionInfo } from "@/lib/section-spy";

/** Header instrument: the active section published by SiteRail (label only, no numerals). */
export function SectionReadout() {
  const [info, setInfo] = useState<SectionInfo | null>(null);
  useEffect(() => onSection(setInfo), []);
  if (!info) return null;
  return (
    <span className="label-mono hidden items-center gap-3 whitespace-nowrap text-text-tertiary 2xl:inline-flex" aria-live="polite">
      <span aria-hidden className="h-px w-6 bg-border-strong" />
      <span className="text-text-primary">{info.label}</span>
    </span>
  );
}
