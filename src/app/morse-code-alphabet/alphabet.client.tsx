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
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface AlphabetClientProps {
  faqs: FAQItem[];
}

export default function AlphabetClient({
  faqs,
}: AlphabetClientProps) {
  const [playingLetter, setPlayingLetter] = useState<string | null>(
    null
  );

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
    <main className="min-h-screen">

      {/* ─── Breadcrumb + Introduction ─── */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        <nav
          className="flex items-center gap-2 text-sm text-slate-500 mb-6"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="hover:text-green-600 transition-colors"
          >
            Home
          </Link>

          <span className="text-slate-400">/</span>

          <span className="text-slate-900 font-medium">
            Morse Code Alphabet
          </span>
        </nav>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-sm text-green-700 mb-6">
          <BookOpen className="w-4 h-4" />
          International Morse Code Reference · ITU-R M.1677
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5">
          Morse Code Alphabet
        </h1>

        <div className="text-lg text-slate-600 max-w-4xl space-y-4">

          <p>
            The Morse Code Alphabet assigns a unique sequence of dots and
            dashes to each of the 26 letters from A to Z. The modern
            International Morse Code system is standardized for
            radiocommunication and remains useful for amateur radio,
            signaling, education, accessibility tools, and emergency
            communication.
          </p>

          <p>
            Each Morse character is built from only two signal elements:
            a short signal called a <strong>dot or dit</strong> and a
            longer signal called a <strong>dash or dah</strong>. For
            example, <strong>E is represented by a single dot (.)</strong>,
            while <strong>T is represented by a single dash (-)</strong>.
            Longer patterns create the remaining letters, numbers, and
            punctuation characters.
          </p>

          <p>
            Below you can explore the complete Morse Code Alphabet from
            A to Z. Click any letter to open its detailed guide, or use
            the audio button to hear how that character sounds. You will
            also find Morse code timing rules, memorization techniques,
            the Koch method, common beginner mistakes, history, modern
            applications, and frequently asked questions.
          </p>

        </div>
      </section>

      {/* ─── Complete Alphabet Chart ─── */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Complete Morse Code Alphabet Chart
          </h2>

          <p className="text-slate-600 mb-8 max-w-3xl">
            Explore all 26 letters in the International Morse Code
            Alphabet. Select a letter for a detailed explanation or
            use the audio button to hear its Morse code pattern.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">

            {letters.map((letter) => {
              const code = MORSE_CODE[letter];
              const isPlaying = playingLetter === letter;

              return (
                <div
                  key={letter}
                  className={`bg-white border rounded-xl p-4 text-center transition-all ${
                    isPlaying
                      ? "border-green-500 shadow-lg shadow-green-100 ring-2 ring-green-200"
                      : "border-slate-200 hover:border-green-400 hover:shadow-md"
                  }`}
                >

                  <div className="flex items-center justify-center gap-1 mb-2">

                    <Link
                      href={`/morse-code-letter/${letter.toLowerCase()}`}
                      className="text-3xl font-bold text-slate-900 hover:text-green-600 transition-colors"
                    >
                      {letter}
                    </Link>

                    <button
                      onClick={() => playLetter(letter, code)}
                      className={`p-1.5 rounded-full transition-colors ${
                        isPlaying
                          ? "bg-green-100 text-green-600"
                          : "hover:bg-green-50 text-slate-400 hover:text-green-600"
                      }`}
                      title={
                        isPlaying
                          ? `Stop ${letter}`
                          : `Play ${letter}`
                      }
                      aria-label={
                        isPlaying
                          ? `Stop playing ${letter}`
                          : `Play ${letter} in Morse code`
                      }
                    >
                      {isPlaying ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>

                  </div>

                  <div className="flex items-center justify-center gap-1 mb-2 min-h-[12px]">

                    {code.split("").map((char, i) => {

                      if (char === ".") {
                        return (
                          <span
                            key={i}
                            className={`inline-block w-2.5 h-2.5 rounded-full ${
                              isPlaying
                                ? "bg-green-500 animate-pulse"
                                : "bg-green-600"
                            }`}
                          />
                        );
                      }

                      if (char === "-") {
                        return (
                          <span
                            key={i}
                            className={`inline-block w-6 h-2.5 rounded-full ${
                              isPlaying
                                ? "bg-green-500 animate-pulse"
                                : "bg-green-600"
                            }`}
                          />
                        );
                      }

                      return null;
                    })}

                  </div>

                  <div className="text-sm font-mono text-green-600 font-medium">
                    {code}
                  </div>

                </div>
              );
            })}

          </div>

          <div className="mt-8 p-5 bg-green-50 border border-green-200 rounded-xl">

            <p className="text-green-800 font-semibold mb-2">
              Learning Tip
            </p>

            <p className="text-green-700 text-sm leading-relaxed">
              Start with simple characters such as E (.), T (-), I (..),
              A (.-), N (-.) and M (--). These short patterns help you
              understand how Morse code is structured before moving to
              longer combinations.
            </p>

            <p className="mt-3 text-sm text-green-700">
              Want to learn digits too? Visit our{" "}
              <Link
                href="/morse-code-numbers"
                className="font-semibold underline"
              >
                Morse Code Numbers Guide
              </Link>{" "}
              to learn numbers 0–9.
            </p>

          </div>

        </div>
      </section>

      {/* ─── How to Read ─── */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            How to Read the Morse Code Alphabet
          </h2>

          <p className="text-slate-600 mb-8 max-w-3xl">
            Morse code is not only about recognizing dots and dashes.
            Correct timing and spacing are also essential. Once you
            understand the basic timing units, each character becomes
            easier to recognize as a complete sound pattern.
          </p>

          <div className="mb-8">
            <Link
              href="/morse-code-timing"
              className="inline-flex items-center gap-2 text-green-600 font-semibold hover:underline"
            >
              Learn the complete Morse Code Timing rules
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-5">

            <div className="bg-white border border-slate-200 rounded-xl p-5">

              <h3 className="font-semibold text-slate-900 mb-2 text-lg">
                Dots (Dit) — The Short Signal
              </h3>

              <p className="text-slate-600 leading-relaxed">
                A dot, often called a <strong>dit</strong>, is the basic
                timing unit in Morse code. It represents a short sound,
                flash, or electrical signal. The letter E is the simplest
                example because it contains only one dot.
              </p>

              <div className="mt-3">
                <span className="font-mono text-green-600 font-medium">
                  E = .
                </span>
              </div>

            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">

              <h3 className="font-semibold text-slate-900 mb-2 text-lg">
                Dashes (Dah) — The Long Signal
              </h3>

              <p className="text-slate-600 leading-relaxed">
                A dash, often called a <strong>dah</strong>, lasts three
                time units. The relationship between a dot and dash is
                therefore 1:3. The letter T is represented by one dash.
              </p>

              <div className="mt-3">
                <span className="font-mono text-green-600 font-medium">
                  T = -
                </span>
              </div>

            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">

              <h3 className="font-semibold text-slate-900 mb-2 text-lg">
                Spacing Between Elements and Letters
              </h3>

              <p className="text-slate-600 leading-relaxed">
                The gap between individual dots and dashes inside one
                character is one time unit. The gap between complete
                letters is three units. These spacing rules help a
                receiver distinguish one character from another.
              </p>

            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">

              <h3 className="font-semibold text-slate-900 mb-2 text-lg">
                Word Spacing
              </h3>

              <p className="text-slate-600 leading-relaxed">
                The standard gap between complete words is seven dot
                units. In written Morse code, a forward slash is often
                used to visually separate words.
              </p>

            </div>

          </div>

          <div className="mt-8 overflow-x-auto">

            <table className="w-full border-collapse bg-white rounded-xl border border-slate-200 overflow-hidden">

              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">

                  <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">
                    Element
                  </th>

                  <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">
                    Duration
                  </th>

                  <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">
                    Description
                  </th>

                </tr>
              </thead>

              <tbody>

                <tr className="border-b border-slate-100">
                  <td className="px-4 py-3 font-semibold">
                    Dot (Dit)
                  </td>
                  <td className="px-4 py-3">
                    1 unit
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    Basic short signal
                  </td>
                </tr>

                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <td className="px-4 py-3 font-semibold">
                    Dash (Dah)
                  </td>
                  <td className="px-4 py-3">
                    3 units
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    Long signal
                  </td>
                </tr>

                <tr className="border-b border-slate-100">
                  <td className="px-4 py-3 font-semibold">
                    Element Gap
                  </td>
                  <td className="px-4 py-3">
                    1 unit
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    Between dots and dashes inside one character
                  </td>
                </tr>

                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <td className="px-4 py-3 font-semibold">
                    Letter Gap
                  </td>
                  <td className="px-4 py-3">
                    3 units
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    Between complete characters
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-3 font-semibold">
                    Word Gap
                  </td>
                  <td className="px-4 py-3">
                    7 units
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    Between complete words
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>
      </section>

      {/* ─── Memorization ─── */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            How to Memorize the Morse Code Alphabet
          </h2>

          <p className="text-slate-600 mb-8 max-w-3xl">
            The fastest way to become comfortable with Morse code is to
            combine visual reference with regular listening practice.
            The goal is eventually to recognize each character by its
            sound rather than counting dots and dashes.
          </p>

          <div className="space-y-5">

            <div className="p-5 bg-white border border-slate-200 rounded-xl">

              <h3 className="font-semibold text-slate-900 mb-2">
                1. Start with Short Patterns
              </h3>

              <p className="text-slate-600 leading-relaxed">
                Begin with simple characters such as E, T, I, A, N and M.
                These characters contain only one or two signal elements
                and provide a foundation for understanding longer Morse
                patterns.
              </p>

            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl">

              <h3 className="font-semibold text-slate-900 mb-2">
                2. Learn Characters by Sound
              </h3>

              <p className="text-slate-600 leading-relaxed">
                Instead of visually counting dots and dashes, listen to
                the rhythm of each character. Experienced Morse operators
                recognize patterns as complete sounds. For example, A
                (.-) has a different rhythm from N (-.), even though both
                contain one dot and one dash.
              </p>

            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl">

              <h3 className="font-semibold text-slate-900 mb-2">
                3. Practice Regularly with Audio
              </h3>

              <p className="text-slate-600 leading-relaxed">
                Short and consistent listening sessions can help build
                recognition over time. Use the audio controls in the
                alphabet chart above or practice with our{" "}
                <Link
                  href="/morse-code-sounds"
                  className="text-green-600 font-semibold underline"
                >
                  Morse Code Sounds
                </Link>{" "}
                page.
              </p>

            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl">

              <h3 className="font-semibold text-slate-900 mb-2">
                4. Group Similar Patterns
              </h3>

              <p className="text-slate-600 leading-relaxed">
                Some characters form useful visual groups. E (.), I (..),
                S (...) and H (....) add one dot at each step. Likewise,
                T (-), M (--) and O (---) add one dash. These relationships
                can make the alphabet easier to organize in memory.
              </p>

            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl">

              <h3 className="font-semibold text-slate-900 mb-2">
                5. Test Yourself in Both Directions
              </h3>

              <p className="text-slate-600 leading-relaxed">
                Practice converting letters into Morse code and Morse code
                back into letters. This strengthens both sending and
                receiving skills. Once you are comfortable with the
                alphabet, continue with our{" "}
                <Link
                  href="/morse-code-numbers"
                  className="text-green-600 font-semibold underline"
                >
                  Morse Code Numbers Guide
                </Link>.
              </p>

            </div>

            <div className="p-5 bg-green-50 border border-green-200 rounded-xl">

              <h3 className="font-semibold text-green-800 mb-2">
                6. Try the Koch Method and Farnsworth Timing
              </h3>

              <p className="text-green-700 leading-relaxed">
                The Koch method introduces a small number of characters
                and gradually adds new ones as recognition improves.
                Farnsworth timing keeps individual characters at a useful
                character speed while increasing the spacing between them,
                which can make early listening practice more manageable.
                Both approaches are commonly used in Morse code training.
              </p>

              <div className="mt-4">
                <Link
                  href="/learn-morse-code"
                  className="font-semibold underline"
                >
                  Learn Morse Code step by step →
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ─── Common Mistakes ─── */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Common Mistakes Beginners Make
          </h2>

          <p className="text-slate-600 mb-8 max-w-3xl">
            Beginners often struggle with the same few problems. Identifying
            them early can make your practice more focused and efficient.
          </p>

          <div className="space-y-5">

            <div className="p-5 bg-white border border-slate-200 rounded-xl">

              <div className="flex items-start gap-3">

                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />

                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Confusing Reversed Patterns
                  </h3>

                  <p className="text-slate-600 leading-relaxed">
                    Characters such as A (.-) and N (-.) use the same
                    elements in a different order. Practice similar pairs
                    together so that your ear learns the difference in
                    rhythm.
                  </p>
                </div>

              </div>

            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl">

              <div className="flex items-start gap-3">

                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />

                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Incorrect Spacing
                  </h3>

                  <p className="text-slate-600 leading-relaxed">
                    Timing is part of the Morse code system. Use consistent
                    gaps between elements, letters, and words so that
                    characters do not merge together.
                  </p>
                </div>

              </div>

            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl">

              <div className="flex items-start gap-3">

                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />

                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Learning Too Many Characters at Once
                  </h3>

                  <p className="text-slate-600 leading-relaxed">
                    Trying to memorize the entire alphabet in one session
                    can create confusion. Break practice into manageable
                    groups and regularly review previously learned
                    characters.
                  </p>
                </div>

              </div>

            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl">

              <div className="flex items-start gap-3">

                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />

                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Counting Every Dot and Dash
                  </h3>

                  <p className="text-slate-600 leading-relaxed">
                    Counting can be useful when first studying the chart,
                    but listening skills improve when you begin recognizing
                    the complete rhythm of a character.
                  </p>
                </div>

              </div>

            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl">

              <div className="flex items-start gap-3">

                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />

                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Skipping Audio Practice
                  </h3>

                  <p className="text-slate-600 leading-relaxed">
                    Visual charts are useful references, but Morse code is
                    often learned as an audio pattern. Combine reading with
                    listening practice using our{" "}
                    <Link
                      href="/morse-code-sounds"
                      className="underline text-green-600 font-semibold"
                    >
                      Morse Code Sounds
                    </Link>{" "}
                    page.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ─── History ─── */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            History of the Morse Code Alphabet
          </h2>

          <p className="text-slate-600 mb-8 max-w-3xl">
            Morse code developed alongside the electric telegraph and
            became one of the most important communication systems of the
            nineteenth century.
          </p>

          <div className="space-y-5">

            <div className="p-5 bg-white border border-slate-200 rounded-xl">

              <h3 className="font-semibold text-slate-900 mb-2 text-lg">
                Samuel Morse and the Electric Telegraph
              </h3>

              <p className="text-slate-600 leading-relaxed">
                Samuel Morse was an American artist and inventor who became
                closely associated with the development of the electric
                telegraph. Telegraph technology allowed messages to travel
                through electrical signals over long distances far faster
                than traditional physical delivery.
              </p>

            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl">

              <h3 className="font-semibold text-slate-900 mb-2 text-lg">
                Alfred Vail and Morse Code Development
              </h3>

              <p className="text-slate-600 leading-relaxed">
                Alfred Vail worked closely with Samuel Morse during the
                development of the telegraph system and the code used to
                transmit characters. The historical development of Morse
                code involved multiple revisions before the international
                form became widely standardized.
              </p>

            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl">

              <h3 className="font-semibold text-slate-900 mb-2 text-lg">
                International Morse Code
              </h3>

              <p className="text-slate-600 leading-relaxed">
                International Morse Code became the internationally
                recognized version used for radiocommunication. Today,
                Recommendation ITU-R M.1677 documents the International
                Morse Code characters and related operational provisions.
                The A–Z alphabet shown on this page follows this
                internationally recognized system.
              </p>

              <div className="mt-4 flex flex-wrap gap-4">

                <Link
                  href="/morse-code-decoder"
                  className="text-green-600 font-semibold underline"
                >
                  Try the Morse Code Decoder
                </Link>

                <Link
                  href="/morse-code-letter/a"
                  className="text-green-600 font-semibold underline"
                >
                  Explore individual letter guides
                </Link>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ─── Modern Uses ─── */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Where Is the Morse Code Alphabet Used Today?
          </h2>

          <p className="text-slate-600 mb-8 max-w-3xl">
            Although Morse code originated in the nineteenth century, it
            still appears in several modern communication and educational
            contexts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div className="p-5 bg-white border border-slate-200 rounded-xl">

              <div className="flex items-center gap-3 mb-3">

                <div className="w-11 h-11 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                  <Radio className="w-5 h-5" />
                </div>

                <h3 className="font-semibold text-slate-900">
                  Amateur Radio
                </h3>

              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                Morse code, commonly called CW or Continuous Wave in
                amateur radio, continues to be used by radio operators.
                It can remain useful when signals are weak or noisy.
              </p>

            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl">

              <div className="flex items-center gap-3 mb-3">

                <div className="w-11 h-11 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                  <Plane className="w-5 h-5" />
                </div>

                <h3 className="font-semibold text-slate-900">
                  Aviation Navigation Aids
                </h3>

              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                Morse code identifiers have historically been used with
                radio navigation aids such as VORs and NDBs. Pilots can
                use identifiers to confirm the identity of a navigation
                facility.
              </p>

            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl">

              <div className="flex items-center gap-3 mb-3">

                <div className="w-11 h-11 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>

                <h3 className="font-semibold text-slate-900">
                  Emergency Signaling
                </h3>

              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                SOS (... --- ...) is one of the best-known Morse distress
                signals. Morse patterns can be transmitted through sound,
                light, tapping, or other methods capable of producing
                short and long signals.
              </p>

            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl">

              <div className="flex items-center gap-3 mb-3">

                <div className="w-11 h-11 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>

                <h3 className="font-semibold text-slate-900">
                  Education
                </h3>

              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                Morse code is a useful teaching example for communication,
                encoding, signals, timing, and information systems. It
                demonstrates how complex information can be represented
                through combinations of simple signals.
              </p>

            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl">

              <div className="flex items-center gap-3 mb-3">

                <div className="w-11 h-11 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                  <Accessibility className="w-5 h-5" />
                </div>

                <h3 className="font-semibold text-slate-900">
                  Accessibility Technology
                </h3>

              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                Morse input can be adapted for assistive communication and
                computer control. A user can enter short and long signals
                through switches or other input methods and convert those
                signals into text or commands.
              </p>

            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl">

              <div className="flex items-center gap-3 mb-3">

                <div className="w-11 h-11 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>

                <h3 className="font-semibold text-slate-900">
                  Historical Communication
                </h3>

              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                Morse code played a major role in telegraphy, maritime
                communication, railways, and military communication. It
                remains an important part of communication history.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* ─── Morse Code Tree ─── */}
      <section className="bg-white border-y border-slate-200">

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">

          <div className="text-center mb-10">

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Morse Code Decoding Tree
            </h2>

            <p className="text-slate-600 max-w-3xl mx-auto">
              A Morse code tree provides a visual way to understand how
              characters are built. Starting from the top, each dot and
              dash moves through a different branch until a character is
              reached.
            </p>

          </div>

          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 overflow-x-auto">

            <div className="min-w-[600px] font-mono text-sm leading-loose">

              <div className="text-center text-slate-500 mb-4">
                ↓ START
              </div>

              <div className="text-center font-bold text-green-700 text-lg mb-2">
                E (.) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                T (-)
              </div>

              <div className="text-center text-xs text-slate-400 mb-4">
                dot → left &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                dash → right
              </div>

              <div className="grid grid-cols-4 gap-6">

                <div>

                  <div className="font-bold text-green-700">
                    I (..)
                  </div>

                  <div className="pl-4">
                    <div>S (...)</div>
                    <div>H (....)</div>
                    <div>V (...-)</div>
                    <div>U (..-)</div>
                    <div>F (..-.)</div>
                  </div>

                </div>

                <div>

                  <div className="font-bold text-green-700">
                    A (.-)
                  </div>

                  <div className="pl-4">
                    <div>R (.-.)</div>
                    <div>L (.-..)</div>
                    <div>W (.--)</div>
                    <div>P (.--.)</div>
                    <div>J (.---)</div>
                  </div>

                </div>

                <div>

                  <div className="font-bold text-green-700">
                    N (-.)
                  </div>

                  <div className="pl-4">
                    <div>D (-..)</div>
                    <div>B (-...)</div>
                    <div>X (-..-)</div>
                    <div>K (-.-)</div>
                    <div>C (-.-.)</div>
                    <div>Y (-.--)</div>
                  </div>

                </div>

                <div>

                  <div className="font-bold text-green-700">
                    M (--)
                  </div>

                  <div className="pl-4">
                    <div>G (--.)</div>
                    <div>Z (--..)</div>
                    <div>Q (--.-)</div>
                    <div>O (---)</div>
                  </div>

                </div>

              </div>

            </div>

          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-8">

            <div>

              <h3 className="font-bold text-slate-900 mb-3">
                How to Read the Tree
              </h3>

              <p className="text-slate-600 leading-relaxed">
                Start from the top and follow one branch for every signal.
                For example, R is .-. : the first dot leads toward E, the
                dash leads to A, and the final dot leads to R.
              </p>

            </div>

            <div>

              <h3 className="font-bold text-slate-900 mb-3">
                Why the Tree Helps
              </h3>

              <p className="text-slate-600 leading-relaxed">
                The tree helps reveal relationships between characters.
                Instead of treating all 26 letters as unrelated patterns,
                you can see how longer characters grow from shorter ones.
              </p>

            </div>

          </div>

          <div className="mt-8 text-center">

            <Link
              href="/morse-code-decoder"
              className="inline-flex items-center gap-2 text-green-600 font-semibold hover:underline"
            >
              Practice with our Morse Code Decoder
              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>

        </div>

      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-slate-50 py-16">

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Frequently Asked Questions
          </h2>

          <p className="text-slate-600 mb-8 max-w-3xl">
            Here are answers to common questions about the Morse Code
            Alphabet, learning methods, timing, and practical use.
          </p>

          <div className="space-y-4">

            {faqs.map((faq, i) => (

              <details
                key={i}
                className="bg-white border border-slate-200 rounded-xl p-5 group"
              >

                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex items-center justify-between">

                  {faq.question}

                  <span className="text-green-600 text-xl group-open:rotate-45 transition-transform ml-4 flex-shrink-0">
                    +
                  </span>

                </summary>

                <p className="mt-3 text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>

              </details>

            ))}

          </div>

        </div>

      </section>

      {/* ─── Related Resources ─── */}
      <section className="py-16">

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Related Resources
          </h2>

          <p className="text-slate-600 mb-8 max-w-3xl">
            Continue learning, translating, decoding, and practicing with
            these related Morse code resources.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            <Link
              href="/"
              className="p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all group"
            >

              <div className="flex items-center justify-between mb-2">

                <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors">
                  Morse Code Translator
                </h3>

                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-green-600 transition-colors" />

              </div>

              <p className="text-sm text-slate-500">
                Convert text to Morse code and decode Morse into readable text.
              </p>

            </Link>

            <Link
              href="/morse-code-numbers"
              className="p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all group"
            >

              <div className="flex items-center justify-between mb-2">

                <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors">
                  Morse Code Numbers
                </h3>

                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-green-600 transition-colors" />

              </div>

              <p className="text-sm text-slate-500">
                Learn Morse code numbers from 0 through 9.
              </p>

            </Link>

            <Link
              href="/morse-code-decoder"
              className="p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all group"
            >

              <div className="flex items-center justify-between mb-2">

                <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors">
                  Morse Code Decoder
                </h3>

                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-green-600 transition-colors" />

              </div>

              <p className="text-sm text-slate-500">
                Decode Morse code into readable text instantly.
              </p>

            </Link>

            <Link
              href="/morse-code-sounds"
              className="p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all group"
            >

              <div className="flex items-center justify-between mb-2">

                <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors">
                  Morse Code Sounds
                </h3>

                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-green-600 transition-colors" />

              </div>

              <p className="text-sm text-slate-500">
                Listen to Morse code and practice recognizing characters by sound.
              </p>

            </Link>

            <Link
              href="/morse-code-quiz"
              className="p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all group"
            >

              <div className="flex items-center justify-between mb-2">

                <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors">
                  Morse Code Quiz
                </h3>

                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-green-600 transition-colors" />

              </div>

              <p className="text-sm text-slate-500">
                Test your Morse code knowledge with interactive questions.
              </p>

            </Link>

            <Link
              href="/learn-morse-code"
              className="p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all group"
            >

              <div className="flex items-center justify-between mb-2">

                <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors">
                  Learn Morse Code
                </h3>

                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-green-600 transition-colors" />

              </div>

              <p className="text-sm text-slate-500">
                Follow a step-by-step learning guide for beginners.
              </p>

            </Link>

          </div>

        </div>

      </section>

      {/* ─── Final CTA ─── */}
      <section className="bg-slate-900 py-16">

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Practice the Morse Code Alphabet?
          </h2>

          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            Use our free Morse Code Translator to encode text, decode
            Morse code, and listen to characters with audio playback.
            Practice regularly and improve your recognition over time.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors text-lg"
          >
            Try the Morse Code Translator
            <ArrowRight className="w-5 h-5" />
          </Link>

        </div>

      </section>

    </main>
  );
}