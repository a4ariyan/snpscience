import Link from "next/link";
import { Package, FileText, Video } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getAdminProductCounts } from "@/features/products/queries";

export default async function AdminDashboardPage() {
  const counts = await getAdminProductCounts();

  const cards = [
    {
      href: "/admin/products",
      title: "Products",
      description: `${counts.active} active, ${counts.draft} drafts`,
      icon: Package,
    },
    {
      href: "/admin/articles",
      title: "Articles",
      description: "Manage blog articles",
      icon: FileText,
    },
    {
      href: "/admin/videos",
      title: "Videos",
      description: "Manage video content",
      icon: Video,
    },
  ];

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Manage your SNP Science storefront and content."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-sm"
          >
            <card.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <h2 className="mt-4 text-lg font-semibold text-foreground">
              {card.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {card.description}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
