import type { Stage } from "./operating-model";

export type Capability = {
  slug: string;
  name: string;
  stage: Stage;
  eyebrow: string;
  headline: string;
  summary: string;
  includes: string[];
  /** How we work: the engineering stance, written for a CTO. */
  approach: string[];
  /** Technical notes that support credibility without selling primitives. */
  technical: string[];
  solutions: string[];
};

export const capabilities: Capability[] = [
  {
    slug: "ai-transformation",
    name: "AI Transformation",
    stage: "discover",
    eyebrow: "Capability · Discover",
    headline: "Opportunity discovery, readiness and roadmaps grounded in how your processes actually run.",
    summary:
      "The discipline of deciding where AI belongs in an organization: which processes, in what order, with what architecture and what business case.",
    includes: ["AI opportunity discovery", "AI readiness assessment (data, systems, people, governance)", "Process mapping and cost-of-work analysis", "Prioritized AI roadmap and business case", "Executive alignment and operating-model design"],
    approach: [
      "We interview the people who do the work, not only the people who manage it.",
      "Every opportunity is scored on value, feasibility, data readiness and risk, and the ones that fail the test are documented too.",
      "Roadmaps include the boring parts: integration, data access, governance and who owns the system after launch.",
    ],
    technical: ["Architecture sketches for each prioritized opportunity", "Data and integration inventory", "Risk and control assessment per workflow"],
    solutions: ["intelligent-operations", "revenue-systems"],
  },
  {
    slug: "ai-engineering",
    name: "AI Engineering",
    stage: "build",
    eyebrow: "Capability · Build",
    headline: "Production systems, not prototypes: integrated, evaluated, observable and owned.",
    summary:
      "The engineering practice that takes an AI use case from prototype to a system running inside your operations, with the reliability your teams expect from any other system.",
    includes: ["System architecture and integration design", "Knowledge and retrieval systems", "Document processing pipelines", "APIs, connectors and event flows to systems of record", "Security, access control and secrets management"],
    approach: [
      "Minimum sufficient architecture: the simplest design that meets business, scale, security and compliance requirements.",
      "Deterministic code where the rules are known; models only where judgment is required.",
      "Model-agnostic by design: providers and models are swappable behind evaluated interfaces.",
    ],
    technical: ["Typed contracts between components and models", "Evaluation sets versioned alongside the code", "Tracing of every model call with cost and latency"],
    solutions: ["knowledge-ai", "document-intelligence", "customer-operations"],
  },
  {
    slug: "agentic-systems",
    name: "Agentic Systems",
    stage: "build",
    eyebrow: "Capability · Build",
    headline: "Controlled autonomy: agents where they are safe, approvals where the cost of error is high.",
    summary:
      "Workflow systems in which software agents plan and execute multi-step work across your tools, inside boundaries defined by the business.",
    includes: ["Workflow redesign with explicit states and exception paths", "Agent orchestration with tools, memory and guardrails", "Human-in-the-loop approval and escalation design", "Multi-agent coordination where the process requires it", "Operational monitoring of agent behavior"],
    approach: [
      "Not every problem needs an autonomous agent. We classify each step as deterministic, AI-assisted, agent-executed or human-approved before writing code.",
      "Agents get least-privilege access to tools and data, and every action is logged.",
      "Autonomy expands as evaluation data proves the system is reliable, not before.",
    ],
    technical: ["Bounded tool permissions per agent", "Replayable execution traces", "Policy checks before side-effecting actions"],
    solutions: ["customer-operations", "revenue-systems", "intelligent-operations"],
  },
  {
    slug: "data-ai",
    name: "Data + AI",
    stage: "build",
    eyebrow: "Capability · Build",
    headline: "The data foundations that make AI systems trustworthy: access, quality, lineage and governance.",
    summary:
      "The work that makes the difference between an impressive demo and a system that is right about your business: getting the right data to the model, with the right controls.",
    includes: ["Data access and integration for AI workloads", "Knowledge base and content pipelines", "Structured extraction and enrichment", "Lineage, quality checks and governance", "Analytics on system behavior and business outcomes"],
    approach: [
      "We treat the knowledge base and the evaluation set as products with owners, not as one-time uploads.",
      "Permissions and data classification are enforced in the pipeline, not assumed in the prompt.",
    ],
    technical: ["Incremental ingestion with change detection", "Metadata and access-control propagation", "Quality metrics reported to business owners"],
    solutions: ["knowledge-ai", "document-intelligence", "revenue-systems"],
  },
  {
    slug: "ai-evaluation",
    name: "AI Evaluation",
    stage: "operate",
    eyebrow: "Capability · Operate",
    headline: "No AI without evaluation. Measurable quality, tied to a business KPI, on every change.",
    summary:
      "The practice of measuring whether an AI system does what the business needs, before launch and after every change.",
    includes: ["Evaluation set design from real cases", "Quality, safety and cost metrics per workflow", "Regression testing for model, prompt and content changes", "Human review programs and calibration", "Business KPI linkage and reporting"],
    approach: [
      "AI metrics that do not connect to a business outcome are vanity metrics. Each system has both.",
      "Evaluation runs in the pipeline: a change that lowers quality does not ship.",
    ],
    technical: ["Versioned test sets and scoring rubrics", "Automated and human-graded evaluations", "Dashboards for quality drift over time"],
    solutions: ["knowledge-ai", "document-intelligence", "customer-operations"],
  },
  {
    slug: "managed-ai",
    name: "Managed AI",
    stage: "operate",
    eyebrow: "Capability · Operate",
    headline: "We operate what we build: monitoring, evaluation, optimization and governance as an ongoing service.",
    summary:
      "Deployment begins the operating phase. Managed AI keeps production systems reliable, current and improving, with clear ownership.",
    includes: ["Monitoring of quality, latency, cost and usage", "Incident response and exception review with your team", "Model and provider updates evaluated before rollout", "Cost optimization and capacity planning", "Governance reporting and continuous improvement backlog"],
    approach: [
      "One accountable team after launch, with defined response commitments agreed per system.",
      "Improvements are prioritized from real exceptions and user feedback, not from feature lists.",
    ],
    technical: ["Observability across the full workflow, not only the model call", "Change management with evaluation gates", "Runbooks and handover documentation"],
    solutions: ["knowledge-ai", "document-intelligence", "customer-operations", "intelligent-operations"],
  },
];

export const getCapability = (slug: string) => capabilities.find((c) => c.slug === slug);
