import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProductList } from "@/components/admin/products/ProductList";
import { ProductStatusTabs } from "@/components/admin/products/ProductStatusTabs";
import {
  getAdminProductCounts,
  getAdminProducts,
} from "@/features/products/queries";

interface AdminProductsPageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function AdminProductsPage({
  searchParams,
}: AdminProductsPageProps) {
  const params = await searchParams;
  const status = params.status === "draft" ? "draft" : "active";

  const [products, counts] = await Promise.all([
    getAdminProducts(status),
    getAdminProductCounts(),
  ]);

  return (
    <>
      <AdminPageHeader
        title="Products"
        description="Manage your storefront catalog."
        action={
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" />
            New product
          </Link>
        }
      />

      <div className="mb-6">
        <ProductStatusTabs
          current={status}
          activeCount={counts.active}
          draftCount={counts.draft}
        />
      </div>

      <ProductList products={products} status={status} />
    </>
  );
}
