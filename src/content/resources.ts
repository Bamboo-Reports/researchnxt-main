import { getExpertInterview, interviewHref } from "@/content/experts-view";

/**
 * PHASE B: placeholder pages for the remaining Resources destinations, created so
 * navigation stays on this site instead of linking to the live WordPress
 * pages. Every title and lede below is stand-in copy awaiting real content;
 * replace the strings here and the pages update without touching markup.
 */

export type ResourcePage = {
  slug: string;
  navLabel: string;
  metaTitle: string;
  title: string;
  lede: string;
};

export const resourcePages: ResourcePage[] = [
  /* Reports & whitepapers, Experts view, Insights and Events all have their
     own routes now, so they are deliberately absent from this placeholder
     list. Success stories is the last one still standing. */
  {
    slug: "success-stories",
    navLabel: "Success stories",
    metaTitle: "Success stories",
    title: "Success stories",
    lede: "How business and marketing leaders put our research to work.",
  },
];

export function getResourcePage(slug: string) {
  return resourcePages.find((page) => page.slug === slug);
}

/* ---------------------------------------------------------------------------
   Report landing pages. Every report gets its own page under
   /resources/reports-whitepapers/[slug], all rendered by one template.
--------------------------------------------------------------------------- */

/**
 * A card for one published interview, so a landing's expert-insights groups
 * name people rather than restating titles and thumbnails that already live
 * in the experts-view registry. A typo in a slug fails the build rather than
 * rendering a card that goes nowhere.
 */
function interviewCard(project: string, person: string): ReportCardItem {
  const interview = getExpertInterview(project, person);
  if (!interview) {
    throw new Error(`Unknown interview: ${project}/${person}`);
  }
  return {
    title: interview.title,
    href: interviewHref(interview),
    image: interview.thumbnail,
  };
}

const acmCard = (person: string) =>
  interviewCard("automation-campaign-management", person);

const ucxCard = (person: string) =>
  interviewCard("unlocking-the-power-unified-cx", person);

const gccCard = (person: string) =>
  interviewCard("navigating-corporate-commute-for-gccs-in-india", person);

const gccCxCard = (person: string) =>
  interviewCard("transforming-cx-through-gccs", person);

const cloudCard = (person: string) =>
  interviewCard("cloud-computing-new-normal-beyond", person);

const seaCard = (person: string) =>
  interviewCard("south-east-asia-response-guide", person);

const aiCard = (person: string) =>
  interviewCard("ai-led-personalization", person);

export type ReportCardItem = {
  title: string;
  /** Optional; card renders without a link until the article page exists. */
  href?: string;
  external?: boolean;
  /** Optional plate under /public; falls back to the placeholder. */
  image?: string;
};

/** A run of consent text; segments with an `href` render as links. */
export type ConsentSegment = {
  text: string;
  href?: string;
  external?: boolean;
};

export type ReportLanding = {
  slug: string;
  metaTitle: string;
  metaDescription: string;

  hero: {
    title: string;
    lede: string;
    /** Path under /public. */
    cover: string;
    coverAlt: string;
  };

  /**
   * Wide banner for the report's card in the /resources/reports-whitepapers
   * library, under /public. The hero `cover` is the upright book mockup and
   * crops badly to a card plate, so the library carries its own artwork.
   */
  cardImage: string;

  /**
   * The hero download form. The real form is a Jotform embed: set `jotformId`
   * and the template renders it instead of the interim placeholder form.
   * TODO(phase-c): set the Jotform id once the form exists.
   */
  download: {
    jotformId?: string;
    submitLabel: string;
    consent: ConsentSegment[];
  };

  /** Body paragraphs; `**` marks bold emphasis. */
  description: string[];

  /**
   * The report's chapters, in reading order. Optional: the 2021 cloud
   * microsite runs no chapter band at all, and inventing one would put copy
   * on the page that the report never claimed.
   */
  expect?: {
    title: string;
    sections: {
      name: string;
      /** A `\n` is a hard line break; the card renders it as written. */
      description: string;
      /** Chapter illustration under /public. */
      image?: string;
    }[];
  };

  /**
   * Measured figures about the research itself, as the 2020 AI microsite runs
   * under "The Journey". Rendered through the site's stat tiles.
   */
  figures?: { title: string; items: { value: string; label: string }[] };

  /**
   * Headline findings, as the 2021 Southeast Asia microsite lists them under
   * "Reports Highlights": short labels, no descriptions, so they render as a
   * dense tick list rather than as cards pretending to be chapters.
   */
  highlights?: { title: string; items: string[] };

  /**
   * A sponsor's offer to readers, as the 2021 cloud microsite carries under
   * "*Exclusive offer from". The items are the sponsor's promises, so they
   * are quoted from the source and never paraphrased. The band renders as
   * the site's bento strip with the sponsor on the accent feature tile, so
   * `logo` is the mark's on-deep (white) variant.
   */
  offer?: {
    label: string;
    logo?: { src: string; alt: string };
    items: {
      /** Names one of the band's drawn line icons. */
      icon: "consulting" | "assessment" | "waiver";
      text: string;
    }[];
  };

  quickReads: { title: string; items: ReportCardItem[] };

  /** Expert interviews grouped by AI maturity stage, in stage order. */
  expertInsights: {
    title: string;
    groups: { stage: string; items: ReportCardItem[] }[];
  };

  /**
   * Quote cards from the research participants. The source artwork bakes the
   * quote and the attribution into the image, so both are carried here as
   * text too: they compose the alt text, which is the only way a reader who
   * cannot see the card gets the quote at all.
   */
  voices?: {
    items: {
      /** Path under /public. */
      image: string;
      quote: string;
      name: string;
      role: string;
      /** Omitted where the card names no company. */
      company?: string;
    }[];
  };

  /** Credit band above the closing CTA. */
  credits?: {
    sponsor: {
      label: string;
      name: string;
      logo?: string;
      logos?: { name: string; logo: string }[];
    };
    partnerLabel: string;
  };
};

