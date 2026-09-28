import type { Stage } from "./operating-model";

export type Offer = {
  slug: string;
  name: string;
  stage: Stage;
  eyebrow: string;
  headline: string;
  summary: string;
  /** Who it is for, in operational terms. */
  forWhom: string[];
  phases: { name: string; description: string }[];
  deliverables: string[];
  /** Duration/price are founder decisions (GAP-014). Keep honest. */
  format: string;
  primary?: boolean;
  faq?: { question: string; answer: string }[];
};

export const offers: Offer[] = [
  {
    slug: "ai-opportunity-sprint",
    name: "AI Opportunity Sprint",
    stage: "discover",
    eyebrow: "Offer · Discover",
    headline: "A structured engagement to identify, evaluate and prioritize the AI opportunities worth building.",
    summary:
      "The Sprint replaces open-ended AI exploration with a decision: which processes, in what order, with what architecture, and what business case. It is the entry point to everything else we do.",
    forWhom: [
      "Leadership teams with executive sponsorship and a mandate to move from experiments to production.",
      "Organizations with repetitive, document-heavy or multi-system processes and measurable operational cost.",
      "Teams that want an engineering-grade plan before committing budget to a build.",
    ],
    phases: [
      {
        name: "Map",
        description:
          "Interviews with the people who do the work, process walkthroughs, systems and data inventory. We document how work actually flows, where it waits and what it costs.",
      },
      {
        name: "Score",
        description:
          "Each candidate opportunity is scored on business value, feasibility, data readiness, risk and change effort. We show the ones that fail the test as clearly as the ones that pass.",
      },
      {
        name: "Design",
        description:
          "For the prioritized opportunities: target workflow design, architecture sketch, human-approval points, evaluation approach, integration needs and a business case with assumptions stated.",
      },
    ],
    deliverables: [
      "Process and opportunity map",
      "Scored and prioritized opportunity portfolio",
      "Target workflow and architecture sketches for the top opportunities",
      "Evaluation and governance approach per opportunity",
      "Roadmap and business case, ready for a build decision",
    ],
    format:
      "Delivered by a senior team combining process design, AI engineering and data. Scope and duration are sized to the organization and the number of processes in play.",
    primary: true,
    faq: [
      {
        question: "Is the AI Opportunity Sprint a sales exercise for a build project?",
        answer:
          "No. The Sprint produces a decision-grade plan you can execute with us or with another team. Opportunities that are not worth building are documented as such.",
      },
      {
        question: "What do you need from us?",
        answer:
          "An executive sponsor, access to the people who run the processes in scope, and read access to relevant systems and sample documents under an NDA.",
      },
      {
        question: "How is this different from an AI strategy deck?",
        answer:
          "The output includes architecture sketches, integration needs, human-approval points and an evaluation approach per opportunity. It is written so an engineering team can start, not so a board can nod.",
      },
      {
        question: "Which model providers do you use?",
        answer:
          "We are model-agnostic. The Sprint recommends providers and models per workflow based on quality, cost, data residency and your existing agreements, and the build keeps them swappable.",
      },
    ],
  },
  {
    slug: "agentic-workflow-systems",
    name: "Agentic Workflow Systems",
    stage: "build",
    eyebrow: "Offer · Build",
    headline: "Redesign a business workflow as a production system that combines automation, AI, agents and human approval.",
    summary:
      "We take one prioritized workflow end to end: redesign, architecture, build, integration, evaluation and launch, with your team involved at every approval point.",
    forWhom: [
      "Operations, service or revenue leaders with a specific workflow that is expensive, slow or error-prone.",
      "Organizations that have completed discovery (ours or theirs) and need an engineering partner to reach production.",
    ],
    phases: [
      { name: "Redesign", description: "Target workflow with explicit states, owners, exceptions and the deterministic / AI / agent / human classification of every step." },
      { name: "Build", description: "Integration with systems of record, orchestration, agent tooling with bounded permissions, reviewer interfaces and observability." },
      { name: "Evaluate and launch", description: "Evaluation set from real cases, pilot with a controlled group, quality gates, then production rollout with runbooks." },
    ],
    deliverables: ["Production workflow system integrated with your tools", "Evaluation set and quality dashboard", "Approval and escalation design", "Documentation, runbooks and handover"],
    format: "Fixed-scope build for one workflow, followed by Managed AI or a handover to your team.",
  },
  {
    slug: "enterprise-knowledge-document-ai",
    name: "Enterprise Knowledge + Document AI",
    stage: "build",
    eyebrow: "Offer · Build",
    headline: "Turn fragmented knowledge and document-heavy processes into intelligent operational systems.",
    summary:
      "Deployment of a governed knowledge system, a document intelligence pipeline, or both, connected to your repositories and systems of record.",
    forWhom: [
      "Organizations where teams search for answers across many repositories and experts.",
      "Operations that process large volumes of invoices, claims, contracts, forms or onboarding files.",
    ],
    phases: [
      { name: "Foundation", description: "Source inventory, permissions model, document taxonomy and the first evaluation set from real questions or documents." },
      { name: "Deployment", description: "Ingestion pipelines, retrieval or extraction, validation against systems of record, reviewer interfaces and citations." },
      { name: "Adoption and quality", description: "Rollout by team, feedback loops to content owners, quality reporting and tuning." },
    ],
    deliverables: ["Governed knowledge system and/or document pipeline in production", "Permissions-aware retrieval", "Evaluation set and quality baseline", "Content-owner feedback workflow"],
    format: "Scoped by repositories, document types and volumes. Typically followed by Managed AI.",
  },
  {
    slug: "managed-ai",
    name: "Managed AI",
    stage: "operate",
    eyebrow: "Offer · Operate",
    headline: "Operate, monitor, evaluate, optimize and improve production AI systems.",
    summary:
      "An ongoing service with one accountable team for the AI systems in your operation, whether we built them or not.",
    forWhom: [
      "Organizations with AI systems in production that need reliability, cost control and continuous improvement.",
      "Teams that want to expand autonomy safely as evaluation data accumulates.",
    ],
    phases: [
      { name: "Onboard", description: "Observability, evaluation sets and runbooks in place for every system in scope; baseline for quality, cost and usage." },
      { name: "Operate", description: "Monitoring, incident response, exception reviews, provider and model updates evaluated before rollout." },
      { name: "Improve", description: "A prioritized improvement backlog from real exceptions and feedback, delivered in regular cycles." },
    ],
    deliverables: ["Monthly quality, cost and usage report", "Evaluated change management", "Improvement cycles", "Governance documentation"],
    format: "Monthly service with response commitments agreed per system.",
  },
];

export const getOffer = (slug: string) => offers.find((o) => o.slug === slug);
export const primaryOffer = offers.find((o) => o.primary)!;
