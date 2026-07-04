"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Shield, FileText, Truck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { t } from "@/lib/i18n";
import type { ProductDetail } from "@/features/products/types";
import { trustBadges } from "@/shared/products-content";
import { ProductGallery } from "./ProductGallery";
import { cn } from "@/lib/utils";

const detailTrustBadges = trustBadges.filter((b) => b.id !== "checkout");
const trustIcons = {
  purity: Shield,
  coa: FileText,
  "cold-chain": Truck,
} as const;

interface ProductDetailViewProps {
  product: ProductDetail;
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <h2 className="border-b border-border pb-3 mb-4 text-lg font-semibold text-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const { language } = useLanguage();
  const { addItem } = useCart();

  const defaultDosage =
    product.dosageOptions[0] ??
    (language === "ar" ? product.subtitle.ar : product.subtitle.en) ??
    "";

  const [dosage, setDosage] = useState(defaultDosage);
  const [added, setAdded] = useState(false);

  const title = t(language, product.title.en, product.title.ar);
  const description = t(language, product.description.en, product.description.ar);
  const category = t(language, product.categoryLabelEn, product.categoryLabelAr);
  const format = t(language, product.formatLabelEn, product.formatLabelAr);

  const priceLabel = `${product.price.toFixed(2)} ${product.currency}`;

  const handleAddToCart = () => {
    if (!product.stockStatus) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      nameEn: product.title.en,
      nameAr: product.title.ar,
      dosage,
      price: product.price,
      image: product.images[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:py-14">
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href="/products" className="hover:text-foreground transition-colors">
          {t(language, "Products", "المنتجات")}
        </Link>
        <span aria-hidden>/</span>
        <span className="hover:text-foreground transition-colors">{category}</span>
        <span aria-hidden>/</span>
        <span className="text-foreground truncate max-w-[200px] sm:max-w-none">
          {title}
        </span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} alt={title} />

        <div className="flex flex-col lg:sticky lg:top-28 lg:self-start">
          <p className="mb-4 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            <span className="h-px w-8 bg-primary" />
            {category} · {format}
          </p>

          <h1 className="text-3xl font-light tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {title}
          </h1>

          {(product.subtitle.en || product.subtitle.ar) && (
            <p className="mt-3 text-lg text-muted-foreground">
              {t(language, product.subtitle.en, product.subtitle.ar)}
            </p>
          )}

          <p className="mt-6 text-3xl font-bold text-foreground">{priceLabel}</p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {detailTrustBadges.map((badge) => {
              const Icon = trustIcons[badge.id as keyof typeof trustIcons];
              return (
                <div
                  key={badge.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 px-3 py-2.5"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-xs font-medium text-foreground leading-tight">
                    {t(language, badge.labelEn, badge.labelAr)}
                  </p>
                </div>
              );
            })}
          </div>

          {product.dosageOptions.length > 1 && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-foreground">
                {t(language, "Dosage", "الجرعة")}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.dosageOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setDosage(option)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      dosage === option
                        ? "bg-foreground text-background"
                        : "border border-border bg-card text-foreground hover:bg-muted"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4">
            <span
              className={cn(
                "inline-flex rounded-full px-3 py-1 text-xs font-medium",
                product.stockStatus
                  ? "bg-green-500/10 text-green-700 dark:text-green-400"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {product.stockStatus
                ? t(language, "In stock", "متوفر")
                : t(language, "Out of stock", "غير متوفر")}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.stockStatus}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingBag className="h-4 w-4" />
            {added
              ? t(language, "Added to cart", "تمت الإضافة إلى العربة")
              : t(language, "Add to cart", "أضف إلى العربة")}
          </button>
        </div>
      </div>

      <div className="mt-16 space-y-8">
        {description && (
          <SectionCard title={t(language, "Description", "الوصف")}>
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground whitespace-pre-line">
              {description}
            </p>
          </SectionCard>
        )}

        {(product.activeIngredients || product.commonUses) && (
          <div className="grid gap-8 md:grid-cols-2">
            {product.activeIngredients && (
              <SectionCard
                title={t(language, "Active ingredients", "المكونات الفعالة")}
              >
                <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                  {product.activeIngredients}
                </p>
              </SectionCard>
            )}
            {product.commonUses && (
              <SectionCard
                title={t(language, "Common uses", "الاستخدامات الشائعة")}
              >
                <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                  {product.commonUses}
                </p>
              </SectionCard>
            )}
          </div>
        )}

        {(product.purityPercentage != null ||
          product.labMethod ||
          product.labResultsImage) && (
          <SectionCard title={t(language, "Lab & purity", "المختبر والنقاء")}>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Shield className="h-5 w-5" />
              </div>
              <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2 text-sm text-muted-foreground">
                  {product.purityPercentage != null && (
                    <p>
                      {t(language, "Purity", "النقاء")}:{" "}
                      <span className="font-medium text-foreground">
                        {product.purityPercentage}%
                      </span>
                    </p>
                  )}
                  {product.labMethod && (
                    <p>
                      {t(language, "Method", "الطريقة")}:{" "}
                      <span className="font-medium text-foreground">
                        {product.labMethod}
                      </span>
                    </p>
                  )}
                </div>
                {product.labResultsImage && (
                  <a
                    href={product.labResultsImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block h-32 w-32 shrink-0 overflow-hidden rounded-xl border border-border"
                  >
                    <img
                      src={product.labResultsImage}
                      alt={t(
                        language,
                        "Certificate of analysis",
                        "شهادة التحليل"
                      )}
                      className="h-full w-full object-cover"
                    />
                  </a>
                )}
              </div>
            </div>
          </SectionCard>
        )}

        {product.specs.length > 0 && (
          <SectionCard title={t(language, "Specifications", "المواصفات")}>
            <dl className="divide-y divide-border">
              {product.specs.map((spec) => (
                <div
                  key={spec.key}
                  className="flex justify-between gap-4 py-3 text-sm first:pt-0 last:pb-0"
                >
                  <dt className="text-muted-foreground">{spec.key}</dt>
                  <dd className="font-medium text-foreground text-right">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </SectionCard>
        )}

        {product.disclaimer && (
          <p className="rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-4 text-center text-xs leading-relaxed text-muted-foreground">
            {product.disclaimer}
          </p>
        )}
      </div>
    </div>
  );
}
