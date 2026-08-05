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

import { aiIsTheFutureAndTheFutureIsNow } from "./implementers-guide-to-ai/ai-is-the-future-and-the-future-is-now";
import { financeLeaders } from "./implementers-guide-to-ai/finance-leaders-transition-from-caution-to-customer-centric-scale";
import { manufacturingLeaders } from "./implementers-guide-to-ai/manufacturing-automotive-energy-leaders-move-from-pilots-to-scale";
import { retailLeaders } from "./implementers-guide-to-ai/retail-consumer-goods-leaders-shift-from-experiments-to-loyalty-led-scale";
import { theFourWavesOfAI } from "./implementers-guide-to-ai/the-four-waves-of-ai-a-ready-guide-for-business-leaders";
import { automateTargetWinIn2024 } from "./automation-campaign-management/automate-target-win-in-2024";
import { unifiedCustomerExperienceQatar } from "./unlocking-the-power-unified-cx/unified-customer-experience-the-next-frontier-for-businesses-in-qatar";
import { rethinkingTheDailyCommute } from "./navigating-corporate-commute-for-gccs-in-india/rethinking-the-daily-commute";
import { indianGccsDigitalCxOutlook2024 } from "./transforming-cx-through-gccs/indian-gccs-digital-cx-outlook-2024";
import { theNewNormalCloudComputing } from "./cloud-computing-new-normal-beyond/the-new-normal-cloud-computing";
import { topFiveCloudAdoptionTrends } from "./cloud-computing-new-normal-beyond/top-5-cloud-adoption-trends";
import { topFiveCloudComputingTrends } from "./cloud-computing-new-normal-beyond/top-5-cloud-computing-trends";
import { fiveMajorBusinessReboundStrategies } from "./south-east-asia-response-guide/5-major-business-rebound-strategies";
import { keyTakeawaysBusinessStrategies } from "./south-east-asia-response-guide/key-takeaways-business-strategies";
import type { InsightProject } from "./types";

export type { ArticleBlock, Insight, InsightProject } from "./types";

export const insightProjects: InsightProject[] = [
  {
    slug: "implementers-guide-to-ai",
    name: "Implementer's Guide to AI",
    reportSlug: "implementers-guide-to-ai",
  },
  {
    slug: "automation-campaign-management",
    name: "Automation & Campaign Management",
    reportSlug: "automation-campaign-management",
  },
  {
    slug: "unlocking-the-power-unified-cx",
    name: "Unlocking the Power of Unified CX",
    reportSlug: "unlocking-the-power-unified-cx",
  },
  {
    slug: "navigating-corporate-commute-for-gccs-in-india",
    name: "Navigating Corporate Commute for GCCs in India",
    reportSlug: "navigating-corporate-commute-for-gccs-in-india",
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
    slug: "south-east-asia-response-guide",
    name: "Southeast Asia Response Guide",
    reportSlug: "south-east-asia-response-guide",
  },
  {
    slug: "ai-led-personalization",
    name: "AI Led Personalization",
    reportSlug: "ai-led-personalization",
  },
];

/**
 * Every published article, newest first. Two articles share a publication
 * date, so the title breaks the tie and the order stays stable between builds.
 */
export const insights = [
  // Implementer's Guide to AI
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
].sort(
  (a, b) =>
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
