import type { Event } from "../types";

export const aiLedEbookLaunch: Event = {
  slug: "ai-led-ebook-launch",
  project: "ai-led-personalization",

  metaTitle: "AI Led Personalization 2020, eBook launch event",
  metaDescription:
    "The virtual launch of the AI Led Personalization Strategy & Trends Report, India 2020, with a keynote from David Raab and panels on customer engagement, data foundations and personalisation.",

  title: "AI Led Personalization 2020, eBook launch",
  lede: "Netcore and Research NXT closed a six-month journey into AI in marketing with a virtual event",
  date: "2021-03-22",
  excerpt:
    "The virtual launch of the India 2020 report, with a David Raab keynote and three sessions with the marketing leaders interviewed.",

  image: "/events/ai-led-ebook-launch.png",
  imageAlt: "AI Led Personalization 2020 eBook launch event",

  /* The four recordings the source page publishes, in its running order:
     the keynote first at full width, then the three discussions. */
  sessions: [
    {
      kind: "Keynote",
      title: "David Raab, Founder, CDP Institute",
      videoId: "K73A41ed_Fw",
      poster: "/events/ai-led-ebook-launch/session-keynote.png",
    },
    {
      kind: "Panel discussion",
      title: "Customer engagement as a driver of growth",
      videoId: "X0SgCIUiu5M",
      poster: "/events/ai-led-ebook-launch/session-customer-engagement.png",
    },
    {
      kind: "Fireside chat",
      title: "Building the right foundation: marketing with data",
      videoId: "l4S6q9UjN8Q",
      poster: "/events/ai-led-ebook-launch/session-marketing-with-data.png",
    },
    {
      kind: "Panel discussion",
      title: "Personalization a competitive advantage",
      videoId: "YNjogt0zGso",
      poster: "/events/ai-led-ebook-launch/session-personalization.png",
    },
  ],

  reportBand: {
    title: "AI Led Personalization",
    subtitle: "Strategy & Trends Report, India 2020",
    artwork: "/covers/ai-led-personalization-hero.png",
    artworkAlt:
      "The AI Led Personalization Strategy and Trends Report, India 2020, on a tablet",
    /* The same four facts the source states, in its own words. */
    facts: [
      {
        label: "Research focus",
        value: "AI Powered Business Strategies of B2C Brands",
      },
      {
        label: "Format",
        value: "Engagement Interviews | Virtual Event | Social Media Promotion",
      },
      { label: "Geography", value: "India" },
      { label: "Timeframe of research", value: "April 2020 – Sept 2020" },
    ],
  },

  clientStory: {
    story: "netcore",
    /* The microsite's own testimonial artwork, the same file the report
       landing's client band uses. */
    card: "/success-stories/ai-led-personalization/netcore-card.png",
    facts: [
      {
        label: "Research focus",
        value: "AI Powered Business Strategies of B2C Brands",
      },
      {
        label: "Engagement",
        value: "Interviews | Virtual Event | Social Media Promotion",
      },
      { label: "Geography", value: "India" },
      { label: "Timeframe of research", value: "April 2020 – Sept 2020" },
    ],
  },

  speakers: [
    {
      name: "David Raab",
      role: "Founder, CDP Institute",
      image: "/events/ai-led-ebook-launch/speaker-david-raab.jpg",
      linkedIn: "https://www.linkedin.com/in/david-raab-22146b/",
    },
    {
      name: "Scott Brinker",
      role: "Editor at chiefmartec.com",
      image: "/events/ai-led-ebook-launch/speaker-scott-brinker.jpg",
      linkedIn: "https://www.linkedin.com/in/sjbrinker/",
    },
    {
      name: "Lloyd Mathias",
      role: "Business strategist and investor",
      image: "/events/ai-led-ebook-launch/speaker-lloyd-mathias.jpg",
      linkedIn: "https://www.linkedin.com/in/lloyd-mathias/",
    },
    {
      name: "Avnish Anand",
      role: "Co-founder, CaratLane",
      image: "/events/ai-led-ebook-launch/speaker-avnish-anand.jpg",
      linkedIn: "https://www.linkedin.com/in/avnishanand/",
    },
    {
      name: "Meera Iyer",
      role: "Ex CMO, Medlife and BigBasket",
      image: "/events/ai-led-ebook-launch/speaker-meera-iyer.jpg",
      linkedIn: "https://www.linkedin.com/in/meeraiyer/",
    },
    {
      name: "Rahul Mishra",
      role: "Head of Marketing Comms, Shemaroo Entertainment",
      image: "/events/ai-led-ebook-launch/speaker-rahul-mishra.jpg",
      linkedIn: "https://www.linkedin.com/in/rahulmishra/",
    },
    {
      name: "Ritesh Bhatnagar",
      role: "CMO, U2opia Mobile",
      image: "/events/ai-led-ebook-launch/speaker-ritesh-bhatnagar.jpg",
      linkedIn: "https://www.linkedin.com/in/riteshbhatnagar11/",
    },
    {
      name: "Rohit Srivastav",
      role: "Head of Growth Marketing, Netcore",
      image: "/events/ai-led-ebook-launch/speaker-rohit-srivastav.jpg",
      linkedIn: "https://www.linkedin.com/in/rohitsrivastav/",
    },
    {
      /* No LinkedIn: the source page's card for him links TV Naarayan's
         profile, so there is no correct URL to carry over. */
      name: "Ravi Santhanam",
      role: "CMO, HDFC Bank",
      image: "/events/ai-led-ebook-launch/speaker-ravi-santhanam.jpg",
    },
    {
      name: "Ayush Agarwal",
      role: "Co-founder, CodeFoxie and ex co-founder, Seniority",
      image: "/events/ai-led-ebook-launch/speaker-ayush-agarwal.jpg",
      linkedIn: "https://www.linkedin.com/in/agrawalayush/",
    },
    {
      name: "Shwetha Iyer",
      role: "Head of Marketing (Kids, UGC, Gamification), ZEE5",
      image: "/events/ai-led-ebook-launch/speaker-shwetha-iyer.jpg",
      linkedIn: "https://www.linkedin.com/in/shwetha811/",
    },
    {
      name: "Sanjay Gupta",
      role: "Marketing Director, India & APAC Rides Brand Marketing, Uber",
      image: "/events/ai-led-ebook-launch/speaker-sanjay-gupta.jpg",
      linkedIn: "https://www.linkedin.com/in/sanjay-gupta-3ba07a5/",
    },
    {
      name: "Akshay Matkar",
      role: "Head of Marketing, Candere by Kalyan Jewellers",
      image: "/events/ai-led-ebook-launch/speaker-akshay-matkar.jpg",
      linkedIn: "https://www.linkedin.com/in/theakshaymatkar/",
    },
    {
      name: "Santosh Valecha",
      role: "Global Head, Customer Success, Netcore",
      image: "/events/ai-led-ebook-launch/speaker-santosh-valecha.jpg",
      linkedIn: "https://www.linkedin.com/in/santushv/",
    },
    {
      name: "Santosh Abraham",
      role: "Founder & Lead Analyst, Research NXT",
      image: "/events/ai-led-ebook-launch/speaker-santosh-abraham.jpg",
      linkedIn: "https://www.linkedin.com/in/santoshabraham/",
    },
  ],
};
