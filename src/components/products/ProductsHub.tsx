import { PublicPage } from "@/components/layouts/PublicPage";
import { ProductsCatalog } from "@/components/products/ProductsCatalog";
import { ProductsHero } from "@/components/products/ProductsHero";
import { rowToCatalogProduct } from "@/features/products/mappers";
import { getActiveProducts } from "@/features/products/queries";
import { getServerLanguage } from "@/lib/language.server";

export async function ProductsHub() {
  const language = await getServerLanguage();
  const rows = await getActiveProducts();
  const products = rows.map(rowToCatalogProduct);

  return (
    <PublicPage>
      <ProductsHero language={language} />
      <ProductsCatalog language={language} products={products} />
    </PublicPage>
  );
}
