"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

/**
 * Progressive enhancements that need the browser:
 * 1. Scroll reveals for `.reveal` blocks and `.rule` hairlines (content is visible without JS).
 * 2. Pointer position for `.grid-reveal` layers (grid shows where you look).
 * 3. Click tracking for any element with `data-event` (docs/ANALYTICS_PLAN.md).
 */
export function Enhancements() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible), .rule:not(.is-visible)"));
    if (reduced || !("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-grid-reveal]"));
    if (!layers.length) return;
    const handlers = layers.map((layer) => {
      const host = layer.parentElement as HTMLElement;
      const onMove = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        layer.style.setProperty("--mx", `${e.clientX - r.left}px`);
        layer.style.setProperty("--my", `${e.clientY - r.top}px`);
      };
      host.addEventListener("pointermove", onMove);
      return () => host.removeEventListener("pointermove", onMove);
    });
    return () => handlers.forEach((off) => off());
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-event]");
      if (!el?.dataset.event) return;
      track(el.dataset.event, { label: el.textContent?.trim().slice(0, 60) });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
