import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { teamMembers } from "@/shared/about-content";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const pathname = request.nextUrl.pathname;

  // Check for team member vanity URLs (e.g. /omarhassan -> /about-us/omarhassan)
  if (
    pathname !== "/" && 
    !pathname.startsWith("/_next") && 
    !pathname.startsWith("/api") && 
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/about-us")
  ) {
    // Only check root-level paths for vanity URLs
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 1) {
      const slug = segments[0].toLowerCase().replace(/[^a-z0-9]/g, '');
      
      // Quick check to avoid processing every single request unnecessarily
      if (slug.length > 2) {
        const isMember = teamMembers.some(m => {
          const flatName = m.name.toLowerCase().replace(/[^a-z0-9]/g, '');
          const flatNameAr = m.nameAr.toLowerCase().replace(/[^a-z0-9]/g, '');
          return flatName === slug || flatNameAr === slug || m.id.toLowerCase() === slug || flatName.includes(slug) || slug.includes(flatName);
        });

        if (isMember) {
          const url = request.nextUrl.clone();
          url.pathname = `/about-us/${segments[0]}`;
          return NextResponse.redirect(url);
        }
      }
    }
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user &&
    request.nextUrl.pathname.startsWith("/admin")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico)$).*)",
  ],
};
