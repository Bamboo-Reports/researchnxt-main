import type { Insight } from "../types";

export const topFiveCloudComputingTrends: Insight = {
  slug: "top-5-cloud-computing-trends",
  project: "cloud-computing-new-normal-beyond",

  metaTitle: "Top 5 Cloud Computing Trends that India Needs to Know",
  metaDescription:
    "Five takeaways from the 2021 India Cloud Computing Survey: adoption at 80%, cost optimisation as the leading challenge, Windows and SQL Server workloads, and AWS commanding 41% of the market.",

  title: "Top 5 Cloud Computing Trends that India Needs to Know",
  published: "2021-06-24",
  excerpt:
    "Five takeaways from the 2021 India Cloud Computing Survey, from adoption rates to the market share the big three command.",

  thumbnail:
    "/insights/cloud-computing-new-normal-beyond/top-5-cloud-computing-trends.jpg",
  thumbnailAlt: "Top 5 cloud computing trends that India needs to know",

  jotformId: "211600107593446",

  body: [
    "Cloud computing is a busy space in India and globally due to the pandemic-instigated adoption growth across businesses. Gartner says that end-user spending on cloud services will see double-digit growth in India in 2021. This cost-effective technology fosters growth for businesses to compete in a digitally agile market. Hence, to help cloud transformation custodians across Indian organisations make the right decision while evaluating and implementing their cloud migration strategies, we racked up a report on the Cloud Computing Trends in India in 2021.",
    "Let's take a look at the top five cloud computing trends that India is currently sailing upon, based on the insights gathered from a recent survey across industries in India:",

    /* The source article carries these five as one tall infographic; they are
       rebuilt as figures so the numbers are readable, selectable and reflow. */
    {
      figures: [
        {
          value: "80%",
          label:
            "Organisations in India are currently using some form of cloud technologies",
        },
        {
          value: "29%",
          label:
            "Businesses identified cost optimisation as the primary cloud adoption and usage challenge",
        },
        {
          value: "33%",
          label: "Businesses in India use Windows-based applications",
        },
        {
          value: "28%",
          label: "Organisations use Microsoft SQL Server Database",
        },
      ],
    },

    { heading: "Market share of cloud providers in India" },
    "Market share is commanded by AWS in India, followed by Azure and Google Cloud.",
    {
      figures: [
        { value: "41%", label: "AWS (Amazon Web Services)" },
        { value: "25%", label: "Azure" },
        { value: "11%", label: "Google Cloud" },
        { value: "23%", label: "Others" },
      ],
      source: "Source: Research NXT's 2021 India Cloud Computing Survey.",
    },

    "This report, produced by Research NXT in association with MothersonSumi INfotech & Designs Ltd. (MIND), helps cloud transformation custodians across Indian organisations make the right decision while evaluating and implementing their cloud migration strategies.",
  ],
};
