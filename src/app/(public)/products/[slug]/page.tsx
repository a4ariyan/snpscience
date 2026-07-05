import { notFound } from "next/navigation";
import { PublicPage } from "@/components/layouts/PublicPage";
import { ProductDetailView } from "@/components/products/ProductDetailView";
import { rowToProductDetail } from "@/features/products/mappers";
import { getActiveProductBySlug } from "@/features/products/queries";
import {
  buildProductBreadcrumbJsonLd,
  buildProductJsonLd,
  buildProductMetadata,
} from "@/lib/seo/product-metadata";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const row = await getActiveProductBySlug(slug);
  if (!row) return { title: "Product not found" };
  return buildProductMetadata(row);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const row = await getActiveProductBySlug(slug);

  if (!row) notFound();

  const product = rowToProductDetail(row);
  const jsonLd = [buildProductJsonLd(row), buildProductBreadcrumbJsonLd(row)];

  return (
    <PublicPage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailView product={product} />
    </PublicPage>
  );
}
