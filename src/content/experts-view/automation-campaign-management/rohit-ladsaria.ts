import type { ExpertInterview } from "../types";

export const rohitLadsaria: ExpertInterview = {
  slug: "rohit-ladsaria",
  project: "automation-campaign-management",
  perspective: "buyer",

  metaTitle:
    "Optimising CRM and Marketing Automation for Effective Lead Generation and Engagement",
  metaDescription:
    "Rohit Ladsaria, Software Product Manager at ACS Infotech, on one master list instead of many, tagging and re-engagement segments, and why base data quality decides the targeting.",

  title:
    "Optimising CRM and Marketing Automation for Effective Lead Generation and Engagement",
  person: {
    name: "Rohit Ladsaria",
    role: "Software Product Manager",
    company: "ACS Infotech",
  },

  thumbnail: "/experts/rohit-ladsaria.png",
  thumbnailAlt: "Rohit Ladsaria, Software Product Manager at ACS Infotech",

  intro: [
    "In this interview with Research NXT, Rohit Ladsaria, Software Product Manager at ACS Infotech, discusses his professional journey from running a packaging business to his current role in software product management. He explains how marketing automation tools like Zoho Campaigns have enhanced the company's CRM offerings, helping improve lead generation and engagement for both B2B and B2C sectors. Rohit highlights the importance of personalisation, relevant data, and effective segmentation in driving successful marketing campaigns.",
  ],

  highlights: [
    "Rohit has diverse experience across industries, from packaging to tourism to automotive, and across operations, IT and marketing roles.",
    "He has implemented various marketing automation tools, with a current focus on Zoho Campaigns for email marketing.",
    "Key challenges are data quality and relevance, segmentation, and tailoring communication for B2B versus B2C audiences.",
    "KPIs focus on lead generation, email engagement metrics, and adapting to audience behaviour differences.",
  ],

  pullQuote:
    "Targeting based on behaviour, interests, and location leads to better responses. When we targeted a campaign down to the city level, the response rate was significantly higher than with generic messaging.",

  exchanges: [
    {
      question:
        "Could you briefly describe your professional journey that led you to your current position at ACS Infotech? What are your primary responsibilities, and how do they contribute to your organisation's overall business strategy?",
      answer: [
        "I started my professional journey at a young age, taking over my father's packaging business after he passed away when I was just 17. It was a food-grade packaging business in Nepal, and though I had no financial support or experience, I was determined to improve the quality and innovate. Within four years, I managed to capture the entire local market, transitioning from a small player to a major one, largely through innovation in paper quality and production processes. However, due to deteriorating conditions in Nepal, I had to close the business and move to India.",
        "In India, I transitioned into the IT sector, driven by my interest in software programming. I took over the IT segment of a company, which was using discrete software systems. I proposed an ERP-based solution to integrate the operations, accounts, and sales functions. After several years of development and implementation, we successfully integrated the entire operation, improving transparency and profitability tracking. I also streamlined processes in HR, inventory, purchasing, and even hotel reservation systems.",
        "Eventually, I moved into marketing, where I focused on expanding the company's B2C presence, particularly for our resorts and cruises. We developed a custom reservation system and ventured into email marketing to re-engage leads. For B2B, we primarily relied on email marketing, and for B2C, we used automation tools like Zoho Campaigns to nurture leads and drive conversions. We also strengthened our paid campaigns, using these leads to fuel sales and email marketing efforts.",
        "Currently, at ACS, I manage marketing for two key products, asset management and ticketing systems. We generate leads through platforms like Capterra and push them into our CRM for segmentation and drip email campaigns. While our focus has been on the auto industry, we also cater to non-auto sectors, adapting our strategies to meet diverse business needs. My role involves not just promoting products but also assisting the sales team by streamlining and automating marketing processes.",
      ],
    },
    {
      question:
        "How do you use marketing automation in your CRM offerings to help clients engage with their customers?",
      answer: [
        "In one of my previous roles, which was in the cruise space, we used Zoho CRM and Zoho Campaigns, which made the lead management process seamless. Leads generated from the website were automatically captured in the CRM and synced with Zoho Campaigns, ensuring no data was lost. Once in the CRM, I would manually segment the leads into categories like single travellers or budget travellers, given the niche nature of the business and the smaller volume of customers. This allowed us to run highly targeted campaigns for specific groups, such as those who have previously travelled to a destination and are looking for new experiences.",
        "In the past, email campaigns were somewhat disorganised, with multiple lists being created for each campaign. I streamlined the process by creating a single master list in Zoho Campaigns. This way, duplicate contacts are managed automatically, and unsubscribed users are not re-sent emails, which helps avoid customer frustration. I also implemented tagging, so when I upload contacts, I can tag them by interest, making it easier to reuse the same list for future campaigns without having to re-upload or duplicate efforts.",
        "Additionally, I have started using A/B testing to determine which campaigns perform better, and follow-up campaigns to engage more effectively. For example, I now segment customers based on their engagement with previous emails: those who clicked on any of my last 5-10 emails are considered highly engaged, and they receive tailored communications. This kind of real-time segmentation and automation helps me save time and target the right audience more efficiently.",
        "I have also improved the speed of creating email campaigns by using certain features in Zoho Campaigns, like repeating sections or starring key sections of emails, which allows for faster execution. Overall, these improvements have made our email marketing process more efficient and targeted.",
      ],
    },
    {
      question:
        "What is your experience with using Zoho Campaigns as part of your marketing automation toolkit?",
      answer: [
        "The tools I use are very helpful when designing email campaigns. They prompt me to limit my subject line, maintain consistent branding, and ensure the tone is aligned with our message. I have created reusable templates with sections that I can easily drag and drop, saving time and effort in the design process.",
        "When sending emails for the cruise segment, I leveraged time zone targeting, ensuring that emails reached customers at 9am in their respective time zones, whether in the US, India, or elsewhere. At ACS, where we primarily target Indian customers, I now schedule emails based on when the customer last interacted with an email, optimising for deliverability and engagement.",
        "The powerful segmentation features allow me to identify customers who have interacted with previous campaigns, whether they have clicked a link or opened an email. I have recently implemented retargeting campaigns, where those who click on specific emails receive follow-up campaigns tailored to their interests. This approach focuses on engaging customers who are genuinely interested rather than sending the same emails to everyone. While this method is commonly used, it is new for me, and experimenting with it has proven effective.",
      ],
    },
    {
      question:
        "What best practices do you follow to ensure high deliverability and engagement rates? Also, what are the biggest challenges you face when implementing marketing automation, and how do you address them?",
      answer: [
        "The most important factor in any campaign, regardless of volume, is having relevant data. Without it, targeting becomes ineffective. For example, if I do not know the country of the recipient, I cannot properly target them by location. While Zoho Campaigns helps identify countries based on deliverability, I still need accurate data for precise country-based targeting. Additionally, segmentation is crucial, whether it is by customer behaviour or demographics, like targeting single travellers or customers interested in specific products.",
        "For instance, at ACS, departments like IT, HR, and finance are more likely to be interested in our asset management application. To target these departments, I rely on data fields like Department. If the CRM data is inconsistent, I might have variations like HR or HR Department, which can cause gaps. Zoho Campaigns allows flexible searches using keywords, but the quality of the base data remains critical. The more complete and accurate the data, the better the targeting.",
        "In smaller datasets, certain insights, like whether a customer is budget-conscious, often come from conversations. In larger organisations, this information might be lost between marketing and sales teams, making it harder to capture valuable details that can improve targeting. AI could potentially help in automating the segmentation of customer interactions from emails, ensuring better precision in marketing.",
        "Another challenge is ensuring that communications remain relevant after a customer has already purchased a product. For example, if a customer has bought the asset application, sending them demo invitations does not make sense. So, I have segmented our database by whether a customer is already using our application or not, ensuring more relevant communications.",
        "Targeting based on behaviour, interests, and location leads to better responses. When we targeted a campaign down to the city level, the response rate was significantly higher than with generic messaging. Ultimately, the more relevant and personalised the targeting, the better the engagement and results.",
      ],
    },
    {
      question:
        "How do you measure the success of your digital marketing campaigns? What KPIs do you find most valuable?",
      answer: [
        "In my previous role, my primary focus was lead generation. I closely monitored how many people clicked on the CTAs in my emails and tracked those who opened the link but did not submit a lead. For those, I would send follow-up communications. These two metrics, link clicks and lead submissions, were my key indicators of success.",
        "In my current role, the target audience is different. While my previous role dealt with foreign cruise customers, here I focus on Indian customers, specifically in the dealership sector. Indian customers tend to behave differently: they often do not submit leads at the end of a webpage as foreign customers do. In the B2B space, people browse quickly and exit emails without much interaction, so CTAs worked better for driving traffic to web pages. However, in B2C, I have found that putting more detailed content directly in the email works better for engagement.",
        "Additionally, in India, phone calls are a primary communication method, whereas before, I avoided calls in favour of email communication. Here, I cannot remove phone numbers from the process, which makes tracking calls more challenging. While link clicks provide some insights, tracking calls across different team members is more difficult. We also use Facebook, where it is harder to capture emails for retargeting. So, my priority when receiving leads from Facebook is to ask for their email, which helps build a direct communication channel.",
        "Previously, in the cruise industry, I would not send brochures until I had an email from the prospect. In this organisation, we use Capterra and Google Forms to capture leads, but the custom CRM we use does not directly integrate Facebook and Google leads, so we handle those manually. In Zoho, however, Facebook leads were captured directly.",
        "One issue I faced with Facebook was the influx of junk and fake leads. To avoid cluttering the main CRM, I used a second CRM, which I found more intelligent for filtering leads. I would pull the data, send proposals from the second CRM, and only move interested leads into the main system. This way, I kept the main CRM clean of junk leads while still engaging with potential customers through personalised emails that did not feel like mass campaigns. This workaround allowed me to send tailored proposals quickly and efficiently while maintaining the data quality in my CRM.",
      ],
    },
    {
      question:
        "Before we wrap up, we want to know your expectations from this report. What do you think would be most valuable for the readers of the report?",
      answer: [
        "For the reader, a step-by-step guide to building a list, integrating it with a CRM, running their initial campaigns and planning their next steps could be laid out, so that when they start, they start off small and then gradually pick up pace. So if you can design the report as a flow, it would be great. Existing users can skip the basic steps. Aligning the basic authentication of emailing is critical, which should be covered in the first section; I missed this in my conversation.",
        "And I would be happy if anyone requires my support in scaling their campaign effectiveness.",
        "And if the B2B and B2C activities could be separated it would be helpful, as readers who have a B2B audience can focus on B2B and likewise.",
      ],
    },
  ],
};
