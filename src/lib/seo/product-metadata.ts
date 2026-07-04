import type { Metadata } from "next";
import type { ProductRow } from "@/types/supabase";
import { parseLocalizedText } from "@/features/products/mappers";
import { PRODUCT_PLACEHOLDER_IMAGE } from "@/shared/products-content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://snpscience.com";

function productDescription(row: ProductRow, name: string): string {
  const description = parseLocalizedText(row.description);
  if (description.en) return description.en;

  return `${name} — research-grade peptide with ≥99% purity, COA provided, and cold-chain delivery across the UAE and GCC.`;
}

export function buildProductMetadata(row: ProductRow): Metadata {
  const title = parseLocalizedText(row.title);
  const name = title.en || "Product";
  const description = productDescription(row, name);
  const url = `${siteUrl}/products/${row.slug}`;
  const image =
    row.images?.[0] ?? `${siteUrl}${PRODUCT_PLACEHOLDER_IMAGE}`;

  return {
    title: `${name} | SNP Science`,
    description,
    alternates: { canonical: `/products/${row.slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: name,
      description,
      url,
      siteName: "SNP Science",
      type: "website",
      images: [{ url: image, alt: name }],
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description,
      images: [image],
    },
  };
}

export function buildProductJsonLd(row: ProductRow): Record<string, unknown> {
  const title = parseLocalizedText(row.title);
  const name = title.en || "Product";
  const description = productDescription(row, name);
  const images =
    row.images && row.images.length > 0
      ? row.images
      : [`${siteUrl}${PRODUCT_PLACEHOLDER_IMAGE}`];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: images,
    sku: row.slug,
    url: `${siteUrl}/products/${row.slug}`,
    brand: {
      "@type": "Brand",
      name: "SNP Science",
    },
    offers: {
      "@type": "Offer",
      price: Number(row.price).toFixed(2),
      priceCurrency: row.currency,
      availability: row.stock_status
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${siteUrl}/products/${row.slug}`,
    },
  };
}

export const productsCatalogMetadata: Metadata = {
  title: "Our Products | SNP Science",
  description:
    "Research-grade peptides with ≥99% purity, COA provided, and cold-chain delivery across the UAE and GCC.",
  alternates: { canonical: "/products" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Our Products | SNP Science",
    description:
      "Research-grade peptides with ≥99% purity, COA provided, and cold-chain delivery across the UAE and GCC.",
    url: `${siteUrl}/products`,
    siteName: "SNP Science",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Products | SNP Science",
    description:
      "Research-grade peptides with ≥99% purity, COA provided, and cold-chain delivery across the UAE and GCC.",
  },
};
