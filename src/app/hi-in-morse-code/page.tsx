import Link from "next/link";
import { WordPageTemplate, generateWordPageMeta } from "@/components/morse/word-page-template";

const config = {
  word: "HI",
  morseStr: ".... ..",
  title: "Hi in Morse Code",
  metaTitle: "Hi in Morse Code (.... ..) - Quick Reference",
  description: "Learn how to say Hi in Morse code (.... ..). Complete letter-by-letter breakdown, audio pronunciation guide, and practice tips for this simple two-letter Morse code greeting.",
  slug: "hi-in-morse-code",
  faqs: [
    { question: "What is Hi in Morse code?", answer: "'Hi' in Morse code is .... .. (four dots for H, followed by two dots for I, with a single space between letters). It is one of the simplest Morse code words because both letters consist entirely of dots with no dashes. The six-dot sequence has a distinctive staccato rhythm that makes it easy to recognize by ear, making it an excellent practice word for Morse code beginners." },
  ],
  relatedWords: [
    { word: "Hello", slug: "hello-in-morse-code", morse: ".... . / .-.. .-.. / ---" },
    { word: "Help", slug: "help-in-morse-code", morse: ".... . .-.. .--." },
    { word: "I Love You", slug: "i-love-you-in-morse-code", morse: ".. / .-.. / --- / ...- / . / -.-- / --- / ..-" },
    { word: "Love", slug: "love-in-morse-code", morse: ".-.. / --- / ...- / ." },
  ],
};

export const metadata = generateWordPageMeta(config);

export default function HiPage() {
  return (
    <WordPageTemplate config={config}>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">The Simplest Morse Code Greeting</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        &quot;Hi&quot; is one of the shortest and simplest greetings in the English language, and its Morse code
        representation is equally elegant. Consisting of just six dots — four for H and two for I — the word &quot;hi&quot;
        in Morse code (<span className="font-mono text-green-600">.... ..</span>) is one of the first words Morse code
        beginners learn. It&apos;s quick to transmit, easy to remember, and instantly recognizable.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">Letter Breakdown</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        The word &quot;HI&quot; contains just two letters, both made entirely of dots — no dashes needed:
      </p>
      <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
        <li><strong>H</strong> = <span className="font-mono text-green-600">....</span> (four dots) — Think &quot;hurry&quot; — four quick taps, like someone running</li>
        <li><strong>I</strong> = <span className="font-mono text-green-600">..</span> (two dots) — Think &quot;it&quot; — two quick taps</li>
      </ul>
      <p className="text-slate-700 leading-relaxed mb-4">
        Because both letters are all dots, &quot;hi&quot; has a distinctive staccato rhythm — six short, evenly-spaced
        signals with a brief pause between the H (four dots) and I (two dots). This makes it sound almost like a
        cheerful little tap dance. The complete absence of dashes means it&apos;s one of the fastest words to send
        in Morse code.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">Why &quot;Hi&quot; Is Great for Beginners</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        If you&apos;re just starting to learn Morse code, &quot;hi&quot; is the perfect practice word for several reasons.
        First, it uses only dots — no dashes to worry about. Second, it uses two of the most common letters in English
        (H is the 8th most common, I is the 5th most common). Third, it&apos;s a real, meaningful word, so you
        get the satisfaction of sending an actual message rather than just random letters.
      </p>
      <p className="text-slate-700 leading-relaxed mb-4">
        For a complete letter reference, visit our <Link href="/morse-code-letters" className="text-green-600 underline">A-Z letters guide</Link>. In the context of amateur radio, &quot;hi&quot; is sometimes used as an abbreviation for laughter. An operator
        might send &quot;hi hi&quot; to indicate they&apos;re joking or amused, similar to typing &quot;LOL&quot; in
        text messaging. This usage dates back to the early days of radio when operators needed quick ways to express
        emotion in their transmissions.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">Using &quot;Hi&quot; in Practice</h2>
      <p className="text-slate-700 leading-relaxed">
        Practice sending &quot;hi&quot; with our{" "}
        <Link href="/morse-code-translator" className="text-green-600 underline">Morse code translator</Link>.
        Start at a slow speed and listen carefully to the rhythm of four dots, pause, two dots. Once you can
        recognize it instantly by ear, try increasing the speed. You can also practice with longer greetings
        like <Link href="/hello-in-morse-code" className="text-green-600 underline">&quot;hello&quot;</Link> which
        builds on the same H letter you already know. Check out our{" "}
        <Link href="/morse-code-quiz" className="text-green-600 underline">interactive quiz</Link> to test your
        recognition of individual letters including H and I.
      </p>
    </WordPageTemplate>
  );
}
