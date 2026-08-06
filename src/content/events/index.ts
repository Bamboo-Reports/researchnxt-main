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
import { businessStrategyReportLaunch } from "./south-east-asia-response-guide/business-strategy-report-launch";

export type { Event } from "./types";

/** Every published event, newest first. */
export const events = [
  // Southeast Asia Response Guide
  businessStrategyReportLaunch,

  // AI Led Personalization
  aiLedEbookLaunch,
].sort(
  (a, b) =>
    b.date.localeCompare(a.date) || a.title.localeCompare(b.title, "en"),
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
