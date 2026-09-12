"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Clock,
  Info,
} from "lucide-react";
import { playMorseAudio } from "@/lib/morse";

interface FAQ {
  question: string;
  answer: string;
}

interface Props {
  faqs: FAQ[];
}

const WPM_TABLE = [
  {
    wpm: 5,
    dot: 240,
    dash: 720,
    intraChar: 240,
    interChar: 720,
    wordGap: 1680,
    level: "Slow practice",
  },
  {
    wpm: 10,
    dot: 120,
    dash: 360,
    intraChar: 120,
    interChar: 360,
    wordGap: 840,
    level: "Beginner practice",
  },
  {
    wpm: 15,
    dot: 80,
    dash: 240,
    intraChar: 80,
    interChar: 240,
    wordGap: 560,
    level: "Moderate practice",
  },
  {
    wpm: 20,
    dot: 60,
    dash: 180,
    intraChar: 60,
    interChar: 180,
    wordGap: 420,
    level: "Common practice speed",
  },
  {
    wpm: 25,
    dot: 48,
    dash: 144,
    intraChar: 48,
    interChar: 144,
    wordGap: 336,
    level: "Fast practice",
  },
  {
    wpm: 30,
    dot: 40,
    dash: 120,
    intraChar: 40,
    interChar: 120,
    wordGap: 280,
    level: "Advanced practice",
  },
];

