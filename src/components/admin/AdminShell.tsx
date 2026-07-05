import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminNav } from "./AdminNav";

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border bg-card h-screen sticky top-0">
        <div className="flex h-16 shrink-0 items-center px-6 border-b border-border">
          <Link href="/admin" className="text-lg font-bold tracking-tight">
            SNP Admin
          </Link>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto py-4">
          <AdminNav />
        </div>
        <div className="shrink-0 border-t border-border p-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>
        </div>
      </aside>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="md:hidden flex h-14 items-center justify-between border-b border-border px-4 bg-card">
          <Link href="/admin" className="font-bold">
            SNP Admin
          </Link>
          <Link href="/" className="text-sm text-muted-foreground">
            Site
          </Link>
        </header>
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-5xl px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
