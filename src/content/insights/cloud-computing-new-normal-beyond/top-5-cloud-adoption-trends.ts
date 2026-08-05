import type { Insight } from "../types";

export const topFiveCloudAdoptionTrends: Insight = {
  slug: "top-5-cloud-adoption-trends",
  project: "cloud-computing-new-normal-beyond",

  metaTitle: "Top 5 Cloud Adoption Trends in 2021",
  metaDescription:
    "The new normal implications in India: hybrid cloud environments, public clouds for SMBs, ditching on-premise servers, multi-cloud strategies and AI-enabled cloud services.",

  title: "Top 5 Cloud Adoption Trends in 2021",
  published: "2021-06-25",
  excerpt:
    "Hybrid environments, multi-cloud strategies and AI-enabled services: the five adoption trends the 2021 survey found shaping the new normal in India.",

  thumbnail:
    "/insights/cloud-computing-new-normal-beyond/top-5-cloud-adoption-trends.jpg",
  thumbnailAlt: "Top 5 cloud adoption trends in 2021, the new normal in India",

  jotformId: "211600107593446",

  body: [
    "Over the past two months, our Cloud Computing India survey revealed many emerging technology adoption trends across sectors. We could spot that Indian businesses traditionally invest heavily in owned IT infrastructure for data security and bespoke requirements. However, of late, the trend is shifting towards leveraging a hybrid cloud environment as we advance in 2021 (32% of Research NXT 2021 Cloud Computing Survey respondents have plans for adopting a hybrid cloud setup in 2021). They are doing it primarily to scale their on-premises infrastructure to match the robustness of the modern-day application. Moreover, hybrid cloud allows on-premises IT, private cloud and public clouds to interact seamlessly within optimum costs.",
    "Here are five interesting cloud adoption trends emerging from our interaction with the market that will shape the new normal.",

    /* The source article carries these five as one tall infographic; they are
       rebuilt as named points so the copy is selectable and reflows. */
    {
      points: [
        {
          title: "Hybrid cloud environments",
          description:
            "The shift towards hybrid cloud environments has grown owing to usage flexibility and cost optimisation needs. 32% of Research NXT 2021 Cloud Computing Survey respondents have plans for adopting a hybrid cloud setup in 2021.",
        },
        {
          title: "Public clouds",
          description:
            "Indian SMBs with fewer than 500 employees opt for public clouds as it offers a cost advantage, is maintenance-free, and is scalable on demand.",
        },
        {
          title: "Ditching on-premise servers",
          description:
            "The need to reduce the load on on-premise servers and free up bandwidth for optimum application performance pushes businesses to migrate to the cloud.",
        },
        {
          title: "Multi-cloud strategies",
          description:
            "2021 will see businesses build multi-cloud strategies to mitigate the risks associated with a single cloud provider and reduce downtime or data loss.",
        },
        {
          title: "AI-enabled cloud",
          description:
            "24% of the surveyed organisations plan to use cloud services with embedded AI capabilities for better business decision making.",
        },
      ],
    },
    "Source: Research NXT's 2021 India Cloud Computing Survey.",
  ],
};
