import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/layouts/Header";
import "windi.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "snack script",
  description: "간식 주문창",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <meta
        httpEquiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      />
      <body className={inter.className}>
        <Header /> <main className="w-full pr-4 py-20">{children}</main>
      </body>
    </html>
  );
}
