import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/morse/header";
import Footer from "@/components/morse/footer";
import { ThemeProvider } from "@/components/theme/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { BASE_URL } from "@/lib/seo";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "Morse Code Translator - Convert Text to Morse Code Free Online",
    template: "%s | Morse Code Translator",
  },
  description:
    "Free Morse code translator with audio, visual flash, and WAV download. Convert text to Morse code and Morse code to text instantly. Learn the Morse code alphabet, numbers, SOS, and more.",
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
    title: "Morse Code Translator - Convert Text to Morse Code Free Online",
    description:
      "Free Morse code translator with audio playback, visual flash mode, and WAV download. Convert text to Morse code and Morse code to text instantly.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Morse Code Translator - Convert Text to Morse Code Free Online",
    description:
      "Free Morse code translator with audio playback, visual flash mode, and WAV download.",
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
    icon: "/favicon.ico",
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
    description: "Free online Morse code translation tool with audio playback, visual flash mode, and comprehensive learning resources for Morse code enthusiasts, students, and professionals.",
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd.map((s) => JSON.stringify(s)).join("\n") }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
  <Header />
  <main className="min-h-screen">{children}</main>
  <Footer />
</ThemeProvider>
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-TEH9XJH798"
  strategy="afterInteractive"
/>

<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-TEH9XJH798');
  `}
</Script>

      </body>
    </html>
  );
}