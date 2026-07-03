import { createClient } from "@/lib/supabase/server";
import { ClientHeader } from "./ClientHeader";

export async function Header() {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdmin = user?.app_metadata?.is_admin === true;

  return <ClientHeader user={user} isAdmin={isAdmin} />;
}
