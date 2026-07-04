"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { t } from "@/lib/i18n";
import { PRODUCT_PLACEHOLDER_IMAGE } from "@/shared/products-content";

export function CartDrawer() {
  const { language } = useLanguage();
  const {
    items,
    isOpen,
    itemCount,
    subtotal,
    closeCart,
    removeItem,
    updateQuantity,
  } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
      />

      <aside className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col border-l border-border bg-background shadow-xl animate-in slide-in-from-right duration-200">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-foreground">
            {t(language, "Cart", "العربة")}
            {itemCount > 0 && (
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({itemCount})
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-accent transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground/50" />
            <p className="mt-4 text-base font-medium text-foreground">
              {t(language, "Your cart is empty", "عربتك فارغة")}
            </p>
            <Link
              href="/products"
              onClick={closeCart}
              className="mt-6 text-sm font-medium text-primary hover:underline"
            >
              {t(language, "Browse products", "تصفح المنتجات")}
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((item) => {
                const name = t(language, item.nameEn, item.nameAr);
                return (
                  <li
                    key={`${item.productId}-${item.dosage}`}
                    className="flex gap-4 border-b border-border pb-4 last:border-0"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-white">
                      <Image
                        src={item.image ?? PRODUCT_PLACEHOLDER_IMAGE}
                        alt={name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={closeCart}
                        className="font-medium text-foreground hover:text-primary truncate"
                      >
                        {name}
                      </Link>
                      {item.dosage && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.dosage}
                        </p>
                      )}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.dosage,
                                item.quantity - 1
                              )
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-border hover:bg-accent"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.dosage,
                                item.quantity + 1
                              )
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-border hover:bg-accent"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-foreground">
                            {(item.price * item.quantity).toFixed(2)} AED
                          </p>
                          <button
                            type="button"
                            onClick={() =>
                              removeItem(item.productId, item.dosage)
                            }
                            className="text-xs text-muted-foreground hover:text-destructive"
                          >
                            {t(language, "Remove", "إزالة")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-border px-6 py-5">
              <div className="flex items-center justify-between text-base">
                <span className="text-muted-foreground">
                  {t(language, "Subtotal", "المجموع")}
                </span>
                <span className="text-xl font-bold text-foreground">
                  {subtotal.toFixed(2)} AED
                </span>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
