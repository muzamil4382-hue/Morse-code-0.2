import type { Metadata } from "next";
import {
  generatePageMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateSoftwareApplicationSchema,
} from "@/lib/seo";
import BinaryClient from "./binary.client";

const faqs = [
  {
    question: "What is a binary code translator?",
    answer:
      "A binary code translator is an online tool that converts plain text into 8-bit binary code and converts binary code back into readable text using the ASCII character encoding standard.",
  },
  {
    question: "How does text to binary conversion work?",
    answer:
      "Each character is converted into its ASCII decimal value and then represented as an 8-bit binary number. For example, the letter A becomes 01000001.",
  },
  {
    question: "How do I convert binary to text?",
    answer:
      "Enter binary values separated by spaces. Every valid 8-bit binary sequence is decoded into its corresponding ASCII character.",
  },
  {
    question: "What is binary code?",
    answer:
      "Binary code is the base-2 number system used by computers. It uses only the digits 0 and 1 to represent all digital information.",
  },
  {
    question: "What is ASCII?",
    answer:
      "ASCII (American Standard Code for Information Interchange) is a character encoding standard that assigns numerical values to English letters, digits, punctuation, and control characters.",
  },
  {
    question: "What is the difference between ASCII and Unicode?",
    answer:
      "ASCII supports 128 standard characters, while Unicode supports nearly every writing system in the world and includes ASCII as a subset.",
  },
  {
    question: "How is binary different from Morse code?",
    answer:
      "Binary is a machine-readable encoding system used by computers, while Morse code is a human communication system that represents letters using dots and dashes.",
  },
  {
    question: "Can I convert numbers and symbols to binary?",
    answer:
      "Yes. Numbers, punctuation marks, spaces, and standard ASCII symbols can all be converted into binary code.",
  },
  {
    question: "Why does ASCII binary use 8 bits?",
    answer:
      "Although standard ASCII originally used 7 bits, modern computers typically store characters in 8-bit bytes, making 8-bit binary the most common representation.",
  },
  {
    question: "Is this binary code translator free?",
    answer:
      "Yes. You can convert unlimited text to binary and binary to text online without creating an account or installing software.",
  },
];

export const metadata: Metadata = generatePageMeta(
  "Binary Code Translator | Free Text to Binary & Binary to Text Converter",
  "Free Binary Code Translator to instantly convert text to binary and binary to text using 8-bit ASCII encoding. Learn binary code, ASCII, Unicode, binary alphabet, binary encoding, and use our complete ASCII reference table.",
  "/binary-code-translator",
  [
    "binary code translator",
    "text to binary",
    "binary to text",
    "binary converter",
    "binary code",
    "ascii binary",
    "ascii converter",
    "binary alphabet",
    "binary encoding",
    "binary decoder",
    "8-bit binary",
    "binary translator",
    "binary encoder",
    "text to ascii binary",
    "ascii table",
    "character encoding",
  ]
);

export default function BinaryCodeTranslatorPage() {
  const faqSchema = generateFAQSchema(faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Binary Code Translator",
      url: "/binary-code-translator",
    },
  ]);

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Binary Code Translator",
    description:
      "Free online Binary Code Translator for converting text to binary and binary to text using ASCII character encoding.",
    url: "/binary-code-translator",
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

      <BinaryClient />
    </>
  );
}
