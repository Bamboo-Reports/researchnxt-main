import { eventHref, getEvent } from "@/content/events";
import { getExpertInterview, interviewHref } from "@/content/experts-view";
import {
  getSuccessStory,
  successStoryHref,
} from "@/content/success-stories";

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

const cmCard = (person: string) =>
  interviewCard("content-marketing-done-right", person);

const abmCard = (person: string) =>
  interviewCard("abm-best-practices-report-india-2018", person);

const b2cMasCard = (person: string) =>
  interviewCard("b2c-marketing-automation-india-2017", person);

const gccEngagementCard = (person: string) =>
  interviewCard("state-of-consumer-engagement-gcc-2019", person);

const etutoringCard = (person: string) =>
  interviewCard("etutoring-best-practices-whitepaper-2016", person);

const publisherCard = (person: string) =>
  interviewCard("publishers-guide-to-smarter-monetization", person);

/**
 * A card for one published event, so a landing's launch band names the event
 * rather than restating a title, a URL and artwork that already live in the
 * events registry. A typo in a slug fails the build.
 */
function eventCard(project: string, slug: string): ReportCardItem {
  const event = getEvent(project, slug);
  if (!event) {
    throw new Error(`Unknown event: ${project}/${slug}`);
  }
  return {
    title: event.title,
    href: eventHref(event),
    image: event.image,
  };
}

/**
 * A card for one published success story, for a landing whose source page
 * carries a "Client Testimonial" band with a link through to the full case
 * study. Resolved from the success stories registry for the same reason
 * `eventCard` resolves events.
 */
