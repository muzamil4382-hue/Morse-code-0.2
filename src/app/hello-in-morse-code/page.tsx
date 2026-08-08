import Link from "next/link";
import { WordPageTemplate, generateWordPageMeta } from "@/components/morse/word-page-template";

const config = {
  word: "HELLO",
  morseStr: ".... . / .-.. .-.. / ---",
  title: "Hello in Morse Code",
  metaTitle: "Hello in Morse Code - Complete Guide",
  description: "Learn how to say 'Hello' in Morse code with visual dot and dash patterns, letter-by-letter breakdown, and the history of this essential greeting.",
  slug: "hello-in-morse-code",
  faqs: [
    { question: "What is hello in Morse code?", answer: "\"Hello\" in Morse code is: .... . / .-.. .-.. / ---. That's H (four dots), E (one dot), space, L (dot-dash-dot-dot), L, O (three dashes)." },
    { question: "How long does it take to transmit hello in Morse code?", answer: "At a standard speed of 20 WPM, the word \"hello\" takes approximately 2.5 seconds to transmit. The timing includes all the standard spacing between letters and the word break." },
  ],
  relatedWords: [
    { word: "Hi", slug: "hi-in-morse-code", morse: ".... .." },
    { word: "Help", slug: "help-in-morse-code", morse: ".... . .-.. .--." },
    { word: "I Love You", slug: "i-love-you-in-morse-code", morse: ".. / .-.. / --- / ...- / . / -.-- / --- / ..-" },
    { word: "SOS", slug: "sos-morse-code", morse: "... --- ..." },
  ],
};

export const metadata = generateWordPageMeta(config);

export default function HelloPage() {
  return (
    <WordPageTemplate config={config}>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">The Universal Greeting in Dots and Dashes</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        &quot;Hello&quot; — it&apos;s the word that starts conversations, bridges cultures, and opens doors around
        the world. In Morse code, this friendly greeting becomes a distinctive rhythmic pattern of dots and dashes that
        telegraph operators have been transmitting since the earliest days of the electrical telegraph. Learning to say
        hello in Morse code is often one of the first things beginners do when they start exploring this fascinating
        language of light and sound.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">Breaking Down &quot;HELLO&quot;</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        The word &quot;HELLO&quot; contains five letters, and each one has its own unique Morse code pattern:
      </p>
      <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
        <li><strong>H</strong> = <span className="font-mono text-green-600">....</span> (four dots) — one of the most common letters, representing about 6.1% of English text</li>
        <li><strong>E</strong> = <span className="font-mono text-green-600">.</span> (single dot) — the most common letter in English, just one quick tap</li>
        <li><strong>L</strong> = <span className="font-mono text-green-600">.-..</span> (dot-dash-dot-dot) — a flowing pattern reminiscent of a ladder</li>
        <li><strong>L</strong> = <span className="font-mono text-green-600">.-..</span> (dot-dash-dot-dot) — repeated, making it easy to recognize in sequence</li>
        <li><strong>O</strong> = <span className="font-mono text-green-600">---</span> (three dashes) — the dramatic finish, three long sustained signals</li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">The Rhythm of Hello</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        What makes &quot;hello&quot; such a satisfying word in Morse code is its rhythm. The four rapid dots of H give
        a sense of urgency and friendliness, followed by the quick single dot of E. Then the repeated L pattern
        (dot-dash-dot-dot, dot-dash-dot-dot) creates a kind of musical repetition. Finally, the three long dashes of O
        provide a satisfying, resonant conclusion. The whole word has a distinctive cadence that experienced Morse code
        operators can recognize instantly without needing to decode each letter individually.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">Historical Context</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        The word &quot;hello&quot; itself has an interesting history. Before the telephone was invented, people
        typically answered calls with &quot;Ahoy!&quot; (Alexander Graham Bell&apos;s preferred greeting) or simply
        &quot;What do you want?&quot; Thomas Edison is widely credited with popularizing &quot;hello&quot; as the
        standard telephone greeting in the late 1870s. The word appeared in print as early as 1826 but was largely
        obscure until Edison&apos;s advocacy.
      </p>
      <p className="text-slate-700 leading-relaxed mb-4">
        In the telegraph era, operators didn&apos;t typically send the word &quot;hello&quot; because telegraph
        messages were usually transactional and brief. Instead, they used procedural signals like &quot;GA&quot;
        (go ahead), &quot;SK&quot; (end of work), and &quot;BT&quot; (break). But as Morse code moved beyond
        professional telegraphy into amateur radio and personal communication, sending greetings like &quot;hello&quot;
        became much more common. Today, it&apos;s a staple of Morse code practice and a friendly way to start any
        conversation.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">Practice Tips</h2>
      <p className="text-slate-700 leading-relaxed">
        To master &quot;hello&quot; in Morse code, start by listening to the audio on our{" "}
        <Link href="/morse-code-translator" className="text-green-600 underline">Morse code translator</Link>.
        Type the word, play the audio at a slow speed (5-10 WPM), and focus on the rhythm rather than counting
        individual dots and dashes. Once you can recognize the word by ear, try increasing the speed. Practice
        writing it from memory, then check against the reference above. For more practice with letters, visit
        our <Link href="/morse-code-alphabet" className="text-green-600 underline">  Morse Code Alphabet</Link>.
      </p>
    </WordPageTemplate>
  );
}
