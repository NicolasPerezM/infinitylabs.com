# MÖBIUS CONCIERGE — architecture (not live)

Status: **documented only** (DEC-011). The legacy chatbot backend (`infinitylabchat.com`) no longer resolves. No chat UI is shipped. Möbius appears on the site solely as a Labs research item with status "exploration".

## 1. Purpose

Möbius is not a support chatbot. It is a **structured opportunity conversation**: a visitor describes a business process, its volume, the systems involved and the pain, and Möbius helps identify where an intelligent system could apply, which questions a Sprint would answer, a candidate workflow shape, and the right next step. Its output is a briefing for both the visitor and the Infinity Labs team.

## 2. UX

- Entry point: a labelled panel on `/contact` and on solution pages ("Describe your process with Möbius"), never a floating bubble on every page.
- Conversation is form-like with typed turns: **process → volume and frequency → systems → what goes wrong → who decides** → summary. The user can skip to the form at any point.
- Every turn shows what Möbius understood so far (a running "process card"): name, trigger, steps, systems, exceptions, decision points.
- End state: (1) a downloadable/emailable briefing, (2) a suggested next step (Sprint, scoped build, not a fit), (3) optional handoff to a person with the briefing attached.
- Visual grammar: the process card uses the `WorkflowDiagram` typed-step component so the visitor sees deterministic / AI / agent / human-approval steps forming as they talk.
- Accessibility: keyboard-first, live region for responses, reduced-motion respected, no auto-scroll hijack.

## 3. Data flow

```
Browser ──(server action / route handler, streaming)──▶ Orchestrator (Node runtime)
   │                                                        │
   │   session id (httpOnly cookie), no PII in URL          ├─▶ LLM provider(s) via evaluated prompt set
   │                                                        ├─▶ Retrieval over Infinity Labs public content (solutions, capabilities, offers, principles)
   │                                                        ├─▶ Lead store (CRM/webhook) only on explicit consent
   ◀──────────── streamed turns + updated process card ─────┘
```

- Runtime: Node.js route handler with streaming; no Edge.
- State: server-side session keyed by an httpOnly cookie; transcript stored only after consent; TTL 24 h otherwise.
- Retrieval: the site's own content modules (`src/content/*`) are the only knowledge source; no external browsing.

## 4. LLM orchestration

- Deterministic state machine for the conversation stages; the model fills slots and asks the next question, it does not decide the flow.
- Structured output (JSON schema) per turn: `{ processCard, nextQuestion, confidence, recommendation? }`.
- Guardrails: refuse pricing commitments, refuse claims about clients or results, cite site content for capability statements, escalate to human when confidence is low or the user asks for a person.
- Evaluation set: 50+ scripted process descriptions across the five solution areas with expected process cards and recommendations; regression run on every prompt or model change (same harness as client systems).
- Model-agnostic: provider selected by env; prompts versioned in the repo.

## 5. Lead qualification

Scoring from the process card: manual effort, volume, number of systems, exception rate, decision owner present, timeline. Map to: **Sprint** (unclear where to start), **Scoped build** (clear single workflow), **Managed AI** (system exists), **Not a fit** (no repetitive process, no sponsor). The score and rationale go to the team with the briefing.

## 6. Security and privacy

- No transcript persistence without explicit consent checkbox; consent text references the privacy notice (GAP-004).
- PII minimisation: name and work email requested only at handoff.
- Rate limiting per session and IP; prompt-injection hardening (site content is data, user text is data; tools are read-only).
- Secrets only in server env; no keys in the browser.
- Data residency: provider choice documented; option to route through a regional endpoint.

## 7. CRM integration and human handoff

- Handoff posts the briefing to the same delivery layer as the contact form (`CONTACT_WEBHOOK_URL` or email), tagged `source: mobius`.
- A human replies within two business days; the briefing is the first artifact of the Sprint.

## 8. Go-live criteria

1. Evaluation harness passing with agreed thresholds. 2. Delivery provider configured. 3. Privacy notice published. 4. Load and abuse testing done. 5. Reduced-motion and screen-reader pass. Until then, Möbius stays in Labs.
