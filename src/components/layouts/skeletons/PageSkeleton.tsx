import { ShimmerBlock, ShimmerPage } from "./Shimmer";

export function PageSkeleton() {
  return (
    <ShimmerPage>
      <div className="mx-auto max-w-4xl px-6 py-16 space-y-10">
        <div className="space-y-4">
          <ShimmerBlock className="h-3 w-24" />
          <ShimmerBlock className="h-10 w-2/3 max-w-md" />
          <ShimmerBlock className="h-4 w-full max-w-xl" />
          <ShimmerBlock className="h-4 w-5/6 max-w-lg" />
        </div>

        <ShimmerBlock className="h-56 w-full rounded-2xl" />

        <div className="space-y-3">
          <ShimmerBlock className="h-4 w-full" />
          <ShimmerBlock className="h-4 w-full" />
          <ShimmerBlock className="h-4 w-4/5" />
          <ShimmerBlock className="h-4 w-3/5" />
        </div>
      </div>
    </ShimmerPage>
  );
}
