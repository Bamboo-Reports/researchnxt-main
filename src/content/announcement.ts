import { site } from "@/config/site";

/**
 * The announcement bar pinned above the navbar, currently promoting the
 * quarterly India GCC report on Bamboo Reports. Drop the export from the
 * navbar to retire it when the campaign ends.
 */
export const announcement = {
  message: "The Q2 India GCC report: every GCC move, tracked.",
  /** Shorter line for narrow viewports. */
  messageShort: "The Q2 India GCC report.",
  cta: "Download for free",
  ctaShort: "Download",
  href: `${site.bambooReports}reports/india-gcc-report-q2-2026?src=rnxt-announce`,
} as const;
