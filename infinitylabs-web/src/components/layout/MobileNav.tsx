"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { NavItem } from "@/content/navigation";
import { Lockup } from "@/components/brand/Lockup";
import { NavLinks } from "./NavLinks";

type Props = { items: NavItem[]; cta: { label: string; href: string; event: string } };

export function MobileNav({ items, cta }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(true)}
        className="inline-flex size-11 items-center justify-center rounded-md text-text-primary"
      >
        <span className="sr-only">Open menu</span>
        <svg aria-hidden viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      {/* Portaled to <body>: the header's backdrop-filter would otherwise become the containing block for position:fixed. */}
      {open &&
        createPortal(
        <div id={panelId} role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 flex flex-col bg-surface-primary">
          <div className="flex h-16 items-center justify-between border-b border-border-subtle px-gutter">
            <Lockup size={26} href={null} />
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex size-11 items-center justify-center rounded-md text-text-primary"
            >
              <span className="sr-only">Close menu</span>
              <svg aria-hidden viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <nav aria-label="Primary mobile" className="flex flex-1 flex-col gap-1 overflow-y-auto px-gutter py-6">
            <NavLinks items={items} onNavigate={() => setOpen(false)} className="!px-2 !py-3 !text-heading-sm" />
            <Link
              href={cta.href}
              data-event={cta.event}
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex h-12 items-center justify-center rounded-md bg-accent px-5 font-medium text-accent-contrast"
            >
              {cta.label}
            </Link>
          </nav>
        </div>,
        document.body,
      )}
    </div>
  );
}
