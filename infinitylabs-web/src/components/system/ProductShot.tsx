import type { CSSProperties, ReactNode } from "react";
import { KindGlyph } from "@/components/system/KindGlyph";
import { getShots } from "@/content/shots";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

/**
 * Illustrative product screens (DEC-026, revised DEC-027): one per solution, drawn in HTML/SVG on
 * the dark "system" canvas so they read as a screen on the paper page. They show the moment the
 * system does its job (an answer with sources, an invoice with one exception routed to a person).
 * The "illustrative" label sits inside the screen's own title bar, once. Colour follows the step
 * types: mint only where a person decides; no meters or charts without a scale.
 */

export const shotSlugs = ["knowledge-ai", "document-intelligence", "customer-operations", "revenue-systems", "intelligent-operations", "marketing-systems"] as const;
export type ShotSlug = (typeof shotSlugs)[number];
export const hasShot = (slug: string): slug is ShotSlug => (shotSlugs as readonly string[]).includes(slug);

type Props = { slug: ShotSlug; locale: Locale; label: string; className?: string };

export function ProductShot({ slug, locale, label, className }: Props) {
  const s = getShots(locale);
  const body = {
    "knowledge-ai": { app: s.knowledge.app, node: <Knowledge t={s.knowledge} /> },
    "document-intelligence": { app: s.documents.app, node: <Documents t={s.documents} /> },
    "customer-operations": { app: s.customer.app, node: <Customer t={s.customer} /> },
    "revenue-systems": { app: s.revenue.app, node: <Revenue t={s.revenue} /> },
    "intelligent-operations": { app: s.operations.app, node: <Operations t={s.operations} /> },
    "marketing-systems": { app: s.marketing.app, node: <Marketing t={s.marketing} /> },
  }[slug];

  return (
    <div className={cn("reveal", className)}>
      <div role="img" aria-label={`${body.app}. ${label}`} className="theme-dark overflow-hidden rounded-xl border border-border-strong bg-surface-primary text-text-primary">
        <div className="flex items-center justify-between gap-3 border-b border-border-subtle px-4 py-3 sm:px-5">
          <span className="label-mono text-text-secondary">{body.app}</span>
          <span className="label-mono text-text-tertiary">{label}</span>
        </div>
        <div className="p-5 sm:p-6">{body.node}</div>
      </div>
    </div>
  );
}

/* ---------- shared bits ---------- */

const b = (n: number) => ({ ["--b" as string]: n }) as CSSProperties;

function Check({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={cn("shrink-0 text-text-secondary", className)}>
      <path d="m3.5 8.5 3 3 6-7" />
    </svg>
  );
}

function Flag({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className={cn("shrink-0", className)}>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 4.8v3.6M8 10.9v.1" />
    </svg>
  );
}

function Row({ i, tone = "plain", icon, children }: { i: number; tone?: "plain" | "human"; icon: ReactNode; children: ReactNode }) {
  return (
    <li className={cn("build-item flex items-center gap-2.5 rounded-md border px-3 py-2 text-small", tone === "human" ? "border-operate/40 bg-operate-soft text-text-primary" : "border-border-subtle text-text-secondary")} style={b(i)}>
      {icon}
      <span className="min-w-0">{children}</span>
    </li>
  );
}

function Glyph({ kind, className }: { kind: Parameters<typeof KindGlyph>[0]["kind"]; className: string }) {
  return <KindGlyph kind={kind} size={16} className={cn("shrink-0", className)} />;
}

/* ---------- screens ---------- */

