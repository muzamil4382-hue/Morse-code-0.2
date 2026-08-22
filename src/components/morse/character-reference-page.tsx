"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import type { MorseCharacterData } from "@/lib/morse-characters";
import {
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";

type CharacterType = "letter" | "number";

type Props = {
  type: CharacterType;
  data: MorseCharacterData[];
};

/* =========================================================
   MORSE MAP
========================================================= */

const MORSE_MAP: Record<string, string> = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",

  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
};

/* =========================================================
   HELPERS
========================================================= */

function morseToDitDah(code: string): string {
  return code
    .split("")
    .filter((character) => character === "." || character === "-")
    .map((character) =>
      character === "." ? "dit" : "dah"
    )
    .join("-");
}

function getDots(code: string): number {
  return [...code].filter(
    (character) => character === "."
  ).length;
}

function getDashes(code: string): number {
  return [...code].filter(
    (character) => character === "-"
  ).length;
}

function getSectionId(
  item: MorseCharacterData,
  type: CharacterType
) {
  return `${type}-${item.char.toLowerCase()}`;
}

function wordToMorse(word: string): string {
  return word
    .toUpperCase()
    .split("")
    .map((character) => {
      if (character === " ") {
        return "/";
      }

      return MORSE_MAP[character] ?? "";
    })
    .filter(Boolean)
    .join(" ");
}

/* =========================================================
   INTERNAL LINK NORMALIZATION
========================================================= */

function normalizeInternalHref(href: string): string {
  const letterMatch = href.match(
    /^\/morse-code-letter\/([a-z])$/i
  );

  if (letterMatch) {
    return `/morse-code-alphabet#letter-${letterMatch[1].toLowerCase()}`;
  }

  const numberMatch = href.match(
    /^\/morse-code-number\/([0-9])$/
  );

  if (numberMatch) {
    return `/morse-code-numbers#number-${numberMatch[1]}`;
  }

  return href;
}

function renderInlineLinks(text: string): ReactNode[] {
  const parts = text.split(
    /(\[[^\]]+\]\(\/[^)\s]*\))/g
  );

  return parts.map((part, index) => {
    const match = part.match(
      /^\[([^\]]+)\]\((\/[^)\s]*)\)$/
    );

    if (!match) {
      return <span key={index}>{part}</span>;
    }

    const [, label, href] = match;

    return (
      <Link
        key={index}
        href={normalizeInternalHref(href)}
        className="font-medium text-green-700 underline decoration-green-400 underline-offset-4 transition-colors hover:text-green-800 hover:decoration-green-700 dark:text-green-400 dark:hover:text-green-300"
      >
        {label}
      </Link>
    );
  });
}

/* =========================================================
   MORSE VISUAL
========================================================= */

function MorseVisual({
  code,
}: {
  code: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {code
        .split("")
        .filter(
          (character) =>
            character === "." || character === "-"
        )
        .map((character, index) => {
          if (character === ".") {
            return (
              <span
                key={index}
                aria-label="dot"
                className="h-4 w-4 rounded-full bg-green-500 shadow-sm shadow-green-500/40 sm:h-5 sm:w-5"
              />
            );
          }

          return (
            <span
              key={index}
              aria-label="dash"
              className="h-4 w-12 rounded-full bg-green-500 shadow-sm shadow-green-500/40 sm:h-5 sm:w-16"
            />
          );
        })}
    </div>
  );
}

/* =========================================================
   AUDIO HOOK
========================================================= */

