import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { solutions } from "@/content/solutions";

/** Phase A routes only. Phase B adds the /resources tree. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/solutions", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    { path: "/careers", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
    { path: "/privacy-policy", priority: 0.3 },
  ];

  const solutionRoutes = solutions.map((solution) => ({
    path: `/solutions/${solution.slug}`,
    priority: 0.9,
  }));

  const lastModified = new Date();

  return [...staticRoutes, ...solutionRoutes].map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified,
    priority: route.priority,
  }));
}
