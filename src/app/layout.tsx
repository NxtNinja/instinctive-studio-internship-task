import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import { Noto_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: "Instinctive Studio task",
  description: "Internship task for showcasing full-stack skills",
};

const noto_sans = Noto_Sans({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={noto_sans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
