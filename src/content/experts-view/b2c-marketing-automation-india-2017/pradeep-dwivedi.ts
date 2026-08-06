import type { ExpertInterview } from "../types";

/* The source page repeats one exchange, "Any specific tool that you are using
   for bulk emailing?", twice with an identical answer. It is carried once. */
export const pradeepDwivedi: ExpertInterview = {
  slug: "pradeep-dwivedi",
  project: "b2c-marketing-automation-india-2017",
  perspective: "buyer",

  metaTitle: "Can CMOs & CIOs work together for marketing initiatives?",
  metaDescription:
    "Pradeep Dwivedi, then of the Dainik Bhaskar Group, on a 5.5 million contact database, why reliance on external agencies has held marketing automation back, and the discomfort between CMOs and CIOs.",

  title: "Can CMOs & CIOs work together for marketing initiatives?",
  person: {
    name: "Pradeep Dwivedi",
    role: "Chief Corporate Sales and Marketing Officer",
    company: "Dainik Bhaskar Group",
  },

  thumbnail: "/experts/pradeep-dwivedi.png",
  thumbnailAlt: "Pradeep Dwivedi",

  intro: [
    "In this interview, Pradeep Dwivedi, former Chief Corporate Sales and Marketing Officer of the Dainik Bhaskar Group, shares how the media house is using marketing automation solutions in its marketing strategy. Pradeep led pan-India corporate sales and marketing groups and has been instrumental in establishing Dainik Bhaskar as a premium media brand.",
    "This interview was conducted by Santosh Abraham, Founder and Lead Analyst at Research NXT, in September 2016. Pradeep has since moved out of DB Corp Limited and is now CEO of the Sakal Media Group. Read on to understand how technology is shaping up marketing in Indian media houses.",
  ],

  highlights: [],

  pullQuote:
    "There is an intrinsic discomfort I see in CMOs actually working with CIOs. I feel this requires a cultural change, for CIOs to make their relevance felt to the CMO.",

  exchanges: [
    {
      question: "Have you been using marketing automation in your organisation?",
      answer: [
        "To some extent, yes, we do use marketing automation. We do not have a CRM implementation yet. But what we do have is a large database of customers, which is part of our SMB billing database. This is used as a contact as well as promotion solution when we are trying to run a campaign, mostly around text and email. It is in the primitive stages at DB Corp. We are looking at alternative technology which can help us.",
      ],
    },
    {
      question: "What is the size of this database you work on?",
      answer: [
        "It is approximately 5.53 million contacts. When it comes to the database there are two kinds of customers that we have to deal with. One is prospects from a B2B context, which is the large part of what I do: audiences of 10,000 clients, of which 7,000 are spread in the local market and about 3,000 are corporate clients. Out of these, the top 200 clients, which contribute almost 70 per cent of the revenue, are critical. The second is readers in a B2C context: when we are selling newspapers we are creating a readership base, and then we sell this readership base to an advertiser by creating ad space.",
      ],
    },
    {
      question:
        "Is your marketing automation mainly targeted at B2C or B2B clientele?",
      answer: [
        "Both have very distinct marketing programmes. The B2C programme I spoke about is largely focused on building a better connection with readers. We supplement it with a series of events and CSR activity for reader connection, and use these tools to make sure the audience is drawn to these events. These could be programmes as simple as water conservation, spirit of giving, save the bird. These are community awareness initiatives, because a newspaper has to be seen as an agenda of social awareness in the market. This keeps the readers engaged with our product.",
        "On the B2B side the programmes are very different, because it is all about delivering to the market and the audience.",
      ],
    },
    {
      question:
        "Penetration of marketing automation solutions in India is very low. Why do you think the Indian market is still not using these products?",
      answer: [
        "A large part of marketing today is externally focused and it can be broadly divided into two parts. One is recognition of your brand, its vision, mission and values, which is put together to attract customers. Second is actually taking those brand values and that brand message to the marketplace, to the customer who is actually going to pay for it. On the latter part there is a huge reliance on external agencies to do the job for them. That is one of the main reasons that marketing automation has not caught on.",
        "Companies like GroupM, O&M and Havas Media are international media groups who do the creative side of the campaign, media planning and media buying. So a large part of mass communication is passed on to them. Now when it comes to doing targeted communication to a set and identified database, there automation technology can be used.",
        "There is an intrinsic discomfort I see in CMOs actually working with CIOs. I feel this requires a cultural change, for CIOs to make their relevance felt to the CMO. Today that is not happening. I think if you look at the consumer life cycle, the CIO has been very successful in creating value when it comes to the post sales life cycle. If there is a billing relationship or a renewal relationship, they are able to manage all those effectively. But when it comes to managing a potential database, either by creating value out of existing customers or through the external market where they are not with the company at any point of time, there CIOs are very uncomfortable.",
      ],
    },
    {
      question: "How do you run campaigns for such a huge database?",
      answer: [
        "For B2C segments there are internal campaigns which are executed. That is an important part of what we do. I would again say this is primitive and restricted to text and email. Given the nature of B2B selling there is a lot more money being spent on event engagements than on leveraging technology. I have seen tech companies doing a better job of leveraging technology to sell B2B. For example Oracle or SAP or even Microsoft do a far better job than companies outside their industry. You can use technology to organise yourself or to actually sustainably convey a message. I think people tend to use technology in marketing in the Indian context in the B2B segment more to organise themselves, and leave the customer contact area to traditional means.",
      ],
    },
    {
      question: "For email, are you using drip marketing?",
      answer: [
        "No, we are at an early stage. But if you refer to my previous organisation three years ago, in a telecom context, there we were using all the tools. I worked with Tata Teleservices where I was heading the B2B side of the business for the western region. We were using all of these tools including automated sequencing based on customer value, time of messaging, and variation of messages in terms of quality and content.",
      ],
    },
    {
      question: "Any specific tool that you are using for bulk emailing?",
      answer: [
        "If we have to do some bulk messaging we depend on our vendors like Netcore, which do the work. But mostly we do it on our own. We do template messaging which is customised a little for each client to make it appear nice. In the B2C segment we use it more than B2B. In B2B we largely use it for event reminders, follow-ups and customised relationship messages like birthdays. But again I would say it is not very evolved here.",
      ],
    },
    {
      question: "How do you manage your database?",
      answer: [
        "We have a full SAP deployment where customer primary data is maintained. We also use Outlook active directory based tools to do automation of this messaging. But there are no special tools that we use.",
      ],
    },
    {
      question:
        "With respect to reporting and analytics, are you using any particular tool?",
      answer: [
        "We have overlayer software that runs on the core SAP database, which is part of the architecture. We have Clicky, which does more reporting than analytics and runs on the SAP core, and Salesforce is currently under evaluation.",
      ],
    },
    {
      question:
        "In the next five years, do you see a need to have a centralised marketing tool in your organisation?",
      answer: [
        "The need definitely is there, but what will determine the success of adoption depends on two different criteria. First is purely on account of efficiency: will any platform that is on offer do the job much better than all of these discrete elements put together, without the controller of these elements feeling a lack of authority? In an organisation the database is managed by one set of teams, marketing is managed by another set, and the ultimate consumer who is impacted is handled by the sales team. So we have to get the sales, CRM and marketing teams aligned on a marketing platform. And I am yet to come across a tech vendor who has made such a convincing product. Second is the cost value: if these tech vendors can show a saving of anything above 20 per cent then I think they will have a compelling case.",
      ],
    },
  ],
};
