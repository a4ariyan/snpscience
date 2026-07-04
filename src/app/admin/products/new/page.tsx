import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProductForm } from "@/components/admin/products/ProductForm";
import { emptyProductForm } from "@/features/products/types";

export default function NewProductPage() {
  return (
    <>
      <Link
        href="/admin/products?status=draft"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </Link>

      <AdminPageHeader
        title="New product"
        description="Create a draft product. Upload images after saving."
      />

      <ProductForm initialData={emptyProductForm()} />
    </>
  );
}
