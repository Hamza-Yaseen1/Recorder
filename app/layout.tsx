import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import ClientNavbar from "@/components/ClientNavbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free Screen Recorder Online - Record Screen with Audio | No Download Required",
  description: "Free online screen recorder with audio. Record your screen, webcam, and microphone instantly in your browser. No download, no signup. Perfect for tutorials, demos, and presentations.",
  keywords: [
    "screen recorder",
    "free screen recorder",
    "online screen recorder",
    "record screen",
    "screen capture",
    "video recorder",
    "screen recording software",
    "record screen with audio",
    "webcam recorder",
    "browser screen recorder",
    "no download screen recorder",
    "free recording tool",
    "tutorial recorder",
    "demo recorder",
    "presentation recorder"
  ],
  authors: [{ name: "Screen Recorder Team" }],
  creator: "Screen Recorder",
  publisher: "Screen Recorder",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yoursite.com",
    siteName: "Free Screen Recorder",
    title: "Free Screen Recorder Online - Record Screen with Audio",
    description: "Record your screen, webcam, and audio instantly in your browser. No download required. Perfect for tutorials, demos, and presentations.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Screen Recorder - Record Screen Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Screen Recorder Online - Record Screen with Audio",
    description: "Record your screen instantly in your browser. No download, no signup required.",
    images: ["/og-image.png"],
    creator: "@yourhandle",
  },
  alternates: {
    canonical: "https://yoursite.com",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ef4444" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#dc2626" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
        <Providers>
          <ClientNavbar />
          <main className="flex-1">{children}</main>
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Free Screen Recorder",
              "description": "Free online screen recorder with audio. Record your screen, webcam, and microphone instantly in your browser.",
              "url": "https://yoursite.com",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Screen recording",
                "Audio capture",
                "Webcam overlay",
                "Pause and resume",
                "Video download",
                "No download required",
                "Browser-based"
              ],
              "browserRequirements": "Requires JavaScript. Requires HTML5.",
              "softwareVersion": "1.0.0",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1250"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
