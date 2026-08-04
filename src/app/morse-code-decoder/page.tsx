import type { Metadata } from "next";
import { generatePageMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo";
import DecoderClient from "./decoder.client";

const faqs = [
  {
    question: "What is a Morse code decoder?",
    answer: "A Morse code decoder is a tool that converts Morse code (sequences of dots and dashes) back into readable text. Unlike a general translator that works bidirectionally, a dedicated decoder is optimized specifically for the Morse-to-text direction, with features like custom separator support, brute-force decoding for unseparated input, and detailed character-by-character analysis of the decoding process.",
  },
  {
    question: "How do I decode Morse code without separators?",
    answer: "Decoding Morse code without separators (spaces between letters) is inherently ambiguous because the same sequence of dots and dashes can represent different letter combinations. For example, .... could be H (four dots) or E E E E (four separate letters). Our brute-force mode attempts to find the most probable decoding by matching against common English words and letter frequency patterns. However, for reliable results, we strongly recommend using standard spacing (spaces between letters, slashes between words).",
  },
  {
    question: "What separator formats does the decoder support?",
    answer: "Our Morse code decoder supports three separator formats: single space (the standard ITU format where spaces separate letters), forward slash (/) for word boundaries, and pipe character (|) as an alternative letter separator. You can also combine separators — for example, using spaces between characters within a letter and slashes between words. The decoder auto-detects the most likely separator format based on your input pattern.",
  },
  {
    question: "Why does my Morse code decode produce incorrect results?",
    answer: "The most common reasons for incorrect Morse code decoding are: missing spaces between letters, using incorrect dot/dash notation (some systems use 0 and 1 instead of . and -), extra whitespace, or non-standard Morse code variants. Ensure you are using standard International Morse code with proper spacing. If your input lacks separators entirely, try the brute-force mode, though results will be approximate. Also verify you are using dots (.) and dashes (-), not underscores or other characters.",
  },
  {
    question: "Can the decoder handle audio Morse code input?",
    answer: "Our current Morse code decoder works with text-based Morse code input (dots, dashes, and separators). For decoding audio Morse code, you would need to first transcribe the audio into text notation by listening to the dots and dashes, then paste that notation into the decoder. Automated audio-to-Morse transcription requires specialized signal processing software and is a fundamentally different process from text-based decoding.",
  },
];

export const metadata: Metadata = generatePageMeta(
  "Morse Code Decoder - Decode Morse to Text Free Online",
  "Dedicated Morse code decoder tool optimized for Morse-to-text conversion. Supports standard dot-dash notation with automatic separator detection, brute-force mode for unseparated input, and character-by-character analysis. Handles ambiguous sequences and provides detailed decoding feedback.",
  "/morse-code-decoder",
  ["morse code decoder", "decode morse code", "morse to text", "morse code reader", "translate morse code to english", "morse code interpreter", "read morse code"]
);

export default function MorseCodeDecoderPage() {
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Morse Code Decoder", url: "/morse-code-decoder" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <DecoderClient faqs={faqs} />
    </>
  );
}
