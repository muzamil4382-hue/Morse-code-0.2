import type { Metadata } from "next";
import Link from "next/link";
import { MORSE_CODE } from "@/lib/morse";
import { generatePageMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta(
  "Morse Code Numbers 0-9 - Complete Number Reference",
  "Complete guide to Morse code numerals 0 through 9 with visual dot-and-dash charts. Explains the elegant counting pattern (1=.---- through 0=-----), mirror symmetry between number pairs, historical context of number assignments, and memorization tricks using the midpoint concept.",
  "/morse-code-numbers",
  [
    "morse code numbers", "morse code digits", "numbers in morse code", "0-9 morse code", "morse code numerals"
  ]
);
export default function MorseCodeNumbersPage() {
  const faqSchema = generateFAQSchema([
    {
      question: "What is the pattern for Morse code numbers?",
      answer: "Morse code numbers follow a perfectly logical pattern. 1 is represented as one dot followed by four dashes (.----). Each subsequent number adds a dot and removes a dash, until 5 which is all five dots (.....). Then 6 through 9 reverse the pattern: 6 is one dash followed by four dots (-....), up to 9 which is four dashes and one dot (----.). The number 0 is all five dashes (-----).",
    },
    {
      question: "Why are Morse code numbers five signals long?",
      answer: "When Morse and Vail developed the code, they assigned shorter codes to the most common letters. Since numbers are less frequently used than letters in general text, they were assigned five-signal codes, which are longer than most letter codes. This maximizes transmission efficiency — common characters are quick to send.",
    },
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Morse Code Numbers", url: "/morse-code-numbers" },
  ]);

  const numbers = "0123456789".split("");
  const numberInfo: Record<string, { value: number; desc: string }> = {
    "0": { value: 0, desc: "Zero — all five dashes, the longest number code" },
    "1": { value: 1, desc: "One — single dot followed by four dashes" },
    "2": { value: 2, desc: "Two — two dots followed by three dashes" },
    "3": { value: 3, desc: "Three — three dots followed by two dashes" },
    "4": { value: 4, desc: "Four — four dots followed by one dash" },
    "5": { value: 5, desc: "Five — all five dots, the midpoint of the number sequence" },
    "6": { value: 6, desc: "Six — single dash followed by four dots" },
    "7": { value: 7, desc: "Seven — two dashes followed by three dots" },
    "8": { value: 8, desc: "Eight — three dashes followed by two dots" },
    "9": { value: 9, desc: "Nine — four dashes followed by one dot" },
  };

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-medium">Morse Code Numbers</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Morse Code Numbers 0–9</h1>
          <p className="text-lg text-slate-600">
            The complete reference for Morse code numerals from zero to nine. Numbers in Morse code follow a
            beautifully logical pattern that makes them easy to learn and remember.
          </p>
        </div>

        {/* Numbers Chart */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Number Chart</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {numbers.map((num) => {
              const code = MORSE_CODE[num];
              const info = numberInfo[num];
              return (
                <div key={num} className="bg-white border border-slate-200 rounded-xl p-5 text-center hover:border-green-400 hover:shadow-md transition-all">
                  <div className="text-4xl font-bold text-slate-900 mb-3">{num}</div>
                  <div className="flex items-center justify-center gap-1 mb-3">
                    {code.split("").map((char, i) => {
                      if (char === ".") return <span key={i} className="inline-block w-3 h-3 rounded-full bg-green-600" />;
                      if (char === "-") return <span key={i} className="inline-block w-7 h-3 rounded-full bg-green-600" />;
                      return null;
                    })}
                  </div>
                  <div className="text-lg font-mono text-green-600 font-medium mb-2">{code}</div>
                  <p className="text-xs text-slate-500">{info.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* The Pattern */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Understanding the Number Pattern</h2>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 space-y-4">
            <p className="text-slate-700 leading-relaxed">
              One of the most elegant aspects of Morse code is the logical pattern used for numbers. Unlike letters,
              which have irregular code assignments based on frequency of use, numbers follow a perfectly symmetrical
              sequence. Once you understand this pattern, you&apos;ll never need to look up Morse code numbers again.
            </p>
            <p className="text-slate-700 leading-relaxed">
              The pattern starts with <strong>1</strong>, which is a single dot followed by four dashes:
              <code className="font-mono bg-white px-2 py-1 rounded mx-1 text-green-600">.----</code>.
              Each subsequent number shifts one position from dash to dot. So <strong>2</strong> becomes
              <code className="font-mono bg-white px-2 py-1 rounded mx-1 text-green-600">..---</code>,
              <strong>3</strong> becomes
              <code className="font-mono bg-white px-2 py-1 rounded mx-1 text-green-600">...--</code>,
              and so on until <strong>5</strong>, which is all five dots:
              <code className="font-mono bg-white px-2 py-1 rounded mx-1 text-green-600">.....</code>.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Then the pattern reverses: <strong>6</strong> is one dash and four dots:
              <code className="font-mono bg-white px-2 py-1 rounded mx-1 text-green-600">-....</code>,
              <strong>7</strong> is two dashes and three dots:
              <code className="font-mono bg-white px-2 py-1 rounded mx-1 text-green-600">--...</code>,
              continuing up to <strong>9</strong>:
              <code className="font-mono bg-white px-2 py-1 rounded mx-1 text-green-600">----.</code>.
              Finally, <strong>0</strong> is all five dashes:
              <code className="font-mono bg-white px-2 py-1 rounded mx-1 text-green-600">-----</code>.
            </p>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <p className="font-mono text-center text-green-600 text-lg">
                1: .---- &nbsp; 2: ..--- &nbsp; 3: ...-- &nbsp; 4: ....- &nbsp; 5: .....<br />
                6: -.... &nbsp; 7: --... &nbsp; 8: ---.. &nbsp; 9: ----. &nbsp; 0: -----
              </p>
              <p className="text-slate-700 leading-relaxed">
  Once you understand this counting pattern, you can practice converting complete
  messages with our{" "}
  <Link
    href="/"
    className="text-green-600 font-medium underline hover:text-green-700"
  >
    Morse Code Translator
  </Link>{" "}
  or decode real Morse transmissions using the{" "}
  <Link
    href="/morse-code-decoder"
    className="text-green-600 font-medium underline hover:text-green-700"
  >
    Morse Code Decoder
  </Link>.
</p>
            </div>
          </div>
        </section>

        {/* History */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">History of Numbers in Morse Code</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <p>
              When Samuel Morse and Alfred Vail developed their telegraph code in the 1830s, they needed a way to
              represent not just letters, but also numerals and punctuation. The Morse code we use today is actually
              known as <strong>International Morse Code</strong>, which was standardized at the International Telegraph
              Conference in 1865.
            </p>
            <p>
              The original Morse code (sometimes called &quot;American Morse Code&quot; or &quot;Railroad Morse Code&quot;)
              had slightly different number representations. In the original code, numbers were:
            </p>
            <div className="bg-white rounded-lg p-4 border border-slate-200 font-mono text-center text-slate-600">
              1: .---- &nbsp; 2: ..--- &nbsp; 3: ...-- &nbsp; 4: ....- &nbsp; 5: .....<br />
              6: -.... &nbsp; 7: --... &nbsp; 8: ---.. &nbsp; 9: ----. &nbsp; 0: -----
            </div>
            <p>
              Interestingly, the number codes remained identical between American and International Morse Code. The
              main differences were in some letter codes. The number system was kept the same because its logical
              pattern made it intuitive and easy to learn for telegraph operators worldwide.
            </p>
            <p>
              In the early days of telegraphy, numbers were used extensively for transmitting financial data, stock
              prices, and statistical information. Telegraph companies developed specialized number codes and
              abbreviations to speed up transmission of numerical data, much like modern data compression.
            </p>
            <p>
              Today, Morse code numbers are still used in amateur radio communications, particularly in contest
              logging where call signs and serial numbers need to be transmitted quickly. They&apos;re also used in
              aviation navigation beacons (NAVAIDs), where each beacon is identified by a two- or three-letter code
              transmitted in Morse code. To practice with letters and numbers together, try our <Link href="/morse-code-decoder" className="text-green-600 underline hover:text-green-700">Morse code decoder</Link> or our <Link href="/" className="text-green-600 underline hover:text-green-700">Morse code translator</Link>, or visit the <Link href="/morse-code-alphabet" className="text-green-600 underline hover:text-green-700">Morse Code Alphabet</Link> for the complete A-Z reference.
            </p>
          </div>
        </section>

        {/* Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Tips for Remembering Morse Code Numbers</h2>
          <div className="space-y-3">
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
              <h3 className="font-semibold text-green-800 mb-1">Think of a Counting System</h3>
              <p className="text-green-700">Think of each number as &quot;counting dots&quot; from left to right. 1 has one dot, 2 has two dots, 3 has three dots, etc. Then 0 has zero dots (all dashes). This counting metaphor makes recall nearly automatic.</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-1">Remember the Midpoint</h3>
              <p className="text-slate-600">The number 5 (all dots: ..... ) is the center of the sequence. If you remember 1, 5, and 0, you can derive the rest: numbers go from more dashes to all dots (1-5), then from dashes with dots to all dashes (6-0).</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-1">Visualize the Flip</h3>
              <p className="text-slate-600">Notice that 1 and 9 are mirrors (.---- vs ----.), 2 and 8 are mirrors (..--- vs ---..), and 3 and 7 are mirrors (...-- vs --...). 4 and 6 are mirrors (....- vs -....). And 5 (.....) mirrors 0 (-----).</p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
  <h3 className="font-semibold text-green-800 mb-1">
    Practice with Real Messages
  </h3>

  <p className="text-green-700">
    After memorizing the number patterns, reinforce your skills by using our{" "}
    <Link
      href="/"
      className="underline font-medium"
    >
      Morse Code Translator
    </Link>{" "}
    to encode phone numbers, dates, and radio frequencies.
  </p>
</div>
</div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: "What is the pattern for Morse code numbers?", a: "Morse code numbers follow a perfectly logical pattern. 1 is one dot followed by four dashes (.----). Each subsequent number adds a dot and removes a dash until 5 (all dots). Then 6-9 reverse the pattern: 6 is one dash and four dots, up to 9 (four dashes and one dot). Zero is all five dashes (-----)." },
              { q: "Why are Morse code numbers five signals long?", a: "When Morse and Vail developed the code, they assigned shorter codes to the most common letters. Since numbers are less frequently used than letters, they were assigned five-signal codes to maximize overall transmission efficiency." },
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
            <Link href="/morse-code-alphabet" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              📋 Full Alphabet Chart
            </Link>
            <Link href="/" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              🔤 Morse Code Translator
            </Link>
            <Link href="/learn-morse-code" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              📖 Learn Morse Code
            </Link>
            <Link href="/morse-code-timing" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              ⏱️ Morse Timing
            </Link>
            <Link href="/morse-code-decoder" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              🔓 Morse Decoder
            </Link>
            <Link href="/morse-code-sounds" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              🔊 Morse Sounds
            </Link>
            <Link href="/morse-code-quiz" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              🎯 Morse Code Quiz
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
