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

  // The five /guide-to-ai/ articles that are now published under Insights.
  // The rest of that prefix is interviews and still has no target, so it stays
  // out of this map; these five are listed one by one rather than as a rule.
  {
    source:
      "/guide-to-ai/ai-is-the-future-and-the-future-is-now-a-preview-of-the-implementors-guide-to-ai",
    destination:
      "/resources/insights/implementers-guide-to-ai/ai-is-the-future-and-the-future-is-now",
  },
  {
    source:
      "/guide-to-ai/implementers-guide-to-ai-finance-leaders-transition-from-caution-to-customer-centric-scale",
    destination:
      "/resources/insights/implementers-guide-to-ai/finance-leaders-transition-from-caution-to-customer-centric-scale",
  },
  {
    source:
      "/guide-to-ai/implementers-guide-to-ai-manufacturing-automotive-energy-leaders-move-from-pilots-to-scale",
    destination:
      "/resources/insights/implementers-guide-to-ai/manufacturing-automotive-energy-leaders-move-from-pilots-to-scale",
  },
  {
    source:
      "/guide-to-ai/implementers-guide-to-ai-retail-consumer-goods-leaders-shift-from-experiments-to-loyalty-led-scale",
    destination:
      "/resources/insights/implementers-guide-to-ai/retail-consumer-goods-leaders-shift-from-experiments-to-loyalty-led-scale",
  },
  {
    source:
      "/guide-to-ai/the-four-waves-of-ai-a-ready-guide-for-business-leaders",
    destination:
      "/resources/insights/implementers-guide-to-ai/the-four-waves-of-ai-a-ready-guide-for-business-leaders",
  },

  // The one /campaign-management/ article published under Insights so far.
  {
    source:
      "/campaign-management/how-marketing-automation-supercharges-your-campaigns",
    destination:
      "/resources/insights/automation-campaign-management/automate-target-win-in-2024",
  },

  // The one /customer-experience/ article published under Insights so far.
  {
    source:
      "/customer-experience/unified-customer-experience-the-next-frontier-for-businesses-in-qatar",
    destination:
      "/resources/insights/unlocking-the-power-unified-cx/unified-customer-experience-the-next-frontier-for-businesses-in-qatar",
  },

  // The one /gcc-commute/ article published under Insights so far.
  {
    source:
      "/gcc-commute/rethinking-the-daily-commute-why-unified-mobility-is-becoming-a-strategic-priority-for-gccs-in-india",
    destination:
      "/resources/insights/navigating-corporate-commute-for-gccs-in-india/rethinking-the-daily-commute",
  },

  // The one /bambooreports/ article published under Insights so far. The rest
  // of that prefix is the GCC CX interviews and the eBook microsite.
  {
    source: "/bambooreports/indian-gccs-digital-cx-outlook-2024",
    destination:
      "/resources/insights/transforming-cx-through-gccs/indian-gccs-digital-cx-outlook-2024",
  },

  // The three 2021 cloud articles published under Insights.
  {
    source:
      "/cloud-computing/top-5-cloud-computing-trends-that-india-needs-to-know",
    destination:
      "/resources/insights/cloud-computing-new-normal-beyond/top-5-cloud-computing-trends",
  },
  {
    source: "/cloud-computing/top-5-cloud-adoption-trends-in-2021",
    destination:
      "/resources/insights/cloud-computing-new-normal-beyond/top-5-cloud-adoption-trends",
  },
  {
    source:
      "/blog/the-new-normal-accelerate-india-inc-s-need-for-cloud-computing-in-2021-beyond",
    destination:
      "/resources/insights/cloud-computing-new-normal-beyond/the-new-normal-cloud-computing",
  },

  // The 2021 Southeast Asia articles and launch event.
  {
    source: "/business-strategy/5-major-business-rebound-strategies",
    destination:
      "/resources/insights/south-east-asia-response-guide/5-major-business-rebound-strategies",
  },
  {
    source:
      "/business-strategy/key-takeaways-from-the-best-of-business-strategies",
    destination:
      "/resources/insights/south-east-asia-response-guide/key-takeaways-business-strategies",
  },
  {
    source: "/events/business-strategy-report-launch-event",
    destination:
      "/resources/events/south-east-asia-response-guide/business-strategy-report-launch",
  },

  {
    source: "/events/ai-led-ebook-launch",
    destination: "/resources/events/ai-led-personalization/ai-led-ebook-launch",
  },

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
