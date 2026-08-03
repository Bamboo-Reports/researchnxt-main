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
    "On-demand custom prospect database with industry-best accuracy rate and turnaround-time commitment: ICP assessment, list building, contact discovery and data enrichment.",

  hero: {
    eyebrow: "Solution",
    headline:
      "On-demand custom prospect database with industry-best accuracy and TAT commitment",
    lede: "Your campaign's success depends on an effective strategy, something you are already amazing at. Your focus should be only that. Leave the data to us.",
    primary: {
      label: "Get a free database quality assessment",
      href: "/contact",
    },
    secondary: { label: "Talk to our team", href: "/contact" },
  },

  proposition: {
    title: "Hyper-focused B2B campaign data means meaningful brand connects",
    body: [
      "Marketing success depends on the quality of the data underneath it. A stale or poorly targeted database quietly erodes deliverability, wastes campaign spend and distorts every downstream metric you report on.",
      "We build prospect data to the shape of your ideal customer profile, verify it against multiple sources, and commit to a turnaround time, so your team spends its energy on strategy and creative rather than on chasing records.",
    ],
  },

  capabilities: {
    title: "What we do",
    lede: "Four capabilities that can be engaged individually or as an end-to-end programme.",
    items: [
      {
        title: "ICP assessment",
        description:
          "We size the addressable market and tell you what data actually exists before you commit budget to a campaign.",
        points: [
          "Market data availability estimates",
          "12 firmographic data points",
          "8 contact data points",
        ],
      },
      {
        title: "Custom list building & contact discovery",
        description:
          "Target market analysis and prospect identification built to your segment definition, not pulled off a shelf.",
        points: [
          "Target market analysis",
          "Prospect identification and verification",
          "Segment-specific list construction",
        ],
      },
      {
        title: "Net new append & account coverage",
        description:
          "Deepen coverage inside the accounts that matter with the specific titles your campaign needs to reach.",
        points: [
          "Key account data",
          "Custom title appending",
          "Coverage gap analysis",
        ],
      },
      {
        title: "Data cleansing & enrichment",
        description:
          "Regular health analysis and updates so the database you invested in does not decay between campaigns.",
        points: [
          "Database health analysis",
          "Regular database updates",
          "Deduplication and standardisation",
        ],
      },
    ],
  },

  detail: {
    title: "What an ICP assessment covers",
    lede: "Before any list is built, we establish what is knowable about your market.",
    stats: [
      { value: "12", label: "Firmographic data points" },
      { value: "8", label: "Contact data points" },
      { value: "500k+", label: "Custom prospect records delivered" },
    ],
  },

  outcome: {
    statement: "Hyper-focused B2B campaign data = meaningful brand connects",
    description:
      "Accurate, well-segmented data is the difference between a campaign that reaches an inbox and one that reaches a decision maker.",
  },

  cta: {
    title: "Get a free database quality assessment",
    lede: "Send us a sample of your current database and we will tell you what it is costing you.",
    primary: { label: "Request an assessment", href: "/contact" },
  },
};

const accountIntelligence: SolutionPage = {
  slug: "account-intelligence",
  navLabel: "Account Intelligence",
  metaTitle: "Account Intelligence",
  metaDescription:
    "Bespoke key account and competitor intelligence reports giving 360-degree visibility inside your target accounts.",

  hero: {
    eyebrow: "Solution",
    headline:
      "360-degree visibility inside the accounts you are trying to win",
    lede: "Gain heightened target account control, understand the opportunities within whitespaces, and strategically develop your unique selling propositions.",
    primary: { label: "Let's craft a personalized solution", href: "/contact" },
    secondary: { label: "Request the datasheet", href: "/contact" },
  },

  proposition: {
    title: "Bespoke intelligence, not a database subscription",
    body: [
      "Generic account data tells you who a company is. It does not tell you where your opportunity sits, who decides, or what your competitor has already sold them.",
      "We combine account data with competitive analysis into reports built for a specific pursuit, so your sellers walk into the room knowing the org chart, the IT landscape and the deals that came before them.",
    ],
  },

  capabilities: {
    title: "Two intelligence streams",
    lede: "Commissioned per account, per competitor, or as an ongoing programme.",
    items: [
      {
        title: "Key account intelligence",
        description:
          "Everything your team needs to build a credible, specific point of view on a target account.",
        points: [
          "Business snapshot and financial data",
          "Products and services analysis",
          "Organizational structure and IT landscape",
          "Decision maker database with executive biographies",
          "Deal insights and outsourcing heat maps",
        ],
      },
      {
        title: "Competitor intelligence",
        description:
          "A clear read on who else is in the account and how they are positioning against you.",
        points: [
          "Business snapshot and product/service mix",
          "Product, sales and marketing strategy",
          "SWOT analysis and business comparison",
          "Major deals tracking",
          "Executive information",
        ],
      },
    ],
  },

  detail: {
    title: "Delivered at scale",
    stats: [
      { value: "1.5k+", label: "Key account maps delivered" },
      { value: "250+", label: "CXO interviews conducted" },
      { value: "20+", label: "Research reports published" },
    ],
  },

  outcome: {
    statement: "Whitespace becomes a plan, not a guess",
    description:
      "When your team can see the structure, spend and existing commitments inside an account, the sales conversation changes from pitching to positioning.",
  },

  cta: {
    title: "Let's craft a personalized solution for you",
    lede: "Tell us which accounts you are targeting and we will scope an intelligence programme around them.",
    primary: { label: "Contact Us", href: "/contact" },
  },
};

