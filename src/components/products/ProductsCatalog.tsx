"use client";

import { useMemo, useState } from "react";
import type { Language } from "@/shared/language";
import { t } from "@/lib/i18n";
import {
  filterProducts,
  getCategoryCount,
  productCategories,
  productFormats,
} from "@/shared/products-content";
import { ProductCard } from "@/components/products/ProductCard";

interface ProductsCatalogProps {
  language: Language;
}

export function ProductsCatalog({ language }: ProductsCatalogProps) {
  const [categoryId, setCategoryId] =
    useState<(typeof productCategories)[number]["id"]>("all");
  const [formatId, setFormatId] =
    useState<(typeof productFormats)[number]["id"]>("all");

  const visibleProducts = useMemo(
    () => filterProducts(categoryId, formatId),
    [categoryId, formatId]
  );

  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {productCategories.map((category) => {
            const count = getCategoryCount(category.id, formatId);
            const isActive = categoryId === category.id;
            const label = t(language, category.labelEn, category.labelAr);

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setCategoryId(category.id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-foreground hover:bg-accent"
                }`}
              >
                <span>{label}</span>
                <span
                  className={`text-xs ${isActive ? "text-background/70" : "text-muted-foreground"}`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-end gap-2">
          {productFormats.map((format) => {
            const isActive = formatId === format.id;
            const label = t(language, format.labelEn, format.labelAr);

            return (
              <button
                key={format.id}
                type="button"
                onClick={() => setFormatId(format.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} language={language} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
            <p className="text-base font-medium text-foreground">
              {t(language, "No products found", "لا توجد منتجات")}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(
                language,
                "Try another category or format filter.",
                "جرّب فئة أو نوع عبوة آخر."
              )}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
