import { createClient } from "@/lib/supabase/server";
import { ClientHeader } from "./ClientHeader";

export async function Header() {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isAdmin = false;

  if (user) {
    const { data: profile } = await supabase
      .from("users")
      .select("is_admin")
      .eq("id", user.id)
      .single();

    isAdmin = profile?.is_admin || false;
  }

  return <ClientHeader user={user} isAdmin={isAdmin} />;
}
