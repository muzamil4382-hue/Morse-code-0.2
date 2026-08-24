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
      "Type or paste your message into the input box, and the translator instantly converts text to Morse code using dots and dashes. You can also switch to Morse-to-text mode to decode a Morse code message back into readable text. The translation updates in real time as you type.",
  },
  {
    question: "Is this a free Morse code converter?",
    answer:
      "Yes. This free Morse code converter lets you translate text to Morse code and decode Morse code back into text without registration. You can also listen to the generated audio, adjust available settings, copy your result, and download supported output files.",
  },
  {
    question: "Can I convert text to Morse code instantly?",
    answer:
      "Yes. Simply enter your message into the translator, and your text is converted to International Morse code instantly. Each supported letter, number, and symbol is translated into the correct combination of dots and dashes.",
  },
  {
    question: "What is a Morse translator?",
    answer:
      "A Morse translator is an online tool that converts normal text into Morse code or decodes Morse code back into readable text. This tool supports both text-to-Morse conversion and Morse-to-text decoding.",
  },
  {
    question: "Can I listen to Morse code audio?",
    answer:
      "Yes. The translator includes audio playback that turns Morse code into audible dots and dashes. You can adjust settings such as speed, tone frequency, and volume. A visual flash mode is also available for practicing Morse code as light signals.",
  },
  {
    question: "What is the standard Morse code timing?",
    answer:
      "International Morse code uses a standard timing ratio. A dot is one time unit, a dash is three units, the gap between parts of the same character is one unit, the gap between characters is three units, and the gap between words is seven units.",
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
      "Morse code is still used and practiced by amateur radio operators around the world. It is also useful for emergency signaling, visual communication, education, accessibility projects, and situations where simple on-off signals can be transmitted by sound or light.",
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
    text: "Type or paste your message into the input area. You can convert normal text to Morse code or switch modes to decode dots and dashes into readable text.",
  },
  {
    name: "Get an Instant Translation",
    text: "The Morse Code Translator instantly converts your message using International Morse code patterns for supported letters, numbers, and symbols.",
  },
  {
    name: "Listen, Copy, Download, or Practice",
    text: "Play the Morse code audio, adjust available settings, use visual flash mode, copy your translation, or download supported output files.",
  },
];

export const metadata: Metadata = generatePageMeta(
  "Morse Code Translator – Translate Text to Morse Code",
  "Free Morse Code Translator to convert text to Morse code and decode Morse code to text instantly. Includes audio, speed controls, flash signals, copy and download tools.",
  "/",
  [
    "morse code translator",
    "morse translator",
    "text to morse code",
    "morse code converter",
    "morse code to text",
    "morse code decoder",
    "translate text to morse code",
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
      "A free online Morse Code Translator and Morse code converter for translating text to Morse code and decoding Morse code to text. Includes audio playback, visual flash mode, adjustable sound settings, copy tools, downloads, and International Morse code support.",
    url: "/",
  });

  const websiteSchema = generateWebSiteSchema({
    name: "Morse Code Translator",
    description:
      "A free online Morse Code Translator for converting text to Morse code and decoding Morse code to text, with audio playback, learning guides, alphabet references, timing information, practice tools, and quizzes.",
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