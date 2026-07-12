import type { MetadataRoute } from "next";
import { getActiveProducts } from "@/features/products/queries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://snpscience.com";

const staticRoutes = [
  "",
  "/our-people",
  "/contact",
  "/library",
  "/library/population-genomics",
  "/library/human-health",
  "/library/history",
  "/lab",
  "/lab/studies",
  "/lab/github",
  "/lab/projects",
  "/products",
  "/articles",
  "/videos",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const products = await getActiveProducts();

  const productEntries = products.map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    lastModified: new Date(product.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const staticEntries = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority:
      path === ""
        ? 1
        : path === "/products"
          ? 0.9
          : path.startsWith("/library") || path.startsWith("/lab")
            ? 0.8
            : 0.6,
  }));

  return [...staticEntries, ...productEntries];
}
