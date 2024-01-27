import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/layouts/Header";
import SideBar from "@/layouts/SideBar";
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
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <SideBar />
        <main className="w-full pl-64 pr-4 py-20">{children}</main>
      </body>
    </html>
  );
}
