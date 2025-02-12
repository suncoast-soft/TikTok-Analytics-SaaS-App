export default function PublicLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      id="skip"
      className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]"
    >
      {children}
    </main>
  );
}
