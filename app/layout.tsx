import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
// @ts-ignore
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "AeroSlate One | Premium Product Details",
  description: "A modern premium ecommerce product details page with sticky gallery, scrollable product information, and purchase card.",
  openGraph: {
    title: "AeroSlate One",
    description: "Premium product details page built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable}`}>{children}</body>
    </html>
  );
}
