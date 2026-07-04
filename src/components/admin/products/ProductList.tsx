"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ProductListItem } from "@/features/products/types";
import { cn } from "@/lib/utils";

function formatRelativeTime(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

interface ProductListProps {
  products: ProductListItem[];
  status: "active" | "draft";
}

export function ProductList({ products, status }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-16 text-center">
        <p className="text-base font-medium text-foreground">
          {status === "draft"
            ? "No draft products yet"
            : "No active products yet"}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {status === "draft"
            ? "Create a product to get started."
            : "Publish a draft to make it live on the storefront."}
        </p>
        {status === "draft" && (
          <Link
            href="/admin/products/new"
            className="mt-6 inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Create product
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="hidden sm:grid sm:grid-cols-[1fr_140px_100px_100px_32px] gap-4 px-5 py-3 border-b border-border text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span>Product</span>
        <span>Category</span>
        <span>Price</span>
        <span>Updated</span>
        <span />
      </div>
      <ul className="divide-y divide-border">
        {products.map((product) => (
          <li key={product.id}>
            <Link
              href={`/admin/products/${product.id}/edit`}
              className="flex items-center gap-4 px-5 py-4 hover:bg-accent/30 transition-colors group"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                {product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded-lg object-cover border border-border"
                  />
                ) : (
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-muted border border-border" />
                )}
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {product.title.en}
                  </p>
                  <p className="text-xs text-muted-foreground truncate sm:hidden">
                    {product.category}
                  </p>
                </div>
              </div>
              <span className="hidden sm:block text-sm text-muted-foreground truncate">
                {product.category.split(" & ")[0]}
              </span>
              <span className="hidden sm:block text-sm font-medium text-foreground">
                {product.price.toFixed(0)} {product.currency}
              </span>
              <span className="hidden sm:block text-sm text-muted-foreground">
                {formatRelativeTime(product.updatedAt)}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                {status === "active" && (
                  <span
                    className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full",
                      product.stockStatus
                        ? "bg-green-500/10 text-green-700 dark:text-green-400"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {product.stockStatus ? "In stock" : "Out of stock"}
                  </span>
                )}
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
