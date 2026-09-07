/**
 * Insights: the article library.
 *
 * Articles belong to the research programme they were written for and get a
 * URL of /resources/insights/[project]/[article], exactly like the interviews
 * at /resources/experts-view/[project]/[person]. See "Content URLs" in
 * README.md for the rule the whole /resources tree follows.
 *
 * Copy is transcribed from the live WordPress site under
 * researchnxt.com/guide-to-ai/, archived first in
 * `transcripts/guide-to-ai-articles/`, with em dashes normalised to the house
 * punctuation and the source's decorative italics dropped. Each article keeps
 * its own download form, which is how the live site works.
 *
 * One module per article, and this file is the registry and the lookups.
 */

import { aiIsTheFutureAndTheFutureIsNow } from "./implementors-guide-to-ai/ai-is-the-future-and-the-future-is-now";
import { financeLeaders } from "./implementors-guide-to-ai/finance-leaders-transition-from-caution-to-customer-centric-scale";
import { manufacturingLeaders } from "./implementors-guide-to-ai/manufacturing-automotive-energy-leaders-move-from-pilots-to-scale";
import { retailLeaders } from "./implementors-guide-to-ai/retail-consumer-goods-leaders-shift-from-experiments-to-loyalty-led-scale";
import { theFourWavesOfAI } from "./implementors-guide-to-ai/the-four-waves-of-ai-a-ready-guide-for-business-leaders";
import { automateTargetWinIn2024 } from "./automation-campaign-management/automate-target-win-in-2024";
import { unifiedCustomerExperienceQatar } from "./unlocking-the-power-unified-cx/unified-customer-experience-the-next-frontier-for-businesses-in-qatar";
import { rethinkingTheDailyCommute } from "./navigating-corporate-commute-for-gccs-in-india/rethinking-the-daily-commute";
import { indianGccsDigitalCxOutlook2024 } from "./transforming-cx-through-gccs/indian-gccs-digital-cx-outlook-2024";
import { theNewNormalCloudComputing } from "./cloud-computing-new-normal-beyond/the-new-normal-cloud-computing";
import { topFiveCloudAdoptionTrends } from "./cloud-computing-new-normal-beyond/top-5-cloud-adoption-trends";
import { topFiveCloudComputingTrends } from "./cloud-computing-new-normal-beyond/top-5-cloud-computing-trends";
import { fiveMajorBusinessReboundStrategies } from "./south-east-asia-response-guide/5-major-business-rebound-strategies";
import { keyTakeawaysBusinessStrategies } from "./south-east-asia-response-guide/key-takeaways-business-strategies";
import { sevenMustHaveFeaturesForAContentMarketingSystem } from "./content-marketing-done-right/7-must-have-features-for-a-content-marketing-system";
import { bestPracticesForYour2019ContentMarketingStrategy } from "./content-marketing-done-right/best-practices-for-your-2019-content-marketing-strategy";
import { combineYourSocialMediaAndContentMarketing } from "./content-marketing-done-right/combine-your-social-media-and-content-marketing";
import { contentMarketingAndCrmBoostEmailCampaigns } from "./content-marketing-done-right/content-marketing-and-crm-boost-email-campaigns";
import { evolutionOfContentMarketingInIndia } from "./content-marketing-done-right/evolution-of-content-marketing-in-india";
import { howContentMarketingImpactsYourSeoStrategy } from "./content-marketing-done-right/how-content-marketing-impacts-your-seo-strategy";
import { howToImplementAKillerOmniChannelMarketingStrategy } from "./content-marketing-done-right/how-to-implement-a-killer-omni-channel-marketing-strategy";
import { howToImplementAnEffectiveAbmStrategy } from "./abm-best-practices-report-india-2018/how-to-implement-an-effective-abm-strategy";
import { stepsToDefineYourKeyAccounts } from "./abm-best-practices-report-india-2018/steps-to-define-your-key-accounts";
import { artificialIntelligenceIn2020 } from "./ai-led-personalization/artificial-intelligence-what-can-business-professionals-expect-in-2020";
import type { InsightProject } from "./types";

import { byProject } from "../project-order";

export type { ArticleBlock, Insight, InsightProject } from "./types";

