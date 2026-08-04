import type { Stat } from "./types";

/** Copy transcribed from https://researchnxt.com/about-us/ */

export const aboutHero = {
  title: "About Us",
  lede: "The go-to partners for B2B tech marketing leaders",
} as const;

export const whoWeAre = {
  title: "Who we are?",
  body: [
    "Research NXT offers custom engagement solutions based on high-quality research to business and marketing leaders. We have an amazing track record of 5 years conceiving and delivering projects which add long-term, tangible value to our clients.",
    "Key offerings include Prospect Database enrichment and development, Account Intelligence on prospects and competitions, and Research-Based Marketing.",
    "Our approach combines the power of original research, custom content, and exclusive engagements to create a personalised solution for your B2B marketing campaigns.",
    "We handpick our research projects and deploy a team of industry & subject matter experts to ensure high-quality standards to deliver industry benchmark solutions.",
  ],
} as const;

export const aboutStats: Stat[] = [
  { value: "500k+", label: "Custom prospect lists" },
  { value: "1.5k+", label: "Key account maps" },
  { value: "250+", label: "CXO interviews" },
  { value: "20+", label: "Research reports" },
];

export const culture = {
  title: "Our culture",
  body: [
    "We have an inclusive culture that fosters collaboration, structure and continuous learning. This combination allows our team to perform efficiently and contribute both individually and unitedly. Research NXT is one of the most rewarding places to work, learn, and grow in its present phase. We provide a platform to every team member irrespective of the role, function, or experience level to bring innovative ideas to the table for our valued partners and us.",
    "We believe that good health, in general, can hugely impact productivity and thus, we have decided to continue Work From Home as long as necessary to create a conducive working environment.",
  ],
} as const;

export const leadership = {
  title: "Leadership",
  people: [
    {
      name: "Santosh Abraham",
      image: "/santosh.png",
      role: "Founder and Lead Analyst, Research NXT and Bamboo Reports",
      bio: [
        "22+ years across product development, market research, and technology go-to-market.",
        "Santosh leads product direction, data architecture, and client engagement personally, and publishes original research on enterprise technology featuring insights from CXOs and business leaders. Behind the platform is a dedicated analyst team that builds and refreshes the dataset every week.",
      ],
      affiliations: [
        "Visiting Faculty, AI, Digital Futures, and Emerging Technologies: FLAME University",
        "Visiting Coach: MIDAS School of Entrepreneurship",
        "Speaker and moderator: NASSCOM and industry platforms",
      ],
      social: [
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/santoshabraham/",
        },
        {
          label: "Twitter",
          href: "https://twitter.com/santoshabr?lang=en",
        },
      ],
    },
  ],
} as const;
