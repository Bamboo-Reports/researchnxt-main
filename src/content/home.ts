import type { FeaturedResource } from "./types";

/** Copy transcribed from the live homepage at researchnxt.com. */

export const hero = {
  headline: "Turnkey research solutions personalised to your marketing goals.",
  cta: {
    label: "Let's craft your solution",
    href: "/contact",
  },
  /** A "\n" in a question is a chosen line break at larger widths; it
      collapses to a space in the narrow mobile column. */
  questions: [
    "Is the quality of your marketing leads\nimpacting revenue?",
    "Is your customer engagement based on account intelligence?",
    "Is a bad prospect database impacting\nmarketing ROI?",
  ],
} as const;

export const differentiators = {
  eyebrow: "Why Research NXT",
  title:
    "We have been evolving consistently and improving our competency to be the go-to partners for B2B marketers",
  items: [
    {
      title: "7+ years of experience",
      description:
        "A sustained track record of research-based solutions for B2B marketers.",
    },
    {
      title: "Ecosystem partners",
      description:
        "Partners with top enterprise events across marketing, sales and technology.",
    },
    {
      title: "Award recognised",
      description:
        "Recipient of the LinkedIn Content 50 and Adobe Digi100 awards.",
    },
    {
      title: "Enterprise trusted",
      description:
        "Trusted by top enterprises with their marketing initiatives.",
    },
  ],
} as const;

export const trustedLogos = [
  { name: "Ampera", src: "/logos/trusted/ampera.png" },
  { name: "Cytiva", src: "/logos/trusted/cytvia.png" },
  { name: "HCLTech", src: "/logos/trusted/hcl-tech.png" },
  { name: "Harman", src: "/logos/trusted/harman.png" },
  { name: "Mindtree", src: "/logos/trusted/mindtree.png" },
  { name: "Motherson", src: "/logos/trusted/motherson.png" },
  { name: "MoveInSync", src: "/logos/trusted/moveinsync.png" },
  { name: "Nasscom", src: "/logos/trusted/nasscom.png" },
  { name: "Pando", src: "/logos/trusted/pando.png" },
  { name: "Qyrus", src: "/logos/trusted/qyrus.png" },
  { name: "Ramco", src: "/logos/trusted/ramco.png" },
  { name: "Salesforce", src: "/logos/trusted/salesforce.png" },
  { name: "SLK", src: "/logos/trusted/slk.png" },
  { name: "Thoughtworks", src: "/logos/trusted/thoughtworks.png" },
  { name: "Yethi", src: "/logos/trusted/yethi.png" },
  { name: "Zoho", src: "/logos/trusted/zoho.png" },
  { name: "Zycus", src: "/logos/trusted/zycus.png" },
] as const;

/**
 * PHASE A: these three lists point at the live WordPress URLs because the
 * /resources routes do not exist yet. Phase B replaces them with a call into
 * the MDX content layer — the components consuming them do not change.
 */

export const featuredReports: FeaturedResource[] = [
  {
    kind: "Report",
    title:
      "Implementer's Guide to AI: Manufacturing, Automotive & Energy Leaders Move from Pilots to Scale",
    summary:
      "How industrial leaders are moving AI out of pilot projects and into production at scale.",
    href: "https://researchnxt.com/guide-to-ai/implementers-guide-to-ai-manufacturing-automotive-energy-leaders-move-from-pilots-to-scale/",
    external: true,
  },
  {
    kind: "Report",
    title: "Navigating Corporate Commute for GCCs in India",
    summary:
      "What the commute problem costs global capability centres, and how leaders are solving it.",
    href: "https://researchnxt.com/microsite/navigating-corporate-commute-for-gccs-in-india/",
    external: true,
  },
  {
    kind: "Guide",
    title: "The Four Waves of AI: A Ready Guide for Business Leaders",
    summary:
      "A framework for understanding where AI capability is heading and what to prepare for.",
    href: "https://researchnxt.com/guide-to-ai/the-four-waves-of-ai-a-ready-guide-for-business-leaders/",
    external: true,
  },
  {
    kind: "Report",
    title: "Unlocking the Power of Unified CX",
    summary:
      "Why fragmented customer experience stacks stall, and what unification actually requires.",
    href: "https://researchnxt.com/microsite/unlocking-the-power-of-unified-cx/",
    external: true,
  },
];

export const featuredInterviews: FeaturedResource[] = [
  {
    kind: "Interview",
    title:
      "AI in Manufacturing: Driving Digital Transformation and Intelligent Operations",
    summary: "Thought leader perspective on intelligent operations.",
    href: "https://researchnxt.com/guide-to-ai/ai-in-manufacturing-driving-digital-transformation-and-intelligent-operations/",
    external: true,
  },
  {
    kind: "Interview",
    title:
      "Lloyd Mathias on the positive side of AI and the importance of data privacy",
    summary: "On balancing personalisation against privacy obligations.",
    href: "https://researchnxt.com/experts-view/lloyd-mathias-ai-led-personalization/",
    external: true,
  },
  {
    kind: "Interview",
    title: "Scott Brinker's view on AI in marketing & the future of Martech",
    summary:
      "Marketing data as the engine feeding AI possibilities in marketing.",
    href: "https://researchnxt.com/experts-view/ai-in-marketing-interview-scott-brinker/",
    external: true,
  },
  {
    kind: "Interview",
    title:
      "David Raab on how AI and CDP can unlock the possibilities for marketers",
    summary: "Where customer data platforms fit in an AI-led stack.",
    href: "https://researchnxt.com/experts-view/ai-and-cdp-interview-david-raab/",
    external: true,
  },
];

export const quickReads: FeaturedResource[] = [
  {
    kind: "Article",
    title:
      "Unified Customer Experience: The Next Frontier for Businesses in Qatar",
    summary: "",
    href: "https://researchnxt.com/customer-experience/unified-customer-experience-the-next-frontier-for-businesses-in-qatar/",
    external: true,
  },
  {
    kind: "Article",
    title: "AI is the Future, and the Future is Now",
    summary: "",
    href: "https://researchnxt.com/guide-to-ai/ai-is-the-future-and-the-future-is-now-a-preview-of-the-implementors-guide-to-ai/",
    external: true,
  },
  {
    kind: "Article",
    title:
      "Automate, Target, Win in 2024: How Marketing Automation Supercharges Your Campaigns",
    summary: "",
    href: "https://researchnxt.com/campaign-management/how-marketing-automation-supercharges-your-campaigns/",
    external: true,
  },
  {
    kind: "Article",
    title: "2024 Outlook on Maturing Digital CX and the Role of Indian GCCs",
    summary: "",
    href: "https://researchnxt.com/bambooreports/indian-gccs-digital-cx-outlook-2024/",
    external: true,
  },
];
