import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/layouts/Header";
import "windi.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "snack script",
  description: "어떤 간식을 원하시나요?",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://snack-script.vercel.app/",
    images: "/og-image.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.className}>
        <Header />
        <main className="w-full pr-4 py-20">{children}</main>
      </body>
    </html>
  );
}
