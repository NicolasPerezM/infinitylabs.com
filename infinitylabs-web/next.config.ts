import type { NextConfig } from "next";

/**
 * Legacy Webflow routes → new information architecture (301). Spanish is the default locale,
 * and the legacy site was Spanish, so legacy paths land on /es.
 */
const legacy: [string, string][] = [
  ["/index.html", "/es"],
  ["/nuestros-servicios", "/es/solutions"],
  ["/nuestros-servicios.html", "/es/solutions"],
  ["/nosotros", "/es/about"],
  ["/nosotros.html", "/es/about"],
  ["/our-process", "/es/capabilities"],
  ["/our-process.html", "/es/capabilities"],
  ["/contact-us-1", "/es/contact"],
  ["/contact-us-1.html", "/es/contact"],
  ["/contact-us-3", "/es/contact"],
  ["/contact-us-3.html", "/es/contact"],
  ["/growth-partner", "/es/about"],
  ["/growth-partner.html", "/es/about"],
  ["/mobius-chatbot", "/es/labs"],
  ["/mobius-chatbot.html", "/es/labs"],
  ["/landing-marketing", "/es"],
  ["/landing-marketing.html", "/es"],
  ["/blog", "/es"],
  ["/blog.html", "/es"],
  ["/career", "/es/about"],
  ["/career.html", "/es/about"],
  ["/faq", "/es/offers/ai-opportunity-sprint"],
  ["/faq.html", "/es/offers/ai-opportunity-sprint"],
  ["/testimonials", "/es"],
  ["/testimonials.html", "/es"],
  ["/pricing-2", "/es/offers"],
  ["/pricing-3", "/es/offers"],
  ["/old-home", "/es"],
];

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      ...legacy.map(([source, destination]) => ({ source, destination, permanent: true })),
      { source: "/home-:n(\\d)", destination: "/es", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
