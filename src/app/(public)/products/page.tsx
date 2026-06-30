import { ProductsHub } from "@/components/products/ProductsHub";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Products",
  description:
    "Research-grade peptides with ≥99% purity, COA provided, and cold-chain delivery across the UAE and GCC.",
};

export default function ProductsPage() {
  return <ProductsHub />;
}
