"use client";

import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { submitContact, type ContactState } from "./actions";
import type { Dictionary } from "@/i18n/dictionaries";
import { href, type Locale } from "@/i18n/config";
import { COMPANY_SIZES, PROJECT_STAGES, TIMELINES } from "@/lib/contact";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const initial: ContactState = { status: "idle" };
const field = "h-11 w-full rounded-md border border-border-input bg-surface-elevated px-3 text-body text-text-primary placeholder:text-text-tertiary focus-visible:border-accent";
const invalid = "border-error";
const help = "text-small text-text-tertiary";

type Props = { locale: Locale; intent: string; email: string; t: Dictionary["contact"] };

/**
 * Contact form (DEC-010, DEC-027 after Norman). Feedback lands where the eyes are: focus moves to
 * the first invalid field (or the message) after an error, and to the confirmation panel after a
 * send. Nothing the visitor typed or selected is discarded: the action is called from onSubmit, so
 * React does not reset the form. Four fields are required; the rest say "optional" in the label.
 */
export function ContactForm({ locale, intent, email, t }: Props) {
  const [state, action, pending] = useActionState(submitContact, initial);
  const [startedAt] = useState(() => Date.now());
  const started = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const v = state.values ?? {};
  const err = state.errors ?? {};

  useEffect(() => {
    if (state.status === "success") track("contact_submit", { intent });
    if (state.status === "error") track("contact_error", { intent });
    if (state.status === "error") {
      const target = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]') ?? document.getElementById("form-message");
      target?.focus();
    }
    if (state.status === "success" || state.status === "unconfigured") {
      panelRef.current?.scrollIntoView({ block: "start" });
      panelRef.current?.focus({ preventScroll: true });
    }
  }, [state, intent]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => action(fd));
  };

  if (state.status === "success") {
    return (
      <div ref={panelRef} tabIndex={-1} role="status" className="scroll-mt-24 rounded-lg border border-border-subtle bg-surface-elevated p-8 outline-none">
        <p className="text-small font-medium text-operate-text">{t.success.label}</p>
        <h2 className="mt-3 text-heading">{t.success.title}</h2>
        <p className="mt-2 text-small text-text-secondary">
          {t.success.urgent} <a href={`mailto:${email}`} className="underline underline-offset-4">{email}</a>.
        </p>
      </div>
    );
  }

  if (state.status === "unconfigured") {
    const subject = encodeURIComponent(`[Website] ${v.intent ?? intent} · ${v.company ?? ""}`);
    const body = encodeURIComponent(
      `${t.form.name}: ${v.name ?? ""}\n${t.form.company}: ${v.company ?? ""}\n${t.form.role}: ${v.role ?? ""}\n${t.form.companySize}: ${v.companySize ?? ""}\n${t.form.stage}: ${v.stage ?? ""}\n${t.form.timeline}: ${v.timeline ?? ""}\n${t.form.systems}: ${v.systems ?? ""}\n\n${t.form.improve}\n${v.improve ?? ""}`,
    );
    return (
      <div ref={panelRef} tabIndex={-1} role="status" className="scroll-mt-24 rounded-lg border border-border-subtle bg-surface-elevated p-8 outline-none">
        <p className="text-small font-medium text-text-tertiary">{t.unconfigured.label}</p>
        <h2 className="mt-3 text-heading">{t.unconfigured.title}</h2>
        <p className="mt-2 text-small text-text-secondary">
          {t.unconfigured.body} <a href={`mailto:${email}`} className="underline underline-offset-4">{email}</a>.
        </p>
        <a href={`mailto:${email}?subject=${subject}&body=${body}`} className="mt-5 inline-flex h-11 items-center rounded-md bg-text-primary px-4 text-small font-medium text-surface-primary">{t.unconfigured.cta}</a>
      </div>
    );
  }

  // option values are canonical English; labels come from the locale's dictionary (same order)
  const opt = (values: readonly string[], labels: readonly string[]) => values.map((value, i) => ({ value, label: labels[i] ?? value }));
  const describe = (id: string, hint?: boolean) => (err[id as keyof typeof err] ? `${id}-error` : hint ? `${id}-hint` : undefined);

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      onFocusCapture={() => {
        if (!started.current) { started.current = true; track("contact_start", { intent }); }
      }}
      className="flex flex-col gap-6"
      aria-describedby={state.message ? "form-message" : undefined}
    >
      <input type="hidden" name="intent" value={intent} />
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="startedAt" value={startedAt} />
      <div className="hidden" aria-hidden>
        <label>Website <input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {state.message && (
        <p id="form-message" tabIndex={-1} role="alert" className="rounded-md border border-error bg-surface-secondary px-4 py-3 text-small text-text-primary outline-none">{state.message}</p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={t.form.name} error={err.name}>
          <input id="name" name="name" autoComplete="name" required defaultValue={v.name} className={cn(field, err.name && invalid)} aria-invalid={!!err.name} aria-describedby={describe("name")} />
        </Field>
        <Field id="email" label={t.form.email} error={err.email}>
          <input id="email" name="email" type="email" autoComplete="email" required defaultValue={v.email} className={cn(field, err.email && invalid)} aria-invalid={!!err.email} aria-describedby={describe("email")} />
        </Field>
        <Field id="company" label={t.form.company} error={err.company}>
          <input id="company" name="company" autoComplete="organization" required defaultValue={v.company} className={cn(field, err.company && invalid)} aria-invalid={!!err.company} aria-describedby={describe("company")} />
        </Field>
        <Field id="role" label={t.form.role} optional={t.form.optional}>
          <input id="role" name="role" autoComplete="organization-title" defaultValue={v.role} className={field} />
        </Field>
      </div>

      <Field id="improve" label={t.form.improve} hint={t.form.improveHint} error={err.improve}>
        <textarea id="improve" name="improve" rows={5} required defaultValue={v.improve} className={cn(field, "h-auto py-3", err.improve && invalid)} aria-invalid={!!err.improve} aria-describedby={describe("improve", true)} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="companySize" label={t.form.companySize} optional={t.form.optional}>
          <select id="companySize" name="companySize" defaultValue={v.companySize ?? ""} className={field}>
            <option value="">{t.form.select}</option>
            {opt(COMPANY_SIZES, t.options.sizes).map((o) => <option key={o.value} value={o.value}>{o.label} {t.form.people}</option>)}
          </select>
        </Field>
        <Field id="stage" label={t.form.stage} optional={t.form.optional}>
          <select id="stage" name="stage" defaultValue={v.stage ?? ""} className={field}>
            <option value="">{t.form.select}</option>
            {opt(PROJECT_STAGES, t.options.stages).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </Field>
        <Field id="systems" label={t.form.systems} hint={t.form.systemsHint} optional={t.form.optional}>
          <input id="systems" name="systems" defaultValue={v.systems} className={field} aria-describedby="systems-hint" />
        </Field>
        <Field id="timeline" label={t.form.timeline} optional={t.form.optional}>
          <select id="timeline" name="timeline" defaultValue={v.timeline ?? ""} className={field}>
            <option value="">{t.form.select}</option>
            {opt(TIMELINES, t.options.timelines).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </Field>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-3 text-small text-text-secondary">
          <input type="checkbox" name="consent" defaultChecked={v.consent} className="mt-1 size-4 accent-[var(--brand-accent)]" aria-invalid={!!err.consent} aria-describedby={err.consent ? "consent-error" : undefined} />
          <span>
            {t.form.consent}{" "}
            <Link href={href(locale, "/privacy")} className="underline underline-offset-4">{t.form.privacy}</Link>
          </span>
        </label>
        {err.consent && <p id="consent-error" className="text-small text-error">{err.consent}</p>}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className="inline-flex h-12 items-center justify-center rounded-md bg-text-primary px-5 font-medium text-surface-primary transition-opacity hover:opacity-90 disabled:opacity-60">
          {pending ? t.form.sending : t.form.submit}
        </button>
        <span className={help}>{t.form.reply}</span>
      </div>
    </form>
  );
}

function Field({ id, label: text, hint, error, optional, children }: { id: string; label: string; hint?: string; error?: string; optional?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-small font-medium text-text-primary">
        {text}
        {optional && <span className="font-normal text-text-tertiary"> ({optional})</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className={help}>{hint}</p>}
      {error && <p className="text-small text-error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}
