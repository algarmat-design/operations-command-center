import type { MetadataRoute } from "next";
import { identity } from "@/content/profile";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The print layout is the PDF source, not a page anyone should land on.
      disallow: "/resume/print",
    },
    sitemap: new URL("/sitemap.xml", identity.site).toString(),
  };
}
