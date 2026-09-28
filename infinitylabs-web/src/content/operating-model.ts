export type Stage = "discover" | "build" | "operate";

export type StageDefinition = {
  id: Stage;
  code: string;
  name: string;
  /** One-line promise, business language. */
  promise: string;
  /** What happens in this stage (used on hubs, not on the home). */
  description: string;
  items: string[];
  /** Delivery method steps that belong to this stage. */
  method: string[];
  capabilities: string[];
};

/**
 * The operating model is the conceptual spine of the site (BUSINESS_STRATEGY §7, DEC-005).
 * Labs is a fourth layer that feeds all three stages; see labs.ts.
 */
export const operatingModel: StageDefinition[] = [
  {
    id: "discover",
    code: "01",
    name: "Discover",
    promise: "Find where AI creates measurable value in your processes, and where it does not.",
    description:
      "We start from the business process, not the model. Discovery maps how work actually flows, quantifies the cost of manual steps, exceptions and delays, and scores each opportunity on value, feasibility, data readiness and risk. The output is a prioritized roadmap with architecture sketches and a business case, not a slide about the future.",
    items: ["Opportunity discovery", "Readiness assessment", "Process mapping", "Roadmap and business case"],
    method: ["Discovery", "Architecture"],
    capabilities: ["ai-transformation"],
  },
  {
    id: "build",
    code: "02",
    name: "Build",
    promise: "Engineer the system with the right mix of software, AI, agents and human approval.",
    description:
      "Build turns a prioritized opportunity into a production system: integration with your systems of record, deterministic logic where rules are known, AI where judgment is needed, agents where autonomy is safe, and human approval where the cost of error is high. Every system ships with an evaluation set and observability from the first release.",
    items: ["Agentic workflow systems", "Knowledge and document intelligence", "Data + AI foundations", "Integration and infrastructure"],
    method: ["Prototype", "Evaluate"],
    capabilities: ["ai-engineering", "agentic-systems", "data-ai"],
  },
  {
    id: "operate",
    code: "03",
    name: "Operate",
    promise: "Run it as a living system: evaluated, observed, governed and improved.",
    description:
      "Deployment is the beginning of the operating phase, not the end of the engagement. We monitor quality and cost, evaluate every model or prompt change against the same test sets, manage drift, review exceptions with your team and feed what we learn back into the system and the roadmap.",
    items: ["Managed AI", "Evaluation and quality gates", "Observability and cost control", "Continuous improvement"],
    method: ["Deploy", "Operate"],
    capabilities: ["ai-evaluation", "managed-ai"],
  },
];

export const stageColor: Record<Stage, { fill: string; soft: string; text: string }> = {
  discover: { fill: "bg-discover", soft: "bg-discover-soft", text: "text-discover-text" },
  build: { fill: "bg-build", soft: "bg-build-soft", text: "text-build-text" },
  operate: { fill: "bg-operate", soft: "bg-operate-soft", text: "text-operate-text" },
};
