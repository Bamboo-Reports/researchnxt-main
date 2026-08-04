import type { ExpertInterview } from "../types";

export const rohitSrivastav: ExpertInterview = {
  slug: "rohit-srivastav",
  project: "automation-campaign-management",
  perspective: "buyer",

  metaTitle:
    "Navigating SaaS Marketing: Strategies for Differentiation and Data-Driven Success",
  metaDescription:
    "Rohit Srivastav, Head of Marketing at FleetPanda, on the 60/40 split between data quality and messaging, a four-layer martech stack, and why no attribution model is ever perfect.",

  title:
    "Navigating SaaS Marketing: Strategies for Differentiation and Data-Driven Success",
  person: {
    name: "Rohit Srivastav",
    role: "Head of Marketing",
    company: "FleetPanda",
  },

  thumbnail: "/experts/rohit-srivastav.png",
  thumbnailAlt: "Rohit Srivastav, Head of Marketing at FleetPanda",

  intro: [
    "In this interview, Rohit Srivastav, Head of Marketing at FleetPanda, explores his journey from martech and B2B SaaS roles to leading strategic marketing functions in diverse SaaS environments. The discussion covers his experience in navigating B2B-to-B2C dynamics, the role of martech in campaigns, the challenges of achieving a unified customer view, the nuances of lead attribution, and best practices for effective SaaS campaign management.",
  ],

  highlights: [
    "SaaS marketing fundamentals remain consistent across different market segments, but channels and tactics vary based on the target audience's digital savviness.",
    "A robust martech stack is crucial, with data quality and integration being foundational for successful campaigns.",
    "Personalisation and a unified customer view remain ongoing challenges, with AI potentially enabling more actionable use of customer data.",
    "Lead attribution models should be customised based on industry-specific user behaviours and touchpoints.",
  ],

  pullQuote:
    "Success in campaign management is often 60% dependent on data quality and martech infrastructure, while messaging and differentiation contribute around 40%. The foundation begins with a solid data stack, on which the rest of the martech ecosystem builds.",

  exchanges: [
    {
      question:
        "Can you share your experience as a functional leader in running campaigns, particularly in navigating the B2B-focused marketing landscape? You have often marketed B2C-oriented products to organisations, creating a unique B2B-to-B2C dynamic. How has that shaped your approach, and what was the transition like when moving to a predominantly B2B SaaS environment?",
      answer: [
        "My journey into a functional leadership role in martech began when I became Head of Growth at Netcore Cloud, a martech platform offering a suite of modules, including emails, push notifications, in-app notifications, and personalisation tools. My primary focus was on marketing automation, enabling consumer brands to send contextualised, multi-channel messages throughout the user journey and keeping users engaged on apps and websites. This role marked my entry into a functional ownership position.",
        "From Netcore, I transitioned to Insent, which was later acquired by ZoomInfo. At Insent and ZoomInfo, I shifted to the B2B SaaS space, where I focused on acquiring high-value enterprise clients. Afterwards, I joined Kula, a recruitment automation platform serving Series A and Series B startups and scaling companies, supporting their recruitment efforts.",
        "Currently, at FleetPanda, I work within a unique vertical SaaS setting, offering digital transformation and workflow automation solutions for petroleum distributors in the US. This role has a targeted B2B approach, leveraging marketing automation, inbound and email marketing, events, and account-based marketing strategies. Throughout my career, I have consistently managed account-focused, ICP-based campaigns in B2B, integrating multiple channels within a targeted, strategic framework.",
      ],
    },
    {
      question:
        "Could you also share your experience with community-building, specifically with the forums you have created, like s11s? How did that initiative come about, and what role has it played in your professional journey?",
      answer: [
        "Outside of my full-time role, I am also involved in a few ancillary projects. I am a co-founder of one of the largest online communities for SaaS marketers, s11s, along with two other co-founders. This community, with over 4,000 members, is dedicated to fostering open, tactical conversations on all things SaaS marketing, providing a valuable space for professionals to learn, grow, and connect.",
        "Additionally, I serve as a venture partner at Arali Ventures, an early-stage fund. Here, I support portfolio companies by helping them establish solid foundations for growth during their zero-to-one phase. Leveraging my experience, I guide founders and founding teams to recognise patterns and navigate challenges more effectively, ultimately reducing potential mistakes along their journey.",
      ],
    },
    {
      question:
        "SaaS marketing can vary significantly depending on the product and its target market. Over your career, you have worked with products that cater to a broad audience, and now you are focusing on a product with a much narrower, niche segment. Could you share your experiences navigating these two different spectrums and how your strategies have adapted to fit each unique market?",
      answer: [
        "Through my experiences across diverse markets, I intentionally sought to explore whether the fundamentals of marketing remain consistent or shift with different customer bases. My first observation confirmed that effective marketing principles hold steady across various markets and ideal customer profiles. The human-to-human marketing approach, while somewhat cliché now, is accurate: viewing customers as individuals, not just leads or accounts, consistently proves successful.",
        "Secondly, while the core principles stay the same, the channels do change. Marketing is ultimately about discovering where current and potential customers spend their time and amplifying the message there. For example, when marketing a martech product to savvy, tech-forward consumers, innovative digital tactics resonate well because the audience already understands the underlying technology. In contrast, when targeting petroleum marketers, who are less digitally focused, more conventional methods like email or direct website engagement work better than, say, retargeting ads.",
        "Ultimately, while human-centred messaging is universally effective, the choice of channels and tactics must adapt based on where different customer segments are most active.",
      ],
    },
    {
      question:
        "Many marketers in the tech space mention that they often do not leverage much technology in their own marketing efforts. How has it been in your experience? Have you incorporated a significant amount of martech in your campaigns, and what role has automation played for you?",
      answer: [
        "Marketing technology is undeniably pervasive today, with around 8,000 martech tools available, each sustaining revenue and a customer base. For B2B, especially SaaS, differentiation in a crowded market comes from two main strategies: crafting a unique product offering based on customer perception, and standing out through distinctive outreach methods. Effective outreach hinges on high-quality data, the right channels, and compelling messaging, much of which is empowered by martech tools.",
        "Personalisation, particularly intent data, helps identify in-market prospects, allowing for timely targeting that can shorten the sales cycle. However, data accuracy is essential, with about 7-9% of data typically becoming obsolete each year.",
        "In practice, success in campaign management is often 60% dependent on data quality and martech infrastructure, while messaging and differentiation contribute around 40%. The foundation begins with a solid data stack, on which the rest of the martech ecosystem builds. Here is how the martech tool stack is structured in a typical campaign:",
        {
          ordered: true,
          list: [
            "**Marketing automation tool:** Often, platforms like HubSpot are the central platform for managing inbound leads, nurturing, and outreach. These platforms capture inbound interactions from form fills and email responses, forming the core of the automation stack.",
            "**Account-based marketing and advertising:** For targeting a predefined account list, LinkedIn Ads are deployed with uploaded account lists. Factors.ai provides backend analytics, enabling account intelligence and tracking interactions, even from visitors who do not fill out forms.",
            "**Intent signal management:** Based on interactions and account de-anonymisation, high-intent signals are routed to an SDR team for outreach. Prospects showing moderate engagement enter a nurture sequence managed through Apollo or other email tools, allowing continued engagement until they are ready for direct sales.",
            "**CRM integration:** At the base of it all, HubSpot, or any CRM, consolidates account activity, scoring, and intelligence. This CRM layer creates a prioritised account list, indicating when to re-engage prospects based on recent interactions.",
          ],
        },
        "This integrated setup allows the team to continuously score and track account activity, improving timing and targeting in B2B outreach while minimising manual intervention and ensuring efficient use of martech capabilities.",
      ],
    },
    {
      question:
        "A key aspect we often discuss with other marketers is the unified customer view, or 360-degree view. Despite the martech landscape growing from around 1,300 tools initially to over 12,000 today, the unified customer view remains a widely discussed goal. With so many tools in play, do you think we have truly achieved a unified customer view, or is this challenge still unresolved?",
      answer: [
        "The unified customer view and personalisation have been long-standing goals in marketing, with numerous attempts to achieve them through various software and workflows. However, we are still far from a perfect solution. Even with thousands of martech tools available and new ones emerging, the pursuit of incremental improvements will likely continue.",
        "The recent advancements in large language models and generative AI present an opportunity to bring us closer to a true 360-degree customer view, enabling its application across multiple engagement channels. The concept of a central customer data platform, which gained traction a few years ago, has theoretically always existed. For B2C, platforms like Netcore Cloud or CleverTap, and for B2B, tools like Zoho CRM, HubSpot, or Salesforce, have long treated the user as a core entity. While tracking and enriching customer data have been feasible, the challenge has been making that data actionable in a meaningful way.",
        "AI now has the potential to leverage this centralised data at scale, enabling personalised interactions that can significantly impact customer engagement. In essence, AI is pushing forward the evolution of the unified customer view, making it more functional and impactful than ever.",
      ],
    },
    {
      question:
        "How do you approach lead attribution in your campaigns? Could you walk us through the attribution models and stages you use to identify which channels or campaigns are most effective?",
      answer: [
        "One of the least productive pursuits in martech implementation is trying to establish a perfect lead attribution model, because a perfect model simply does not exist. The analogy I often use is from cartography: all maps are wrong, but some maps are useful. This applies well to lead attribution; all models may be imperfect, but some are practical and can still provide valuable insights.",
        "The key purpose of lead attribution is not about achieving absolute accuracy; it is about giving your team a reliable framework to make informed decisions. For example, if I have Rs 10 to spend this quarter and Rs 50 next, attribution should help guide where the additional budget should go for the highest impact.",
        "A common mistake in lead attribution is rigidly applying a single model, like last-touch, first-touch, or equal weighting across all touchpoints. Instead, effective attribution should be tailored to each company's unique needs. For instance, in industries where form-filling is not intuitive, customers may prefer to engage by phone, meaning last-touch attribution to a phone call alone misses the influence of all prior interactions. An effective lead attribution model, therefore, should account for these behavioural nuances, adapting to reflect the customer's journey and unique touchpoints in each industry.",
      ],
    },
    {
      question:
        "As an expert in SaaS marketing, what fundamental challenges do you believe marketers should anticipate when planning campaigns? What best practices would you recommend to help navigate these challenges, whether they arise in campaign analysis, planning, or design?",
      answer: [
        "For effective SaaS campaign management, there are three crucial areas to focus on:",
        {
          ordered: true,
          list: [
            "**Data precision:** Ensuring pristine data is fundamental. Successful intent data and engagement rely heavily on data quality. If the data foundation is not solid, campaigns will struggle regardless of creative efforts. Redundancy and verification in the data stack are essential to maintain accuracy over time.",
            "**Robust tech stack and infrastructure:** Often overlooked, operational readiness is critical. Campaign planning should include all technical and operational checks, from email deliverability, considering volume and domain warming, to seamless integration between platforms like LinkedIn and HubSpot. This ensures smooth data flow and effective reach, reducing the risk of campaign failure due to technical gaps.",
            "**Differentiated product messaging:** In a crowded market, generic messaging will not stand out. Campaigns must be built on a clear understanding of the customer journey and unique selling points. Emphasising specific differentiators and highlighting real customer use cases allow products to resonate. As feature parity becomes standard, it is the nuanced, user-centred messaging that will truly engage and convert.",
          ],
        },
        "These three pillars, data quality, strong infrastructure, and unique messaging, are essential for high-impact SaaS marketing.",
      ],
    },
    {
      question:
        "As a seasoned practitioner, do you have any specific expectations or recommendations on how this guide should be structured to best serve the end user or reader?",
      answer: [
        "I believe this guide should cater to practitioners who have been leading functions for some time. It would be highly valuable to include insights into how AI is impacting or enhancing specific aspects of our roles. AI remains somewhat of a black box, where we understand its current applications but find it challenging to predict its future implications.",
        "Additionally, it would be beneficial to see how other leaders are approaching AI and technology in team-building and overall strategy. Understanding the evolving tech stack, beyond the current tools and toward what the future stack might look like, would allow us to better plan and adapt for upcoming changes in our field.",
      ],
    },
  ],
};
