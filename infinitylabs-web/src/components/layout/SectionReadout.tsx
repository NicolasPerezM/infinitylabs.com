"use client";

import { useEffect, useState } from "react";
import { onSection, type SectionInfo } from "@/lib/section-spy";

/** Header instrument: shows the active section published by SiteRail. Empty on pages without a rail. */
export function SectionReadout() {
  const [info, setInfo] = useState<SectionInfo | null>(null);
  useEffect(() => onSection(setInfo), []);
  if (!info) return <span aria-hidden className="hidden xl:block" />;
  return (
    <span className="label-mono hidden items-center gap-3 text-text-tertiary xl:inline-flex" aria-live="polite">
      <span className="text-text-primary">{info.code}</span>
      <span aria-hidden className="h-px w-6 bg-border-strong" />
      <span>{info.label}</span>
    </span>
  );
}