function successStoryCard(
  project: string,
  slug: string,
  image?: string,
): ReportCardItem {
  const story = getSuccessStory(project, slug);
  if (!story) {
    throw new Error(`Unknown success story: ${project}/${slug}`);
  }
  return {
    title: story.title,
    href: successStoryHref(story),
    /* The story's own image is the testimonial card, which the landing already
       runs as a voice card, so a landing may pass its own artwork instead. */
    image: image ?? story.image,
  };
}

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
  /**
   * When the report was published, ISO `YYYY-MM-DD`. Used to order the
   * "Latest reports" band on the home page, so that band stays correct as
   * programmes are added rather than being hand-maintained.
   */
  published: string;
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
   * Portrait cover for the reports library's book-shelf grid, the report's
   * own vertical cover at full bleed (A4, 210:297). Until a report has one
   * the library shows its landscape `cardImage` letterboxed on a muted
   * plate, so supplying this file per report is the whole rollout.
   */
  cardPortrait?: string;

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
   * `logo` is the mark's white variant.
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

  /**
   * The programme's own facts, as the 2019 GCC microsite lists them beside the
   * highlights: research focus, technology, geography, timeframe. Rendered as
   * a definition list, the same device the event pages use.
   */
  facts?: { label: string; value: string }[];

  /**
   * Optional: a programme with no published articles runs no rail rather than
   * an empty one.
   */
  quickReads?: { title: string; items: ReportCardItem[] };

  /**
   * Expert interviews grouped by AI maturity stage, in stage order. Optional
   * for the same reason as `quickReads`: not every programme ran interviews.
   */
  expertInsights?: {
    title: string;
    groups: { stage: string; items: ReportCardItem[] }[];
  };

  /**
   * The things the source landing points at in bands of their own: a launch
   * event, a client success story. Each card's title, artwork and URL are
   * resolved from the relevant registry by `eventCard` or `successStoryCard`,
   * so the piece stays described in exactly one place; only the landing's own
   * sentence about it lives here. A list, because the 2017 microsite points at
   * both its webinar and its case study.
   */
  spotlights?: {
    title: string;
    /**
     * Optional: where the artwork already carries the story, a written
     * sentence about it only says the same thing twice.
     */
    description?: string;
    linkLabel: string;
    card: ReportCardItem;
    /**
     * Programme facts sitting beside the spotlight copy instead of the
     * card's image, the way the AI-led microsite sets its facts to the
     * right of the client testimonial. The card still supplies the link.
     */
    facts?: { label: string; value: string }[];
    /**
     * Render the band above the interviews rather than after them, where
     * the source microsite puts it. Default is after, which is where the
     * closing pointers belong.
     */
    beforeInterviews?: boolean;
  }[];

  /**
   * Quote cards from the research participants. The source artwork bakes the
   * quote and the attribution into the image, so both are carried here as
   * text too: they compose the alt text, which is the only way a reader who
   * cannot see the card gets the quote at all.
   */
  voices?: {
    items: {
      /**
       * Path under /public, where the source bakes the quote into card
       * artwork. Omitted where the source runs plain text testimonials, and
       * the carousel then sets the quote as text instead.
       */
      image?: string;
      /**
       * Cut-out speaker portrait accompanying a text testimonial, shown on
       * the plate disc beside the quote. Only read when `image` is absent.
       */
      portrait?: string;
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
const implementorsGuideToAI: ReportLanding = {
  slug: "implementors-guide-to-ai",
  published: "2025-02-20",
  metaTitle: "Implementor's Guide to AI",
  metaDescription:
    "Explore the comprehensive framework for AI readiness, strategies, governance, and cross departmental integration in Indian businesses across industries",

  hero: {
    title: "Implementor's Guide to AI",
    lede: "Explore the comprehensive framework for AI readiness, strategies, governance, and cross departmental integration in Indian businesses across industries",
    cover: "/covers/implementors-guide-to-ai-hero.png",
    coverAlt: "Cover of the Implementor's Guide to AI report",
  },

  cardImage: "/covers/implementors-guide-to-ai-card.png",
  cardPortrait: "/covers/implementors-guide-to-ai-portrait.png",

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
    "The **Implementor's Guide to AI** is a practical handbook crafted to empower businesses on their journey to adopting and scaling AI.",
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
        image: "/report-sections/implementors-guide-landscape.png",
      },
      {
        name: "Strategy",
        description:
          "Understand how strategic AI\nimplementations align with key business\nobjectives to drive measurable growth",
        image: "/report-sections/implementors-guide-strategy.png",
      },
      {
        name: "Governance",
        description:
          "Master responsible AI frameworks\nand assessment methods to ensure\ncompliant and successful deployment",
        image: "/report-sections/implementors-guide-governance.png",
      },
    ],
  },

  quickReads: {
    title: "Quick reads and toolkits for AI adoption",
    items: [
      {
        title:
          "AI is the Future, and the Future is Now: A Preview of the Implementor's Guide to AI",
        href: "/resources/insights/implementors-guide-to-ai/ai-is-the-future-and-the-future-is-now",
        image:
          "/insights/implementors-guide-to-ai/ai-is-the-future-and-the-future-is-now.png",
      },
      {
        title:
          "Implementor's Guide to AI: Finance Leaders Transition from Caution to Customer-Centric Scale",
        href: "/resources/insights/implementors-guide-to-ai/finance-leaders-transition-from-caution-to-customer-centric-scale",
        image:
          "/insights/implementors-guide-to-ai/finance-leaders-transition-from-caution-to-customer-centric-scale.png",
      },
      {
        title:
          "Implementor's Guide to AI: Manufacturing, Automotive & Energy Leaders Move from Pilots to Scale",
        href: "/resources/insights/implementors-guide-to-ai/manufacturing-automotive-energy-leaders-move-from-pilots-to-scale",
        image:
          "/insights/implementors-guide-to-ai/manufacturing-automotive-energy-leaders-move-from-pilots-to-scale.png",
      },
      {
        title:
          "Implementor's Guide to AI: Retail & Consumer Goods Leaders Shift from Experiments to Loyalty-Led Scale",
        href: "/resources/insights/implementors-guide-to-ai/retail-consumer-goods-leaders-shift-from-experiments-to-loyalty-led-scale",
        image:
          "/insights/implementors-guide-to-ai/retail-consumer-goods-leaders-shift-from-experiments-to-loyalty-led-scale.png",
      },
      {
        title: "The Four Waves of AI: A Practical Guide for Business Leaders",
        href: "/resources/insights/implementors-guide-to-ai/the-four-waves-of-ai-a-ready-guide-for-business-leaders",
        image:
          "/insights/implementors-guide-to-ai/the-four-waves-of-ai-a-ready-guide-for-business-leaders.png",
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
            href: "/resources/experts-view/implementors-guide-to-ai/diptarup-chakraborti",
            image: "/experts/diptarup-chakraborti.png",
          },
          {
            title: "How Spacewood Leverages AI to Redefine Customer Experience",
            href: "/resources/experts-view/implementors-guide-to-ai/nimish-thaker",
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
            href: "/resources/experts-view/implementors-guide-to-ai/avnish-anand",
            image: "/experts/avnish-anand.png",
          },
          {
            title: "SkinQ's AI-Powered Vision and Strategic Marketing Insights",
            href: "/resources/experts-view/implementors-guide-to-ai/meera-iyer",
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
            href: "/resources/experts-view/implementors-guide-to-ai/hansveen-kaur",
            image: "/experts/hansveen-kaur.png",
          },
          {
            title:
              "AI's Role in Engineering & Infrastructure: Insights from Manish",
            href: "/resources/experts-view/implementors-guide-to-ai/manish-kumar",
            image: "/experts/manish-kumar.png",
          },
          {
            title:
              "Transforming Retail with AI: Insights from Pressto's Marketing Evolution",
            href: "/resources/experts-view/implementors-guide-to-ai/akshay-matkar",
            image: "/experts/akshay-matkar.png",
          },
          {
            title:
              "AI in Manufacturing: Driving Digital Transformation and Intelligent Operations",
            href: "/resources/experts-view/implementors-guide-to-ai/madhav-vemuri",
            image: "/experts/madhav-vemuri.png",
          },
          {
            title:
              "Insights on Data Unification, Customer Experience, and Ethical Innovation",
            href: "/resources/experts-view/implementors-guide-to-ai/prasad-pimple",
            image: "/experts/prasad-pimple.png",
          },
          {
            title:
              "How Edelweiss Life Insurance is Redefining Industry Standards Through Innovation and AI",
            href: "/resources/experts-view/implementors-guide-to-ai/abhishek-gupta",
            image: "/experts/abhishek-gupta.png",
          },
        ],
      },
      {
        stage: "Deployed",
        items: [
          {
            title: "AI-Led Transformation in Automotive Manufacturing",
            href: "/resources/experts-view/implementors-guide-to-ai/sanjiv-kumar-jain",
            image: "/experts/sanjiv-kumar-jain.png",
          },
          {
            title: "How AI Powers Kissht's Customer-Centric Approach",
            href: "/resources/experts-view/implementors-guide-to-ai/shwetha-iyer",
            image: "/experts/shwetha-iyer.png",
          },
          {
            title:
              "Transforming Customer Engagement, Decision-Making, and Operational Efficiency",
            href: "/resources/experts-view/implementors-guide-to-ai/gaurav-suri",
            image: "/experts/gaurav-suri.png",
          },
          {
            title:
              "How PolicyBoss is Leveraging AI to Redefine Distribution, Personalisation, and Customer Experience",
            href: "/resources/experts-view/implementors-guide-to-ai/varun-kaushik",
            image: "/experts/varun-kaushik.png",
          },
          {
            title:
              "Transforming Insurance Sales and Distribution at Allianz Partners",
            href: "/resources/experts-view/implementors-guide-to-ai/suman-tewary",
            image: "/experts/suman-tewary.png",
          },
          {
            title:
              "How Apollo Hospitals Leverages AI to Revolutionise Patient Care and International Outreach",
            href: "/resources/experts-view/implementors-guide-to-ai/karthik-anantharaman",
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
        image: "/voices/implementors-guide-to-ai/ramesh-mani.png",
        quote:
          "The next big AI breakthrough could come from a company that doesn't even exist today. Staying adaptable and continuously learning will be key to thriving in this AI-driven future.",
        name: "Ramesh Mani",
        role: "Vice President, Professional Services Delivery",
        company: "Salesforce",
      },
      {
        image: "/voices/implementors-guide-to-ai/akshay-matkar.png",
        quote:
          "The report can empower businesses to navigate the complexities of AI adoption effectively, ensuring their efforts are purposeful and result-oriented.",
        name: "Akshay Matkar",
        role: "Chief Growth Officer",
        company: "Pressto",
      },
      {
        image: "/voices/implementors-guide-to-ai/gaurav-suri.png",
        quote:
          "By combining continuous learning, strategic alignment, and collaboration, organisations can build a resilient, forward-looking culture that effectively integrates AI to revolutionise business.",
        name: "Gaurav Suri",
        role: "Chief Evangelist",
        company: "Finlabs India Pvt Ltd",
      },
      {
        image: "/voices/implementors-guide-to-ai/prasad-pimple.png",
        quote:
          "It's primarily about understanding what others have done, including their successes and, more importantly, their failures.",
        name: "Prasad Pimple",
        role: "Executive VP & Head of Digital Business Unit",
        company: "Kotak Life",
      },
      {
        image: "/voices/implementors-guide-to-ai/abhishek-gupta.png",
        quote:
          "Success with AI often comes through trial and error. Be prepared to fail frequently, as this iterative process is critical to discovering solutions that yield meaningful results.",
        name: "Abhishek Gupta",
        role: "Chief Marketing Officer",
        company: "Edelweiss Life Insurance",
      },
      {
        image: "/voices/implementors-guide-to-ai/varun-kaushik.png",
        quote:
          "By adopting a pragmatic, goal-oriented approach, you can harness AI as a powerful enabler without disrupting the core of how you operate.",
        name: "Varun Kaushik",
        role: "Executive VP & Head of Marketing",
        company: "PolicyBoss",
      },
      {
        image: "/voices/implementors-guide-to-ai/suman-tewary.png",
        quote:
          "The fact that AI adoption in the insurance sector will completely change the whole spectrum is a boon in itself for both insurers and customers.",
        name: "Suman Tewary",
        role: "Associate General Manager",
        company: "Allianz Partners",
      },
      {
        image: "/voices/implementors-guide-to-ai/karthik-anantharaman.png",
        quote:
          "The report should foster a sense of collaboration, encouraging organisations to seriously consider and implement real-time AI solutions.",
        name: "Dr Karthik Anantharaman",
        role: "VP International Sales & Marketing",
        company: "Apollo Hospitals",
      },
      {
        image: "/voices/implementors-guide-to-ai/nimish-thaker.png",
        quote:
          "Having tailored solutions or tools specifically designed for the furniture industry would be incredibly valuable.",
        name: "Nimish Thaker",
        role: "Head of Marketing",
        company: "Spacewood",
      },
      {
        image: "/voices/implementors-guide-to-ai/diptarup-chakraborti.png",
        quote:
          "I believe it's essential to include the social impact of AI on the marketing function and highlight how AI will influence the existing roles.",
        name: "Diptarup Chakraborti",
        role: "Chief Marketing Officer",
        company: "MoveInSync",
      },
      {
        image: "/voices/implementors-guide-to-ai/meera-iyer.png",
        quote:
          "Successful AI adoption requires clarity about its relevance, scrutiny of the data powering it, and a strong alignment with your specific business objectives.",
        name: "Meera Iyer",
        role: "Co-founder & CEO",
        company: "SkinQ",
      },
      {
        image: "/voices/implementors-guide-to-ai/avnish-anand.png",
        quote:
          "As more companies adopt AI, the technology will continue to evolve, driving the emergence of new use cases and greater sophistication.",
        name: "Avnish Anand",
        role: "Former Co-founder & CEO",
        company: "CaratLane",
      },
      {
        image: "/voices/implementors-guide-to-ai/madhav-vemuri.png",
        quote:
          "I expect this report to emphasise the urgency of AI adoption. Businesses must recognise that AI is not a luxury but a necessity for competitiveness.",
        name: "Madhav Vemuri",
        role: "Leader of Industrial Automation",
      },
      {
        image: "/voices/implementors-guide-to-ai/sanjiv-kumar-jain.png",
        quote:
          "Choose with a focus on existing and mature AI technologies, not speculative promises or external pressures.",
        name: "Sanjiv Jain",
        role: "CIO",
        company: "Krishna Maruti Group",
      },
      {
        image: "/voices/implementors-guide-to-ai/manish-kumar.png",
        quote:
          "It is recommended to check the effectiveness of available AI tools which are being selected for engineering and project management.",
        name: "Manish Kumar",
        role: "Deputy General Manager",
        company: "Engineers India Limited",
      },
      {
        image: "/voices/implementors-guide-to-ai/hansveen-kaur.png",
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
  published: "2024-12-07",
  metaTitle: "Automation & Campaign Management Handbook for Functional Experts",
  metaDescription:
    "Explore current campaign management nuances and opportunities tailored to Indian market dynamics, from 150+ survey responses and 20 expert interviews.",

  hero: {
    title: "Automation & Campaign Management Handbook for Functional Experts",
    lede: "Explore current campaign management nuances and opportunities tailored to Indian market dynamics",
    cover: "/covers/automation-campaign-management-hero.png",
    coverAlt:
      "Cover of the Automation and Campaign Management Handbook for Functional Experts",
  },

  /* Generated in the site's own system (deep band, tick device, DM Sans,
     the cover mock): the WordPress-era promo tile with its baked-in
     "Download Now" button is retired. */
  cardImage: "/covers/automation-campaign-management-card.png",
  /* The report's own vertical cover, supplied by the user (5880x8334 source,
     served at 1190 wide). */
  cardPortrait: "/covers/automation-campaign-management-portrait.png",

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
        href: "/resources/events/automation-campaign-management/marketing-automation-roundtable",
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
  published: "2025-02-06",
  metaTitle: "Unlocking the Power of Unified CX",
  metaDescription:
    "Explore the latest insights, strategies and innovations driving customer centric transformations in Qatar, from 100 survey responses and 6 expert interviews.",

  hero: {
    title: "Unlocking the Power of Unified CX",
    lede: "Explore the latest insights, strategies and innovations driving customer centric transformations in Qatar",
    cover: "/covers/unlocking-the-power-unified-cx-hero.png",
    coverAlt: "Cover of the Unlocking the Power of Unified CX report",
  },

  cardImage: "/covers/unlocking-the-power-unified-cx-card.png",
  cardPortrait: "/covers/unlocking-the-power-unified-cx-portrait.png",

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
  published: "2026-02-13",
  metaTitle: "Navigating Corporate Commute for GCCs in India",
  metaDescription:
    "How India's global capability centres can move employee transport beyond fragmented, manual processes, with commute maturity benchmarks and data-driven insights.",

  hero: {
    title: "Navigating Corporate Commute for GCCs in India",
    lede: "Benchmark commute maturity across India's global capability centres and reimagine employee transport as a driver of productivity and growth",
    cover: "/covers/navigating-corporate-commute-for-gccs-in-india-hero.png",
    coverAlt:
      "Cover of the Navigating Corporate Commute for GCCs in India report",
  },

  cardImage: "/covers/navigating-corporate-commute-for-gccs-in-india-card.png",
  cardPortrait: "/covers/navigating-corporate-commute-for-gccs-in-india-portrait.png",

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
  published: "2024-04-02",
  metaTitle: "Transforming CX through GCCs",
  metaDescription:
    "How top global brands tech-enable their digital customer experience through the Indian GCC model, with real-world use cases and insights from GCC leaders.",

  hero: {
    title: "Transforming CX through GCCs",
    lede: "How top global brands tech-enable their digital customer experience through the Indian GCC model",
    cover: "/covers/transforming-cx-through-gccs-hero.png",
    coverAlt: "Cover of the Transforming CX through GCCs eBook",
  },

  cardImage: "/covers/transforming-cx-through-gccs-card.png",
  cardPortrait: "/covers/transforming-cx-through-gccs-portrait.png",

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

  /* The source page runs these as plain text testimonials under "View
     Insights shared by GCC Leaders", not baked quote cards, so there is no
     artwork to carry and the copy is quoted as written, American spellings
     included. Attributions are as the page states them: Sharda's testimonial
     names no company (her interview record says GBS Bayer India) and styles
     her role differently from that record; both carried as published. */
  voices: {
    items: [
      {
        quote:
          "We should ensure that the change is adopted well both in the customer experience ecosystem and within the organization to consider any digital transformation initiative effective",
        portrait: "/voices/transforming-cx-through-gccs/vineet-dwivedi.png",
        name: "Vineet Dwivedi",
        role: "Global Head",
        company: "Alcon Global Services",
      },
      {
        quote:
          "The hybrid model of in-house capabilities and specialized third-party expertise enables us to navigate the complexities of digital transformation effectively",
        portrait: "/voices/transforming-cx-through-gccs/sharda-nenwani-gupta.png",
        name: "Sharda Nenwani Gupta",
        role: "MD & Global Business Services Head, India",
      },
      {
        quote:
          "From the perspective of improving awareness and customer experience (CX) levels, insurers will focus on expanding their reach through API plug-ins and integrate more self-service options across their digital platforms",
        portrait: "/voices/transforming-cx-through-gccs/geetanjali-chugh-kothari.png",
        name: "Geetanjali Chugh Kothari",
        role: "CMO",
        company: "Future Generali India Life Insurance",
      },
      {
        quote:
          "We should evaluate the actual need for something to be automated and not just for the sake of it; otherwise, we will end up automating a bad process",
        portrait: "/voices/transforming-cx-through-gccs/vivek-veeraraghavan.png",
        name: "Vivek Veeraraghavan",
        role: "SVP of Digital Transformation APAC",
        company: "Northern Trust",
      },
    ],
  },

  credits: {
    sponsor: {
      label: "GCC insights by",
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
  published: "2021-06-22",
  metaTitle: "Cloud Computing in the New Normal & Beyond",
  metaDescription:
    "India's progressing cloud computing market in 2021: adoption trends by service and deployment type, sector priorities, and the top adoption and management challenges.",

  hero: {
    title: "Cloud Computing in the New Normal & Beyond",
    lede: "India Inc's need for cloud computing in 2021 and beyond, a ready reckoner for cloud transformation custodians",
    cover: "/covers/cloud-computing-new-normal-beyond-hero.png",
    coverAlt: "Cover of the Cloud Computing in the New Normal & Beyond report",
  },

  cardImage: "/covers/cloud-computing-new-normal-beyond-card.png",
  cardPortrait: "/covers/cloud-computing-new-normal-beyond-portrait.png",

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
  published: "2021-07-08",
  metaTitle: "Southeast Asia Response Guide 2021",
  metaDescription:
    "The Best of Business Strategies In The New Normal: bounce-back strategies for emerging industries and business functions across Southeast Asia.",

  hero: {
    title: "Southeast Asia Response Guide 2021",
    lede: "The Best of Business Strategies In The New Normal",
    cover: "/covers/south-east-asia-response-guide-hero.png",
    coverAlt: "The Southeast Asia Response Guide 2021 open on a tablet",
  },

  cardImage: "/covers/south-east-asia-response-guide-card.png",
  cardPortrait: "/covers/south-east-asia-response-guide-portrait.png",

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

  /* The microsite runs these as text quotes beside cut-out speaker
     portraits, so each carries `portrait` (the microsite's own cut-outs,
     not the 16:9 interview thumbnails an earlier pass wrongly used here)
     and the copy is quoted as written. */
  voices: {
    items: [
      {
        portrait: "/voices/south-east-asia-response-guide/anil-gautam.jpg",
        quote:
          "We are innovating by creating newer digital models to enhance interactions and experiences. And we're looking a lot more on the front-end agility and ensuring the back end can support any customization required at the front-end.",
        name: "Anil Gautam",
        role: "Managing Director, DHL eCommerce",
        company: "Malaysia",
      },
      {
        portrait: "/voices/south-east-asia-response-guide/ravi-shankar.jpg",
        quote:
          "The proudest innovation that we did is that we built a system that identifies a non-performing route voluntarily and automatically launches aligned marketing campaigns without any human intervention and manual analysis.",
        name: "Ravi Shankar",
        role: "Chief Growth Officer",
        company: "AirAsia",
      },
      {
        portrait: "/voices/south-east-asia-response-guide/johnny-widodo.jpg",
        quote:
          "When businesses start to plan, the focus should be on incremental innovation, incremental benefit, and incremental improvement on the current existing product, or is basically switching towards a very new product.",
        name: "Johnny Widodo",
        role: "CEO, OLX Group",
        company: "Indonesia",
      },
      {
        portrait: "/voices/south-east-asia-response-guide/aaron-foo.jpg",
        quote:
          "It is about removing things that you do not need; it could be just the middleman or the technology to simplify the business operations. It should have happened before COVID, but nobody focused on it until things happened.",
        name: "Aaron Foo",
        role: "Head of Product Strategy",
        company: "iCar Asia",
      },
      {
        portrait: "/voices/south-east-asia-response-guide/karunjit-kumar-dhir.jpg",
        quote:
          "After the wave of remote or work from anywhere trend, the extension of that trend will be many employers also allowing for BYOD, Bring Your Own Device. And because of this, the whole IT security landscape will evolve.",
        name: "Karunjit Kumar Dhir",
        role: "Co-founder",
        company: "SCIKEY",
      },
      {
        portrait: "/voices/south-east-asia-response-guide/walter-de-oude.jpg",
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
  published: "2020-09-30",
  metaTitle: "AI Led Personalization: Strategy and Trends, India 2020",
  metaDescription:
    "AI powered business strategies of B2C brands in India: interviews with marketing leaders across BFSI, OTT, e-commerce and D2C, and digital-first businesses.",

  hero: {
    title: "AI Led Personalization: Strategy and Trends, India 2020",
    lede: "A journey through the pandemic, and into the new normal",
    cover: "/covers/ai-led-personalization-hero.png",
    coverAlt:
      "The AI Led Personalization Strategy and Trends Report, India 2020 on a tablet",
  },

  cardImage: "/covers/ai-led-personalization-card.png",
  cardPortrait: "/covers/ai-led-personalization-portrait.png",

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

  /* No quick reads: this programme published no articles. The launch event
     it used to point at here is now the spotlight below, which carries the
     microsite's own copy rather than repeating the event's title. */

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
  spotlights: [
    {
      /* Heading and both sentences verbatim from the microsite. */
      title: "Check out the Launch Event",
      description:
        "Netcore and Research NXT culminated their 6 month journey to build the market knowledge in AI in Marketing, and speaking to 10+ marketing leaders in the industry with a virtual event. Watch this amazing interaction for in-depth insight in the field of Personalization in Marketing.",
      linkLabel: "See the event",
      card: eventCard("ai-led-personalization", "ai-led-ebook-launch"),
      /* Above the interviews, where the microsite runs it. */
      beforeInterviews: true,
    },
    {
      title: "Client success story",
      /* No description: the testimonial artwork below carries the quote and
         the attribution, so a written sentence said it twice. */
      linkLabel: "Read the story",
      /* The microsite's own testimonial card artwork (Rohit Shrivastav's
         quote, supplied by the user) rather than the story record's cover,
         shown in the left column with the CTA beneath it. */
      card: successStoryCard(
        "ai-led-personalization",
        "netcore",
        "/success-stories/ai-led-personalization/netcore-card.png",
      ),
      /* The microsite sets its facts to the right of the client
         testimonial, verbatim on user direction: labels, values, pipes,
         capitals and the en dash as the source writes them. */
      facts: [
        {
          label: "Research focus",
          value: "AI Powered Business Strategies of B2C Brands",
        },
        {
          label: "Engagement",
          value: "Interviews | Virtual Event | Social Media Promotion",
        },
        { label: "Geography", value: "India" },
        {
          label: "Timeframe of research",
          value: "April 2020 – Sept 2020",
        },
      ],
    },
  ],

  credits: {
    sponsor: {
      label: "In association with",
      name: "Netcore",
      /* The official mark from netcore.ai, supplied by the user. */
      logo: "/logos/trusted/netcore-lockup.png",
    },
    partnerLabel: "Research partner",
  },
};

/** Copy transcribed from
    researchnxt.com/research-report/content-marketing-done-right-trends-and-best-practices-report/.
    That page lists its findings as short labels under "Report Highlights" and
    runs no chapter band, so the landing carries `highlights` and no `expect`.
    It also carries its own Jotform, distinct from the one the interviews and
    articles use, so the id here is the landing's own. */
const contentMarketingDoneRight: ReportLanding = {
  slug: "content-marketing-done-right",
  published: "2019-11-28",
  metaTitle: "Content Marketing Done Right: Trends and Best Practices Report",
  metaDescription:
    "The state of content marketing in India, with the first of its kind Content Marketing Technology Stack for the Indian market, a maturity model, and B2B against B2C trends.",

  hero: {
    title: "Content Marketing Done Right",
    lede: "Trends and best practices in Indian content marketing, 2020",
    cover: "/covers/content-marketing-done-right-hero.png",
    coverAlt: "Cover of the Content Marketing Done Right report",
  },

  cardImage: "/covers/content-marketing-done-right-card.png",
  cardPortrait: "/covers/content-marketing-done-right-portrait.png",

  download: {
    jotformId: "90447985712467",
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
    "Content marketing continues to have a very impactful influence on the decision to purchase a company's product or services. Marketers are increasingly using content marketing tactics, along with technology, to better engage with their buyers to educate, update, and guide them.",
    "To understand the buzz around the growing popularity of content marketing, we at Research NXT conducted **in-depth market research to compile key data points** to learn the current state of content marketing in India.",
  ],

  highlights: {
    title: "Report highlights",
    items: [
      "First of its kind Content Marketing Technology Stack for the Indian market",
      "93% of Indian marketers use content marketing as an audience engagement strategy",
      "37% consider social media the most effective channel to reach the target audience",
      "80% of video production is outsourced by Indian marketers",
      "60% of survey participants plan to implement a content marketing strategy in 2020",
    ],
  },

  quickReads: {
    title: "Insights",
    items: [
      {
        title: "Evolution of Content Marketing in India",
        href: "/resources/insights/content-marketing-done-right/evolution-of-content-marketing-in-india",
        image:
          "/insights/content-marketing-done-right/evolution-of-content-marketing-in-india.jpg",
      },
      {
        title: "How to Combine your Social Media and Content Marketing",
        href: "/resources/insights/content-marketing-done-right/combine-your-social-media-and-content-marketing",
        image:
          "/insights/content-marketing-done-right/combine-your-social-media-and-content-marketing.jpg",
      },
      {
        title: "How Content Marketing Impacts Your SEO Strategy",
        href: "/resources/insights/content-marketing-done-right/how-content-marketing-impacts-your-seo-strategy",
        image:
          "/insights/content-marketing-done-right/how-content-marketing-impacts-your-seo-strategy.jpg",
      },
      {
        title: "Best Practices for Your 2019 Content Marketing Strategy",
        href: "/resources/insights/content-marketing-done-right/best-practices-for-your-2019-content-marketing-strategy",
        image:
          "/insights/content-marketing-done-right/best-practices-for-your-2019-content-marketing-strategy.jpg",
      },
      {
        title: "Content Marketing and CRM: The Keys to Boost Email Campaigns",
        href: "/resources/insights/content-marketing-done-right/content-marketing-and-crm-boost-email-campaigns",
        image:
          "/insights/content-marketing-done-right/content-marketing-and-crm-boost-email-campaigns.jpg",
      },
      {
        title: "7 Must-have Features for Content Marketing System",
        href: "/resources/insights/content-marketing-done-right/7-must-have-features-for-a-content-marketing-system",
        image:
          "/insights/content-marketing-done-right/7-must-have-features-for-a-content-marketing-system.jpg",
      },
      {
        title: "How to implement a killer Omni-channel marketing strategy",
        href: "/resources/insights/content-marketing-done-right/how-to-implement-a-killer-omni-channel-marketing-strategy",
        image:
          "/insights/content-marketing-done-right/how-to-implement-a-killer-omni-channel-marketing-strategy.png",
      },
    ],
  },

  /* One flat list on the source page, so a single group and no tab rail. */
  expertInsights: {
    title: "Experts view",
    groups: [
      {
        stage: "Marketing leaders",
        items: [
          "ranjit-behera",
          "sooraj-divakaran",
          "apurva-chamaria",
          "amit-kapoor",
          "gaurav-suri",
          /* Two more interviews from the same 2019 series that the source
             landing does not list in its Experts View band, but which belong
             to this programme and are published under it. */
          "rickard-lawson",
          "allison-munro",
        ].map(cmCard),
      },
    ],
  },

  spotlights: [
    {
      title: "Check out the launch event",
      description:
        "The Content Marketing Report 2020 was launched at NASSCOM's flagship one-day event, NASSCOM MarTech, on 28 November 2019 at Courtyard by Marriott, Mumbai.",
      linkLabel: "See the event",
      card: eventCard(
        "content-marketing-done-right",
        "content-marketing-report-launch",
      ),
    },
  ],
};

/** Copy transcribed from
    researchnxt.com/microsite/state-of-consumer-engagement-report-gcc-2019/.
    That microsite runs no chapter band and links no articles or interviews, so
    the landing carries `highlights` and `facts` and neither `expect` nor
    `expertInsights`. Its one "Client Testimonial" band is the WebEngage story,
    carried here as the single voice card it is and as the one quick read, and
    published in full under Success stories. */
const stateOfConsumerEngagementGcc2019: ReportLanding = {
  slug: "state-of-consumer-engagement-gcc-2019",
  published: "2019-09-30",
  metaTitle: "State of Consumer Engagement, GCC 2019",
  metaDescription:
    "A three-dimensional report on B2C consumer engagement in the GCC region: the channels consumers prefer, the content they want, and the challenges marketers name.",

  hero: {
    title: "State of Consumer Engagement, GCC 2019",
    lede: "A three-dimensional report on B2C consumer engagement in the GCC region",
    cover: "/covers/state-of-consumer-engagement-gcc-2019-hero.png",
    coverAlt:
      "Cover of the State of Consumer Engagement, GCC 2019 report, in print and on a tablet",
  },

  cardImage: "/covers/state-of-consumer-engagement-gcc-2019-card.png",
  cardPortrait: "/covers/state-of-consumer-engagement-gcc-2019-portrait.png",

  download: {
    jotformId: "92538569205465",
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
    "New-age consumers are evolving from being informed and aware buyers to being designers and creators of their user journeys. This massive shift is underway owing to consumers' access to sophisticated digital technologies and on-demand data on products, services, brands, markets, and trends, for both the present and the predicted future.",
    "Brands, which until now have controlled engagements and experiences based on consumer behaviours, must acknowledge the changing buying landscape and **incorporate innovative marketing technologies to deliver on the evolving customer expectations**.",
  ],

  highlights: {
    title: "Report highlights",
    items: [
      "83% of consumers in the GCC region choose email as their preferred channel for brand engagement",
      "83% of consumers in the GCC region use their mobile phones to consume content",
      "53% of consumers in the GCC region love to receive informational content",
      "43% of consumers engage most with brand communication on their mobile phones during late evening",
      "55% of marketers in the GCC region say that scattered user engagement strategies and the lack of technology are the top challenges for driving effective consumer engagement",
    ],
  },

  facts: [
    { label: "Research focus", value: "B2C" },
    { label: "Technology", value: "Digital consumer engagement" },
    { label: "Geography", value: "GCC" },
    { label: "Timeframe of research", value: "August 2019 to September 2019" },
  ],

  /* No articles were published from this programme, so the landing runs no
     quick reads rail. The source page links no interviews either, but the
     sponsor's own interview belongs to this programme and is published under
     it, so it gets a band. */
  expertInsights: {
    title: "Experts view",
    groups: [
      {
        stage: "The sponsor's view",
        items: ["avlesh-singh"].map(gccEngagementCard),
      },
    ],
  },

  /* The microsite's "Client Testimonial", carried as the one voice card it is:
     the quote is baked into the artwork, so it is quoted here too. */
  voices: {
    items: [
      {
        image:
          "/success-stories/state-of-consumer-engagement-gcc-2019/webengage.png",
        quote:
          "We want marketers in the GCC region to refer to this study as a benchmark report for measuring and creating consumer engagement strategies.",
        name: "Avlesh Singh",
        role: "Co-founder and CEO",
        company: "WebEngage",
      },
    ],
  },

  spotlights: [
    {
      title: "Client success story",
      description:
        "WebEngage commissioned this study to understand consumer engagement across the GCC region. The full case study covers what the research delivered.",
      linkLabel: "Read the story",
      card: successStoryCard(
        "state-of-consumer-engagement-gcc-2019",
        "webengage",
        "/success-stories/state-of-consumer-engagement-gcc-2019/webengage-card.png",
      ),
    },
  ],

  credits: {
    sponsor: {
      label: "In association with",
      name: "WebEngage",
      logo: "/logos/trusted/webengage.png",
    },
    partnerLabel: "Research partner",
  },
};

/** Copy transcribed from
    researchnxt.com/microsite/abm-best-practices-report-india-2018/. Like the
    2019 GCC microsite it runs no chapter band, listing its findings as short
    labels under "Reports Highlights" and its own facts beside them. Its
    "Client Testimonial" is the InsideView story, carried here as the one voice
    card it is and published in full under Success stories. */
const abmBestPracticesIndia2018: ReportLanding = {
  slug: "abm-best-practices-report-india-2018",
  published: "2018-06-30",
  metaTitle: "ABM Best Practices Report: India, 2018",
  metaDescription:
    "A definitive guide for every B2B marketer, from conversations with more than 100 Indian B2B marketing leaders: ABM adoption, effectiveness, the tech stack, and aligning sales with marketing.",

  hero: {
    title: "ABM Best Practices Report: India, 2018",
    lede: "A definitive guide for every B2B marketer",
    cover: "/covers/abm-best-practices-report-india-2018-hero.png",
    coverAlt:
      "Cover of the ABM Best Practices Report: India, 2018, in print and on a tablet",
  },

  cardImage: "/covers/abm-best-practices-report-india-2018-card.png",
  cardPortrait: "/covers/abm-best-practices-report-india-2018-portrait.png",

  download: {
    jotformId: "80661672684465",
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
    "In this report, we identified what you need to know to make the most of your ABM efforts, and where you can find further opportunities for competitive advantage.",
    "This research was conducted over two months, during which we connected with **more than 100 Indian B2B marketing leaders** to discuss their views on ABM. This comprehensive guide details the concept of ABM to simplify the process of its implementation.",
  ],

  highlights: {
    title: "Report highlights",
    items: [
      "62% of survey participants have already implemented ABM in their marketing strategy",
      "50% of those who have not implemented ABM intend to do it next year",
      "83% find ABM to be extremely or somewhat effective",
      "51% of respondents optimised their marketing programmes for target accounts with ABM",
      "65% of participants use CRM as part of the ABM tech stack",
      "44% of respondents said that to align sales and marketing, both should collaborate to build a healthy pipeline",
    ],
  },

  facts: [
    { label: "Research focus", value: "B2B" },
    {
      label: "Engagement",
      value: "Interviews, virtual event, social media promotion",
    },
    { label: "Geography", value: "India" },
    { label: "Timeframe of research", value: "May 2018 to June 2018" },
  ],

  quickReads: {
    title: "Blogs",
    items: [
      {
        title:
          "Account Based Marketing Essentials: Steps to Define your Key Accounts",
        href: "/resources/insights/abm-best-practices-report-india-2018/steps-to-define-your-key-accounts",
        image:
          "/insights/abm-best-practices-report-india-2018/steps-to-define-your-key-accounts.png",
      },
      {
        title: "How to implement an effective Account Based Marketing Strategy",
        href: "/resources/insights/abm-best-practices-report-india-2018/how-to-implement-an-effective-abm-strategy",
        image:
          "/insights/abm-best-practices-report-india-2018/how-to-implement-an-effective-abm-strategy.jpg",
      },
    ],
  },

  /* One flat list on the source page, so a single group and no tab rail. */
  expertInsights: {
    title: "Interviews",
    groups: [
      {
        stage: "Marketing leaders",
        items: [
          "ojas-kulkarni",
          "sushant-shetty",
          "diptarup-chakraborti",
          "satinder-juneja",
        ].map(abmCard),
      },
    ],
  },

  /* No voices band. The one card here was the case study's poster artwork with
     the sentence baked into it read out as a quote, but that sentence is on
     neither source page: "Sesha Rao" appears nowhere on the ABM case study.
     See PROGRESS.md. */

  spotlights: [
    {
      title: "Client success story",
      description:
        "InsideView commissioned this research to understand the growth of ABM in the Indian market. The full case study covers what the research delivered.",
      linkLabel: "Read the story",
      card: successStoryCard(
        "abm-best-practices-report-india-2018",
        "insideview",
      ),
    },
  ],

  credits: {
    sponsor: {
      label: "In association with",
      name: "InsideView",
      /* The supplied full lockup, replacing a 417x92 crop. */
      logo: "/logos/trusted/insideview-lockup.png",
    },
    partnerLabel: "Research partner",
  },
};

/** Copy transcribed from
    researchnxt.com/research-report/b2c-marketing-automation-report-india-2017/.
    The 2017 microsite runs no highlights list and no chapter band: it opens
    with the report's aim, states the research focus, then runs the eighteen
    interviews, the launch webinar and the Netcore testimonial. So this landing
    carries `description`, `facts`, `expertInsights`, `spotlight` and `voices`,
    and neither `highlights` nor `expect` nor `quickReads`. */
const b2cMarketingAutomationIndia2017: ReportLanding = {
  slug: "b2c-marketing-automation-india-2017",
  published: "2017-09-07",
  metaTitle: "B2C Marketing Automation Report: India, 2017",
  metaDescription:
    "All you need to know about marketing automation solutions in India: adoption in B2C organisations, the most commonly used features, drivers and restraints, pricing models, ROI measurement and challenges.",

  hero: {
    title: "B2C Marketing Automation Report: India, 2017",
    lede: "All you need to know about marketing automation solutions",
    cover: "/covers/b2c-marketing-automation-india-2017-hero.png",
    coverAlt:
      "Cover of the B2C Marketing Automation Report: India, 2017, in print and on a tablet",
  },

  cardImage: "/covers/b2c-marketing-automation-india-2017-card.png",
  cardPortrait: "/covers/b2c-marketing-automation-india-2017-portrait.png",

  download: {
    jotformId: "81703707306453",
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
    "A report that tracked the implementation and adoption of B2C marketing automation in India.",
    "This report aims to understand the adoption of marketing automation solutions in Indian B2C organisations and identify the most commonly used features, drivers and restraints. It shares insights on pricing models, ROI measurement and the challenges of implementing MAS, and helps B2C marketers make the right decision while evaluating and implementing MAS in their organisations.",
    "**More than 150 marketing professionals** of leading B2C brands from India took part in the survey, giving us a rich pool of data. The survey was conducted across the country, focused on seven industry segments: BFSI, telecom, travel, ecommerce, pharma, auto, and FMCG and consumer electronics. We also got the opportunity to speak with CMOs and experts from leading brands across India and get their perspective on the topic.",
  ],

  facts: [
    { label: "Research focus", value: "B2C marketing automation" },
    {
      label: "Engagement",
      value: "Interviews, virtual event, social media promotion",
    },
    { label: "Geography", value: "India" },
    { label: "Timeframe of research", value: "February 2017 to May 2017" },
  ],

  /* One flat list on the source page, so a single group and no tab rail. The
     order is the source page's: newest interview first. */
  expertInsights: {
    title: "Experts view",
    groups: [
      {
        stage: "Insights and best practices on B2C marketing automation",
        items: [
          "kalpit-jain",
          "prasad-pimple",
          "harkirat-singh",
          "anil-menghani",
          "molly-kapoor",
          "binu-george",
          "abhishek-gupta",
          "amit-shah",
          "sachin-sharma",
          "veerchand-bothra",
          "meera-iyer",
          "deepak-malhotra",
          "karun-thareja",
          "pradeep-dwivedi",
          "kamini-rupani",
          "varun-kaushik",
          "karthik-anantharaman",
          "pratik-mazumder",
        ].map(b2cMasCard),
      },
    ],
  },

  spotlights: [
    {
      title: "Check out the launch event",
      description:
        "The report was launched in a 45 minute panel webinar in association with Netcore, on how marketing automation has evolved in India, what preparation implementing it takes, and how AI in marketing is impacting businesses.",
      linkLabel: "See the event",
      card: eventCard(
        "b2c-marketing-automation-india-2017",
        "report-launch-webinar",
      ),
    },
    {
      title: "Client success story",
      description:
        "Netcore commissioned this research to supplement the launch of their Smartech suite. The full case study covers what the research delivered.",
      linkLabel: "Read the story",
      card: successStoryCard("b2c-marketing-automation-india-2017", "netcore"),
    },
  ],

  /* The microsite's "Client Testimonial", carried as the one voice card it is:
     the quote is baked into the artwork, so it is quoted here too. */
  voices: {
    items: [
      {
        image: "/success-stories/b2c-marketing-automation-india-2017/netcore.png",
        quote:
          "Research NXT is our partner of choice for prospect databases, as the team understands our requirements and enables our campaigns with an accurate database with maximum coverage in our target accounts.",
        name: "Kalpit Jain",
        role: "Chief Executive Officer",
        company: "Netcore Solutions",
      },
    ],
  },

  credits: {
    sponsor: {
      label: "Report sponsor",
      name: "Netcore",
      logo: "/logos/trusted/netcore-lockup.png",
    },
    partnerLabel: "Research partner",
  },
};

/** Copy transcribed from
    researchnxt.com/research-report/a-publishers-guide-to-smarter-monetization-ad-revenue-optimization-techniques-2020/.
    The smallest of the migrated landings: the source page is a description, two
    highlights and the download form, with no interviews, articles, event, case
    study or sponsor, so this landing carries nothing that the page does not. */
const publishersGuideToSmarterMonetization: ReportLanding = {
  slug: "publishers-guide-to-smarter-monetization",
  published: "2020-02-01",
  metaTitle: "A Publisher's Guide to Smarter Monetization",
  metaDescription:
    "Ad revenue optimization techniques for 2020: the top three ways to inform your ad strategy, from market trends, analysis of ad solutions and the data behind them.",

  hero: {
    title: "A Publisher's Guide to Smarter Monetization",
    lede: "Ad revenue optimization techniques 2020",
    cover: "/covers/publishers-guide-to-smarter-monetization-hero.png",
    coverAlt:
      "Cover of A Publisher's Guide to Smarter Monetization on a tablet",
  },

  cardImage: "/covers/publishers-guide-to-smarter-monetization-card.png",
  cardPortrait: "/covers/publishers-guide-to-smarter-monetization-portrait.png",

  download: {
    jotformId: "200331930902443",
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
    "Monetization through ads can be tricky and time-consuming. With new products and services being advertised in the market daily, it can get difficult to create an effective strategy to drive maximum revenues.",
    "With this guide, we help you understand the **top three ways in which you can inform your ad strategy in 2020**. Through in-depth research on market trends, analysis of various ad solutions and relevant data, we have charted a roadmap that will not only help create a revenue plan that works for you, but also offer the right advice to help you sustain and eventually scale your strategy.",
  ],

  highlights: {
    title: "Report highlights",
    items: [
      "$385 billion worth of ad budgets are open for publishers to tap into in 2020",
      "100% more to be invested in digital ads compared with traditional media by 2023",
    ],
  },

  /* The source page links no interviews, but one from this programme is
     published under it, so it gets a band. */
  expertInsights: {
    title: "Experts view",
    groups: [
      {
        stage: "Platform view",
        items: ["rajesh-pantina"].map(publisherCard),
      },
    ],
  },
};

/** Copy transcribed from
    researchnxt.com/microsite/corporate-gifting-trends-report-india-2019/.
    The source page runs a description, six highlights and the download form,
    and links nothing. Its "Table of Content" band is empty on the live page,
    so there is no contents list to carry. The cover artwork carries a GIFTEX
    mark, but the page runs no credit band, so none is invented here. */
const corporateGiftingTrendsIndia2019: ReportLanding = {
  slug: "corporate-gifting-trends-india-2019",
  published: "2019-03-01",
  metaTitle: "Corporate Gifting Trends Report: India, 2019",
  metaDescription:
    "How Indian companies buy corporate gifts: budgets, spend per unit, the sectors buying most, what buyers weigh, and the gap between where sellers list and where buyers buy.",

  hero: {
    title: "Corporate Gifting Trends Report: India, 2019",
    lede: "Trends in the Indian corporate gifting industry",
    cover: "/covers/corporate-gifting-trends-india-2019-hero.png",
    coverAlt:
      "Cover of the Corporate Gifting Trends Report: India, 2019 on a tablet",
  },

  cardImage: "/covers/corporate-gifting-trends-india-2019-card.png",
  cardPortrait: "/covers/corporate-gifting-trends-india-2019-portrait.png",

  download: {
    jotformId: "83171595973469",
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
    "The gifting industry in India has registered strong growth over the past decade, thanks to consumers' rising income levels and ambitions. Of the overall industry, the corporate sector enjoys the lion's share.",
    "It is of utmost importance for an organisation to make sure they keep in touch with their customers, to nurture the relationship and encourage future business. This is the reason why **corporate gifting has become an integral part of the marketing and branding efforts** of many companies. Along with customers, gifting has also been part of employee rewards and recognition programmes across many corporations in India.",
  ],

  highlights: {
    title: "Report highlights",
    items: [
      "67% of respondents have a well-defined budget for corporate gifting",
      "37% of respondents spend an average of INR 500 to 1,000 per unit on corporate gifts",
      "Pharma is the top buyer of corporate gifts, followed by BFSI, TTHL and IT",
      "73% of respondents consider innovation and packaging very important while buying corporate gifts",
      "68% of sellers list their products on online portals like Amazon and Flipkart, while only 29% of buyers buy from online venues",
      "64% of respondents consider quality of participants the most important factor when considering a gifting exhibition",
    ],
  },
};

/** Copy transcribed from
    researchnxt.com/research-report/etutoring-best-practices-whitepaper-2016/.
    The oldest report migrated. The source page is a description, an empty
    "Table of Contents" band and the download form, and links nothing. The
    cover artwork reads "Sponsored By: eSolve", but the page runs no credit
    band, so none is invented here. */
const etutoringBestPracticesWhitepaper2016: ReportLanding = {
  slug: "etutoring-best-practices-whitepaper-2016",
  published: "2016-03-01",
  metaTitle: "eTutoring Best Practices Whitepaper 2016",
  metaDescription:
    "One of the fastest growing eLearning industries, yet shrinking in company count. Industry best practices, challenges, and how e-tutoring leaders have grown their business with innovative solutions.",

  hero: {
    title: "eTutoring Best Practices Whitepaper 2016",
    lede: "Best practices, challenges and growth in the e-tutoring industry",
    cover: "/covers/etutoring-best-practices-whitepaper-2016-hero.png",
    coverAlt:
      "Cover of the E-Tutoring Best Practices Whitepaper on a tablet",
  },

  cardImage: "/covers/etutoring-best-practices-whitepaper-2016-card.png",
  cardPortrait: "/covers/etutoring-best-practices-whitepaper-2016-portrait.png",

  download: {
    jotformId: "81703041906450",
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
    "One of the fastest growing eLearning industries, yet shrinking in terms of the number of companies. **The number of e-tutoring companies has gone down from 450 plus companies in 2010 to less than 250 companies in 2015.**",
    "CEOs, COOs, strategy and business leaders from leading e-tutoring companies have participated and shared their perspective with us.",
    "The E-Tutoring Best Practices Whitepaper 2016 covers industry best practices and challenges, and more importantly insights on how industry leaders have been able to manage and grow their business with innovative solutions.",
  ],

  /* The source page links no interviews, but one from this programme is
     published under it, so it gets a band. */
  expertInsights: {
    title: "Experts view",
    groups: [
      {
        stage: "Industry view",
        items: ["tanmay-chandresa"].map(etutoringCard),
      },
    ],
  },
};

export const reportLandings: ReportLanding[] = [
  implementorsGuideToAI,
  automationCampaignManagement,
  unlockingThePowerUnifiedCX,
  navigatingCorporateCommute,
  transformingCxThroughGccs,
  cloudComputingNewNormal,
  southEastAsiaResponseGuide,
  aiLedPersonalization,
  contentMarketingDoneRight,
  stateOfConsumerEngagementGcc2019,
  abmBestPracticesIndia2018,
  b2cMarketingAutomationIndia2017,
  publishersGuideToSmarterMonetization,
  corporateGiftingTrendsIndia2019,
  etutoringBestPracticesWhitepaper2016,
];

export function getReportLanding(slug: string) {
  return reportLandings.find((report) => report.slug === slug);
}

/* ---------------------------------------------------------------------------
   The reports-whitepapers library shelf. Most entries are report landings;
   an edition entry is an industry cut of a report whose full story lives in
   an insights article, so its card links straight there instead of to a
   landing of its own.
--------------------------------------------------------------------------- */

export type ReportShelfItem = {
  title: string;
  href: string;
  /** Portrait cover (A4, 210:297) under /public. */
  portrait?: string;
  /** Landscape fallback, letterboxed on a muted plate, when no portrait exists. */
  cardImage?: string;
};

/** Industry editions of the Implementor's Guide to AI, shelved after it. */
const implementorsGuideEditions: ReportShelfItem[] = [
  {
    title: "Implementor's Guide to AI: Financial Edition",
    href: "/resources/insights/implementors-guide-to-ai/finance-leaders-transition-from-caution-to-customer-centric-scale",
    portrait: "/covers/implementors-guide-to-ai-finance-edition-portrait.png",
  },
  {
    title: "Implementor's Guide to AI: Manufacturing Edition",
    href: "/resources/insights/implementors-guide-to-ai/manufacturing-automotive-energy-leaders-move-from-pilots-to-scale",
    portrait:
      "/covers/implementors-guide-to-ai-manufacturing-edition-portrait.png",
  },
  {
    title: "Implementor's Guide to AI: Retail & Consumer Goods Edition",
    href: "/resources/insights/implementors-guide-to-ai/retail-consumer-goods-leaders-shift-from-experiments-to-loyalty-led-scale",
    portrait:
      "/covers/implementors-guide-to-ai-retail-consumer-goods-edition-portrait.png",
  },
];

export const reportShelf: ReportShelfItem[] = reportLandings.flatMap(
  (report) => {
    const entry: ReportShelfItem = {
      title: report.hero.title,
      href: `/resources/reports-whitepapers/${report.slug}`,
      portrait: report.cardPortrait,
      cardImage: report.cardImage,
    };
    return report.slug === "implementors-guide-to-ai"
      ? [entry, ...implementorsGuideEditions]
      : [entry];
  },
);

/**
 * The most recently published reports, newest first. The home page's "Latest
 * reports" band reads this, so adding a landing is enough to update it.
 */
export function latestReports(count: number) {
  return [...reportLandings]
    .sort(
      (a, b) =>
        b.published.localeCompare(a.published) ||
        a.metaTitle.localeCompare(b.metaTitle, "en"),
    )
    .slice(0, count);
}

/** Copy for the /resources/reports-whitepapers listing page. */
export const reportsLibrary = {
  title: "Reports & whitepapers",
  lede: "Original research reports and whitepapers for business and marketing leaders.",
  cardCta: "View the report",
  empty: "No reports are published yet. New research lands here as programmes complete.",
} as const;
