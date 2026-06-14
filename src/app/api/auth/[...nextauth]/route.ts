// Auth.js / NextAuth route handler — configure in @/lib/auth
export async function GET() {
  return Response.json({ message: "Auth endpoint not configured" }, { status: 501 });
}

export async function POST() {
  return Response.json({ message: "Auth endpoint not configured" }, { status: 501 });
}
