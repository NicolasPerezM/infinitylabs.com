/** Tiny event bus for the active section (SiteRail → Header readout). */

export type SectionInfo = { id: string; code: string; label: string; index: number; total: number };

const EVENT = "il:section";

export function emitSection(info: SectionInfo | null) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVENT, { detail: info }));
}

export function onSection(cb: (info: SectionInfo | null) => void) {
  const handler = (e: Event) => cb((e as CustomEvent<SectionInfo | null>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
