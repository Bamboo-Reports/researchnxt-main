import type { Event } from "../types";

export const businessStrategyReportLaunch: Event = {
  slug: "business-strategy-report-launch",
  project: "south-east-asia-response-guide",

  metaTitle: "Southeast Asia Response Guide 2021, report launch event",
  metaDescription:
    "The virtual launch of the Southeast Asia Response Guide 2021, The Best of Business Strategies In The New Normal, with the six leaders interviewed for the research.",

  title: "Southeast Asia Response Guide 2021, report launch",
  lede: "The Best of Business Strategies In The New Normal",
  date: "2021-07-08",
  excerpt:
    "The virtual launch of the Southeast Asia Response Guide, with the six leaders whose interviews shaped it.",

  image: "/events/business-strategy-report-launch.png",
  imageAlt: "Southeast Asia Response Guide 2021 report launch event",

  /* The launch recording, which opens the source page. */
  video: {
    youTubeId: "7OkdfqgIuhg",
    caption: "Southeast Asia Response Guide 2021 report launch",
  },

  /* The source page carries no body prose beyond the fact list and the
     speakers, so none is invented here. The facts sit in `reportBand` below,
     which is where the source sets them: under the report's name, with the
     way through to it. */

  /* Roles as the source page sets them, the organisation on its own line
     throughout. Where the source runs the two together in a phrase ("CEO of
     Singlife", "Managing Director at DHL eCommerce") they are split at the
     preposition so every card reads the same way down the column.

     The source links no profile on any of these cards, so none is set: a
     LinkedIn URL guessed from a name risks linking the wrong person. Its
     cards carry no interview link either, so `interview` is unset and the
     card offers one way through rather than two. */
  speakers: [
    {
      name: "Karunjit Kumar Dhir",
      role: "Co-Founder",
      company: "SCIKEY",
      image: "/voices/south-east-asia-response-guide/karunjit-kumar-dhir.jpg",
    },
    {
      name: "Aaron Foo",
      role: "Head of Product Strategy",
      company: "iCarAsia",
      image: "/voices/south-east-asia-response-guide/aaron-foo.jpg",
    },
    {
      name: "Ravi Shankar",
      role: "Chief Growth & Digital Officer",
      company: "Air Asia",
      image: "/voices/south-east-asia-response-guide/ravi-shankar.jpg",
    },
    {
      name: "Walter de Oude",
      role: "CEO",
      company: "Singlife",
      image: "/voices/south-east-asia-response-guide/walter-de-oude.jpg",
    },
    {
      name: "Johnny Widodo",
      role: "CEO",
      company: "OLX Group Indonesia",
      image: "/voices/south-east-asia-response-guide/johnny-widodo.jpg",
    },
    {
      name: "Anil Gautam",
      role: "Managing Director",
      company: "DHL eCommerce",
      image: "/voices/south-east-asia-response-guide/anil-gautam.jpg",
    },
  ],

  /* The source page's closing panel, its facts carried verbatim with the
     hyphen separators and en dash it uses. */
  reportBand: {
    title: "SOUTHEAST ASIA RESPONSE GUIDE - 2021",
    subtitle: "The Best of Business Strategies In The New Normal",
    artwork: "/covers/south-east-asia-response-guide-hero.png",
    artworkAlt: "Cover of the Southeast Asia Response Guide, 2021",
    facts: [
      {
        label: "Research Focus",
        value:
          "The Best of Business Strategies In The New Normal in Southeast Asia",
      },
      {
        label: "Format",
        value: "Engagement Interviews | Virtual Event | Social Media Promotion",
      },
      { label: "Geography", value: "Southeast Asia" },
      { label: "Timeframe of Research", value: "April 2020 – Sept 2020" },
    ],
  },
};