function useMorseAudio() {
  const [isPlaying, setIsPlaying] = useState(false);

  const contextRef =
    useRef<AudioContext | null>(null);

  const timeoutsRef =
    useRef<ReturnType<typeof setTimeout>[]>([]);

  const oscillatorsRef =
    useRef<OscillatorNode[]>([]);

  const stop = useCallback(() => {
    timeoutsRef.current.forEach((timeout) =>
      clearTimeout(timeout)
    );

    timeoutsRef.current = [];

    oscillatorsRef.current.forEach((oscillator) => {
      try {
        oscillator.stop();
      } catch {
        // Already stopped.
      }
    });

    oscillatorsRef.current = [];
    setIsPlaying(false);
  }, []);

  const play = useCallback(
    (morseCode: string) => {
      stop();

      if (typeof window === "undefined") {
        return;
      }

      const AudioContextClass =
        window.AudioContext ||
        (
          window as typeof window & {
            webkitAudioContext?: typeof AudioContext;
          }
        ).webkitAudioContext;

      if (!AudioContextClass) {
        return;
      }

      const context = new AudioContextClass();

      contextRef.current = context;

      /*
       * International Morse timing:
       * dot = 1 unit
       * dash = 3 units
       * gap between elements = 1 unit
       * gap between letters = 3 units
       * gap between words = 7 units
       */

      const unit = 90;
      const frequency = 650;

      let currentTime = 0;

      setIsPlaying(true);

      const playTone = (
        delay: number,
        duration: number
      ) => {
        const startTimeout = setTimeout(() => {
          if (context.state === "suspended") {
            void context.resume();
          }

          const oscillator =
            context.createOscillator();

          const gain =
            context.createGain();

          oscillator.type = "sine";
          oscillator.frequency.value = frequency;

          gain.gain.setValueAtTime(
            0.12,
            context.currentTime
          );

          oscillator.connect(gain);
          gain.connect(context.destination);

          oscillatorsRef.current.push(oscillator);

          oscillator.start();

          const stopTimeout = setTimeout(() => {
            try {
              oscillator.stop();
            } catch {
              // Ignore.
            }
          }, duration);

          timeoutsRef.current.push(stopTimeout);
        }, delay);

        timeoutsRef.current.push(startTimeout);
      };

      const tokens = morseCode.trim().split(/\s+/);

      tokens.forEach((token, tokenIndex) => {
        if (token === "/") {
          currentTime += unit * 4;
          return;
        }

        token.split("").forEach((symbol, symbolIndex) => {
          if (
            symbol !== "." &&
            symbol !== "-"
          ) {
            return;
          }

          const duration =
            symbol === "." ? unit : unit * 3;

          playTone(
            currentTime,
            duration
          );

          currentTime += duration;

          if (symbolIndex < token.length - 1) {
            currentTime += unit;
          }
        });

        if (
          tokenIndex < tokens.length - 1 &&
          tokens[tokenIndex + 1] !== "/"
        ) {
          currentTime += unit * 3;
        }
      });

      const finishTimeout = setTimeout(() => {
        oscillatorsRef.current = [];
        timeoutsRef.current = [];
        setIsPlaying(false);
      }, currentTime + 150);

      timeoutsRef.current.push(finishTimeout);
    },
    [stop]
  );

  useEffect(() => {
    return () => {
      stop();

      if (contextRef.current) {
        void contextRef.current.close();
      }
    };
  }, [stop]);

  return {
    play,
    stop,
    isPlaying,
  };
}

/* =========================================================
   SINGLE CHARACTER AUDIO
========================================================= */

