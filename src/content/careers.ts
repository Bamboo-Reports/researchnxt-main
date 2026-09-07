import type { JobOpening } from "./types";

/** Copy transcribed from https://researchnxt.com/career/ */

export const careersHero = {
  title: "Careers",
  /** Search-snippet length; the page lede runs longer than a SERP shows. */
  metaDescription:
    "Open roles at Research NXT: join the team revolutionising market research, in office or remote, and apply directly on this page.",
  lede:
    "We take pride in offering a vibrant and fulfilling work environment. Whether working in the office or remotely, you can be part of our team dedicated to revolutionising the market research industry globally.",
} as const;

/** Band headings on the careers page. */
export const careersBands = {
  openings: "Positions we are currently hiring for",
  apply: "What are you looking for in your next job?",
} as const;

export const openings: JobOpening[] = [
  {
    slug: "sales-development-representative",
    title: "Sales Development Representative",
    summary:
      "Drive end-to-end client acquisition by conducting product demos and managing the full sales cycle from demonstration to closure.",
  },
];
