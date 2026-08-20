import type { Event } from "../types";

export const reportLaunchWebinar: Event = {
  slug: "report-launch-webinar",
  project: "b2c-marketing-automation-india-2017",

  metaTitle: "B2C Marketing Automation Report launch webinar, 2017",
  metaDescription:
    "The launch webinar for the B2C Marketing Automation Report India, 2017, in association with Netcore: a 45 minute panel on the state of marketing automation in India and how to implement it.",

  title: "B2C Marketing Automation Report launch",
  lede: "Insights, best practices and latest trends from B2C marketing experts",
  date: "2017-09-07",
  excerpt:
    "A 45 minute panel on the state of marketing automation in India, hosted in association with Netcore and moderated by Research NXT's founder.",

  image: "/events/b2c-marketing-automation-report-launch.png",
  imageAlt:
    "B2C Marketing Automation Report launch webinar, transform your marketing with marketing automation, 2017",

  /* The source page lists the engagement facts under its client testimonial
     rather than beside the write-up, so they sit in `clientStory` below. */

  /* The panel recording, which opens the source page above the write-up. */
  video: {
    youTubeId: "KNjOpqdyrZo",
    caption: "B2C Marketing Automation Report launch panel discussion",
    poster: "/events/b2c-marketing-automation-report-launch-still.jpg",
  },

  body: [
    "Business leaders are being tested to adapt to a market which is led by customers. Highly dynamic customer behaviour, fuelled by digital disruption, has greatly changed the way marketing works. In this exclusive webinar the panel takes a look at the present state of marketing automation in India, and at the best practices for implementing it to improve the ROI of your marketing campaigns.",
  ],

  /* The source introduces the panel first and only then says what it covered,
     so this half of the write-up sits under the speaker cards. */
  bodyAfterSpeakers: [
    "The webinar, in association with Netcore, was hosted on 7 September 2017. The panel discussion was moderated by Research NXT's Founder and Lead Analyst, Santosh Abraham.",
    "Tune in to this 45 minute panel discussion and learn from the experts:",
    {
      list: [
        "How Marketing Automation has evolved in India.",
        "What are the best practices and preparation required to implement Marketing Automation.",
        "How latest trends like AI in Marketing [Chatbots, Machine Learning] is impacting businesses.",
      ],
    },
  ],

  /* The source page's "Client Testimonial" band: the engagement's own poster
     artwork, the way through to the case study, and the facts verbatim from
     the source, pipes, capitals and en dash included. */
  clientStory: {
    story: "netcore",
    card: "/success-stories/b2c-marketing-automation-india-2017/netcore.png",
    facts: [
      { label: "Research focus", value: "B2C Marketing Automation" },
      {
        label: "Engagement",
        value: "Interviews | Virtual Event | Social Media Promotion",
      },
      { label: "Geography", value: "India" },
      { label: "Timeframe of research", value: "Feb 2017 – May 2017" },
    ],
  },

  /* Portraits and profiles as the source page runs them. It links each card
     to LinkedIn only, so no `interview` is set: the cards carry one way
     through rather than two. */
  speakers: [
    {
      name: "Varun Kaushik",
      role: "VP and Head of Marketing",
      company: "PolicyBoss.com",
      image:
        "/events/speakers/b2c-marketing-automation-india-2017/varun-kaushik.jpg",
      linkedIn: "https://www.linkedin.com/in/varunkaushik82/",
    },
    {
      name: "Apurva Mudgal",
      role: "VP Product and Growth",
      company: "Haptik",
      image:
        "/events/speakers/b2c-marketing-automation-india-2017/apurva-mudgal.jpg",
      linkedIn: "https://www.linkedin.com/in/amudgal/",
    },
    {
      name: "VeerChand Bothra",
      role: "Chief Innovation Officer",
      company: "Netcore Solutions",
      image:
        "/events/speakers/b2c-marketing-automation-india-2017/veerchand-bothra.png",
      linkedIn: "https://www.linkedin.com/in/veerchand/",
    },
    {
      name: "Santosh Abraham",
      role: "Founder and Lead Analyst",
      company: "Research NXT",
      image:
        "/events/speakers/b2c-marketing-automation-india-2017/santosh-abraham.png",
      linkedIn: "https://www.linkedin.com/in/santoshabraham/",
    },
  ],
};
