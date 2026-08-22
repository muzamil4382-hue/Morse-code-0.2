import type { Metadata } from "next";
import CharacterReferencePage from "@/components/morse/character-reference-page";
import { letterData } from "@/lib/morse-characters";
import { generatePageMeta } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta(
  "Morse Code Alphabet: A–Z Chart, Letters, Sounds & Complete Guide",
  "Learn the complete Morse code alphabet from A to Z. See every letter, dot and dash pattern, sound rhythm, examples, practice tips, FAQs, and an interactive Morse code reference.",
  "/morse-code-alphabet",
  [
    "morse code alphabet",
    "morse alphabet",
    "morse code letters",
    "morse code chart",
    "A to Z morse code",
    "international morse code alphabet",
    "letters in morse code",
    "morse code reference",
  ]
);

export default function MorseCodeAlphabetPage() {
  return (
    <CharacterReferencePage
      type="letter"
      data={letterData}
    />
  );
}