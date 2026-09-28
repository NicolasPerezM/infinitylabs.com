export type NavItem = { label: string; href: string; description?: string };

/** Primary navigation. Routes without verified content are intentionally absent (DEC-004). */
export const primaryNav: NavItem[] = [
  { label: "Solutions", href: "/solutions" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Offers", href: "/offers" },
  { label: "Labs", href: "/labs" },
  { label: "About", href: "/about" },
];

export const headerCta = { label: "Start a Sprint", href: "/contact?intent=sprint", event: "nav_cta" } as const;

export const footerColumns: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Solutions",
    items: [
      { label: "Enterprise Knowledge", href: "/solutions/knowledge-ai" },
      { label: "Document Intelligence", href: "/solutions/document-intelligence" },
      { label: "Customer Operations", href: "/solutions/customer-operations" },
      { label: "Revenue Systems", href: "/solutions/revenue-systems" },
      { label: "Intelligent Operations", href: "/solutions/intelligent-operations" },
    ],
  },
  {
    heading: "Capabilities",
    items: [
      { label: "AI Transformation", href: "/capabilities/ai-transformation" },
      { label: "AI Engineering", href: "/capabilities/ai-engineering" },
      { label: "Agentic Systems", href: "/capabilities/agentic-systems" },
      { label: "Data + AI", href: "/capabilities/data-ai" },
      { label: "AI Evaluation", href: "/capabilities/ai-evaluation" },
      { label: "Managed AI", href: "/capabilities/managed-ai" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "Offers", href: "/offers" },
      { label: "AI Opportunity Sprint", href: "/offers/ai-opportunity-sprint" },
      { label: "Labs", href: "/labs" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