/** Copy transcribed from researchnxt.com/microsite/implementer-guide-to-ai/ */
const implementersGuideToAI: ReportLanding = {
  slug: "implementers-guide-to-ai",
  metaTitle: "Implementer's Guide to AI",
  metaDescription:
    "Explore the comprehensive framework for AI readiness, strategies, governance, and cross departmental integration in Indian businesses across industries",

  hero: {
    title: "Implementer's Guide to AI",
    lede: "Explore the comprehensive framework for AI readiness, strategies, governance, and cross departmental integration in Indian businesses across industries",
    cover: "/covers/implementers-guide-to-ai.png",
    coverAlt: "Cover of the Implementer's Guide to AI report",
  },

  cardImage: "/covers/implementers-guide-to-ai-card.png",

  download: {
    jotformId: "252512579059463",
    submitLabel: "Download",
    consent: [
      {
        text: "By submitting this form, you agree to have your contact information, including email, passed on to Salesforce for the purpose of following up on your interests, and that you have read and agree to the ",
      },
      { text: "Research NXT Privacy Policy", href: "/privacy-policy" },
      { text: " and the " },
      {
        text: "Salesforce Privacy Statement",
        href: "https://www.salesforce.com/company/privacy/",
        external: true,
      },
      { text: "." },
    ],
  },

  description: [
    "The **Implementer's Guide to AI** is a practical handbook crafted to empower businesses on their journey to adopting and scaling AI.",
    "This guide is presented in partnership with Salesforce. Tailored for Indian businesses, it draws on insights from over **1,500+ survey responses** and **15+ expert interviews** across industries such as finance, retail, and healthcare. Backed by secondary research, it offers actionable strategies and real-world examples to guide effective AI adoption.",
  ],

  expect: {
    title: "What to expect from the report",
    sections: [
      /* All three descriptions are hard-wrapped to three lines of roughly
         equal length on user direction, so the cards sit level; the wording
         is unchanged. */
      {
        name: "Landscape",
        description:
          "Explore the maturity levels and current\nadoption patterns of AI across Indian\nbusiness functions and departments",
        image: "/report-sections/implementers-guide-landscape.png",
      },
      {
        name: "Strategy",
        description:
          "Understand how strategic AI\nimplementations align with key business\nobjectives to drive measurable growth",
        image: "/report-sections/implementers-guide-strategy.png",
      },
      {
        name: "Governance",
        description:
          "Master responsible AI frameworks\nand assessment methods to ensure\ncompliant and successful deployment",
        image: "/report-sections/implementers-guide-governance.png",
      },
    ],
  },

  quickReads: {
    title: "Quick reads and toolkits for AI adoption",
    items: [
      {
        title: "AI is the Future, and the Future is Now",
        href: "/resources/insights/implementers-guide-to-ai/ai-is-the-future-and-the-future-is-now",
        image:
          "/insights/implementers-guide-to-ai/ai-is-the-future-and-the-future-is-now.png",
      },
      {
        title:
          "Implementer's Guide to AI: Finance Leaders Transition from Caution to Customer-Centric Scale",
        href: "/resources/insights/implementers-guide-to-ai/finance-leaders-transition-from-caution-to-customer-centric-scale",
        image:
          "/insights/implementers-guide-to-ai/finance-leaders-transition-from-caution-to-customer-centric-scale.png",
      },
      {
        title:
          "Implementer's Guide to AI: Manufacturing, Automotive & Energy Leaders Move from Pilots to Scale",
        href: "/resources/insights/implementers-guide-to-ai/manufacturing-automotive-energy-leaders-move-from-pilots-to-scale",
        image:
          "/insights/implementers-guide-to-ai/manufacturing-automotive-energy-leaders-move-from-pilots-to-scale.png",
      },
      {
        title:
          "Implementer's Guide to AI: Retail & Consumer Goods Leaders Shift from Experiments to Loyalty-Led Scale",
        href: "/resources/insights/implementers-guide-to-ai/retail-consumer-goods-leaders-shift-from-experiments-to-loyalty-led-scale",
        image:
          "/insights/implementers-guide-to-ai/retail-consumer-goods-leaders-shift-from-experiments-to-loyalty-led-scale.png",
      },
      {
        title: "The Four Waves of AI: A Ready Guide for Business Leaders",
        href: "/resources/insights/implementers-guide-to-ai/the-four-waves-of-ai-a-ready-guide-for-business-leaders",
        image:
          "/insights/implementers-guide-to-ai/the-four-waves-of-ai-a-ready-guide-for-business-leaders.png",
      },
    ],
  },

  expertInsights: {
    title: "Insights shared by experts",
    groups: [
      {
        stage: "Exploring",
        items: [
          {
            title:
              "Transforming SaaS, Reviving Storytelling, and Redefining the Future of Creativity",
            href: "/resources/experts-view/implementers-guide-to-ai/diptarup-chakraborti",
            image: "/experts/diptarup-chakraborti.png",
          },
          {
            title: "How Spacewood Leverages AI to Redefine Customer Experience",
            href: "/resources/experts-view/implementers-guide-to-ai/nimish-thaker",
            image: "/experts/nimish-thaker.png",
          },
        ],
      },
      {
        stage: "Experimenting",
        items: [
          {
            title:
              "How Carat Lane is Redefining Customer Experience in the Jewellery Industry",
            href: "/resources/experts-view/implementers-guide-to-ai/avnish-anand",
            image: "/experts/avnish-anand.png",
          },
          {
            title: "SkinQ's AI-Powered Vision and Strategic Marketing Insights",
            href: "/resources/experts-view/implementers-guide-to-ai/meera-iyer",
            image: "/experts/meera-iyer.png",
          },
        ],
      },
      {
        stage: "Implementing",
        items: [
          {
            title:
              "AI-Driven Branding & Digital Marketing: Insights from Hansveen Kaur",
            href: "/resources/experts-view/implementers-guide-to-ai/hansveen-kaur",
            image: "/experts/hansveen-kaur.png",
          },
          {
            title:
              "AI's Role in Engineering & Infrastructure: Insights from Manish",
            href: "/resources/experts-view/implementers-guide-to-ai/manish-kumar",
            image: "/experts/manish-kumar.png",
          },
          {
            title:
              "Transforming Retail with AI: Insights from Pressto's Marketing Evolution",
            href: "/resources/experts-view/implementers-guide-to-ai/akshay-matkar",
            image: "/experts/akshay-matkar.png",
          },
          {
            title:
              "AI in Manufacturing: Driving Digital Transformation and Intelligent Operations",
            href: "/resources/experts-view/implementers-guide-to-ai/madhav-vemuri",
            image: "/experts/madhav-vemuri.png",
          },
          {
            title:
              "Insights on Data Unification, Customer Experience, and Ethical Innovation",
            href: "/resources/experts-view/implementers-guide-to-ai/prasad-pimple",
            image: "/experts/prasad-pimple.png",
          },
          {
            title:
              "How Edelweiss Life Insurance is Redefining Industry Standards Through Innovation and AI",
            href: "/resources/experts-view/implementers-guide-to-ai/abhishek-gupta",
            image: "/experts/abhishek-gupta.png",
          },
        ],
      },
      {
        stage: "Deployed",
        items: [
          {
            title: "AI-Led Transformation in Automotive Manufacturing",
            href: "/resources/experts-view/implementers-guide-to-ai/sanjiv-kumar-jain",
            image: "/experts/sanjiv-kumar-jain.png",
          },
          {
            title: "How AI Powers Kissht's Customer-Centric Approach",
            href: "/resources/experts-view/implementers-guide-to-ai/shwetha-iyer",
            image: "/experts/shwetha-iyer.png",
          },
          {
            title:
              "Transforming Customer Engagement, Decision-Making, and Operational Efficiency",
            href: "/resources/experts-view/implementers-guide-to-ai/gaurav-suri",
            image: "/experts/gaurav-suri.png",
          },
          {
            title:
              "How PolicyBoss is Leveraging AI to Redefine Distribution, Personalisation, and Customer Experience",
            href: "/resources/experts-view/implementers-guide-to-ai/varun-kaushik",
            image: "/experts/varun-kaushik.png",
          },
          {
            title:
              "Transforming Insurance Sales and Distribution at Allianz Partners",
            href: "/resources/experts-view/implementers-guide-to-ai/suman-tewary",
            image: "/experts/suman-tewary.png",
          },
          {
            title:
              "How Apollo Hospitals Leverages AI to Revolutionise Patient Care and International Outreach",
            href: "/resources/experts-view/implementers-guide-to-ai/karthik-anantharaman",
            image: "/experts/karthik-anantharaman.png",
          },
        ],
      },
    ],
  },

  /* Transcribed from the quote cards on
     researchnxt.com/microsite/implementer-guide-to-ai/, in the order they run
     there. The artwork is the source; the text below only mirrors it. */
  voices: {
    items: [
      {
        image: "/voices/implementers-guide-to-ai/ramesh-mani.png",
        quote:
          "The next big AI breakthrough could come from a company that doesn't even exist today. Staying adaptable and continuously learning will be key to thriving in this AI-driven future.",
        name: "Ramesh Mani",
        role: "Vice President, Professional Services Delivery",
        company: "Salesforce",
      },
      {
        image: "/voices/implementers-guide-to-ai/akshay-matkar.png",
        quote:
          "The report can empower businesses to navigate the complexities of AI adoption effectively, ensuring their efforts are purposeful and result-oriented.",
        name: "Akshay Matkar",
        role: "Chief Growth Officer",
        company: "Pressto",
      },
      {
        image: "/voices/implementers-guide-to-ai/gaurav-suri.png",
        quote:
          "By combining continuous learning, strategic alignment, and collaboration, organisations can build a resilient, forward-looking culture that effectively integrates AI to revolutionise business.",
        name: "Gaurav Suri",
        role: "Chief Evangelist",
        company: "Finlabs India Pvt Ltd",
      },
      {
        image: "/voices/implementers-guide-to-ai/prasad-pimple.png",
        quote:
          "It's primarily about understanding what others have done, including their successes and, more importantly, their failures.",
        name: "Prasad Pimple",
        role: "Executive VP & Head of Digital Business Unit",
        company: "Kotak Life",
      },
      {
        image: "/voices/implementers-guide-to-ai/abhishek-gupta.png",
        quote:
          "Success with AI often comes through trial and error. Be prepared to fail frequently, as this iterative process is critical to discovering solutions that yield meaningful results.",
        name: "Abhishek Gupta",
        role: "Chief Marketing Officer",
        company: "Edelweiss Life Insurance",
      },
      {
        image: "/voices/implementers-guide-to-ai/varun-kaushik.png",
        quote:
          "By adopting a pragmatic, goal-oriented approach, you can harness AI as a powerful enabler without disrupting the core of how you operate.",
        name: "Varun Kaushik",
        role: "Executive VP & Head of Marketing",
        company: "PolicyBoss",
      },
      {
        image: "/voices/implementers-guide-to-ai/suman-tewary.png",
        quote:
          "The fact that AI adoption in the insurance sector will completely change the whole spectrum is a boon in itself for both insurers and customers.",
        name: "Suman Tewary",
        role: "Associate General Manager",
        company: "Allianz Partners",
      },
      {
        image: "/voices/implementers-guide-to-ai/karthik-anantharaman.png",
        quote:
          "The report should foster a sense of collaboration, encouraging organisations to seriously consider and implement real-time AI solutions.",
        name: "Dr Karthik Anantharaman",
        role: "VP International Sales & Marketing",
        company: "Apollo Hospitals",
      },
      {
        image: "/voices/implementers-guide-to-ai/nimish-thaker.png",
        quote:
          "Having tailored solutions or tools specifically designed for the furniture industry would be incredibly valuable.",
        name: "Nimish Thaker",
        role: "Head of Marketing",
        company: "Spacewood",
      },
      {
        image: "/voices/implementers-guide-to-ai/diptarup-chakraborti.png",
        quote:
          "I believe it's essential to include the social impact of AI on the marketing function and highlight how AI will influence the existing roles.",
        name: "Diptarup Chakraborti",
        role: "Chief Marketing Officer",
        company: "MoveInSync",
      },
      {
        image: "/voices/implementers-guide-to-ai/meera-iyer.png",
        quote:
          "Successful AI adoption requires clarity about its relevance, scrutiny of the data powering it, and a strong alignment with your specific business objectives.",
        name: "Meera Iyer",
        role: "Co-founder & CEO",
        company: "SkinQ",
      },
      {
        image: "/voices/implementers-guide-to-ai/avnish-anand.png",
        quote:
          "As more companies adopt AI, the technology will continue to evolve, driving the emergence of new use cases and greater sophistication.",
        name: "Avnish Anand",
        role: "Former Co-founder & CEO",
        company: "CaratLane",
      },
      {
        image: "/voices/implementers-guide-to-ai/madhav-vemuri.png",
        quote:
          "I expect this report to emphasise the urgency of AI adoption. Businesses must recognise that AI is not a luxury but a necessity for competitiveness.",
        name: "Madhav Vemuri",
        role: "Leader of Industrial Automation",
      },
      {
        image: "/voices/implementers-guide-to-ai/sanjiv-kumar-jain.png",
        quote:
          "Choose with a focus on existing and mature AI technologies, not speculative promises or external pressures.",
        name: "Sanjiv Jain",
        role: "CIO",
        company: "Krishna Maruti Group",
      },
      {
        image: "/voices/implementers-guide-to-ai/manish-kumar.png",
        quote:
          "It is recommended to check the effectiveness of available AI tools which are being selected for engineering and project management.",
        name: "Manish Kumar",
        role: "Deputy General Manager",
        company: "Engineers India Limited",
      },
      {
        image: "/voices/implementers-guide-to-ai/hansveen-kaur.png",
        quote:
          "Ultimately, a customer-centric philosophy, prioritising enhanced experiences and human-AI synergy, is essential for maximising the transformative potential of AI.",
        name: "Hansween Kaur",
        role: "Head, Brand Management & Digital Marketing",
        company: "Voltas Beko",
      },
    ],
  },

  credits: {
    sponsor: {
      label: "Research sponsor",
      name: "Salesforce",
      logo: "/logos/trusted/salesforce.svg",
    },
    partnerLabel: "Research partner",
  },
};

