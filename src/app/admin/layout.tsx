export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full">
      {/* Admin sidebar */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
