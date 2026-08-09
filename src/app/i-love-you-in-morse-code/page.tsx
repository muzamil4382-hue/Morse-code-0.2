import Link from "next/link";
import {
  WordPageTemplate,
  generateWordPageMeta,
} from "@/components/morse/word-page-template";

const config = {
  word: "I LOVE YOU",
  morseStr: ".. / .-.. / --- / ...- / . / -.-- / --- / ..-",
  title: "I Love You in Morse Code",
  metaTitle: "I Love You in Morse Code - Complete Guide",
  description:
    "Learn how to say 'I Love You' in Morse code with visual dot and dash patterns, letter-by-letter breakdown, and creative ways to express love using Morse code.",
  slug: "i-love-you-in-morse-code",

  faqs: [
    {
      question: "How do you say I love you in Morse code?",
      answer:
        "'I Love You' in Morse code is .. / .-.. / --- / ...- / . / -.-- / --- / ..- (I = dot-dot, L = dot-dash-dot-dot, O = dash-dash-dash, V = dot-dot-dot-dash, E = dot, Y = dash-dot-dash-dash, O = dash-dash-dash, U = dot-dot-dash). Letters are separated by spaces and words by forward slashes, following the International Morse Code standard ITU-R M.1677.",
    },
    {
      question: "Can I use Morse code for wedding vows or jewelry?",
      answer:
        "Absolutely! Morse code is increasingly popular in wedding jewelry, where the dot and dash patterns are represented by different sized beads or engravings. You could engrave the Morse code for 'I Love You' on a ring, pendant, or watch.",
    },
  ],

  relatedWords: [
    {
      word: "Love",
      slug: "love-in-morse-code",
      morse: ".-.. / --- / ...- / .",
    },
    {
      word: "Hello",
      slug: "hello-in-morse-code",
      morse: ".... . / .-.. .-.. / ---",
    },
    {
      word: "Hi",
      slug: "hi-in-morse-code",
      morse: ".... ..",
    },
    {
      word: "SOS",
      slug: "sos-morse-code",
      morse: "... --- ...",
    },
  ],
};

export const metadata = generateWordPageMeta(config);

