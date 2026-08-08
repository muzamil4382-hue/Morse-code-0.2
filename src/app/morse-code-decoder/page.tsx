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
      "A Morse code decoder converts International Morse code (dots, dashes, and separators) into readable text. It follows the International Morse Code standard maintained by the International Telecommunication Union (ITU). This decoder is designed for accurate Morse-to-text conversion with separator detection, character analysis, and educational explanations.",
  },
  {
    question: "How does a Morse code decoder work?",
    answer:
      "A Morse code decoder reads each sequence of dots and dashes, separates individual characters using spaces or other supported delimiters, then compares every sequence with the International Morse Code table. Matching symbols are converted into readable letters, numbers, punctuation marks, or spaces.",
  },
  {
    question: "What is the difference between a Morse code decoder and a Morse code translator?",
    answer:
      "A Morse code translator performs both text-to-Morse and Morse-to-text conversion. A dedicated Morse code decoder focuses only on converting Morse code into readable text while providing validation, separator detection, and character-by-character analysis.",
  },
  {
    question: "Which Morse code standard does this decoder use?",
    answer:
      "This decoder uses International Morse Code as defined by the International Telecommunication Union (ITU-R M.1677). It supports the globally accepted encoding system used in amateur radio, aviation, maritime communication, emergency signaling, and educational resources.",
  },
  {
    question: "Can I decode Morse code without spaces?",
    answer:
      "Yes. The decoder includes a brute-force mode for Morse code without separators. However, decoding continuous Morse code can be ambiguous because the same sequence may represent multiple valid letter combinations. Proper spacing always produces more accurate results.",
  },
  {
    question: "Why does my Morse code produce incorrect results?",
    answer:
      "Incorrect decoding usually happens because of invalid Morse symbols, missing spaces, incorrect separator selection, or typing errors. Verify that you are using periods (.) for dots, hyphens (-) for dashes, and standard International Morse Code spacing.",
  },
  {
    question: "Can this decoder decode numbers and punctuation?",
    answer:
      "Yes. Besides the English alphabet (A–Z), this Morse Code Decoder supports numbers (0–9), common punctuation marks, and procedural symbols defined in the International Morse Code specification.",
  },
  {
    question: "Who invented Morse code?",
    answer:
      "Samuel Morse and Alfred Vail developed the original Morse code system during the 1830s and 1840s for telegraph communication. International Morse Code later standardized many of the symbols used around the world today.",
  },
  {
    question: "Is this Morse code decoder free to use?",
    answer:
      "Yes. You can decode unlimited Morse code online without creating an account, downloading software, or paying any subscription fees.",
  },
  {
    question: "Can I use this decoder on mobile devices?",
    answer:
      "Yes. The decoder is fully responsive and works on desktops, laptops, tablets, and smartphones using any modern web browser.",
  },
];

export const metadata: Metadata = generatePageMeta(
  "Morse Code Decoder | Decode Morse Code to Text Online (Free)",
  "Free online Morse Code Decoder that instantly converts dots and dashes into readable text using the International Morse Code (ITU) standard. Decode Morse code with separator detection, character analysis, educational explanations, and accurate Morse-to-text conversion.",
  "/morse-code-decoder",
  [
    "morse code decoder",
    "decode morse code",
    "morse to text",
    "morse code reader",
    "morse code interpreter",
    "morse decoder",
    "translate morse code",
    "decode dots and dashes",
    "international morse code",
    "morse decoder online",
    "text decoder",
    "international morse decoder",
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
      "Free online Morse Code Decoder that converts International Morse Code into readable text with separator detection, character analysis, and educational explanations.",
    url: "/morse-code-decoder",
  });

  return (
        <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* SoftwareApplication Schema */}
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
