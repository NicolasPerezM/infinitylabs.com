"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContact, type ContactState } from "./actions";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { COMPANY_SIZES, PROJECT_STAGES, TIMELINES } from "@/lib/contact";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const initial: ContactState = { status: "idle" };
const field = "h-11 w-full rounded-md border border-border-input bg-surface-elevated px-3 text-body text-text-primary placeholder:text-text-tertiary focus-visible:border-accent";
const label = "text-small font-medium text-text-primary";
const help = "text-small text-text-tertiary";

type Props = { locale: Locale; intent: string; email: string; t: Dictionary["contact"] };

export function ContactForm({ locale, intent, email, t }: Props) {
  const [state, action, pending] = useActionState(submitContact, initial);
  const [startedAt] = useState(() => Date.now());
  const started = useRef(false);
  const v = state.values ?? {};
  const err = state.errors ?? {};

  useEffect(() => {
    if (state.status === "success") track("contact_submit", { intent });
    if (state.status === "error") track("contact_error", { intent });
  }, [state.status, intent]);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-lg border border-border-subtle bg-surface-elevated p-8">
        <span className="label-mono text-operate-text">{t.success.label}</span>
        <h2 className="mt-3 text-heading">{t.success.title}</h2>
        <p className="mt-2 text-small text-text-secondary">
          {t.success.urgent} <a href={`mailto:${email}`} className="underline underline-offset-4">{email}</a>.
        </p>
      </div>
    );
  }

  if (state.status === "unconfigured") {
    const subject = encodeURIComponent(`[Website] ${v.intent ?? intent} — ${v.company ?? ""}`);
    const body = encodeURIComponent(
      `${t.form.name}: ${v.name ?? ""}\n${t.form.company}: ${v.company ?? ""}\n${t.form.role}: ${v.role ?? ""}\n${t.form.companySize}: ${v.companySize ?? ""}\n${t.form.stage}: ${v.stage ?? ""}\n${t.form.timeline}: ${v.timeline ?? ""}\n${t.form.systems}: ${v.systems ?? ""}\n\n${t.form.improve}\n${v.improve ?? ""}`,
    );
    return (
      <div role="status" className="rounded-lg border border-border-subtle bg-surface-elevated p-8">
        <span className="label-mono text-text-tertiary">{t.unconfigured.label}</span>
        <h2 className="mt-3 text-heading">{t.unconfigured.title}</h2>
        <p className="mt-2 text-small text-text-secondary">{t.unconfigured.body}</p>
        <a href={`mailto:${email}?subject=${subject}&body=${body}`} className="mt-5 inline-flex h-11 items-center rounded-md bg-text-primary px-4 text-small font-medium text-surface-primary">{t.unconfigured.cta}</a>
      </div>
    );
  }

  // option values are canonical English; labels come from the locale's dictionary (same order)
  const opt = (values: readonly string[], labels: readonly string[]) => values.map((value, i) => ({ value, label: labels[i] ?? value }));

  return (
    <form
      action={action}
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
        <p id="form-message" role="alert" className="rounded-md border border-border-input bg-surface-secondary px-4 py-3 text-small text-text-primary">{state.message}</p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={t.form.name} error={err.name}>
          <input id="name" name="name" autoComplete="name" required defaultValue={v.name} className={cn(field, err.name && "border-discover-text")} aria-invalid={!!err.name} />
        </Field>
        <Field id="email" label={t.form.email} error={err.email}>
          <input id="email" name="email" type="email" autoComplete="email" required defaultValue={v.email} className={cn(field, err.email && "border-discover-text")} aria-invalid={!!err.email} />
        </Field>
        <Field id="company" label={t.form.company} error={err.company}>
          <input id="company" name="company" autoComplete="organization" required defaultValue={v.company} className={cn(field, err.company && "border-discover-text")} aria-invalid={!!err.company} />
        </Field>
        <Field id="role" label={t.form.role} error={err.role}>
          <input id="role" name="role" autoComplete="organization-title" required defaultValue={v.role} className={cn(field, err.role && "border-discover-text")} aria-invalid={!!err.role} />
        </Field>
        <Field id="companySize" label={t.form.companySize} hint={t.form.optional}>
          <select id="companySize" name="companySize" defaultValue={v.companySize ?? ""} className={field}>
            <option value="">{t.form.select}</option>
            {opt(COMPANY_SIZES, t.options.sizes).map((o) => <option key={o.value} value={o.value}>{o.label} {t.form.people}</option>)}
          </select>
        </Field>
        <Field id="stage" label={t.form.stage} error={err.stage}>
          <select id="stage" name="stage" required defaultValue={v.stage ?? ""} className={cn(field, err.stage && "border-discover-text")} aria-invalid={!!err.stage}>
            <option value="">{t.form.select}</option>
            {opt(PROJECT_STAGES, t.options.stages).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </Field>
      </div>

      <Field id="improve" label={t.form.improve} hint={t.form.improveHint} error={err.improve}>
        <textarea id="improve" name="improve" rows={5} required defaultValue={v.improve} className={cn(field, "h-auto py-3", err.improve && "border-discover-text")} aria-invalid={!!err.improve} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="systems" label={t.form.systems} hint={t.form.systemsHint}>
          <input id="systems" name="systems" defaultValue={v.systems} className={field} />
        </Field>
        <Field id="timeline" label={t.form.timeline} error={err.timeline}>
          <select id="timeline" name="timeline" required defaultValue={v.timeline ?? ""} className={cn(field, err.timeline && "border-discover-text")} aria-invalid={!!err.timeline}>
            <option value="">{t.form.select}</option>
            {opt(TIMELINES, t.options.timelines).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </Field>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-3 text-small text-text-secondary">
          <input type="checkbox" name="consent" defaultChecked={v.consent} className="mt-1 size-4 accent-[var(--brand-accent)]" aria-invalid={!!err.consent} />
          <span>{t.form.consent}</span>
        </label>
        {err.consent && <p className="text-small text-discover-text">{err.consent}</p>}
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

function Field({ id, label: text, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={label}>{text}</label>
      {children}
      {hint && !error && <p className={help}>{hint}</p>}
      {error && <p className="text-small text-discover-text" id={`${id}-error`}>{error}</p>}
    </div>
  );
}