export default function ILoveYouPage() {
  return (
    <WordPageTemplate config={config}>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        Expressing Love in the Language of Dots and Dashes
      </h2>

      <p className="text-slate-700 leading-relaxed mb-4">
        &quot;I Love You&quot; — three simple words that carry immense power
        across every language and culture. In Morse code, these words become a
        rhythmic pattern of dots and dashes that can be transmitted through
        sound, light, touch, or even written in a hidden message. Whether
        you&apos;re looking for a creative way to express your feelings,
        planning a unique gift, or simply fascinated by the intersection of
        romance and technology, learning how to say &quot;I Love You&quot; in
        Morse code adds a beautiful layer of meaning to an already powerful
        message. If you&apos;re new to Morse code, our{" "}
        <Link
          href="/learn-morse-code"
          className="text-green-600 underline"
        >
          guide to learning Morse code
        </Link>{" "}
        is a useful starting point.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        Letter-by-Letter Breakdown
      </h2>

      <p className="text-slate-700 leading-relaxed mb-4">
        The phrase &quot;I LOVE YOU&quot; consists of eight letters across two
        words. Here&apos;s how each letter translates:
      </p>

      <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
        <li>
          <strong>I</strong> ={" "}
          <span className="font-mono text-green-600">..</span> (two dots) — the
          simplest word, just two quick taps
        </li>

        <li>
          <strong>L</strong> ={" "}
          <span className="font-mono text-green-600">.-..</span>{" "}
          (dot-dash-dot-dot)
        </li>

        <li>
          <strong>O</strong> ={" "}
          <span className="font-mono text-green-600">---</span> (three dashes)
          — the longest letter, three sustained signals
        </li>

        <li>
          <strong>V</strong> ={" "}
          <span className="font-mono text-green-600">...-</span>{" "}
          (dot-dot-dot-dash) — the famous V-for-victory rhythm
        </li>

        <li>
          <strong>E</strong> ={" "}
          <span className="font-mono text-green-600">.</span> (single dot) —
          the shortest letter
        </li>

        <li>
          <strong>Y</strong> ={" "}
          <span className="font-mono text-green-600">-.--</span>{" "}
          (dash-dot-dash-dash)
        </li>

        <li>
          <strong>O</strong> ={" "}
          <span className="font-mono text-green-600">---</span> (three dashes)
        </li>

        <li>
          <strong>U</strong> ={" "}
          <span className="font-mono text-green-600">..-</span>{" "}
          (dot-dot-dash)
        </li>
      </ul>

      <p className="text-slate-700 leading-relaxed mb-4">
        If you want to review the individual letters used in this phrase, see
        our{" "}
        <Link
          href="/morse-code-alphabet"
          className="text-green-600 underline"
        >
          Morse Code Alphabet
        </Link>{" "}
        reference for the complete A–Z chart.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        Creative Ways to Use &quot;I Love You&quot; in Morse Code
      </h2>

      <p className="text-slate-700 leading-relaxed mb-4">
        Morse code has become a popular medium for expressing love in creative
        and personal ways. Here are some unique ideas for incorporating the
        Morse code for &quot;I Love You&quot; into your life:
      </p>

      <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
        <li>
          <strong>Jewelry:</strong> Morse code bracelets and necklaces use
          different-sized beads (small for dots, elongated for dashes) to spell
          out &quot;I Love You&quot; in a subtle, wearable form.
        </li>

        <li>
          <strong>Engravings:</strong> Have the Morse code engraved on the
          inside of a ring, the back of a watch, or a metal pendant.
        </li>

        <li>
          <strong>Hidden Notes:</strong> Write a love letter where &quot;I Love
          You&quot; appears in Morse code at the bottom — a secret message
          waiting to be discovered.
        </li>

        <li>
          <strong>Tattoos:</strong> The simple pattern of dots and dashes makes
          for a minimalist, meaningful tattoo design.
        </li>

        <li>
          <strong>Light Signals:</strong> Flash &quot;I Love You&quot; to
          someone using a flashlight at night — romantic and geeky in the best
          way.
        </li>

        <li>
          <strong>Gift Cards:</strong> Include a card with the Morse code
          pattern and challenge your partner to decode it.
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        Morse Code in Popular Culture and Romance
      </h2>

      <p className="text-slate-700 leading-relaxed mb-4">
        The use of Morse code as a romantic language has grown significantly in
        recent years. Social media is full of Morse code love messages,
        jewelry designers create entire collections around the concept, and the
        minimalist aesthetic of dots and dashes appeals to people who
        appreciate subtlety in expression. There&apos;s something deeply
        satisfying about encoding your most important message in a form that
        requires effort to decode — it makes the recipient feel that the
        message was crafted specifically for them.
      </p>

      <p className="text-slate-700 leading-relaxed">
        Use our{" "}
        <Link href="/" className="text-green-600 underline">
          free Morse code translator
        </Link>{" "}
        to practice saying &quot;I Love You&quot; in Morse code. You can adjust
        the speed and listen to the audio to get the rhythm just right. For
        more practice with Morse code audio and pronunciation, explore our{" "}
        <Link
          href="/morse-code-sounds"
          className="text-green-600 underline"
        >
          Morse Code Sounds
        </Link>{" "}
        resource. Try expressing other romantic phrases too — &quot;Love&quot;
        is{" "}
        <span className="font-mono text-green-600">
          .-.. / --- / ...- / .
        </span>
        , and &quot;Kiss&quot; is{" "}
        <span className="font-mono text-green-600">
          -.- / .. / ... / ...
        </span>
        .
      </p>
    </WordPageTemplate>
  );
}