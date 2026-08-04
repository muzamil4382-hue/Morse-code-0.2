import Link from "next/link";
import { WordPageTemplate, generateWordPageMeta } from "@/components/morse/word-page-template";

const config = {
  word: "HELP ME",
  morseStr: ".... . .-.. .--. / -- .",
  title: "Help Me in Morse Code",
  metaTitle: "Help Me in Morse Code - Emergency Signal Guide",
  description: "Learn how to signal 'Help Me' in Morse code. Essential emergency communication skill with letter-by-letter breakdown and signaling methods.",
  slug: "help-me-in-morse-code",
  faqs: [
    { question: "How do you say help me in Morse code?", answer: "\"Help Me\" in Morse code is: .... . .-.. .--. / -- . That's H (four dots), E (one dot), L (dot-dash-dot-dot), P (dot-dash-dash-dot), space, M (two dashes), E (one dot)." },
    { question: "Is 'Help Me' used as an official distress signal?", answer: "No. The only official international distress signal is SOS (... --- ...). While 'Help Me' can be used in informal situations, in genuine life-threatening emergencies, always use SOS as it is universally recognized." },
  ],
  relatedWords: [
    { word: "Help", slug: "help-in-morse-code", morse: ".... . .-.. .--." },
    { word: "SOS", slug: "sos-morse-code", morse: "... --- ..." },
    { word: "Hello", slug: "hello-in-morse-code", morse: ".... . / .-.. .-.. / ---" },
    { word: "Yes", slug: "yes-in-morse-code", morse: "-.-- / . / ...-" },
  ],
};

export const metadata = generateWordPageMeta(config);

export default function HelpMePage() {
  return (
    <WordPageTemplate config={config}>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">An Urgent Message in Dots and Dashes</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        &quot;Help Me&quot; — two words that can mean the difference between safety and danger, between hope and
        despair. In Morse code, this urgent plea becomes a series of rhythmic signals that can be transmitted by
        sound, light, or touch when conventional communication isn&apos;t available. While SOS is the official
        international distress signal, knowing how to say &quot;help me&quot; in Morse code provides an additional
        communication tool in emergency situations.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">Letter-by-Letter Breakdown</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        The phrase &quot;HELP ME&quot; consists of six letters across two words:
      </p>
      <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
        <li><strong>H</strong> = <span className="font-mono text-green-600">....</span> (four dots) — the start of help, four quick urgent taps</li>
        <li><strong>E</strong> = <span className="font-mono text-green-600">.</span> (single dot) — the most common letter, just one quick signal</li>
        <li><strong>L</strong> = <span className="font-mono text-green-600">.-..</span> (dot-dash-dot-dot) — a flowing pattern</li>
        <li><strong>P</strong> = <span className="font-mono text-green-600">.--.</span> (dot-dash-dash-dot) — one of the longer letter codes</li>
        <li><strong>M</strong> = <span className="font-mono text-green-600">--</span> (two dashes) — the start of &quot;me&quot;, two long signals</li>
        <li><strong>E</strong> = <span className="font-mono text-green-600">.</span> (single dot) — the final quick tap</li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">Emergency Signaling Methods</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        In an emergency situation where you need to signal &quot;help me,&quot; here are several methods you can use:
      </p>
      <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
        <li><strong>Flashlight:</strong> Use a flashlight or phone flashlight to signal the dots and dashes. Short flashes for dots, long flashes (3x longer) for dashes. Signal at eye level and sweep slowly across the horizon.</li>
        <li><strong>Whistle:</strong> Three short blasts, one short blast, one long-short-short, one long-long-short-long, pause, two long blasts, one short blast. Repeat at regular intervals.</li>
        <li><strong>Tapping:</strong> Tap on a hard surface — metal pipes, walls, or the ground. The sound can carry surprisingly far, especially through solid materials.</li>
        <li><strong>Mirror:</strong> Use a mirror or any reflective surface to flash sunlight toward potential rescuers. Aim at aircraft, ships, or distant buildings.</li>
        <li><strong>Body signals:</strong> If you can be seen, use arm movements or flag signals to draw attention, then switch to a writing medium if available.</li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">SOS vs Help Me</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        It&apos;s important to understand the distinction between &quot;Help Me&quot; and &quot;SOS&quot; in
        emergency communication. <strong>SOS</strong> (<span className="font-mono text-green-600">... --- ...</span>)
        is the <em>only</em> internationally recognized distress signal. It&apos;s shorter, simpler, and universally
        understood. In a genuine life-threatening emergency, always use SOS.
      </p>
      <p className="text-slate-700 leading-relaxed mb-4">
        &quot;Help Me&quot; is more appropriate for non-life-threatening situations where you need assistance but
        aren&apos;t in immediate danger. For example, if you&apos;re lost on a hike but have supplies and shelter,
        signaling &quot;help me&quot; might be more appropriate than the more urgent SOS.
      </p>
      <p className="text-slate-700 leading-relaxed">
        We recommend memorizing both signals. Practice with our{" "}
        <Link href="/morse-code-translator" className="text-green-600 underline">Morse code translator</Link> so
        you can produce them from memory. In an emergency, muscle memory is your best ally. Also, learn the
        <Link href="/sos-morse-code" className="text-green-600 underline"> complete SOS guide</Link> and our{" "}
        <Link href="/learn-morse-code" className="text-green-600 underline">Morse code learning guide</Link> for
        a more comprehensive education.
      </p>
    </WordPageTemplate>
  );
}