/** Copy transcribed from
    researchnxt.com/microsite/automation-campaign-management-for-functional-experts/ */
const automationCampaignManagement: ReportLanding = {
  slug: "automation-campaign-management",
  metaTitle: "Automation & Campaign Management Handbook for Functional Experts",
  metaDescription:
    "Explore current campaign management nuances and opportunities tailored to Indian market dynamics, from 150+ survey responses and 20 expert interviews.",

  hero: {
    title: "Automation & Campaign Management Handbook for Functional Experts",
    lede: "Explore current campaign management nuances and opportunities tailored to Indian market dynamics",
    cover: "/covers/automation-campaign-management.png",
    coverAlt:
      "Cover of the Automation and Campaign Management Handbook for Functional Experts",
  },

  cardImage: "/covers/automation-campaign-management-zoho-card.png",

  download: {
    jotformId: "243521499246462",
    submitLabel: "Download",
    consent: [
      {
        text: "By submitting this form, you agree to have your contact information, including email, passed on to Zoho for the purpose of following up on your interests, and that you have read and agree to the ",
      },
      { text: "Research NXT Privacy Policy", href: "/privacy-policy" },
      { text: " and the " },
      {
        text: "Zoho Privacy Policy",
        href: "https://www.zoho.com/privacy.html",
        external: true,
      },
      { text: "." },
    ],
  },

  description: [
    "The **Automation and Campaign Management Handbook for Functional Experts** is a comprehensive guide designed to empower businesses to streamline their marketing campaigns.",
    "Created for the Indian market, this handbook is based on insights from **150+ survey responses** and **20 expert interviews**. Sponsored by Zoho Campaigns & Marketing Automation and enriched with secondary research, it offers actionable strategies and real-world use cases to overcome marketing challenges like fragmented data, multi-channel execution, and ROI optimisation.",
  ],

  expect: {
    title: "What to expect from the report",
    sections: [
      /* Hard-wrapped to three lines apiece, matching the other landing. */
      {
        name: "Solutions",
        description:
          "Explore functional challenges\nin multi-channel campaign management",
        image: "/report-sections/acm-solutions.png",
      },
      {
        name: "Performance",
        description:
          "Justify your budget through critical\nperformance metrics analysis",
        image: "/report-sections/acm-performance.png",
      },
      {
        name: "Guidelines",
        description:
          "Learn industry-specific marketing\ncampaign management best practices",
        image: "/report-sections/acm-guidelines.png",
      },
    ],
  },

  /* The microsite lists three quick reads. On user direction the third,
     "Campaign Management and Automation in 2024", is dropped as a duplicate
     of Naresh Kumar's published interview, and the roundtable write-up is
     bound for Events, which has no route yet, so its card carries the banner
     without a link for now. */
  quickReads: {
    title: "Quick reads for campaign management",
    items: [
      {
        title:
          "Automate, Target, Win in 2024: How Marketing Automation Supercharges Your Campaigns",
        href: "/resources/insights/automation-campaign-management/automate-target-win-in-2024",
        image:
          "/insights/automation-campaign-management/automate-target-win-in-2024.png",
      },
      {
        title:
          "Redefining Marketing Excellence: Highlights from the Marketing Automation Roundtable",
        image:
          "/quick-reads/automation-campaign-management/marketing-automation-roundtable.png",
      },
    ],
  },

  /* Grouped by theme rather than by maturity stage, which is how this
     microsite tabs them. An interview appears under every theme it covers, so
     the same card shows up in more than one group. */
  expertInsights: {
    title: "Insights shared by functional leaders",
    groups: [
      {
        stage: "Personalisation and Customer Engagement",
        items: [
          "jyoti-khichar",
          "abhishek-fodikar",
          "prasad-pimple",
          "vipasha-sinha",
          "anand-mohan",
          "ojas-kulkarni",
          "sunil-barsaiyan",
          "megha-agarwal",
          "rahul-poojari",
          "vinod-dangi",
        ].map(acmCard),
      },
      {
        stage: "Marketing Automation and CRM",
        items: [
          "prasad-pimple",
          "rohit-ladsaria",
          "ridhi-malhotra",
          "vipasha-sinha",
          "varun-kaushik",
          "anand-mohan",
          "rohit-srivastav",
          "praveen-kumar",
          "amitesh-baranwal",
          "naresh-kumar",
        ].map(acmCard),
      },
      {
        stage: "Data-Driven Marketing and Analytics",
        items: [
          "prasad-pimple",
          "ridhi-malhotra",
          "ojas-kulkarni",
          "rohit-srivastav",
          "sunil-barsaiyan",
          "amitesh-baranwal",
        ].map(acmCard),
      },
      {
        stage: "Content Strategy and Campaign Management",
        items: [
          "abhishek-fodikar",
          "ridhi-malhotra",
          "vipasha-sinha",
          "ojas-kulkarni",
          "lijo-mathew",
          "anju-singh",
        ].map(acmCard),
      },
    ],
  },

  voices: {
    items: [
      {
        image: "/voices/automation-campaign-management/rohit-srivastav.png",
        quote:
          "It would be highly valuable to include insights into how AI is impacting or enhancing specific aspects of our roles.",
        name: "Rohit Srivastav",
        role: "Head of Marketing",
        company: "FleetPanda",
      },
      {
        image: "/voices/automation-campaign-management/abhishek-fodikar.png",
        quote:
          "I think this report should give simple tips on mixing creativity with data, improving campaigns, and making sure you reach the right audience at the right time.",
        name: "Abhishek Fodikar",
        role: "Marketing Specialist",
        company: "Research NXT",
      },
      {
        image: "/voices/automation-campaign-management/rohit-ladsaria.png",
        quote:
          "For the reader, a step by step guide to building a list, integrating it with CRM, their initial campaigns and their next steps of campaigning can be made so they start off small and then gradually pick up pace.",
        name: "Rohit Ladsaria",
        role: "Senior Manager",
        company: "ACS Infotech",
      },
      {
        image: "/voices/automation-campaign-management/vipasha-sinha.png",
        quote:
          "Insights into emerging trends, tested tactics, and real-world case studies would be incredibly valuable for readers seeking to refine their marketing strategies and drive results.",
        name: "Vipasha Sinha",
        role: "Lead Product Marketer",
        company: "Zoho",
      },
      {
        image: "/voices/automation-campaign-management/vinod-dangi.png",
        quote:
          "Before introducing any tool, leaders should have a clear corrective plan in place, including being ready for potential challenges with contingency plans.",
        name: "Vinod Dangi",
        role: "Head, Digital Marketing",
        company: "Sobha Ltd",
      },
      {
        image: "/voices/automation-campaign-management/varun-kaushik.png",
        quote:
          "I believe one of the most critical factors in marketing automation is knowing precisely what to automate and how to market it effectively. Success requires clear objectives and a deep understanding of your own business needs.",
        name: "Varun Kaushik",
        role: "Executive Vice President & Head of Marketing",
        company: "PolicyBoss",
      },
      {
        image: "/voices/automation-campaign-management/sunil-barsaiyan.png",
        quote:
          "Having access to best practices and campaign-level insights will undoubtedly enhance our ability to optimise day-to-day operations.",
        name: "Sunil Barsaiyan",
        role: "Associate Director, Digital Marketing",
        company: "Amity University",
      },
      {
        image: "/voices/automation-campaign-management/ridhi-malhotra.png",
        quote:
          "I'm always curious to learn what's working for other organisations. I'd love to explore insights into how various organisations are generating leads and driving demand in their own ways.",
        name: "Ridhi Malhotra",
        role: "Senior Manager, Demand Generation",
        company: "HackerRank",
      },
      {
        image: "/voices/automation-campaign-management/rahul-poojari.png",
        quote:
          "Including case studies in the report would be incredibly useful. They provide readers with real-world examples and practical insights.",
        name: "Rahul Poojari",
        role: "Senior Digital Marketing Manager",
        company: "Tata AIG",
      },
      {
        image: "/voices/automation-campaign-management/praveen-kumar.png",
        quote:
          "It's important to go beyond just sharing information and focus on how that information can be practically applied to solve real challenges.",
        name: "Praveen Kumar",
        role: "Senior Manager, Marketing & Digital Strategies",
        company: "IILM",
      },
      {
        image: "/voices/automation-campaign-management/prasad-pimple.png",
        quote:
          "I'm keen to understand the experiments and strategies currently used across different industries, especially those that have proven successful over time.",
        name: "Prasad Pimple",
        role: "Executive Vice President",
        company: "Kotak Life",
      },
      {
        image: "/voices/automation-campaign-management/ojas-kulkarni.png",
        quote:
          "The key expectation I have from reports like these is that they provide insights into real-world applications, particularly in the B2B space where I've been working for over two decades.",
        name: "Ojas Kulkarni",
        role: "Global Chief Marketing Officer",
        company: "Cedar Consulting",
      },
      {
        image: "/voices/automation-campaign-management/megha-agarwal.png",
        quote:
          "The most valuable insights for readers will be how personalised marketing strategies driven by customer data have helped us to increase engagement and conversion rates.",
        name: "Megha Agarwal",
        role: "Marketing Manager",
        company: "ShopClues",
      },
      {
        image: "/voices/automation-campaign-management/lijo-mathew.png",
        quote:
          "My expectations from the report are to gain insights into various perspectives from marketers, including new methods and emerging trends.",
        name: "Lijo Mathew",
        role: "Deputy Manager, Online Campaign (BPD)",
        company: "The Indian Express",
      },
      {
        image: "/voices/automation-campaign-management/jyoti-khichar.png",
        quote:
          "Readers will find value in being able to apply the findings directly to their strategies, projects, or decision-making processes.",
        name: "Jyoti Khichar",
        role: "Digital Marketing Manager",
        company: "CK Birla Healthcare Pvt. Ltd.",
      },
      {
        image: "/voices/automation-campaign-management/anju-singh.png",
        quote:
          "True digital marketing is much more than just using tools, it's about understanding strategy and effectively connecting with audiences.",
        name: "Anju Singh",
        role: "Deputy Manager, Digital & Social Media Marketing",
        company: "Ashoka University",
      },
      {
        image: "/voices/automation-campaign-management/anand-mohan.png",
        quote:
          "It's always helpful to organise such events and seminars where people from the same or different industries can participate to gain experience about any challenges whose solutions have already been found by someone else.",
        name: "Anand Mohan",
        role: "Marketing Manager",
        company: "Laxmi India Finance Private Limited",
      },
      {
        image: "/voices/automation-campaign-management/amitesh-baranwal.png",
        quote:
          "I would like to see a deep dive into the latest trends in digital marketing, particularly around AI and machine learning's role in automation and personalisation.",
        name: "Amitesh Baranwal",
        role: "Digital Marketing Manager",
        company: "SK Finance",
      },
    ],
  },

  credits: {
    sponsor: {
      label: "Research sponsor",
      name: "Zoho",
      logos: [
        {
          name: "Zoho Campaigns",
          logo: "https://www.zohowebstatic.com/sites/zweb/images/productlogos/campaigns.svg",
        },
        {
          name: "Zoho Marketing Automation",
          logo: "https://www.zohowebstatic.com/sites/zweb/images/productlogos/marketingautomation.svg",
        },
      ],
    },
    partnerLabel: "Research partner",
  },
};

