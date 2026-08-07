import { getExpertInterview, interviewHref } from "@/content/experts-view";
import { latestReports } from "@/content/resources";
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
    "Is your customer engagement based on\naccount intelligence?",
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
 * The home page's two resource bands. Both are derived from the registries
 * rather than hand-maintained, so a new report or interview cannot leave a
 * stale card behind, and a wrong slug fails the build instead of rendering a
 * dead link.
 */

/** The four most recently published reports, newest first. */
export const featuredReports: FeaturedResource[] = latestReports(4).map(
  (report) => ({
    kind: "Report",
    title: report.hero.title,
    /* No lede under the card, matching the interview cards: cover artwork,
       clamped title, "Read more". */
    summary: "",
    href: `/resources/reports-whitepapers/${report.slug}`,
    image: report.cardImage,
  }),
);

/**
 * Four interviews from across the library, chosen for range rather than
 * recency: the two analysts most readers will recognise, and two operators
 * from the newest programme. Named by project and person, and resolved
 * through the registry so the title, banner and URL stay in one place.
 */
const featured: [project: string, person: string][] = [
  ["ai-led-personalization", "scott-brinker"],
  ["ai-led-personalization", "david-raab"],
  ["implementors-guide-to-ai", "karthik-anantharaman"],
  ["navigating-corporate-commute-for-gccs-in-india", "protick-basu"],
];

export const featuredInterviews: FeaturedResource[] = featured.map(
  ([project, person]) => {
    const interview = getExpertInterview(project, person);
    if (!interview) {
      throw new Error(`Unknown interview: ${project}/${person}`);
    }
    return {
      kind: "Interview",
      title: interview.title,
      /* No byline under the card: the banner artwork already names the
         person, so repeating it below the title read as duplication. */
      summary: "",
      href: interviewHref(interview),
      image: interview.thumbnail,
    };
  },
);

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
    href: "/resources/insights/implementors-guide-to-ai/ai-is-the-future-and-the-future-is-now",
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