function Knowledge({ t }: { t: ReturnType<typeof getShots>["knowledge"] }) {
  return (
    <div className="flex flex-col gap-5">
      <p className="build-item ml-auto max-w-[88%] rounded-lg rounded-br-sm bg-surface-elevated px-3.5 py-2.5 text-small text-text-primary" style={b(0)}>
        {t.question}
      </p>
      <div className="build-item flex gap-3" style={b(1)}>
        <span className="grid size-7 shrink-0 place-items-center rounded-full border border-build-text/60 text-build-text">
          <KindGlyph kind="ai" size={14} />
        </span>
        <div className="flex min-w-0 flex-col gap-3">
          <p className="text-small leading-relaxed text-text-primary">
            {t.answer[0]}
            <sup className="ml-0.5 font-mono text-[10px] text-build-text">1</sup>. {t.answer[1]}
            <sup className="ml-0.5 font-mono text-[10px] text-build-text">2</sup>.
          </p>
          <ul className="flex flex-col gap-1.5 border-t border-border-subtle pt-3">
            {t.sources.map((src, i) => (
              <li key={src} className="flex items-center gap-2 text-small text-text-secondary">
                <span className="font-mono text-[11px] text-build-text">[{i + 1}]</span>
                {src}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="build-item flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-4" style={b(2)}>
        <span className="flex items-center gap-1.5 text-small text-text-secondary">
          <Check />
          {t.permission}
        </span>
        <span className="flex items-center gap-1.5 text-small text-text-secondary">
          <Glyph kind="ai" className="text-build-text" />
          {t.threshold}
        </span>
      </div>
    </div>
  );
}

function Documents({ t }: { t: ReturnType<typeof getShots>["documents"] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-[7rem_1fr]">
      <div className="build-item hidden sm:block" style={b(0)}>
        <svg aria-hidden viewBox="0 0 112 146" className="w-full" fill="none">
          <rect x="0.75" y="0.75" width="110.5" height="144.5" rx="5" fill="var(--surface-elevated)" stroke="var(--border-strong)" strokeWidth="1.5" />
          <text x="10" y="18" fill="var(--text-tertiary)" fontSize="8" letterSpacing="1" style={{ fontFamily: "var(--font-mono)" }}>{t.doc.toUpperCase()}</text>
          {[34, 40].map((y) => <rect key={y} x="10" y={y} width={y === 34 ? 52 : 38} height="3" rx="1.5" fill="var(--border-strong)" />)}
          {[86, 92, 98, 104].map((y) => <rect key={y} x="10" y={y} width="92" height="2" rx="1" fill="var(--border-subtle)" />)}
          {/* extracted fields: three confirmed, one routed to a person */}
          <rect x="7" y="30" width="60" height="16" rx="2" stroke="var(--state-build-text)" strokeWidth="1.2" />
          <rect x="70" y="30" width="34" height="10" rx="2" stroke="var(--state-build-text)" strokeWidth="1.2" />
          <rect x="62" y="116" width="42" height="12" rx="2" stroke="var(--state-build-text)" strokeWidth="1.2" />
          <rect x="7" y="54" width="48" height="12" rx="2" stroke="var(--state-operate-text)" strokeWidth="1.2" strokeDasharray="3 2" />
          <rect x="10" y="58" width="30" height="3" rx="1.5" fill="var(--border-strong)" />
          <rect x="66" y="120" width="26" height="3" rx="1.5" fill="var(--border-strong)" />
          <rect x="73" y="34" width="22" height="2.5" rx="1.25" fill="var(--border-strong)" />
        </svg>
      </div>
      <div className="flex min-w-0 flex-col">
        <ul className="divide-y divide-border-subtle border-y border-border-subtle">
          {t.fields.map((f, i) => (
            <li key={f.name} className="build-item flex items-center justify-between gap-3 py-2.5 text-small" style={b(i + 1)}>
              <span className="text-text-tertiary">{f.name}</span>
              <span className={cn("flex items-center gap-1.5 text-right", f.ok ? "text-text-primary" : "text-operate-text")}>
                {f.value}
                {f.ok ? <Check /> : <Flag className="text-operate-text" />}
              </span>
            </li>
          ))}
        </ul>
        <ul className="mt-4 flex flex-col gap-2">
          <Row i={5} icon={<Glyph kind="deterministic" className="text-text-secondary" />}>{t.validated}</Row>
          <Row i={6} tone="human" icon={<Glyph kind="human" className="text-operate-text" />}>{t.exception}</Row>
        </ul>
      </div>
    </div>
  );
}

function Customer({ t }: { t: ReturnType<typeof getShots>["customer"] }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="build-item max-w-[90%] rounded-lg rounded-tl-sm bg-surface-elevated px-3.5 py-2.5 text-small text-text-primary" style={b(0)}>
        {t.message}
      </p>
      <div className="build-item flex flex-wrap items-center gap-2" style={b(1)}>
        <Glyph kind="ai" className="text-build-text" />
        {t.intents.map((x) => (
          <span key={x} className="rounded-sm border border-build-text/40 bg-build-soft px-2 py-0.5 text-small text-text-primary">{x}</span>
        ))}
        <span className="text-small text-text-tertiary">· {t.context}</span>
      </div>
      <ul className="flex flex-col gap-2">
        <Row i={2} icon={<Check />}>{t.resolved}</Row>
        <Row i={3} tone="human" icon={<Glyph kind="human" className="text-operate-text" />}>{t.escalated}</Row>
      </ul>
      <p className="build-item flex items-center gap-2 border-t border-border-subtle pt-3 text-small text-text-tertiary" style={b(4)}>
        <Glyph kind="deterministic" className="text-text-secondary" />
        {t.quality}
      </p>
    </div>
  );
}

function Revenue({ t }: { t: ReturnType<typeof getShots>["revenue"] }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="build-item flex items-center gap-3" style={b(0)}>
        <div className="min-w-0">
          <p className="text-body font-medium text-text-primary">{t.company}</p>
          <p className="text-small text-text-tertiary">{t.size}</p>
        </div>
      </div>
      <ul className="grid grid-cols-2 gap-2">
        {t.fit.map((f, i) => (
          <li key={f.name} className="build-item flex items-center justify-between gap-2 rounded-md border border-border-subtle px-3 py-2 text-small" style={b(i + 1)}>
            <span className="text-text-secondary">{f.name}</span>
            <span className={f.ok ? "text-operate-text" : "text-text-tertiary"}>{f.state}</span>
          </li>
        ))}
      </ul>
      <ul className="flex flex-col gap-2 border-t border-border-subtle pt-4">
        <Row i={5} icon={<Glyph kind="agent" className="text-discover-text" />}>{t.brief}</Row>
        <Row i={6} tone="human" icon={<Glyph kind="human" className="text-operate-text" />}>{t.proposal}</Row>
        <Row i={7} icon={<Glyph kind="deterministic" className="text-text-secondary" />}>{t.crm}</Row>
      </ul>
    </div>
  );
}

function Operations({ t }: { t: ReturnType<typeof getShots>["operations"] }) {
  const kinds = ["input", "deterministic", "ai", "human", "output"] as const;
  const color = { input: "text-text-tertiary", deterministic: "text-text-secondary", ai: "text-build-text", human: "text-operate-text", output: "text-text-tertiary" } as const;
  return (
    <div>
      <ol className="flex flex-col">
        {t.steps.map((step, i) => {
          const kind = kinds[i] ?? "deterministic";
          return (
            <li key={step.name} className="build-item relative flex items-center gap-3 pb-4 last:pb-0" style={b(i)}>
              {i < t.steps.length - 1 && <span aria-hidden className="absolute bottom-0 left-4 top-8 w-px -translate-x-1/2 bg-border-strong" />}
              <span className={cn("grid size-8 shrink-0 place-items-center rounded-full border-[1.5px] border-current", color[kind], step.state === "next" && "border-dashed opacity-60", step.state === "pending" && "bg-operate-soft")}>
                <KindGlyph kind={kind} size={15} />
              </span>
              <span className={cn("text-small", step.state === "next" ? "text-text-tertiary" : "text-text-primary", step.state === "pending" && "font-medium")}>{step.name}</span>
              {step.state === "done" && <Check className="ml-auto" />}
              {step.state === "pending" && <span className="label-mono ml-auto text-operate-text">{t.pending}</span>}
            </li>
          );
        })}
      </ol>
      <p className="build-item mt-5 border-t border-border-subtle pt-3 text-small text-text-tertiary" style={b(t.steps.length)}>
        {t.log}
      </p>
    </div>
  );
}

function Marketing({ t }: { t: ReturnType<typeof getShots>["marketing"] }) {
  const tiles = [
    { ok: true, art: <><circle cx="30" cy="26" r="13" fill="var(--state-discover)" opacity="0.85" /><rect x="10" y="46" width="40" height="4" rx="2" fill="var(--text-secondary)" /><rect x="10" y="53" width="26" height="3" rx="1.5" fill="var(--border-strong)" /></> },
    { ok: false, art: <><path d="M0 44 60 14v14L0 58Z" fill="var(--state-build)" opacity="0.7" /><rect x="10" y="8" width="30" height="4" rx="2" fill="var(--text-secondary)" /></> },
    { ok: true, art: <><rect x="8" y="8" width="44" height="26" rx="2" fill="var(--state-build)" opacity="0.55" /><rect x="8" y="40" width="34" height="4" rx="2" fill="var(--text-secondary)" /><rect x="8" y="48" width="22" height="3" rx="1.5" fill="var(--border-strong)" /></> },
    { ok: false, art: <><rect x="8" y="12" width="44" height="5" rx="2.5" fill="var(--text-secondary)" /><rect x="8" y="21" width="36" height="5" rx="2.5" fill="var(--text-secondary)" /><rect x="8" y="34" width="26" height="3" rx="1.5" fill="var(--border-strong)" /><rect x="8" y="44" width="20" height="8" rx="2" stroke="var(--border-strong)" /></> },
  ];
  return (
    <div className="flex flex-col gap-5">
      <ol className="build-item flex flex-wrap items-center gap-x-1.5 gap-y-1 text-small" style={b(0)}>
        {t.chain.map((c, i) => (
          <li key={c} className="flex items-center gap-1.5">
            <span className={i === t.chain.length - 1 ? "font-medium text-text-primary" : "text-text-secondary"}>{c}</span>
            {i < t.chain.length - 1 && <span aria-hidden className="text-text-tertiary">→</span>}
          </li>
        ))}
      </ol>
      <div className="build-item" style={b(1)}>
        <p className="label-mono mb-2.5 text-text-tertiary">{t.variants}</p>
        <div className="grid grid-cols-4 gap-2">
          {tiles.map((tile, i) => (
            <div key={i} className={cn("relative aspect-square overflow-hidden rounded-md border bg-surface-elevated", tile.ok ? "border-operate-text/60" : "border-border-subtle opacity-55")}>
              <svg aria-hidden viewBox="0 0 60 60" className="size-full" fill="none">
                {tile.art}
              </svg>
              {tile.ok && (
                <span className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-operate text-ink-950">
                  <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m3.5 8.5 3 3 6-7" /></svg>
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-small text-text-secondary">
          <Check className="text-operate-text" />
          2 {t.approved}
        </p>
      </div>
      <div className="build-item rounded-md border border-operate/40 bg-operate-soft px-3 py-2.5" style={b(2)}>
        <p className="flex items-center gap-2 text-small font-medium text-text-primary">
          <Glyph kind="human" className="text-operate-text" />
          {t.rule}
        </p>
        <p className="mt-1 pl-6 text-small text-text-secondary">{t.ruleNote}</p>
      </div>
      <p className="build-item flex items-center gap-2 text-small text-text-secondary" style={b(3)}>
        <Glyph kind="deterministic" className="text-text-secondary" />
        {t.lead}
      </p>
    </div>
  );
}
