import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProductForm } from "@/components/admin/products/ProductForm";
import { rowToFormData, parseLocalizedText } from "@/features/products/mappers";
import { getProductById } from "@/features/products/queries";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Link
        href={`/admin/products?status=${product.status}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </Link>

      <AdminPageHeader
        title={parseLocalizedText(product.title).en || "Edit product"}
        description={
          product.status === "active"
            ? "This product is live on the storefront."
            : "This product is a draft and not visible to customers."
        }
      />

      <ProductForm
        productId={product.id}
        initialData={rowToFormData(product)}
        status={product.status as "draft" | "active"}
      />
    </>
  );
}
