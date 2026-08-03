import { site } from "@/config/site";
import type { SolutionPage } from "./types";

/**
 * Copy transcribed from the live WordPress pages:
 *   /prospect-database/  /account-intelligence/  /research-based-marketing/
 * GCC Intelligence is represented by an external Bamboo Reports link below.
 */

const prospectDatabase: SolutionPage = {
  slug: "prospect-database",
  navLabel: "Prospect Database",
  metaTitle: "Prospect Database",
  metaDescription:
    "On-Demand Custom Prospect Database with Industry-Best Accuracy rate & TAT Commitment",

  hero: {
    eyebrow: "",
    headline: "Prospect Database",
    lede:
      "On-Demand Custom Prospect Database with Industry-Best Accuracy rate & TAT Commitment",
    primary: {
      label: "Get a Free Database Quality Assessment",
      href: "/contact",
    },
  },

  proposition: {
    title:
      "Achieve greater campaigns success with our **On-Demand Custom Prospect Databases**",
    body: [
      "The impact of any marketing campaign relies on the quality of the prospect data in terms of accuracy of intended targets, preciseness of information, standardized quality of records and lowest bounce rate of emails.",
      "Nevertheless, the marketing campaign’s success depends upon an effective strategy that you are already amazing at, and your focus should be only that. On the other hand, we are good at getting the right data to make your marketing campaigns successful. So, leave that part to us.",
    ],
  },

  capabilities: {
    title: "**Data Append & Management:** Guaranteed Campaign Success",
    lede:
      "Power up your New Market Entry strategy with a Custom OnDemand Prospect Database and maximize your campaign effectiveness.",
    items: [
      {
        title: "ICP Assessment & Market Sizing",
        icon: "target",
        points: [
          "Get Estimates of Target Market Data Availability",
          {
            label: "Company Information",
            tooltip: "12 Firmographic Data Points",
          },
          { label: "Contact Information", tooltip: "8 Data Points" },
        ],
      },
      {
        title: "Custom List Building & Contact Discovery",
        icon: "list-search",
        points: [
          "Get Estimates of Target Market Data Availability",
          {
            label: "Company Information",
            tooltip: "12 Firmographic Data Points",
          },
          { label: "Contact Information", tooltip: "8 Data Points" },
        ],
      },
      {
        title: "Net New Append\n& Account Coverage",
        icon: "append",
        points: [
          "Get Estimates of Key Account Data Availability",
          "Append New Custom Titles in Key Accounts",
        ],
      },
      {
        title: "Data Cleansing & Enrichment",
        icon: "cleanse",
        points: [
          "Get Data Health Analysis",
          "Check and Update your existing",
          "Databases Run Regular Data Enrichment Projects",
        ],
      },
    ],
  },

  outcome: {
    statement: "Hyper-focused B2B Campaign Data = Meaningful Brand Connects",
  },
};

const accountIntelligence: SolutionPage = {
  slug: "account-intelligence",
  navLabel: "Account Intelligence",
  metaTitle: "Account Intelligence",
  metaDescription:
    "Ensures you gain heightened target account control, understand opportunities within whitespaces, and strategically develop your unique selling propositions.",

  hero: {
    eyebrow: "",
    headline: "Account Intelligence",
    lede:
      "Ensures you gain heightened target account control, understand opportunities within whitespaces, and strategically develop your unique selling propositions.",
    primary: {
      label: "Let’s craft a personalized solution for you",
      href: "/contact",
    },
  },

  proposition: {
    title:
      "Get insider information with our **Account Intelligence Solutions**",
    singleLine: true,
    body: [
      "Bespoke key account intelligence reports custom crafted to give you that much needed competitive edge.",
      "Our custom account and competitive intelligence approach ensure you gain 360-degree visibility within your target accounts and stay updated with competitor activities.",
    ],
  },

  capabilities: {
    title:
      "Know your customers and prospects better with our **Account Intelligence Solutions**",
    body: [
      "Bespoke Key Account Reports with Deal Insights, Outsourcing Heat Maps, Competitor Intelligence, Org Charts, Decision Maker Database, and Strategic Recommendations.",
    ],
    items: [
      {
        title: "Key Account Intelligence",
        icon: "account",
        points: [
          "Business Snapshot",
          "Key Financials",
          "Products & Services Mix",
          "Growth Track",
          "Org Structure",
          "IT Landscape",
          "IT Outsourcing and Deal Insights",
          "Decision Makers & Executive Bios",
        ],
      },
      {
        title: "Competitor Intelligence",
        icon: "competitor",
        points: [
          "Competitor Business Snapshot",
          "Products & Services Mix",
          "Product Strategy",
          "Sales & Marketing Strategy",
          "SWOT Analysis & Business Comparison",
          "Major Deals",
          "Decision Makers & Executive Bios",
        ],
      },
    ],
  },

  outcome: {
    statement: "360 Degree Account Intelligence = Actionable Prospect Insights",
  },
};

const researchBasedMarketing: SolutionPage = {
  slug: "research-based-marketing",
  navLabel: "Research-based Marketing",
  metaTitle: "Research-Based Marketing",
  metaDescription:
    "Ensures greater visibility, increased coverage, industry authority, and marketing spend optimization.",

  hero: {
    eyebrow: "",
    headline: "Research-Based Marketing",
    lede:
      "Ensures greater visibility, increased coverage, industry authority, and marketing spend optimization.",
    primary: {
      label: "Let’s craft a personalized solution for you",
      href: "/contact",
    },
  },

  proposition: {
    title: "Connect Effectively through **Research-Based Marketing**",
    body: [
      "Hight impact thought leadership marketing campaigns backed up with well researched and targeted content.",
      "Our Research-Based Marketing approach ensures you gain visibility, credibility, and personalized engagement opportunities within your target accounts’ power structures.",
    ],
  },

  capabilities: {
    title: "**Creditable & Unique Brand Voice** aligned with your positioning",
    body: [
      "Today’s savvy marketplace have very short attention spans, and to counter such acute snap judgements, careful content positioning is the key.",
      "You will need to ensure that your communications cut through the noise. To gain visibility, credibility, and initiate personalized engagement with your target accounts’ power structures, your stories have to be compelling and yet insightful. Our Research-Based Marketing approach ensures you excel at it.",
    ],
    items: [
      {
        title: "Thought Leadership\nContent",
        icon: "content",
        points: [
          "Expert Interviews",
          "Blog Posts",
          "Podcasts",
          "Video",
          "Infographics",
          "Events/webinar",
        ],
      },
      {
        title: "ABM\nCampaigns",
        icon: "campaign",
        points: [
          "Interview Series with Key",
          "Account Executives",
          "Key Account Surveys",
          "Branded Downloadable Content Assets - MQLs",
        ],
      },
      {
        title: "Targeted Leads\nCampaigns",
        icon: "funnel",
        points: [
          "LookaLike ICP Market Surveys",
          "White paper",
          "MQL's",
          "Ebooks",
          "Research Report's",
        ],
      },
    ],
  },

  outcome: {
    statement:
      "Original Research + Custom Marketing = Exclusive Engagement & Personalized Experience",
  },
};

export const solutions: SolutionPage[] = [
  prospectDatabase,
  accountIntelligence,
  researchBasedMarketing,
];

export const gccIntelligenceLink = {
  slug: "gcc-intelligence",
  label: "GCC Intelligence",
  href: site.bambooReports,
  external: true,
  description:
    "Research and intelligence on India's global capability centre ecosystem, published through Bamboo Reports.",
} as const;

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