/** Copy transcribed from
    researchnxt.com/microsite/unlocking-the-power-of-unified-cx/ (its English
    face; the microsite's Arabic toggle and Arabic content are not carried). */
const unlockingThePowerUnifiedCX: ReportLanding = {
  slug: "unlocking-the-power-unified-cx",
  metaTitle: "Unlocking the Power of Unified CX",
  metaDescription:
    "Explore the latest insights, strategies and innovations driving customer centric transformations in Qatar, from 100 survey responses and 6 expert interviews.",

  hero: {
    title: "Unlocking the Power of Unified CX",
    lede: "Explore the latest insights, strategies and innovations driving customer centric transformations in Qatar",
    cover: "/covers/unlocking-the-power-unified-cx.png",
    coverAlt: "Cover of the Unlocking the Power of Unified CX report",
  },

  cardImage: "/covers/unlocking-the-power-unified-cx-card.png",

  download: {
    jotformId: "250201862296454",
    submitLabel: "Download",
    consent: [
      {
        text: "By submitting this form, you agree to have your contact information, including email, passed on to Zoho for the purpose of following up on your interests, and that you have read and agree to the ",
      },
      { text: "Research NXT Privacy Policy", href: "/privacy-policy" },
      { text: " and the " },
      {
        text: "Zoho Privacy Policy",
        href: "https://www.zoho.com/privacy.html",
        external: true,
      },
      { text: "." },
    ],
  },

  description: [
    "**Unlocking the Power of Unified Customer Experience** is a practical handbook designed to empower businesses in Qatar to create seamless and consistent customer experiences across touchpoints.",
    "Built on insights from **100 survey responses** and **6 expert interviews** across industries like BFSI, retail, education, and hospitality, this guide offers actionable strategies to achieve Unified CX. Sponsored by Zoho CRM Plus and enriched with secondary research, it provides a deep dive into innovative trends, best practices, and real-world examples shaping CX in Qatar.",
  ],

  expect: {
    title: "What to expect from the report",
    sections: [
      /* Hard-wrapped to three lines apiece, matching the other landings. */
      {
        name: "Insights",
        description:
          "Explore how Qatari businesses are\nadopting Unified CX strategies to create\nseamless customer journeys across touchpoints",
        image: "/report-sections/ucx-insights.png",
      },
      {
        name: "Challenges & Solutions",
        description:
          "Understand the regional challenges\nof achieving Unified CX and discover\nactionable strategies to overcome them",
        image: "/report-sections/ucx-challenges.png",
      },
      {
        name: "Trends",
        description:
          "Learn about the latest trends,\ncutting-edge technologies and best practices\ndriving Unified CX, centered in Qatar",
        image: "/report-sections/ucx-trends.png",
      },
    ],
  },

  quickReads: {
    title: "Quick reads for unlocking the power of unified CX",
    items: [
      {
        title:
          "Unified Customer Experience: The Next Frontier for Businesses in Qatar",
        href: "/resources/insights/unlocking-the-power-unified-cx/unified-customer-experience-the-next-frontier-for-businesses-in-qatar",
        image:
          "/insights/unlocking-the-power-unified-cx/unified-customer-experience-the-next-frontier-for-businesses-in-qatar.png",
      },
    ],
  },

  /* One flat list on the microsite, so a single group; the template renders
     it as a plain grid rather than a one-tab rail. */
  expertInsights: {
    title: "Insights shared by industry professionals",
    groups: [
      {
        stage: "Industry professionals",
        items: [
          "asish-chathanath",
          "harshil-shah",
          "mohamed-rabie",
          "ahmed-badr",
          "vaishnavi-soundarrajan",
        ].map(ucxCard),
      },
    ],
  },

  voices: {
    items: [
      {
        image:
          "/voices/unlocking-the-power-unified-cx/vaishnavi-soundarrajan.png",
        quote:
          "We want to understand how the Qatari market perceives customer experience, and provide businesses in the region with a valuable resource to understand the current state of customer experience.",
        name: "Vaishnavi Soundarrajan",
        role: "Regional Manager of Marketing, MEA",
        company: "Zoho",
      },
      {
        image: "/voices/unlocking-the-power-unified-cx/asish-chathanath.png",
        quote:
          "I'm particularly interested in understanding how new technologies, especially AI, can transform marketing in the medical industry.",
        name: "Asish Chathanath",
        role: "IT Manager",
        company: "Marble Medical Hospital",
      },
      {
        image: "/voices/unlocking-the-power-unified-cx/mohamed-rabie.png",
        quote:
          "I expect this report to provide actionable insights for startups on implementing and scaling unified CX strategies.",
        name: "Mohamed Rabie",
        role: "Programs Manager",
        company: "Risin Ventures",
      },
      {
        image: "/voices/unlocking-the-power-unified-cx/ahmed-badr.png",
        quote:
          "Businesses should focus on leveraging AI-powered insights, adopting hyper-personalisation, embracing predictive analytics, and investing in customer-centricity.",
        name: "Ahmed Badr",
        role: "Director of Sales and Business Development",
        company: "MBK Holding",
      },
      {
        image: "/voices/unlocking-the-power-unified-cx/harshil-shah.png",
        quote:
          "By keeping the customer at the centre and regularly assessing our strategies, we can ensure that we are always evolving to meet their expectations.",
        name: "Harshil Shah",
        role: "Assistant Manager, IT",
        company: "Lals Group",
      },
    ],
  },

  credits: {
    sponsor: {
      label: "Research sponsor",
      name: "Zoho CRM Plus",
      logos: [
        { name: "Zoho", logo: "/logos/trusted/zoho.svg" },
        { name: "Zoho CRM Plus", logo: "/logos/trusted/zoho-crmplus.svg" },
      ],
    },
    partnerLabel: "Research partner",
  },
};

