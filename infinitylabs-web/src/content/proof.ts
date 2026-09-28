/**
 * Proof registry. STRICT RULE (BUSINESS_STRATEGY §28): only entries with `verified: true`
 * and client permission are rendered. There are none today (GAP-005, GAP-006).
 */
export type CaseStudy = { slug: string; client: string; industry: string; headline: string; summary: string; outcomes: string[]; verified: boolean; permission: boolean };
export const caseStudies: CaseStudy[] = [];
export const verifiedCaseStudies = caseStudies.filter((c) => c.verified && c.permission);

export type Insight = { slug: string; title: string; summary: string; date: string; published: boolean };
export const insights: Insight[] = [];
export const publishedInsights = insights.filter((i) => i.published);
