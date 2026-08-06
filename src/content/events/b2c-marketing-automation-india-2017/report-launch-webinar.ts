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

  facts: [
    { label: "Research focus", value: "B2C marketing automation" },
    {
      label: "Engagement",
      value: "Interviews, virtual event, social media promotion",
    },
    { label: "Geography", value: "India" },
    { label: "Timeframe of research", value: "February 2017 to May 2017" },
  ],

  body: [
    "Business leaders are being tested to adapt to a market which is led by customers. Highly dynamic customer behaviour, fuelled by digital disruption, has greatly changed the way marketing works. In this exclusive webinar the panel takes a look at the present state of marketing automation in India, and at the best practices for implementing it to improve the ROI of your marketing campaigns.",
    "The webinar, in association with Netcore, was hosted on 7 September 2017. The panel discussion was moderated by Research NXT's Founder and Lead Analyst, Santosh Abraham. Tune in to the 45 minute panel discussion and learn from the experts how marketing automation has evolved in India, what best practices and preparation are required to implement it, and how the latest trends like AI in marketing, chatbots and machine learning, are impacting businesses.",
  ],

  speakers: [
    {
      name: "Varun Kaushik",
      role: "VP and Head of Marketing, PolicyBoss.com",
      interview: "varun-kaushik",
    },
    { name: "Apurva Mudgal", role: "VP Product and Growth, Haptik" },
    {
      name: "VeerChand Bothra",
      role: "Chief Innovation Officer, Netcore Solutions",
      interview: "veerchand-bothra",
    },
    { name: "Santosh Abraham", role: "Founder and Lead Analyst, Research NXT" },
  ],
};
