import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { expertInterviews, interviewHref } from "@/content/experts-view";
import { eventHref, events } from "@/content/events";
import { insightHref, insights } from "@/content/insights";
import { reportLandings } from "@/content/resources";
import {
  successStories,
  successStoryHref,
} from "@/content/success-stories";
import { solutions } from "@/content/solutions";

/**
 * Phase A routes, plus the parts of the /resources tree that carry real
 * content. The remaining Resources destinations are still placeholders and
 * stay noindexed until they are written.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.7 },
    { path: "/careers", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
    { path: "/privacy-policy", priority: 0.3 },
    { path: "/resources/reports-whitepapers", priority: 0.7 },
    { path: "/resources/experts-view", priority: 0.7 },
    { path: "/resources/insights", priority: 0.7 },
    { path: "/resources/events", priority: 0.6 },
    { path: "/resources/success-stories", priority: 0.6 },
  ];

  const solutionRoutes = solutions.map((solution) => ({
    path: `/solutions/${solution.slug}`,
    priority: 0.9,
  }));

  const reportRoutes = reportLandings.map((report) => ({
    path: `/resources/reports-whitepapers/${report.slug}`,
    priority: 0.9,
  }));

  const interviewRoutes = expertInterviews.map((interview) => ({
    path: interviewHref(interview),
    priority: 0.6,
  }));

  // Only page 1 of the insights library is listed; the ?page=N URLs are
  // crawlable from the pager.
  const insightRoutes = insights.map((insight) => ({
    path: insightHref(insight),
    priority: 0.6,
    lastModified: insight.published,
  }));

  const eventRoutes = events.map((event) => ({
    path: eventHref(event),
    priority: 0.5,
    lastModified: event.date,
  }));

  const successStoryRoutes = successStories.map((story) => ({
    path: successStoryHref(story),
    priority: 0.5,
    lastModified: story.published,
  }));

  return [
    ...staticRoutes,
    ...solutionRoutes,
    ...reportRoutes,
    ...interviewRoutes,
    ...insightRoutes,
    ...eventRoutes,
    ...successStoryRoutes,
  ].map((route: { path: string; priority: number; lastModified?: string }) => ({
    url: `${site.url}${route.path}`,
    // Real publication dates where the content records carry them; routes
    // without one omit the field rather than faking it with the build time.
    ...(route.lastModified ? { lastModified: route.lastModified } : {}),
    priority: route.priority,
  }));
}
