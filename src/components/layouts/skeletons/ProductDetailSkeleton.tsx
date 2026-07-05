import { ShimmerBlock, ShimmerPage } from "./Shimmer";

export function ProductDetailSkeleton() {
  return (
    <ShimmerPage>
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-14 space-y-16">
        <div className="flex flex-wrap items-center gap-2">
          <ShimmerBlock className="h-4 w-16" />
          <ShimmerBlock className="h-4 w-3" />
          <ShimmerBlock className="h-4 w-24" />
          <ShimmerBlock className="h-4 w-3" />
          <ShimmerBlock className="h-4 w-32" />
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-3">
            <ShimmerBlock className="aspect-square w-full rounded-2xl" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <ShimmerBlock key={i} className="h-16 w-16 rounded-xl" />
              ))}
            </div>
          </div>

          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-3">
              <ShimmerBlock className="h-px w-8" />
              <ShimmerBlock className="h-3 w-36" />
            </div>
            <ShimmerBlock className="h-10 w-full max-w-md md:h-12" />
            <ShimmerBlock className="h-5 w-24" />
            <ShimmerBlock className="h-9 w-28" />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <ShimmerBlock key={i} className="h-14 rounded-xl" />
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <ShimmerBlock key={i} className="h-10 w-28 rounded-full" />
              ))}
            </div>

            <ShimmerBlock className="h-6 w-20 rounded-full" />
            <ShimmerBlock className="h-12 w-full rounded-xl" />
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4">
            <ShimmerBlock className="h-6 w-32" />
            <ShimmerBlock className="h-4 w-full" />
            <ShimmerBlock className="h-4 w-full" />
            <ShimmerBlock className="h-4 w-4/5" />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4"
              >
                <ShimmerBlock className="h-6 w-36" />
                <ShimmerBlock className="h-4 w-full" />
                <ShimmerBlock className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ShimmerPage>
  );
}
