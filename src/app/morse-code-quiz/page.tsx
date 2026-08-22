import type { Metadata } from "next";
import { Suspense } from "react";
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
    answer:
      "The quiz presents random Morse code letters and asks you to identify the correct letter from four multiple-choice options. Questions cover all 26 letters of the English alphabet using the International Morse Code standard. Each question is generated randomly, so every quiz session is unique. The quiz tracks your score, streak, and accuracy percentage in real time, providing immediate feedback after each answer.",
  },
  {
    question: "Is the Morse code quiz suitable for beginners?",
    answer:
      "Yes, the quiz is designed for all skill levels. Beginners who have studied the Morse code alphabet can test their recognition of individual letters. More experienced operators can challenge themselves by trying to answer quickly and maintain a high streak. The quiz focuses on letter recognition, which is the foundational skill needed before progressing to copying full words and sentences at speed.",
  },
  {
    question: "Can I use the Morse code quiz to practice for amateur radio exams?",
    answer:
      "This quiz helps build character recognition skills. While amateur radio requirements vary by country and examination system, being able to recognize individual Morse characters quickly is useful supplementary practice. Combine this visual quiz with audio practice using our Morse code tools for broader training.",
  },
  {
    question: "How can I improve my Morse code quiz score?",
    answer:
      "Start by learning the basic and most frequently encountered Morse code characters, then practice recognition regularly. Short, repeated practice sessions can help build recall. Use the Morse code alphabet reference, timing guide, and sound practice tools alongside the quiz to strengthen both visual and audio recognition.",
  },
];

export const metadata: Metadata = generatePageMeta(
  "Morse Code Quiz - Test Your Knowledge with Interactive Practice",
  "Take a free interactive Morse code quiz and test your character recognition skills with randomized questions, shuffled answers, score tracking, accuracy, and progressive difficulty levels.",
  "/morse-code-quiz",
  [
    "morse code quiz",
    "morse code test",
    "morse code practice test",
    "morse code game",
    "morse code training",
    "morse code knowledge check",
    "learn morse code",
    "morse code practice",
  ]
);

export default function MorseCodeQuizPage() {
  const faqSchema = generateFAQSchema(faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Morse Code Quiz", url: "/morse-code-quiz" },
  ]);

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Morse Code Quiz",
    description:
      "Free interactive Morse code quiz with randomized questions, shuffled answers, score tracking, accuracy statistics, and progressive difficulty levels.",
    url: "/morse-code-quiz",
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

      <Suspense
        fallback={
          <div className="min-h-[600px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Loading Morse Code Quiz...
              </p>
            </div>
          </div>
        }
      >
        <QuizClient />
      </Suspense>
    </>
  );
}