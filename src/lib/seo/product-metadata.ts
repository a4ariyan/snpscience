import type { Metadata } from "next";
import type { ProductRow } from "@/types/supabase";
import { parseLocalizedText, parseDosagePricing, minDosagePrice } from "@/features/products/mappers";
import { PRODUCT_PLACEHOLDER_IMAGE } from "@/shared/products-content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://snpscience.com";

function productDescription(row: ProductRow, name: string): string {
  const description = parseLocalizedText(row.description);
  if (description.en) return description.en;

  return `${name} — research-grade peptide from SNP Science (SNP Research), with cold-chain delivery across the UAE and GCC.`;
}

export function buildProductMetadata(row: ProductRow): Metadata {
  const title = parseLocalizedText(row.title);
  const name = title.en || "Product";
  const description = productDescription(row, name);
  const url = `${siteUrl}/products/${row.slug}`;
  const image =
    row.images?.[0] ?? `${siteUrl}${PRODUCT_PLACEHOLDER_IMAGE}`;

  return {
    title: `${name} | SNP Science Peptides UAE`,
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

  const pricing = parseDosagePricing(row);
  const prices = pricing.map((p) => p.price);
  const min = minDosagePrice(pricing);
  const max = Math.max(...prices);

  const availability = row.stock_status
    ? "https://schema.org/InStock"
    : "https://schema.org/OutOfStock";

  const offers =
    prices.length > 1
      ? {
          "@type": "AggregateOffer",
          lowPrice: min.toFixed(2),
          highPrice: max.toFixed(2),
          priceCurrency: row.currency,
          availability,
          url: `${siteUrl}/products/${row.slug}`,
        }
      : {
          "@type": "Offer",
          price: min.toFixed(2),
          priceCurrency: row.currency,
          availability,
          url: `${siteUrl}/products/${row.slug}`,
        };

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
    offers,
  };
}

const catalogDescription =
  "Buy UAE peptides from SNP Science (SNP Research). Research-grade snpscience peptides with COA, cold-chain delivery across the UAE and GCC.";

export const productsCatalogMetadata: Metadata = {
  title: "UAE Peptides | SNP Science & SNP Research",
  description: catalogDescription,
  keywords: [
    "UAE peptides",
    "snpscience peptides",
    "snpresearch",
    "SNP Science peptides",
    "peptides UAE",
    "research peptides Dubai",
  ],
  alternates: { canonical: "/products" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "UAE Peptides | SNP Science & SNP Research",
    description: catalogDescription,
    url: `${siteUrl}/products`,
    siteName: "SNP Science",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UAE Peptides | SNP Science & SNP Research",
    description: catalogDescription,
  },
};
