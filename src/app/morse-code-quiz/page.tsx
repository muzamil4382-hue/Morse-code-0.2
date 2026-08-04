import type { Metadata } from "next";
import {
  generatePageMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateSoftwareApplicationSchema,
} from "@/lib/seo";
import QuizClient from "./quiz.client";

const faqs = [
  {
    question: "What types of questions are in the Morse code quiz?",
    answer: "The quiz presents random Morse code letters and asks you to identify the correct letter from four multiple-choice options. Questions cover all 26 letters of the English alphabet using the International Morse Code standard. Each question is generated randomly, so every quiz session is unique. The quiz tracks your score, streak, and accuracy percentage in real time, providing immediate feedback after each answer.",
  },
  {
    question: "Is the Morse code quiz suitable for beginners?",
    answer: "Yes, the quiz is designed for all skill levels. Beginners who have studied the Morse code alphabet can test their recognition of individual letters. More experienced operators can challenge themselves by trying to answer quickly and maintain a high streak. The quiz focuses on letter recognition, which is the foundational skill needed before progressing to copying full words and sentences at speed.",
  },
  {
    question: "Can I use the Morse code quiz to practice for amateur radio exams?",
    answer: "This quiz helps build the character recognition skill that is essential for amateur radio licensing exams in many countries. While actual ham radio exams typically require copying Morse code at specific speeds using audio, being able to instantly recognize individual characters visually is a valuable supplementary skill. Combine this visual quiz with audio practice using our Morse code translator tool for the most effective exam preparation.",
  },
  {
    question: "How can I improve my Morse code quiz score?",
    answer: "Start by memorizing the most common letters first: E, T, A, O, I, N, S, and H, which together account for about 65 percent of English text. Use the memory tips and pronunciation guides on our Morse Code Letters page to build associations. Practice daily in short 10 to 15 minute sessions rather than occasional long sessions, as spaced repetition is proven more effective for building long-term recall.",
  },
];

export const metadata: Metadata = generatePageMeta(
  "Morse Code Quiz - Test Your Knowledge with Interactive Practice",
  "Free interactive Morse code quiz to test and improve your character recognition skills. Random multiple-choice questions covering all 26 letters with real-time score tracking, streak counter, and accuracy percentage.",
  "/morse-code-quiz",
  ["morse code quiz", "morse code test", "morse code practice test", "morse code game", "morse code training", "morse code knowledge check"]
);

export default function MorseCodeQuizPage() {
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Morse Code Quiz", url: "/morse-code-quiz" },
  ]);
  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Morse Code Quiz",
    description: "Free interactive Morse code quiz for testing and improving character recognition skills.",
    url: "/morse-code-quiz",
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
      <QuizClient />
    </>
  );
}
