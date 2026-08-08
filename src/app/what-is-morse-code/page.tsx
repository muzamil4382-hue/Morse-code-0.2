import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMeta, generateArticleSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta(
  "What is Morse Code? History, Uses & Modern Applications",
  "In-depth exploration of Morse code covering its invention by Samuel Morse and Alfred Vail in 1837, the first telegraph message in 1844, standardization at the 1865 International Telegraph Conference, and six modern application fields including amateur radio CW operation, aviation NAVAID identifiers, maritime communication, and assistive technology.",
  "/what-is-morse-code",
  [
    "what is morse code", "morse code history", "samuel morse", "telegraph invention", "morse code uses today"
  ]
);
const articleSchema = generateArticleSchema({
  title: "What is Morse Code? History, Uses & Modern Applications",
  description: "A comprehensive guide to Morse code covering its history, how it works, and its modern applications.",
  url: "/what-is-morse-code",
  datePublished: "2024-12-15",
});

export default function WhatIsMorseCodePage() {
  const faqSchema = generateFAQSchema([
    {
      question: "Who invented Morse code?",
      answer: "Morse code was developed by Samuel F.B. Morse and his assistant Alfred Vail in the 1830s and 1840s. While Morse is credited with the invention, Vail made significant contributions to the code's design, including the efficient assignment of shorter codes to more common letters.",
    },
    {
      question: "Is Morse code still used today?",
      answer: "Yes! Morse code is actively used by amateur radio operators worldwide, in aviation as NAVAID identifiers, in maritime communication as a backup, and by people with disabilities for assistive communication. The SOS distress signal remains universally recognized.",
    },
    {
      question: "What was the first Morse code message?",
      answer: "The first official Morse code message was 'What hath God wrought?' sent on May 24, 1844, by Samuel Morse from the Supreme Court chamber in Washington, D.C. to the B&O Railroad depot in Baltimore, Maryland.",
    },
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "What is Morse Code?", url: "/what-is-morse-code" },
  ]);

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-medium">What is Morse Code?</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            What is Morse Code?
          </h1>
          <p className="text-lg text-slate-600">
            A comprehensive guide to the history, mechanics, and modern applications of one of the world&apos;s most
            enduring communication systems. From Samuel Morse&apos;s telegraph to today&apos;s amateur radio bands.
          </p>
        </div>

        {/* What Is */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding Morse Code</h2>
          <div className="text-slate-700 leading-relaxed space-y-4">
            <p>
              <strong>Morse code</strong> is a method of telecommunication that encodes text characters as standardized
              sequences of two different signal durations, called <strong>dots</strong> (or &quot;dit&quot;) and{" "}
              <strong>dashes</strong> (or &quot;dah&quot;). Developed in the early 1830s, it was the primary means of
              long-distance electrical communication for over a century and remains in active use today.
            </p>
            <p>
  At its core, Morse code is a <strong>binary system</strong> — every character is represented using just
  two types of signals: a short one (dot) and a long one (dash). The order and number of dots and dashes
  determines which character is being transmitted. For example, a single dot represents the letter E, while a
  single dash represents the letter T. The letter A is dot-dash, the letter B is dash-dot-dot-dot, and so on
  for all 26{" "}
  <Link
    href="/morse-code-alphabet"
    className="text-green-600 underline hover:text-green-700"
  >
    letters of the Morse code alphabet
  </Link>
  , 10{" "}
  <Link
    href="/morse-code-numbers"
    className="text-green-600 underline hover:text-green-700"
  >
    numerals
  </Link>
  , and various punctuation marks.
</p>
            <p>
              What makes Morse code remarkable is its <strong>efficiency</strong>. Samuel Morse and Alfred Vail
              designed the code so that the most frequently used letters in English have the shortest codes. The letter
              E, the most common letter in English at 12.7% frequency, gets just a single dot. T, the second most common
              at 9.1%, gets just a single dash. This design dramatically speeds up transmission compared to a system
              where every letter has the same length code.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How Morse Code Works</h2>
          <div className="text-slate-700 leading-relaxed space-y-4">
            <p>
              Morse code transmission relies on precise <strong>timing relationships</strong> between signals. The
              fundamental unit of time is the <em>dot duration</em>, and all other timings are measured relative to it:
            </p>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <ul className="space-y-2">
                <li><strong>Dot (dit)</strong> — 1 unit of time</li>
                <li><strong>Dash (dah)</strong> — 3 units of time</li>
                <li><strong>Space between parts of the same letter</strong> — 1 unit</li>
                <li><strong>Space between letters</strong> — 3 units</li>
                <li><strong>Space between words</strong> — 7 units</li>
              </ul>
            </div>
            <p>
              These timing rules are what make Morse code intelligible. Without proper spacing, it would be impossible
              to distinguish between, for example, the letter I (two dots) and the letter A (dot-dash), or between five
              separate E&apos;s and the number 5 (five dots). Speed is measured in <strong>words per minute (WPM)</strong>,
              where one &quot;word&quot; is standardized as 50 dot units (based on the word &quot;PARIS&quot;).
            </p>
            <p>
              Morse code can be transmitted through multiple media: <strong>electrical pulses</strong> (as in the original
              telegraph), <strong>audio tones</strong> (short and long beeps), <strong>light signals</strong> (short and
              long flashes), <strong>visual signals</strong> (flags), and even <strong>physical taps</strong>. This
              versatility is one reason Morse code has remained useful across so many different contexts and technologies.
              You can hear the difference between dots and dashes on our <Link href="/morse-code-sounds" className="text-green-600 underline hover:text-green-700">Morse code sounds</Link> page, and learn the precise timing rules on our <Link href="/morse-code-timing" className="text-green-600 underline hover:text-green-700">Morse code timing</Link> reference.
            </p>
          </div>
        </section>

        {/* History */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The History of Morse Code</h2>
          <div className="text-slate-700 leading-relaxed space-y-4">
            <p>
              The story of Morse code begins with <strong>Samuel Finley Breese Morse</strong> (1791–1872), an American
              painter and inventor. While returning from a trip to Europe in 1832, Morse overheard a conversation about
              electromagnetism and became fascinated with the idea of using electricity to transmit messages. Over the next
              several years, he developed the electrical telegraph and the code that would bear his name.
            </p>
            <p>
              Morse&apos;s assistant, <strong>Alfred Vail</strong>, played a crucial role in refining both the telegraph
              hardware and the code itself. Vail is credited with the efficient letter-to-code assignment system that
              gives shorter codes to more common letters — a system inspired by the movable-type printing press, where
              more common letters have more type pieces. Vail&apos;s contribution was so significant that some historians
              argue the code should be called &quot;Vail code.&quot;
            </p>
            <p>
              The first demonstration of the telegraph occurred on January 6, 1838, at Morristown, New Jersey. But the
              truly historic moment came on <strong>May 24, 1844</strong>, when Morse sent the first official
              telegraph message from the Supreme Court chamber in the U.S. Capitol to the B&amp;O Railroad depot in
              Baltimore, Maryland. The message — <em>&quot;What hath God wrought?&quot;</em> — chosen by Annie
              Ellsworth, the daughter of Morse&apos;s friend, was a quotation from the Bible (Numbers 23:23).
            </p>
            <p>
              Within a decade, telegraph lines crisscrossed the United States and Europe. The <strong>Transatlantic
              telegraph cable</strong> of 1858 connected Europe and North America for the first time, shrinking the
              world dramatically. By the 1860s, the International Morse Code (a refined version of Morse and Vail&apos;s
              original) was standardized and adopted worldwide at the International Telegraph Conference in 1865.
            </p>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Timeline of Key Events</h2>
          <div className="space-y-4">
            {[
              { year: "1832", event: "Samuel Morse conceives the idea of the electromagnetic telegraph during a transatlantic voyage." },
              { year: "1837", event: "Morse files a patent for the telegraph. Alfred Vail begins assisting with development." },
              { year: "1838", event: "First public demonstration of the telegraph at Morristown, New Jersey." },
              { year: "1844", event: "The first official telegraph message 'What hath God wrought?' is sent from Washington to Baltimore on May 24." },
              { year: "1851", event: "A telegraph line is established between London and Paris, connecting Britain to continental Europe." },
              { year: "1858", event: "The first transatlantic telegraph cable is laid, connecting North America and Europe." },
              { year: "1865", event: "The International Telegraph Conference standardizes International Morse Code." },
              { year: "1906", event: "SOS is adopted as the international distress signal at the Berlin Radio Conference." },
              { year: "1912", event: "The RMS Titanic sinks; its SOS calls help save 706 passengers and revolutionize maritime safety." },
              { year: "1914–1918", event: "Morse code is used extensively during World War I for military communications." },
              { year: "1930s", event: "Ludwig Koch develops the Koch method for teaching Morse code, still used today." },
              { year: "1999", event: "Morse code requirements for amateur radio licenses are relaxed in many countries." },
              { year: "2003", event: "The International Maritime Organization ends Morse code requirements for ships." },
              { year: "2024", event: "Morse code continues to thrive in amateur radio, aviation, and assistive technology communities." },
            ].map((item) => (
              <div key={item.year} className="flex gap-4">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-sm font-bold text-green-600">{item.year}</span>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-green-600 mt-1.5" />
                </div>
                <p className="text-slate-700">{item.event}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Modern Uses */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Modern Applications</h2>
          <div className="text-slate-700 leading-relaxed space-y-4">
            <p>
              While the telegraph has largely been replaced by newer technologies, Morse code itself is far from obsolete.
              It continues to serve important roles in several fields:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">📡 Amateur Radio</h3>
                <p className="text-sm text-slate-600">Ham radio operators worldwide use Morse code (CW mode) for long-distance communication that can span the globe on very low power. Morse code signals can penetrate noise and interference better than voice signals.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">✈️ Aviation</h3>
                <p className="text-sm text-slate-600">Navigation aids (NAVAIDs) like VOR and NDB stations are identified by two- or three-letter Morse code identifiers transmitted alongside the navigation signal. Pilots learn these identifiers during training.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">🚢 Maritime</h3>
                <p className="text-sm text-slate-600">While no longer mandatory, Morse code remains a recognized backup for maritime communication. SOS is still universally understood as a distress signal, and many vessels maintain Morse code capability.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">♿ Assistive Technology</h3>
                <p className="text-sm text-slate-600">People with severe physical disabilities, including those with locked-in syndrome, use Morse code input devices to communicate. Simple dot-dash patterns can control computers and speech-generating devices.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">🎯 Emergency Signaling</h3>
                <p className="text-sm text-slate-600">SOS can be signaled using flashlights, whistles, or any rhythmic medium. Learn the full history and signaling methods on our <Link href="/sos-morse-code" className="text-green-600 underline hover:text-green-700">SOS Morse code guide</Link>. Many smartphones have SOS features that can flash Morse code. It remains the most universally recognized distress signal.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">🎓 Education & Culture</h3>
                <p className="text-sm text-slate-600">Morse code is taught in military academies, scouting programs, and engineering schools worldwide. It appears in films, music, and literature, and is recognized as intangible cultural heritage in several countries.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: "Who invented Morse code?", a: "Morse code was developed by Samuel F.B. Morse and his assistant Alfred Vail in the 1830s and 1840s. While Morse is credited with the invention, Vail made significant contributions to the code's design." },
              { q: "Is Morse code still used today?", a: "Yes! Morse code is actively used by amateur radio operators, in aviation as NAVAID identifiers, in maritime communication as a backup, and by people with disabilities for assistive communication." },
              { q: "What was the first Morse code message?", a: "The first official message was 'What hath God wrought?' sent on May 24, 1844, from Washington, D.C. to Baltimore, Maryland." },
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
            <Link href="/" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              🔤 Try the Translator
            </Link>
            <Link href="/learn-morse-code" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              📖 Learn Morse Code
            </Link>
            <Link href="/morse-code-alphabet" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              📋 Alphabet Chart
            </Link>
            <Link href="/morse-code-sounds" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              🔊 Morse Sounds
            </Link>
            <Link href="/morse-code-timing" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              ⏱️ Morse Timing
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
