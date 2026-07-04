const LOCALHOST = ["localhost", "127.0.0.1"];

function siteOrigin(): string {
  if (typeof window !== "undefined") {
    const { hostname, origin } = window.location;
    if (LOCALHOST.includes(hostname)) {
      return origin.replace(/\/$/, "");
    }
    return (process.env.NEXT_PUBLIC_SITE_URL ?? origin).replace(/\/$/, "");
  }

  if (process.env.NODE_ENV === "development") {
    return (
      process.env.NEXT_PUBLIC_DEV_SITE_URL ?? "http://localhost:3000"
    ).replace(/\/$/, "");
  }

  return (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://snpscience.com"
  ).replace(/\/$/, "");
}

/** OAuth / email confirmation callback. Requires wildcard redirect URLs in Supabase. */
export function getAuthCallbackUrl(next = "/"): string {
  const path = next.startsWith("/") ? next : "/";
  return `${siteOrigin()}/api/auth/callback?next=${encodeURIComponent(path)}`;
}
