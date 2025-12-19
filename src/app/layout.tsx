import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { BadgeFixer } from "@/components/layout/BadgeFixer";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { GlobalNavigation } from "@/components/layout/GlobalNavigation";
import { AchievementToast } from "@/components/gamification/AchievementToast";
import { DailyReward } from "@/components/gamification/DailyReward";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#6366f1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Etymology Quest",
  description: "Master word origins in this gamified adventure.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Etymology Quest",
  },
  openGraph: {
    title: "Etymology Quest",
    description: "Gamified etymology learning adventure.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased font-sans bg-slate-50 text-slate-900 relative`} suppressHydrationWarning>
        <LanguageProvider>
          <BadgeFixer />

          {/* === Global Navigation === */}
          {/* This sits outside of <main>, so page content cannot hide it. */}
          {/* <GlobalNavigation /> - Removed as per user request */}
          <FloatingNav />

          <AchievementToast />
          <DailyReward />

          <main className="relative">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
