import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd, organisationSchema, websiteSchema } from "@/components/seo/JsonLd";
import { EnableAnimations } from "@/components/ui/EnableAnimations";
import { site } from "@/content";

/**
 * TYPOGRAPHY
 * Fraunces — a soft, slightly playful display serif with real
 * personality but editorial credibility. Used for headings only.
 * Inter — a workhorse UI sans with excellent small-size legibility.
 * Used for all body copy, forms and navigation.
 * Both are self-hosted by next/font: no render-blocking request to a
 * third party, and no layout shift.
 */
const fraunces = localFont({
  src: "../../public/fonts/fraunces-latin-full-normal.woff2",
  variable: "--font-fraunces",
  display: "swap",
  weight: "100 900",
  style: "normal",
  fallback: ["Georgia", "Times New Roman", "serif"],
  // Matching the fallback metrics removes the layout shift on swap.
  adjustFontFallback: "Times New Roman",
});

const inter = localFont({
  src: "../../public/fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
  style: "normal",
  fallback: ["system-ui", "Segoe UI", "Roboto", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "kids newspaper",
    "children's newspaper",
    "newspaper for kids",
    "educational newspaper for children",
    "children's learning activities",
    "kids quizzes",
    "children's current affairs",
    "kids general knowledge",
    "science for kids",
    "environmental learning for kids",
    "children's magazine India",
    "Dehradun",
  ],
  authors: [{ name: site.legalEntity }],
  publisher: site.legalEntity,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    locale: "en_IN",
    images: [
      {
        url: "/brand/kidschron-social-card.png",
        width: 1200,
        height: 630,
        alt: `${site.name}: ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/brand/kidschron-social-card.png"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  robots: { index: true, follow: true },
  category: "education",
};

export const viewport: Viewport = {
  themeColor: "#12324f",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`no-js ${fraunces.variable} ${inter.variable}`}>
      {/* Browser extensions can add attributes to <head> before hydration. */}
      <head suppressHydrationWarning />
      <body className="min-h-dvh antialiased">
        <EnableAnimations />
        <JsonLd data={organisationSchema()} />
        <JsonLd data={websiteSchema()} />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
