"use client";

import { useEffect, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

export type ThemeChoice = "light" | "dark" | "system";
const KEY = "il-theme";

function resolve(choice: ThemeChoice): "light" | "dark" {
  if (choice === "system") return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  return choice;
}

export function applyTheme(choice: ThemeChoice) {
  document.documentElement.dataset.theme = resolve(choice);
  document.documentElement.dataset.themeChoice = choice;
}

/** Inline script run before first paint (see [locale]/layout.tsx). Mirrors applyTheme(). */
export const THEME_INIT_SCRIPT = `(function(){try{var c=localStorage.getItem("${KEY}")||"system";var d=c==="system"?(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):c;document.documentElement.dataset.theme=d;document.documentElement.dataset.themeChoice=c;}catch(e){document.documentElement.dataset.theme="light";}})();`;

type Labels = { label: string; light: string; dark: string; system: string };

// Tiny external store so the saved choice is read without a setState-in-effect (SSR snapshot = "system").
const listeners = new Set<() => void>();
function readChoice(): ThemeChoice {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark" || saved === "system") return saved;
  } catch {}
  return "system";
}
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
function writeChoice(next: ThemeChoice) {
  try {
    localStorage.setItem(KEY, next);
  } catch {}
  listeners.forEach((cb) => cb());
}

/** Three-state theme control: light · system · dark. Persisted in localStorage; follows the OS when "system". */
export function ThemeToggle({ labels, className }: { labels: Labels; className?: string }) {
  const choice = useSyncExternalStore(subscribe, readChoice, () => "system" as ThemeChoice);

  useEffect(() => {
    if (choice !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [choice]);

  const set = (next: ThemeChoice) => {
    writeChoice(next);
    applyTheme(next);
  };

  const options: { id: ThemeChoice; label: string; icon: React.ReactNode }[] = [
    { id: "light", label: labels.light, icon: <SunIcon /> },
    { id: "system", label: labels.system, icon: <AutoIcon /> },
    { id: "dark", label: labels.dark, icon: <MoonIcon /> },
  ];

  return (
    <div role="group" aria-label={labels.label} className={cn("inline-flex h-9 items-center rounded-md border border-border-input p-0.5", className)}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          aria-pressed={choice === o.id}
          aria-label={`${labels.label}: ${o.label}`}
          title={o.label}
          onClick={() => set(o.id)}
          className={cn(
            "inline-flex size-8 items-center justify-center rounded-sm text-text-tertiary transition-colors duration-150",
            choice === o.id ? "bg-text-primary text-surface-primary" : "hover:text-text-primary",
          )}
        >
          {o.icon}
        </button>
      ))}
    </div>
  );
}

function SunIcon() {
  return (
    <svg aria-hidden width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg aria-hidden width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}
function AutoIcon() {
  return (
    <svg aria-hidden width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  );
}
