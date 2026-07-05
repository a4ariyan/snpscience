import { ShimmerBlock, ShimmerPage } from "./Shimmer";

function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <ShimmerBlock className="aspect-[4/3] w-full rounded-none" />
      <div className="space-y-3 p-6">
        <ShimmerBlock className="h-3 w-20" />
        <div className="flex items-start justify-between gap-4">
          <ShimmerBlock className="h-5 w-2/3" />
          <ShimmerBlock className="h-6 w-14 rounded-md" />
        </div>
        <ShimmerBlock className="h-7 w-24" />
      </div>
    </div>
  );
}

export function ProductsCatalogSkeleton() {
  return (
    <ShimmerPage>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 space-y-16">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3">
              <ShimmerBlock className="h-px w-8" />
              <ShimmerBlock className="h-3 w-40" />
            </div>
            <ShimmerBlock className="h-12 w-full max-w-lg md:h-14" />
            <ShimmerBlock className="h-5 w-full max-w-2xl" />
            <ShimmerBlock className="h-5 w-5/6 max-w-xl" />
          </div>

          <div className="grid grid-cols-2 gap-8 border-t border-border pt-12 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <ShimmerBlock className="h-12 w-12 rounded-full" />
                <ShimmerBlock className="h-4 w-24" />
                <ShimmerBlock className="h-3 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6 flex gap-2 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <ShimmerBlock key={i} className="h-10 w-28 shrink-0 rounded-full" />
            ))}
          </div>

          <div className="mb-8 flex justify-end gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <ShimmerBlock key={i} className="h-9 w-16 rounded-full" />
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </ShimmerPage>
  );
}