/** Copy transcribed from
    researchnxt.com/microsite/navigating-corporate-commute-for-gccs-in-india/ */
const navigatingCorporateCommute: ReportLanding = {
  slug: "navigating-corporate-commute-for-gccs-in-india",
  metaTitle: "Navigating Corporate Commute for GCCs in India",
  metaDescription:
    "How India's global capability centres can move employee transport beyond fragmented, manual processes, with commute maturity benchmarks and data-driven insights.",

  hero: {
    title: "Navigating Corporate Commute for GCCs in India",
    lede: "Benchmark commute maturity across India's global capability centres and reimagine employee transport as a driver of productivity and growth",
    cover: "/covers/navigating-corporate-commute-for-gccs-in-india.png",
    coverAlt:
      "Cover of the Navigating Corporate Commute for GCCs in India report",
  },

  cardImage: "/covers/navigating-corporate-commute-for-gccs-in-india-card.png",

  download: {
    jotformId: "260490193043452",
    submitLabel: "Download",
    consent: [
      {
        text: "By submitting this form, you agree to have your contact information, including email, passed on to Routematic for the purpose of following up on your interests, and that you have read and agree to the ",
      },
      { text: "Research NXT Privacy Policy", href: "/privacy-policy" },
      { text: "." },
    ],
  },

  description: [
    "For India's Global Capability Centers, employee commute has become a complex ecosystem that influences operational efficiency, talent retention, and the bottom line. Too often, it remains siloed between HR, Facilities, and Finance, treated as a costly necessity instead of a strategic asset.",
    "**Navigating Corporate Commute for GCCs in India** examines the current state of commute maturity across the industry and offers benchmarks with data-driven insights. It shows how organisations can move beyond fragmented, manual processes and reimagine employee transport as a driver of productivity, satisfaction, and measurable business growth.",
  ],

  expect: {
    title: "What to expect from the report",
    sections: [
      /* Hard-wrapped to three lines apiece, matching the other landings. */
      {
        name: "Landscape & Maturity",
        description:
          "Analyse the current GCC commute\nlandscape. Benchmark your maturity\nto find strategic paths for growth",
        image: "/report-sections/gcc-landscape.png",
      },
      {
        name: "Strategic Gap Analysis",
        description:
          "Pinpoint hidden operational and\nstrategic gaps. Learn proven solutions\nand methods from industry leaders",
        image: "/report-sections/gcc-gap-analysis.png",
      },
      {
        name: "Future-Ready Framework",
        description:
          "Explore the future of commute with AI\nand SuperApps. Turn your transport from\na cost centre into a strategic asset",
        image: "/report-sections/gcc-framework.png",
      },
    ],
  },

  quickReads: {
    title: "Quick reads",
    items: [
      {
        title:
          "Rethinking the Daily Commute: Why Unified Mobility Is Becoming a Strategic Priority for GCCs in India",
        href: "/resources/insights/navigating-corporate-commute-for-gccs-in-india/rethinking-the-daily-commute",
        image:
          "/insights/navigating-corporate-commute-for-gccs-in-india/rethinking-the-daily-commute.jpg",
      },
    ],
  },

  /* One flat list on the microsite, so a single group and no tab rail. */
  expertInsights: {
    title: "Insights shared by experts",
    groups: [
      {
        stage: "Experts",
        items: [
          "protick-basu",
          "garvita-sandhu",
          "abhishek-patel",
          "aditya-gupta",
          "ashis-jain",
        ].map(gccCard),
      },
    ],
  },

  voices: {
    items: [
      {
        image:
          "/voices/navigating-corporate-commute-for-gccs-in-india/abhishek-patel.png",
        quote:
          "For readers, the report should enable informed decision-making and help keep our transport program safe, compliant, and future-ready.",
        name: "Abhishek Patel",
        role: "Sr. Manager, Workplace Operations",
        company: "Searce Technologies Inc.",
      },
      {
        image:
          "/voices/navigating-corporate-commute-for-gccs-in-india/aditya-gupta.png",
        quote:
          "This report highlights that transport operations are not just a logistical function but a critical component of employee well-being, business continuity, and organizational trust.",
        name: "Aditya Gupta",
        role: "Head of Administration",
        company: "NEC Corp.",
      },
      {
        image:
          "/voices/navigating-corporate-commute-for-gccs-in-india/ashis-jain.png",
        quote:
          "Readers will be able to understand what other industry peers are up to, while also enabling solution providers to design their solutions around customer pain points, challenges, and aspirational wish lists.",
        name: "Ashis Jain",
        role: "Director, Procurement",
        company: "Vesuvius India Ltd.",
      },
      {
        image:
          "/voices/navigating-corporate-commute-for-gccs-in-india/garvita-sandhu.png",
        quote:
          "It should help decision-makers understand how employee commute programs are evolving from traditional models to more technology-enabled",
        name: "Garvita Sandhu",
        role: "Director, Administration",
        company: "PayU B.V.",
      },
      {
        image:
          "/voices/navigating-corporate-commute-for-gccs-in-india/protick-basu.png",
        quote:
          "The report should help leaders understand where they stand today and how employee transport impacts real business outcomes.",
        name: "Protick Basu",
        role: "Vice President, Workspace",
        company: "ANSR Inc",
      },
    ],
  },

  credits: {
    sponsor: {
      label: "Research sponsor",
      name: "Routematic",
      logo: "/logos/trusted/routematic.png",
    },
    partnerLabel: "Research partner",
  },
};

