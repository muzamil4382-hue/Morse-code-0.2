import type { Metadata } from "next";
import Link from "next/link";
import { MORSE_CODE, textToMorse } from "@/lib/morse";
import {
  generatePageMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import {
  getCharData,
  letterData,
  type MorseCharacterData,
} from "@/lib/morse-characters";

// ─── Utility helpers ─────────────────────────────────────────────────

function morseToDitDah(code: string): string {
  return code
    .split("")
    .map((c) => (c === "." ? "dit" : "dah"))
    .join("-");
}

function getAudioPattern(code: string): string {
  return code
    .split("")
    .map((c) => (c === "." ? "short" : "long"))
    .join(" + ");
}

function getTimingDescription(code: string): string {
  const parts = code.split("").map((c) => (c === "." ? "1 unit" : "3 units"));
  return parts.join(" + ");
}

function getDots(code: string): number {
  return code.split("").filter((c) => c === ".").length;
}

function getDashes(code: string): number {
  return code.split("").filter((c) => c === "-").length;
}

function extractCharFromSlug(slug: string): string {
  return slug.charAt(0).toUpperCase();
}

// ─── Static params ────────────────────────────────────────────────────
export function generateStaticParams() {
  return letterData.map((d) => ({ letter: d.char.toLowerCase() }));
}

// ─── Metadata ─────────────────────────────────────────────────────────
type PageParams = { params: Promise<{ letter: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { letter } = await params;
  const char = letter.toUpperCase();
  const data = getCharData(char);

  if (data) {
    return generatePageMeta(
      data.metaTitle,
      data.metaDescription,
      `/morse-code-letter/${letter}`,
      data.keywords
    );
  }

  const morseCode = MORSE_CODE[char] || "";
  return generatePageMeta(
    `${char} in Morse Code: Complete Guide & Translation | MorseCode.World`,
    `Learn the Morse code for the letter ${char} (${morseCode}). Complete guide with visual representation, audio pattern, timing, examples, and practice tips.`,
    `/morse-code-letter/${letter}`,
    [`${letter} in morse code`, `morse code ${letter}`, `letter ${char} morse`]
  );
}

// ─── Page component ───────────────────────────────────────────────────
export default async function LetterPage({ params }: PageParams) {
  const { letter } = await params;
  const char = letter.toUpperCase();
  const data = getCharData(char);
  const morseCode = data?.code || MORSE_CODE[char] || ".-";

  const ditDah = morseToDitDah(morseCode);
  const dotCount = getDots(morseCode);
  const dashCount = getDashes(morseCode);
  const elemCount = morseCode.length;

  const title = data?.title || `${char} in Morse Code: Complete Guide & Translation`;
  const introduction = data?.introduction || `The letter ${char} in Morse code is represented by ${morseCode}. This ${elemCount}-element code consists of ${dotCount} dot${dotCount !== 1 ? "s" : ""} and ${dashCount} dash${dashCount !== 1 ? "es" : ""}. The letter ${char} is an essential character in the English alphabet and Morse code communication.`;
  const soundRhythm = data?.soundRhythm || `When transmitted by sound, the letter ${char} produces the rhythm "${ditDah}." Each dit (dot) is a short beep lasting exactly one time unit, while each dah (dash) is a longer beep lasting three time units. Between each element within the letter, there is a silent gap of one time unit. The key to mastering the sound of ${char} is not to think about individual dots and dashes, but rather to hear the entire letter as a single rhythmic unit. Experienced Morse code operators do not mentally decode each dot and dash — they recognize the rhythm of the whole character at once, much like you recognize a spoken word without thinking about individual phonemes.`;
  const howToWrite = data?.howToWrite || `To write the letter ${char} in Morse code, write ${morseCode} on paper. Each dot is written as a small round mark and each dash as a longer horizontal line. When using a straight key, press down briefly for dots and press and hold for three times as long for dashes. For flashlight signaling, flash briefly for dots and hold steady for dashes.`;
  const importance = data?.importance || `The letter ${char} is an important part of the English alphabet and Morse code communication. With its ${elemCount}-element code of ${morseCode}, it appears frequently in English text. Mastering ${char} is essential for complete Morse code proficiency and fluent communication.`;
  const practiceTips = data?.practiceTips || `To master the letter ${char}, start by practicing the rhythm "${ditDah}" out loud repeatedly. Use a metronome and practice tapping ${char} in sequence with proper spacing. Create flash cards with ${char} on one side and ${morseCode} on the other. Practice writing common words containing ${char} in Morse code. Pair ${char} with commonly confused letters in drills to sharpen your discrimination skills.`;

  const wordExamples = data?.wordExamples || ["MAP", "CAP", "TAP", "RAP", "LAP", "GAP", "NAP", "SAP"];
  const funFacts = data?.funFacts || [
    `The letter ${char} has ${elemCount} element${elemCount > 1 ? "s" : ""} in its Morse code representation (${morseCode}).`,
    `In the International Morse Code standard, ${char}'s code was assigned based on its frequency in English text.`,
  ];
  const faqs = data?.faq || [
    {
      question: `What is the Morse code for the letter ${char}?`,
      answer: `The Morse code for the letter ${char} is "${morseCode}". This consists of ${dotCount} dot${dotCount !== 1 ? "s" : ""} and ${dashCount} dash${dashCount !== 1 ? "es" : ""}. In audio terms, this would sound like "${ditDah}."`,
    },
    {
      question: `How do you tap out the letter ${char} in Morse code?`,
      answer: `To tap the letter ${char}, you would produce the pattern "${ditDah}." Each dit (dot) is a brief tap or signal lasting one time unit, while each dah (dash) is a longer signal lasting three time units. There should be a one-unit gap between each element within the letter.`,
    },
    {
      question: `Is the letter ${char} difficult to learn in Morse code?`,
      answer: `The letter ${char} uses ${elemCount} element${elemCount > 1 ? "s" : ""} (${morseCode}), which makes it ${elemCount <= 2 ? "one of the easier letters to learn" : elemCount <= 3 ? "a moderately easy letter to master" : "a slightly more complex letter that requires more practice"}. The key to learning ${char} is to focus on its rhythm — "${ditDah}" — rather than trying to memorize individual dots and dashes.`,
    },
  ];

  const relatedSlugs: string[] = data?.relatedChars || [
    char === "A" ? "b-in-morse-code" : "a-in-morse-code",
    char === "Z" ? "y-in-morse-code" : String.fromCharCode(char.charCodeAt(0) + 1).toLowerCase() + "-in-morse-code",
    "e-in-morse-code",
    "t-in-morse-code",
  ];

  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Morse Code Alphabet", url: "/morse-code-alphabet" },
    { name: `Letter ${char}`, url: `/morse-code-letter/${letter}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-sm text-slate-500 mb-6"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-green-600 transition-colors">
              Home
            </Link>
            <span className="text-slate-400">/</span>
            <Link
              href="/morse-code-alphabet"
              className="hover:text-green-600 transition-colors"
            >
              morse-code-alphabet
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-medium">{char}</span>
          </nav>

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              {title}
            </h1>
            <p className="text-lg text-slate-600">
              Learn everything about the letter {char} in Morse code, including its
              signal pattern, audio rhythm, timing, practical examples, and proven
              practice tips to master it.
            </p>
          </div>

          {/* Large hero morse code display */}
          <div className="bg-slate-900 rounded-2xl p-8 md:p-10 mb-8 text-center">
            <p className="text-slate-400 text-sm mb-2 uppercase tracking-wider">
              Morse Code for {char}
            </p>
            <p className="text-green-400 font-mono text-3xl md:text-5xl tracking-[0.3em] mb-6">
              {morseCode}
            </p>
            <div className="flex items-center justify-center gap-2 md:gap-3">
              {morseCode.split("").map((c, i) => {
                if (c === ".") {
                  return (
                    <span
                      key={i}
                      className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-green-500 inline-block animate-pulse"
                      style={{ animationDelay: `${i * 200}ms` }}
                    />
                  );
                }
                if (c === "-") {
                  return (
                    <span
                      key={i}
                      className="w-12 h-4 md:w-20 md:h-6 rounded-full bg-green-500 inline-block animate-pulse"
                      style={{ animationDelay: `${i * 200}ms` }}
                    />
                  );
                }
                return null;
              })}
            </div>
            <p className="text-slate-400 text-sm mt-4 font-mono">
              {ditDah}
            </p>
          </div>

          {/* What is the Morse Code for [Letter]? */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              What is the Morse Code for {char}?
            </h2>
            <div className="prose-content text-slate-600 leading-relaxed space-y-4">
              <p>{introduction}</p>
            </div>
          </section>

          {/* Sound and Rhythm */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Sound and Rhythm of {char}
            </h2>
            <div className="prose-content text-slate-600 leading-relaxed space-y-4">
              <p>{soundRhythm}</p>
            </div>
          </section>

          {/* How to Write and Send */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              How to Write and Send {char}
            </h2>
            <div className="prose-content text-slate-600 leading-relaxed space-y-4">
              <p>{howToWrite}</p>
            </div>
          </section>

          {/* Why [Letter] is Important */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Why {char} is Important in Morse Code
            </h2>
            <div className="prose-content text-slate-600 leading-relaxed space-y-4">
              <p>{importance}</p>
            </div>
          </section>

          {/* Visual Representation Table */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {char} — Visual Representation
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-xl border border-slate-200 overflow-hidden">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">
                      Character
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">
                      Code
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">
                      Visual
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">
                      Audio Pattern
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">
                      Timing
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-3 text-2xl font-bold text-slate-900">
                      {char}
                    </td>
                    <td className="px-4 py-3 font-mono text-green-600 font-semibold text-lg">
                      {morseCode}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5">
                        {morseCode.split("").map((c, i) => {
                          if (c === ".")
                            return (
                              <span
                                key={i}
                                className="w-3 h-3 rounded-full bg-green-600 inline-block"
                              />
                            );
                          if (c === "-")
                            return (
                              <span
                                key={i}
                                className="w-10 h-3 rounded-full bg-green-600 inline-block"
                              />
                            );
                          return null;
                        })}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-sm">
                      {getAudioPattern(morseCode)}
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-sm">
                      {getTimingDescription(morseCode)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Examples of [Letter] in Words */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Examples of {char} in Words
            </h2>
            <p className="text-slate-600 mb-4">
              Here are common English words that contain the letter {char}, shown
              with their complete Morse code translations:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {wordExamples.map((word, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg border border-slate-200 p-4 hover:border-green-400 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-900">{word}</span>
                    <span className="text-xs text-slate-400">#{i + 1}</span>
                  </div>
                  <p className="font-mono text-green-600 text-sm break-all">
                    {textToMorse(word)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Practice Tips */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Practice Tips for Mastering {char}
            </h2>
            <div className="prose-content text-slate-600 leading-relaxed space-y-4">
              <p>{practiceTips}</p>
            </div>
          </section>

          {/* Fun Facts */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Fun Facts About {char} in Morse Code
            </h2>
            <div className="space-y-4">
              {funFacts.map((fact, i) => (
                <div
                  key={i}
                  className="bg-green-50 rounded-lg p-4 border border-green-200"
                >
                  <p className="text-slate-700 leading-relaxed">{fact}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="bg-white border border-slate-200 rounded-lg p-4 group"
                >
                  <summary className="font-semibold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                    {faq.question}
                    <span className="text-green-600 text-xl group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Related Characters */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Related Letters
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {relatedSlugs.map((slug) => {
                const relatedChar = extractCharFromSlug(slug);
                const relatedData = getCharData(relatedChar);
                const relatedCode = relatedData?.code || MORSE_CODE[relatedChar] || "";
                const href = `/morse-code-letter/${relatedChar.toLowerCase()}`;
                return (
                  <Link
                    key={slug}
                    href={href}
                    className="flex flex-col items-center p-4 bg-white border border-slate-200 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group text-center"
                  >
                    <span className="text-2xl font-bold text-slate-900 group-hover:text-green-600 transition-colors">
                      {relatedChar}
                    </span>
                    <span className="inline-flex items-center gap-0.5 my-1.5">
                      {relatedCode.split("").map((c, j) => {
                        if (c === ".")
                          return (
                            <span
                              key={j}
                              className="w-2 h-2 rounded-full bg-green-600 inline-block"
                            />
                          );
                        if (c === "-")
                          return (
                            <span
                              key={j}
                              className="w-5 h-2 rounded-full bg-green-600 inline-block"
                            />
                          );
                        return null;
                      })}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {relatedCode}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Try It Yourself CTA */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Try It Yourself
            </h2>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <p className="text-slate-600 mb-4">
                Ready to practice the letter {char} in Morse code? Use our full
                translator to convert any text to Morse code and back. Try typing
                words that contain {char} to see how it flows within complete
                messages.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                Open Morse Code Translator
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </section>
          {/* Internal Learning Resources */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
  <Link
    href="/"
    className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors"
  >
    🔤 Morse Code Translator
  </Link>

  <Link
    href="/learn-morse-code"
    className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors"
  >
    📖 Learn Morse Code
  </Link>

  <Link
    href="/morse-code-alphabet"
    className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors"
  >
    📋 Morse Code Alphabet
  </Link>

  <Link
    href="/morse-code-timing"
    className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors"
  >
    ⏱️ Morse Code Timing
  </Link>

  <Link
    href="/morse-code-sounds"
    className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors"
  >
    🔊 Morse Code Sounds
  </Link>

  <Link
    href="/morse-code-quiz"
    className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors"
  >
    🧠 Morse Code Quiz
  </Link>
          </div>
        </div>
      </main>
    </>
  );
}
