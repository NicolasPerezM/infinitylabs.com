/**
 * Labs content. Nothing here claims results that do not exist (BUSINESS_STRATEGY §33–34).
 * `status` is shown verbatim on the site.
 */

export type LabsInitiative = {
  slug: string;
  name: string;
  kind: "product" | "accelerator" | "research";
  status: "in development" | "internal" | "exploration";
  summary: string;
  detail: string;
  /** Only true items are shown with their claims; false items show the honest status line. */
  verified: boolean;
};

export const labsIntro = {
  headline: "Labs turns repeated engineering knowledge into reusable technology.",
  short: "Every system teaches us something about evaluation, orchestration, documents or data. Labs turns those lessons into accelerators, experiments and, when they earn it, products.",
  body: "Every system we build teaches us something about evaluation, orchestration, documents or data. Labs is where those lessons become accelerators, experiments and, when they earn it, products. It is also where we test what we are not yet ready to promise to a client.",
};

export const labsInitiatives: LabsInitiative[] = [
  {
    slug: "noit",
    name: "NOIT",
    kind: "product",
    status: "in development",
    summary: "Market, competitive and creative intelligence for marketing and strategy teams.",
    detail:
      "NOIT started as an internal system for briefing, competitor tracking and audience analysis across social and advertising channels. It is being rebuilt on the same engineering principles as our client systems: evaluated outputs, traceable sources and human review. Public availability, scope and positioning are being defined.",
    verified: false,
  },
  {
    slug: "evaluation-harness",
    name: "Evaluation harness",
    kind: "accelerator",
    status: "internal",
    summary: "A reusable way to build test sets from real cases and run them on every change.",
    detail:
      "Versioned datasets, automated and human-graded scoring, regression reports in the delivery pipeline. Used on client systems; not offered standalone.",
    verified: true,
  },
  {
    slug: "workflow-orchestration-patterns",
    name: "Workflow orchestration patterns",
    kind: "accelerator",
    status: "internal",
    summary: "Reference patterns for deterministic / AI / agent / human-approval steps.",
    detail:
      "Typed step contracts, approval gates, escalation with context and replayable traces, packaged so a new workflow starts from a proven skeleton.",
    verified: true,
  },
  {
    slug: "document-pipelines",
    name: "Document pipeline components",
    kind: "accelerator",
    status: "internal",
    summary: "Classification, extraction, validation and reviewer-queue components for document-heavy processes.",
    detail:
      "Confidence thresholds, correction capture that feeds evaluation, and traceability from document to posted record.",
    verified: true,
  },
  {
    slug: "mobius",
    name: "Möbius",
    kind: "research",
    status: "exploration",
    summary: "An AI concierge that helps a visitor describe a process and identify where an intelligent system could apply.",
    detail:
      "Möbius is a concept under evaluation, not a live product. Its architecture (UX, orchestration, qualification, privacy, human handoff) is documented; it will only appear on this site when it works reliably.",
    verified: false,
  },
];

export const labsPractices: { name: string; description: string }[] = [
  { name: "Experiments", description: "Small, measured tests of models, retrieval strategies and agent designs on realistic data before they touch a client system." },
  { name: "Benchmarks", description: "Internal comparisons of providers and approaches on the tasks that matter to our solutions: extraction, grounded answers, tool use." },
  { name: "Reusable IP", description: "Accelerators that shorten the next build without locking clients into a proprietary platform." },
  { name: "Open source", description: "Where a component is generic and useful, we intend to publish it. Nothing is published yet." },
];
