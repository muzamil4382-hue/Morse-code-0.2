"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { MORSE_CODE, playMorseAudio, getIsPlaying, stopMorseAudio } from "@/lib/morse";
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

export default function AlphabetClient({ faqs }: AlphabetClientProps) {
  const [playingLetter, setPlayingLetter] = useState<string | null>(null);

  const playLetter = useCallback(
    async (letter: string, code: string) => {
      if (getIsPlaying()) {
        stopMorseAudio();
        setPlayingLetter(null);
        return;
      }
      setPlayingLetter(letter);
      await playMorseAudio(code, { speed: 18, frequency: 600, volume: 0.4 });
      setPlayingLetter(null);
    },
    []
  );

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <main className="min-h-screen">
      {/* ─── Breadcrumb + H1 + Introduction ─── */}
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
          Educational Reference Guide &middot; International Morse Code Standard
          (ITU-R M.1677)
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Morse Code Alphabet
        </h1>

        <div className="text-lg text-slate-600 max-w-3xl space-y-4 mb-4">
          <p>
            The Morse Code Alphabet is the foundational communication system that
            assigns a unique pattern of dots and dashes to each of the 26 letters
            in the English alphabet. Originally developed in the 1830s by Samuel
            Morse and Alfred Vail, this encoding system revolutionized
            long-distance communication and remains relevant today in amateur radio,
            aviation, emergency signaling, and education. The beauty of the Morse
            Code Alphabet lies in its simplicity — with just two signal types (dots
            and dashes), it is possible to encode any message in any language that
            uses the Latin alphabet.
          </p>
          <p>
            Understanding the Morse Code Alphabet is essential for anyone interested
            in radio communication, emergency preparedness, or historical signaling
            methods. Each letter was carefully assigned its dot-dash pattern based on
            how frequently it appears in English text. The most common letter, E,
            gets the simplest code (a single dot), while less common letters like Q
            and J have four-element codes. This frequency-based design makes Morse
            code efficient to transmit and receive.
          </p>
          <p>
            On this page, you will find the complete International Morse Code
            Alphabet from A to Z, presented as an interactive chart with audio
            playback for every letter. Click the play button on any letter card to
            hear its sound, or click the letter itself to view its detailed guide.
            You will also learn how to read Morse code symbols correctly, proven
            techniques for memorizing the entire alphabet, common mistakes that
            beginners should avoid, a brief history of how the alphabet was
            developed, and where it is used in the modern world.
          </p>
        </div>

        <p className="text-sm text-slate-500">
          Updated regularly to match the ITU-R M.1677 standard.
        </p>
      </section>

      {/* ─── Complete Morse Code Alphabet Chart ─── */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Complete Morse Code Alphabet Chart
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Click on any letter to view its detailed guide with examples and
            practice tips. Use the play button to hear each letter&apos;s Morse code
            sound. This chart follows the International Morse Code standard
            (ITU-R M.1677) used worldwide.
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
                      if (char === ".")
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
                      if (char === "-")
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

          {/* Callout box */}
          <div className="mt-8 p-5 bg-green-50 border border-green-200 rounded-xl">
            <p className="text-green-800 font-medium mb-1">Learning Tip</p>
            <p className="text-green-700 text-sm">
  Letters E, T, A, I, N, O, S, and H account for approximately 65% of
  all letters used in English. Start by mastering these eight letters
  first — they will give you the best return on your learning effort
  and let you recognize many common words almost immediately.
</p>

<p className="mt-3 text-sm text-green-700">
  Looking for digits too? Continue with our{" "}
  <Link
    href="/morse-code-numbers"
    className="font-medium underline"
  >
    Morse Code Numbers Guide
  </Link>{" "}
  to learn numbers 0–9.
</p>
          </div>
        </div>
      </section>

      {/* ─── How to Read the Morse Code Alphabet ─── */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            How to Read the Morse Code Alphabet
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Reading the Morse Code Alphabet requires understanding just a few
            fundamental timing rules. Once you grasp these basics, every letter
            becomes a recognizable rhythmic pattern rather than a sequence of
            individual dots and dashes to be counted.{" "}
For a complete explanation of spacing rules and transmission speed, see our{" "}
<Link
  href="/morse-code-timing"
  className="text-green-600 font-medium underline"
>
  Morse Code Timing Guide
</Link>.
          </p>

          <div className="space-y-5">
            {/* Dots */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h3 className="font-semibold text-slate-900 mb-2 text-lg">
                Dots (Dit) — The Short Signal
              </h3>
              <p className="text-slate-600 leading-relaxed">
                A dot, commonly called a &quot;dit&quot; in Morse code terminology, is the
                fundamental unit of all Morse code timing. Every other duration in
                the system is measured relative to the dot. When transmitted by
                sound, a dot is a short beep lasting exactly one time unit. When
                transmitted by light (such as a flashlight or signal lamp), a dot
                is a brief flash. The letter E is the simplest example, consisting
                of a single dot. When speaking Morse code aloud, operators say
                &quot;dit&quot; for each dot.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-sm text-slate-500">Example:</span>
                <span className="font-mono text-green-600 font-medium">
                  E = . (one dit)
                </span>
              </div>
            </div>

            {/* Dashes */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h3 className="font-semibold text-slate-900 mb-2 text-lg">
                Dashes (Dah) — The Long Signal
              </h3>
              <p className="text-slate-600 leading-relaxed">
                A dash, commonly called a &quot;dah,&quot; is exactly three times the length
                of a dot. This precise 3:1 ratio is critical — if the dash is too
                short or too long relative to the dot, the receiving operator may
                misinterpret the signal. A dash is not a &quot;long dot&quot;; it is a
                distinctly different signal with a specific duration. When
                transmitted by sound, a dash is a longer beep. When spoken aloud,
                operators say &quot;dah&quot; for each dash.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-sm text-slate-500">Example:</span>
                <span className="font-mono text-green-600 font-medium">
                  T = - (one dah)
                </span>
              </div>
            </div>

            {/* Letter spacing */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h3 className="font-semibold text-slate-900 mb-2 text-lg">
                Letter Spacing — Gaps Between Symbols
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Within a single letter, the gap between each dot or dash is one
                dot-unit long. For example, the letter A (.-) has a one-unit gap
                between the dot and the dash. Between two complete letters, the
                gap is three dot-units long. This means the space between letters
                is the same duration as a dash, which helps operators distinguish
                where one letter ends and the next begins.
              </p>
              <div className="mt-3 flex items-center gap-4 flex-wrap">
                <span className="text-sm text-slate-500">
                  Intra-character gap: 1 dot-unit
                </span>
                <span className="text-sm text-slate-500">
                  Inter-character gap: 3 dot-units
                </span>
              </div>
            </div>

            {/* Word spacing */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h3 className="font-semibold text-slate-900 mb-2 text-lg">
                Word Spacing — Gaps Between Words
              </h3>
              <p className="text-slate-600 leading-relaxed">
                The gap between words is seven dot-units long. This is
                significantly longer than any other gap in the system, making it
                easy to identify word boundaries. In written Morse code, words are
                separated by a forward slash (/). In audio transmission, the
                seven-unit silence between words is unmistakable once you train
                your ear to recognize it. This spacing rule is consistent across
                all Morse code communication methods, whether transmitted by
                radio, light, sound, or visual signals.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-sm text-slate-500">
                  Word gap: 7 dot-units
                </span>
              </div>
            </div>
          </div>

          {/* Timing summary table */}
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
                  <td className="px-4 py-3 font-semibold text-slate-900">Dot (Dit)</td>
                  <td className="px-4 py-3 text-slate-600">1 unit</td>
                  <td className="px-4 py-3 text-slate-600 text-sm">
                    The basic time unit; short signal
                  </td>
                </tr>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <td className="px-4 py-3 font-semibold text-slate-900">Dash (Dah)</td>
                  <td className="px-4 py-3 text-slate-600">3 units</td>
                  <td className="px-4 py-3 text-slate-600 text-sm">
                    Exactly three times the length of a dot
                  </td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    Symbol Gap
                  </td>
                  <td className="px-4 py-3 text-slate-600">1 unit</td>
                  <td className="px-4 py-3 text-slate-600 text-sm">
                    Gap between dots/dashes within a letter
                  </td>
                </tr>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    Letter Gap
                  </td>
                  <td className="px-4 py-3 text-slate-600">3 units</td>
                  <td className="px-4 py-3 text-slate-600 text-sm">
                    Gap between two complete letters
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    Word Gap
                  </td>
                  <td className="px-4 py-3 text-slate-600">7 units</td>
                  <td className="px-4 py-3 text-slate-600 text-sm">
                    Gap between two complete words
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── How to Memorize the Morse Code Alphabet ─── */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            How to Memorize the Morse Code Alphabet
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Memorizing the Morse Code Alphabet is much easier when you use proven
            techniques rather than simply staring at a chart. Here are the most
            effective strategies used by successful Morse code operators around
            the world.
          </p>

          <div className="space-y-5">
            {/* Tip 1 */}
            <div className="p-5 bg-white border border-slate-200 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-2">
                1. Learn the Most Common Letters First
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Start with the eight most frequently used letters in English: E
                (.), T (-), A (.-), I (..), N (-.), O (---), S (...), and H
                (....). These eight letters account for approximately 65% of all
                letters in typical English text. By mastering them first, you will
                be able to recognize a significant portion of any Morse code
                transmission almost immediately. This approach provides quick
                wins that keep you motivated to continue learning.
              </p>
            </div>

            {/* Tip 2 */}
            <div className="p-5 bg-white border border-slate-200 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-2">
                2. Group Letters by Pattern
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Letters within the Morse Code Alphabet follow recognizable
                patterns that make memorization much easier. For example, E (.),
                I (..), S (...), and H (....) are all dots — they simply add one
                more dot each time. Similarly, T (-), M (--), and O (---) are all
                dashes. Letters like A (.-) and N (-.) are reverses of each other.
                R (.-.) and L (.-..) share the same starting pattern. Understanding
                these structural relationships helps your brain organize the
                alphabet into logical groups rather than 26 random codes.
              </p>
            </div>

            {/* Tip 3 */}
            <div className="p-5 bg-white border border-slate-200 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-2">
                3. Practice with Audio Every Day
              </h3>
              <p className="text-slate-600 leading-relaxed">
                The single most important habit for learning the Morse Code
                Alphabet is daily audio practice. Morse code is fundamentally an
                auditory skill — experienced operators do not mentally decode dots
                and dashes, they recognize the rhythmic sound of each letter as a
                whole. Use the play buttons on the chart above to listen to each
                letter repeatedly. Start at slow speeds (5 to 10 WPM) and
                gradually increase as your recognition improves. Even 15 minutes
                of focused listening practice per day will produce significant
                results within a few weeks.
              </p>
            </div>

            {/* Tip 4 */}
            <div className="p-5 bg-white border border-slate-200 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-2">
                4. Use Mnemonic Associations
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Create vivid mental images that connect each letter to its Morse
                code pattern. For example: &quot;A for Apple&quot; (a round apple with a
                stem on top, like a dot above a dash), &quot;B for Boot&quot; (three dots
                under a dash, like boot prints), or &quot;C for Cup&quot; (a cup holding
                a dash and a dot). The more vivid, silly, or unusual the mental
                image, the more effectively your brain will retain it. This
                technique is especially helpful for letters with three or four
                elements that are harder to learn through repetition alone.
              </p>
            </div>

            {/* Tip 5 */}
            <div className="p-5 bg-white border border-slate-200 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-2">
                5. Create Physical Flashcards
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Making physical flashcards is one of the oldest and most effective
                methods for memorizing the Morse Code Alphabet. Write the letter on
                one side and its code on the other. Shuffle the deck and test
                yourself in both directions: letter-to-code and code-to-letter.
                Carry a small deck with you and practice during idle moments
                throughout the day. Many operators report that the physical act of
                writing the codes by hand significantly improves retention compared
                to digital-only study.
                {" "}
If you have already memorized the letters, continue with our{" "}
<Link
  href="/morse-code-numbers"
  className="text-green-600 font-medium underline"
>
  Morse Code Numbers Guide
</Link>{" "}
to learn the complete International Morse Code character set.
              </p>
            </div>

            {/* Tip 6 */}
            <div className="p-5 bg-green-50 border border-green-200 rounded-xl">
              <h3 className="font-semibold text-green-800 mb-2">
                6. Use the Koch Method
              </h3>
              <p className="text-green-700 leading-relaxed">
                The Koch method is the gold standard for learning Morse code
                efficiently. Start with just two characters at full speed
                (typically 20 WPM with Farnsworth timing). Once you can copy those
                two characters at 90% accuracy, add a third. Continue adding one
                character at a time until you have learned all 26 letters and
                numbers. This method builds speed and accuracy simultaneously and
                avoids the common trap of learning characters slowly and then
                struggling to increase speed later. You can practice the Koch
                method using our{" "}
                <Link
                  href="/morse-code-translator"
                  className="underline text-green-800 font-medium"
                >
  free translator tool
</Link>
                {" "}
                or dedicated apps like LCWO and G4FON.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Common Mistakes Beginners Make ─── */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Common Mistakes Beginners Make
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Being aware of these common pitfalls will save you significant time and
            frustration as you learn the Morse Code Alphabet. Every experienced
            operator has made at least one of these mistakes early in their
            learning journey.
          </p>

          <div className="space-y-5">
            <div className="p-5 bg-white border border-slate-200 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Confusing Reversed Letters
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Several pairs of letters in the Morse Code Alphabet are exact
                    reverses of each other: A (.-) and N (-.), F (..-.) and L
                    (.-..), U (..-) and D (-..). Beginners frequently mix up these
                    pairs because the dot-dash sequence sounds similar when played
                    quickly. The best way to avoid this mistake is to practice
                    these specific pairs together in comparison drills, training
                    your ear to hear the difference between a pattern starting
                    with a dot versus one starting with a dash.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Incorrect Spacing Between Elements
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    The most common technical error in Morse code is incorrect
                    spacing. If you pause too long between dots and dashes within a
                    letter, the listener may interpret it as two separate letters.
                    If you do not pause long enough between letters, they will blur
                    together into an unrecognizable pattern. The key is to maintain
                    consistent timing: one unit between elements, three units
                    between letters, and seven units between words. Practice with
                    a metronome or use audio tools that enforce correct spacing
                    automatically.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Trying to Memorize Too Many Letters at Once
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Many beginners try to learn five or more new letters in a single
                    session, which leads to confusion and poor retention. Research
                    on spaced repetition shows that learning two or three letters per
                    day with regular review produces far better long-term results
                    than cramming. The Koch method formalizes this by adding only
                    one new character at a time, but even with simpler study
                    methods, limiting yourself to a few new letters per session
                    will dramatically improve your progress.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Counting Dots and Dashes Instead of Recognizing Rhythm
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    A critical mistake that traps many beginners is mentally
                    counting each dot and dash. This approach might work at very
                    slow speeds but fails completely at anything above 10 WPM.
                    Experienced operators recognize each letter as a single rhythmic
                    unit, the same way you recognize a spoken word without
                    analyzing individual phonemes. To develop this skill, always
                    practice with audio rather than visual charts, and focus on the
                    overall sound pattern of each letter rather than its
                    individual elements.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Ignoring Audio Practice
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Relying solely on visual charts and flashcards without listening
                    to actual Morse code audio is like trying to learn a language by
                    only reading textbooks and never hearing it spoken. Morse code
                    is fundamentally an auditory communication system, and your
                    brain needs to develop the neural pathways for audio
                    recognition. Even five minutes of daily listening practice will
                    accelerate your learning far more than an hour of visual study
                    alone. Use the play buttons on the chart above or explore our{" "}
                    <Link
                      href="/morse-code-sounds"
                      className="underline text-green-600 font-medium"
                    >
                      Morse code sounds page
                    </Link>{" "}
                    for dedicated audio practice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── History of the Morse Code Alphabet ─── */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            History of the Morse Code Alphabet
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            The Morse Code Alphabet has a rich history spanning nearly two centuries.
            Understanding its origins helps appreciate why the alphabet is structured
            the way it is and why it remains relevant in the modern era.
          </p>

          <div className="space-y-5">
            <div className="p-5 bg-white border border-slate-200 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-2 text-lg">
                Samuel Morse and the Electric Telegraph
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Samuel Finley Breese Morse (1791-1872) was originally an American
                painter and art professor before turning his attention to
                invention. In 1832, while returning from a trip to Europe aboard the
                ship Sully, Morse learned about recent experiments with
                electromagnetism and conceived the idea of an electric telegraph.
                Over the next several years, he developed the first practical
                telegraph system in the United States, demonstrating it
                successfully in 1838. His system could transmit messages over long
                distances through electrical wires, fundamentally changing the
                speed of long-distance communication from days to minutes.
              </p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-2 text-lg">
                Alfred Vail and the Code&apos;s Design
              </h3>
              <p className="text-slate-600 leading-relaxed">
                While Samuel Morse is often credited as the sole inventor, Alfred
                Vail (1807-1859) played a crucial role in developing the actual
                code that bears Morse&apos;s name. Vail, a skilled mechanic and Morse&apos;s
                partner, is widely believed to have designed the letter-to-code
                assignments based on letter frequency analysis of English text.
                This frequency-based design, where the most common letters get the
                shortest codes, is what makes the Morse Code Alphabet so efficient.
                Vail also developed the telegraph key and the recording mechanism
                that made the system practical for everyday use.
              </p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-2 text-lg">
                International Morse Code Standard
              </h3>
              <p className="text-slate-600 leading-relaxed">
                The original American Morse Code used in the United States had
                some differences from the version used in Europe. In 1865, the
                International Telegraph Union (now the ITU) standardized the code
                that we know today as International Morse Code. This standardized
                alphabet, documented in ITU-R M.1677, is used worldwide and
                ensures that operators from any country can communicate with each
                other seamlessly. The International Morse Code Alphabet is the
                version presented on this page and is the universal standard for
                all modern Morse code communication.{" "}
After learning the alphabet, you can practice decoding real messages with our{" "}
<Link
  href="/morse-code-decoder"
  className="text-green-600 font-medium underline"
>
  Morse Code Decoder
</Link>. If you want to study each character in more detail, explore our{" "}
<Link
  href="/morse-code-letter/a"
  className="text-green-600 font-medium underline"
>
  individual Morse Code Letter Guides
</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Where Is the Morse Code Alphabet Used Today? ─── */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Where Is the Morse Code Alphabet Used Today?
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Despite being nearly 200 years old, the Morse Code Alphabet remains
            actively used across multiple fields and industries. Here are the most
            significant modern applications.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 bg-white border border-slate-200 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                  <Radio className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900">Amateur Radio</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Morse code (known as CW or Continuous Wave in ham radio) remains
                one of the most popular modes among amateur radio operators
                worldwide. It is exceptionally efficient, capable of making
                contacts over thousands of miles with very low power. Many ham
                radio operators prefer CW over voice because it cuts through
                noise and interference far more effectively.
              </p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                  <Plane className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900">Aviation</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Pilots are trained to recognize Morse code identifiers for
                navigation beacons (NDBs and VORs). Each beacon transmits its
                three-letter identifier in Morse code, allowing pilots to confirm
                their position. While GPS has reduced reliance on these beacons,
                Morse code identification remains a required skill in pilot
                training and serves as a critical backup navigation method.
              </p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900">
                  Emergency Communication
                </h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                SOS (... --- ...) is the most universally recognized distress
                signal in the world. Morse code can be transmitted using almost
                any method, including flashlight, whistle, tapping, or visual
                signals, making it invaluable in survival situations where no
                other communication equipment is available. Military, maritime,
                and wilderness survival training all include basic Morse signaling.{" "}
You can also learn how to decode emergency signals using our{" "}
<Link
  href="/morse-code-decoder"
  className="text-green-600 font-medium underline"
>
  Morse Code Decoder
</Link>.
              </p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900">Education</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Educators use the Morse Code Alphabet to teach fundamental
                concepts in computer science, binary thinking, signal processing,
                and information theory. It demonstrates how complex information
                can be encoded using just two states (on/off), making it an
                excellent teaching tool for introducing students to digital
                communication concepts and coding principles.
              </p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                  <Accessibility className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900">Accessibility</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Morse code serves as an alternative communication method for
                people with certain disabilities. Adaptive devices can convert
                Morse code input into text, speech, or computer commands.
                People with limited mobility can use simple switches to tap out
                Morse code, giving them a practical way to communicate and
                control devices with minimal physical movement.
              </p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900">Military History</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Morse code played a pivotal role in military communications from
                the American Civil War through World War II and the Cold War. It
                was used for ship-to-shore communication, espionage, and
                encrypted messaging. The Morse Code Alphabet remains part of
                military training curricula worldwide, and its principles
                continue to influence modern tactical communication systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Morse Code Decoding Tree ─── */}
      <section className="bg-white border-y border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">Morse Code Decoding Tree</h2>
            <p className="text-slate-600 max-w-3xl mx-auto">The Morse code tree is a binary decision tree used for decoding. Starting at the root, each dot (dit) moves left and each dash (dah) moves right. This tree structure reveals why Morse code was designed the way it was — the most common letters are closest to the root, requiring fewer decisions to decode.</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 overflow-x-auto">
            <div className="min-w-[600px] font-mono text-sm leading-loose">
              <div className="text-center text-slate-500 mb-4">↓ START</div>
              <div className="text-center font-bold text-green-700 text-lg mb-2">E (.) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; T (-)</div>
              <div className="text-center text-xs text-slate-400 mb-2">dot → left &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; dash → right</div>
              <div className="border-l-2 border-r-2 border-green-300 pl-4 pr-4">
                <div className="flex justify-between">
                  <div className="text-left">
                    <div className="font-bold text-green-700">I (..)</div>
                    <div className="border-l-2 border-green-200 pl-4 ml-2 space-y-1">
                      <div><span className="font-semibold">S (...)</span>
                        <div className="border-l-2 border-green-200 pl-4 ml-2 space-y-0.5">
                          <div>H (....)</div>
                          <div><span className="font-semibold">V (...-)</span></div>
                          <div><span className="font-semibold">F (..-.)</span></div>
                        </div>
                      </div>
                      <div><span className="font-semibold">U (..-)</span>
                        <div className="border-l-2 border-green-200 pl-4 ml-2 space-y-0.5">
                          <div><span className="font-semibold">&Aring; (.--.)</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-700">A (.-)</div>
                    <div className="border-r-2 border-green-200 pr-4 mr-2 space-y-1">
                      <div><span className="font-semibold">R (.-.)</span>
                        <div className="border-l-2 border-green-200 pl-4 ml-2">
                          <div>L (.-..)</div>
                        </div>
                      </div>
                      <div><span className="font-semibold">W (.--)</span>
                        <div className="border-r-2 border-green-200 pr-4 mr-2 space-y-0.5">
                          <div>J (.---)</div>
                          <div><span className="font-semibold">P (.--.)</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-green-700">N (-.)</div>
                    <div className="border-l-2 border-green-200 pl-4 ml-2 space-y-1">
                      <div><span className="font-semibold">D (-..)</span>
                        <div className="border-l-2 border-green-200 pl-4 ml-2 space-y-0.5">
                          <div>B (-...)</div>
                          <div><span className="font-semibold">X (-..-)</span></div>
                        </div>
                      </div>
                      <div><span className="font-semibold">K (-.-)</span>
                        <div className="border-r-2 border-green-200 pr-4 mr-2">
                          <div>Y (-.--)</div>
                          <div><span className="font-semibold">C (-.-.)</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-700">M (--)</div>
                    <div className="border-r-2 border-green-200 pr-4 mr-2 space-y-1">
                      <div><span className="font-semibold">G (--.)</span>
                        <div className="border-l-2 border-green-200 pl-4 ml-2 space-y-0.5">
                          <div>Z (--..)</div>
                          <div><span className="font-semibold">Q (--.-)</span></div>
                        </div>
                      </div>
                      <div><span className="font-semibold">O (---)</span></div>
                      <div><span className="font-semibold">&CH (--..)</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-slate-900 mb-3">How to Read the Tree</h3>
              <p className="text-slate-600 leading-relaxed">To decode a character, start at the top of the tree. For each dot (dit) in the Morse code, move to the left branch. For each dash (dah), move to the right branch. The letter at the end of the path is your decoded character. For example, to decode &quot;.-.&quot;: dot goes left to E, dash goes right to A, dot goes left to R. The letter E (.) and T (-) are at the top because they are the two most common letters in English, appearing in roughly 12.7% and 9.1% of text respectively.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-3">Why the Tree Matters for Learning</h3>
              <p className="text-slate-600 leading-relaxed">Understanding the Morse code tree structure is one of the most powerful tools for learning Morse code efficiently. Rather than memorizing each letter as an isolated sequence, you learn the &quot;address&quot; of each letter within the tree. This is essentially how experienced operators decode Morse code — they do not count dots and dashes, they recognize the binary path through the tree. The Koch method of learning leverages this tree structure by teaching letters in pairs that branch from the same node.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Frequently Asked Questions ─── */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Here are answers to the most common questions about the Morse Code
            Alphabet, covering everything from basic concepts to practical
            learning advice.
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
            Explore these related pages to deepen your understanding of Morse code
            and practice your skills.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/morse-code-translator"
              className="p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors">
                  Morse Code Translator
                </h3>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-green-600 transition-colors" />
              </div>
              <p className="text-sm text-slate-500">
                Convert any text to Morse code and back with audio playback and
                visual output.
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
                Learn the Morse code for numbers 0 through 9 with visual charts
                and audio examples.
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
    Decode Morse code into readable text with instant results, separator detection, and character analysis.
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
                Listen to Morse code audio and practice recognizing letters by
                ear at different speeds.
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
                Test your Morse code knowledge with interactive quizzes, timed challenges, and instant feedback.
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
    Learn Morse code step by step with beginner-friendly lessons,
    memorization techniques, and practical exercises.
  </p>
</Link>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="bg-slate-900 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Master the Morse Code Alphabet?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            Ready to put your knowledge into action? Use our free Morse Code Translator to encode, decode, and listen to Morse code with real-time audio playback. Practice what you've learned and improve your speed and accuracy.
          </p>
          <Link
            href="/morse-code-translator"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors text-lg">
            Try the Morse Code Translator
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
