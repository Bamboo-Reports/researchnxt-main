/**
 * Events: launches, roundtables and engagements.
 *
 * Same shape as the insights library, and the same URL rule: an event belongs
 * to the research programme it was run for and lives at
 * /resources/events/[project]/[event]. See "Content URLs" in README.md.
 *
 * One module per event; this file is the registry and the lookups.
 */

import { aiLedEbookLaunch } from "./ai-led-personalization/ai-led-ebook-launch";
import { marketingAutomationRoundtable } from "./automation-campaign-management/marketing-automation-roundtable";
import { h1bShockStrategicReset } from "./bamboo-reports/h1b-shock-strategic-reset";
import { businessStrategyReportLaunch } from "./south-east-asia-response-guide/business-strategy-report-launch";
import { contentMarketingReportLaunch } from "./content-marketing-done-right/content-marketing-report-launch";
import { reportLaunchWebinar } from "./b2c-marketing-automation-india-2017/report-launch-webinar";
import { hyseaBizsummit2020 } from "./industry-events/hysea-bizsummit-2020";
import { nasscomMartechConfluence2017 } from "./industry-events/nasscom-martech-confluence-2017";
import { nasscomTechnologyLeadershipForum2019 } from "./industry-events/nasscom-technology-leadership-forum-2019";

export type { Event } from "./types";

/**
 * Every published event, newest first: the H-1B roundtable, then the
 * marketing automation roundtable, then the launches and conferences. On
 * user direction this library keeps a chronology rather than the project
 * order the other libraries shelve by.
 */
export const events = [
  // Bamboo Reports GCC research
  h1bShockStrategicReset,

  // Automation & Campaign Management
  marketingAutomationRoundtable,

  // Southeast Asia Response Guide
  businessStrategyReportLaunch,

  // AI Led Personalization
  aiLedEbookLaunch,

  // Content Marketing Done Right
  contentMarketingReportLaunch,

  // B2C Marketing Automation Report: India, 2017
  reportLaunchWebinar,

  // Conference participations, which belong to no research programme
  hyseaBizsummit2020,
  nasscomTechnologyLeadershipForum2019,
  nasscomMartechConfluence2017,
].sort(
  // An event with no date sits where its write-up was published. The only
  // one is the marketing automation roundtable.
  (a, b) =>
    (b.date ?? b.published ?? "").localeCompare(a.date ?? a.published ?? "") ||
    a.title.localeCompare(b.title, "en"),
);

/**
 * An event slug is only ever resolved inside its project, so two programmes
 * may reuse one without colliding.
 */
export function getEvent(project: string, slug: string) {
  return events.find(
    (event) => event.project === project && event.slug === slug,
  );
}

/** Path to an event page. */
export function eventHref(event: { project: string; slug: string }) {
  return `/resources/events/${event.project}/${event.slug}`;
}

/** Copy for the /resources/events listing page. */
export const eventsLibrary = {
  title: "Events",
  lede: "Launches, roundtables and engagements from Research NXT, run alongside the research programmes they belong to.",
  cardCta: "See the event",
  empty:
    "No events are published yet. Launches and roundtables land here as they happen.",
} as const;
