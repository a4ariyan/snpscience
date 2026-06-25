import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://snpscience.com";

const staticRoutes = [
  "",
  "/about-us",
  "/contact",
  "/library",
  "/library/population-genomics",
  "/library/human-health",
  "/library/history",
  "/lab",
  "/lab/studies",
  "/lab/github",
  "/lab/projects",
  "/articles",
  "/videos",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/library") || path.startsWith("/lab") ? 0.8 : 0.6,
  }));
}
