import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { generatePageMeta, generateArticleSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta(
  "What Is Morse Code? How It Works, History & Uses",
  "Learn what Morse code is, how dots, dashes, and timing encode messages, how Samuel Morse and Alfred Vail developed the telegraph code, and where International Morse code is still used today in radio, navigation, signaling, and assistive communication.",
  "/what-is-morse-code",
  [
    "what is morse code", "how does morse code work", "morse code history", "samuel morse", "alfred vail", "morse code uses", "international morse code"
  ]
);
const articleSchema = generateArticleSchema({
  title: "What Is Morse Code? How It Works, History & Uses",
  description: "A comprehensive guide to Morse code covering its history, how it works, and its modern applications.",
  url: "/what-is-morse-code",
  datePublished: "2026-08-05",
});

export default function WhatIsMorseCodePage() {
  const faqSchema = generateFAQSchema([
    {
      question: "What is Morse code?",
      answer: "Morse code is a communication system that represents letters, numbers, and some punctuation with patterns of short and long signals, called dots and dashes, separated by specific timing gaps.",
    },
    {
      question: "Who invented Morse code?",
      answer: "Samuel F. B. Morse and Alfred Vail developed the telegraph system and the code used with it in the 1830s and 1840s. Vail made important contributions to the practical alphabetic code and telegraph equipment.",
    },
    {
      question: "Is Morse code still used today?",
      answer: "Yes. Morse code remains in use in amateur radio and other signaling, educational, historical, and assistive communication contexts. International Morse code is also documented by ITU-R Recommendation M.1677-1.",
    },
    {
      question: "How does Morse code work?",
      answer: "Each character is represented by a pattern of dots and dashes. Timing also matters: a dot is one unit, a dash is three units, the gap within a character is one unit, the gap between characters is three units, and the gap between words is seven units.",
    },
    {
      question: "What was the first Morse code message?",
      answer: "On May 24, 1844, the message 'What hath God wrought?' was transmitted from Washington, D.C. to Baltimore over the experimental telegraph line.",
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
            Learn what Morse code is, how dots and dashes represent letters and numbers, why timing matters, how the
            code developed alongside the electric telegraph, and where it is still useful today. This guide combines the
            basic idea, history, timing rules, practical uses, and beginner-friendly resources in one place.
          </p>
        </div>

        {/* Featured Blog Image */}
        <section className="mb-10">
          <figure className="mx-auto">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <Image
                src="/images/blog/what-is-morse-code.webp"
                alt="Morse code dots and dashes communication system illustration"
                width={1200}
                height={675}
                className="h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
            <figcaption className="mt-4 text-center text-sm leading-7 text-slate-600">
              Morse code represents letters, numbers, and symbols with combinations of dots and dashes for communication across different signaling methods.
            </figcaption>
          </figure>
        </section>

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
  At its core, Morse code uses two signal elements: a short one (dot) and a long one (dash). The order and number of dots and dashes
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
              One reason Morse code can be efficient is that common characters can be represented with short patterns. E is a
              single dot and T is a single dash, while less frequent letters generally use longer patterns. This unequal
              code length reduces the average amount of signaling needed for ordinary text compared with a system in
              which every character has the same-length representation.
            </p>
            <p>
  If you want to see how Morse code works in practice, try our{" "}
  <Link
    href="/morse-code-decoder"
    className="text-green-600 underline hover:text-green-700"
  >
    Morse Code Decoder
  </Link>{" "}
  to convert real Morse code messages back into readable text, or use our{" "}
  <Link
    href="/"
    className="text-green-600 underline hover:text-green-700"
  >
    Morse Code Translator
  </Link>{" "}
  to instantly encode your own messages.
</p>

          </div>
        </section>

        {/* MORSE CODE EXPLAINER INFOGRAPHIC */}
        <section className="mb-10">
          <figure className="mx-auto">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <Image
                src="/images/infographic/what-is-morse-code-infographic.webp"
                alt="What is Morse code infographic explaining how dots and dashes represent letters, numbers, and messages through short and long signals"
                width={1200}
                height={675}
                priority
                className="h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>

            <figcaption className="mt-4 text-center text-sm leading-7 text-slate-600">
              Morse code converts letters, numbers, and symbols into combinations of short dots and longer dashes that can be sent by sound, light, radio, or other on-off signals.
            </figcaption>
          </figure>

          <p className="mt-6 text-slate-700 leading-relaxed">
            For a complete character reference, explore the{" "}
            <Link
              href="/morse-code-alphabet"
              className="text-green-600 underline hover:text-green-700"
            >
              Morse Code Alphabet
            </Link>
            {" "}and{" "}
            <Link
              href="/morse-code-numbers"
              className="text-green-600 underline hover:text-green-700"
            >
              Morse Code Numbers
            </Link>
            . If you want hands-on practice, use the{" "}
            <Link
              href="/"
              className="text-green-600 underline hover:text-green-700"
            >
              Morse Code Translator
            </Link>
            {" "}to encode or decode your own message.
          </p>
        </section>

        {/* At a Glance */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Morse Code at a Glance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2">Dots &amp; dashes</h3>
              <p className="text-sm text-slate-600">
                Characters are built from short and long signals arranged in specific patterns.
              </p>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2">Timing matters</h3>
              <p className="text-sm text-slate-600">
                The spaces within characters, between characters, and between words are part of the code.
              </p>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2">International standard</h3>
              <p className="text-sm text-slate-600">
                International Morse code is documented in ITU-R Recommendation M.1677-1.
              </p>
            </div>
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
              hardware and the code itself. Vail made major contributions to the telegraph and to the alphabet used with it. Smithsonian archival material
              documents his role in improving the equipment and replacing Morse&apos;s earlier numerical system with a
              more practical alphabetic code. His work helped make messages faster and easier to decode.
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
            <p>
  If you want to go beyond the history and start learning Morse code yourself,
  follow our{" "}
  <Link
    href="/learn-morse-code"
    className="text-green-600 underline hover:text-green-700"
  >
    step-by-step Morse code learning guide
  </Link>
  .
</p>
          </div>
        </section>

        {/* Expanded Historical Context */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">From Painter to Telegraph Pioneer</h2>
          <div className="text-slate-700 leading-relaxed space-y-4">
            <p>
              Samuel Finley Breese Morse was trained as a painter before becoming closely associated with the electric
              telegraph. During a sea voyage in 1832, a conversation about electromagnetism helped spark his interest in
              transmitting information with electricity. He continued developing the idea while maintaining his career
              in the arts.
            </p>
            <p>
              Morse&apos;s work became much more practical through his partnership with <strong>Alfred Vail</strong>.
              Vail contributed to the telegraph apparatus and helped refine the coding approach used to represent
              individual characters. The collaboration was important in turning an experimental concept into a workable
              communication system.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Telegraph Changed Long-Distance Communication</h2>
          <div className="text-slate-700 leading-relaxed space-y-4">
            <p>
              The successful Washington-to-Baltimore demonstration showed that electrical messages could cross a long
              distance far faster than physical mail. Telegraph networks then expanded alongside railroads and became
              important to business, journalism, government, and personal communication.
            </p>
            <p>
              Telegraphy also spread internationally. Undersea cable projects eventually connected continents, helping
              create a global communications network. During the American Civil War, telegraph lines were used for
              military communication, demonstrating how quickly information could be moved over long distances.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">American Morse vs. International Morse Code</h2>
          <div className="text-slate-700 leading-relaxed space-y-4">
            <p>
              The original American Morse system and the later International Morse Code are related but not identical.
              American Morse, sometimes called Railroad Morse, was used extensively in the United States and had some
              different character and spacing conventions.
            </p>
            <p>
              International Morse Code was standardized for international telegraph communication in the 19th century
              and became the form most commonly referenced today. Its standardized timing and character patterns support
              communication across different countries and applications. For the current technical reference, see
              <a
                href="https://www.itu.int/rec/R-REC-M.1677"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="ml-1 text-green-600 underline hover:text-green-700"
              >
                ITU-R Recommendation M.1677
              </a>.
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
              { year: "Today", event: "Morse code remains in use in areas such as amateur radio, signaling, education, and some assistive communication systems." },
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

        {/* Decline & Legacy */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Decline of Commercial Telegraphy and Morse Code&apos;s Legacy</h2>
          <div className="text-slate-700 leading-relaxed space-y-4">
            <p>
              Telephone networks, teletype systems, and later digital communications gradually reduced the need for
              commercial Morse telegraphy. Even though the original telegraph infrastructure is largely a historical
              technology, the code itself survived because it is simple, adaptable, and can be transmitted through
              sound, light, radio, or physical signals.
            </p>
            <p>
              Morse code also has a lasting cultural and educational role. It appears in historical collections,
              communications training, amateur radio, films, literature, and other forms of popular culture. Its simple
              dot-and-dash structure makes it an enduring example of how information can be represented with a small
              set of signal elements.
            </p>
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
              <p className="text-sm text-slate-600">
  Ham radio operators worldwide use Morse code (CW mode) for long-distance
  communication that can span the globe on very low power. Morse code signals
  can penetrate noise and interference better than voice signals. If you want
  to practice character recognition, try our{" "}
  <Link
    href="/morse-code-quiz"
    className="text-green-600 underline hover:text-green-700"
  >
    Morse Code Quiz
  </Link>
  .
</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">✈️ Aviation</h3>
                <p className="text-sm text-slate-600">Some radio navigation aids use Morse identifiers so operators can identify a station by its transmitted signal. The exact navigation systems and procedures depend on the equipment and aviation rules in use.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">🚢 Maritime</h3>
                <p className="text-sm text-slate-600">Modern maritime communication relies mainly on digital and voice systems, but Morse code remains historically important and is still familiar as a distress-signaling method. For real emergencies, use current approved maritime procedures and equipment.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">♿ Assistive Technology</h3>
                <p className="text-sm text-slate-600">Morse code can be adapted as a simple input method for people who have limited movement or speech. Assistive systems can map dot-and-dash choices to letters, commands, or other computer inputs.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">🎯 Emergency Signaling</h3>
                <p className="text-sm text-slate-600">SOS is widely recognized as a distress signal and can be represented in Morse code as three dots, three dashes, and three dots. Read our <Link href="/blog/sos-signal-morse-code-everything-you-need-to-know" className="text-green-600 underline hover:text-green-700">SOS signal and Morse code guide</Link> for its history and signaling methods. In a real emergency, follow local emergency guidance and use appropriate approved equipment.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">🎓 Education & Culture</h3>
                <p className="text-sm text-slate-600">
  Morse code is taught in military academies, scouting programs, and
  engineering schools worldwide. It appears in films, music, and literature,
  and is recognized as intangible cultural heritage in several countries.
</p>
              </div>
            </div>
          </div>
        </section>

        {/* References */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Morse Code References</h2>
          <p className="text-slate-700 leading-relaxed mb-5">
            For technical standards and historical background, these external resources provide useful context from
            authoritative organizations. They open in a new tab so you can compare the source material with this guide.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://www.itu.int/rec/R-REC-M.1677"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="p-5 bg-slate-50 border border-slate-200 rounded-xl hover:border-green-300 transition-colors"
            >
              <h3 className="font-semibold text-slate-900 mb-2">ITU-R M.1677</h3>
              <p className="text-sm text-slate-600">
                International Morse code recommendation and technical reference.
              </p>
            </a>
            <a
              href="https://siarchives.si.edu/blog/forgotten-history-alfred-vail-and-samuel-morse"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="p-5 bg-slate-50 border border-slate-200 rounded-xl hover:border-green-300 transition-colors"
            >
              <h3 className="font-semibold text-slate-900 mb-2">Smithsonian: Morse &amp; Vail</h3>
              <p className="text-sm text-slate-600">
                Historical background on Samuel Morse, Alfred Vail, and the early telegraph.
              </p>
            </a>
            <a
              href="https://www.arrl.org/code-characters"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="p-5 bg-slate-50 border border-slate-200 rounded-xl hover:border-green-300 transition-colors"
            >
              <h3 className="font-semibold text-slate-900 mb-2">ARRL Code Characters</h3>
              <p className="text-sm text-slate-600">
                A practical reference for International Morse code characters used in amateur radio.
              </p>
            </a>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            External references are provided for further reading and technical context. They are independent of Morse
            Code Translator and may contain information, standards, or policies that change over time.
          </p>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: "What is Morse code?", a: "Morse code is a communication system that represents letters, numbers, and some punctuation with patterns of short and long signals, called dots and dashes, separated by specific timing gaps." },
              { q: "Who invented Morse code?", a: "Samuel F. B. Morse and Alfred Vail developed the telegraph system and the code used with it in the 1830s and 1840s. Vail made important contributions to the practical alphabetic code and telegraph equipment." },
              { q: "Is Morse code still used today?", a: "Yes. Morse code remains in use in amateur radio and other signaling, educational, historical, and assistive communication contexts. International Morse code is also documented by ITU-R Recommendation M.1677-1." },
              { q: "How does Morse code work?", a: "Each character is represented by a pattern of dots and dashes. Timing also matters: a dot is one unit, a dash is three units, the gap within a character is one unit, the gap between characters is three units, and the gap between words is seven units." },
              { q: "What was the first Morse code message?", a: "On May 24, 1844, the message 'What hath God wrought?' was transmitted from Washington, D.C. to Baltimore over the experimental telegraph line." },
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
            <Link
  href="/morse-code-quiz"
  className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors"
>
  🎯 Morse Quiz
</Link>
          </div>
        </section>
      </div>
    </main>
  );
}