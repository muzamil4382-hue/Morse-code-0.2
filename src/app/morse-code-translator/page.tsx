import type { Metadata } from "next";
import {
  generatePageMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateHowToSchema,
  generateSoftwareApplicationSchema,
} from "@/lib/seo";
import TranslatorClient from "./translator.client";

const faqs = [
  {
    question: "How accurate is this Morse code translator?",
    answer: "This translator implements the International Morse Code standard as defined by ITU-R M.1677, the official recommendation from the International Telecommunication Union. It handles all 26 English letters (A through Z), all 10 Arabic numerals (0 through 9), and over 15 punctuation marks including the period, comma, question mark, exclamation point, slash, and more. The conversion algorithm processes each character individually, ensuring 100 percent accuracy for any standard English text input. Morse-to-text decoding also follows ITU standards, recognizing dots, dashes, letter spaces, and word spaces correctly.",
  },
  {
    question: "What is the ITU-R M.1677 standard for Morse code?",
    answer: "ITU-R M.1677 is the International Telecommunication Union's official document that standardizes the International Morse Code character set. First established in 1865 at the International Telegraph Convention in Paris and later refined by the ITU, this standard defines the exact dot-and-dash pattern for every letter, number, and procedural signal used worldwide. The standard also specifies timing ratios: a dash is precisely three times the length of a dot, the gap between elements within a character is one dot-length, between characters is three dot-lengths, and between words is seven dot-lengths. Our translator follows these specifications exactly.",
  },
  {
    question: "Can I translate Morse code back to English text?",
    answer: "Yes. Use the mode toggle to switch from Text-to-Morse to Morse-to-Text decoding. In Morse-to-Text mode, enter dots (.), dashes (-), single spaces between letters, and forward slashes (/) between words. The decoder will instantly convert your Morse code input back into readable English text. This bidirectional capability makes the tool useful for both encoding messages and deciphering received Morse code signals from amateur radio, aviation, or maritime communications.",
  },
  {
    question: "Does this translator work offline?",
    answer: "Once the page has loaded in your browser, the core translation engine runs entirely client-side using JavaScript. This means you can type text and get Morse code output even if your internet connection drops. However, the initial page load requires an internet connection to download the application. Audio playback and the visual flash feature also work offline since they use the Web Audio API built into your browser. No data is ever sent to any server during the translation process.",
  },
  {
    question: "What audio settings are available for Morse code playback?",
    answer: "The translator provides three adjustable audio parameters. Speed ranges from 5 to 35 words per minute (WPM), with 20 WPM being the default and the most common speed used by amateur radio operators worldwide. Frequency ranges from 300 Hz to 1000 Hz, with 600 Hz being the standard pitch used in training and examination contexts. Volume is adjustable from 0 to 100 percent. These settings give you full control to practice at your own skill level, from beginner-friendly slow speeds to advanced high-speed copy.",
  },
  {
    question: "Is my text data stored or sent to any server?",
    answer: "No. All text processing happens exclusively in your browser using client-side JavaScript. Your input text and the resulting Morse code translation are never transmitted to any external server, database, or third-party service. There are no cookies, no analytics tracking, and no user accounts. This privacy-first approach means you can safely translate sensitive or personal messages without any concern about data exposure.",
  },
];

const howToSteps = [
  {
    name: "Enter Your Text or Morse Code",
    text: "Type or paste English text in the input area for text-to-Morse conversion. To decode, click the swap button to switch to Morse-to-Text mode and enter dots, dashes, and spaces.",
  },
  {
    name: "Get Instant Real-Time Translation",
    text: "The translator converts your input instantly as you type, following the ITU-R M.1677 International Morse Code standard. Letters are separated by spaces and words by forward slashes.",
  },
  {
    name: "Listen, Copy, or Download the Result",
    text: "Play the Morse code audio with adjustable speed and frequency, copy the output to your clipboard, or download it as a WAV audio file.",
  },
];

export const metadata: Metadata = generatePageMeta(
  "Morse Code Translator Online - Free Text to Morse Code Tool",
  "Free online Morse code translator tool with bidirectional conversion. Type text to get Morse code instantly, or paste dots and dashes to decode back to English. Features adjustable audio (5-35 WPM), visual signal lamp flash, and WAV file download. Works entirely in your browser — no data sent to any server.",
  "/morse-code-translator",
  [
    "morse code translator online",
    "online morse code tool",
    "text to morse code converter",
    "morse code conversion tool",
    "free morse code translator",
    "morse to text converter",
    "convert morse code online",
    "morse code encoder",
  ]
);

export default function MorseCodeTranslatorPage() {
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Morse Code Translator", url: "/morse-code-translator" },
  ]);
  const howToSchema = generateHowToSchema(howToSteps);
  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Morse Code Translator",
    description: "Free online Morse code translator following ITU-R M.1677 standard. Convert text to Morse code and Morse code to text with audio playback.",
    url: "/morse-code-translator",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <TranslatorClient faqs={faqs} />
    </>
  );
}
