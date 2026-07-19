import type { Metadata, Viewport } from "next";
import { Inter, Newsreader, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ServiceWorker } from "@/components/platform/ServiceWorker";

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
  themeColor: "#f2ebda",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL at deploy time so OG image URLs are absolute.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "源 Minamoto ｜ 語源で覚える英単語",
  description: "分ければ、意味が見える。英単語を語源の部品に分解して学ぶアプリ。少しの部品が、何千もの単語に届く。",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "源 Minamoto",
  },
  openGraph: {
    title: "源 Minamoto ｜ 語源で覚える英単語",
    description: "分ければ、意味が見える。英単語を語源の部品に分解して学ぶアプリ。",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "源 Minamoto ｜ 語源で覚える英単語",
    description: "分ければ、意味が見える。英単語を語源の部品に分解して学ぶアプリ。",
    images: ["/og.png"],
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
        <ServiceWorker />
        {/* Privacy-light analytics, enabled only when a host is configured. */}
        {process.env.NEXT_PUBLIC_ANALYTICS_HOST && process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN}
            src={`${process.env.NEXT_PUBLIC_ANALYTICS_HOST}/js/script.js`}
          />
        )}
      </body>
    </html>
  );
}
