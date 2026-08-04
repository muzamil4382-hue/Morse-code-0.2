import type { Metadata } from "next";
import {
  generatePageMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import LettersClient from "./letters.client";

const faqs = [
  {
    question: "What is the difference between Morse code letters and numbers?",
    answer: "Morse code letters use combinations of one to four dots and dashes, while Morse code numbers all use exactly five elements each. The number sequences follow a logical pattern: 1 is .---- (one dot followed by four dashes), 2 is ..--- (two dots and three dashes), and this pattern continues up to 0, which is ----- (five dashes). Letters, by contrast, were assigned based on English letter frequency, with the most common letters like E (single dot) and T (single dash) getting the shortest codes to maximize transmission efficiency.",
  },
  {
    question: "How can I memorize Morse code letters faster?",
    answer: "The most effective technique is the Koch method, which teaches characters at full speed from the start rather than starting slowly. Begin with just two characters and practice copying them at 15 to 20 WPM until you achieve 90 percent accuracy before adding a third character. Audio-based practice is significantly more effective than visual memorization because Morse code is fundamentally an auditory skill. Mnemonic devices, such as associating letter shapes with their dot-dash patterns, can supplement but should not replace audio training.",
  },
  {
    question: "Why do some Morse code letters sound similar and how can I tell them apart?",
    answer: "Certain letter pairs share similar rhythmic patterns and can be confused by beginners. Common confusions include S (...) and H (....), B (-...) and 6 (-....), and D (-..) and 5 (.....). The key to distinguishing them is to focus on the total number of elements and the starting element. S has exactly three dots while H has four. D starts with a dash followed by two dots, while 5 is five dots. Consistent practice at higher speeds (15+ WPM) actually makes these distinctions easier because your brain learns to recognize the overall rhythm rather than counting individual elements.",
  },
  {
    question: "Which Morse code letters are most important to learn first?",
    answer: "According to English letter frequency analysis, the six most important letters to learn first are E (.), T (-), A (.-), O (---), I (..), and N (-.). Together, these six letters account for approximately 50 percent of all letters used in standard English text. Learning these high-frequency letters first means you can already decode half of any typical message. After these, prioritize S (...), H (....), and R (.-.) to bring your coverage to about 65 percent of English text.",
  },
];

export const metadata: Metadata = generatePageMeta(
  "Morse Code Letters A-Z with Audio, Memory Tips & Frequency Data",
  "Interactive reference for all 26 International Morse code letters with click-to-hear audio playback. Includes English letter frequency data, proven Koch method memorization tips, and common confusion pairs like S/H and B/6 that trip up beginners.",
  "/morse-code-letters",
  [
    "morse code letters",
    "morse code letter",
    "morse code a-z guide",
    "learn morse code letters",
    "morse code letter frequency",
    "morse code pronunciation guide",
  ]
);

export default function MorseCodeLettersPage() {
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Morse Code Letters", url: "/morse-code-letters" },
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
      <LettersClient />
    </>
  );
}
