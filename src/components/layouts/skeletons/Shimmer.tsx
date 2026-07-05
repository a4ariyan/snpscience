import { cn } from "@/lib/utils";

export function ShimmerBlock({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-muted", className)}
      aria-hidden
    />
  );
}

export function ShimmerPage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-h-screen bg-background pt-20", className)}>
      {children}
    </div>
  );
}
