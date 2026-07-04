import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import type { Language } from "@/shared/language";
import { t } from "@/lib/i18n";
import type { CatalogProduct } from "@/features/products/types";
import { PRODUCT_PLACEHOLDER_IMAGE } from "@/shared/products-content";

interface ProductCardProps {
  product: CatalogProduct;
  language: Language;
}

function formatPrice(product: CatalogProduct, language: Language) {
  const amount = product.priceAed.toFixed(2);
  const prefix = product.priceFrom
    ? `${t(language, "FROM", "من")} `
    : "";

  return `${prefix}${amount} AED`;
}

export function ProductCard({ product, language }: ProductCardProps) {
  const name = t(language, product.nameEn, product.nameAr);
  const size = t(language, product.sizeEn, product.sizeAr);
  const category = t(language, product.categoryLabelEn, product.categoryLabelAr);
  const showRating = product.rating != null && product.reviewCount > 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-primary/20"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white border-b border-border">
        <Image
          src={product.image ?? PRODUCT_PLACEHOLDER_IMAGE}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {!product.stockStatus && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
              {t(language, "Out of stock", "غير متوفر")}
            </span>
          </div>
        )}
        {showRating && (
          <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-black shadow-sm border border-black/5">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            <span>{product.rating!.toFixed(1)}</span>
            <span className="text-gray-500 font-medium">
              ({product.reviewCount})
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {category}
        </p>
        <div className="mt-2 flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          {size && (
            <span className="shrink-0 rounded-md bg-muted px-2.5 py-1 text-xs font-semibold tracking-wide text-muted-foreground">
              {size}
            </span>
          )}
        </div>
        <p className="mt-4 text-xl font-bold text-foreground">
          {formatPrice(product, language)}
        </p>
      </div>
    </Link>
  );
}
