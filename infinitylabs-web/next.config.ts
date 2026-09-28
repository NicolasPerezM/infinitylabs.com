import type { NextConfig } from "next";

/**
 * Legacy Webflow routes → new information architecture (301).
 * Keeps inbound links and search equity from the current live site.
 */
const legacyRedirects = [
  { source: "/index.html", destination: "/", permanent: true },
  { source: "/nuestros-servicios", destination: "/solutions", permanent: true },
  { source: "/nuestros-servicios.html", destination: "/solutions", permanent: true },
  { source: "/nosotros", destination: "/about", permanent: true },
  { source: "/nosotros.html", destination: "/about", permanent: true },
  { source: "/our-process", destination: "/capabilities", permanent: true },
  { source: "/our-process.html", destination: "/capabilities", permanent: true },
  { source: "/contact-us-1", destination: "/contact", permanent: true },
  { source: "/contact-us-1.html", destination: "/contact", permanent: true },
  { source: "/contact-us-3", destination: "/contact", permanent: true },
  { source: "/contact-us-3.html", destination: "/contact", permanent: true },
  { source: "/growth-partner", destination: "/about", permanent: true },
  { source: "/growth-partner.html", destination: "/about", permanent: true },
  { source: "/mobius-chatbot", destination: "/labs", permanent: true },
  { source: "/mobius-chatbot.html", destination: "/labs", permanent: true },
  { source: "/landing-marketing", destination: "/", permanent: true },
  { source: "/landing-marketing.html", destination: "/", permanent: true },
  { source: "/blog", destination: "/", permanent: true },
  { source: "/blog.html", destination: "/", permanent: true },
  { source: "/career", destination: "/about", permanent: true },
  { source: "/career.html", destination: "/about", permanent: true },
  { source: "/faq", destination: "/offers/ai-opportunity-sprint", permanent: true },
  { source: "/faq.html", destination: "/offers/ai-opportunity-sprint", permanent: true },
  { source: "/testimonials", destination: "/", permanent: true },
  { source: "/testimonials.html", destination: "/", permanent: true },
  { source: "/pricing-2", destination: "/offers", permanent: true },
  { source: "/pricing-3", destination: "/offers", permanent: true },
  { source: "/home-:n(\\d)", destination: "/", permanent: true },
  { source: "/old-home", destination: "/", permanent: true },
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
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return legacyRedirects;
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
