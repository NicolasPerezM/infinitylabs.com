/**
 * Measurement layer (docs/ANALYTICS_PLAN.md).
 * No provider is loaded unless NEXT_PUBLIC_ANALYTICS_PROVIDER is set.
 * Events are dispatched through `track()`; the AnalyticsProvider component
 * wires DOM clicks on `[data-event]` elements to it.
 */

export type AnalyticsEvent =
  | "hero_primary_cta"
  | "hero_secondary_cta"
  | "opportunity_sprint_cta"
  | "solution_view"
  | "capability_view"
  | "offer_view"
  | "case_study_view"
  | "labs_view"
  | "contact_start"
  | "contact_submit"
  | "contact_error"
  | "calendly_click"
  | "nav_cta";

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, options?: { props?: Props }) => void;
  }
}

export const analyticsProvider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ?? "none";

export function track(event: AnalyticsEvent | string, props: Props = {}): void {
  if (typeof window === "undefined") return;
  const payload = { ...props, path: window.location.pathname };
  switch (analyticsProvider) {
    case "gtag":
      window.gtag?.("event", event, payload);
      break;
    case "plausible":
      window.plausible?.(event, { props: payload });
      break;
    case "datalayer":
      (window.dataLayer ??= []).push({ event, ...payload });
      break;
    default:
      if (process.env.NODE_ENV === "development") {
        console.debug("[analytics:noop]", event, payload);
      }
  }
}
