import { verifiedCaseStudies } from "@/content/proof";

/**
 * Selected proof (strategy §21 step 07). STRICT RULE §28: renders nothing until verified,
 * client-permissioned case studies exist (DEC-013). The section is added here, in its
 * narrative position, so enabling it is a content change, not a layout change.
 */
export function Proof() {
  if (verifiedCaseStudies.length === 0) return null;
  return null; // TODO(GAP-006): render localized case-study rows once the first verified entry exists.
}
