import type { Metadata } from "next";
import CharacterReferencePage from "@/components/morse/character-reference-page";
import { numberData } from "@/lib/morse-characters";
import { generatePageMeta } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta(
  "Morse Code Numbers: 0–9 Chart, Patterns & Complete Guide",
  "Learn Morse code numbers from 0 to 9. See every number, dot and dash pattern, sound rhythm, examples, practice tips, FAQs, and a complete International Morse Code reference.",
  "/morse-code-numbers",
  [
    "morse code numbers",
    "numbers in morse code",
    "0 to 9 morse code",
    "morse code number chart",
    "morse numbers",
    "international morse code numbers",
    "morse code digits",
    "number morse code reference",
  ]
);

export default function MorseCodeNumbersPage() {
  return (
    <CharacterReferencePage
      type="number"
      data={numberData}
    />
  );
}