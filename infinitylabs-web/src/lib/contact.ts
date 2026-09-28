/**
 * Contact form domain logic: validation + provider-agnostic delivery (DEC-010).
 * Delivery providers (first configured wins):
 *  - CONTACT_WEBHOOK_URL            → POST JSON (CRM, Zapier/Make, n8n, Slack webhook…)
 *  - RESEND_API_KEY + CONTACT_TO    → email via Resend HTTP API (no SDK)
 *  - none                           → returns { delivered: false } so the UI can show the direct email path
 */

export const PROJECT_STAGES = ["Exploring where AI applies", "Have a specific process in mind", "A pilot exists", "Systems in production"] as const;
export const TIMELINES = ["This quarter", "Next quarter", "This year", "Not defined"] as const;
export const COMPANY_SIZES = ["< 50", "50–250", "250–1,000", "1,000–5,000", "> 5,000"] as const;
export const INTENTS = ["sprint", "agentic-workflow-systems", "enterprise-knowledge-document-ai", "managed-ai", "general"] as const;

export type ContactInput = {
  name: string;
  email: string;
  company: string;
  role: string;
  companySize?: string;
  improve: string;
  systems?: string;
  stage: string;
  timeline: string;
  intent: string;
  consent: boolean;
};

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const FREE_MAIL = /@(gmail|hotmail|outlook|yahoo|icloud|live|proton|protonmail)\./i;

export function validate(input: ContactInput): FieldErrors {
  const e: FieldErrors = {};
  if (input.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.email)) e.email = "Please enter a valid email address.";
  else if (FREE_MAIL.test(input.email)) e.email = "Please use your work email so we can route the request correctly.";
  if (input.company.trim().length < 2) e.company = "Please enter your company.";
  if (input.role.trim().length < 2) e.role = "Please enter your role.";
  if (input.improve.trim().length < 20) e.improve = "A sentence or two helps us prepare: which process, what is slow or costly today.";
  if (!PROJECT_STAGES.includes(input.stage as (typeof PROJECT_STAGES)[number])) e.stage = "Please select a stage.";
  if (!TIMELINES.includes(input.timeline as (typeof TIMELINES)[number])) e.timeline = "Please select a timeline.";
  if (!input.consent) e.consent = "Please confirm we may contact you about this request.";
  return e;
}

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
    const text = Object.entries(payload)
      .map(([k, v]) => `${k}: ${String(v ?? "")}`)
      .join("\n");
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