export const insightProjects: InsightProject[] = [
  {
    slug: "navigating-corporate-commute-for-gccs-in-india",
    name: "Navigating Corporate Commute for GCCs in India",
    reportSlug: "navigating-corporate-commute-for-gccs-in-india",
  },
  {
    slug: "implementors-guide-to-ai",
    name: "Implementor's Guide to AI",
    reportSlug: "implementors-guide-to-ai",
  },
  {
    slug: "unlocking-the-power-unified-cx",
    name: "Unlocking the Power of Unified CX",
    reportSlug: "unlocking-the-power-unified-cx",
  },
  {
    slug: "automation-campaign-management",
    name: "Automation & Campaign Management",
    reportSlug: "automation-campaign-management",
  },
  {
    slug: "transforming-cx-through-gccs",
    name: "Transforming CX through GCCs",
    reportSlug: "transforming-cx-through-gccs",
  },
  {
    slug: "cloud-computing-new-normal-beyond",
    name: "Cloud Computing in the New Normal & Beyond",
    reportSlug: "cloud-computing-new-normal-beyond",
  },
  {
    slug: "ai-led-personalization",
    name: "AI Led Personalization",
    reportSlug: "ai-led-personalization",
  },
  {
    slug: "south-east-asia-response-guide",
    name: "Southeast Asia Response Guide",
    reportSlug: "south-east-asia-response-guide",
  },
  {
    slug: "content-marketing-done-right",
    name: "Content Marketing Done Right",
    reportSlug: "content-marketing-done-right",
  },
  /* No articles were written for this programme, but the events and success
     stories routes resolve a programme's display name here, so it is
     registered all the same. */
  {
    slug: "state-of-consumer-engagement-gcc-2019",
    name: "State of Consumer Engagement, GCC 2019",
    reportSlug: "state-of-consumer-engagement-gcc-2019",
  },
  {
    slug: "abm-best-practices-report-india-2018",
    name: "ABM Best Practices Report: India, 2018",
    reportSlug: "abm-best-practices-report-india-2018",
  },
  /* No articles were written for this programme either; it is registered so
     the events and success stories routes can name it. */
  {
    slug: "b2c-marketing-automation-india-2017",
    name: "B2C Marketing Automation Report: India, 2017",
    reportSlug: "b2c-marketing-automation-india-2017",
  },
  /* Not a research programme: the bucket the conference participations sit in,
     so those events get a URL segment and a programme name. It carries no
     `reportSlug`, so no report band renders on its event pages. */
  {
    slug: "industry-events",
    name: "Industry events",
  },
  /* Also not a research programme: the solution a success story is filed
     under when the engagement is an ongoing data service rather than a piece
     of research. */
  {
    slug: "prospect-database",
    name: "Prospect Database",
  },
];

/**
 * Every published article, shelved by project (see `projectOrder`) and newest
 * first within a project. Two articles share a publication date, so the title
 * breaks the tie and the order stays stable between builds.
 */
export const insights = [
  // Implementor's Guide to AI
  aiIsTheFutureAndTheFutureIsNow,
  financeLeaders,
  manufacturingLeaders,
  retailLeaders,
  theFourWavesOfAI,

  // Automation & Campaign Management
  automateTargetWinIn2024,

  // Unlocking the Power of Unified CX
  unifiedCustomerExperienceQatar,

  // Navigating Corporate Commute for GCCs in India
  rethinkingTheDailyCommute,

  // Transforming CX through GCCs
  indianGccsDigitalCxOutlook2024,

  // Cloud Computing in the New Normal & Beyond
  topFiveCloudComputingTrends,
  topFiveCloudAdoptionTrends,
  theNewNormalCloudComputing,

  // Southeast Asia Response Guide
  fiveMajorBusinessReboundStrategies,
  keyTakeawaysBusinessStrategies,

  // Content Marketing Done Right
  evolutionOfContentMarketingInIndia,
  combineYourSocialMediaAndContentMarketing,
  howContentMarketingImpactsYourSeoStrategy,
  bestPracticesForYour2019ContentMarketingStrategy,
  contentMarketingAndCrmBoostEmailCampaigns,
  sevenMustHaveFeaturesForAContentMarketingSystem,
  howToImplementAKillerOmniChannelMarketingStrategy,

  // ABM Best Practices Report: India, 2018
  stepsToDefineYourKeyAccounts,
  howToImplementAnEffectiveAbmStrategy,

  // AI Led Personalization
  artificialIntelligenceIn2020,
].sort(
  (a, b) =>
    byProject(a, b) ||
    b.published.localeCompare(a.published) ||
    a.title.localeCompare(b.title, "en"),
);

export function getInsightProject(slug: string) {
  return insightProjects.find((project) => project.slug === slug);
}

/**
 * An article slug is only ever resolved inside its project, so two programmes
 * may reuse one without colliding.
 */
export function getInsight(project: string, slug: string) {
  return insights.find(
    (insight) => insight.project === project && insight.slug === slug,
  );
}

/** Articles belonging to a project, newest first. */
export function getProjectInsights(project: string) {
  return insights.filter((insight) => insight.project === project);
}

/** Path to an article page. */
export function insightHref(insight: { project: string; slug: string }) {
  return `/resources/insights/${insight.project}/${insight.slug}`;
}

/** Copy for the /resources/insights listing page. */
export const insightsLibrary = {
  title: "Insights",
  lede: "Articles, guides and toolkits from the Research NXT team, written alongside the research programmes they draw on.",
  cardCta: "Read the article",
  empty: "No articles are published yet. New writing lands here alongside the research programmes.",
} as const;
