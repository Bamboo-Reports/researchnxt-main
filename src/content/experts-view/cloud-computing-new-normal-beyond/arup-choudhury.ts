import type { ExpertInterview } from "../types";

export const arupChoudhury: ExpertInterview = {
  slug: "arup-choudhury",
  project: "cloud-computing-new-normal-beyond",
  perspective: "buyer",

  metaTitle:
    "Leveraging the Cloud to Empower the Mobile Workforce Culture in the New Normal",
  metaDescription:
    "Arup Choudhury, CIO at Eveready Industries India, on automating the frontline sales force, moving data centres to the cloud, and checking provider lock-in periods.",

  title:
    "Leveraging the Cloud to Empower the Mobile Workforce Culture in the New Normal",
  person: {
    name: "Arup Choudhury",
    role: "Chief Information Officer",
    company: "Eveready Industries India",
  },

  thumbnail: "/experts/arup-choudhury.png",
  thumbnailAlt:
    "Arup Choudhury, Chief Information Officer at Eveready Industries India",

  intro: [
    "In this Research NXT interview, Arup Choudhury, CIO at Eveready Industries India Limited, talks to us about leveraging cloud technologies for both the frontend and the backend workforce. He also gives us valuable insights into how businesses in the manufacturing sector should go about trying to transition to a cloud environment to ensure critical success factors.",
  ],

  highlights: [
    "Importance of proper resource due diligence for optimum cloud usage.",
    "The pressing need for flexible contracts with cloud service providers.",
    "How Eveready Industries has been progressively adopting cloud across business functions.",
  ],

  pullQuote:
    "Robust network infrastructure support with a solid layer of security are the building blocks of cloud transformation.",

  exchanges: [
    {
      question:
        "I would like to start with your role and journey at Eveready, and then would like to know your observations around the business transformations leveraging tech in all these years.",
      answer: [
        "I joined Eveready Industries in 2002 when the business was using some legacy applications and not much tech was used in the frontline sales force. From then till now we have embarked on our journey of tech transformation, starting with the introduction of Oracle eBusiness Suite and eventually migrating the entire legacy applications to it. Following that, we initiated two more simultaneous business process transformations on the back of tech enablement. One was the supply chain planning solution and the other was a demand forecasting solution. Finally, we took up automating the frontline sales force by implementing a dealer management portal and an SFA, a handheld mobile device to enable our salesforce to track, manage and automate on-ground activities with the power of cloud technology.",
        "Once these were achieved, we moved our focus to other operational business functions like analytics, HR, and process automation in accounts, finance and supply chain management. Then with the recent launch of our kitchen appliances segment, we moved to a cloud-based CRM to assist our customers and installation engineers to manage their on-ground requirements.",
      ],
    },
    {
      question:
        "The pandemic has changed the game for every organisation when it comes to business strategy and technology deployments. So, how has it impacted your organisation's strategy, and what were the key initiatives that you have worked on at Eveready during this time?",
      answer: [
        "Yes, we too were impacted, especially in our backend operations like the supply chain, accounts, finance and HR. With half of the workforce working remotely, we had to build a robust network infrastructure to support them. We invested in providing better connectivity to the remote workforce and also moved many applications to the cloud. We moved our data centres to the cloud and are contemplating transitioning the entire production system to the cloud soon.",
      ],
    },
    {
      question:
        "Because of these changes, how many employees across the organisation are now extensively using the cloud?",
      answer: [
        "Our salesforce was already on the cloud and had been using mobile applications for the past six years. For the rest, we had to ramp up our security infrastructure. So you can say most of the employees are now conversant with the latest technologies and have become familiar with best practices of mobile applications. All these happened on the back of good connectivity and robust security.",
      ],
    },
    {
      question:
        "Based on your view on articles around the SMAC technology stack in the manufacturing sector, you were worried about its adoption and effectiveness because of the connectivity issues in remote facilities. However, with the current pan-India internet penetration, have things changed?",
      answer: [
        "I would say connectivity has drastically improved only in the metros. However, we still have warehouses and plants outside city limits where connectivity is an issue and we have to connect through radio frequency.",
      ],
    },
    {
      question:
        "As a follow up to the earlier question, what would be the most common challenges that the manufacturing sector faces while deploying cloud technologies?",
      answer: [
        "There are a few things that manufacturers will need to assess prior to leveraging cloud technologies for their organisations. They are:",
        {
          list: [
            "To get the most out of cloud deployments, connectivity is a must. Hence, they have to assess the locations through proper IT infrastructure surveys with respect to network coverage, service provider resolution times and so on.",
            "Secondly, cloud users should check in on the lock-in periods of the cloud service providers. Flexibility to be able to change, scale or downsize your usage should be there.",
          ],
        },
      ],
    },
  ],
};
