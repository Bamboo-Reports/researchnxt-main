/**
 * The order the research programmes are shelved in, most recent first.
 *
 * Every library that groups by programme (reports and whitepapers, experts
 * view, insights, and the home page's latest reports band) sorts on this one
 * list, so the projects read in the same order everywhere. It is set by hand
 * rather than by publication date because the dates do not quite match the
 * order the team wants the shelf to read in.
 */
export const projectOrder = [
  "navigating-corporate-commute-for-gccs-in-india",
  "implementors-guide-to-ai",
  "unlocking-the-power-unified-cx",
  "automation-campaign-management",
  "transforming-cx-through-gccs",
  "cloud-computing-new-normal-beyond",
  "ai-led-personalization",
  "south-east-asia-response-guide",
  "content-marketing-done-right",
  "state-of-consumer-engagement-gcc-2019",
  "abm-best-practices-report-india-2018",
  "b2c-marketing-automation-india-2017",
  "publishers-guide-to-smarter-monetization",
  "corporate-gifting-trends-india-2019",
  "etutoring-best-practices-whitepaper-2016",
];

/**
 * A project's position on the shelf. A slug that is not a research programme
 * (the conference bucket, the prospect database) sorts after every one that is.
 */
export function projectRank(slug: string) {
  const index = projectOrder.indexOf(slug);
  return index === -1 ? projectOrder.length : index;
}

/** Comparator for anything that carries a `project` slug. */
export function byProject(a: { project: string }, b: { project: string }) {
  return projectRank(a.project) - projectRank(b.project);
}
