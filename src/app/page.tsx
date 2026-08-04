import type { Metadata } from "next";
import {
  generatePageMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateHowToSchema,
  generateSoftwareApplicationSchema,
  generateWebSiteSchema,
} from "@/lib/seo";
import HomeClient from "./home.client";

const faqs = [
  {
    question: "How do I use this Morse code translator?",
    answer: "Simply type your text in the input box, and the translator instantly converts it to Morse code using dots (.) and dashes (-). You can also paste Morse code and switch to Morse-to-Text mode to decode it back to readable text. The translation happens in real time as you type, with no need to press any button.",
  },
  {
    question: "Can I listen to Morse code audio?",
    answer: "Yes! Our translator includes a built-in audio player that converts your Morse code into audible beeps. You can adjust the speed (5 to 35 WPM), frequency (300 to 1000 Hz), and volume to your preference. There is also a visual flash mode that displays dots and dashes as screen flashes, simulating how Morse code is transmitted via light signals.",
  },
  {
    question: "Is this Morse code translator free?",
    answer: "Yes, this Morse code translator is 100% free to use with no registration required. All features including text-to-Morse conversion, Morse-to-text decoding, audio playback, visual flash mode, WAV audio download, and copy-to-clipboard are available at no cost. There are no hidden fees, premium tiers, or usage limits.",
  },
  {
    question: "What is the standard speed for Morse code?",
    answer: "The standard speed for Morse code used by amateur radio operators is typically between 15 and 25 words per minute (WPM). The International Telecommunication Union (ITU) sets the standard timing: a dot equals one unit, a dash equals three units, the space between parts of the same letter is one unit, between letters is three units, and between words is seven units. Beginners often start at 5 to 10 WPM using the Farnsworth method.",
  },
  {
    question: "Can I download Morse code as a WAV audio file?",
    answer: "Yes, you can download your translated Morse code as a WAV audio file. After entering your text and seeing the Morse code output, click the Download WAV button. This generates a standard WAV audio file that you can save, share, or use in projects. The audio file uses your selected speed, frequency, and volume settings.",
  },
  {
    question: "What is the difference between International Morse code and American Morse code?",
    answer: "International Morse code, standardized by the ITU in 1865, is the most widely used version today. American Morse code, developed earlier by Samuel Morse and Alfred Vail, has different timing patterns for some characters. For example, the number 1 in International Morse is .---- while in American Morse it is .-..-. International Morse code is used globally in aviation, maritime communication, amateur radio, and emergency signaling.",
  },
  {
    question: "How do I learn Morse code effectively?",
    answer: "The most effective methods for learning Morse code include the Koch method (learning one character at a time at full speed), the Farnsworth method (using longer spacing between characters at slower speeds), and regular practice with audio drills. Start with the most common letters (E, T, A, N, O, I, S) and build up gradually. Our Morse code quiz and alphabet chart are great practice tools.",
  },
  {
    question: "Where is Morse code still used today?",
    answer: "Morse code is still actively used in several fields: amateur radio (ham radio) operators use it worldwide, aviation pilots recognize the SOS distress signal, the U.S. Navy and Coast Guard still train personnel in Morse code, mariners use it for visual distress signaling, and it is used in assistive technology for people with disabilities. The SOS signal remains universally recognized as an international distress call.",
  },
  {
    question: "What characters and symbols does this translator support?",
    answer: "Our Morse code translator supports the complete International Morse code standard including all 26 English letters (A through Z), all 10 digits (0 through 9), and common punctuation marks including period, comma, question mark, exclamation mark, slash, parentheses, ampersand, colon, semicolon, equals sign, plus sign, minus sign, underscore, quotation marks, dollar sign, and at sign.",
  },
  {
    question: "Can I share my Morse code translations?",
    answer: "Yes, you can share your Morse code translations easily. Use the Copy button to copy the Morse code output to your clipboard, then paste it anywhere. You can also download the translation as a text file or as a WAV audio file. The share button provides direct links for sharing via social media platforms like Twitter and WhatsApp.",
  },
];

const howToSteps = [
  {
    name: "Enter Your Text",
    text: "Type or paste your text message in the input area. The translator supports letters, numbers, punctuation, and spaces.",
  },
  {
    name: "Get Instant Morse Code",
    text: "Your text is converted to Morse code in real time using the International Morse code standard with proper dot and dash notation.",
  },
  {
    name: "Play, Download, or Share",
    text: "Listen to the audio playback, download as WAV, copy to clipboard, or share your Morse code message with others.",
  },
];

export const metadata: Metadata = generatePageMeta(
  "Morse Code Translator - Convert Text to Morse Code Free Online",
  "Free online Morse code translator with real-time audio playback, visual signal lamp flash, and WAV download. Instantly convert text to Morse code and decode Morse code to text. Supports 26 letters, 10 digits, and 15+ punctuation marks per ITU-R M.1677 standard. No sign-up required.",
  "/",
  ["morse code translator", "text to morse code", "morse code to text", "morse code decoder", "morse code generator", "morse code audio", "morse code alphabet", "morse code converter online", "morse code online"]
);

export default function HomePage() {
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
  ]);
  const howToSchema = generateHowToSchema(howToSteps);
  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Morse Code Translator",
    description: "Free online Morse code translator with audio, visual flash, and WAV download. Supports bidirectional translation, adjustable speed/frequency/volume, and ITU-R M.1677 standard compliance.",
    url: "/",
  });
  const websiteSchema = generateWebSiteSchema({
    name: "Morse Code Translator",
    description: "Free online Morse code translator supporting 26 letters, 10 numbers, 15+ punctuation marks, audio playback, visual flash mode, WAV download, and comprehensive learning resources.",
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <HomeClient faqs={faqs} />
    </>
  );
}
