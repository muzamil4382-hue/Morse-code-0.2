import type { Metadata } from "next";
import {
  generatePageMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateHowToSchema,
  generateSoftwareApplicationSchema,
  generateWebSiteSchema,
} from "@/lib/seo";
import dynamic from "next/dynamic";
import HomeContent, { faqs, howToSteps } from "./home-content";

const HomeClient = dynamic(() => import("./home.client"), { ssr: true });

export const metadata: Metadata = generatePageMeta(
  "Morse Code Translator – Translate Text to Morse Code",
  "Free Morse Code Translator to convert text and decode dots and dashes instantly. Includes audio, speed controls, flash signals, copy, and WAV download.",
  "/",
  [
    "morse code translator",
    "morse translator",
    "text to morse code",
    "morse code converter",
    "morse code to text",
    "morse code decoder",
    "translate text to morse code",
  ]
);

export default function HomePage() {
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([{ name: "Home", url: "/" }]);
  const howToSchema = generateHowToSchema(howToSteps);
  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Morse Code Translator",
    description:
      "A free online Morse Code Translator and Morse code converter for translating text to Morse code and decoding Morse code to text. Includes audio playback, visual flash mode, adjustable sound settings, copy tools, downloads, and International Morse code support.",
    url: "/",
  });
  const websiteSchema = generateWebSiteSchema({
    name: "Morse Code Translator",
    description:
      "A free online Morse Code Translator for converting text to Morse code and decoding Morse code to text, with audio playback, learning guides, alphabet references, timing information, practice tools, and quizzes.",
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />

      <HomeClient />
      <HomeContent />
    </>
  );
}
