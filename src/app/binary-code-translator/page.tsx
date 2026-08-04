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
    question: "What is binary code and how does it work?",
    answer: "Binary code is a base-2 numbering system that uses only two digits, 0 and 1, to represent all data in computing. Each digit is called a bit. In ASCII encoding, which is the standard for English text, each character is represented by 8 bits (one byte). For example, the uppercase letter A is represented as 01000001 in binary, which equals the decimal number 65. All modern computers, smartphones, and digital devices process and store data using binary code at their most fundamental level.",
  },
  {
    question: "How is binary code different from Morse code?",
    answer: "While both systems use two states, they differ fundamentally in design and purpose. Morse code is a variable-length encoding system where common characters receive shorter codes for human communication efficiency. For instance, E is a single dot while Q is four elements. Binary code uses fixed-length 8-bit encoding (in ASCII), making it machine-friendly but impractical for human use. Morse code dates back to 1836 and was designed for telegraph communication, while binary code is the foundation of all modern digital computing developed in the 20th century.",
  },
  {
    question: "Can I convert any text to binary code?",
    answer: "Yes, this binary code translator can convert any text composed of standard ASCII characters into 8-bit binary representation. This includes all uppercase and lowercase English letters (A through Z, a through z), all ten digits (0 through 9), common punctuation marks, and special characters. The converter processes each character individually using its ASCII decimal value, converts that number to binary, and pads it to exactly 8 bits with leading zeros.",
  },
  {
    question: "What is ASCII and why is it used in binary encoding?",
    answer: "ASCII (American Standard Code for Information Interchange) is a character encoding standard first published in 1963. It assigns a unique numerical value from 0 to 127 to each character, which is then represented in binary. For example, A equals 65 (01000001 in binary), B equals 66 (01000010), and the space character equals 32 (00100000). ASCII was the dominant encoding standard for English text for decades and remains the foundation for more modern encodings like UTF-8, which extends ASCII to support international characters.",
  },
];

export const metadata: Metadata = generatePageMeta(
  "Binary Code Translator - Convert Text to Binary Code Online Free",
  "Free binary code translator using ASCII encoding standard. Convert any English text to 8-bit binary representation and decode binary back to text. Includes a complete ASCII reference table with educational explanations of how binary differs from Morse code.",
  "/binary-code-translator",
  [
    "binary code translator",
    "text to binary",
    "binary to text",
    "binary converter",
    "binary code converter",
    "ascii to binary",
    "binary alphabet",
  ]
);

export default function BinaryCodeTranslatorPage() {
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Binary Code Translator", url: "/binary-code-translator" },
  ]);
  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Binary Code Translator",
    description: "Free online binary code translator. Convert text to binary and binary to text using ASCII encoding.",
    url: "/binary-code-translator",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <BinaryClient />
    </>
  );
}
