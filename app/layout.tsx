import { socialMetadata } from "@/lib/social-metadata";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import "./approved-poc.css";
import { siteUrl, isPreview } from "@/lib/site";
import business from "@/data/business.json";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
  title: "Van de Voort Tuinen | Tuinontwerp, Aanleg & Onderhoud",
  description:
    "Van de Voort Tuinen - Uw specialist in tuinaanleg, tuinonderhoud, gras aanleggen en bestrating aanleggen. Het is onze passie om al het groen te laten stralen!",
  icons: {
    icon: [
      { url: "/images/brand/leaves-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/brand/leaves-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: { url: "/images/brand/leaves-180.png", sizes: "180x180", type: "image/png" },
  },
  keywords: [
    "hoveniersbedrijf",
    "tuinaanleg",
    "bestrating",
    "gras aanleggen",
    "tuinonderhoud",
  ],
  authors: [{ name: "Van de Voort Tuinen" }],
  ...socialMetadata("Van de Voort Tuinen | Tuinontwerp, Aanleg & Onderhoud", "Uw specialist in tuinaanleg, tuinonderhoud, gras aanleggen en bestrating aanleggen."),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" suppressHydrationWarning className="bg-background">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "LocalBusiness", "@id": `${siteUrl}/#business`,
          name: business.name, url: siteUrl, telephone: business.phone, email: business.email,
          logo: `${siteUrl}/images/original-site/logo.png`,
          address: { "@type": "PostalAddress", streetAddress: business.address, postalCode: business.postcode, addressLocality: business.city, addressCountry: "NL" },
          areaServed: business.workArea,
        }).replace(/</g, "\\u003c") }} />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
