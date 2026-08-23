"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Trash2,
  ArrowRight,
  Zap,
  Headphones,
  ShieldCheck,
  Search,
  BookOpen,
  AlertTriangle,
} from "lucide-react";

import { MORSE_CODE, TEXT_CODE } from "@/lib/morse";

interface FAQ {
  question: string;
  answer: string;
}

interface Props {
  faqs: FAQ[];
}

type SeparatorMode = "space" | "slash" | "pipe" | "continuous";

type AnalysisItem = {
  morse: string;
  char: string;
  valid: boolean;
};

const MORSE_KEYS = Object.keys(TEXT_CODE).sort(
  (a, b) => b.length - a.length
);

/*
 * Attempts to split continuous Morse into valid characters.
 * Morse without separators is inherently ambiguous, so this
 * returns one practical segmentation instead of claiming certainty.
 */
function decodeContinuousMorse(input: string) {
  const clean = input.replace(/[^.-]/g, "");

  if (!clean) {
    return [];
  }

  const memo = new Map<string, string[] | null>();

  function solve(sequence: string): string[] | null {
    if (!sequence) {
      return [];
    }

    if (memo.has(sequence)) {
      return memo.get(sequence)!;
    }

    for (const code of MORSE_KEYS) {
      if (sequence.startsWith(code)) {
        const remainder = solve(sequence.slice(code.length));

        if (remainder) {
          const result = [code, ...remainder];
          memo.set(sequence, result);
          return result;
        }
      }
    }

    memo.set(sequence, null);
    return null;
  }

  return solve(clean) || [clean];
}

