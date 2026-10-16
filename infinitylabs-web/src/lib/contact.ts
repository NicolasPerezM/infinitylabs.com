import { en } from "@/i18n/dictionaries/en";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * Contact form domain logic: validation + provider-agnostic delivery (DEC-010).
 * Option values are canonical English (from the `en` dictionary) so CRM data stays consistent;
 * labels are localized by the form. Providers (first configured wins):
 *  - CONTACT_WEBHOOK_URL            → POST JSON (CRM, Zapier/Make, n8n, Slack webhook…)
 *  - RESEND_API_KEY + CONTACT_TO    → email via Resend HTTP API (no SDK)
 *  - none                           → { delivered: false } so the UI shows the direct email path
 */

export const PROJECT_STAGES = en.contact.options.stages;
export const TIMELINES = en.contact.options.timelines;
export const COMPANY_SIZES = en.contact.options.sizes;
export const INTENTS = ["sprint", "agentic-workflow-systems", "enterprise-knowledge-document-ai", "managed-ai", "digital-growth-system", "labs", "general"] as const;

export type ContactInput = {
  name: string;
  email: string;
  company: string;
  role?: string;
  companySize?: string;
  improve: string;
  systems?: string;
  stage?: string;
  timeline?: string;
  intent: string;
  consent: boolean;
  locale: Locale;
};

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

/**
 * Ask only what we need to reply (DEC-027): name, email (any domain: many mid-market owners use a
 * personal address), company, the process, and consent. Role, size, stage, systems and timeline
 * help us prepare and are optional; an unknown option value is simply dropped.
 */
export function validate(input: ContactInput): FieldErrors {
  const m = getDictionary(input.locale).contact.errors;
  const e: FieldErrors = {};
  if (input.name.trim().length < 2) e.name = m.name;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.email)) e.email = m.email;
  if (input.company.trim().length < 2) e.company = m.company;
  if (input.improve.trim().length < 20) e.improve = m.improve;
  if (!input.consent) e.consent = m.consent;
  return e;
}

export const cleanOption = (value: string | undefined, allowed: readonly string[]) => (value && allowed.includes(value) ? value : undefined);

export type DeliveryResult = { delivered: boolean; provider: "webhook" | "resend" | "none"; error?: string };

export async function deliver(input: ContactInput, meta: { userAgent?: string; receivedAt: string }): Promise<DeliveryResult> {
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM ?? "Infinity Labs Website <no-reply@infinitylabscol.com>";
  const payload = { source: "infinitylabs-web/contact", ...input, ...meta };

  if (webhook) {
    const res = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!res.ok) return { delivered: false, provider: "webhook", error: `webhook ${res.status}` };
    return { delivered: true, provider: "webhook" };
  }
  if (resendKey && to) {
    const text = Object.entries(payload).map(([k, v]) => `${k}: ${String(v ?? "")}`).join("\n");
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: input.email, subject: `[Website] ${input.intent} — ${input.company}`, text }),
    });
    if (!res.ok) return { delivered: false, provider: "resend", error: `resend ${res.status}` };
    return { delivered: true, provider: "resend" };
  }
  return { delivered: false, provider: "none" };
}
