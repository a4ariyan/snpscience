import { PublicPage } from "@/components/layouts/PublicPage";
import { ProductsCatalog } from "@/components/products/ProductsCatalog";
import { ProductsHero } from "@/components/products/ProductsHero";
import { getServerLanguage } from "@/lib/language.server";

export async function ProductsHub() {
  const language = await getServerLanguage();

  return (
    <PublicPage>
      <ProductsHero language={language} />
      <ProductsCatalog language={language} />
    </PublicPage>
  );
}
