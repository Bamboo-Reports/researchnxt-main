import type { SuccessStory } from "../types";

export const netcore: SuccessStory = {
  slug: "netcore",
  project: "ai-led-personalization",

  metaTitle: "Netcore, a thought leadership campaign on AI in marketing",
  metaDescription:
    "How Research NXT and Netcore produced the first book on AI in marketing during the pandemic: insights from four thought leaders, 18 marketing leader interviews and a launch with 300+ attendees.",

  client: "Netcore",
  title: "Netcore, thought leadership campaign",
  lede: "A landmark culmination of insights in marketing.",
  published: "2020-09-30",
  excerpt:
    "The first book on AI in marketing produced during the pandemic, from conversations with more than 20 thought leaders across India's consumer brands.",

  image: "/success-stories/ai-led-personalization/netcore.png",
  imageAlt:
    "Rohit Shrivastav, Head of Growth at Netcore Solutions, on working with Research NXT",

  logo: "/logos/trusted/netcore-lockup.png",

  facts: [
    {
      label: "Research focus",
      value: "AI powered business strategies of B2C brands",
    },
    {
      label: "Format",
      value: "Engagement interviews, virtual event, social media promotion",
    },
    { label: "Geography", value: "India" },
    { label: "Timeframe of research", value: "April 2020 to September 2020" },
  ],

  deliverables: [
    { value: "4", label: "Thought leader insights" },
    { value: "18", label: "Marketing leader interviews" },
    { value: "1st", label: "Of its kind interactive eBook" },
    { value: "300+", label: "Attendees at the report launch" },
  ],

  body: [
    "Netcore Solutions is a global marketing technology company that offers solutions to help brands and enterprises in customer acquisition, engagement and retention, through marketing automation, analytics and AI and ML powered solutions.",
    "Amid the ongoing pandemic, Netcore started a much-anticipated initiative of reaching out to the top consumer-facing brands in India, to understand how they had been innovating and using AI powered tools in unforeseen market conditions. They teamed up with Research NXT and started engaging with top thought leaders to explore their expert opinions. This resulted in **the first book on AI in marketing** during the pandemic, carrying thought-provoking trends and best in class insights.",
  ],

  quotes: [
    {
      quote:
        "Research NXT has the knowledge and experience of providing marketing solutions that we were seeking in a vendor.",
      name: "Rohit Shrivastav",
      role: "Head of Growth",
      company: "Netcore Solutions",
    },
    {
      quote:
        "AI is productised, as simplified AI is already used across organisations. I do not think organisations need to reach a particular maturity level to implement AI.",
      name: "David Raab",
      role: "Founder",
      company: "CDP Institute",
      image: "/experts/david-raab.jpg",
    },
    {
      quote:
        "Most marketers still remain somewhat surprised by just how many different tools they can have in their stack.",
      name: "Scott Brinker",
      role: "Editor",
      company: "chiefmartec.com",
      image: "/experts/scott-brinker.png",
    },
  ],

  /* The live page links the same HubSpot document as the 2017 B2C marketing
     automation case study. Carried as found; see PROGRESS.md. */
  document: {
    label: "Download the full case study",
    href: "https://app.hubspot.com/documents/1950449/view/60024016?accessId=be8b06",
  },
};
