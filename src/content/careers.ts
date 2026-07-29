import type { JobOpening } from "./types";

/** Copy transcribed from https://researchnxt.com/career/ */

export const careersHero = {
  eyebrow: "Careers",
  title: "Together with Research NXT",
  lede: "A vibrant work environment, in office and remote, focused on transforming market research globally.",
} as const;

export const whyJoin = {
  title: "Why work here",
  points: [
    {
      title: "Work that gets published",
      description:
        "Our research reaches marketing and technology leaders across India, APAC and MEA under your byline.",
    },
    {
      title: "Structured training",
      description:
        "New researchers progress through a structured programme rather than being left to figure it out.",
    },
    {
      title: "Flexible working",
      description:
        "A work-from-home policy designed around wellness and sustained productivity.",
    },
  ],
} as const;

export const openings: JobOpening[] = [
  {
    slug: "sales-development-representative",
    title: "Sales Development Representative",
    type: "Full time",
    location: "Pune / Remote",
    summary:
      "Manage client acquisition through product demonstrations and own the complete sales process from pitch to close.",
    responsibilities: [
      "Identify and qualify prospective clients for our research and data solutions",
      "Run product demonstrations tailored to the prospect's marketing goals",
      "Own the sales process end to end, from first pitch through to deal closure",
      "Work with the research team to scope engagements accurately",
    ],
  },
  {
    slug: "trainee-research-associate",
    title: "Trainee Research Associate",
    type: "Full time · Trainee",
    location: "Pune",
    summary:
      "Conduct secondary research and data compilation with precision while progressing through a structured training programme.",
    responsibilities: [
      "Conduct secondary research across assigned markets and accounts",
      "Compile and verify data with a high standard of accuracy",
      "Progress through the structured training programme",
      "Support senior researchers on report and interview programmes",
    ],
  },
];