const researchBasedMarketing: SolutionPage = {
  slug: "research-based-marketing",
  navLabel: "Research-based Marketing",
  metaTitle: "Research-based Marketing",
  metaDescription:
    "Original research combined with custom marketing: thought leadership content, ABM campaigns and targeted lead campaigns for B2B technology brands.",

  hero: {
    eyebrow: "Solution",
    headline: "Original research + custom marketing = exclusive engagement",
    lede: "Ensures greater visibility, increased coverage, industry authority and marketing spend optimization.",
    primary: { label: "Let's craft a personalized solution", href: "/contact" },
    secondary: { label: "Request the datasheet", href: "/contact" },
  },

  proposition: {
    title: "Cut through the noise with something only you can say",
    body: [
      "The marketplace is saturated with content that restates what everyone already knows. Compelling, insightful material, the kind that earns a download and a conversation, has to be grounded in something original.",
      "We run the research, then build the campaign around it: interviews, surveys and reports that give your brand a position no competitor can copy, and that keep working long after the launch.",
    ],
  },

  capabilities: {
    title: "Three campaign types",
    lede: "Each built on primary research we conduct for you.",
    items: [
      {
        title: "Thought leadership content",
        description:
          "Establish authority with a body of work built on expert perspectives from your market.",
        points: [
          "Expert interviews",
          "Blog posts",
          "Podcasts and video",
          "Infographics",
          "Events and webinars",
        ],
      },
      {
        title: "ABM campaigns",
        description:
          "Research-led programmes designed around a named account list rather than a broad audience.",
        points: [
          "Interview series",
          "Key account surveys",
          "Branded downloadable content assets",
        ],
      },
      {
        title: "Targeted leads campaigns",
        description:
          "Gated research assets built to attract and qualify the specific buyer you are after.",
        points: [
          "ICP market surveys",
          "Whitepapers and eBooks",
          "Research reports",
        ],
      },
    ],
  },

  outcome: {
    statement: "Original research + custom marketing = exclusive engagement",
    description:
      "Research gives your campaign a reason to exist. Custom marketing gives it reach. Together they produce engagements your competitors cannot replicate.",
  },

  cta: {
    title: "Let's craft a personalized solution for you",
    lede: "Bring us a marketing goal and we will design the research programme that supports it.",
    primary: { label: "Contact Us", href: "/contact" },
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

export const solutionsHub = {
  eyebrow: "Solutions",
  title: "Custom engagement solutions built on high-quality research",
  lede: "Research NXT offers custom engagement solutions based on high-quality research to business and marketing leaders. Every engagement combines original research, custom content and exclusive access.",
  methodology: {
    title: "How we work",
    lede: "Our methodology merges original research, custom content and exclusive engagements into tailored B2B marketing campaign solutions, with industry experts handpicked for quality assurance.",
    steps: [
      {
        title: "Original research",
        description:
          "Primary surveys and interviews conducted in your market, not repackaged secondary data.",
      },
      {
        title: "Custom content",
        description:
          "Reports, interview series and campaign assets built around the findings and your brand.",
      },
      {
        title: "Exclusive engagements",
        description:
          "Roundtables, launches and interview programmes that put your brand in the room with buyers.",
      },
    ],
  },
} as const;
