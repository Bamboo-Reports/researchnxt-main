import type { JobOpening } from "./types";

/** Copy transcribed from https://researchnxt.com/career/ */

export const careersHero = {
  title: "Careers",
  lede:
    "We take pride in offering a vibrant and fulfilling work environment. Whether working in the office or remotely, you can be part of our team dedicated to revolutionising the market research industry globally.",
} as const;

export const openings: JobOpening[] = [
  {
    slug: "sales-development-representative",
    title: "Sales Development Representative",
    summary:
      "Drive end-to-end client acquisition by conducting product demos and managing the full sales cycle from demonstration to closure.",
  },
  {
    slug: "trainee-research-associate",
    title: "Trainee Research Associate",
    summary:
      "Support business insights by conducting secondary research and compiling data with accuracy, while learning through a structured training programme.",
  },
];
