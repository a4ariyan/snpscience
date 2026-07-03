import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-semibold text-foreground">
        Authentication failed
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        We couldn&apos;t complete sign-in. Please try again.
      </p>
      <Link
        href="/"
        className="mt-8 text-sm font-medium text-primary hover:underline"
      >
        Return home
      </Link>
    </main>
  );
}
