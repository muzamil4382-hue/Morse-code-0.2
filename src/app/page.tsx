import type { Metadata } from "next";
import {
  generatePageMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateHowToSchema,
  generateSoftwareApplicationSchema,
  generateWebSiteSchema,
} from "@/lib/seo";
import HomeClient from "./home.client";

const faqs = [
  {
    question: "How do I use this Morse Code Translator?",
    answer:
      "Type or paste your message into the input box, and the translator instantly converts it into International Morse code using dots and dashes. You can also switch to Morse-to-text mode to decode a Morse code message back into readable text. The translation updates in real time as you type.",
  },
  {
    question: "Can I listen to Morse code audio?",
    answer:
      "Yes. The translator includes audio playback that turns Morse code into audible dots and dashes. You can adjust settings such as speed, tone frequency, and volume. A visual flash mode is also available for practicing Morse code as light signals.",
  },
  {
    question: "Is this Morse Code Translator free?",
    answer:
      "Yes. This Morse Code Translator is free to use and does not require registration. You can convert text to Morse code, decode Morse code to text, listen to audio, use visual flash mode, copy your results, and download supported output files.",
  },
  {
    question: "What is the standard Morse code timing?",
    answer:
      "International Morse code uses a standard timing ratio. A dot is one time unit, a dash is three units, the gap between parts of the same character is one unit, the gap between characters is three units, and the gap between words is seven units. Beginners can practice at slower effective speeds while maintaining correct character rhythm.",
  },
  {
    question: "Can I download Morse code as a WAV audio file?",
    answer:
      "Yes. After converting your message, you can download the generated Morse code audio as a WAV file. The audio is created using the speed and sound settings selected in the translator.",
  },
  {
    question:
      "What is the difference between International Morse code and American Morse code?",
    answer:
      "International Morse code is the globally recognized system used for most modern Morse code communication and learning. American Morse code is an earlier version that uses different patterns and timing for some letters, numbers, and punctuation. This translator focuses on International Morse code.",
  },
  {
    question: "How can I learn Morse code effectively?",
    answer:
      "Consistent listening and recognition practice are important for learning Morse code. Popular approaches include the Koch method, which introduces characters gradually, and Farnsworth timing, which uses additional spacing between characters. You can also use the Morse Code Alphabet, timing guide, sounds page, and quiz on this website for practice.",
  },
  {
    question: "Where is Morse code still used today?",
    answer:
      "Morse code is still used and practiced by amateur radio operators around the world. It also remains useful for emergency signaling, visual communication, education, accessibility projects, and as a backup communication method in situations where simple on-off signals can be transmitted by sound or light.",
  },
  {
    question: "What characters does this Morse Code Translator support?",
    answer:
      "The translator supports the 26 English letters from A to Z, numbers from 0 to 9, spaces, and a range of commonly used punctuation symbols supported by International Morse code.",
  },
  {
    question: "Can I copy or share my Morse code translation?",
    answer:
      "Yes. You can copy your translated Morse code to the clipboard and use it anywhere. Depending on the available options in the translator, you can also download your result or share the generated translation.",
  },
];

const howToSteps = [
  {
    name: "Enter Your Text or Morse Code",
    text: "Type or paste your message into the input area. You can translate normal text into Morse code or switch modes to decode dots and dashes into readable text.",
  },
  {
    name: "Get an Instant Translation",
    text: "The Morse Code Translator converts your message in real time using International Morse code patterns for supported letters, numbers, and symbols.",
  },
  {
    name: "Listen, Copy, Download, or Practice",
    text: "Play the Morse code audio, adjust available settings, use visual flash mode, copy your translation, or download supported output files.",
  },
];

export const metadata: Metadata = generatePageMeta(
  "Morse Code Translator - Translate Text to Morse Code Online",
  "Use our free Morse Code Translator to instantly convert text to Morse code and decode dots and dashes. Listen to Morse code, adjust speed and sound settings, copy or download your results, and practice online.",
  "/",
  [
    "morse code translator",
    "morse translator",
    "text to morse code",
    "morse code to text",
    "morse code decoder",
    "morse code converter",
    "translate morse code",
  ]
);

export default function HomePage() {
  const faqSchema = generateFAQSchema(faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
  ]);

  const howToSchema = generateHowToSchema(howToSteps);

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Morse Code Translator",
    description:
      "Free online Morse Code Translator for translating text to Morse code and decoding Morse code to text. Includes audio playback, visual flash mode, adjustable sound settings, copy tools, downloads, and International Morse code support.",
    url: "/",
  });

  const websiteSchema = generateWebSiteSchema({
    name: "Morse Code Translator",
    description:
      "A free online Morse Code Translator with text-to-Morse conversion, Morse-to-text decoding, audio playback, learning guides, alphabet and number references, timing information, practice tools, and quizzes.",
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
          __html: JSON.stringify(howToSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      <HomeClient faqs={faqs} />
    </>
  );
}