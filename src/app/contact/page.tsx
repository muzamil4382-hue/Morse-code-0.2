import type { Metadata } from "next";
import {
  generatePageMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import ContactClient from "./contact.client";

const faqs = [
  {
    question: "Do you offer a Morse code API for developers?",
    answer: "We do not currently offer a public Morse code API. However, we have received numerous requests from developers who want to integrate Morse code translation into their applications, and we are actively evaluating the feasibility of releasing a REST API in the future. If you have a specific use case, please let us know through the contact form so we can prioritize accordingly.",
  },
  {
    question: "Can I suggest a new feature or tool?",
    answer: "Absolutely. We actively develop new features based on user feedback. Past suggestions that became features include the visual flash mode, WAV audio download, and the binary code translator. Submit your ideas through the contact form and our development team will review them during our next planning cycle.",
  },
  {
    question: "How do I report a bug or incorrect translation?",
    answer: "If you find an error in translation output, a broken feature, or any other technical issue, please use the contact form and include a detailed description of the problem, the text you entered, the output you received, and the browser you are using. We investigate and fix all reported bugs, typically within one to two business days.",
  },
];

export const metadata: Metadata = generatePageMeta(
  "Contact Us - Morse Code Translator",
  "Get in touch with the Morse Code Translator team. Report bugs, suggest features, ask questions, or provide feedback. We typically respond within 24 to 48 hours.",
  "/contact",
  [
    "contact morse code translator",
    "morse code feedback",
    "morse code support",
    "report bug",
    "suggest feature",
  ]
);

export default function ContactPage() {
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ]);

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
      <ContactClient />
    </>
  );
}
