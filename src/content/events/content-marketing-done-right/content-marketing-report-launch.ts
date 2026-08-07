import type { Event } from "../types";

export const contentMarketingReportLaunch: Event = {
  slug: "content-marketing-report-launch",
  project: "content-marketing-done-right",

  metaTitle: "Content Marketing Done Right, report launch at NASSCOM MarTech",
  metaDescription:
    "The Content Marketing Done Right report was launched at NASSCOM MarTech Confluence 2019, the flagship one-day event held on 28 November 2019 at Courtyard by Marriott, Mumbai.",

  title: "Content Marketing Done Right, report launch",
  lede: "Launched at NASSCOM MarTech Confluence 2019, Mumbai",
  date: "2019-11-28",
  excerpt:
    "Research NXT teamed up with NASSCOM as Associate Partner for MarTech Confluence 2019, and launched the Content Marketing Done Right report there.",

  image: "/events/content-marketing-report-launch.png",
  imageAlt:
    "Content Marketing Done Right report launch at NASSCOM MarTech Summit 2019",

  body: [
    "NASSCOM MarTech Confluence 2019 was focused on the future, to identify the marketing technologies that will drive businesses over the next decade. The event's theme was **Beyond 2020: Marketing in the Age of Data, Intelligence, and Experience**. NASSCOM MarTech brings together practitioners across diverse industries in the marketing value chain: brand agencies, digital agencies, new age technology companies, marketers, and the platforms powering the next generation of MarTech.",
    "Research NXT teamed up with NASSCOM as the Associate Partner for this flagship one-day event on **28 November 2019 at Courtyard by Marriott, Mumbai**, and launched the Content Marketing Done Right report there. The report covers the first of its kind Content Marketing Technology Stack and Maturity Model for the Indian market.",
  ],

  /* The one recording the source page publishes, under its own heading. */
  sessions: [
    {
      kind: "Recording",
      title: "Research NXT's report launch at NASSCOM MarTech 2019",
      videoId: "xXwLZXt3uRw",
      poster:
        "/events/content-marketing-report-launch/session-report-launch.png",
    },
  ],

  deck: {
    title: "Full presentation of the event launch",
    href: "https://www.slideshare.net/AkshaykumarRokade/nasscom-martech-researchnxt",
  },

  /* The two interview quotes the source page runs beside the recording.
     Names and roles come from the interviews themselves: the source page
     writes them as "Amit Kumar" and "Ranjit Behra". */
  quotes: [
    {
      text: "The big challenge is to get readers to click and open the blogs and other collaterals being published. Technology allows us to understand what works and when.",
      name: "Amit Kapoor",
      image: "/events/content-marketing-report-launch/quote-amit-kapoor.jpg",
      role: "Associate Director, Content Marketing, Cigniti Technologies",
      interview: "amit-kapoor",
    },
    {
      text: "Our conviction in video as a content format is so much that we have dedicated an internal team to conceptualise and create relevant and topical BFSI focused video content.",
      name: "Ranjit Behera",
      image: "/events/content-marketing-report-launch/quote-ranjit-behera.jpg",
      role: "Head, Performance and Digital Marketing, BankBazaar",
      interview: "ranjit-behera",
    },
  ],

  speakers: [
    {
      name: "Santosh Abraham",
      role: "CEO, Research NXT",
      image:
        "/events/content-marketing-report-launch/speaker-santosh-abraham.jpg",
      linkedIn: "https://www.linkedin.com/in/santoshabraham/",
    },
    {
      name: "Diptarup Chakraborti",
      role: "CMO, Zycus",
      image:
        "/events/content-marketing-report-launch/speaker-diptarup-chakraborti.jpg",
      linkedIn: "https://www.linkedin.com/in/diptarup-chakraborti-4a13982/",
    },
    {
      name: "Jay Magdani",
      role: "Product Lead, CleverTap",
      image: "/events/content-marketing-report-launch/speaker-jay-magdani.jpg",
      linkedIn: "https://www.linkedin.com/in/jay-magdani-4289ab4b/",
    },
  ],

  reportBand: {
    title: "Content Marketing Done Right",
    subtitle: "Trends and Best Practices Report, India 2020",
    artwork: "/covers/content-marketing-done-right-hero.png",
    artworkAlt:
      "The Content Marketing Done Right Trends and Best Practices Report on a tablet",
    /* Verbatim from the source panel, pipes, capitals and en dash included,
       which is how the report landings carry their facts too. */
    facts: [
      { label: "Research Focus", value: "B2B" },
      {
        label: "Format",
        value: "Engagement Interviews | Virtual Event | Social Media Promotion",
      },
      { label: "Geography", value: "India" },
      { label: "Timeframe of Research", value: "Jun 2019 – Nov 2019" },
    ],
  },
};
