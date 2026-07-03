/** Site origin for auth redirects — localhost in dev, configured URL in production. */
export function getSiteUrl(): string {
  if (typeof window === "undefined") {
    return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
      /\/$/,
      ""
    );
  }

  const { hostname, origin } = window.location;
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return origin;
  }

  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  return (configured ?? origin).replace(/\/$/, "");
}

export function getAuthCallbackUrl(next = "/"): string {
  return `${getSiteUrl()}/api/auth/callback?next=${encodeURIComponent(next)}`;
}