/** Copy transcribed from
    researchnxt.com/bambooreports/transforming-cx-through-gcc-ebook/. That page
    is an eBook landing rather than a research microsite: it carries no
    Jotform of its own, so the eBook's own form id is used, and its "This
    E-book will acquaint you with" bullets stand in for the chapter band. */
const transformingCxThroughGccs: ReportLanding = {
  slug: "transforming-cx-through-gccs",
  metaTitle: "Transforming CX through GCCs",
  metaDescription:
    "How top global brands tech-enable their digital customer experience through the Indian GCC model, with real-world use cases and insights from GCC leaders.",

  hero: {
    title: "Transforming CX through GCCs",
    lede: "How top global brands tech-enable their digital customer experience through the Indian GCC model",
    cover: "/covers/transforming-cx-through-gccs.png",
    coverAlt: "Cover of the Transforming CX through GCCs eBook",
  },

  cardImage: "/covers/transforming-cx-through-gccs-card.png",

  download: {
    jotformId: "241762483249463",
    submitLabel: "Download",
    consent: [
      {
        text: "By submitting this form, you agree that you have read and agree to the ",
      },
      { text: "Research NXT Privacy Policy", href: "/privacy-policy" },
      { text: "." },
    ],
  },

  description: [
    "Are you a global enterprise looking to upgrade your Digital CX game through the India shared service centers?",
    "This eBook explores **how top global brands tech-enable their digital customer experience through the Indian GCC model**, with the potential of the in-house GCC model, real-world use cases, and actionable insights gathered from the leaders running them.",
  ],

  expect: {
    title: "This eBook will acquaint you with",
    sections: [
      /* Hard-wrapped to three lines apiece, matching the other landings. */
      {
        name: "Potential",
        description:
          "Exploration of the potential\nof GCCs in the\nDigital CX space",
        image: "/report-sections/gcccx-potential.png",
      },
      {
        name: "Use cases",
        description:
          "Use cases of Indian GCCs\nempowering CX for\nGlobal Enterprises",
        image: "/report-sections/gcccx-use-cases.png",
      },
      {
        name: "Insights",
        description:
          "Actionable insights by\nKey Opinion Leaders\nof Indian GCCs",
        image: "/report-sections/gcccx-insights.png",
      },
    ],
  },

  quickReads: {
    title: "Quick reads",
    items: [
      {
        title:
          "2024 Outlook on Maturing Digital CX and the Role of Indian GCCs",
        href: "/resources/insights/transforming-cx-through-gccs/indian-gccs-digital-cx-outlook-2024",
        image:
          "/insights/transforming-cx-through-gccs/indian-gccs-digital-cx-outlook-2024.png",
      },
    ],
  },

  /* One flat list on the source page, so a single group and no tab rail. */
  expertInsights: {
    title: "Insights shared by GCC leaders",
    groups: [
      {
        stage: "GCC leaders",
        items: [
          "geetanjali-chugh-kothari",
          "vivek-veeraraghavan",
          "vineet-dwivedi",
          "sharda-nenwani-gupta",
        ].map(gccCxCard),
      },
    ],
  },

  /* This page runs no quote cards, so the landing carries no voices band. */

  credits: {
    sponsor: {
      label: "Brought to you by",
      name: "Bamboo Reports",
      logo: "/logos/trusted/bamboo-reports.svg",
    },
    partnerLabel: "Research partner",
  },
};

