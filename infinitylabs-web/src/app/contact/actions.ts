"use server";

import { headers } from "next/headers";
import { deliver, INTENTS, validate, type ContactInput, type FieldErrors } from "@/lib/contact";

export type ContactState = {
  status: "idle" | "success" | "error" | "unconfigured";
  errors?: FieldErrors;
  message?: string;
  values?: Partial<ContactInput>;
};

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim().slice(0, 2000);

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot + minimum fill time: bots fill hidden fields or submit instantly.
  if (str(formData, "website")) return { status: "success" };
  const startedAt = Number(formData.get("startedAt") ?? 0);
  if (startedAt && Date.now() - startedAt < 2500) return { status: "success" };

  const intentRaw = str(formData, "intent");
  const input: ContactInput = {
    name: str(formData, "name"),
    email: str(formData, "email"),
    company: str(formData, "company"),
    role: str(formData, "role"),
    companySize: str(formData, "companySize") || undefined,
    improve: str(formData, "improve"),
    systems: str(formData, "systems") || undefined,
    stage: str(formData, "stage"),
    timeline: str(formData, "timeline"),
    intent: (INTENTS as readonly string[]).includes(intentRaw) ? intentRaw : "general",
    consent: formData.get("consent") === "on",
  };

  const errors = validate(input);
  if (Object.keys(errors).length) {
    return { status: "error", errors, values: input, message: "Please review the highlighted fields." };
  }

  const h = await headers();
  try {
    const result = await deliver(input, { userAgent: h.get("user-agent") ?? undefined, receivedAt: new Date().toISOString() });
    if (result.delivered) return { status: "success" };
    if (result.provider === "none") return { status: "unconfigured", values: input };
    console.error("[contact] delivery failed", result.error);
    return { status: "error", values: input, message: "We could not send your request. Please email us directly." };
  } catch (err) {
    console.error("[contact] delivery exception", err);
    return { status: "error", values: input, message: "We could not send your request. Please email us directly." };
  }
}