export default function DecoderClient({ faqs }: Props) {
  const [morseInput, setMorseInput] = useState("");

  const [separator, setSeparator] =
    useState<SeparatorMode>("space");

  const [copied, setCopied] = useState(false);

  const [openFaq, setOpenFaq] =
    useState<number | null>(null);

  const decodeResult = useMemo(() => {
    if (!morseInput.trim()) {
      return {
        text: "",
        analysis: [] as AnalysisItem[],
      };
    }

    let tokens: string[] = [];

    if (separator === "continuous") {
      tokens = decodeContinuousMorse(morseInput);
    } else if (separator === "pipe") {
      tokens = morseInput
        .trim()
        .split("|")
        .map((item) => item.trim())
        .filter(Boolean);
    } else if (separator === "slash") {
      tokens = morseInput
        .trim()
        .split("/")
        .map((item) => item.trim())
        .filter(Boolean);
    } else {
      tokens = morseInput
        .trim()
        .split(/\s+/)
        .filter(Boolean);
    }

    const analysis = tokens.map((token) => {
      const char = TEXT_CODE[token] || "";

      return {
        morse: token,
        char,
        valid: Boolean(char),
      };
    });

    const text = analysis
      .map((item) => item.char || "?")
      .join("");

    return {
      text,
      analysis,
    };
  }, [morseInput, separator]);

  const handleCopy = useCallback(() => {
    if (!decodeResult.text) return;

    navigator.clipboard.writeText(decodeResult.text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [decodeResult.text]);

  const handleClear = useCallback(() => {
    setMorseInput("");
  }, []);

  const validCount = decodeResult.analysis.filter(
    (item) => item.valid
  ).length;

  const totalCount = decodeResult.analysis.length;

  const invalidChars = decodeResult.analysis.filter(
    (item) => !item.valid
  );

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const numbers = "0123456789".split("");

  return (
    <div className="min-h-screen bg-background">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="w-full bg-[#0f6b3b] text-white">
        <div className="mx-auto max-w-5xl px-4 py-10 text-center sm:px-6 sm:py-12 lg:px-8">

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Morse Code Decoder
          </h1>

          <p className="mx-auto mt-4 max-w-4xl text-base leading-8 text-green-50 sm:text-lg">
            Decode dots and dashes into readable text instantly.
            This Morse Code Decoder supports{" "}
            <strong>International Morse Code</strong>, letters{" "}
            <strong>A–Z</strong>, numbers <strong>0–9</strong>,
            separators, continuous Morse analysis, and
            character-by-character validation.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-green-100 sm:text-base">

            <span className="inline-flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Instant Decoding
            </span>

            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              International Standard
            </span>

            <span className="inline-flex items-center gap-2">
              <Search className="h-4 w-4" />
              Character Analysis
            </span>

            <span className="inline-flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              A–Z & 0–9 Support
            </span>

          </div>
        </div>
      </section>

      {/* =====================================================
          DECODER TOOL
      ====================================================== */}

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="rounded-3xl border border-border border-t-4 border-t-green-600 bg-card p-4 shadow-lg shadow-black/[0.03] sm:p-6 lg:p-7">

          <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">

            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-green-600">
                Interactive Tool
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Decode Morse Code to Text
              </h2>

              <p className="mt-2 max-w-2xl leading-7 text-muted-foreground">
                Enter a Morse code message below. Use dots and
                dashes, then select the separator format that
                matches your input.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold transition-colors hover:border-green-500 hover:text-green-700"
            >
              Text to Morse
              <ArrowRight className="h-4 w-4" />
            </Link>

          </div>

          {/* Separator Tabs */}

          <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl border border-border bg-muted/40 p-2 md:grid-cols-4">

            {[
              {
                id: "space" as const,
                label: "Space",
                example: ".- -...",
              },
              {
                id: "slash" as const,
                label: "Slash",
                example: ".- / -...",
              },
              {
                id: "pipe" as const,
                label: "Pipe",
                example: ".- | -...",
              },
              {
                id: "continuous" as const,
                label: "Continuous",
                example: ".--.-",
              },
            ].map((item) => (

              <button
                key={item.id}
                type="button"
                onClick={() => setSeparator(item.id)}
                className={`rounded-xl px-4 py-3 text-left transition-all ${
                  separator === item.id
                    ? "bg-green-700 text-white shadow-sm"
                    : "text-muted-foreground hover:bg-background hover:text-foreground"
                }`}
              >
                <span className="block text-sm font-semibold">
                  {item.label}
                </span>

                <span
                  className={`mt-1 block font-mono text-xs ${
                    separator === item.id
                      ? "text-green-100"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.example}
                </span>
              </button>

            ))}

          </div>

          {/* Input + Output */}

          <div className="grid gap-5 lg:grid-cols-2">

            <div className="rounded-2xl border border-border bg-background p-4 sm:p-5">

              <div className="mb-3 flex items-center justify-between">

                <label className="font-semibold text-foreground">
                  Enter Morse Code
                </label>

                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear
                </button>

              </div>

              <textarea
                value={morseInput}
                onChange={(event) =>
                  setMorseInput(event.target.value)
                }
                placeholder="Example: .... . .-.. .-.. ---"
                className="min-h-[220px] w-full resize-none rounded-xl border border-border bg-muted/20 p-4 font-mono text-base text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-green-500 focus:ring-2 focus:ring-green-500/15"
                dir="ltr"
              />

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">

                <span>
                  {totalCount} detected{" "}
                  {totalCount === 1
                    ? "pattern"
                    : "patterns"}
                </span>

                <span>
                  Use . for dots and - for dashes
                </span>

              </div>

            </div>

            <div className="rounded-2xl border border-border bg-background p-4 sm:p-5">

              <div className="mb-3 flex items-center justify-between">

                <div>
                  <p className="font-semibold text-foreground">
                    Decoded Text
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Live result
                  </p>
                </div>

                <div className="flex items-center gap-2">

                  {totalCount > 0 && (

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        validCount === totalCount
                          ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                      }`}
                    >
                      {validCount}/{totalCount} valid
                    </span>

                  )}

                  <button
                    type="button"
                    onClick={handleCopy}
                    disabled={!decodeResult.text}
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold transition-colors hover:border-green-500 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}

                    {copied ? "Copied" : "Copy"}
                  </button>

                </div>

              </div>

              <div
                className="min-h-[220px] rounded-xl border border-border bg-muted/20 p-5 font-mono text-lg text-foreground"
                dir="ltr"
              >
                {decodeResult.text ? (
                  decodeResult.text
                ) : (
                  <span className="text-muted-foreground">
                    Your decoded message will appear here...
                  </span>
                )}
              </div>

              <div className="mt-3 text-xs leading-6 text-muted-foreground">

                Tip: For the most reliable result, separate Morse
                characters correctly. Learn the standard patterns in
                our{" "}

                <Link
                  href="/morse-code-alphabet"
                  className="font-semibold text-green-700 hover:underline"
                >
                  Morse Code Alphabet
                </Link>

                .

              </div>

            </div>

          </div>

          {/* Character Analysis */}

          {decodeResult.analysis.length > 0 && (

            <div className="mt-6 rounded-2xl border border-border bg-background p-4 sm:p-5">

              <div className="mb-4 flex items-center gap-2">

                <Search className="h-5 w-5 text-green-600" />

                <div>

                  <h3 className="font-bold text-foreground">
                    Character Analysis
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Check every Morse pattern individually.
                  </p>

                </div>

              </div>

              <div className="max-h-72 overflow-y-auto rounded-xl border border-border">

                <table className="w-full text-sm">

                  <thead className="sticky top-0 bg-muted">

                    <tr>
                      <th className="p-3 text-left font-semibold">
                        Morse Pattern
                      </th>

                      <th className="p-3 text-left font-semibold">
                        Character
                      </th>

                      <th className="p-3 text-left font-semibold">
                        Status
                      </th>
                    </tr>

                  </thead>

                  <tbody>

                    {decodeResult.analysis.map((item, index) => (

                      <tr
                        key={`${item.morse}-${index}`}
                        className={`border-t border-border ${
                          !item.valid
                            ? "bg-red-50/50 dark:bg-red-950/10"
                            : ""
                        }`}
                      >

                        <td className="p-3 font-mono">
                          {item.morse}
                        </td>

                        <td className="p-3 font-bold">
                          {item.char || "?"}
                        </td>

                        <td className="p-3">

                          {item.valid ? (

                            <span className="font-semibold text-green-600">
                              Valid
                            </span>

                          ) : (

                            <span className="font-semibold text-red-500">
                              Unknown
                            </span>

                          )}

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

              {invalidChars.length > 0 && (

                <div className="mt-4 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-300">

                  <AlertTriangle className="h-5 w-5 shrink-0" />

                  <p className="leading-6">

                    <strong>
                      {invalidChars.length} pattern
                      {invalidChars.length > 1 ? "s" : ""} could not
                      be decoded.
                    </strong>{" "}

                    Check the dots, dashes, and character boundaries.
                    You can compare them with the{" "}

                    <Link
                      href="/morse-code-alphabet"
                      className="font-semibold underline"
                    >
                      complete Morse alphabet
                    </Link>

                    .

                  </p>

                </div>

              )}

            </div>

          )}

        </div>

      </section>

      {/* =====================================================
          QUICK EXAMPLES
      ====================================================== */}

             {/* =====================================================
           HOW TO DECODE INFOGRAPHIC
       ====================================================== */}

       <section className="border-y border-border bg-muted/20">
         <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
           <figure className="mx-auto max-w-5xl">
             <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
               <Image
                 src="/images/infographic/how-to-decode-morse-code.webp"
                 alt="Step-by-step infographic explaining how to decode Morse code by identifying dots and dashes, separating characters, matching patterns, and reading the final message"
                 width={1200}
                 height={675}
                 className="h-auto w-full"
                 sizes="(max-width: 1024px) 100vw, 1024px"
               />
             </div>
             <figcaption className="mt-4 text-center text-sm leading-7 text-muted-foreground">
               Decode Morse code by separating each pattern, matching dots and dashes to the Morse alphabet, and combining the decoded characters into readable text.
             </figcaption>
           </figure>

           <p className="mx-auto mt-6 max-w-4xl text-center leading-8 text-muted-foreground">
             If you are new to Morse patterns, start with the{" "}
             <Link href="/morse-code-alphabet" className="font-semibold text-green-700 hover:underline dark:text-green-400">
               Morse Code Alphabet
             </Link>
             {" "}and use{" "}
             <Link href="/learn-morse-code" className="font-semibold text-green-700 hover:underline dark:text-green-400">
               Learn Morse Code
             </Link>
             {" "}for structured practice.
           </p>
         </div>
       </section>

<section className="border-y border-border bg-muted/30">

        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">

          <div className="mb-8">

            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-green-600">
              Examples
            </p>

            <h2 className="text-3xl font-bold text-foreground">
              Common Morse Code Examples
            </h2>

            <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">

              These examples show how individual Morse patterns are
              separated and decoded. Use the{" "}

              <Link
                href="/"
                className="font-semibold text-green-700 hover:underline"
              >
                Morse Code Translator
              </Link>{" "}

              when you want to convert normal text into Morse code
              or translate Morse messages in both directions.

            </p>

          </div>

          <div className="grid gap-4 md:grid-cols-3">

            {[
              {
                word: "HELLO",
                code: ".... . .-.. .-.. ---",
                description:
                  "Each group represents one letter, separated by spaces.",
              },
              {
                word: "SOS",
                code: "... --- ...",
                description:
                  "The internationally recognized distress signal uses three dots, three dashes, and three dots.",
              },
              {
                word: "HELLO WORLD",
                code:
                  ".... . .-.. .-.. --- / .-- --- .-. .-.. -..",
                description:
                  "A forward slash is commonly used online to show a word boundary.",
              },
            ].map((example) => (

              <div
                key={example.word}
                className="rounded-2xl border border-border bg-card p-5"
              >

                <h3 className="text-lg font-bold text-foreground">
                  {example.word}
                </h3>

                <div className="mt-4 rounded-lg border border-border bg-muted/30 p-3 font-mono text-sm text-green-700 dark:text-green-400">
                  {example.code}
                </div>

                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {example.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          HOW DECODING WORKS
      ====================================================== */}

      <section>

        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="max-w-4xl">

            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-green-600">
              How It Works
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How Morse Code Decoding Works
            </h2>

            <p className="mt-5 leading-8 text-muted-foreground">

              Morse code decoding is the reverse of Morse encoding.
              Each valid sequence of dots and dashes represents a
              character. The decoder reads the pattern, identifies its
              boundary, and matches it with a corresponding character
              in the International Morse Code table.

            </p>

          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">

            <div className="rounded-2xl border border-border bg-card p-6">

              <div className="mb-4 inline-flex rounded-xl bg-green-100 p-3 text-green-700 dark:bg-green-950/40 dark:text-green-400">
                <Search className="h-6 w-6" />
              </div>

              <h3 className="text-lg font-bold">
                1. Read the Pattern
              </h3>

              <p className="mt-3 leading-7 text-muted-foreground">
                The decoder reads dots and dashes. A dot is the short
                signal and a dash is traditionally three timing units
                long.
              </p>

            </div>

            <div className="rounded-2xl border border-border bg-card p-6">

              <div className="mb-4 inline-flex rounded-xl bg-green-100 p-3 text-green-700 dark:bg-green-950/40 dark:text-green-400">
                <BookOpen className="h-6 w-6" />
              </div>

              <h3 className="text-lg font-bold">
                2. Match the Character
              </h3>

              <p className="mt-3 leading-7 text-muted-foreground">

                Each pattern is compared with the{" "}

                <Link
                  href="/morse-code-alphabet"
                  className="font-semibold text-green-700 hover:underline"
                >
                  Morse Code Alphabet
                </Link>

                . For example, <strong>....</strong> maps to H,
                <strong> . </strong> maps to E, and
                <strong> .-..</strong> maps to L.

              </p>

            </div>

            <div className="rounded-2xl border border-border bg-card p-6">

              <div className="mb-4 inline-flex rounded-xl bg-green-100 p-3 text-green-700 dark:bg-green-950/40 dark:text-green-400">
                <Zap className="h-6 w-6" />
              </div>

              <h3 className="text-lg font-bold">
                3. Build the Message
              </h3>

              <p className="mt-3 leading-7 text-muted-foreground">
                The decoded characters are joined together to create
                readable text. Invalid patterns are flagged so you can
                find typing or spacing mistakes quickly.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          WHY SPACING MATTERS
      ====================================================== */}

      <section className="border-y border-border bg-muted/30">

        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-2">

            <div>

              <h2 className="text-3xl font-bold text-foreground">
                Why Morse Code Spacing Matters
              </h2>

              <p className="mt-5 leading-8 text-muted-foreground">
                Morse code is not only a collection of dots and
                dashes. Timing and spacing are part of the system.
                Without clear character boundaries, the same continuous
                sequence may have multiple possible interpretations.
              </p>

              <p className="mt-4 leading-8 text-muted-foreground">
                In standard Morse timing, a dot represents one time
                unit, while a dash represents three units. The gap
                between elements of the same character is one unit,
                the gap between characters is three units, and the gap
                between words is seven units.
              </p>

              <p className="mt-4 leading-8 text-muted-foreground">

                If you are learning these timing ratios, use our{" "}

                <Link
                  href="/morse-code-timing"
                  className="font-semibold text-green-700 hover:underline"
                >
                  Morse Code Timing guide
                </Link>

                . For listening practice, visit{" "}

                <Link
                  href="/morse-code-sounds"
                  className="font-semibold text-green-700 hover:underline"
                >
                  Morse Code Sounds
                </Link>

                .

              </p>

            </div>

            <div className="rounded-2xl border border-border bg-card p-6">

              <h3 className="text-xl font-bold">
                Standard Timing Reference
              </h3>

              <div className="mt-6 space-y-3">

                {[
                  ["Dot", "1 timing unit"],
                  ["Dash", "3 timing units"],
                  ["Gap inside a character", "1 unit"],
                  ["Gap between characters", "3 units"],
                  ["Gap between words", "7 units"],
                ].map(([label, value]) => (

                  <div
                    key={label}
                    className="flex items-center justify-between rounded-xl border border-border px-4 py-3"
                  >

                    <span className="font-medium">
                      {label}
                    </span>

                    <span className="font-mono text-sm text-green-700 dark:text-green-400">
                      {value}
                    </span>

                  </div>

                ))}

              </div>

              <Link
                href="/morse-code-timing"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-green-700 hover:underline"
              >
                Learn Morse Timing
                <ArrowRight className="h-4 w-4" />
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          ALPHABET AND NUMBERS
      ====================================================== */}

      <section>

        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-2">

            <div>

              <h2 className="text-3xl font-bold text-foreground">
                Morse Code Alphabet A–Z
              </h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                International Morse Code represents the 26 English
                letters using combinations of dots and dashes. Shorter
                patterns such as E (.) and T (-) are among the simplest
                characters, while longer sequences require more
                careful recognition.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4">

                {alphabet.map((char) => (

                  <Link
                    key={char}
                    href={`/morse-code-letter/${char.toLowerCase()}`}
                    className="rounded-lg border border-border bg-card px-3 py-3 text-center transition-all hover:border-green-500 hover:text-green-700"
                  >

                    <span className="block font-bold">
                      {char}
                    </span>

                    <span className="mt-1 block font-mono text-xs text-green-700 dark:text-green-400">
                      {MORSE_CODE[char]}
                    </span>

                  </Link>

                ))}

              </div>

              <Link
                href="/morse-code-alphabet"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-green-700 hover:underline"
              >
                View Complete Alphabet Chart
                <ArrowRight className="h-4 w-4" />
              </Link>

            </div>

            <div>

              <h2 className="text-3xl font-bold text-foreground">
                Morse Code Numbers 0–9
              </h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                The ten standard Morse numbers each contain five signal
                elements. Numbers 1 through 5 progressively increase
                the number of dots, while 6 through 0 progressively
                increase the number of dashes.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">

                {numbers.map((char) => (

                  <Link
                    key={char}
                    href={`/morse-code-number/${char}`}
                    className="rounded-xl border border-border bg-card p-4 text-center transition-all hover:border-green-500 hover:text-green-700"
                  >

                    <span className="block text-lg font-bold">
                      {char}
                    </span>

                    <span className="mt-2 block font-mono text-xs text-green-700 dark:text-green-400">
                      {MORSE_CODE[char]}
                    </span>

                  </Link>

                ))}

              </div>

              <Link
                href="/morse-code-numbers"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-green-700 hover:underline"
              >
                Learn Morse Code Numbers
                <ArrowRight className="h-4 w-4" />
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          LEARNING SECTION
      ====================================================== */}

      <section className="border-y border-border bg-muted/30">

        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-4xl text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-green-600">
              Learn Faster
            </p>

            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
              How to Get Better at Decoding Morse Code
            </h2>

            <p className="mt-5 leading-8 text-muted-foreground">
              Beginners often try to count individual dots and dashes.
              A better long-term approach is to learn the sound and
              rhythm of complete characters. Experienced operators can
              recognize familiar Morse patterns as whole auditory
              units instead of manually counting every signal.
            </p>

          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">

            <Link
              href="/learn-morse-code"
              className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-green-500"
            >

              <BookOpen className="h-7 w-7 text-green-600" />

              <h3 className="mt-4 text-lg font-bold">
                Learn the System
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Study letters, numbers, recognition methods, timing,
                and practical Morse code learning techniques.
              </p>

            </Link>

            <Link
              href="/morse-code-sounds"
              className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-green-500"
            >

              <Headphones className="h-7 w-7 text-green-600" />

              <h3 className="mt-4 text-lg font-bold">
                Train by Sound
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Listen to dots, dashes, and character rhythms to build
                faster recognition and decoding ability.
              </p>

            </Link>

            <Link
              href="/morse-code-quiz"
              className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-green-500"
            >

              <Zap className="h-7 w-7 text-green-600" />

              <h3 className="mt-4 text-lg font-bold">
                Test Your Skills
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Use interactive questions to identify weak characters
                and improve your Morse code recognition.
              </p>

            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          FAQ
      ====================================================== */}

      <section>

        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-green-600">
              FAQ
            </p>

            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
              Morse Code Decoder Questions
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">
              Answers to common questions about decoding dots, dashes,
              letters, numbers, spacing, separators, and International
              Morse Code.
            </p>

          </div>

          <div className="mt-10 space-y-3">

            {faqs.map((faq, index) => (

              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >

                <button
                  type="button"
                  onClick={() =>
                    setOpenFaq(
                      openFaq === index ? null : index
                    )
                  }
                  className="flex w-full items-center justify-between gap-5 p-5 text-left transition-colors hover:bg-muted/30"
                >

                  <span className="font-semibold text-foreground">
                    {faq.question}
                  </span>

                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
                  )}

                </button>

                {openFaq === index && (

                  <div className="px-5 pb-5">

                    <p className="leading-7 text-muted-foreground">
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
          FINAL CTA
      ====================================================== */}

      <section className="w-full bg-[#0f6b3b] py-10 sm:py-12">

        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Continue Learning Morse Code
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-green-50">
            Convert messages, study the complete Morse alphabet,
            understand timing, listen to character sounds, and test
            your knowledge with interactive learning tools.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-green-800 transition-transform hover:scale-[1.02]"
            >
              Morse Code Translator
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/learn-morse-code"
              className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              <BookOpen className="h-4 w-4" />
              Learn Morse Code
            </Link>

            <Link
              href="/morse-code-quiz"
              className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Zap className="h-4 w-4" />
              Take Quiz
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}