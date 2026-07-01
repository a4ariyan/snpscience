import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { getServerLanguage } from "@/lib/language.server";
import { isRtl } from "@/lib/i18n";

export async function PublicPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language = await getServerLanguage();
  const rtl = isRtl(language);

  return (
    <div
      className={`min-h-screen bg-background text-foreground ${rtl ? "rtl" : "ltr"}`}
      dir={rtl ? "rtl" : "ltr"}
    >
      <Header />
      <main className="pt-20">{children}</main>
      <Footer />
    </div>
  );
}
