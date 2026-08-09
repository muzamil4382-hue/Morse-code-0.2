import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import "./globals.css";

import Header from "@/components/morse/header";
import Footer from "@/components/morse/footer";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { BASE_URL } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Free Morse Code Translator | Encode & Decode Instantly",
    template: "%s | Morse Code Translator",
  },

  description:
    "Convert text to Morse code and decode Morse instantly with our free translator. Includes audio playback, alphabet charts, numbers, SOS, and learning tools.",

  keywords: [
    "morse code translator",
    "text to morse code",
    "morse code to text",
    "morse code decoder",
    "morse code generator",
    "morse code alphabet",
    "learn morse code",
    "morse code numbers",
    "sos morse code",
    "morse code audio",
    "morse code chart",
  ],

  authors: [{ name: "Morse Code Translator" }],
  creator: "Morse Code Translator",

  metadataBase: new URL(BASE_URL),

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Morse Code Translator",
    title: "Free Morse Code Translator | Encode & Decode Instantly",
    description:
      "Convert text to Morse code and decode Morse instantly with our free translator. Audio playback, alphabet charts, and learning tools included.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Free Morse Code Translator | Encode & Decode Instantly",
    description:
      "Free Morse code translator with audio playback, alphabet charts, and learning tools.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Morse Code Translator",
    url: BASE_URL,
    description:
      "Free online Morse code translator with audio, visual flash, and comprehensive learning resources.",
  },

  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Morse Code Translator",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.svg`,
    description:
      "Free online Morse code translation tool with audio playback, visual flash mode, and comprehensive learning resources for Morse code enthusiasts, students, and professionals.",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />

          <main>{children}</main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}