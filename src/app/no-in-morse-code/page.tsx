import Link from "next/link";
import { WordPageTemplate, generateWordPageMeta } from "@/components/morse/word-page-template";

const config = {
  word: "NO",
  morseStr: "-. / ---",
  title: "No in Morse Code",
  metaTitle: "No in Morse Code (-. ---) - Complete Guide",
  description: "Learn how to say 'No' in Morse code with visual dot and dash patterns, letter-by-letter breakdown, and its role in communication.",
  slug: "no-in-morse-code",
  faqs: [
    { question: "What is no in Morse code?", answer: "\"No\" in Morse code is: -. / ---. That's N (dash-dot) followed by O (three dashes). The rhythm starts with a dash-dot and ends with three long dashes, creating a firm, decisive sound." },
    { question: "How do you say 'no' in radio communication?", answer: "In formal radio communication, 'no' or 'negative' can be sent as the full word, or operators may use the prosign 'N' (dash-dot) alone to indicate a negative response." },
  ],
  relatedWords: [
    { word: "Yes", slug: "yes-in-morse-code", morse: "-.-- / . / ...-" },
    { word: "Help", slug: "help-in-morse-code", morse: ".... . .-.. .--." },
    { word: "SOS", slug: "sos-morse-code", morse: "... --- ..." },
    { word: "Hello", slug: "hello-in-morse-code", morse: ".... . / .-.. .-.. / ---" },
  ],
};

export const metadata = generateWordPageMeta(config);

export default function NoPage() {
  return (
    <WordPageTemplate config={config}>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">The Firm Negative in Dots and Dashes</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        &quot;No&quot; — a simple, powerful word that sets boundaries, declines offers, and communicates refusal.
        In Morse code, &quot;no&quot; (<span className="font-mono text-green-600">-. / ---</span>) has a distinctly
        firm, decisive rhythm. The word starts with the balanced dash-dot of N and concludes with three long,
        resonant dashes of O — a pattern that sounds almost like a definitive statement being underscored three times.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">Letter-by-Letter Breakdown</h2>
      <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
        <li><strong>N</strong> = <span className="font-mono text-green-600">-.</span> (dash-dot) — a balanced, decisive signal: long then short. The N is the mirror image of A (.-), and together they represent the most common two-signal letters.</li>
        <li><strong>O</strong> = <span className="font-mono text-green-600">---</span> (three dashes) — three long, sustained signals that give the word its emphatic ending. The three dashes create a sense of finality and authority.</li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">The Sound of &quot;No&quot;</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        With only two letters totaling five signals, &quot;no&quot; is one of the shorter Morse code words.
        Its brevity makes it quick to send — useful when you need to respond rapidly. But its sound is
        unmistakable: the dash-dot of N (like a question being posed) followed by the three dramatic dashes
        of O (like an exclamation). The contrast between the brief N and the extended O gives &quot;no&quot;
        a quality of firm resolution.
      </p>
      <p className="text-slate-700 leading-relaxed mb-4">
        Compare this with &quot;yes&quot; (<span className="font-mono text-green-600">-.-- / . / ...-</span>),
        which starts with the complex Y and ends with rapid dots. Where &quot;yes&quot; sounds energetic and
        enthusiastic, &quot;no&quot; sounds calm and authoritative. This difference in tone is entirely
        accidental — Morse code wasn&apos;t designed with emotional connotations — but it&apos;s one of
        the reasons Morse code operators often develop an intuitive feel for the &quot;mood&quot; of
        different words.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">&quot;No&quot; in Communication Protocols</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        In various communication systems, &quot;no&quot; and its equivalents serve important roles:
      </p>
      <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
        <li><strong>Amateur Radio:</strong> Operators may use the prosign &quot;N&quot; (dash-dot sent as a single character) as a shorthand for &quot;no&quot; or &quot;negative.&quot;</li>
        <li><strong>Military Communication:</strong> &quot;Negative&quot; is the formal radio term for &quot;no,&quot; and in Morse code it can be sent as the full word or abbreviated as &quot;NO.&quot;</li>
        <li><strong>Aviation:</strong> The prosign &quot;NO&quot; or simply &quot;N&quot; can be used to indicate a negative response in Morse code communication.</li>
        <li><strong>General Use:</strong> In casual Morse code conversation, the full word &quot;no&quot; is perfectly appropriate and widely understood.</li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">Practice Pairing &quot;Yes&quot; and &quot;No&quot;</h2>
      <p className="text-slate-700 leading-relaxed">
        One of the best ways to learn Morse code is to practice word pairs that have opposite meanings.
        &quot;Yes&quot; (<span className="font-mono text-green-600">-.-- / . / ...-</span>) and &quot;No&quot;
        (<span className="font-mono text-green-600">-. / ---</span>) make an excellent pair. Their different
        rhythms help train your ear to distinguish between Morse code words. Use our{" "}
        <Link href="/" className="text-green-600 underline">Morse code translator</Link> to
        practice both words and listen to the audio at different speeds. For a more structured learning
        approach, visit our <Link href="/learn-morse-code" className="text-green-600 underline">learning guide</Link>{" "}
        or test yourself with our <Link href="/morse-code-quiz" className="text-green-600 underline">interactive quiz</Link>.
      </p>
    </WordPageTemplate>
  );
}
