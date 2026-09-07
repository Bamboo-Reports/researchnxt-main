import {
  getPerspectiveInterviews,
  interviewHref,
} from "@/content/experts-view";
import { latestReports } from "@/content/resources";
import { gccIntelligenceLink, solutions } from "@/content/solutions";
import type { FeaturedResource } from "./types";

/** Copy transcribed from the live homepage at researchnxt.com. */

export const hero = {
  headline: "Know your market, name your accounts",
  /* The payoff, set as its own accent-coloured line the way the Bamboo
     Reports hero sets "GCC GTM enablement". */
  headlineAccent: "Reach the people inside them.",
  lede: "A boutique market intelligence firm for B2B technology leaders. We turn research into qualified conversations your sales team can act on.",
  cta: {
    label: "Let's craft your solution",
    href: "/contact",
  },
} as const;

/** Card copy where a page's own meta description runs too long for a
    three-line card; every other card reads the meta description as is. */
const cardDescriptions: Record<string, string> = {
  "account-intelligence":
    "Heightened target account control, whitespace opportunities, and sharper selling propositions.",
};

/** The four solutions, derived from the solutions registry so their names
    and descriptions stay described in one place. The GCC Intelligence card
    goes out to Bamboo Reports, as the nav does. */
export const whatWeDo = {
  eyebrow: "What we do",
  title: "From market data to qualified pipeline",
  /* Every name is two words, so the single space becomes a chosen "\n"
     break and the row shares one two-line rhythm; the template renders the
     titles with `sm:whitespace-pre-line`. */
  items: [
    ...solutions.map((solution) => ({
      title: solution.navLabel.replace(" ", "\n"),
      description:
        cardDescriptions[solution.slug] ?? solution.metaDescription,
      href: `/solutions/${solution.slug}`,
      external: false,
    })),
    {
      title: gccIntelligenceLink.label.replace(" ", "\n"),
      description: gccIntelligenceLink.description,
      href: gccIntelligenceLink.href as string,
      external: true,
    },
  ],
} as const;

/** The engagement as a connected sequence, Define to Engage, with the
    deliverable at each stage leading toward qualified pipeline. */
export const engagementSteps = {
  eyebrow: "How an engagement runs",
  title: "From a definition workshop to a conversation your sales team can take",
  steps: [
    {
      name: "Define",
      description:
        "Workshops and reverse funnel analysis to agree the ICP and the size of the prize.",
      outcome: "Agreed scope and ICP",
    },
    {
      name: "Build",
      description:
        "The universe assembled bottom-up: accounts, centres and named contacts, verified before use.",
      outcome: "A working target universe",
    },
    {
      name: "Validate",
      description:
        "Surveys and senior interviews test the assumptions against what the market actually does.",
      outcome: "Evidence you can defend",
    },
    {
      name: "Engage",
      description:
        "Content, campaigns and roundtables turn the studied audience into consented conversations.",
      outcome: "Qualified pipeline",
    },
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
    /* The report's own vertical cover, as on the library shelf. Landscape
       cardImage remains the fallback for a report that launches before its
       cover art. */
    image: report.cardPortrait ?? report.cardImage,
  }),
);

/** How many buyers each programme contributes to the home page rail. */
const BUYERS_PER_PROJECT = 2;

/**
 * The first two Buyer's perspective interviews from every programme, in
 * shelf order, for the home page rail: the latest programme's buyers sit in
 * view and the rest scroll. The library sorts by `projectOrder`, then title,
 * and this reads the same list, so the rail and the library agree and the
 * band updates itself as programmes are added.
 */
export const featuredInterviews: FeaturedResource[] = getPerspectiveInterviews(
  "buyer",
)
  .filter(
    (interview, index, all) =>
      all.filter((other, i) => i < index && other.project === interview.project)
        .length < BUYERS_PER_PROJECT,
  )
  .map((interview) => ({
    kind: "Interview",
    title: interview.title,
    /* No byline under the card: the banner artwork already names the
       person, so repeating it below the title read as duplication. */
    summary: "",
    href: interviewHref(interview),
    image: interview.thumbnail,
  }));

/**
 * Band headings and link labels on the homepage that are not derived from
 * another content module.
 */
export const homeBands = {
  featuredReports: {
    eyebrow: "Featured reports",
    title: "Latest reports and guides",
    lede: "Original research published for business and marketing leaders.",
    cta: "All reports",
  },
  expertsView: {
    eyebrow: "Experts view",
    title: "Perspectives from the people doing the work",
    lede: "Interviews with thought leaders, buyers and vendors across B2B technology.",
    cta: "All interviews",
  },
  trustedBy: {
    eyebrow: "Trusted by",
    title: "Teams building what comes next",
    lede: "Organisations that have trusted our research, intelligence and engagement programmes.",
  },
  bambooCta: "Visit Bamboo Reports",
  exploreCta: "Explore",
} as const;
