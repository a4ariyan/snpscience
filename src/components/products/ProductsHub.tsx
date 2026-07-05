import { PublicPage } from "@/components/layouts/PublicPage";
import { ProductsCatalog } from "@/components/products/ProductsCatalog";
import { ProductsHero } from "@/components/products/ProductsHero";
import { rowToCatalogProduct } from "@/features/products/mappers";
import { getActiveProducts } from "@/features/products/queries";
import { getServerLanguage } from "@/lib/language.server";
import { buildProductsCatalogJsonLd } from "@/lib/seo/product-metadata";

export async function ProductsHub() {
  const language = await getServerLanguage();
  const rows = await getActiveProducts();
  const products = rows.map(rowToCatalogProduct);
  const jsonLd = buildProductsCatalogJsonLd(
    products.map((p) => ({ slug: p.slug, nameEn: p.nameEn }))
  );

  return (
    <PublicPage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductsHero language={language} />
      <ProductsCatalog language={language} products={products} />
    </PublicPage>
  );
}
