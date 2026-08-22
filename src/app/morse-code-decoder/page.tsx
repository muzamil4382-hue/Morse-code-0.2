import type { Metadata } from "next";
import {
  generatePageMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateSoftwareApplicationSchema,
} from "@/lib/seo";
import DecoderClient from "./decoder.client";

const faqs = [
  {
    question: "What is a Morse code decoder?",
    answer:
      "A Morse code decoder converts sequences of dots and dashes into readable text. It matches each Morse pattern against the International Morse Code character table and can identify letters, numbers, punctuation, and invalid sequences.",
  },
  {
    question: "How do I decode Morse code to text?",
    answer:
      "Enter Morse code using dots (.) and dashes (-). Separate letters with spaces and words with a forward slash (/). For example, .... . .-.. .-.. --- decodes to HELLO. The decoder processes each sequence and converts it into readable text instantly.",
  },
  {
    question: "What Morse code standard does this decoder use?",
    answer:
      "This decoder is based on International Morse Code, the modern international standard referenced by the International Telecommunication Union in Recommendation ITU-R M.1677.",
  },
  {
    question: "Can I decode Morse code without spaces?",
    answer:
      "Yes. Continuous Morse code can be analyzed automatically, but it may produce more than one possible interpretation because Morse code normally relies on timing or separators to identify character boundaries. Adding spaces between letters gives the most reliable result.",
  },
  {
    question: "How do I separate letters and words in Morse code?",
    answer:
      "In written Morse code, a space is commonly used between character patterns, while a forward slash is often used online to represent a word break. For example, .... . .-.. .-.. --- / .-- --- .-. .-.. -.. represents HELLO WORLD.",
  },
  {
    question: "Why is my Morse code not decoding correctly?",
    answer:
      "Incorrect results usually happen because of missing separators, an invalid combination of dots and dashes, or a typing mistake. Compare the sequence with the Morse Code Alphabet and check that each letter pattern is separated correctly.",
  },
  {
    question: "Can this decoder read numbers in Morse code?",
    answer:
      "Yes. The decoder supports the digits 0 through 9. Every standard International Morse number contains five signal elements. For example, 1 is .---- and 0 is -----.",
  },
  {
    question: "What is the difference between a Morse code decoder and a Morse code translator?",
    answer:
      "A Morse code decoder focuses on converting Morse code into readable text. A Morse Code Translator can normally perform both directions: text to Morse code and Morse code to text.",
  },
  {
    question: "How many letters are in the Morse code alphabet?",
    answer:
      "The English Morse code alphabet contains 26 letters from A through Z. International Morse Code also includes the ten Arabic numerals from 0 through 9 and a range of punctuation and procedural signals.",
  },
  {
    question: "Is this Morse code decoder free?",
    answer:
      "Yes. This Morse Code Decoder is free to use online. You can decode Morse messages without creating an account or installing software.",
  },
];

export const metadata: Metadata = generatePageMeta(
  "Morse Code Decoder | Decode Morse Code to Text Online Free",
  "Free Morse Code Decoder to decode dots and dashes into readable text instantly. Supports International Morse Code, A–Z letters, 0–9 numbers, separators, continuous Morse analysis, character validation, and detailed decoding.",
  "/morse-code-decoder",
  [
    "morse code decoder",
    "decode morse code",
    "morse code to text",
    "morse decoder",
    "morse decoder online",
    "decode dots and dashes",
    "morse to text converter",
    "international morse code decoder",
    "morse code reader",
    "morse code interpreter",
    "free morse code decoder",
    "decode morse message",
    "morse alphabet decoder",
  ]
);

export default function MorseCodeDecoderPage() {
  const faqSchema = generateFAQSchema(faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Morse Code Decoder",
      url: "/morse-code-decoder",
    },
  ]);

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Morse Code Decoder",
    description:
      "Free online Morse Code Decoder for converting International Morse Code into readable text. Supports letters A-Z, numbers 0-9, separators, continuous Morse analysis, character validation, and instant decoding.",
    url: "/morse-code-decoder",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />

      <DecoderClient faqs={faqs} />
    </>
  );
}