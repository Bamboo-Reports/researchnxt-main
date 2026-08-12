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
    "Rohit Srivastav, Head of Growth Marketing at Netcore, on working with Research NXT",

  /* The source page runs the client testimonial as a Wistia recording behind
     this poster. */
  video: {
    host: "wistia",
    videoId: "mizyu760l7",
    title: "Rohit Srivastav of Netcore on the AI in marketing study",
  },

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

  /* Quotes and attributions as the source page publishes them. The client
     testimonial is the one under the recording; the sentence baked into the
     poster artwork is not copy the page carries, so it is not set here. */
  testimonial: {
    quote:
      "Netcore teamed up with Research NXT and initiated a much-anticipated business-facing study in India to understand the adoption of AI-powered marketing tools in unforeseen market conditions. We engaged with 20+ top thought leaders. This resulted in the first 'Book on AI in Marketing' during the pandemic and has best-in-class thought-provoking trends and insights",
    name: "Rohit Srivastav",
    role: "Head of Growth Marketing",
    company: "Netcore",
  },

  quotes: [
    {
      quote:
        "AI is productised, as simplified AI is already used across organisations. I do not think organisations need to reach a particular maturity level to implement AI.",
      name: "David Raab",
      role: "Founder",
      company: "CDP Institute",
      image: "/success-stories/ai-led-personalization/david-raab-portrait.png",
      href: "/resources/experts-view/ai-led-personalization/david-raab",
    },
    {
      quote:
        "Most marketers still remain somewhat surprised by just how many different tools they can have in their stack.",
      name: "Scott Brinker",
      role: "Editor",
      company: "chiefmartec.com",
      image:
        "/success-stories/ai-led-personalization/scott-brinker-portrait.png",
      href: "/resources/experts-view/ai-led-personalization/scott-brinker",
    },
  ],

  launchEvent: {
    title: "Check out the Launch Event",
    description: [
      "Netcore and Research NXT culminated their 6 month journey to build the market knowledge in AI in Marketing, and speaking to 10+ marketing leaders in the industry with a virtual event.",
      "Watch this amazing interaction for in-depth insight in the field of Personalization in Marketing.",
    ],
    linkLabel: "Watch the launch event",
    slug: "ai-led-ebook-launch",
  },

  /* The live page links the same HubSpot document as the 2017 B2C marketing
     automation case study. Carried as found; see PROGRESS.md. */
  document: {
    label: "Download the full case study",
    href: "https://app.hubspot.com/documents/1950449/view/60024016?accessId=be8b06",
  },
};
