/** Copy for the rebuilt About page: pipeline-first positioning, the firm's
    story and timeline, working habits, the team and advisory board, and the
    ecosystem recognition band. */

export const aboutHero = {
  title: "About us",
  lede:
    "We’re a boutique market intelligence firm helping B2B technology leaders understand their markets, identify the right accounts, and turn research into meaningful business conversations.",
  /** Search-snippet length; the page lede runs longer than a SERP shows. */
  metaDescription:
    "A boutique market intelligence firm for B2B technology leaders: we size markets, name accounts and carry research through to conversations sales can act on.",
} as const;

/** The positioning statement opens the page body, under the plain hero. */
export const aboutIntro = {
  title: "Research that ends in a pipeline, not a **PDF**.",
  lede: "A boutique market intelligence firm for B2B technology leaders. We size the market, name the accounts, find the people inside them, and carry the research through to conversations a sales team can act on.",
} as const;

export type AboutFact = {
  value: string;
  label: string;
  /** Longer supporting line; only the founding row carries one. */
  detail?: string;
  /** Only measurements count up. Years read as dates, so they stay still. */
  count?: boolean;
};

/** The fact ledger under the positioning statement: one ruled row per fact,
    figure left, claim right. Lead with the founding fact. */
export const aboutFacts: AboutFact[] = [
  {
    value: "2017",
    label: "Founded. Bootstrapped ever since.",
    detail:
      "Nearly a decade of analyst-led research, with zero external funding. Growth funded by the work itself.",
  },
  {
    value: "50+",
    label: "B2B clients across IT services, SaaS and enterprise technology",
    count: true,
  },
  {
    value: "2018",
    label: "Ecosystem partner across NASSCOM forums and industry platforms",
  },
  {
    value: "60,000+",
    label: "Subscribers reached by our published research",
    count: true,
  },
  {
    value: "GCC intelligence",
    label: "Bamboo Reports, our own product, now used by enterprise teams",
  },
];

export const story = {
  eyebrow: "Our story",
  title: "Analysts who built their own **technology**",
  body: [
    "Most research firms hand over a document and stop. Most data vendors hand over a list and stop. Marketing teams are left to bridge the two on their own, usually under a quarterly number.",
    "Research NXT was set up in 2017 to close that gap: research designed by people who understand the market, executed at scale with technology we built ourselves, and carried through to named prospects who have agreed to a conversation. Not a technology company that hired consultants.",
    "The same discipline produced Bamboo Reports, our own platform profiling every GCC in India down to the individual centre.",
  ],
  cta: {
    label: "Visit Bamboo Reports",
    href: "https://bambooreports.com/",
    external: true,
  },
} as const;

export const milestones = {
  title: "What shaped the firm",
  /* Item titles carry "\n" to force a shared two-line rhythm across the
     row; the template renders them with `sm:whitespace-pre-line`. */
  items: [
    {
      year: "2017",
      title: "The firm\nopens",
      description:
        "Account intelligence and list building for enterprise technology vendors selling into the USA, Europe and India.",
    },
    {
      year: "2018",
      title: "The NASSCOM\nGCC list",
      description:
        "We build the first structured GCC list for the NASSCOM GCC Forum, and become an ecosystem partner.",
    },
    {
      year: "2022",
      title: "Building\nthe dataset",
      description:
        "Work begins on profiling every GCC in India down to the individual centre, the research that became Bamboo Reports.",
    },
    {
      year: "Today",
      title: "Research, data and\npipeline under one roof",
      description:
        "GTM studies across APAC and the Middle East, prospect intelligence at scale, and roundtables that put clients in front of the market.",
    },
  ],
} as const;

/** The three engagement modes and the assurance row beneath them, from the
    user-supplied mockup. The mockup's timeframe kickers ("24 to 48 hours")
    were dropped on user direction. */
export const engagementModes = {
  eyebrow: "How to engage us",
  title: "Three ways in, sized to the decision in front of you",
  modes: [
    {
      title: "Data products",
      description:
        "On-demand prospect lists, account slices and platform data cuts against an agreed ICP.",
    },
    {
      title: "Research programmes",
      description:
        "Discovery, surveys, senior interviews and a designed report you own and can publish.",
    },
    {
      title: "Pipeline programmes",
      description:
        "ABM activation, qualified lead delivery and executive roundtables with your team in the room.",
    },
  ],
  assurances: [
    {
      title: "Sourcing you can put through review",
      description:
        "Majority publicly available information, validated by analysts, with primary layers from surveys and interviews.",
    },
    {
      title: "95%+ contact accuracy",
      description:
        "On business email and title, with every field on a defined refresh cycle.",
    },
    {
      title: "Consent captured before handover",
      description:
        "Non-disclosure and data processing agreements supported for enterprise approval processes.",
    },
  ],
} as const;

export const team = {
  eyebrow: "The people",
  title: "Founder-led, and personally **accountable**",
  people: [
    {
      name: "Santosh Abraham",
      image: "/santosh.png",
      role: "Founder & CEO",
      bio: [
        "22+ years across product development, market research and technology go-to-market. Leads product direction and client engagement, and publishes original research featuring insights from CXOs and business leaders.",
      ],
      affiliations: [
        "Visiting faculty, AI and emerging technologies, FLAME University",
        "Visiting coach, MIDAS School of Entrepreneurship",
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

export const advisoryBoard = {
  title: "Advisory board",
  /** The advisors are unnamed by design, so the role line is the headline
      and the credential line sits beneath it. */
  members: [
    {
      role: "Former MD of one of India's largest multinational GCC operations.",
      credential:
        "34+ years' experience; set up one of the largest Global Execution Centres in India.",
    },
    {
      /* The "\n" forces the chosen two-line break; the template renders
         roles with `whitespace-pre-line`. */
      role: "Former four-time SaaS\nchief marketing officer.",
      credential:
        "26+ years in B2B technology marketing and autonomous marketing systems.",
    },
  ],
  /** The analyst bench, set under its own header below the board. */
  noteTitle: "Team",
  note: "Behind every engagement is a dedicated analyst team that builds and refreshes the data every week.",
} as const;

/** Held back for now on user direction: the page does not render this band,
    but the copy stays here so restoring it is one import away. */
export const recognition = {
  eyebrow: "In the room",
  title: "Recognised for the work, present in the ecosystem",
  body: "Executive roundtables across Mumbai, NCR and Bengaluru. Speaking slots at the NASSCOM MarTech Summit, HYSEA BizSummit and the NASSCOM Technology and Leadership Forum. A publishing engine that keeps clients in front of the market between engagements. Recognised on the Adobe Digi100 list of India's leading digital minds, and in the LinkedIn Content 50 for original B2B research content.",
} as const;
