import type { Metadata } from "next";
import {
  generatePageMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import ContactClient from "./contact.client";

const faqs = [
  {
    question: "Do you offer a public Morse code API?",
    answer:
      "We do not currently offer a public Morse code API. If you have a developer use case or would like API access in the future, use the contact form to describe what you need.",
  },
  {
    question: "Can I suggest a new feature or tool?",
    answer:
      "Yes. We welcome practical suggestions for Morse code tools, learning resources, accessibility improvements, and other website features. Explain the problem the idea would solve and how you would use it.",
  },
  {
    question: "How do I report an incorrect translation or technical problem?",
    answer:
      "Choose Bug Report or Content Correction and include the page URL, the exact text or Morse code you entered, the result you received, and a short description of what appears incorrect. This gives us enough context to investigate the issue.",
  },
];

export const metadata: Metadata = generatePageMeta(
  "Contact Morse Code Translator | Questions, Bugs & Feedback",
  "Contact Morse Code Translator with questions, bug reports, content corrections, feature suggestions, or general feedback. Learn what information to include so we can review your request efficiently.",
  "/contact",
  [
    "contact morse code translator",
    "morse code support",
    "morse code feedback",
    "report morse code bug",
    "morse code feature request",
    "morse code content correction",
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
