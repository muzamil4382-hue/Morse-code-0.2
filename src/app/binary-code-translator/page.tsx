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
      "A binary code translator is a tool that converts readable text into binary digits (0s and 1s) and converts binary sequences back into text. This page focuses on common 8-bit character representations used for ASCII-compatible text conversion.",
  },
  {
    question: "How does text to binary conversion work?",
    answer:
      "Each supported character is assigned a numeric character code and represented with binary digits. For example, the uppercase letter A has the ASCII value 65, which is written as 01000001 in 8-bit binary.",
  },
  {
    question: "How do I convert binary to text?",
    answer:
      "Enter binary values in groups of 8 bits, separated by spaces. Each valid group is interpreted as a character code and converted into readable text by the translator.",
  },
  {
    question: "What is binary code?",
    answer:
      "Binary is a base-2 number system that uses only two digits: 0 and 1. Digital computers use binary states to store, process, and transmit information.",
  },
  {
    question: "What is ASCII?",
    answer:
      "ASCII, short for American Standard Code for Information Interchange, is a character encoding standard. Standard ASCII defines 128 character positions, including English letters, digits, punctuation, and control characters.",
  },
  {
    question: "What is the difference between ASCII and Unicode?",
    answer:
      "ASCII is a small character set originally designed for English text, while Unicode is a broader standard designed to represent characters from many writing systems. ASCII characters are included within Unicode.",
  },
  {
    question: "How is binary different from Morse code?",
    answer:
      "Binary represents information using 0s and 1s for digital systems, while Morse code represents characters with short and long signals commonly written as dots and dashes. Both encode information, but they were designed for different communication systems.",
  },
  {
    question: "Can I convert numbers and symbols to binary?",
    answer:
      "Yes. Standard English letters, digits, spaces, and many common punctuation characters can be represented as binary character codes.",
  },
  {
    question: "Why are binary characters often shown as 8 bits?",
    answer:
      "Standard ASCII uses 7 bits, allowing 128 possible values. Modern computer systems commonly organize data in 8-bit bytes, so character values are often displayed with a leading zero to create an 8-bit binary representation.",
  },
  {
    question: "Is this binary code translator free?",
    answer:
      "Yes. You can use this Binary Code Translator to convert supported text to binary and binary to text without creating an account.",
  },
  {
    question: "How many possible values can 8 bits represent?",
    answer:
      "Eight binary digits can represent 256 different values, from 0 through 255, because 2 raised to the power of 8 equals 256.",
  },
];

export const metadata: Metadata = generatePageMeta(
  "Binary Code Translator | Text to Binary & Binary to Text Converter",
  "Convert text to binary and binary to text with our free Binary Code Translator. Explore 8-bit binary, ASCII character encoding, binary values, examples, and how binary differs from Morse code.",
  "/binary-code-translator",
  [
    "binary code translator",
    "text to binary",
    "binary to text",
    "binary converter",
    "binary code",
    "ASCII binary",
    "ASCII converter",
    "binary alphabet",
    "binary encoding",
    "binary decoder",
    "8-bit binary",
    "binary translator",
    "binary encoder",
    "text to ASCII binary",
    "ASCII table",
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
      "Free online Binary Code Translator for converting supported text to binary and converting 8-bit binary sequences back into readable text.",
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