import { ProductsHub } from "@/components/products/ProductsHub";
import { productsCatalogMetadata } from "@/lib/seo/product-metadata";

export const metadata = productsCatalogMetadata;

export default function ProductsPage() {
  return <ProductsHub />;
}
