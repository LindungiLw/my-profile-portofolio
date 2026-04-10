import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. Import Language Provider
import { LanguageProvider } from "@/context/LanguageContext";
// 2. 👇 Import komponen tombol melayang yang baru kita buat
import { LanguageToggle } from "@/components/LanguageToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Portfolio and Projects Showcase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          {children}

          {/* 3. 👇 Taruh di sini agar tombolnya muncul di semua halaman */}
          <LanguageToggle />
        </LanguageProvider>
      </body>
    </html>
  );
}
