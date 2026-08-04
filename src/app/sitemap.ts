import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { expertInterviews, interviewHref } from "@/content/experts-view";
import { reportLandings } from "@/content/resources";
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
    { path: "/resources/experts-view", priority: 0.7 },
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

  const lastModified = new Date();

  return [
    ...staticRoutes,
    ...solutionRoutes,
    ...reportRoutes,
    ...interviewRoutes,
  ].map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified,
    priority: route.priority,
  }));
}
