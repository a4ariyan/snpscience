import Image from "next/image";
import { Star } from "lucide-react";
import type { Language } from "@/shared/language";
import { t } from "@/lib/i18n";
import {
  PRODUCT_PLACEHOLDER_IMAGE,
  type Product,
} from "@/shared/products-content";

interface ProductCardProps {
  product: Product;
  language: Language;
}

function formatPrice(product: Product, language: Language) {
  const amount = product.priceAed.toFixed(2);
  const prefix = product.priceFrom
    ? `${t(language, "FROM", "من")} `
    : "";

  return `${prefix}${amount} AED`;
}

export function ProductCard({ product, language }: ProductCardProps) {
  const name = t(language, product.nameEn, product.nameAr);
  const size = t(language, product.sizeEn, product.sizeAr);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg hover:border-primary/20">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white border-b border-border">
        <Image
          src={product.image ?? PRODUCT_PLACEHOLDER_IMAGE}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-black shadow-sm border border-black/5">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          <span>{product.rating.toFixed(1)}</span>
          <span className="text-gray-500 font-medium">({product.reviewCount})</span>
        </div>
      </div>

      <div className="flex flex-col p-6">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          <span className="shrink-0 rounded-md bg-muted px-2.5 py-1 text-xs font-semibold tracking-wide text-muted-foreground">
            {size}
          </span>
        </div>
        <p className="mt-4 text-xl font-bold text-foreground">
          {formatPrice(product, language)}
        </p>
      </div>
    </article>
  );
}
