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

  facts: [
    {
      label: "Research focus",
      value:
        "The Best of Business Strategies In The New Normal in Southeast Asia",
    },
    {
      label: "Format",
      value: "Engagement interviews, virtual event, social media promotion",
    },
    { label: "Geography", value: "Southeast Asia" },
    { label: "Timeframe of research", value: "April 2020 to September 2020" },
  ],

  /* The source page carries no body prose beyond the fact list and the
     speakers, so none is invented here. */

  speakers: [
    {
      name: "Karunjit Kumar Dhir",
      role: "Co-founder, SCIKEY",
      interview: "karunjit-kumar-dhir",
    },
    {
      name: "Aaron Foo",
      role: "Head of Product Strategy, iCar Asia",
      interview: "aaron-foo",
    },
    {
      name: "Ravi Shankar",
      role: "Chief Growth & Digital Officer, AirAsia",
      interview: "ravi-shankar",
    },
    {
      name: "Walter de Oude",
      role: "CEO of Singlife",
      interview: "walter-de-oude",
    },
    {
      name: "Johnny Widodo",
      role: "CEO, OLX Group Indonesia",
      interview: "johnny-widodo",
    },
    {
      name: "Anil Gautam",
      role: "Managing Director at DHL eCommerce",
      interview: "anil-gautam",
    },
  ],
};
