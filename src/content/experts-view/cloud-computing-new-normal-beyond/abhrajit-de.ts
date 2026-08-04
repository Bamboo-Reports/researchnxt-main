import type { ExpertInterview } from "../types";

export const abhrajitDe: ExpertInterview = {
  slug: "abhrajit-de",
  project: "cloud-computing-new-normal-beyond",
  perspective: "buyer",

  metaTitle:
    "How Does the Manufacturing Sector Use Cloud Technologies in India, and What Are Its Top Challenges?",
  metaDescription:
    "Abhrajit De, SVP and Head of Information Systems at Genus Power Infrastructure, on why operational technology stays on-premise, connectivity in remote plants, and mixed IT.",

  title:
    "How Does the Manufacturing Sector Use Cloud Technologies in India, and What Are Its Top Challenges?",
  person: {
    name: "Abhrajit De",
    role: "Senior Vice President, Head of Information Systems",
    company: "Genus Power Infrastructure",
  },

  thumbnail: "/experts/abhrajit-de.png",
  thumbnailAlt:
    "Abhrajit De, Senior Vice President and Head of Information Systems at Genus Power Infrastructure",

  intro: [
    "In this Research NXT interview, Abhrajit De, Senior Vice President and Head of Information Systems, talks to us about Genus Power Infrastructure's initiatives of using cloud for internal consumption as well as customer-facing applications, the use of on-premise IT infrastructure for their manufacturing and operational technologies, and insights on how businesses in the manufacturing sector should consider cloud migration and the present-day cloud adoption challenges.",
  ],

  highlights: [
    "Top cloud adoption challenges for the manufacturing sector.",
    "How the energy and power sector could leverage cloud technologies for better business performance.",
    "What approach cloud service providers should undertake to improve cloud adoption in the traditional business sectors.",
  ],

  pullQuote:
    "The manufacturing sector will see a rise in mixed IT infrastructure with some applications on the cloud and the rest on-premise.",

  exchanges: [
    {
      question:
        "Please share some insights on your role and journey at Genus Power.",
      answer: [
        "I joined Genus Power Infrastructure in 2013. We manufacture energy metres through our metering solution division and provide turnkey power projects as part of our ECC and metering projects division. Another division of ours is Genus Innovations Limited, which designs, develops and manufactures various eco-friendly power conditioning products, inverters and batteries, including solar power products such as solar inverters, solar panels and solar power conditioning units, and delivers solar turnkey projects.",
        "I joined Genus as AVP, Head of Information Systems, and am still innovating IS within the group. I head the entire IT space here, and we have two verticals of IT consumption. One is our internal organisational consumption, and the other is for our customers. For example, we serve many energy and utility boards, where IT services are also included as part of our solutions package. These IT services include creating our customer's data centre, setting up connectivity, and so on. Internally we address our IT as information systems because it is beyond and more of a system than technology. We believe technology is the fabric on which the systems have been built.",
        "As far as our IT landscape is concerned, our business runs on SAP ERP ECC 6.0 and uses it in the critical business aspects like supply chain management, the manufacturing process including QA and maintenance, the corporate functions like finance, and the customer solutions front.",
      ],
    },
    {
      question:
        "In one of your interviews, you mentioned that Genus Power used Google Cloud. Are you using it for the office staff for their work-from-home transition, or also for the shop floor?",
      answer: [
        "Our cloud journey started when we moved our collaboration, email and file storage applications on to the Google Workspace cloud, and it has helped in remote workforce effectiveness. We also have a lot of homegrown applications like HRMS and ESS for business operations. However, for our manufacturing and operational technology, we use on-premise SAP.",
      ],
    },
    {
      question:
        "What are your cloud technology priorities for Genus Power in 2021? What are your short and long term goals from the cloud investments?",
      answer: [
        "We may move our customer-facing applications, like service CRM, and the business operation applications like employee self service to the cloud. This will free up a lot of bandwidth, storage and maintenance workload from on-premises and offer flexibility to decide and use compute powers on demand.",
        "I believe that manufacturing and operational technology applications are better off on-premise. I say this because, in the manufacturing setup where there is the need for better control, you need a very high response rate. So, the stages of manufacturing have multiple interfaces where data is read and recorded in real time. But in the Indian context, where plants are located in remote areas, a downtime in internet connectivity will adversely affect the entire motivation to use the cloud. So, that sort of controlled application will not go to the cloud; they will be staged on-premises.",
        "Data can be pumped out offline and uploaded to the cloud for advanced analytics purposes on demand through third-party SaaS analytics service providers. So, there will be a mixed IT infrastructure with some on the cloud and the rest on-premise.",
      ],
    },
    {
      question:
        "What, according to you, are the most common cloud-based technology deployment challenges that the manufacturing sector faces today? Also, how do you foresee cloud being leveraged by the energy and power sector, your end consumers, for better business performance?",
      answer: [
        "Manufacturing processes require real-time control and response rate of the operational technology. This means that the IT organisation within these manufacturing set-ups needs to be on their toes at all times to operate, support and check on downtimes. Here are a few challenges that I think manufacturing companies face or have faced in their cloud deployment initiatives.",
        "Firstly, as mentioned earlier, in the Indian context, where manufacturing plants are often located in remote areas or beyond city limits, a downtime in internet connectivity will adversely affect the entire motivation to use the cloud. So ensuring uninterrupted connectivity for leveraging the cloud optimally is a key challenge.",
        "Secondly, cloud environments, private or public, have to be customised to match each manufacturer's operational and technical requirements. This means customising, managing and maintaining a team of the in-house cloud talent pool. However, with the volatile market conditions and the rising demand for IT professionals experienced in cloud technologies, finding talent is another major challenge.",
        "To answer your second question on how the energy and power sector, our end customers, can leverage the cloud: I think using smart metering systems for utilities like water, electricity and gas will allow them to collect a lot of transactional data. As a result, they can leverage the huge compute power of the cloud along with the advanced data analytics capabilities of AI and ML to ensure revenue optimisation and streamlining of resources.",
      ],
    },
    {
      question:
        "What is your observation of India's evolving cloud computing landscape?",
      answer: [
        "Cloud is a relatively new technology, and many IT leaders from the only on-premise computing era need to upgrade their understanding of cloud technologies. However, just deciding to migrate to the cloud without proper planning and understanding of the ways it should and could be leveraged is something I think is non-advisable.",
        "Though some businesses in India have been early adopters of the cloud, such as the banking sector, we still have many traditional businesses sceptical of the data security aspect when it comes to cloud adoption. I strongly believe that data is more secure in the cloud infrastructure, but this has to be evangelised through education to the traditional sectors like manufacturing.",
        "Then the transparency of owning costs should also be given due thought by the service providers so that new adoptions are made with informed decisions.",
      ],
    },
  ],
};
