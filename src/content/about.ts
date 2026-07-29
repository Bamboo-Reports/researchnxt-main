import type { Stat } from "./types";

/** Copy transcribed from https://researchnxt.com/about-us/ */

export const aboutHero = {
  eyebrow: "About us",
  title: "The go-to partners for B2B tech marketing leaders",
  lede: "Research NXT delivers custom engagement solutions grounded in rigorous research for business and marketing professionals.",
} as const;

export const whoWeAre = {
  title: "Who we are",
  body: [
    "Research NXT delivers custom engagement solutions grounded in rigorous research for business and marketing professionals. We have a track record of conceiving and delivering projects that add long-term, tangible value.",
    "Our core offerings are Prospect Database Enrichment, Account Intelligence and Research-Based Marketing solutions.",
    "Our methodology merges original research, custom content and exclusive engagements into tailored B2B marketing campaign solutions, with industry experts handpicked for quality assurance.",
  ],
} as const;

export const aboutStats: Stat[] = [
  { value: "500k+", label: "Custom prospect lists" },
  { value: "1.5k+", label: "Key account maps" },
  { value: "250+", label: "CXO interviews" },
  { value: "20+", label: "Research reports" },
];

export const culture = {
  eyebrow: "Culture",
  title: "Collaborative, structured, and built for growth",
  body: [
    "We emphasise collaboration, structure and ongoing professional development. Innovative contributions are welcomed from every member of the team, regardless of seniority.",
    "We maintain a flexible work-from-home policy to support employee wellness and productivity.",
  ],
  points: [
    {
      title: "Collaboration by default",
      description:
        "Projects are run as a team, with expertise pulled in wherever it is needed.",
    },
    {
      title: "Structured development",
      description:
        "Ongoing professional development is part of how we work, not an annual afterthought.",
    },
    {
      title: "Flexible working",
      description:
        "A work-from-home policy that supports wellness and sustained productivity.",
    },
  ],
} as const;

export const leadership = {
  eyebrow: "Leadership",
  title: "The people behind the work",
  people: [
    {
      name: "Santosh Abraham",
      role: "Leadership",
      bio: "Nearly 20 years in market research and go-to-market strategy. Leads original content creation for B2B technology sectors across India, APAC and MEA.",
    },
  ],
} as const;
