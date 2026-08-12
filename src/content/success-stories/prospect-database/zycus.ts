import type { SuccessStory } from "../types";

export const zycus: SuccessStory = {
  slug: "zycus",
  project: "prospect-database",

  metaTitle: "Zycus, prospect database append and enrichment",
  metaDescription:
    "Five years and counting of prospect data support for Zycus: on-demand campaign data, 60,000 plus records appended and enriched, and 80% increased account coverage.",

  client: "Zycus",
  title: "Zycus, prospect database",
  lede: "Maximizing impact across the funnel through net new append and existing data enrichment.",
  published: "2021-06-08",
  excerpt:
    "Five years and counting of on-demand prospect data support for a cognitive procurement pioneer running campaigns into large enterprise accounts.",

  image: "/success-stories/prospect-database/zycus.png",
  imageAlt:
    "Preeti Shetty, Senior Manager at Zycus, on working with Research NXT",

  /* The source page carries two Wistia embeds but shows one: the other is
     marked hidden on desktop, tablet and phone alike, so it never plays. */
  video: {
    host: "wistia",
    videoId: "v0tjz7ihsh",
    title: "Preeti Shetty of Zycus on working with Research NXT",
  },

  /* The source page names the speaker under the recordings and sets none of
     her words as text, so the attribution stands alone. The sentence about a
     "partner of choice" is baked into the poster artwork, not page copy, and
     is not carried. */
  testimonial: {
    name: "Preeti Shetty",
    role: "Senior Manager",
    company: "Zycus",
  },

  logo: "/logos/trusted/zycus.png",

  /* The source page states no research focus, geography or timeframe: this is
     an ongoing data engagement rather than a research programme. */
  facts: [],

  /* Headings and descriptions as the source page pairs them. */
  deliverables: [
    {
      value: "On demand",
      label:
        "Campaign data support to enable and activate their most important prospects",
    },
    {
      value: "60K+",
      label: "Append and enrich a high volume of targeted prospect databases",
    },
    {
      value: "80%",
      label: "Improve key account coverage to the maximum",
    },
  ],

  body: [
    "Zycus is a pioneer in cognitive procurement, providing AI powered source-to-pay solutions. They are a trusted partner for large enterprises across industries and geographies.",
    "Zycus persistently runs marketing campaigns to connect with its target market decision makers meaningfully and amplify its thought leadership positioning. To ensure impactful campaign effectiveness, they rely on quality prospect data: the accuracy of intended targets, preciseness of information, standardised quality of records and the lowest bounce rate of emails. Hence **Zycus has been engaging with Research NXT for the past five-plus years and counting**.",
  ],

  document: {
    label: "Download the full case study",
    href: "https://hubs.ly/H0TjV_X0",
  },
};
