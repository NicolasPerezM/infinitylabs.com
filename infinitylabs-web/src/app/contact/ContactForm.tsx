"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContact, type ContactState } from "./actions";
import { COMPANY_SIZES, PROJECT_STAGES, TIMELINES } from "@/lib/contact";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const initial: ContactState = { status: "idle" };

const field = "h-11 w-full rounded-md border border-border-strong bg-surface-elevated px-3 text-body text-text-primary placeholder:text-text-tertiary focus-visible:border-accent";
const label = "text-small font-medium text-text-primary";
const help = "text-small text-text-tertiary";

export function ContactForm({ intent, email }: { intent: string; email: string }) {
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
      <div role="status" className="rounded-lg border border-border-subtle bg-surface-elevated p-8 shadow-card">
        <span className="label-mono text-operate-text">Received</span>
        <h2 className="mt-3 text-heading">Thank you. We will reply within two business days.</h2>
        <p className="mt-2 text-small text-text-secondary">
          If it is urgent, write to{" "}
          <a href={`mailto:${email}`} className="underline underline-offset-4">
            {email}
          </a>
          .
        </p>
      </div>
    );
  }

  if (state.status === "unconfigured") {
    const subject = encodeURIComponent(`[Website] ${v.intent ?? intent} — ${v.company ?? ""}`);
    const body = encodeURIComponent(
      `Name: ${v.name ?? ""}\nCompany: ${v.company ?? ""}\nRole: ${v.role ?? ""}\nCompany size: ${v.companySize ?? ""}\nStage: ${v.stage ?? ""}\nTimeline: ${v.timeline ?? ""}\nSystems: ${v.systems ?? ""}\n\nWhat we want to improve:\n${v.improve ?? ""}`,
    );
    return (
      <div role="status" className="rounded-lg border border-border-subtle bg-surface-elevated p-8 shadow-card">
        <span className="label-mono text-text-tertiary">One more step</span>
        <h2 className="mt-3 text-heading">Send your request by email</h2>
        <p className="mt-2 text-small text-text-secondary">
          Direct delivery from this form is not active yet. Your answers are prepared in an email; press send and we will take it from there.
        </p>
        <a href={`mailto:${email}?subject=${subject}&body=${body}`} className="mt-5 inline-flex h-11 items-center rounded-md bg-accent px-4 text-small font-medium text-accent-contrast">
          Open email with my answers
        </a>
      </div>
    );
  }

  return (
    <form
      action={action}
      noValidate
      onFocusCapture={() => {
        if (!started.current) {
          started.current = true;
          track("contact_start", { intent });
        }
      }}
      className="flex flex-col gap-6"
      aria-describedby={state.message ? "form-message" : undefined}
    >
      <input type="hidden" name="intent" value={intent} />
      <input type="hidden" name="startedAt" value={startedAt} />
      {/* honeypot */}
      <div className="hidden" aria-hidden>
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.message && (
        <p id="form-message" role="alert" className="rounded-md border border-border-strong bg-surface-secondary px-4 py-3 text-small text-text-primary">
          {state.message}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={err.name}>
          <input id="name" name="name" autoComplete="name" required defaultValue={v.name} className={cn(field, err.name && "border-discover-text")} aria-invalid={!!err.name} />
        </Field>
        <Field id="email" label="Work email" error={err.email}>
          <input id="email" name="email" type="email" autoComplete="email" required defaultValue={v.email} className={cn(field, err.email && "border-discover-text")} aria-invalid={!!err.email} />
        </Field>
        <Field id="company" label="Company" error={err.company}>
          <input id="company" name="company" autoComplete="organization" required defaultValue={v.company} className={cn(field, err.company && "border-discover-text")} aria-invalid={!!err.company} />
        </Field>
        <Field id="role" label="Role" error={err.role}>
          <input id="role" name="role" autoComplete="organization-title" required defaultValue={v.role} className={cn(field, err.role && "border-discover-text")} aria-invalid={!!err.role} />
        </Field>
        <Field id="companySize" label="Company size" hint="Optional">
          <select id="companySize" name="companySize" defaultValue={v.companySize ?? ""} className={field}>
            <option value="">Select</option>
            {COMPANY_SIZES.map((s) => (
              <option key={s} value={s}>
                {s} people
              </option>
            ))}
          </select>
        </Field>
        <Field id="stage" label="Project stage" error={err.stage}>
          <select id="stage" name="stage" required defaultValue={v.stage ?? ""} className={cn(field, err.stage && "border-discover-text")} aria-invalid={!!err.stage}>
            <option value="">Select</option>
            {PROJECT_STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="improve" label="What are you trying to improve?" hint="Which process, what is slow or costly today, what a good outcome looks like." error={err.improve}>
        <textarea id="improve" name="improve" rows={5} required defaultValue={v.improve} className={cn(field, "h-auto py-3", err.improve && "border-discover-text")} aria-invalid={!!err.improve} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="systems" label="Current systems" hint="Optional: CRM, ERP, helpdesk, document stores…">
          <input id="systems" name="systems" defaultValue={v.systems} className={field} />
        </Field>
        <Field id="timeline" label="Timeline" error={err.timeline}>
          <select id="timeline" name="timeline" required defaultValue={v.timeline ?? ""} className={cn(field, err.timeline && "border-discover-text")} aria-invalid={!!err.timeline}>
            <option value="">Select</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-3 text-small text-text-secondary">
          <input type="checkbox" name="consent" defaultChecked={v.consent} className="mt-1 size-4 accent-[var(--brand-accent)]" aria-invalid={!!err.consent} />
          <span>I agree that Infinity Labs may contact me about this request. Data is used only to respond to it.</span>
        </label>
        {err.consent && <p className="text-small text-discover-text">{err.consent}</p>}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-5 font-medium text-accent-contrast transition-colors hover:bg-accent-hover disabled:opacity-60">
          {pending ? "Sending…" : "Send request"}
        </button>
        <span className={help}>We reply within two business days.</span>
      </div>
    </form>
  );
}

function Field({ id, label: text, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={label}>
        {text}
      </label>
      {children}
      {hint && !error && <p className={help}>{hint}</p>}
      {error && (
        <p className="text-small text-discover-text" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
