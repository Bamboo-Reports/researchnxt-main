import type { NextConfig } from "next";

/**
 * Phase A redirect map — every WordPress URL for a core page, plus the pages
 * being retired. Sources are written without a trailing slash: Next normalises
 * `/about-us/` to `/about-us` before matching, so both forms are covered.
 *
 * Content URLs (/blog/…, /experts-view/…, /microsite/…, /case-study/… and the
 * other WP category prefixes) are deliberately NOT here — their targets do not
 * exist until Phase B, and redirecting them now would break working pages.
 */
const redirectMap: { source: string; destination: string }[] = [
  // Core page renames
  { source: "/about-us", destination: "/about" },
  { source: "/career", destination: "/careers" },
  { source: "/contact-us", destination: "/contact" },
  { source: "/policy", destination: "/privacy-policy" },

  // GCC Intelligence now lives entirely on Bamboo Reports.
  { source: "/gcc-insights", destination: "https://bambooreports.com/" },
  {
    source: "/solutions/gcc-intelligence",
    destination: "https://bambooreports.com/",
  },

  // NOTE: the survey and raffle terms routes were pulled for now, so the three
  // legacy WordPress terms URLs have no target and are deliberately absent
  // here. Redirecting them at the privacy policy would send readers to a
  // document that does not answer what they came for. Restore these rules
  // alongside the routes when the terms pages come back.

  // Four near-identical pre-engagement funnels collapse into one contact page
  { source: "/prospect-database-peq", destination: "/contact" },
  { source: "/account-intelligence-peq", destination: "/contact" },
  { source: "/research-based-marketing-peq", destination: "/contact" },
  { source: "/pre-engagement-questionnaire", destination: "/contact" },

  // Superseded confirmation / download landings
  { source: "/pd-datasheet-download", destination: "/thank-you" },
  { source: "/thank-you-for-early-access-req", destination: "/thank-you" },

  // Elementor scaffolding and an expired 2021 survey — no equivalent content
  { source: "/element-page", destination: "/" },
  { source: "/elementor-41865", destination: "/" },
  { source: "/the-2021-india-cloud-computing-survey", destination: "/" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return redirectMap.map((entry) => ({ ...entry, permanent: true }));
  },
};

export default nextConfig;