function CharacterAudioPlayer({
  code,
  label,
}: {
  code: string;
  label: string;
}) {
  const {
    play,
    stop,
    isPlaying,
  } = useMorseAudio();

  return (
    <div className="mt-6 rounded-2xl border border-green-100 bg-green-50/60 p-5 dark:border-green-900/50 dark:bg-green-950/20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">
            Listen to {label} in Morse Code
          </h3>

          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Sound pattern:{" "}
            <span className="font-mono font-semibold text-green-700 dark:text-green-400">
              {morseToDitDah(code)}
            </span>
          </p>
        </div>

        <div className="flex gap-2">
          {!isPlaying ? (
            <button
              type="button"
              onClick={() => play(code)}
              className="rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              🔊 Play Sound
            </button>
          ) : (
            <button
              type="button"
              onClick={stop}
              className="rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900"
            >
              ■ Stop
            </button>
          )}

          <button
            type="button"
            onClick={() => play(code)}
            className="rounded-xl border border-green-200 bg-white px-4 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-50 dark:border-green-900 dark:bg-slate-900 dark:text-green-400"
          >
            ↻ Replay
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   COMPACT WORD AUDIO BUTTON
========================================================= */

function WordAudioButton({
  morseCode,
  word,
}: {
  morseCode: string;
  word: string;
}) {
  const {
    play,
    stop,
    isPlaying,
  } = useMorseAudio();

  return (
    <>
      {!isPlaying ? (
        <button
          type="button"
          onClick={() => play(morseCode)}
          aria-label={`Play ${word} in Morse code`}
          className="inline-flex min-w-[86px] items-center justify-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700"
        >
          🔊 Play
        </button>
      ) : (
        <button
          type="button"
          onClick={stop}
          aria-label={`Stop ${word}`}
          className="inline-flex min-w-[86px] items-center justify-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-700"
        >
          ■ Stop
        </button>
      )}
    </>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function CharacterReferencePage({
  type,
  data,
}: Props) {
  const isAlphabet = type === "letter";

  const pageTitle = isAlphabet
    ? "Morse Code Alphabet: A–Z Chart, Letters, Sounds & Complete Guide"
    : "Morse Code Numbers: 0–9 Chart, Patterns & Complete Guide";

  const pageDescription = isAlphabet
    ? "Learn every letter from A to Z in International Morse Code. Explore the complete Morse code alphabet, dot and dash patterns, sound rhythm, examples, practice tips, and FAQs."
    : "Learn every number from 0 to 9 in International Morse Code. Explore Morse code number patterns, dots and dashes, rhythm, timing, examples, practice tips, and FAQs.";

  const pagePath = isAlphabet
    ? "/morse-code-alphabet"
    : "/morse-code-numbers";

  const label = isAlphabet
    ? "Letter"
    : "Number";

  const pluralLabel = isAlphabet
    ? "Letters"
    : "Numbers";

  const faqSchema = generateFAQSchema([
    {
      question: isAlphabet
        ? "How many letters are in the Morse code alphabet?"
        : "How many numbers are in Morse code?",
      answer: isAlphabet
        ? "The standard English alphabet contains 26 letters, from A through Z. Each letter has its own International Morse Code pattern made from dots and dashes."
        : "International Morse Code represents the ten decimal digits from 0 through 9. Each number uses a five-element pattern made from dots and dashes.",
    },
    {
      question: isAlphabet
        ? "What is the easiest way to learn the Morse code alphabet?"
        : "What is the easiest way to learn Morse code numbers?",
      answer: isAlphabet
        ? "Study complete character patterns, listen to their rhythm, practice words, compare similar characters, and test recognition regularly."
        : "Study the 0–9 patterns, listen to complete rhythms, compare similar numbers, practice numerical sequences, and test recognition regularly.",
    },
    {
      question:
        "What do dots and dashes mean in Morse code?",
      answer:
        "A dot is a short signal and a dash is a longer signal. Their combinations create Morse code letters, numbers, punctuation, and procedural signals.",
    },
    {
      question:
        "Can I listen to Morse code sounds on this page?",
      answer:
        "Yes. Each character and practice word includes a browser-based audio player that generates the corresponding Morse code pattern.",
    },
  ]);

  const breadcrumbSchema =
    generateBreadcrumbSchema([
      {
        name: "Home",
        url: "/",
      },
      {
        name: isAlphabet
          ? "Morse Code Alphabet"
          : "Morse Code Numbers",
        url: pagePath,
      },
    ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema
          ),
        }}
      />

      <main className="min-h-screen bg-white dark:bg-slate-950">
        {/* HERO */}

        <section className="border-b border-slate-200 bg-gradient-to-b from-green-50 via-white to-white dark:border-slate-800 dark:from-green-950/30 dark:via-slate-950 dark:to-slate-950">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400"
            >
              <Link
                href="/"
                className="transition-colors hover:text-green-700 dark:hover:text-green-400"
              >
                Home
              </Link>

              <span>/</span>

              <span className="font-medium text-slate-700 dark:text-slate-200">
                {isAlphabet
                  ? "Morse Code Alphabet"
                  : "Morse Code Numbers"}
              </span>
            </nav>

            <div className="max-w-4xl">
              <span className="inline-flex rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green-700 dark:border-green-900/60 dark:bg-green-950/40 dark:text-green-400">
                International Morse Code Reference
              </span>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
                {isAlphabet
                  ? "Morse Code Alphabet: A–Z Complete Guide"
                  : "Morse Code Numbers: 0–9 Complete Guide"}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                {pageDescription}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                >
                  Try Morse Code Translator
                </Link>

                <Link
                  href="/morse-code-quiz"
                  className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-green-500 hover:text-green-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  Take the Morse Code Quiz
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK REFERENCE */}

        <section className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {isAlphabet
                  ? "Morse Code Alphabet Quick Reference"
                  : "Morse Code Numbers Quick Reference"}
              </h2>

              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Select any {label.toLowerCase()} to jump
                directly to its explanation, signal pattern,
                audio, word examples, practice guidance, and
                FAQs.
              </p>
            </div>

            <div
              className={`grid gap-3 ${
                isAlphabet
                  ? "grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9"
                  : "grid-cols-2 sm:grid-cols-5 lg:grid-cols-10"
              }`}
            >
              {data.map((item, itemIndex) => (
  <a
    key={`${type}-${item.char}-${itemIndex}`}
                  href={`#${getSectionId(
                    item,
                    type
                  )}`}
                  className="group rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-green-400 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="text-2xl font-bold text-slate-900 group-hover:text-green-700 dark:text-white dark:group-hover:text-green-400">
                    {item.char}
                  </div>

                  <div className="mt-1 font-mono text-xs font-medium text-green-700 dark:text-green-400">
                    {item.code}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* INTRODUCTION */}

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Understanding{" "}
              {isAlphabet
                ? "the Morse Code Alphabet"
                : "Morse Code Numbers"}
            </h2>

            <div className="mt-5 space-y-5 leading-8 text-slate-600 dark:text-slate-300">
              <p>
                Morse code is a communication system based on
                short and long signals. In International Morse
                Code, each character is represented by a unique
                sequence of dots and dashes. The complete{" "}
                {pluralLabel.toLowerCase()} below provide a
                practical reference for learning, decoding,
                sending, and recognizing Morse signals.
              </p>

              <p>
                Combine visual recognition with listening and
                timing practice. Use the{" "}
                <Link
                  href="/"
                  className="font-medium text-green-700 underline underline-offset-4 hover:text-green-800 dark:text-green-400"
                >
                  Morse Code Translator
                </Link>
                , learn signal spacing through{" "}
                <Link
                  href="/morse-code-timing"
                  className="font-medium text-green-700 underline underline-offset-4 hover:text-green-800 dark:text-green-400"
                >
                  Morse Code Timing
                </Link>
                , explore{" "}
                <Link
                  href="/morse-code-sounds"
                  className="font-medium text-green-700 underline underline-offset-4 hover:text-green-800 dark:text-green-400"
                >
                  Morse Code Sounds
                </Link>
                , and test your recognition with the{" "}
                <Link
                  href="/morse-code-quiz"
                  className="font-medium text-green-700 underline underline-offset-4 hover:text-green-800 dark:text-green-400"
                >
                  Morse Code Quiz
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* CHARACTER CONTENT */}

        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Complete{" "}
              {isAlphabet ? "A–Z" : "0–9"} Morse Code
              Reference
            </h2>

            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Each {label.toLowerCase()} includes its exact
              Morse pattern, sound, timing guidance, examples,
              practice words, facts, related characters, and
              contextual learning links.
            </p>
          </div>

          <div className="space-y-10">
            {data.map((item, index) => {
              const dots = getDots(item.code);
              const dashes = getDashes(item.code);
              const ditDah = morseToDitDah(
                item.code
              );

              return (
                <article
                  key={item.char}
                  id={getSectionId(item, type)}
                  className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8"
                >
                  {/* HEADER */}

                  <header className="border-b border-slate-200 pb-7 dark:border-slate-800">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                      <div className="max-w-3xl">
                        <span className="text-sm font-semibold uppercase tracking-wider text-green-700 dark:text-green-400">
                          {label} {index + 1} of{" "}
                          {data.length}
                        </span>

                        <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                          {item.char} in Morse Code
                        </h2>

                        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                          <strong>
                            What is {item.char} in Morse Code?
                          </strong>{" "}
                          The Morse code for{" "}
                          <strong>{item.char}</strong> is{" "}
                          <strong className="font-mono text-green-700 dark:text-green-400">
                            {item.code}
                          </strong>
                          . It contains {dots}{" "}
                          {dots === 1 ? "dot" : "dots"} and{" "}
                          {dashes}{" "}
                          {dashes === 1
                            ? "dash"
                            : "dashes"}
                          .
                        </p>
                      </div>

                      <div className="rounded-2xl bg-slate-950 px-6 py-5 text-center lg:min-w-[280px]">
                        <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                          Signal Pattern
                        </div>

                        <div className="mt-3 font-mono text-3xl font-bold tracking-[0.25em] text-green-400">
                          {item.code}
                        </div>

                        <div className="mt-5">
                          <MorseVisual
                            code={item.code}
                          />
                        </div>

                        <div className="mt-4 font-mono text-xs text-slate-400">
                          {ditDah}
                        </div>
                      </div>
                    </div>
                  </header>

                  {/* INTRODUCTION */}

                  <section className="pt-8">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      What Is {item.char} in Morse Code?
                    </h3>

                    <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
                      {renderInlineLinks(
                        item.introduction
                      )}
                    </p>
                  </section>

                  {/* AUDIO */}

                  <CharacterAudioPlayer
                    code={item.code}
                    label={item.char}
                  />

                  {/* SOUND + WRITE */}

                  <div className="mt-8 grid gap-8 lg:grid-cols-2">
                    <section>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        Sound and Rhythm
                      </h3>

                      <p className="mt-3 text-sm font-semibold text-green-700 dark:text-green-400">
                        Direct answer: {item.char} sounds like{" "}
                        {ditDah}.
                      </p>

                      <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
                        {renderInlineLinks(
                          item.soundRhythm
                        )}
                      </p>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        How to Write and Send {item.char}
                      </h3>

                      <p className="mt-3 text-sm font-semibold text-green-700 dark:text-green-400">
                        Direct answer: send{" "}
                        {item.code} with consistent Morse
                        timing.
                      </p>

                      <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
                        {renderInlineLinks(
                          item.howToWrite
                        )}
                      </p>
                    </section>
                  </div>

                  {/* IMPORTANCE */}

                  <section className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-800">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Why {item.char} Is Important
                    </h3>

                    <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
                      {renderInlineLinks(
                        item.importance
                      )}
                    </p>
                  </section>

                  {/* VISUAL */}

                  {item.visualDescription && (
                    <section className="mt-8 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/60">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        Visual Pattern
                      </h3>

                      <p className="mt-3 leading-8 text-slate-600 dark:text-slate-300">
                        {renderInlineLinks(
                          item.visualDescription
                        )}
                      </p>
                    </section>
                  )}

                  {/* WORD PRACTICE TABLE */}

                  <section className="mt-8">
                    <div className="max-w-4xl">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Practice {item.char} With Real Words
                      </h3>

                      <p className="mt-3 leading-8 text-slate-600 dark:text-slate-300">
                        Practice{" "}
                        <strong>{item.char}</strong> inside
                        complete words instead of memorizing the
                        character in isolation. Each example
                        below includes the full Morse sequence
                        and an audio button.
                      </p>
                    </div>

                    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] border-collapse text-left">
                          <thead>
                            <tr className="border-b border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
                              <th className="px-5 py-4 text-sm font-bold text-slate-900 dark:text-white">
                                Word
                              </th>

                              <th className="px-5 py-4 text-sm font-bold text-slate-900 dark:text-white">
                                Morse Code
                              </th>

                              <th className="px-5 py-4 text-sm font-bold text-slate-900 dark:text-white">
                                Sound
                              </th>

                              <th className="px-5 py-4 text-sm font-bold text-slate-900 dark:text-white">
                                Practice Purpose
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {item.wordExamples.map(
                              (word, wordIndex) => {
                                const morseCode =
                                  wordToMorse(word);

                                return (
                                  <tr
                                    key={`${item.char}-${word}-${wordIndex}`}
                                    className="border-b border-slate-200 last:border-b-0 dark:border-slate-700"
                                  >
                                    <td className="px-5 py-4">
                                      <strong className="text-base text-slate-900 dark:text-white">
                                        {word}
                                      </strong>
                                    </td>

                                    <td className="px-5 py-4">
                                      <code className="block max-w-[280px] break-all rounded-lg bg-green-50 px-3 py-2 font-mono text-xs font-semibold leading-6 text-green-700 dark:bg-green-950/30 dark:text-green-400">
                                        {morseCode}
                                      </code>
                                    </td>

                                    <td className="px-5 py-4">
                                      <WordAudioButton
                                        morseCode={
                                          morseCode
                                        }
                                        word={word}
                                      />
                                    </td>

                                    <td className="px-5 py-4">
                                      <p className="max-w-xs text-sm leading-7 text-slate-600 dark:text-slate-300">
                                        {wordIndex ===
                                          0 && (
                                          <>
                                            Hear how{" "}
                                            <strong>
                                              {item.char}
                                            </strong>{" "}
                                            appears in a
                                            complete Morse
                                            word.
                                          </>
                                        )}

                                        {wordIndex ===
                                          1 && (
                                          <>
                                            Practice
                                            recognizing{" "}
                                            <strong>
                                              {item.char}
                                            </strong>{" "}
                                            without counting
                                            every dot and dash.
                                          </>
                                        )}

                                        {wordIndex ===
                                          2 && (
                                          <>
                                            Compare this
                                            sequence with the
                                            single-character
                                            rhythm above.
                                          </>
                                        )}

                                        {wordIndex >=
                                          3 && (
                                          <>
                                            Listen first, then
                                            try to identify{" "}
                                            <strong>
                                              {item.char}
                                            </strong>{" "}
                                            before viewing the
                                            answer.
                                          </>
                                        )}
                                      </p>
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </section>

                  {/* PRACTICE GUIDE */}

                  <section className="mt-8 rounded-2xl border border-green-100 bg-green-50/50 p-6 dark:border-green-900/40 dark:bg-green-950/10">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      How to Practice {item.char} in Morse Code
                    </h3>

                    <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
                      {renderInlineLinks(
                        item.practiceTips
                      )}
                    </p>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900">
                        <span className="font-bold text-green-700 dark:text-green-400">
                          1. Listen
                        </span>

                        <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                          Listen to the complete rhythm{" "}
                          <strong className="font-mono">
                            {ditDah}
                          </strong>{" "}
                          instead of counting individual
                          elements.
                        </p>
                      </div>

                      <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900">
                        <span className="font-bold text-green-700 dark:text-green-400">
                          2. Compare
                        </span>

                        <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                          Compare {item.char} with related
                          characters that differ by one dot,
                          dash, or element position.
                        </p>
                      </div>

                      <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900">
                        <span className="font-bold text-green-700 dark:text-green-400">
                          3. Practice Words
                        </span>

                        <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                          Play the example words above and try
                          to recognize {item.char} by sound.
                        </p>
                      </div>

                      <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900">
                        <span className="font-bold text-green-700 dark:text-green-400">
                          4. Test Yourself
                        </span>

                        <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                          Use the{" "}
                          <Link
                            href="/morse-code-quiz"
                            className="font-semibold text-green-700 underline underline-offset-4 dark:text-green-400"
                          >
                            Morse Code Quiz
                          </Link>{" "}
                          to test your recognition without
                          looking at the chart.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* FACTS */}

                  {item.funFacts.length > 0 && (
                    <section className="mt-8">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        Key Facts About {item.char}
                      </h3>

                      <ul className="mt-4 space-y-3">
                        {item.funFacts.map(
                          (fact, factIndex) => (
                            <li
                              key={factIndex}
                              className="flex gap-3 leading-7 text-slate-600 dark:text-slate-300"
                            >
                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-green-500" />

                              <span>
                                {renderInlineLinks(
                                  fact
                                )}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </section>
                  )}

                  {/* RELATED */}

                  {item.relatedChars.length > 0 && (
                    <section className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-800">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        Related Morse Code Characters
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        Compare similar patterns to improve
                        recognition and avoid common Morse code
                        mistakes.
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
  {item.relatedChars.map(
    (related, relatedIndex) => {
      const firstCharacter = related.charAt(0);

      const isRelatedNumber =
        /^[0-9]$/.test(firstCharacter);

      const href = isRelatedNumber
        ? `/morse-code-numbers#number-${firstCharacter}`
        : `/morse-code-alphabet#letter-${firstCharacter.toLowerCase()}`;

      const text = isRelatedNumber
        ? `${firstCharacter} in Morse Code`
        : `${firstCharacter.toUpperCase()} in Morse Code`;

      return (
        <Link
          key={`${item.char}-${related}-${relatedIndex}`}
          href={href}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-green-400 hover:bg-green-50 hover:text-green-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-green-700 dark:hover:bg-green-950/30"
        >
          {text}
        </Link>
      );
    }
  )}
</div>
                    </section>
                  )}

                  {/* CHARACTER FAQ */}

                  {item.faq.length > 0 && (
                    <section className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-800">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        Frequently Asked Questions About{" "}
                        {item.char}
                      </h3>

                      <div className="mt-5 space-y-4">
                        {item.faq.map(
                          (faq, faqIndex) => (
                            <details
                              key={faqIndex}
                              className="group rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-700 dark:bg-slate-800/50"
                            >
                              <summary className="cursor-pointer list-none pr-6 font-semibold text-slate-900 dark:text-white">
                                {faq.question}
                              </summary>

                              <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
                                {renderInlineLinks(
                                  faq.answer
                                )}
                              </p>
                            </details>
                          )
                        )}
                      </div>
                    </section>
                  )}

                  {/* INTERNAL LINKS */}

                  <div className="mt-8 grid gap-3 border-t border-slate-200 pt-8 sm:grid-cols-2 lg:grid-cols-4 dark:border-slate-800">
                    <Link
                      href="/"
                      className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-800 transition-colors hover:bg-green-100 dark:border-green-900/60 dark:bg-green-950/30 dark:text-green-300"
                    >
                      ↔ Translate Morse Code
                    </Link>

                    <Link
                      href="/morse-code-sounds"
                      className="rounded-xl border border-slate-200 p-4 text-sm font-semibold text-slate-700 transition-colors hover:border-green-400 hover:text-green-700 dark:border-slate-700 dark:text-slate-300"
                    >
                      🔊 Learn Morse Sounds
                    </Link>

                    <Link
                      href="/morse-code-timing"
                      className="rounded-xl border border-slate-200 p-4 text-sm font-semibold text-slate-700 transition-colors hover:border-green-400 hover:text-green-700 dark:border-slate-700 dark:text-slate-300"
                    >
                      ⏱ Understand Timing
                    </Link>

                    <Link
                      href="/morse-code-quiz"
                      className="rounded-xl border border-slate-200 p-4 text-sm font-semibold text-slate-700 transition-colors hover:border-green-400 hover:text-green-700 dark:border-slate-700 dark:text-slate-300"
                    >
                      🧠 Take the Quiz
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* GLOBAL FAQ */}

        <section className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              {isAlphabet
                ? "Morse Code Alphabet FAQs"
                : "Morse Code Numbers FAQs"}
            </h2>

            <div className="mt-7 space-y-4">
              {[
                {
                  question: isAlphabet
                    ? "How many letters are in the Morse code alphabet?"
                    : "How many numbers are represented in Morse code?",
                  answer: isAlphabet
                    ? "The English alphabet contains 26 letters from A to Z, and each letter has its own Morse code sequence."
                    : "The decimal number system contains ten digits from 0 through 9, and each digit has its own five-element Morse code sequence.",
                },
                {
                  question:
                    "Should I memorize dots and dashes visually?",
                  answer:
                    "Visual reference is useful for beginners, but repeated listening and practice help learners recognize complete Morse patterns more naturally.",
                },
                {
                  question:
                    "What should I learn after the alphabet and numbers?",
                  answer:
                    "Continue with Morse code timing, sound recognition, common words and signals, then use the quiz to test your recognition.",
                },
                {
                  question:
                    "Can I translate my own text into Morse code?",
                  answer:
                    "Yes. Use the Morse Code Translator to convert supported text into Morse code or decode Morse signals back into readable text.",
                },
              ].map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-4 dark:border-slate-700 dark:bg-slate-900"
                >
                  <summary className="cursor-pointer list-none font-semibold text-slate-900 dark:text-white">
                    {faq.question}
                  </summary>

                  <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}