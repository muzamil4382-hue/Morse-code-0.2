import type { Metadata } from "next";
import {
  generatePageMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateHowToSchema,
  generateSoftwareApplicationSchema,
  generateWebSiteSchema,
} from "@/lib/seo";
import HomeContent, { faqs, howToSteps } from "./home-content";
import HomeClient from "./home.client";

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

      <section className="w-full bg-[#006633] px-4 py-12 text-center text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Free Online Morse Code Translator
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-emerald-100 sm:text-base">
            Looking to turn text into code? Our Free Morse Code translator enables
            you to turn alphabets, numbers and punctuations into Morse Code. You
            can use audio or tapping to convert morse into text and vice versa.
          </p>
        </div>
      </section>

      <HomeClient />
      <HomeContent />
    </>
  );
}
