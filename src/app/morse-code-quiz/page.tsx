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
      "The quiz presents Morse code letters and asks you to identify the correct letter from four multiple-choice options. Difficulty progresses from a small beginner character set to the full A–Z alphabet. Question order and answer choices are randomized for each attempt, and the quiz gives immediate feedback with a score and accuracy percentage.",
  },
  {
    question: "Is the Morse code quiz suitable for beginners?",
    answer:
      "Yes. Beginners can start with the smallest character set and work upward through the levels after learning the Morse code alphabet. More experienced learners can use the higher levels for recognition practice. Because this is a character-recognition quiz, it works best as one part of broader visual, audio, and timing practice.",
  },
  {
    question: "Can I use the Morse code quiz to practice for amateur radio exams?",
    answer:
      "It can be useful supplementary practice for character recognition, but it should not be treated as a complete exam-preparation program. Amateur-radio requirements vary by country and licensing system. For broader training, combine the quiz with audio listening, alphabet review, and Morse timing practice.",
  },
  {
    question: "How can I improve my Morse code quiz score?",
    answer:
      "Learn the character patterns first, then practice recognition in short, repeatable sessions. Review mistakes instead of guessing from answer position, and gradually move to harder levels. Pair the quiz with the Morse code alphabet, sound practice, and timing guide so you develop recognition across both visual and audio formats.",
  },
];

export const metadata: Metadata = generatePageMeta(
  "Morse Code Quiz: Free Morse Code Test & Practice",
  "Take a free Morse code quiz with progressive difficulty, randomized questions, audio practice, score tracking, and A–Z character recognition. Use it alongside alphabet, timing, and listening practice to build reliable Morse code recall.",
  "/morse-code-quiz",
  [
    "morse code quiz",
    "morse code test",
    "morse code practice test",
    "morse code character recognition",
    "morse code training",
    "morse code practice",
    "learn morse code",
    "morse code alphabet quiz",
    "morse code listening practice",
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
      "Free interactive Morse code quiz for character recognition, with randomized questions, shuffled answers, optional audio, score tracking, and progressive difficulty from beginner sets to the full A–Z alphabet.",
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