import type { Metadata } from "next";
import { Jost, Yanone_Kaffeesatz } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import ClerkAuthProvider from "@/components/providers/ClerkAuthProvider";
import ReduxWrapper from "@/redux/ReduxWrapper";
import { Toaster } from "@/components/ui/sonner";

// Modern, clean, professional font - Used by Vercel, GitHub, Stripe anirban
const jost = Jost({
  subsets: ['latin'],
  // Use 'variable' to load all weights (100-900) in one optimized file
  // or you can specify a range like '100 900' or an array of weights.
  // We'll use the 'variable' option for best performance.
  variable: '--font-jost', // Define a CSS variable
  display: 'swap',
});

// Define Yanone Kaffeesatz
const yanoneKaffeesatz = Yanone_Kaffeesatz({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'], // Available weights
  display: 'swap',
  variable: '--font-yanone-kaffeesatz' // Optional: Define a CSS variable for utility classes
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  title: {
    default: "Land Solution",
    template: "%s | Land Solution",
  },
  description: "Land Solution — tours, travel packages and pilgrimages",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "Land Solution",
    description: "Land Solution — tours, travel packages and pilgrimages",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    siteName: "Land Solution",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/images/seo.png`,
        width: 1200,
        height: 630,
        alt: "Land Solution",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Land Solution",
    description: "Land Solution — tours, travel packages and pilgrimages",
    site: process.env.NEXT_PUBLIC_TWITTER_HANDLE ?? undefined,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/logo.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxWrapper>
      <ClerkProvider>
        <ClerkAuthProvider>
          <html lang="en" suppressHydrationWarning>
            <body
              className={`${jost.className} ${yanoneKaffeesatz.variable} font-sans antialiased`}
            >
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
              >
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "Organization",
                      name: "Land Solution",
                      url: siteUrl,
                      logo: `${siteUrl}/images/logo.svg`,
                      sameAs: [],
                      contactPoint: [
                        {
                          "@type": "ContactPoint",
                          telephone: "+0000000000",
                          contactType: "customer service",
                        },
                      ],
                    }),
                  }}
                />
                {children}
                <Toaster />
              </ThemeProvider>
            </body>
          </html>
        </ClerkAuthProvider>
      </ClerkProvider>
    </ReduxWrapper>
  );
}
