import { Layout } from "@/components/layout/layout";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
