import type { Metadata } from "next";
import { generatePageMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo";
import TimingClient from "./timing.client";

const faqs = [
  {
    question: "What is the ITU-R M.1677 standard for Morse code timing?",
    answer: "ITU-R M.1677 is the International Telecommunication Union recommendation that defines the standard timing for Morse code transmission. It specifies that a dot equals 1 unit of time, a dash equals 3 units, the gap between parts of the same letter equals 1 unit, the gap between letters equals 3 units, and the gap between words equals 7 units. This standard was established to ensure consistent and reliable Morse code communication across all countries and communication systems.",
  },
  {
    question: "What is Farnsworth timing in Morse code?",
    answer: "Farnsworth timing is a training method developed by Donald Farnsworth that sends individual characters at a higher effective speed while adding extra time between characters. For example, if you set 15 WPM character speed with 5 WPM overall speed, each letter is sent at 15 WPM timing but the gap between letters is stretched so the overall speed averages 5 WPM. This helps learners recognize the rhythm of each character at a realistic speed without being overwhelmed by the pace of letter-to-letter transitions.",
  },
  {
    question: "How is Morse code speed measured in WPM?",
    answer: "Morse code speed is measured in words per minute (WPM) using the reference word PARIS, which contains exactly 50 dot units of timing (10 dots + 4 dashes + 14 intra-character gaps + 9 inter-character gaps = 50 units). One WPM equals 50 dot units per minute, so the dot duration at N WPM is 1.2/N seconds. At 20 WPM, a single dot lasts 60 milliseconds. This standardized measurement allows operators worldwide to calibrate their equipment and practice at consistent speeds.",
  },
  {
    question: "What WPM speed should I start learning Morse code?",
    answer: "Most Morse code instructors recommend starting at 15-20 WPM character speed using the Farnsworth method with an effective speed of 5-10 WPM. The key insight from the Koch method is that you should learn characters at your target speed from the beginning, because learning at slow speeds and then trying to increase later leads to counting dots and dashes instead of developing instant pattern recognition. Starting at 15-20 WPM character speed trains your brain to recognize the sound pattern rather than counting individual elements.",
  },
  {
    question: "How long is a dot at different WPM speeds?",
    answer: "The dot duration is calculated as 1.2 divided by the WPM speed, expressed in seconds. At 5 WPM a dot is 240ms, at 10 WPM it is 120ms, at 15 WPM it is 80ms, at 20 WPM it is 60ms, at 25 WPM it is 48ms, and at 30 WPM it is 40ms. These precise timings are critical for both sending and receiving — even small deviations from standard timing can make characters difficult to decode, especially at higher speeds above 20 WPM.",
  },
];

export const metadata: Metadata = generatePageMeta(
   "Morse Code Timing - ITU-R M.1677 Standard, Farnsworth & WPM Reference",
  "Complete Morse code timing reference with ITU-R M.1677 standard, visual timing diagrams, Farnsworth method explanation, and WPM speed conversion table from 5 to 30 WPM with exact millisecond durations.",
  "/morse-code-timing",
  ["morse code timing", "morse code speed", "wpm morse code", "farnsworth timing", "itu morse code standard", "morse code dot duration", "morse code wpm chart"]
);

export default function MorseCodeTimingPage() {
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Morse Code Timing", url: "/morse-code-timing" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <TimingClient faqs={faqs} />
    </>
  );
}
