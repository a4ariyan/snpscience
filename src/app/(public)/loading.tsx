export default function PublicLoading() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="mx-auto max-w-7xl px-6 py-10 animate-pulse space-y-8">
        <div className="h-4 w-48 rounded bg-muted" />
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="aspect-square rounded-2xl bg-muted" />
          <div className="space-y-4">
            <div className="h-3 w-32 rounded bg-muted" />
            <div className="h-10 w-3/4 rounded bg-muted" />
            <div className="h-6 w-1/3 rounded bg-muted" />
            <div className="h-12 w-full rounded-xl bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}
