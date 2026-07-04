"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProductStatusTabsProps {
  activeCount: number;
  draftCount: number;
  current: "active" | "draft";
}

export function ProductStatusTabs({
  activeCount,
  draftCount,
  current,
}: ProductStatusTabsProps) {
  const tabs = [
    { id: "active" as const, label: "Active", count: activeCount },
    { id: "draft" as const, label: "Draft", count: draftCount },
  ];

  return (
    <div className="inline-flex rounded-xl border border-border bg-muted/30 p-1">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={`/admin/products?status=${tab.id}`}
          className={cn(
            "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
            current === tab.id
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {tab.label}
          <span
            className={cn(
              "text-xs tabular-nums",
              current === tab.id
                ? "text-muted-foreground"
                : "text-muted-foreground/70"
            )}
          >
            {tab.count}
          </span>
        </Link>
      ))}
    </div>
  );
}
