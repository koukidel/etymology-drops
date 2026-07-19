import type { Metadata, Viewport } from "next";
import { Inter, Newsreader, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  display: "swap",
});

// Japanese serif for JA headings/copy: Latin stays Newsreader (it sorts first
// in the stack), CJK falls through to Noto Serif JP instead of a gothic
// system fallback — mixed-script lines stop clashing.
const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-noto-serif-jp",
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  themeColor: "#faf7f2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Etymology Drops",
  description: "Every word has a story. Learn the hidden histories inside everyday English.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Etymology Drops",
  },
  openGraph: {
    title: "Etymology Drops",
    description: "Every word has a story. Learn the hidden histories inside everyday English.",
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
      <body className={`${inter.variable} ${newsreader.variable} ${notoSerifJP.variable} antialiased font-sans`} suppressHydrationWarning>
        <LanguageProvider>
          <main className="relative">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
