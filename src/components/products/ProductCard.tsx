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
      <div className="relative aspect-square w-full overflow-hidden bg-white">
        <Image
          src={product.image ?? PRODUCT_PLACEHOLDER_IMAGE}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-black shadow-sm border border-black/5">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span>{product.rating.toFixed(1)}</span>
          <span className="text-gray-500">({product.reviewCount})</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          <span className="shrink-0 rounded-md bg-muted px-2 py-1 text-[11px] font-medium tracking-wide text-muted-foreground">
            {size}
          </span>
        </div>
        <p className="mt-auto text-lg font-bold text-foreground">
          {formatPrice(product, language)}
        </p>
      </div>
    </article>
  );
}
