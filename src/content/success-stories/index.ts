/**
 * Success stories: the client engagement library.
 *
 * Same shape as the events library, and the same URL rule: a story belongs to
 * the research programme the engagement produced and lives at
 * /resources/success-stories/[project]/[story]. See "Content URLs" in
 * README.md.
 *
 * Copy is transcribed from the live WordPress pages under
 * researchnxt.com/case-study/. Every one of those pages is published here now, one module apiece
 * alongside this registry.
 */

import { insideview } from "./abm-best-practices-report-india-2018/insideview";
import { netcore } from "./b2c-marketing-automation-india-2017/netcore";
import { netcore as netcoreAiLed } from "./ai-led-personalization/netcore";
import { zycus } from "./prospect-database/zycus";
import { webengage } from "./state-of-consumer-engagement-gcc-2019/webengage";

export type { SuccessStory } from "./types";

/** Every published story, newest first. */
export const successStories = [
  // State of Consumer Engagement, GCC 2019
  webengage,

  // ABM Best Practices Report: India, 2018
  insideview,

  // B2C Marketing Automation Report: India, 2017
  netcore,

  // AI Led Personalization. Netcore appears twice across the library, once per
  // engagement, so the module is aliased the way the interview registry
  // aliases people who appear in more than one programme.
  netcoreAiLed,

  // Prospect Database
  zycus,
].sort(
  (a, b) =>
    b.published.localeCompare(a.published) ||
    a.client.localeCompare(b.client, "en"),
);

/**
 * A story slug is only ever resolved inside its project, so two programmes may
 * reuse one without colliding.
 */
export function getSuccessStory(project: string, slug: string) {
  return successStories.find(
    (story) => story.project === project && story.slug === slug,
  );
}

/** Path to a success story page. */
export function successStoryHref(story: { project: string; slug: string }) {
  return `/resources/success-stories/${story.project}/${story.slug}`;
}

/** Copy for the /resources/success-stories listing page. */
export const successStoriesLibrary = {
  title: "Success stories",
  lede: "What business and marketing leaders commissioned from Research NXT, and what the research delivered.",
  cardCta: "Read the story",
  empty: "No stories are published yet. Client engagements land here once their results can be shared.",
} as const;
