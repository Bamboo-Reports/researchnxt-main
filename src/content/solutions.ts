import { site } from "@/config/site";
import type { SolutionPage } from "./types";

/**
 * Copy transcribed from the live WordPress pages:
 *   /prospect-database/  /account-intelligence/  /research-based-marketing/
 * GCC Intelligence is represented by an external Bamboo Reports link below.
 */

const prospectDatabase: SolutionPage = {
  slug: "prospect-database",
  navLabel: "Prospect database",
  metaTitle: "Prospect Database",
  metaDescription:
    "On-demand custom prospect database with an industry-best accuracy rate and committed turnaround times.",

  hero: {
    eyebrow: "",
    headline: "Prospect Database",
    lede:
      "On-demand custom prospect database with an industry-best accuracy rate and committed turnaround times.",
    primary: {
      label: "Get a free database quality assessment",
      href: "/contact",
    },
  },

  proposition: {
    title:
      "Achieve greater campaigns success with our **on-demand custom prospect databases**",
    body: [
      "The impact of any marketing campaign relies on the quality of the prospect data in terms of accuracy of intended targets, preciseness of information, standardised quality of records and lowest bounce rate of emails.",
      "Nevertheless, the marketing campaign's success depends upon an effective strategy that you are already amazing at, and your focus should be only that. On the other hand, we are good at getting the right data to make your marketing campaigns successful. So, leave that part to us.",
    ],
  },

  capabilities: {
    title: "**Data append & management:** guaranteed campaign success",
    lede:
      "Power up your new market entry strategy with a custom on-demand prospect database and maximise your campaign effectiveness.",
    items: [
      {
        title: "ICP assessment & market sizing",
        icon: "target",
        points: [
          "Get estimates of target market data availability",
          {
            label: "Company information",
            tooltip: "12 firmographic data points",
          },
          { label: "Contact information", tooltip: "8 data points" },
        ],
      },
      {
        title: "Custom list building & contact discovery",
        icon: "list-search",
        points: [
          "Get estimates of target market data availability",
          {
            label: "Company information",
            tooltip: "12 firmographic data points",
          },
          { label: "Contact information", tooltip: "8 data points" },
        ],
      },
      {
        title: "Net new append\n& account coverage",
        icon: "append",
        points: [
          "Get estimates of key account data availability",
          "Append new custom titles in key accounts",
        ],
      },
      {
        title: "Data cleansing & enrichment",
        icon: "cleanse",
        points: [
          "Get data health analysis",
          "Check and update your existing",
          "Databases run regular data enrichment projects",
        ],
      },
    ],
  },

  outcome: {
    statement: "Hyper-focused B2B campaign data = Meaningful brand connects",
  },
};

const accountIntelligence: SolutionPage = {
  slug: "account-intelligence",
  navLabel: "Account intelligence",
  metaTitle: "Account Intelligence",
  metaDescription:
    "Ensures you gain heightened target account control, understand opportunities within whitespaces, and strategically develop your unique selling propositions.",

  hero: {
    eyebrow: "",
    headline: "Account Intelligence",
    lede:
      "Ensures you gain heightened target account control, understand opportunities within whitespaces, and strategically develop your unique selling propositions.",
    primary: {
      label: "Let's craft a personalised solution for you",
      href: "/contact",
    },
  },

  proposition: {
    title:
      "Get insider information with our **Account Intelligence solutions**",
    singleLine: true,
    body: [
      "Bespoke key account intelligence reports custom crafted to give you that much needed competitive edge.",
      "Our custom account and competitive intelligence approach ensure you gain 360-degree visibility within your target accounts and stay updated with competitor activities.",
    ],
  },

  capabilities: {
    title:
      "Know your customers and prospects better with our **Account Intelligence solutions**",
    body: [
      "Bespoke key account reports with deal insights, outsourcing heat maps, competitor intelligence, org charts, decision maker database, and strategic recommendations.",
    ],
    items: [
      {
        title: "Key account intelligence",
        icon: "account",
        points: [
          "Business snapshot",
          "Key financials",
          "Products & services mix",
          "Growth track",
          "Org structure",
          "IT landscape",
          "IT outsourcing and deal insights",
          "Decision makers & executive bios",
        ],
      },
      {
        title: "Competitor intelligence",
        icon: "competitor",
        points: [
          "Competitor business snapshot",
          "Products & services mix",
          "Product strategy",
          "Sales & marketing strategy",
          "SWOT analysis & business comparison",
          "Major deals",
          "Decision makers & executive bios",
        ],
      },
    ],
  },

  outcome: {
    statement: "360-degree account intelligence = Actionable prospect insights",
  },
};

const researchBasedMarketing: SolutionPage = {
  slug: "research-based-marketing",
  navLabel: "Research-based marketing",
  metaTitle: "Research-Based Marketing",
  metaDescription:
    "Ensures greater visibility, increased coverage, industry authority, and marketing spend optimisation.",

  hero: {
    eyebrow: "",
    headline: "Research-Based Marketing",
    lede:
      "Ensures greater visibility, increased coverage, industry authority, and marketing spend optimisation.",
    primary: {
      label: "Let's craft a personalised solution for you",
      href: "/contact",
    },
  },

  proposition: {
    title: "Connect effectively through **Research-Based Marketing**",
    body: [
      "High impact thought leadership marketing campaigns backed up with well researched and targeted content.",
      "Our Research-Based Marketing approach ensures you gain visibility, credibility, and personalised engagement opportunities within your target accounts' power structures.",
    ],
  },

  capabilities: {
    title: "**Credible & unique brand voice** aligned with your positioning",
    body: [
      "Today's savvy marketplace has very short attention spans, and to counter such acute snap judgements, careful content positioning is the key.",
      "You will need to ensure that your communications cut through the noise. To gain visibility, credibility, and initiate personalised engagement with your target accounts' power structures, your stories have to be compelling and yet insightful. Our Research-Based Marketing approach ensures you excel at it.",
    ],
    items: [
      {
        title: "Thought leadership\ncontent",
        icon: "content",
        points: [
          "Expert interviews",
          "Blog posts",
          "Podcasts",
          "Video",
          "Infographics",
          "Events/webinar",
        ],
      },
      {
        title: "ABM\ncampaigns",
        icon: "campaign",
        points: [
          "Interview series with key",
          "Account executives",
          "Key account surveys",
          "Branded downloadable content assets - MQLs",
        ],
      },
      {
        title: "Targeted leads\ncampaigns",
        icon: "funnel",
        points: [
          "Lookalike ICP market surveys",
          "White paper",
          "MQLs",
          "Ebooks",
          "Research reports",
        ],
      },
    ],
  },

  outcome: {
    statement:
      "Original research + custom marketing = Exclusive engagement & personalised experience",
  },
};

export const solutions: SolutionPage[] = [
  prospectDatabase,
  accountIntelligence,
  researchBasedMarketing,
];

export const gccIntelligenceLink = {
  slug: "gcc-intelligence",
  label: "GCC intelligence",
  href: site.bambooReports,
  external: true,
  description:
    "Research and intelligence on India's global capability centre ecosystem, published through Bamboo Reports.",
} as const;

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
