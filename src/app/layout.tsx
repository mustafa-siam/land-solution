import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import ClerkAuthProvider from "@/components/providers/ClerkAuthProvider";
import ReduxWrapper from "@/redux/ReduxWrapper";
import { Toaster } from "@/components/ui/sonner";

// Modern architectural heading font
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

// Clean, highly legible body font
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "UrbanKeys",
    template: "%s | UrbanKeys",
  },
  description: "UrbanKeys — Real estate, properties, buy, sell and rent",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "UrbanKeys",
    description: "UrbanKeys — Real estate, properties, buy, sell and rent",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    siteName: "UrbanKeys",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/images/seo.png`,
        width: 1200,
        height: 630,
        alt: "UrbanKeys",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UrbanKeys",
    description: "UrbanKeys — Real estate, properties, buy, sell and rent",
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
          <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${dmSans.variable}`}>
            <body className="font-sans antialiased text-gray-900 dark:text-gray-100">
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
                      name: "UrbanKeys",
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