import Link from "next/link";
import { WordPageTemplate, generateWordPageMeta } from "@/components/morse/word-page-template";

const config = {
  word: "YES",
  morseStr: "-.-- / . / ...-",
  title: "Yes in Morse Code",
  metaTitle: "Yes in Morse Code (-.-- . ...-) - Complete Guide",
  description: "Learn how to say 'Yes' in Morse code with visual dot and dash patterns, letter-by-letter breakdown, and communication tips.",
  slug: "yes-in-morse-code",
  faqs: [
    { question: "What is yes in Morse code?", answer: "\"Yes\" in Morse code is: -.-- / . / ...- That's Y (dash-dot-dash-dash), E (single dot), S (three dots)." },
    { question: "How is 'yes' used in Morse code communication?", answer: "In military and radio communication, a single 'dit' (dot) is often used as an affirmative acknowledgment, similar to saying 'yes' or 'roger.' The full word 'yes' is used when more formal or explicit confirmation is needed." },
  ],
  relatedWords: [
    { word: "No", slug: "no-in-morse-code", morse: "-. / ---" },
    { word: "SOS", slug: "sos-morse-code", morse: "... --- ..." },
    { word: "Hello", slug: "hello-in-morse-code", morse: ".... . / .-.. .-.. / ---" },
    { word: "Help", slug: "help-in-morse-code", morse: ".... . .-.. .--." },
  ],
};

export const metadata = generateWordPageMeta(config);

export default function YesPage() {
  return (
    <WordPageTemplate config={config}>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Affirmative in Dots and Dashes</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        &quot;Yes&quot; — the word of affirmation, agreement, and positivity. In Morse code, this three-letter
        word carries a distinctive rhythm that starts with a dramatic dash and ends with a series of rapid dots.
        The Morse code for &quot;yes&quot; (<span className="font-mono text-green-600">-.-- / . / ...-</span>) is
        used in radio communication, military signaling, and everyday Morse code conversation to express agreement,
        confirmation, or acknowledgment.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">Letter-by-Letter Breakdown</h2>
      <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
        <li><strong>Y</strong> = <span className="font-mono text-green-600">-.--</span> (dash-dot-dash-dash) — the longest and most complex letter in &quot;yes,&quot; starting strong with a dash, like a resounding opening statement</li>
        <li><strong>E</strong> = <span className="font-mono text-green-600">.</span> (single dot) — the simplest letter, a quick, quiet affirmation in the middle</li>
        <li><strong>S</strong> = <span className="font-mono text-green-600">...</span> (three dots) — three quick taps that end the word with energetic finality</li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">Using &quot;Yes&quot; in Communication</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        In the world of Morse code communication, there are several ways to express affirmation. The full word
        &quot;yes&quot; is one method, but operators have also developed shorter conventions:
      </p>
      <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
        <li><strong>Single dot (E):</strong> In many radio protocols, a single dit serves as a general acknowledgment, similar to &quot;roger&quot; or &quot;received.&quot;</li>
        <li><strong>&quot;C&quot; (dash-dot-dash-dot):</strong> The prosign &quot;C&quot; (sent as one character without spacing) means &quot;Yes&quot; or &quot;Affirmative&quot; in formal CW (continuous wave) communication.</li>
        <li><strong>R (dot-dash-dot):</strong> In some military and aviation contexts, &quot;R&quot; indicates &quot;received&quot; or &quot;message understood.&quot;</li>
        <li><strong>Full &quot;YES&quot;:</strong> Used when clarity and formality are needed, or when communicating with someone who may not know the abbreviated conventions.</li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">The Rhythm of &quot;Yes&quot;</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        What makes &quot;yes&quot; distinctive in Morse code is its varied rhythm. It starts with the complex Y
        (dash-dot-dash-dash), which has a dramatic, almost questioning quality — like someone taking a deep breath
        before answering. Then the single E dot provides a brief moment of pause, like a comma in speech.
        Finally, the three quick dots of S end the word with energy and conviction. The overall effect is a
        confident, decisive rhythm that sounds like someone saying &quot;Yes, absolutely.&quot;
      </p>
      <p className="text-slate-700 leading-relaxed">
        Practice the word &quot;yes&quot; with our{" "}
        <Link href="/morse-code-translator" className="text-green-600 underline">Morse code translator</Link>.
        Also try its opposite — <Link href="/no-in-morse-code" className="text-green-600 underline">&quot;no&quot;</Link> —{" "}
        <span className="font-mono text-green-600">-. / ---</span> — which has a completely different rhythm.
        Learning pairs like yes/no, hello/goodbye, and help/thanks builds a practical vocabulary for Morse code
        conversation. Check out our <Link href="/morse-code-quiz" className="text-green-600 underline">quiz</Link> to
        test your letter recognition skills.
      </p>
    </WordPageTemplate>
  );
}
