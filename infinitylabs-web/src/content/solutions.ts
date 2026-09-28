import type { Stage } from "./operating-model";

export type SolutionDiagramStep = {
  label: string;
  kind: "input" | "deterministic" | "ai" | "agent" | "human" | "output";
};

export type Solution = {
  slug: string;
  name: string;
  eyebrow: string;
  headline: string;
  summary: string;
  /** The expensive business problem, in the buyer's words. */
  problem: string[];
  /** What Infinity builds, as system components. */
  build: string[];
  /** Outcomes, qualitative. Quantified outcomes require verified proof (GAP-006). */
  outcomes: string[];
  /** Typical environments: systems and artifacts this connects to. */
  environments: string[];
  capabilities: string[];
  offers: string[];
  /** Illustrative workflow used by the ArchitectureDiagram. Not a client case. */
  diagram: SolutionDiagramStep[];
  stageEmphasis: Stage;
};

export const solutions: Solution[] = [
  {
    slug: "knowledge-ai",
    name: "Enterprise Knowledge",
    eyebrow: "Solution 01",
    headline: "Answers with sources, permissions and a quality score. Not a chatbot over a folder.",
    summary:
      "A governed knowledge system that lets teams ask questions across policies, procedures, contracts and internal expertise, and get answers they can verify and act on.",
    problem: [
      "Knowledge lives in drives, wikis, tickets, inboxes and a few experienced people. The same questions are answered again every week.",
      "Onboarding is slow because nobody can point to a single current version of how things are done.",
      "Decisions get made on outdated policy because the latest one was never found.",
    ],
    build: [
      "Ingestion pipelines that keep the knowledge base current from your document stores and systems.",
      "Retrieval that respects existing permissions: people only get answers from what they are allowed to read.",
      "Answers with citations, confidence handling and an explicit “I don’t know” path.",
      "An evaluation set built from real questions, run on every change to models, prompts or content.",
      "Feedback loops that route wrong or missing answers to the owners of the content.",
    ],
    outcomes: [
      "Faster resolution of internal and customer questions",
      "Consistent answers across teams and channels",
      "Less dependence on a handful of experts",
      "A measurable quality baseline you can report on",
    ],
    environments: ["SharePoint, Google Drive, Confluence, Notion", "Policy and procedure libraries", "Contracts and legal repositories", "Helpdesk and ticketing history"],
    capabilities: ["ai-engineering", "data-ai", "ai-evaluation", "managed-ai"],
    offers: ["enterprise-knowledge-document-ai", "managed-ai"],
    diagram: [
      { label: "Question", kind: "input" },
      { label: "Permission check", kind: "deterministic" },
      { label: "Retrieve sources", kind: "ai" },
      { label: "Compose answer + citations", kind: "ai" },
      { label: "Low confidence → expert", kind: "human" },
      { label: "Answer + feedback", kind: "output" },
    ],
    stageEmphasis: "build",
  },
  {
    slug: "document-intelligence",
    name: "Document Intelligence",
    eyebrow: "Solution 02",
    headline: "Turn document-heavy processes into controlled pipelines with human review where it matters.",
    summary:
      "Extraction, classification, validation and routing for invoices, claims, contracts, forms and onboarding files, with confidence thresholds, exception queues and an audit trail.",
    problem: [
      "High volumes of documents are read, re-typed and checked by people, one at a time.",
      "Errors surface late, in the ERP or in front of the customer.",
      "Peaks create backlogs; hiring for peaks is expensive and slow.",
    ],
    build: [
      "Document classification and structured extraction tuned to your document types.",
      "Validation against your systems of record: master data, prices, policies, business rules.",
      "Confidence thresholds that decide what flows automatically and what goes to a review queue.",
      "A reviewer interface that captures corrections and turns them into evaluation data.",
      "End-to-end traceability: which document, which version, which rule, who approved.",
    ],
    outcomes: [
      "Shorter cycle times from receipt to posting or decision",
      "Fewer downstream errors and reworks",
      "Capacity that scales with volume instead of headcount",
      "A defensible audit trail for every automated decision",
    ],
    environments: ["Invoices, purchase orders, remittances", "Claims, forms, KYC and onboarding files", "Contracts and amendments", "ERP, DMS and workflow tools"],
    capabilities: ["ai-engineering", "agentic-systems", "ai-evaluation", "managed-ai"],
    offers: ["enterprise-knowledge-document-ai", "managed-ai"],
    diagram: [
      { label: "Inbound document", kind: "input" },
      { label: "Classify + extract", kind: "ai" },
      { label: "Validate vs. ERP rules", kind: "deterministic" },
      { label: "Exception review", kind: "human" },
      { label: "Post to system", kind: "deterministic" },
      { label: "Monitor quality", kind: "output" },
    ],
    stageEmphasis: "build",
  },
  {
    slug: "customer-operations",
    name: "Customer Operations",
    eyebrow: "Solution 03",
    headline: "AI-assisted and AI-handled service tiers, with escalation and quality control designed in.",
    summary:
      "Support and service operations where routine requests are resolved by the system, complex ones reach a person with context already prepared, and every interaction is measured for quality.",
    problem: [
      "Agents spend most of their time on lookups, drafting and repetitive requests instead of on the cases that need judgment.",
      "Service quality varies by person, shift and channel.",
      "Volume grows faster than the team, and SLAs slip during peaks.",
    ],
    build: [
      "Intent detection and routing across email, chat, WhatsApp and web forms.",
      "Resolution workflows connected to CRM, helpdesk, order and billing systems.",
      "Assist mode for agents (drafts, summaries, next-best action) and autonomous mode for well-bounded requests.",
      "Escalation rules with full context handover to a person.",
      "Response quality evaluation and monitoring by intent, channel and outcome.",
    ],
    outcomes: [
      "Faster first response and resolution for routine requests",
      "More agent capacity for complex, high-value cases",
      "Consistent tone and policy compliance across channels",
      "Visibility into what the system handles and what it escalates",
    ],
    environments: ["Helpdesk and CRM platforms", "WhatsApp Business, email, web chat", "Order, billing and logistics systems", "Knowledge bases and policies"],
    capabilities: ["agentic-systems", "ai-engineering", "ai-evaluation", "managed-ai"],
    offers: ["agentic-workflow-systems", "managed-ai"],
    diagram: [
      { label: "Customer request", kind: "input" },
      { label: "Classify intent", kind: "ai" },
      { label: "Fetch account context", kind: "deterministic" },
      { label: "Resolve or draft", kind: "agent" },
      { label: "Escalate with context", kind: "human" },
      { label: "Reply + QA score", kind: "output" },
    ],
    stageEmphasis: "operate",
  },
  {
    slug: "revenue-systems",
    name: "Revenue Systems",
    eyebrow: "Solution 04",
    headline: "Research, qualification and proposal workflows that keep the CRM honest and the team selling.",
    summary:
      "Systems that prepare account research, qualify inbound demand, draft proposals and keep records current, so revenue teams spend their time in conversations, not in tabs.",
    problem: [
      "Leads wait hours or days for a first qualified response.",
      "Proposals and account research are rebuilt from scratch by every rep.",
      "CRM data decays because updating it competes with selling.",
    ],
    build: [
      "Inbound qualification workflows with clear handoff rules to people.",
      "Account and contact research assembled from approved sources into a briefing.",
      "Proposal and quote drafting from your templates, pricing rules and past deals, with approval steps.",
      "CRM hygiene automations: enrichment, deduplication, stage and activity updates.",
      "Pipeline analytics that separate system-generated from human-generated activity.",
    ],
    outcomes: [
      "Shorter time from inquiry to qualified conversation",
      "More consistent proposals with less rep effort",
      "A CRM that reflects reality",
      "Clear measurement of where AI assistance changes conversion",
    ],
    environments: ["CRM platforms and sales engagement tools", "Marketing automation and web forms", "Pricing and CPQ rules", "Email and calendar"],
    capabilities: ["agentic-systems", "data-ai", "ai-evaluation"],
    offers: ["agentic-workflow-systems", "ai-opportunity-sprint"],
    diagram: [
      { label: "Inbound lead", kind: "input" },
      { label: "Enrich + research", kind: "agent" },
      { label: "Qualify vs. ICP rules", kind: "deterministic" },
      { label: "Draft proposal", kind: "ai" },
      { label: "Rep approval", kind: "human" },
      { label: "CRM updated", kind: "output" },
    ],
    stageEmphasis: "build",
  },
  {
    slug: "intelligent-operations",
    name: "Intelligent Operations",
    eyebrow: "Solution 05",
    headline: "Back-office processes redesigned as orchestrated workflows: automation, AI and approvals in one system.",
    summary:
      "Procurement, finance, HR and compliance processes where manual handoffs are replaced by an orchestrated workflow, with AI applied only to the steps that need judgment.",
    problem: [
      "Processes span five tools and three teams, held together by email and spreadsheets.",
      "Nobody can say where a request is, or why it stopped.",
      "Controls are enforced by memory and by the audit at year end.",
    ],
    build: [
      "Process redesign with explicit states, owners and exception paths.",
      "Orchestration that combines deterministic automation, AI steps and approval gates.",
      "Integration with ERP, HRIS, procurement and ticketing systems.",
      "Operational dashboards: throughput, cycle time, exceptions, cost per transaction.",
      "Governance built in: who can approve what, and a record of every decision.",
    ],
    outcomes: [
      "Predictable cycle times and fewer stalled requests",
      "Lower cost per transaction as volume grows",
      "Controls that are enforced by the system, not by reminders",
      "One place to see the state of the process",
    ],
    environments: ["ERP, HRIS and procurement suites", "Ticketing and workflow tools", "Spreadsheets and email-driven processes", "Reporting and compliance requirements"],
    capabilities: ["ai-transformation", "agentic-systems", "ai-engineering", "managed-ai"],
    offers: ["ai-opportunity-sprint", "agentic-workflow-systems", "managed-ai"],
    diagram: [
      { label: "Request", kind: "input" },
      { label: "Validate + enrich", kind: "deterministic" },
      { label: "Assess + recommend", kind: "ai" },
      { label: "Approval gate", kind: "human" },
      { label: "Execute in systems", kind: "agent" },
      { label: "Dashboard + audit", kind: "output" },
    ],
    stageEmphasis: "operate",
  },
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);
