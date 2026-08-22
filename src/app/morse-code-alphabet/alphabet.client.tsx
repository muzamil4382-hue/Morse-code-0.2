"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  MORSE_CODE,
  playMorseAudio,
  getIsPlaying,
  stopMorseAudio,
} from "@/lib/morse";

import {
  Volume2,
  VolumeX,
  Radio,
  Plane,
  ShieldCheck,
  GraduationCap,
  Accessibility,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  Clock3,
  Headphones,
  Lightbulb,
  History,
  Network,
  MessageSquareText,
  CheckCircle2,
  CircleDot,
  Binary,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface AlphabetClientProps {
  faqs: FAQItem[];
}

const learningSteps = [
  {
    number: "01",
    title: "Start with Short Morse Patterns",
    description:
      "Begin with E (.), T (-), I (..), A (.-), N (-.) and M (--). These short characters make it easier to understand how longer Morse code patterns are built.",
  },
  {
    number: "02",
    title: "Learn the Sound, Not Just the Symbols",
    description:
      "Morse code is easier to recognize when each character becomes a sound pattern. For example, A (.-) and N (-.) contain the same elements but have different rhythms.",
  },
  {
    number: "03",
    title: "Practice Both Encoding and Decoding",
    description:
      "Convert letters into Morse code and Morse code back into text. Practicing in both directions improves sending, reading and listening recognition.",
  },
];

const modernUses = [
  {
    icon: Radio,
    title: "Amateur Radio and CW",
    description:
      "Morse code is commonly called CW, or Continuous Wave, in amateur radio. Operators continue to use it for communication and practice.",
  },
  {
    icon: Plane,
    title: "Aviation Identification",
    description:
      "Morse code identifiers have historically been used with aviation radio navigation aids, helping pilots identify specific facilities.",
  },
  {
    icon: ShieldCheck,
    title: "Emergency Signaling",
    description:
      "SOS (... --- ...) is the best-known Morse distress signal. Short and long signals can be communicated using sound, light or tapping.",
  },
  {
    icon: GraduationCap,
    title: "Education and STEM",
    description:
      "Morse code provides a practical example of encoding, signals, timing, communication systems and information representation.",
  },
  {
    icon: Accessibility,
    title: "Assistive Technology",
    description:
      "Morse-style input can be adapted for accessible communication and computer control using switches or other short-and-long input methods.",
  },
  {
    icon: History,
    title: "Communication History",
    description:
      "The Morse alphabet remains an important part of telegraph, maritime, railway, military and radio communication history.",
  },
];

const relatedResources = [
  {
    href: "/",
    title: "Morse Code Translator",
    description:
      "Convert text to Morse code and decode Morse into readable text.",
  },
  {
    href: "/morse-code-decoder",
    title: "Morse Code Decoder",
    description:
      "Paste or enter dots and dashes and decode them instantly.",
  },
  {
    href: "/morse-code-numbers",
    title: "Morse Code Numbers",
    description:
      "Learn the complete Morse code patterns for numbers 0 through 9.",
  },
  {
    href: "/morse-code-timing",
    title: "Morse Code Timing",
    description:
      "Understand dots, dashes, character spacing and word spacing.",
  },
  {
    href: "/morse-code-sounds",
    title: "Morse Code Sounds",
    description:
      "Listen to dits and dahs and improve character recognition.",
  },
  {
    href: "/learn-morse-code",
    title: "Learn Morse Code",
    description:
      "Follow a structured step-by-step guide for beginners.",
  },
  {
    href: "/morse-code-quiz",
    title: "Morse Code Quiz",
    description:
      "Test your knowledge with interactive Morse code practice.",
  },
  {
    href: "/binary-code-translator",
    title: "Binary Code Translator",
    description:
      "Explore another popular system for converting information into code.",
  },
];

export default function AlphabetClient({
  faqs,
}: AlphabetClientProps) {
  const [playingLetter, setPlayingLetter] = useState<string | null>(null);

  const playLetter = useCallback(
    async (letter: string, code: string) => {
      if (getIsPlaying()) {
        stopMorseAudio();
        setPlayingLetter(null);
        return;
      }

      setPlayingLetter(letter);

      await playMorseAudio(code, {
        speed: 18,
        frequency: 600,
        volume: 0.4,
      });

      setPlayingLetter(null);
    },
    []
  );

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <main className="min-h-screen bg-white">
      {/* =====================================================
          HERO / INTRODUCTION
      ====================================================== */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
          <nav
            className="mb-6 flex items-center gap-2 text-sm text-slate-500"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="transition-colors hover:text-green-600"
            >
              Home
            </Link>

            <span className="text-slate-400">/</span>

            <span className="font-medium text-slate-900">
              Morse Code Alphabet
            </span>
          </nav>

          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">
              <BookOpen className="h-4 w-4" />
              International Morse Code Reference
            </div>

            <h1 className="mb-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Morse Code Alphabet: Complete A–Z Chart
            </h1>

            <p className="max-w-4xl text-lg leading-relaxed text-slate-600">
              The <strong>Morse Code Alphabet</strong> assigns a unique
              combination of dots and dashes to each of the 26 English
              letters from A to Z. This page provides a complete{" "}
              <strong>International Morse Code alphabet chart</strong> with
              audio playback, individual letter pages, timing rules,
              memorization techniques and practical examples.
            </p>

            <p className="mt-4 max-w-4xl leading-relaxed text-slate-600">
              Each character is created using only two basic signal elements:
              a short signal called a <strong>dot or dit</strong> and a longer
              signal called a <strong>dash or dah</strong>. For example,{" "}
              <strong>E = .</strong> and <strong>T = -</strong>. By combining
              these signals in different sequences, Morse code can represent
              letters, numbers and several punctuation marks.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-green-700"
              >
                Try Morse Code Translator
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/learn-morse-code"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition-colors hover:border-green-400 hover:text-green-700"
              >
                <GraduationCap className="h-4 w-4" />
                Learn Morse Code
              </Link>
            </div>
          </div>

          {/* Quick facts */}

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-2xl font-bold text-green-600">26</div>
              <div className="mt-1 text-sm text-slate-600">
                Alphabet letters
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-2xl font-bold text-green-600">2</div>
              <div className="mt-1 text-sm text-slate-600">
                Basic signal types
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-2xl font-bold text-green-600">0–9</div>
              <div className="mt-1 text-sm text-slate-600">
                Morse code numbers
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-2xl font-bold text-green-600">1:3</div>
              <div className="mt-1 text-sm text-slate-600">
                Dot-to-dash duration
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ALPHABET CHART
      ====================================================== */}

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2 text-green-600">
              <CircleDot className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Quick Reference
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Complete Morse Code Alphabet Chart
            </h2>

            <p className="mt-3 max-w-3xl leading-relaxed text-slate-600">
              Explore all 26 letters in the International Morse Code alphabet.
              Click a letter to open its detailed guide or use the sound button
              to hear its Morse code pattern.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9">
            {letters.map((letter) => {
              const code = MORSE_CODE[letter];
              const isPlaying = playingLetter === letter;

              return (
                <div
                  key={letter}
                  className={`group rounded-xl border bg-white p-4 text-center transition-all duration-200 ${
                    isPlaying
                      ? "border-green-500 ring-2 ring-green-100 shadow-lg"
                      : "border-slate-200 hover:-translate-y-0.5 hover:border-green-400 hover:shadow-md"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-center gap-1">
                    <Link
                      href={`/morse-code-letter/${letter.toLowerCase()}`}
                      className="text-3xl font-bold text-slate-900 transition-colors hover:text-green-600"
                      aria-label={`Learn Morse code letter ${letter}`}
                    >
                      {letter}
                    </Link>

                    <button
                      onClick={() => playLetter(letter, code)}
                      className={`rounded-full p-1.5 transition-colors ${
                        isPlaying
                          ? "bg-green-100 text-green-600"
                          : "text-slate-400 hover:bg-green-50 hover:text-green-600"
                      }`}
                      title={
                        isPlaying
                          ? `Stop ${letter}`
                          : `Play ${letter} in Morse code`
                      }
                      aria-label={
                        isPlaying
                          ? `Stop playing ${letter}`
                          : `Play ${letter} in Morse code`
                      }
                    >
                      {isPlaying ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  <div className="mb-2 flex min-h-[14px] items-center justify-center gap-1">
                    {code.split("").map((char, index) => {
                      if (char === ".") {
                        return (
                          <span
                            key={index}
                            className={`inline-block h-2.5 w-2.5 rounded-full ${
                              isPlaying
                                ? "animate-pulse bg-green-500"
                                : "bg-green-600"
                            }`}
                          />
                        );
                      }

                      if (char === "-") {
                        return (
                          <span
                            key={index}
                            className={`inline-block h-2.5 w-6 rounded-full ${
                              isPlaying
                                ? "animate-pulse bg-green-500"
                                : "bg-green-600"
                            }`}
                          />
                        );
                      }

                      return null;
                    })}
                  </div>

                  <div className="font-mono text-sm font-semibold text-green-700">
                    {code}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-5">
            <div className="flex gap-3">
              <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />

              <div>
                <h3 className="font-semibold text-green-900">
                  Start with the shortest patterns
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-green-800">
                  Beginners can start with E (.), T (-), I (..), A (.-), N
                  (-.) and M (--). Once those patterns become familiar, move
                  to longer characters and continue with{" "}
                  <Link
                    href="/morse-code-numbers"
                    className="font-semibold underline hover:text-green-950"
                  >
                    Morse Code Numbers 0–9
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/morse-code-decoder"
              className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:underline"
            >
              Decode a Morse message
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/morse-code-sounds"
              className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:underline"
            >
              Listen to Morse code sounds
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW TO READ MORSE CODE
      ====================================================== */}

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-2 text-green-600">
              <Clock3 className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Morse Code Basics
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              How to Read the Morse Code Alphabet
            </h2>

            <p className="mt-3 leading-relaxed text-slate-600">
              Reading Morse code is not only about recognizing dots and
              dashes. Timing and spacing are also part of the system. A Morse
              character becomes easier to recognize when you understand the
              relationship between the short signal, long signal and the gaps
              between characters.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                <CircleDot className="h-5 w-5" />
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                Dot (Dit) — 1 Time Unit
              </h3>

              <p className="mt-2 leading-relaxed text-slate-600">
                A dot is the basic short signal in Morse code. It can be
                transmitted as a sound, flash, electrical signal or another
                short-duration input.
              </p>

              <div className="mt-4 rounded-lg bg-slate-50 px-4 py-3 font-mono font-semibold text-green-700">
                E = .
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                <Binary className="h-5 w-5" />
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                Dash (Dah) — 3 Time Units
              </h3>

              <p className="mt-2 leading-relaxed text-slate-600">
                A dash lasts three dot units. This creates the standard 1:3
                timing relationship between a dot and a dash.
              </p>

              <div className="mt-4 rounded-lg bg-slate-50 px-4 py-3 font-mono font-semibold text-green-700">
                T = -
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full border-collapse bg-white text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                    Morse Element
                  </th>

                  <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                    Standard Duration
                  </th>

                  <th className="hidden px-4 py-3 text-sm font-semibold text-slate-700 sm:table-cell">
                    Purpose
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    Dot
                  </td>

                  <td className="px-4 py-3 text-green-700">1 unit</td>

                  <td className="hidden px-4 py-3 text-sm text-slate-600 sm:table-cell">
                    Short signal
                  </td>
                </tr>

                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    Dash
                  </td>

                  <td className="px-4 py-3 text-green-700">3 units</td>

                  <td className="hidden px-4 py-3 text-sm text-slate-600 sm:table-cell">
                    Long signal
                  </td>
                </tr>

                <tr className="border-b border-slate-100">
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    Element Gap
                  </td>

                  <td className="px-4 py-3 text-green-700">1 unit</td>

                  <td className="hidden px-4 py-3 text-sm text-slate-600 sm:table-cell">
                    Between dots and dashes in one character
                  </td>
                </tr>

                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    Letter Gap
                  </td>

                  <td className="px-4 py-3 text-green-700">3 units</td>

                  <td className="hidden px-4 py-3 text-sm text-slate-600 sm:table-cell">
                    Between complete characters
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    Word Gap
                  </td>

                  <td className="px-4 py-3 text-green-700">7 units</td>

                  <td className="hidden px-4 py-3 text-sm text-slate-600 sm:table-cell">
                    Between complete words
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Link
            href="/morse-code-timing"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-green-700 hover:underline"
          >
            Explore the complete Morse Code Timing Guide
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* =====================================================
          LEARNING
      ====================================================== */}

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-2 text-green-600">
              <Headphones className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Learning Strategy
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              How to Memorize the Morse Code Alphabet
            </h2>

            <p className="mt-3 leading-relaxed text-slate-600">
              A useful approach is to combine visual reference with listening
              practice. The long-term goal is to recognize each Morse character
              as a complete sound pattern instead of manually counting every
              dot and dash.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {learningSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-xl border border-slate-200 bg-white p-6"
              >
                <div className="text-sm font-bold tracking-wider text-green-600">
                  {step.number}
                </div>

                <h3 className="mt-3 text-lg font-semibold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-green-200 bg-green-50 p-6">
              <h3 className="text-lg font-semibold text-green-900">
                Koch Method
              </h3>

              <p className="mt-3 leading-relaxed text-green-800">
                The Koch method begins with a small number of characters and
                gradually introduces additional characters as recognition
                improves. It focuses on learning character sounds as complete
                patterns.
              </p>
            </div>

            <div className="rounded-xl border border-green-200 bg-green-50 p-6">
              <h3 className="text-lg font-semibold text-green-900">
                Farnsworth Timing
              </h3>

              <p className="mt-3 leading-relaxed text-green-800">
                Farnsworth timing keeps characters at a useful character speed
                while increasing spacing between characters and words during
                early practice.
              </p>
            </div>
          </div>

          <div className="mt-7">
            <Link
              href="/learn-morse-code"
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-green-700"
            >
              Start Learning Morse Code
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          COMMON MISTAKES
      ====================================================== */}

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-2 text-amber-600">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Beginner Mistakes
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Common Morse Code Mistakes to Avoid
            </h2>

            <p className="mt-3 leading-relaxed text-slate-600">
              Most beginners struggle with a small number of recurring
              problems. Recognizing them early can make practice more focused.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              [
                "Confusing Reversed Patterns",
                "Characters such as A (.-) and N (-.) use the same two elements in a different order. Practice similar pairs together.",
              ],
              [
                "Ignoring Timing and Spacing",
                "Correct gaps help a receiver separate individual signals, letters and complete words.",
              ],
              [
                "Learning Too Much at Once",
                "Trying to memorize the full alphabet in one session can create unnecessary confusion. Use smaller groups and review them.",
              ],
              [
                "Counting Every Dot and Dash Forever",
                "Visual counting is useful at the beginning, but listening recognition improves when you learn each character as a rhythm.",
              ],
              [
                "Skipping Audio Practice",
                "Morse code is fundamentally a time-based signal system, so combine visual charts with listening practice.",
              ],
              [
                "Practicing Only One Direction",
                "Practice both text-to-Morse encoding and Morse-to-text decoding to build stronger recognition.",
              ],
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />

                  <div>
                    <h3 className="font-semibold text-slate-900">{title}</h3>

                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7">
            <Link
              href="/morse-code-quiz"
              className="inline-flex items-center gap-2 font-semibold text-green-700 hover:underline"
            >
              Test yourself with the Morse Code Quiz
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          HISTORY
      ====================================================== */}

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-2 text-green-600">
              <History className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                History
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              History of the Morse Code Alphabet
            </h2>

            <p className="mt-3 leading-relaxed text-slate-600">
              Morse code developed alongside the electric telegraph and became
              one of the most influential communication systems of the
              nineteenth century.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Samuel Morse
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Samuel Morse became closely associated with the development of
                the electromagnetic telegraph, a system designed to transmit
                information over long distances using electrical signals.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Alfred Vail
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Alfred Vail worked with Morse during the development of the
                telegraph system and contributed to the early development of
                the coding system used for communication.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                The 1844 Telegraph Message
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                In May 1844, Morse successfully transmitted a message over the
                approximately 40-mile Washington-to-Baltimore telegraph line,
                demonstrating the practical potential of long-distance
                electrical communication.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-6">
            <h3 className="font-semibold text-green-900">
              From American Morse to International Morse Code
            </h3>

            <p className="mt-2 leading-relaxed text-green-800">
              The original American Morse system and International Morse Code
              are not identical. International Morse Code became the more
              widely standardized form for radio communication and is the
              system used throughout this alphabet chart.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          MODERN USES
      ====================================================== */}

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-2 text-green-600">
              <Network className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Modern Applications
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Where Is Morse Code Used Today?
            </h2>

            <p className="mt-3 leading-relaxed text-slate-600">
              Although Morse code originated in the nineteenth century, it
              continues to appear in amateur radio, education, accessibility,
              historical communication and specialized signaling contexts.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modernUses.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-green-50 text-green-600">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="font-semibold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          DECODING TREE
      ====================================================== */}

      <section className="border-y border-slate-200 bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Morse Code Decoding Tree
            </h2>

            <p className="mx-auto mt-3 max-w-3xl leading-relaxed text-slate-600">
              A Morse code tree helps visualize how characters are built.
              Starting from the top, every dot and dash follows a different
              branch until a character is reached.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="min-w-[650px] font-mono text-sm leading-loose">
              <div className="mb-4 text-center text-slate-400">
                ↓ START
              </div>

              <div className="mb-2 text-center text-lg font-bold text-green-700">
                E (.){" "}
                <span className="mx-10 text-slate-300">│</span>
                T (-)
              </div>

              <div className="mb-6 text-center text-xs text-slate-400">
                dot branch ← &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                → dash branch
              </div>

              <div className="grid grid-cols-4 gap-6">
                <div>
                  <div className="font-bold text-green-700">I (..)</div>

                  <div className="pl-4 text-slate-700">
                    <div>S (...)</div>
                    <div>H (....)</div>
                    <div>V (...-)</div>
                    <div>U (..-)</div>
                    <div>F (..-.)</div>
                  </div>
                </div>

                <div>
                  <div className="font-bold text-green-700">A (.-)</div>

                  <div className="pl-4 text-slate-700">
                    <div>R (.-.)</div>
                    <div>L (.-..)</div>
                    <div>W (.--)</div>
                    <div>P (.--.)</div>
                    <div>J (.---)</div>
                  </div>
                </div>

                <div>
                  <div className="font-bold text-green-700">N (-.)</div>

                  <div className="pl-4 text-slate-700">
                    <div>D (-..)</div>
                    <div>B (-...)</div>
                    <div>X (-..-)</div>
                    <div>K (-.-)</div>
                    <div>C (-.-.)</div>
                    <div>Y (-.--)</div>
                  </div>
                </div>

                <div>
                  <div className="font-bold text-green-700">M (--)</div>

                  <div className="pl-4 text-slate-700">
                    <div>G (--.)</div>
                    <div>Z (--..)</div>
                    <div>Q (--.-)</div>
                    <div>O (---)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">
                How to Read the Tree
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Start from the top and follow one branch for each signal. For
                example, R is .-. : the first dot moves toward E, the dash
                moves toward A and the final dot reaches R.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">
                Why the Tree Helps
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                The tree reveals relationships between characters. Instead of
                memorizing all 26 letters as unrelated combinations, you can
                see how longer patterns grow from shorter ones.
              </p>
            </div>
          </div>

          <div className="mt-7 text-center">
            <Link
              href="/morse-code-decoder"
              className="inline-flex items-center gap-2 font-semibold text-green-700 hover:underline"
            >
              Practice with the Morse Code Decoder
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ====================================================== */}

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-2 text-green-600">
              <MessageSquareText className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                FAQ
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Frequently Asked Questions About the Morse Code Alphabet
            </h2>

            <p className="mt-3 leading-relaxed text-slate-600">
              Common questions about Morse code letters, learning methods,
              timing, decoding and practical use.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group rounded-xl border border-slate-200 bg-white px-5 py-4"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">
                  {faq.question}

                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-green-50 text-lg text-green-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-4 max-w-4xl leading-relaxed text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          RELATED RESOURCES / INTERNAL LINKS
      ====================================================== */}

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Explore More Morse Code Tools
            </h2>

            <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-slate-600">
              Continue translating, decoding, listening and practicing with
              these related tools and learning resources.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedResources.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-green-400 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-slate-900 transition-colors group-hover:text-green-700">
                    {resource.title}
                  </h3>

                  <ArrowRight className="h-4 w-4 flex-shrink-0 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-green-600" />
                </div>

                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {resource.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="bg-gradient-to-br from-green-700 to-green-900 py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-green-100">
              <CheckCircle2 className="h-4 w-4" />
              Free Morse Code Tools
            </div>

            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Ready to Practice the Morse Code Alphabet?
            </h2>

            <p className="mt-4 leading-relaxed text-green-100">
              Use the Morse Code Translator to encode text, decode dots and
              dashes, explore individual letters and improve recognition with
              audio practice.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 font-semibold text-green-700 transition-colors hover:bg-green-50"
              >
                Open Morse Code Translator
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/learn-morse-code"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/20"
              >
                Start Learning
                <GraduationCap className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}