export type Principle = { code: string; name: string; statement: string; detail: string };

/** Engineering philosophy (BUSINESS_STRATEGY §11). Written for CTOs and COOs alike. */
export const principles: Principle[] = [
  {
    code: "P1",
    name: "Business-first AI",
    statement: "Start from the process and the outcome, not from the model.",
    detail: "Every system begins with a mapped process, a cost of the current way of working and a KPI the system is accountable for.",
  },
  {
    code: "P2",
    name: "Minimum sufficient architecture",
    statement: "The simplest architecture that reliably meets business, scale, security and compliance requirements.",
    detail: "Fewer moving parts, fewer vendors, fewer surprises. Sophistication is measured in reliability, not in dependency count.",
  },
  {
    code: "P3",
    name: "Controlled autonomy",
    statement: "Not every problem requires an autonomous agent.",
    detail: "Each step is classified as deterministic, AI-assisted, agent-executed or human-approved. Autonomy expands only as evaluation proves it safe.",
  },
  {
    code: "P4",
    name: "No AI without evaluation",
    statement: "Production AI must have measurable quality.",
    detail: "Every system ships with an evaluation set built from real cases, and every change is tested against it before release.",
  },
  {
    code: "P5",
    name: "No AI without a business KPI",
    statement: "AI metrics must connect to business outcomes.",
    detail: "Accuracy is not the goal. Cycle time, cost per transaction, resolution rate and error rate are.",
  },
  {
    code: "P6",
    name: "Model agnosticism",
    statement: "The right models and providers for each task, swappable behind evaluated interfaces.",
    detail: "Commercial and open-weight models are chosen per workflow on quality, cost, latency and data requirements, and can be replaced without a rebuild.",
  },
  {
    code: "P7",
    name: "Production over demo",
    statement: "A prototype that never reaches production is not success.",
    detail: "Integration, permissions, exceptions and operations are designed from the first week, not after the demo.",
  },
  {
    code: "P8",
    name: "Continuous improvement",
    statement: "Deployment begins the operating phase. It does not end the engagement.",
    detail: "Systems are monitored, evaluated and improved from real usage, with a named owner and a backlog.",
  },
];

/** Delivery method (BUSINESS_STRATEGY §21 step 10). */
export const method: { code: string; name: string; description: string; stage: "discover" | "build" | "operate" }[] = [
  { code: "01", name: "Discovery", description: "Process mapping, cost of work, data and systems inventory, opportunity scoring.", stage: "discover" },
  { code: "02", name: "Architecture", description: "Target workflow, step classification, integration design, evaluation approach.", stage: "discover" },
  { code: "03", name: "Prototype", description: "A thin, integrated slice with real data and real users, built to be measured.", stage: "build" },
  { code: "04", name: "Evaluate", description: "Evaluation set, quality gates, cost and latency budgets, human review calibration.", stage: "build" },
  { code: "05", name: "Deploy", description: "Controlled rollout, runbooks, observability, handover documentation.", stage: "operate" },
  { code: "06", name: "Operate", description: "Monitoring, exception reviews, evaluated changes, continuous improvement.", stage: "operate" },
];

/** Trust signals that are true today (no certifications claimed; GAP-018). */
export const trustSignals: { name: string; description: string }[] = [
  { name: "Evaluation before launch", description: "Every system has a test set built from your real cases. A change that lowers quality does not ship." },
  { name: "Human approval by design", description: "Where the cost of an error is high, a person approves. The system prepares the decision; it does not take it." },
  { name: "Least-privilege data access", description: "Agents and pipelines get the minimum access required, enforced in code and logged." },
  { name: "Your data stays yours", description: "No training of models on your data by default. Provider and residency choices are made with you and documented." },
  { name: "Documentation as a deliverable", description: "Architecture, runbooks and handover material are part of the scope, not an afterthought." },
  { name: "One accountable owner after launch", description: "Managed AI or a structured handover: there is always a named team responsible for the system in production." },
];

/** Technology posture (BUSINESS_STRATEGY §9: primitives are capabilities, not products). */
export const technologyPosture: { area: string; description: string }[] = [
  { area: "Models", description: "Commercial and open-weight models from multiple providers, selected per workflow and kept swappable." },
  { area: "Orchestration", description: "Workflow and agent orchestration with typed tools, bounded permissions and replayable traces." },
  { area: "Knowledge and documents", description: "Ingestion, retrieval, extraction and validation pipelines with permission propagation." },
  { area: "Evaluation and observability", description: "Versioned test sets, automated and human grading, tracing of cost, latency and quality." },
  { area: "Your systems of record", description: "CRM, ERP, helpdesk, document stores, messaging channels and data platforms, integrated through APIs and events." },
  { area: "Security and governance", description: "Access control, secrets management, audit trails and change management with evaluation gates." },
];
