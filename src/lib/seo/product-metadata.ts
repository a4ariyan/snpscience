import type { Metadata } from "next";
import type { ProductRow } from "@/types/supabase";
import {
  parseLocalizedText,
  parseDosagePricing,
  minDosagePrice,
} from "@/features/products/mappers";
import { PRODUCT_PLACEHOLDER_IMAGE } from "@/shared/products-content";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://snpscience.com";

function productDescription(row: ProductRow, name: string): string {
  const description = parseLocalizedText(row.description);
  if (description.en) return description.en.slice(0, 160);

  return `${name} from SNP Science. Peptides for the UAE and GCC with COA and cold-chain delivery.`;
}

export function buildProductMetadata(row: ProductRow): Metadata {
  const title = parseLocalizedText(row.title);
  const name = title.en || "Product";
  const description = productDescription(row, name);
  const url = `${siteUrl}/products/${row.slug}`;
  const image =
    row.images?.[0] ?? `${siteUrl}${PRODUCT_PLACEHOLDER_IMAGE}`;

  return {
    title: name,
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

export function buildProductBreadcrumbJsonLd(
  row: ProductRow
): Record<string, unknown> {
  const name = parseLocalizedText(row.title).en || "Product";

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Products",
        item: `${siteUrl}/products`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: `${siteUrl}/products/${row.slug}`,
      },
    ],
  };
}

export function buildProductsCatalogJsonLd(
  products: { slug: string; nameEn: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "SNP Science Peptides",
    url: `${siteUrl}/products`,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.nameEn,
      url: `${siteUrl}/products/${product.slug}`,
    })),
  };
}

const catalogDescription =
  "UAE peptides from SNP Science and SNP Research. COA included, cold-chain delivery across the UAE and GCC.";

export const productsCatalogMetadata: Metadata = {
  title: "UAE Peptides",
  description: catalogDescription,
  keywords: [
    "UAE peptides",
    "snpscience peptides",
    "snpresearch",
    "SNP Science peptides",
    "peptides UAE",
    "peptides Dubai",
  ],
  alternates: { canonical: "/products" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "UAE Peptides | SNP Science",
    description: catalogDescription,
    url: `${siteUrl}/products`,
    siteName: "SNP Science",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UAE Peptides | SNP Science",
    description: catalogDescription,
  },
};
