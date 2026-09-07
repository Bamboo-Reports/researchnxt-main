import type { Event } from "../types";

/**
 * Copy transcribed from
 * researchnxt.com/events/redefining-marketing-excellence-highlights-from-the-marketing-automation-roundtable/
 *
 * The same write-up is served from `/campaign-management/` as well, so both
 * source URLs redirect here.
 *
 * No `date`: the recap states no event date, and neither the events listing
 * nor the page metadata carries one. The write-up was published 2025-01-13,
 * which is a different fact and is not shown as the event's date; it is
 * carried as `published` so the listing can place the recap after the
 * H-1B roundtable and ahead of the 2021 launches, on user direction.
 *
 * No `facts` either: the source runs no research focus, geography or
 * timeframe, the same as the conference participations.
 */
export const marketingAutomationRoundtable: Event = {
  slug: "marketing-automation-roundtable",
  project: "automation-campaign-management",
  published: "2025-01-13",

  metaTitle:
    "Redefining Marketing Excellence, the Marketing Automation Roundtable",
  metaDescription:
    "Zoho and Research NXT hosted the Marketing Automation and Campaign Management Roundtable at Hilton Mumbai, launching the Automation and Campaign Management Handbook for Functional Experts.",

  title:
    "Redefining Marketing Excellence: Highlights from the Marketing Automation Roundtable",
  /* No lede: the opening paragraph names the hosts and the venue a moment
     later, so a standfirst here only said it twice. */
  excerpt:
    "The roundtable that launched the Automation and Campaign Management Handbook for Functional Experts, with panellists from PolicyBoss, Cedar Consulting and The Indian Express.",

  image: "/events/marketing-automation-roundtable.png",
  imageAlt:
    "The Marketing Automation and Campaign Management Roundtable, hosted by Zoho and Research NXT at Hilton Mumbai",

  body: [
    "The Marketing Automation and Campaign Management Roundtable was a day to remember, a perfect blend of expertise, innovation, and meaningful conversations. Hosted by Zoho and Research NXT at Hilton Mumbai, this exclusive event celebrated the launch of the much-anticipated **Automation and Campaign Management Handbook for Functional Experts**.",
    "This exclusive gathering brought together thought leaders, marketing professionals, and industry experts for a rich exchange of ideas and strategies to address modern marketing challenges.",

    {
      image: "/events/marketing-automation-roundtable/roundtable.jpg",
      alt: "Delegates seated around the roundtable in the wood panelled room, watching the presentation",
    },

    { heading: "Setting the stage" },
    "The event began with a warm welcome by Vipasha Sinha from Zoho. She set the tone for the discussions ahead and introduced the key speakers. Among the distinguished speakers were Varun Kaushik from PolicyBoss, Ojas Kulkarni from Cedar Consulting, and Lijo Mathew from The Indian Express, each bringing unique perspectives and invaluable insights to the discussions.",
    "The agenda was clear: to explore how agility and innovation in marketing strategies can address the rapid shifts in consumer behaviour and market demands.",
    "Following the introduction, Karthik Subramanian from Zoho provided insights into the purpose of the report and its relevance in today's marketing landscape. His talk highlighted the critical need for adaptability in campaign management, emphasising that businesses must leverage automation to stay ahead of ever-evolving challenges.",

    { heading: "Diving into the research" },
    "The core of the event was the presentation of the **Automation and Campaign Management Handbook for Functional Experts**, delivered by Santosh Abraham from Research NXT. This segment delved into the report's purpose, methodology, and key findings, offering participants a comprehensive view of the challenges and opportunities facing modern marketers.",
    "With industry-specific insights and data-backed trends, the report underscored the growing importance of multi-channel campaigns, dynamic personalisation, and robust ROI tracking.",
    "Adding depth to the presentation were the panellists, who enriched this discussion by sharing their real-world experiences and providing practical perspectives on how to adapt to rapid market changes. Their stories of overcoming challenges and driving success made the session relatable, practical, and undeniably engaging.",

    {
      image:
        "/events/marketing-automation-roundtable/handbook-presentation.jpg",
      alt: "A speaker presenting the Automation and Campaign Management Handbook, its cover on the screen behind him",
    },

    { heading: "Solutions in action" },
    "A highlight of the event was the demonstration of Zoho Campaigns and Marketing Automation tools, led by Zoho's Product Management team. The live walkthrough showcased how these tools enable marketers to streamline multi-channel execution, personalise content dynamically, and make data-driven decisions in real time. Practical examples illustrated how automation empowers teams to build agile and adaptable marketing strategies.",
    "Karthik's session further detailed Zoho's broader marketing suite, explaining how each feature addresses pain points like lead attribution and multi-channel coordination. From tackling fragmented data to enabling seamless audience segmentation, Zoho's solutions provided actionable takeaways for participants. It was clear that these tools were not just built for marketers, they were built with marketers in mind.",

    { heading: "Interactive, insightful, inspiring" },
    "The event concluded with an open Q&A moderated by Vipasha, where attendees engaged directly with panellists and speakers.",
    "Among the attendees were Abhishek Mahimkar and Pratik Wagle from Aditya Birla Finance, Karishma Rele from Aditya Birla Housing Finance, Vaibhav Zaveri from Ageas Federal Life Insurance, Deepashri Raut from Croma, Vivek Roy from Future Generali India Insurance, Deepak Vashisht from Illusion Aligners, Monica Singh from Kalpataru Group, Vijay Pashte from Metropolis Pathology Lab, Nilachal Panda from The Indian Express, Anurag Choudhary from UTI Mutual Fund, and Sudhir Gaonkar from Wockhardt Hospitals.",
    "Attendees asked questions that ranged from high-level strategy to on-the-ground execution, and the panellists answered with the same blend of expertise and honesty that defined the day.",
    "The closing remarks summarised the key takeaways, and attendees left not just with a copy of the handbook but with fresh perspectives, actionable ideas, and connections that could drive meaningful change in their work.",

    {
      image: "/events/marketing-automation-roundtable/panel.jpg",
      alt: "A panellist answering a question into a microphone, beside the Zoho Marketing Automation banner",
    },

    { heading: "A step forward" },
    "The roundtable event was a call to action for marketers to embrace innovation and agility. By launching the handbook amidst this vibrant discussion, Zoho and Research NXT have set the stage for a new era of marketing excellence.",
    "Marketers across industries now have a powerful resource in the form of the Automation and Campaign Management Handbook. This event demonstrated the immense value of collaboration, shared insights, and cutting-edge tools in driving meaningful marketing outcomes.",
    "If there was one takeaway from the day, it was this: marketing success in the modern world is not about working harder, it is about working smarter. And with the right tools, strategies, and community, that success is well within reach.",

    {
      image: "/events/marketing-automation-roundtable/speakers.jpg",
      alt: "Five speakers standing together in front of the Zoho and Research NXT banner at Hilton Mumbai",
    },
  ],

  /* Opens the page in place of the banner, as on the source. */
  video: {
    linkedInPost: "urn:li:ugcPost:7272561579966021632",
    caption:
      "Highlights from the Marketing Automation and Campaign Management Roundtable",
  },

  /* The download form the source page closes with. Same Zoho form the
     Automation & Campaign Management programme uses elsewhere. */
  jotformId: "243521499246462",
};
