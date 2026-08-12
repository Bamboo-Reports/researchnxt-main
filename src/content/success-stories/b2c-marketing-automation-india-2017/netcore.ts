import type { SuccessStory } from "../types";

export const netcore: SuccessStory = {
  slug: "netcore",
  project: "b2c-marketing-automation-india-2017",

  metaTitle: "Netcore, an MQL campaign around a new product launch",
  metaDescription:
    "How Research NXT built the first report on B2C marketing automation in India for Netcore, to supplement the Smartech launch: 150+ surveys, 18 marketing leader interviews and 400+ targeted MQLs.",

  client: "Netcore",
  title: "Netcore, MQL campaign",
  lede: "A first of its kind research to supplement a new product launch.",
  published: "2017-05-31",
  excerpt:
    "A thought leadership report built to launch Netcore's Smartech suite, from 150+ surveys and interviews with 18 marketing leaders.",

  image: "/success-stories/b2c-marketing-automation-india-2017/netcore.png",
  imageAlt:
    "Kalpit Jain, CEO of Netcore Solutions, on working with Research NXT",

  /* The source page fronts this poster with a YouTube recording, carried in
     the Elementor widget's `data-settings` rather than as an iframe. */
  video: {
    host: "youtube",
    videoId: "5EW2XHDtPLI",
    title: "Kalpit Jain of Netcore on working with Research NXT",
  },

  logo: "/logos/trusted/netcore-lockup.png",

  facts: [
    { label: "Research focus", value: "B2C marketing automation" },
    {
      label: "Format",
      value: "Engagement interviews, virtual event, social media promotion",
    },
    { label: "Geography", value: "India" },
    { label: "Timeframe of research", value: "February 2017 to May 2017" },
  ],

  deliverables: [
    { value: "150+", label: "Surveys" },
    { value: "18", label: "Marketing leader interviews" },
    { value: "1st", label: "Report on B2C marketing automation in India" },
    { value: "400+", label: "Targeted MQLs" },
  ],

  body: [
    "Netcore was introducing their new brand identity and simultaneously launching their new AI powered multichannel marketing automation and analytics suite, **Smartech**. They wanted to supplement the occasion with:",
    {
      list: [
        "A first of its kind thought leadership report focused on the target market.",
        "In the process, connecting with top Indian B2C brand marketers and creating mindshare.",
        "Penetrating a scaling stage market with the right knowledge and approach.",
      ],
    },
  ],

  /* The two participant quotes the source page carries, each with the "View
     entire interview" link it runs beneath them. A third quote attributed to
     Kalpit Jain used to lead this list, but its text was the Zycus
     testimonial about prospect databases, pasted here and re-attributed: it
     is on neither source page, and "Kalpit" appears nowhere on this one.
     The source runs no recording, so the artwork stays a still. */
  quotes: [
    {
      quote:
        "Before adopting any marketing technology it is important to genuinely understand the needs of your customers.",
      name: "Meera Iyer",
      role: "Head of Marketing",
      company: "BigBasket",
      image:
        "/success-stories/b2c-marketing-automation-india-2017/meera-iyer-portrait.jpg",
      href: "/resources/experts-view/b2c-marketing-automation-india-2017/meera-iyer",
    },
    {
      quote:
        "All your service systems, social media and marketing campaigns should be connected to one single system to get a unified customer view.",
      name: "Prasad Pimple",
      role: "AVP, Marketing",
      company: "HDFC Life",
      image:
        "/success-stories/b2c-marketing-automation-india-2017/prasad-pimple-portrait.png",
      href: "/resources/experts-view/b2c-marketing-automation-india-2017/prasad-pimple",
    },
  ],

  /* The source page closes on its launch event, listing what the session
     covered. */
  launchEvent: {
    title: "Check out the Launch Event",
    description: [
      "How Marketing Automation has evolved in India.",
      "What are the best practices and preparation required to implement Marketing Automation.",
      "How latest trends like AI in Marketing [Chatbots, Machine Learning] is impacting businesses.",
    ],
    linkLabel: "Watch the launch event",
    slug: "report-launch-webinar",
  },

  document: {
    label: "Download the full case study",
    href: "https://app.hubspot.com/documents/1950449/view/60024016?accessId=be8b06",
  },
};
