import type { SuccessStory } from "../types";

export const insideview: SuccessStory = {
  slug: "insideview",
  project: "abm-best-practices-report-india-2018",

  metaTitle: "InsideView, an ABM campaign for the Indian market",
  metaDescription:
    "How Research NXT built the ABM Best Practices Report: India, 2018 for InsideView: 100+ surveys, six marketing leader interviews, 200+ targeted downloads and 25 product demos.",

  client: "InsideView",
  title: "InsideView, ABM campaign",
  lede: "An award-winning research on the status of the Indian ABM market.",
  published: "2018-06-30",
  excerpt:
    "The first of its kind Indian ABM Tech Stack, built for InsideView from 100+ surveys and six marketing leader interviews.",

  image: "/success-stories/abm-best-practices-report-india-2018/insideview.png",
  imageAlt:
    "Sesha Rao, former MD of India operations at InsideView, on the ABM Best Practices Report: India, 2018",

  logo: "/logos/trusted/insideview-lockup.png",

  /* The source page states no research parameters: where the other case
     studies list them, this one names the report and points at it. The same
     four facts are already on the report landing, which is where they belong,
     so the report band here runs the cover and the link alone. */
  facts: [],

  deliverables: [
    { value: "100+", label: "Surveys" },
    { value: "6", label: "Marketing leader interviews" },
    { value: "200+", label: "Targeted downloads" },
    { value: "25", label: "Product demos" },
  ],

  body: [
    "InsideView needed to study the Indian market and understand ABM's growth and best practices, and how it can have a significant impact on business in the region. **The research was aimed at:**",
    {
      list: [
        "Connecting with Indian B2B marketing leaders to discuss their views on ABM.",
        "Exploring how top Indian B2B brands have been leveraging ABM as a strategy and combating the inherent challenges.",
        "Identifying the first-of-its-kind Indian ABM Tech Stack.",
      ],
    },
  ],

  /* The two participant quotes the source page carries, each with the "View
     entire interview" link it runs beneath them. The Sesha Rao sentence that
     used to lead this list is baked into the poster artwork, not page copy:
     his name appears nowhere on the source. The source runs no recording, so
     the artwork stays a still. */
  quotes: [
    {
      quote:
        "We should pay more and get the right talent for the job. Never get less skilled talent to execute your ABM strategy.",
      name: "Diptarup Chakraborti",
      role: "VP Marketing",
      company: "Zycus",
      image:
        "/success-stories/abm-best-practices-report-india-2018/diptarup-chakraborti.png",
      href: "/resources/experts-view/abm-best-practices-report-india-2018/diptarup-chakraborti",
    },
    {
      quote:
        "I am a huge fan of a calendarised ABM programme, and technology helps me with midcourse corrections and abortions of a particular line of thought.",
      name: "Satinder Juneja",
      role: "Head of Marketing",
      company: "LTI",
      image:
        "/success-stories/abm-best-practices-report-india-2018/satinder-juneja.png",
      href: "/resources/experts-view/abm-best-practices-report-india-2018/satinder-juneja",
    },
  ],

  document: {
    label: "Download the full case study",
    href: "https://app.hubspot.com/documents/1950449/view/60024077?accessId=b29d79",
  },
};