/** Copy from researchnxt.com/microsite/cloud-computing-trends-in-india-2021/.
    That 2021 microsite bakes its body copy into images, so the description and
    the three chapter cards were supplied by the user rather than scraped, and
    it carries no Jotform: the landing uses the project's 2021 report form. */
const cloudComputingNewNormal: ReportLanding = {
  slug: "cloud-computing-new-normal-beyond",
  metaTitle: "Cloud Computing in the New Normal & Beyond",
  metaDescription:
    "India's progressing cloud computing market in 2021: adoption trends by service and deployment type, sector priorities, and the top adoption and management challenges.",

  hero: {
    title: "Cloud Computing in the New Normal & Beyond",
    lede: "India Inc's need for cloud computing in 2021 and beyond, a ready reckoner for cloud transformation custodians",
    cover: "/covers/cloud-computing-new-normal-beyond.png",
    coverAlt: "Cover of the Cloud Computing in the New Normal & Beyond report",
  },

  cardImage: "/covers/cloud-computing-new-normal-beyond-card.png",

  download: {
    jotformId: "211600107593446",
    submitLabel: "Download",
    consent: [
      {
        text: "By submitting this form, you agree that you have read and agree to the ",
      },
      { text: "Research NXT Privacy Policy", href: "/privacy-policy" },
      { text: "." },
    ],
  },

  description: [
    "As we are inching into the industry 4.0 revolution, it's hard to imagine businesses without Cloud Computing. On top of that, these uncertain times have certainly exposed the edge that cloud-enabled business had over the rest.",
    "Is your organisation also creating strategies and best practices to migrate applications to the cloud seamlessly? If so, in this report, you will find answers, peer insights and circumstances that led to the spike in cloud adoptions in India in 2021 and explore the accountable business value it delivers.",
  ],

  /* No chapter band: this microsite has none, and the report makes no such
     claim anywhere we can source. */

  offer: {
    label: "Exclusive offer from",
    logo: {
      /* The white variant: this mark sits on the accent feature tile. The
         red variant stays in `logos/trusted/motherson-mind.svg` for the
         credits band. */
      src: "/logos/trusted/motherson-mind-white.svg",
      alt: "MothersonSumi INfotech & Designs Ltd. (MIND)",
    },
    items: [
      {
        icon: "consulting",
        text: "Free Consulting on Resource Optimization",
      },
      {
        icon: "assessment",
        text: "Complimentary Cloud Framework Assessment for your Organization",
      },
      {
        icon: "waiver",
        text: "One-Month Billing Waiver for all New Workloads on AWS Cloud",
      },
    ],
  },

  quickReads: {
    title: "Quick reads",
    items: [
      {
        title: "Top 5 Cloud Computing Trends that India Needs to Know",
        href: "/resources/insights/cloud-computing-new-normal-beyond/top-5-cloud-computing-trends",
        image:
          "/insights/cloud-computing-new-normal-beyond/top-5-cloud-computing-trends.jpg",
      },
      {
        title: "Top 5 Cloud Adoption Trends in 2021",
        href: "/resources/insights/cloud-computing-new-normal-beyond/top-5-cloud-adoption-trends",
        image:
          "/insights/cloud-computing-new-normal-beyond/top-5-cloud-adoption-trends.jpg",
      },
      {
        title:
          "The New Normal Accelerates India Inc.'s Need for Cloud Computing in 2021 and Beyond",
        href: "/resources/insights/cloud-computing-new-normal-beyond/the-new-normal-cloud-computing",
        image:
          "/insights/cloud-computing-new-normal-beyond/the-new-normal-cloud-computing.png",
      },
    ],
  },

  /* One flat list on the microsite, so a single group and no tab rail. */
  expertInsights: {
    title: "Invaluable peer insights",
    groups: [
      {
        stage: "Cloud leaders",
        items: ["devang-mehta", "abhrajit-de", "arup-choudhury"].map(cloudCard),
      },
    ],
  },

  /* This microsite runs no quote cards, so no voices band. */

  credits: {
    sponsor: {
      label: "Research sponsor",
      name: "MothersonSumi INfotech & Designs Ltd. (MIND)",
      logo: "/logos/trusted/motherson-mind.svg",
    },
    partnerLabel: "Research partner",
  },
};

/** Copy transcribed from
    researchnxt.com/microsite/business-strategy-2021/. Structurally the odd one
    out: no chapter band, a ten-item "Reports Highlights" list instead, two
    sponsors under "Brought to you by", quote cards carried as text beside
    speaker photographs, and a launch event sitting alongside the two articles
    in the quick reads. It carries no Jotform, so the landing uses the
    project's 2021 report form. */
const southEastAsiaResponseGuide: ReportLanding = {
  slug: "south-east-asia-response-guide",
  metaTitle: "Southeast Asia Response Guide 2021",
  metaDescription:
    "The Best of Business Strategies In The New Normal: bounce-back strategies for emerging industries and business functions across Southeast Asia.",

  hero: {
    title: "Southeast Asia Response Guide 2021",
    lede: "The Best of Business Strategies In The New Normal",
    cover: "/covers/south-east-asia-response-guide.png",
    coverAlt: "The Southeast Asia Response Guide 2021 open on a tablet",
  },

  cardImage: "/covers/south-east-asia-response-guide-card.png",

  download: {
    jotformId: "211602133570442",
    submitLabel: "Download",
    consent: [
      {
        text: "By submitting this form, you agree that you have read and agree to the ",
      },
      { text: "Research NXT Privacy Policy", href: "/privacy-policy" },
      { text: "." },
    ],
  },

  description: [
    "This eBook titled **The Best of Business Strategies In The New Normal** is an outcome of our discussions with business leaders across prominent industries and business functions from the Southeast Asian region.",
    "It captures the best of bounce-back strategies for the emerging industries and business functions in the Southeast Asian region, and will be a go-to guide for most businesses in the region.",
  ],

  /* No chapter band on this microsite; it runs a highlights list instead. */

  highlights: {
    title: "Report highlights",
    items: [
      "Focus on the Last-Mile Delivery",
      "Increase in Ancillary Revenues",
      "Digital-First Approach",
      "The upsurge of Audio Platforms",
      "Rise of Self-service platforms",
      "Redesigning Supply Chain",
      "Remote & Virtual Work Force",
      "AI & Digital transformation",
      "Service Delivery Innovations",
      "Data Driven Marketing",
    ],
  },

  quickReads: {
    title: "Quick reads",
    items: [
      {
        title: "5 Major Business Rebound Strategies",
        href: "/resources/insights/south-east-asia-response-guide/5-major-business-rebound-strategies",
        image:
          "/insights/south-east-asia-response-guide/5-major-business-rebound-strategies.png",
      },
      {
        title: "Key Takeaways from The Best of Business Strategies",
        href: "/resources/insights/south-east-asia-response-guide/key-takeaways-business-strategies",
        image:
          "/insights/south-east-asia-response-guide/key-takeaways-business-strategies.png",
      },
      {
        title: "Southeast Asia Response Guide 2021, report launch",
        href: "/resources/events/south-east-asia-response-guide/business-strategy-report-launch",
        image: "/events/business-strategy-report-launch.png",
      },
    ],
  },

  /* One flat list on the microsite, so a single group and no tab rail. */
  expertInsights: {
    title: "Experts view",
    groups: [
      {
        stage: "Business leaders",
        items: [
          "anil-gautam",
          "ravi-shankar",
          "johnny-widodo",
          "aaron-foo",
          "karunjit-kumar-dhir",
          "walter-de-oude",
        ].map(seaCard),
      },
    ],
  },

  /* The microsite runs these as text quotes beside speaker photographs
     rather than as baked quote cards, so there is no artwork to carry and
     the copy is quoted as written. */
  voices: {
    items: [
      {
        image: "/experts/anil-gautam.jpg",
        quote:
          "We are innovating by creating newer digital models to enhance interactions and experiences. And we're looking a lot more on the front-end agility and ensuring the back end can support any customization required at the front-end.",
        name: "Anil Gautam",
        role: "Managing Director, DHL eCommerce",
        company: "Malaysia",
      },
      {
        image: "/experts/ravi-shankar.jpg",
        quote:
          "The proudest innovation that we did is that we built a system that identifies a non-performing route voluntarily and automatically launches aligned marketing campaigns without any human intervention and manual analysis.",
        name: "Ravi Shankar",
        role: "Chief Growth Officer",
        company: "AirAsia",
      },
      {
        image: "/experts/johnny-widodo.jpg",
        quote:
          "When businesses start to plan, the focus should be on incremental innovation, incremental benefit, and incremental improvement on the current existing product, or is basically switching towards a very new product.",
        name: "Johnny Widodo",
        role: "CEO, OLX Group",
        company: "Indonesia",
      },
      {
        image: "/experts/aaron-foo.jpg",
        quote:
          "It is about removing things that you do not need; it could be just the middleman or the technology to simplify the business operations. It should have happened before COVID, but nobody focused on it until things happened.",
        name: "Aaron Foo",
        role: "Head of Product Strategy",
        company: "iCar Asia",
      },
      {
        image: "/experts/karunjit-kumar-dhir.jpg",
        quote:
          "After the wave of remote or work from anywhere trend, the extension of that trend will be many employers also allowing for BYOD, Bring Your Own Device. And because of this, the whole IT security landscape will evolve.",
        name: "Karunjit Kumar Dhir",
        role: "Co-founder",
        company: "SCIKEY",
      },
      {
        image: "/experts/walter-de-oude.jpg",
        quote:
          "Everything about our service is digital and mobile-first. We found that people had more time to pause and sort out their finances. We also found that people were more responsive to interacting with financial services in a digital way.",
        name: "Walter de Oude",
        role: "Founder of Singlife and Deputy Chairman",
        company: "Aviva Singlife",
      },
    ],
  },

  credits: {
    sponsor: {
      label: "Brought to you by",
      name: "Linkedpreneur and beyond99",
      logos: [
        { name: "Linkedpreneur", logo: "/logos/trusted/linkedpreneur.png" },
        { name: "beyond99", logo: "/logos/trusted/beyond99.png" },
      ],
    },
    partnerLabel: "Research partner",
  },
};

