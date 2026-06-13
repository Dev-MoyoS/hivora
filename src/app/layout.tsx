import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";
import { ThemeScript } from "@/components/providers/theme-script";
import { AdSenseScript } from "@/components/ads/ad-sense-script";
import { BRAND } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1419" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} — Student Community`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.subtitle,
  icons: {
    icon: "/logo-symbol.png",
    apple: "/logo-symbol.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <AdSenseScript />
      </head>
      <body className={`${inter.variable} min-h-screen font-sans antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