export default function TimingClient({ faqs }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [wpm, setWpm] = useState(20);

  const dotDur = Math.round(1200 / wpm);
  const dashDur = dotDur * 3;
  const intraGap = dotDur;
  const interCharGap = dotDur * 3;
  const wordGap = dotDur * 7;

  const handlePlayExample = () => {
    playMorseAudio(".... . .-.. .-.. ---", {
      speed: wpm,
      frequency: 600,
      volume: 0.5,
    });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="w-full bg-gradient-to-br from-green-800 via-green-800 to-emerald-950">
        <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Morse Code Timing: WPM, Speed & Spacing
          </h1>

          <p className="mx-auto mt-5 max-w-4xl text-lg leading-8 text-green-50/90 sm:text-xl">
            Understand{" "}
            <strong className="font-semibold text-white">
              Morse code timing
            </strong>
            , WPM speed, dot and dash duration, character spacing, word gaps,
            the <strong className="font-semibold text-white">PARIS 50-unit</strong>{" "}
            reference, and the{" "}
            <strong className="font-semibold text-white">
              Farnsworth timing method
            </strong>
            .
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-green-100">
            <span>⏱ Standard Timing Ratios</span>
            <span>📊 Interactive WPM Calculator</span>
            <span>📡 International Morse Code</span>
            <span>🔊 Audio Speed Practice</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-green-700 dark:text-green-400">
            Morse Code Speed Guide
          </span>

          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            How Morse Code Timing Works
          </h2>

          <p className="mt-5 w-full max-w-4xl leading-8 text-slate-600 dark:text-slate-400">
            Morse code is more than a collection of dots and dashes. The
            relationship between signal lengths and silent gaps is part of the
            communication system itself. Timing tells a listener where one
            signal element ends, where a character ends, and where a word begins. A correctly transmitted message uses
            proportional timing so that a listener can distinguish individual
            elements, characters, and words.
          </p>

          <p className="mt-4 w-full max-w-4xl leading-8 text-slate-600 dark:text-slate-400">
            International Morse Code is defined by the{" "}
            <strong>International Telecommunication Union</strong> in{" "}
            <strong>ITU-R M.1677</strong>. The practical timing model is based
            on a simple unit system: a dot equals one unit and all other
            elements are measured as multiples of that unit.
          </p>

          <p className="mt-4 w-full max-w-4xl leading-8 text-slate-600 dark:text-slate-400">
            If you are learning the actual character patterns, start with the{" "}
            <Link
              href="/morse-code-alphabet"
              className="font-semibold text-green-700 hover:underline dark:text-green-400"
            >
              Morse Code Alphabet
            </Link>
            . You can then use the{" "}
            <Link
              href="/"
              className="font-semibold text-green-700 hover:underline dark:text-green-400"
            >
              Morse Code Translator
            </Link>{" "}
            to convert messages and the{" "}
            <Link
              href="/morse-code-sounds"
              className="font-semibold text-green-700 hover:underline dark:text-green-400"
            >
              Morse Code Sounds
            </Link>{" "}
            page to hear how different characters are transmitted.
          </p>
        </div>
      </section>

      {/* =====================================================
          TIMING RULES INFOGRAPHIC
      ====================================================== */}

      <section className="mx-auto max-w-5xl px-4 pb-14 sm:px-6 lg:px-8">
        <figure className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <Image
              src="/images/infographic/morse-code-timing-rules.webp"
              alt="Morse code timing rules infographic showing the 1-3-1-3-7 ratio for dots, dashes, character gaps, letter gaps, and word gaps"
              width={1200}
              height={675}
              priority
              className="h-auto w-full"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>

          <figcaption className="mt-4 text-center text-sm leading-7 text-slate-600 dark:text-slate-400">
            Standard International Morse code timing uses proportional units:
            dot 1, dash 3, internal character gap 1, letter gap 3, and word gap 7.
          </figcaption>
        </figure>
      </section>

      {/* =====================================================
          STANDARD TIMING
      ====================================================== */}

      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/40">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-green-700 dark:text-green-400">
              Standard Reference
            </span>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              The 1–3–1–3–7 Morse Code Timing Rule
            </h2>

            <p className="mt-5 w-full max-w-4xl leading-8 text-slate-600 dark:text-slate-400">
              Standard Morse timing uses five important proportional durations.
              Once you understand these values, you can calculate the timing
              for any WPM speed.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                {
                  title: "Dot",
                  value: "1 Unit",
                  text: "The basic timing reference.",
                },
                {
                  title: "Dash",
                  value: "3 Units",
                  text: "Three times the dot duration.",
                },
                {
                  title: "Inside Character",
                  value: "1 Unit",
                  text: "Gap between dots and dashes.",
                },
                {
                  title: "Between Letters",
                  value: "3 Units",
                  text: "Gap separating characters.",
                },
                {
                  title: "Between Words",
                  value: "7 Units",
                  text: "The standard word space.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
                >
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {item.title}
                  </p>

                  <p className="mt-3 text-2xl font-extrabold text-green-700 dark:text-green-400">
                    {item.value}
                  </p>

                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-6 dark:border-green-900/50 dark:bg-green-950/20">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Why the Ratios Matter
              </h3>

              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                At 20 WPM, one timing unit equals 60 milliseconds. Therefore,
                a dash lasts 180 milliseconds, the character gap is 180
                milliseconds, and the word gap is 420 milliseconds. When the
                transmission speed changes, these durations scale
                proportionally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MORSE CODE SPACING INFOGRAPHIC
      ====================================================== */}

      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-background">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <figure className="mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <Image
                src="/images/infographic/morse-code-spacing-guide.webp"
                alt="Morse code spacing guide showing one-unit gaps inside characters, three-unit gaps between letters, and seven-unit gaps between words"
                width={1200}
                height={675}
                className="h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>

            <figcaption className="mt-4 text-center text-sm leading-7 text-slate-600 dark:text-slate-400">
              Morse code spacing helps separate signal elements, individual letters,
              and complete words so a transmitted message remains easy to interpret.
            </figcaption>
          </figure>

          <p className="mx-auto mt-6 max-w-4xl text-center leading-8 text-slate-600 dark:text-slate-400">
            For practical listening exercises, open{" "}
            <Link
              href="/morse-code-sounds"
              className="font-semibold text-green-700 hover:underline dark:text-green-400"
            >
              Morse Code Sounds
            </Link>{" "}
            or use the{" "}
            <Link
              href="/"
              className="font-semibold text-green-700 hover:underline dark:text-green-400"
            >
              Morse Code Translator
            </Link>{" "}
            to generate your own practice messages.
          </p>
        </div>
      </section>

      {/* =====================================================
          INTERACTIVE CALCULATOR
      ====================================================== */}

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-slate-200 border-t-4 border-t-green-700 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-green-700 dark:text-green-400">
                  Interactive Tool
                </span>

                <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                  Morse Code WPM Calculator
                </h2>

                <p className="mt-3 max-w-3xl leading-7 text-slate-600 dark:text-slate-400">
                  Change the WPM value to calculate the exact duration of a
                  dot, dash, character gap, and word gap.
                </p>
              </div>

              <div className="rounded-xl border border-green-200 bg-green-50 px-5 py-3 text-center dark:border-green-900 dark:bg-green-950/30">
                <span className="block text-xs text-slate-500 dark:text-slate-400">
                  Current Speed
                </span>

                <span className="text-2xl font-extrabold text-green-700 dark:text-green-400">
                  {wpm} WPM
                </span>
              </div>
            </div>

            <div className="mt-8">
              <input
                type="range"
                min="5"
                max="40"
                value={wpm}
                onChange={(e) => setWpm(Number(e.target.value))}
                className="w-full accent-green-700"
                aria-label="Morse code speed in words per minute"
              />

              <div className="mt-2 flex justify-between text-xs text-slate-400">
                <span>5 WPM</span>
                <span>40 WPM</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
              {[
                {
                  label: "Dot",
                  value: dotDur,
                },
                {
                  label: "Dash",
                  value: dashDur,
                },
                {
                  label: "Inside Character",
                  value: intraGap,
                },
                {
                  label: "Letter Gap",
                  value: interCharGap,
                },
                {
                  label: "Word Gap",
                  value: wordGap,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center dark:border-slate-800 dark:bg-slate-950"
                >
                  <p className="text-2xl font-extrabold text-green-700 dark:text-green-400">
                    {item.value}
                    <span className="ml-1 text-sm font-medium">ms</span>
                  </p>

                  <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handlePlayExample}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
              >
                <Clock className="h-4 w-4" />
                Play HELLO at {wpm} WPM
              </button>

              <Link
                href="/morse-code-sounds"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-green-600 hover:text-green-700 dark:border-slate-700 dark:text-slate-200"
              >
                Practice Morse Sounds
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FORMULA
      ====================================================== */}

      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/40">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-green-700 dark:text-green-400">
                WPM Formula
              </span>

              <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                How to Calculate Morse Code Timing
              </h2>

              <p className="mt-5 w-full max-w-4xl leading-8 text-slate-600 dark:text-slate-400">
                Morse speed is commonly calculated using the reference word{" "}
                <strong>PARIS</strong>, which represents 50 timing units under
                the standard measurement convention.
              </p>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm font-medium text-slate-500">
                  Dot duration formula
                </p>

                <p className="mt-3 font-mono text-2xl font-bold text-green-700 dark:text-green-400">
                  1200 ÷ WPM = milliseconds
                </p>

                <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                  Example: at 20 WPM, 1200 ÷ 20 = 60 milliseconds per dot.
                  Every other timing value is then calculated from that
                  fundamental duration.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                <Info className="h-5 w-5 text-green-700" />
                Quick Example at 20 WPM
              </h3>

              <div className="mt-6 space-y-4">
                {[
                  ["Dot", "60 ms"],
                  ["Dash", "180 ms"],
                  ["Gap inside character", "60 ms"],
                  ["Gap between letters", "180 ms"],
                  ["Gap between words", "420 ms"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-800"
                  >
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {label}
                    </span>

                    <span className="font-mono font-bold text-green-700 dark:text-green-400">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WPM TABLE
      ====================================================== */}

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-green-700 dark:text-green-400">
            Speed Reference
          </span>

          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Morse Code WPM Timing Chart
          </h2>

          <p className="mt-4 max-w-4xl leading-8 text-slate-600 dark:text-slate-400">
            This reference table shows calculated timing values at common Morse
            code speeds. The values use the standard formula of 1200 divided by
            WPM for one dot duration.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="p-4 text-left font-bold">Speed</th>
                    <th className="p-4 text-left font-bold">Dot</th>
                    <th className="p-4 text-left font-bold">Dash</th>
                    <th className="p-4 text-left font-bold">Inside Character</th>
                    <th className="p-4 text-left font-bold">Letter Gap</th>
                    <th className="p-4 text-left font-bold">Word Gap</th>
                    <th className="p-4 text-left font-bold">Practice Use</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {WPM_TABLE.map((row) => (
                    <tr
                      key={row.wpm}
                      className={
                        wpm === row.wpm
                          ? "bg-green-50 dark:bg-green-950/20"
                          : ""
                      }
                    >
                      <td className="p-4 font-bold text-slate-900 dark:text-white">
                        {row.wpm} WPM
                      </td>

                      <td className="p-4 font-mono text-green-700 dark:text-green-400">
                        {row.dot} ms
                      </td>

                      <td className="p-4">{row.dash} ms</td>
                      <td className="p-4">{row.intraChar} ms</td>
                      <td className="p-4">{row.interChar} ms</td>
                      <td className="p-4">{row.wordGap} ms</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">
                        {row.level}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FARNSWORTH
      ====================================================== */}

      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/40">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-green-700 dark:text-green-400">
              Learning Method
            </span>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              Farnsworth Timing Method Explained
            </h2>

            <p className="mt-5 w-full max-w-4xl leading-8 text-slate-600 dark:text-slate-400">
              Farnsworth timing is designed to help learners recognize the
              sound pattern of complete Morse characters. Instead of slowing
              down every dot and dash, the character itself can be sent at a
              higher character speed while additional space is inserted between
              letters and words.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Standard Timing
                </h3>

                <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                  At standard timing, the entire message scales according to
                  the selected WPM. Lower speed means longer dots, longer
                  dashes, and longer standard gaps.
                </p>
              </div>

              <div className="rounded-2xl border border-green-200 bg-green-50 p-6 dark:border-green-900/50 dark:bg-green-950/20">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Farnsworth Timing
                </h3>

                <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                  Individual characters retain their selected internal rhythm,
                  while extra delay is added between characters and words to
                  reduce the overall message speed.
                </p>
              </div>
            </div>

            <p className="mt-8 leading-8 text-slate-600 dark:text-slate-400">
              To combine timing practice with character recognition, use the{" "}
              <Link
                href="/learn-morse-code"
                className="font-semibold text-green-700 hover:underline dark:text-green-400"
              >
                Learn Morse Code guide
              </Link>
              . After practicing, test your recognition speed with the{" "}
              <Link
                href="/morse-code-quiz"
                className="font-semibold text-green-700 hover:underline dark:text-green-400"
              >
                Morse Code Quiz
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          RELATED RESOURCES
      ====================================================== */}

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-green-700 dark:text-green-400">
          Internal Resources
        </span>

        <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
          Continue Learning Morse Code
        </h2>

        <p className="mt-4 max-w-3xl leading-7 text-slate-600 dark:text-slate-400">
          Explore related tools and guides for translation, decoding, character
          recognition, audio practice, numbers, SOS signals, and Morse code
          learning.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              href: "/",
              icon: "🔤",
              title: "Morse Code Translator",
              text: "Convert text to Morse and Morse back to readable text.",
            },
            {
              href: "/morse-code-decoder",
              icon: "🔓",
              title: "Morse Code Decoder",
              text: "Decode dots and dashes with character analysis.",
            },
            {
              href: "/morse-code-alphabet",
              icon: "📋",
              title: "Morse Code Alphabet",
              text: "Study all A–Z Morse code character patterns.",
            },
            {
              href: "/morse-code-numbers",
              icon: "🔢",
              title: "Morse Code Numbers",
              text: "Learn how the digits 0 through 9 are represented.",
            },
            {
              href: "/morse-code-sounds",
              icon: "🔊",
              title: "Morse Code Sounds",
              text: "Listen to Morse signals and practice recognition.",
            },
            {
              href: "/learn-morse-code",
              icon: "📖",
              title: "Learn Morse Code",
              text: "Follow a structured path for learning Morse code.",
            },
            {
              href: "/morse-code-quiz",
              icon: "🎯",
              title: "Morse Code Quiz",
              text: "Test your knowledge with interactive questions.",
            },
            {
              href: "/blog/sos-signal-morse-code-everything-you-need-to-know",
              icon: "🆘",
              title: "SOS Signal in Morse Code",
              text: "Understand the SOS signal, its Morse pattern, and common emergency-signal context.",
            },
            {
              href: "/what-is-morse-code",
              icon: "📚",
              title: "What Is Morse Code?",
              text: "Explore the history, purpose, and modern uses of Morse.",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-green-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="text-2xl">{item.icon}</span>

              <h3 className="mt-4 font-bold text-slate-900 group-hover:text-green-700 dark:text-white dark:group-hover:text-green-400">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {item.text}
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-green-700 dark:text-green-400">
                Explore
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* =====================================================
          SOURCES & FURTHER READING
      ====================================================== */}

      <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-background">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-green-700 dark:text-green-400">
              Standards & References
            </span>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              Morse Code Timing References
            </h2>

            <p className="mt-4 leading-8 text-slate-600 dark:text-slate-400">
              The timing ratios on this page describe standard International
              Morse Code practice. For authoritative reference material, consult
              the International Telecommunication Union recommendation and
              established amateur-radio resources.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <a
                href="https://www.itu.int/rec/R-REC-M.1677"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-green-500 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <h3 className="font-bold text-slate-900 dark:text-white">
                  ITU-R Recommendation M.1677
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  International reference material for International Morse Code.
                </p>
              </a>

              <a
                href="https://www.arrl.org/code-characters"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-green-500 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <h3 className="font-bold text-slate-900 dark:text-white">
                  ARRL Code Characters
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  A practical reference for Morse characters and related learning.
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ====================================================== */}

      <section className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/40">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-green-700 dark:text-green-400">
              Questions & Answers
            </span>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              Morse Code Timing FAQ
            </h2>

            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
              Common questions about Morse code speed, WPM calculation, timing
              ratios, dot duration, word spacing, and Farnsworth practice.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                  className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <span className="font-bold text-slate-900 dark:text-white">
                    {faq.question}
                  </span>

                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 shrink-0 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 shrink-0 text-slate-400" />
                  )}
                </button>

                {openFaq === index && (
                  <div id={`timing-faq-${index}`} className="px-5 pb-5">
                    <p className="leading-7 text-slate-600 dark:text-slate-400">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA - JUST ABOVE FOOTER
      ====================================================== */}

      <section className="w-full bg-gradient-to-r from-green-800 via-green-800 to-emerald-900">
        <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Put Morse Code Timing Into Practice
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-green-50/90">
            Use the translator to send messages, practice listening to Morse
            sounds, study the alphabet, and test your recognition skills with
            interactive exercises.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-green-800 transition hover:bg-green-50"
            >
              Morse Code Translator
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/learn-morse-code"
              className="inline-flex items-center gap-2 rounded-xl border border-green-300/60 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Learn Morse Code
            </Link>

            <Link
              href="/morse-code-quiz"
              className="inline-flex items-center gap-2 rounded-xl border border-green-300/60 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Take Quiz
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}