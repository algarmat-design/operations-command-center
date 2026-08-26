import type { MetadataRoute } from "next";
import { dashboards, identity } from "@/content/profile";

/**
 * Frozen timestamp on purpose. Calling new Date() here makes the build
 * non-deterministic and would become a request-time API the day cacheComponents
 * is turned on. Bump this by hand when the content actually changes.
 */
const LAST_MODIFIED = new Date("2026-08-26T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1 },
    { path: "/capabilities", priority: 0.9 },
    { path: "/resume", priority: 0.9 },
    { path: "/dashboards", priority: 0.8 },
    ...dashboards.map((d) => ({ path: `/dashboards/${d.slug}`, priority: 0.7 })),
  ];

  return routes.map((r) => ({
    url: new URL(r.path, identity.site).toString(),
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));
}
