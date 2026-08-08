import Link from "next/link";
import { WordPageTemplate, generateWordPageMeta } from "@/components/morse/word-page-template";

const config = {
  word: "HELP",
  morseStr: ".... . .-.. .--.",
  title: "Help in Morse Code",
  metaTitle: "Help in Morse Code (.... . .-.. .--.) - Complete Guide",
  description: "Learn how to signal 'Help' in Morse code with visual dot and dash patterns, emergency signaling methods, and practical applications.",
  slug: "help-in-morse-code",
  faqs: [
    { question: "What is Help in Morse code?", answer: "'Help' in Morse code is .... . .-.. .--. which breaks down as H (four dots), E (one dot), L (dot-dash-dot-dot), and P (dot-dash-dash-dot). The total pattern contains 11 elements: 8 dots and 3 dashes. Learning to signal 'help' in Morse code is a valuable emergency preparedness skill that works with flashlights, whistles, tapping, or any method that can produce two distinct signals." },
    { question: "Should I use HELP or SOS in an emergency?", answer: "In a genuine life-threatening emergency, always use SOS (... --- ...) as it is the internationally recognized distress signal. 'Help' can be used in less urgent situations or when combined with SOS to provide additional context." },
  ],
  relatedWords: [
    { word: "Help Me", slug: "help-me-in-morse-code", morse: ".... . .-.. .--. / -- ." },
    { word: "SOS", slug: "sos-morse-code", morse: "... --- ..." },
    { word: "Hello", slug: "hello-in-morse-code", morse: ".... . / .-.. .-.. / ---" },
    { word: "Yes", slug: "yes-in-morse-code", morse: "-.-- / . / ...-" },
  ],
};

export const metadata = generateWordPageMeta(config);

export default function HelpPage() {
  return (
    <WordPageTemplate config={config}>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Signaling for Assistance</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        The word &quot;help&quot; is one of the most important words in any language, and knowing how to express it
        in Morse code can be a genuinely valuable skill in emergency situations. Whether you&apos;re signaling with a
        flashlight, tapping on a pipe, or flashing a mirror, the ability to communicate &quot;help&quot; when other
        forms of communication are unavailable could make a real difference.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">Letter-by-Letter Breakdown</h2>
      <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
        <li><strong>H</strong> = <span className="font-mono text-green-600">....</span> (four dots) — the urgent start: tap-tap-tap-tap, like someone knocking rapidly</li>
        <li><strong>E</strong> = <span className="font-mono text-green-600">.</span> (single dot) — one quick tap, the briefest pause before continuing</li>
        <li><strong>L</strong> = <span className="font-mono text-green-600">.-..</span> (dot-dash-dot-dot) — a flowing pattern: short, long, short, short</li>
        <li><strong>P</strong> = <span className="font-mono text-green-600">.--.</span> (dot-dash-dash-dot) — the most complex letter in &quot;help,&quot; requiring careful timing</li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">Practical Signaling Applications</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        Knowing the Morse code for &quot;help&quot; is useful in a variety of situations beyond traditional
        telegraphy:
      </p>
      <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
        <li><strong>Wilderness Survival:</strong> If lost or injured in the backcountry, you can signal &quot;help&quot; using a whistle (short blasts for dots, long blasts for dashes), flashlight, or mirror. The universal rhythm can attract attention from search parties or passing aircraft.</li>
        <li><strong>Maritime Emergencies:</strong> Even with modern radio equipment, knowing Morse code provides a backup communication method. The International Regulations for Preventing Collisions at Sea still recognize light signals.</li>
        <li><strong>Trapped Situations:</strong> If trapped under debris (earthquake, collapse), tapping &quot;help&quot; on metal pipes or walls can help rescuers locate you. The rhythmic pattern is distinct from random banging.</li>
        <li><strong>Visual Signaling:</strong> A mirror, flashlight, or even a brightly colored cloth can be used to signal the dot-dash pattern of &quot;help&quot; to distant observers.</li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">The Rhythm and Timing</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        The word &quot;help&quot; has a distinctive Morse code rhythm that experienced operators can recognize instantly.
        It starts with four rapid-fire dots (H), followed by a single quick dot (E), then the more complex L pattern
        (dot-dash-dot-dot), and finishes with P (dot-dash-dash-dot). The P, with its alternating short-long-long-short
        pattern, gives the word a unique &quot;fingerprint&quot; that stands out from other four-letter words.
      </p>
      <p className="text-slate-700 leading-relaxed mb-4">
        To practice the rhythm, use our <Link href="/" className="text-green-600 underline">
        Morse code translator</Link> with audio playback. Start at a slow speed and focus on getting the timing
        right — especially the P letter, which is the trickiest part of &quot;help.&quot; Once comfortable, increase
        the speed. For emergency preparedness, practice until you can produce the word from memory without any reference.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">Help vs SOS: Know the Difference</h2>
      <p className="text-slate-700 leading-relaxed">
        While both &quot;help&quot; and &quot;SOS&quot; are used to signal distress, they serve different purposes.
        <strong> SOS</strong> (<span className="font-mono text-green-600">... --- ...</span>) is the{" "}
        <em>official international distress signal</em> — it&apos;s shorter, simpler, and universally understood
        across all languages and cultures. Always prioritize SOS in genuine life-threatening emergencies. &quot;Help&quot;
        is more appropriate for non-imminent situations where you need assistance but aren&apos;t in immediate danger.
        Learn both: visit our <Link href="/sos-morse-code" className="text-green-600 underline">SOS guide</Link> for
        the complete emergency reference.
      </p>
    </WordPageTemplate>
  );
}
