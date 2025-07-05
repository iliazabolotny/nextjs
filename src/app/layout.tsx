import NextTopLoader from "nextjs-toploader";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={notoSans.className}>
      <body>
        <NextTopLoader />
        {children}
      </body>
    </html>
  );
}
