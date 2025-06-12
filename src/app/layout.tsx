import Header from "@/components/header/header";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <Header />
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
