import type { Metadata } from "next";
import {
  generatePageMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import AlphabetClient from "./alphabet.client";

const faqs = [
  {
    question: "How many letters are in the Morse Code Alphabet?",
    answer:
      "The International Morse Code Alphabet consists of 26 letters, from A to Z. Each letter is represented by a unique combination of dots and dashes, ranging from a single element (E = one dot) to four elements (Q = dash-dash-dot-dash). In addition to these 26 letters, the complete Morse code system includes 10 numerals (0 through 9) and various punctuation marks and procedural signals, but the alphabet itself refers specifically to the A through Z letter encodings.",
  },
  {
    question: "What is the easiest letter in the Morse Code Alphabet to learn?",
    answer:
      "The letter E is the easiest because it uses only a single dot (.). The letter T is the second easiest with a single dash (-). After that, letters with just two elements are relatively simple: I (..), M (--), A (.-), and N (-.). These six letters are excellent starting points for beginners because they form the foundation of efficient Morse code communication and appear most frequently in English text.",
  },
  {
    question: "What is the hardest letter in the Morse Code Alphabet?",
    answer:
      "Letters with four elements are generally considered the hardest to learn because they require remembering longer sequences. These include Q (--.-), J (.---), Y (-.--), and Z (--..). Among these, Q and Y are often cited as the most challenging because their dot-dash patterns do not follow obvious intuitive rules. However, with consistent practice using audio methods and the Koch method, even these complex letters become second nature.",
  },
  {
    question: "How long does it take to learn the entire Morse Code Alphabet?",
    answer:
      "Most learners can memorize the 26 Morse Code letters within one to two weeks of consistent daily practice. However, memorization is different from listening fluency. Developing the ability to copy Morse code at 10 words per minute (WPM) can take several weeks of regular practice, while reaching 20 WPM or higher generally requires more sustained training. Audio-based methods such as the Koch method and Farnsworth timing can help learners build listening fluency by focusing on recognizing complete Morse characters rather than counting individual dots and dashes.",
  },
  {
    question: "What is the difference between a dot and a dash in the Morse Code Alphabet?",
    answer:
      "In the Morse Code Alphabet, a dot (also called a dit) is the shortest signal unit, while a dash (also called a dah) is exactly three times longer than a dot. The dash is not simply a longer version of the dot; it is precisely three dot-lengths in duration. The gap between dots and dashes within a single letter is one dot-length. The gap between complete letters is three dot-lengths, and the gap between words is seven dot-lengths. This precise timing ratio is what makes Morse code readable and distinguishable.",
  },
  {
    question: "Is the Morse Code Alphabet the same in every country?",
    answer:
      "Yes, the Morse Code Alphabet is standardized internationally. The International Morse Code alphabet was standardized by the International Telecommunication Union (ITU) and is documented in ITU-R M.1677. This means that the letter A is .- everywhere in the world, whether you are in the United States, Europe, Asia, or anywhere else. This universal standardization is one of the greatest strengths of Morse code, as it allows people from different countries to communicate without language barriers.",
  },
  {
    question: "Can I learn the Morse Code Alphabet by myself without a teacher?",
    answer:
      "Absolutely. Many Morse code operators are entirely self-taught. The most effective self-study approach is to use audio-based learning methods rather than visual charts alone. Start by learning two letters at full speed using the Koch method, and add a new letter only when you can copy the current set at 90 percent accuracy. Free online tools, mobile apps, and practice oscillators make self-study highly accessible. The key is consistent daily practice, even if only for 15 to 20 minutes per session.",
  },
  {
    question: "What is the most commonly used letter in Morse Code?",
    answer:
      "The letter E (.) is the most commonly used letter in both English text and Morse code communication. Studies of English letter frequency show that E accounts for approximately 12.7 percent of all letters used. This is precisely why E was assigned the shortest possible code, a single dot, in the International Morse Code Alphabet. The next most common letters are T (-), A (.-), O (---), I (..), N (-.), S (...), and H (....), which together with E make up roughly 65 percent of all English text.",
  },
  {
    question: "How is the Morse Code Alphabet used in emergency situations?",
    answer:
      "In emergency situations, the Morse Code Alphabet is used through multiple signaling methods. The most famous example is SOS (... --- ...), the international distress signal. Morse code can be transmitted by flashlight, whistle blasts, tapping on surfaces, visual flags, or any method that can produce two distinct signals. Pilots, sailors, hikers, and military personnel are trained to recognize and send basic Morse signals. The simplicity of the alphabet means that even with minimal training, anyone can learn to signal for help using dots and dashes.",
  },
  {
    question: "Why was the letter E assigned a single dot in the Morse Code Alphabet?",
    answer:
      "The letter E was assigned a single dot (.) because it is the most frequently used letter in the English language. Samuel Morse and Alfred Vail designed the code with efficiency in mind, assigning the shortest codes to the most common letters. This frequency-based design means that in typical communication, the average number of dots and dashes per character is minimized, making transmission faster and reducing the chance of errors. This same principle explains why T gets a single dash and why uncommon letters like Q and J have four-element codes.",
  },
];

export const metadata: Metadata = generatePageMeta(
  "Morse Code Alphabet | Complete A–Z Chart, Letters & Audio",
  "Learn the complete Morse Code Alphabet with an interactive A–Z chart, audio pronunciation, letter examples, and the International Morse Code (ITU) standard. Practice every letter from A to Z for free.",
  "/morse-code-alphabet",
  [
    "morse code alphabet",
    "morse alphabet",
    "international morse code alphabet",
    "morse code a-z",
    "morse code chart",
    "morse code symbols",
    "morse code reference chart",
  ]
);

export default function MorseCodeAlphabetPage() {
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Morse Code Alphabet", url: "/morse-code-alphabet" },
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
      <AlphabetClient faqs={faqs} />
    </>
  );
}