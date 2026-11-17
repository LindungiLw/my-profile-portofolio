// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Dancing_Script } from "next/font/google";
import "./globals.css";

import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  weight: "700",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Rahma Lindungi Laowo — UI/UX Designer & Frontend Developer",
    template: "%s | Rahma Lindungi Laowo",
  },
  description:
    "Portfolio of Rahma Lindungi Laowo, an Information Systems student at Jakarta International University focusing on UI/UX Design, Web, and Mobile development.",
  keywords: [
    "Rahma Lindungi Laowo",
    "UI/UX Designer",
    "Frontend Developer",
    "Portfolio",
    "Next.js",
    "Jakarta International University",
  ],
  openGraph: {
    title: "Rahma Lindungi Laowo — UI/UX Designer & Frontend Developer",
    description:
      "Explore UI/UX prototypes, web applications, mobile apps, and certifications by Rahma Lindungi Laowo.",
    type: "website",
  },
};

const themeInitScript = `
  try {
    var saved = localStorage.getItem("portfolio-theme");
    if (saved === "cyberpunk" || saved === "matrix") {
      document.documentElement.setAttribute("data-theme", saved);
    }
  } catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-main text-textMuted font-sans">
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <LanguageToggle />
            <ThemeToggle />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
