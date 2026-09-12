import type { Metadata } from "next";
import {
  generatePageMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import TimingClient from "./timing.client";

const faqs = [
  {
    question: "What are the standard Morse code timing rules?",
    answer:
      "International Morse Code uses proportional timing: a dot is 1 unit, a dash is 3 units, the gap between elements inside a character is 1 unit, the gap between characters is 3 units, and the gap between words is 7 units. These ratios remain the same as transmission speed changes.",
  },
  {
    question: "What is the ITU-R M.1677 Morse code standard?",
    answer:
      "ITU-R M.1677 is the International Telecommunication Union recommendation for International Morse Code. The current M.1677-1 version was approved in October 2009 and remains in force. It defines the internationally recognized Morse character system and operational provisions used in radiocommunication.",
  },
  {
    question: "How is Morse code speed measured in WPM?",
    answer:
      "Morse code speed is commonly measured in words per minute, or WPM. The reference word PARIS represents 50 timing units. Using standard timing, the duration of one dot in milliseconds can be calculated with the formula 1200 divided by the WPM speed.",
  },
  {
    question: "How long is a Morse code dot at 20 WPM?",
    answer:
      "At 20 WPM, one dot lasts 60 milliseconds because 1200 divided by 20 equals 60. A dash lasts 180 milliseconds, the gap inside a character is 60 milliseconds, the gap between characters is 180 milliseconds, and the standard word gap is 420 milliseconds.",
  },
  {
    question: "What is Farnsworth timing?",
    answer:
      "Farnsworth timing is a Morse code training method that sends the dots, dashes, and internal character spacing at a faster character speed while increasing the spaces between characters and words to create a slower overall speed. This gives learners time to identify each character without changing its internal rhythm.",
  },
  {
    question: "What WPM should beginners use for Morse code?",
    answer:
      "There is no single best starting speed for every learner. A practical approach is to use clear character timing while keeping the overall speed manageable with additional spacing. Farnsworth-style practice is commonly used for this purpose because it separates character recognition from the overall message speed.",
  },
  {
    question: "Why is the dash three times longer than a dot?",
    answer:
      "International Morse Code uses proportional timing. A dash is defined as three timing units while a dot is one timing unit. These consistent ratios help preserve recognizable character patterns when Morse code is sent at different speeds.",
  },
  {
    question: "What is the difference between standard timing and Farnsworth timing?",
    answer:
      "Standard timing scales the complete message according to the selected WPM speed. Farnsworth timing keeps individual characters at a chosen character speed and adds extra spacing between characters and words so the overall message is slower.",
  },
  {
    question: "Does Morse code timing affect decoding accuracy?",
    answer:
      "Yes. In live audio or signal transmission, timing is essential because receivers use the relative duration of signals and gaps to distinguish dots, dashes, characters, and words. Incorrect spacing can make a message harder to interpret.",
  },
  {
    question: "Can I practice Morse code timing online?",
    answer:
      "Yes. You can use the interactive WPM calculator on this page, play an audio example at different speeds, practice with the Morse Code Translator, listen to individual patterns on the Morse Code Sounds page, and test recognition with the Morse Code Quiz.",
  },
];

export const metadata: Metadata = generatePageMeta(
  "Morse Code Timing: WPM, Dot Duration, Spacing & Farnsworth",
  "Learn Morse code timing, WPM speed, dot and dash duration, character and word spacing, the PARIS timing standard, and Farnsworth practice. Use the calculator and timing chart to train accurately.",
  "/morse-code-timing",
  [
    "morse code timing",
    "morse code speed",
    "morse code WPM",
    "morse code dot duration",
    "morse code timing chart",
    "morse code timing rules",
    "Farnsworth timing",
    "Farnsworth method",
    "ITU-R M.1677",
    "Morse code dash duration",
    "Morse code WPM calculator",
    "Morse code speed calculator",
    "PARIS standard Morse code",
    "dot dash timing",
    "Morse code word gap",
    "Morse code letter spacing",
    "Morse code character spacing",
    "Morse code timing calculator",
    "Morse code dot dash duration",
    "Morse code PARIS timing",
  ]
);

export default function MorseCodeTimingPage() {
  const faqSchema = generateFAQSchema(faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Morse Code Timing",
      url: "/morse-code-timing",
    },
  ]);

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

      <TimingClient faqs={faqs} />
    </>
  );
}