/** Copy transcribed from
    researchnxt.com/microsite/ai-led-personalization-2020/. The richest of the
    2020-21 microsites: a "Journey" figure strip, six core insights, the
    interviews grouped by industry segment, a client testimonial and a launch
    event. It carries no Jotform, so the landing uses the project's 2020 form.
    Kalpit Jain's interview is published but absent from this microsite, so it
    is absent from the groups here too. */
const aiLedPersonalization: ReportLanding = {
  slug: "ai-led-personalization",
  metaTitle: "AI Led Personalization: Strategy and Trends, India 2020",
  metaDescription:
    "AI powered business strategies of B2C brands in India: interviews with marketing leaders across BFSI, OTT, e-commerce and D2C, and digital-first businesses.",

  hero: {
    title: "AI Led Personalization: Strategy and Trends, India 2020",
    lede: "A journey through the pandemic, and into the new normal",
    cover: "/covers/ai-led-personalization.png",
    coverAlt:
      "The AI Led Personalization Strategy and Trends Report, India 2020 on a tablet",
  },

  cardImage: "/covers/ai-led-personalization-card.png",

  download: {
    jotformId: "200151888635458",
    submitLabel: "Download",
    consent: [
      {
        text: "By submitting this form, you agree that you have read and agree to the ",
      },
      { text: "Research NXT Privacy Policy", href: "/privacy-policy" },
      { text: "." },
    ],
  },

  description: [
    "**AI Led Personalization: Strategy and Trends, India 2020**, produced by Research NXT in association with Netcore, is based on interviews and discussions with marketing leaders from B2C businesses across India.",
    "The report is focused on four industry segments, BFSI, OTT, e-commerce and D2C, and digital-first businesses, and also includes perspectives from industry experts in the AI, ML, and marketing technology space. The insight and information this report provides were painstakingly acquired through exclusive interviews with marketing leaders in India in these industries.",
  ],

  /* The microsite's "Journey" strip, as measured figures. */
  figures: {
    title: "The journey",
    items: [
      { value: "180", label: "Days of research" },
      { value: "4", label: "Thought leader insights" },
      { value: "18", label: "Marketing leader interviews" },
      { value: "300+", label: "Attendees in the report launch" },
    ],
  },

  highlights: {
    title: "Core insights",
    items: [
      "Personalization with AI is the biggest competitive advantage",
      "Data is the currency of Marketing",
      "Marketing is now a true tech-powered discipline",
      "Success of AI implementation will determine business success",
      "Technology cannot alone create consumer empathy but marketers can",
      "Customer Engagement is the significant driver of growth",
    ],
  },

  quickReads: {
    title: "Check out the launch event",
    items: [
      {
        title: "AI Led Personalization 2020, eBook launch",
        href: "/resources/events/ai-led-personalization/ai-led-ebook-launch",
        image: "/events/ai-led-ebook-launch.png",
      },
    ],
  },

  /* Grouped by industry segment, which is how the microsite tabs them. */
  expertInsights: {
    title: "A landmark culmination of insights in marketing",
    groups: [
      {
        stage: "Thought Leaders",
        items: ["lloyd-mathias", "scott-brinker", "david-raab"].map(aiCard),
      },
      {
        stage: "OTT Industry",
        items: [
          "rahul-mishra",
          "divya-dixit",
          "abhishek-joshi",
          "shwetha-iyer",
        ].map(aiCard),
      },
      {
        stage: "E-Commerce & Direct to Consumer",
        items: [
          "akshay-matkar",
          "ayush-agarwal",
          "banwari-lal-sharma",
          "avnish-anand",
          "ritesh-ghosal",
          "meera-iyer",
        ].map(aiCard),
      },
      {
        stage: "Digital-First Business",
        items: ["rohit-srivastav", "sanjay-gupta", "ritesh-bhatnagar"].map(
          aiCard,
        ),
      },
      {
        stage: "Banking & Financials",
        items: [
          "tv-naarayan",
          "ravi-santhanam",
          "iti-mehrotra",
          "sweta-aggarwall",
        ].map(aiCard),
      },
    ],
  },

  /* The microsite's "Client Testimonial", carried as the one voice card it
     is: the quote is baked into the artwork, so it is quoted here too. */
  voices: {
    items: [
      {
        image: "/voices/ai-led-personalization/rohit-srivastav.png",
        quote:
          "Research NXT has the knowledge and experience of providing Marketing Solutions that we were seeking in a vendor.",
        name: "Rohit Shrivastav",
        role: "Head of Growth",
        company: "Netcore Solutions",
      },
    ],
  },

  credits: {
    sponsor: {
      label: "In association with",
      name: "Netcore",
      logo: "/logos/trusted/netcore.png",
    },
    partnerLabel: "Research partner",
  },
};

export const reportLandings: ReportLanding[] = [
  implementersGuideToAI,
  automationCampaignManagement,
  unlockingThePowerUnifiedCX,
  navigatingCorporateCommute,
  transformingCxThroughGccs,
  cloudComputingNewNormal,
  southEastAsiaResponseGuide,
  aiLedPersonalization,
];

export function getReportLanding(slug: string) {
  return reportLandings.find((report) => report.slug === slug);
}
