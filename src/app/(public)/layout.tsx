export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Public header */}
      <main className="flex-1">{children}</main>
      {/* Public footer */}
    </>
  );
}
