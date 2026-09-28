"use server";

import { headers } from "next/headers";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { deliver, INTENTS, validate, type ContactInput, type FieldErrors } from "@/lib/contact";

export type ContactState = { status: "idle" | "success" | "error" | "unconfigured"; errors?: FieldErrors; message?: string; values?: Partial<ContactInput> };

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim().slice(0, 2000);

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  if (str(formData, "website")) return { status: "success" };
  const startedAt = Number(formData.get("startedAt") ?? 0);
  if (startedAt && Date.now() - startedAt < 2500) return { status: "success" };

  const rawLocale = str(formData, "locale");
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "es";
  const m = getDictionary(locale).contact.errors;
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
    locale,
  };

  const errors = validate(input);
  if (Object.keys(errors).length) return { status: "error", errors, values: input, message: m.review };

  const h = await headers();
  try {
    const result = await deliver(input, { userAgent: h.get("user-agent") ?? undefined, receivedAt: new Date().toISOString() });
    if (result.delivered) return { status: "success" };
    if (result.provider === "none") return { status: "unconfigured", values: input };
    console.error("[contact] delivery failed", result.error);
    return { status: "error", values: input, message: m.delivery };
  } catch (err) {
    console.error("[contact] delivery exception", err);
    return { status: "error", values: input, message: m.delivery };
  }
}
