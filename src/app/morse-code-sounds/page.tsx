import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta(
  "Morse Code Sounds - Audio, Frequency & Timing Guide",
  "Comprehensive guide to Morse code audio characteristics. Covers standard frequency ranges (500-1000 Hz) with recommended 600-700 Hz for practice, PARIS timing standard calculations showing exact millisecond durations at 20 WPM, and four proven listening practice techniques for building audio recognition skills.",
  "/morse-code-sounds",
  [
    "morse code sounds", "morse code audio", "morse code frequency", "morse code pitch", "morse code tone"
  ]
);
export default function MorseCodeSoundsPage() {
  const faqSchema = generateFAQSchema([
    {
      question: "What frequency is Morse code usually transmitted at?",
      answer: "Morse code audio is typically in the range of 550-750 Hz, with 600-700 Hz being the most common. This frequency range is easily heard by most people and provides clear distinction between dots and dashes.",
    },
    {
      question: "How fast is Morse code typically sent?",
      answer: "Beginner speeds are 5-10 WPM, while experienced operators commonly use 15-25 WPM. The world record for receiving Morse code is over 75 WPM. Most amateur radio exams require 5 WPM proficiency.",
    },
    {
      question: "What is the timing relationship between dots and dashes?",
      answer: "A dash is exactly 3 times the length of a dot. The space between parts of the same letter equals 1 dot length, between letters equals 3 dot lengths, and between words equals 7 dot lengths.",
    },
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Morse Code Sounds", url: "//morse-code-sounds" },
  ]);

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-medium">Morse Code Sounds</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Morse Code Sounds</h1>
          <p className="text-lg text-slate-600">
            A comprehensive guide to Morse code audio: frequencies, timing rules, pitch standards, and effective
            listening practice techniques for mastering Morse code by ear.
          </p>
        </div>

        {/* Audio Basics */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding Morse Code Audio</h2>
          <div className="text-slate-700 leading-relaxed space-y-4">
            <p>
              Morse code audio consists of two fundamental sounds: a <strong>short tone</strong> (representing a dot or &quot;dit&quot;)
              and a <strong>long tone</strong> (representing a dash or &quot;dah&quot;). Each letter has a unique sound pattern you can explore on our <Link href="/morse-code-alphabet" className="text-green-600 underline hover:text-green-700">Morse code alphabet chart</Link>. These tones are typically produced by a
              sine wave oscillator at a specific frequency. The beauty of Morse code lies in its simplicity — with just two types
              of sounds arranged in different patterns, you can communicate any message in any language that uses the Latin alphabet.
            </p>
            <p>
              When learning to receive Morse code by ear, your brain initially processes each sound individually — counting the
              dots and dashes to figure out which letter they represent. But with practice, something remarkable happens: you
              stop &quot;decoding&quot; and start <em>recognizing</em>. Each letter develops its own unique rhythmic
              &quot;fingerprint&quot; that your brain learns to identify instantly, the way you recognize a spoken word
              without consciously processing each individual phoneme.
            </p>
          </div>
        </section>

        {/* Frequency */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Frequency Guide</h2>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-4">
            <h3 className="font-semibold text-slate-900 mb-3">Standard Frequency Ranges</h3>
            <div className="space-y-3">
              {[
                { range: "500–550 Hz", label: "Low pitch", desc: "Used by some military organizations. Deeper, more authoritative sound.", color: "bg-slate-400" },
                { range: "550–650 Hz", label: "Standard low", desc: "Common in European and older equipment. Warm, mellow tone.", color: "bg-green-400" },
                { range: "650–750 Hz", label: "Standard (recommended)", desc: "The most widely used range. Clear, pleasant tone at 600-700 Hz.", color: "bg-green-600" },
                { range: "750–900 Hz", label: "High pitch", desc: "Some modern equipment. Crisp, bright sound. Can be tiring at length.", color: "bg-green-400" },
                { range: "900–1000 Hz", label: "Very high", desc: "Rarely used. Sharp tone, can cause fatigue during long sessions.", color: "bg-slate-400" },
              ].map((item) => (
                <div key={item.range} className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${item.color} flex-shrink-0`} />
                  <div className="flex-1">
                    <span className="font-mono text-green-600 font-medium">{item.range}</span>
                    <span className="text-sm text-slate-500 ml-2">({item.label})</span>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-slate-700 leading-relaxed">
            Our <Link href="/morse-code-translator" className="text-green-600 underline">translator</Link> defaults
            to 600 Hz, which is an excellent all-around frequency for both learning and practice. You can adjust between
            300-1000 Hz in the settings panel.
          </p>
        </section>

        {/* Timing */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Timing Rules</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Precise timing is the foundation of intelligible Morse code. All timing is based on the length of one
            <strong> dot unit</strong>:
          </p>
          <div className="bg-slate-900 rounded-xl p-6 text-green-400 font-mono space-y-2">
            <p>Dot (dit) .............. = 1 unit</p>
            <p>Dash (dah) ............ = 3 units</p>
            <p>Element gap .......... = 1 unit</p>
            <p>Letter gap ........... = 3 units</p>
            <p>Word gap ............. = 7 units</p>
          </div>
          <div className="mt-4 text-slate-700 leading-relaxed space-y-3">
            <p>
              At a speed of 20 WPM (words per minute), one dot unit equals approximately 60 milliseconds.
              This means a dot is 60ms, a dash is 180ms, the gap between elements is 60ms, between letters is 180ms,
              and between words is 420ms. See the full timing reference with an interactive WPM calculator on our <Link href="/morse-code-timing" className="text-green-600 underline hover:text-green-700">Morse code timing</Link> page. These timing relationships are what allow the receiver to distinguish between,
              for example, five E&apos;s (.....) and the number 5 (.....) — the letter gaps vs. the lack of gaps
              within the number code make all the difference.
            </p>
            <p>
              Speed in Morse code is measured using the &quot;PARIS&quot; standard. The word &quot;PARIS&quot; contains
              exactly 50 dot units, so one &quot;word&quot; at any speed is always 50 units. At 20 WPM, the entire word
              PARIS takes exactly 3 seconds to transmit. This standardized measurement allows speeds to be compared
              consistently across different operators and equipment. For a complete character reference, see our <Link href="/morse-code-alphabet" className="text-green-600 underline hover:text-green-700">Morse code alphabet chart</Link>.
            </p>
          </div>
        </section>

        {/* Practice Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How to Practice Listening</h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
              <h3 className="font-semibold text-green-800 mb-2">1. Start Slow, Build Gradually</h3>
              <p className="text-green-700">Begin at 5-10 WPM with character speeds of 15-20 WPM and longer spacing. This helps you learn the character sounds without being overwhelmed by speed.</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-2">2. Listen Before You Send</h3>
              <p className="text-slate-600">Focus on receiving (copying) Morse code before you practice sending. Receiving is the harder skill and the one that matters most for real-world communication.</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-2">3. Use the Koch Method</h3>
              <p className="text-slate-600">Start with just two characters at full speed. Add a new character only when you achieve 90% accuracy. This builds instant recognition instead of counting habits. Read our complete <Link href="/learn-morse-code" className="text-green-600 underline hover:text-green-700">Morse code learning guide</Link> for a detailed walkthrough of this method.</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-2">4. Practice 15 Minutes Daily</h3>
              <p className="text-slate-600">Consistency is key. Short daily sessions of 15-30 minutes are far more effective than occasional marathon sessions. Your brain needs regular exposure to build the neural pathways for character recognition. Test your listening skills with our <Link href="/morse-code-quiz" className="text-green-600 underline hover:text-green-700">Morse code quiz</Link>.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: "What frequency is Morse code transmitted at?", a: "Morse code audio is typically in the range of 550-750 Hz, with 600-700 Hz being the most common. This range is easily heard and provides clear distinction between dots and dashes." },
              { q: "How fast is Morse code sent?", a: "Beginners start at 5-10 WPM, experienced operators use 15-25 WPM, and the world record for receiving is over 75 WPM." },
              { q: "What is the timing between dots and dashes?", a: "A dash is 3x the length of a dot. Gaps between elements = 1 dot, between letters = 3 dots, between words = 7 dots." },
            ].map((faq, i) => (
              <details key={i} className="bg-white border border-slate-200 rounded-lg p-4 group">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-green-600 text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Explore More */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Explore More</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Link href="/morse-code-translator" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              🔤 Translator with Audio
            </Link>
            <Link href="/learn-morse-code" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              📖 Learning Guide
            </Link>
            <Link href="/morse-code-quiz" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              🎯 Practice Quiz
            </Link>
            <Link href="/morse-code-timing" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              ⏱️ Timing Reference
            </Link>
            <Link href="/morse-code-alphabet" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              📋 Alphabet Chart
            </Link>
            <Link href="/morse-code-decoder" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              🔓 Morse Decoder
            </Link>
            <Link href="/morse-code-numbers" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              🔢 Numbers Guide
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
