/**
 * Insights: the article library.
 *
 * Each article belongs to a research project (the report it was written
 * around) and gets its own page at /resources/insights/[project]/[article].
 * Articles are transcribed from the live WordPress site under
 * researchnxt.com/guide-to-ai/, with em dashes normalised to the house
 * punctuation and the source's American spellings brought into line.
 *
 * One module per article, since a full article is long; this file is the
 * registry and the lookup helpers.
 */

import { howMarketingAutomationSuperchargesYourCampaigns } from "./automation-campaign-management/how-marketing-automation-supercharges-your-campaigns";
import { aiIsTheFutureAndTheFutureIsNow } from "./implementers-guide-to-ai/ai-is-the-future-and-the-future-is-now";
import { financeLeaders } from "./implementers-guide-to-ai/finance-leaders-transition-from-caution-to-customer-centric-scale";
import { manufacturingLeaders } from "./implementers-guide-to-ai/manufacturing-automotive-energy-leaders-move-from-pilots-to-scale";
import { retailLeaders } from "./implementers-guide-to-ai/retail-consumer-goods-leaders-shift-from-experiments-to-loyalty-led-scale";
import { theFourWavesOfAI } from "./implementers-guide-to-ai/the-four-waves-of-ai-a-ready-guide-for-business-leaders";
import { rethinkingTheDailyCommute } from "./navigating-corporate-commute-for-gccs-in-india/rethinking-the-daily-commute";
import { indianGccsDigitalCxOutlook2024 } from "./transforming-cx-through-gccs/indian-gccs-digital-cx-outlook-2024";
import { unifiedCustomerExperienceQatar } from "./unlocking-the-power-unified-cx/unified-customer-experience-the-next-frontier-for-businesses-in-qatar";
import type { InsightProject } from "./types";

export type { InsightArticle, InsightBlock, InsightProject } from "./types";

export const insightProjects: InsightProject[] = [
  {
    slug: "implementers-guide-to-ai",
    name: "Implementer's Guide to AI",
    lede: "Articles written around the Implementer's Guide to AI, including the sector editions and the whitepaper that preceded them.",
    reportSlug: "implementers-guide-to-ai",
  },
  {
    slug: "automation-campaign-management",
    name: "Automation & Campaign Management",
    lede: "Articles written around the Automation and Campaign Handbook for Functional Experts, produced in partnership with Zoho.",
  },
  {
    slug: "unlocking-the-power-unified-cx",
    name: "Unlocking the Power of Unified CX",
    lede: "Articles written around the Qatar unified customer experience handbook, sponsored by Zoho.",
  },
  {
    slug: "transforming-cx-through-gccs",
    name: "Transforming CX through GCCs",
    lede: "Articles written around the Leaders Speak eBook on the role of Indian global capability centres in digital customer experience.",
  },
  {
    slug: "navigating-corporate-commute-for-gccs-in-india",
    name: "Navigating Corporate Commute for GCCs in India",
    lede: "Articles written around the report on employee transport across India's global capability centres.",
  },
];

/**
 * Every published article, in editorial order: the newest project first, and
 * within the Implementer's Guide the three sector editions ahead of the two
 * lead-in pieces. The source articles carry no publication dates, so this
 * order is set here rather than derived.
 */
export const insightArticles = [
  rethinkingTheDailyCommute,
  financeLeaders,
  manufacturingLeaders,
  retailLeaders,
  theFourWavesOfAI,
  aiIsTheFutureAndTheFutureIsNow,
  unifiedCustomerExperienceQatar,
  howMarketingAutomationSuperchargesYourCampaigns,
  indianGccsDigitalCxOutlook2024,
];

export function getInsightProject(slug: string) {
  return insightProjects.find((project) => project.slug === slug);
}

export function getInsightArticle(project: string, article: string) {
  return insightArticles.find(
    (item) => item.project === project && item.slug === article,
  );
}

/** Articles belonging to a project, in library order. */
export function getProjectArticles(project: string) {
  return insightArticles.filter((item) => item.project === project);
}

/** Path to an article page. */
export function articleHref(article: { project: string; slug: string }) {
  return `/resources/insights/${article.project}/${article.slug}`;
}
