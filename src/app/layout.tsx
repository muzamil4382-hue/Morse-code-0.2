import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import Header from "@/components/morse/header";
import Footer from "@/components/morse/footer";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { BASE_URL, DEFAULT_SOCIAL_IMAGE } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Free Morse Code Translator | Encode & Decode Instantly",
    template: "%s",
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

  authors: [
    {
      name: "Morse Code Translator Team",
      url: `${BASE_URL}/about`,
    },
  ],

  creator: "Morse Code Translator Team",
  publisher: "Morse Code Translator",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Morse Code Translator",
    title: "Free Morse Code Translator | Encode & Decode Instantly",
    description:
      "Convert text to Morse code and decode Morse instantly with our free translator. Audio playback, alphabet charts, and learning tools included.",
    images: [
      {
        url: DEFAULT_SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: "Morse Code Translator - Free Online Morse Code Tools",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Free Morse Code Translator | Encode & Decode Instantly",
    description:
      "Free Morse code translator with audio playback, alphabet charts, and learning tools.",
    images: [DEFAULT_SOCIAL_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
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

const websiteId = `${BASE_URL}/#website`;
const organizationId = `${BASE_URL}/#organization`;

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: "Morse Code Translator",
    alternateName: "MorseCodeTranslator.com",
    url: BASE_URL,
    description:
      "Free online Morse code translator with text-to-Morse conversion, Morse-to-text decoding, audio playback, visual flash, and learning resources.",
    publisher: {
      "@id": organizationId,
    },
    inLanguage: "en-US",
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: "Morse Code Translator",
    alternateName: "MorseCodeTranslator.com",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.svg`,
    },
    description:
      "Morse Code Translator provides free online tools and educational resources for translating, decoding, learning, and understanding International Morse Code.",
    publishingPrinciples: `${BASE_URL}/editorial-policy`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${BASE_URL}/contact`,
      availableLanguage: "English",
    },
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
        <script
          id="site-jsonld"
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