import type { Metadata } from "next";
import Link from "next/link";
import { MORSE_CODE, textToMorse } from "@/lib/morse";
import { generatePageMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo";

export interface RelatedWord {
  word: string;
  slug: string;
  morse: string;
}

export interface WordPageConfig {
  word: string;
  morseStr: string;
  title: string;
  metaTitle: string;
  description: string;
  slug: string;
  faqs: { question: string; answer: string }[];
  relatedWords: RelatedWord[];
}

export function generateWordPageMeta(config: WordPageConfig): Metadata {
  return generatePageMeta(
    config.metaTitle,
    config.description,
    `/${config.slug}`,
    [`${config.word.toLowerCase()} in morse code`, `morse code for ${config.word.toLowerCase()}`, `${config.word.toLowerCase()} morse code translation`]
  );
}

export function generateWordPageSchemas(config: WordPageConfig) {
  const faqSchema = generateFAQSchema(config.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: config.word, url: `/${config.slug}` },
  ]);
  return { faqSchema, breadcrumbSchema };
}

function MorseVisual({ code }: { code: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      {code.split("").map((char, i) => {
        if (char === ".") {
          return (
            <span key={i} className="inline-block w-2 h-2 rounded-full bg-green-600" />
          );
        }
        if (char === "-") {
          return (
            <span key={i} className="inline-block w-5 h-2 rounded-full bg-green-600" />
          );
        }
        return null;
      })}
    </span>
  );
}

function LetterBreakdown({ word }: { word: string }) {
  const letters = word.replace(/\s+/g, "").toUpperCase().split("");
  return (
    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Letter-by-Letter Breakdown</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {letters.map((letter, i) => {
          const morse = MORSE_CODE[letter] || "";
          if (!morse) return null;
          return (
            <div
              key={i}
              className="bg-white rounded-lg border border-slate-200 p-3 text-center hover:border-green-400 hover:shadow-sm transition-all"
            >
              <div className="text-2xl font-bold text-slate-900 mb-1">{letter}</div>
              <div className="flex items-center justify-center gap-0.5 mb-1">
                <MorseVisual code={morse} />
              </div>
              <div className="text-xs font-mono text-green-600">{morse}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-slate-200">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-800">Full Morse Code:</span>{" "}
          <span className="font-mono text-green-600">{textToMorse(word)}</span>
        </p>
      </div>
    </div>
  );
}

export function WordPageTemplate({
  config,
  children,
}: {
  config: WordPageConfig;
  children: React.ReactNode;
}) {
  const { faqSchema, breadcrumbSchema } = generateWordPageSchemas(config);

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
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-medium">{config.word}</span>
          </nav>

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{config.title}</h1>
            <p className="text-lg text-slate-600">{config.description}</p>
          </div>

          {/* Morse code display */}
          <div className="bg-slate-900 rounded-xl p-6 mb-8">
            <p className="text-center text-green-400 font-mono text-2xl md:text-3xl tracking-wider">
              {config.morseStr}
            </p>
            <div className="flex items-center justify-center gap-1 mt-4">
              {config.morseStr.split("").map((char, i) => {
                if (char === ".") {
                  return <span key={i} className="inline-block w-3 h-3 rounded-full bg-green-500" />;
                }
                if (char === "-") {
                  return <span key={i} className="inline-block w-7 h-3 rounded-full bg-green-500" />;
                }
                if (char === " ") {
                  return <span key={i} className="w-3" />;
                }
                if (char === "/") {
                  return <span key={i} className="w-6" />;
                }
                return null;
              })}
            </div>
          </div>

          {/* Letter breakdown */}
          <LetterBreakdown word={config.word} />

          {/* Content sections */}
          <div className="mt-8 prose-content">{children}</div>

          {/* FAQ */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {config.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="bg-white border border-slate-200 rounded-lg p-4 group"
                >
                  <summary className="font-semibold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                    {faq.question}
                    <span className="text-green-600 text-xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-slate-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Related words */}
          {config.relatedWords.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Morse Code Translations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {config.relatedWords.map((rw) => (
                  <Link
                    key={rw.slug}
                    href={`/${rw.slug}`}
                    className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group"
                  >
                    <span className="font-medium text-slate-900 group-hover:text-green-600 transition-colors">
                      {rw.word}
                    </span>
                    <span className="text-sm font-mono text-slate-500">{rw.morse}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Links to other pages */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Explore More</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Link
                href="/morse-code-translator"
                className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors"
              >
                🔤 Morse Code Translator
              </Link>
              <Link
                href="/morse-code-decoder"
                className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors"
              >
                🔓 Morse Code Decoder
              </Link>
              <Link
                href="/morse-code-alphabet"
                className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors"
              >
                📋 Alphabet Chart
              </Link>
              <Link
                href="/morse-code-letters"
                className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors"
              >
                🔠 Letters Guide
              </Link>
              <Link
                href="/morse-code-numbers"
                className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors"
              >
                🔢 Numbers Guide
              </Link>
              <Link
                href="/learn-morse-code"
                className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors"
              >
                📖 Learn Morse Code
              </Link>
              <Link
                href="/morse-code-quiz"
                className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors"
              >
                🎯 Morse Code Quiz
              </Link>
              <Link
                href="/morse-code-sounds"
                className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors"
              >
                🔊 Morse Code Sounds
              </Link>
              <Link
                href="/morse-code-timing"
                className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors"
              >
                ⏱️ Morse Code Timing
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
