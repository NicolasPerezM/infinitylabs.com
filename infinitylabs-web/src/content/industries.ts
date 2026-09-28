/**
 * Industry strategy (BUSINESS_STRATEGY §13). Only "typical environment" language is used
 * until delivery experience per sector is confirmed (GAP-013). No sector is claimed as a specialization.
 */

export type Industry = { name: string; where: string; claimLevel: "typical" | "verified" };

export const industries: Industry[] = [
  { name: "Retail and e-commerce", where: "customer operations, order and returns workflows, catalog and content operations", claimLevel: "typical" },
  { name: "Insurance", where: "claims intake and document processing, policy servicing, underwriting support", claimLevel: "typical" },
  { name: "Professional services", where: "knowledge systems, proposal and engagement workflows, delivery operations", claimLevel: "typical" },
  { name: "Legal", where: "contract review support, document intelligence, matter intake", claimLevel: "typical" },
  { name: "Fintech and financial services", where: "onboarding and KYC documents, customer operations, back-office controls", claimLevel: "typical" },
  { name: "Logistics", where: "shipment documents, exception handling, customer communication", claimLevel: "typical" },
  { name: "Healthcare", where: "administrative document flows, scheduling and patient communication operations", claimLevel: "typical" },
  { name: "Real estate", where: "lead qualification, listing operations, document-heavy transactions", claimLevel: "typical" },
  { name: "Manufacturing", where: "procurement and supplier documents, quality and compliance records, internal operations", claimLevel: "typical" },
];

export const industriesIntro =
  "These systems tend to pay off wherever a process is repetitive, document-heavy, spread across several tools and measured in cost or cycle time. The environments below are where we most often find that combination.";
