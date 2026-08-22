"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDownUp, Check, Copy, RotateCcw } from "lucide-react";

type Mode = "text-to-binary" | "binary-to-text";

function textToBinary(text: string): string {
  return Array.from(text)
    .map((char) => {
      const code = char.codePointAt(0) ?? 0;
      return code <= 0xff ? code.toString(2).padStart(8, "0") : "";
    })
    .filter(Boolean)
    .join(" ");
}

function binaryToText(binary: string): { text: string; invalid: boolean } {
  const groups = binary.trim().split(/\s+/).filter(Boolean);

  if (!groups.length) return { text: "", invalid: false };

  const invalid = groups.some(
    (group) => group.length !== 8 || !/^[01]{8}$/.test(group)
  );

  if (invalid) return { text: "", invalid: true };

  return {
    text: groups.map((group) => String.fromCharCode(parseInt(group, 2))).join(""),
    invalid: false,
  };
}

const internalLinks = [
  { href: "/", title: "Morse Code Translator", text: "Convert text to International Morse code." },
  { href: "/morse-code-decoder", title: "Morse Code Decoder", text: "Decode dots and dashes into readable text." },
  { href: "/morse-code-alphabet", title: "Morse Code Alphabet", text: "Browse the complete A–Z Morse code reference." },
  { href: "/morse-code-numbers", title: "Morse Code Numbers", text: "Learn how digits 0–9 are represented in Morse." },
  { href: "/morse-code-sounds", title: "Morse Code Sounds", text: "Understand dits, dahs, tone and audio rhythm." },
  { href: "/morse-code-timing", title: "Morse Code Timing", text: "Learn standard dot, dash, letter and word spacing." },
  { href: "/learn-morse-code", title: "Learn Morse Code", text: "Practice proven character-learning methods." },
  { href: "/morse-code-quiz", title: "Morse Code Quiz", text: "Test your recognition and decoding skills." },
  { href: "/what-is-morse-code", title: "What Is Morse Code?", text: "Explore its history, purpose and modern use." },
  { href: "/blog", title: "Morse Code Blog", text: "Read guides, explanations and practical examples." },
];

const faqs = [
  {
    q: "What is a binary code translator?",
    a: "A binary code translator converts text into sequences of 0s and 1s or decodes valid binary groups back into readable characters. This tool works with 8-bit byte groups for the text it accepts.",
  },
  {
    q: "How many values can 8 bits represent?",
    a: "Eight bits can represent 256 different values, from 0 through 255, because each bit has two possible states and 2⁸ = 256.",
  },
  {
    q: "Is ASCII the same as Unicode?",
    a: "No. Standard ASCII defines 128 code points and is historically a 7-bit character set. Unicode is a much larger character standard, while UTF-8 is a variable-length encoding that represents Unicode text and preserves ASCII values for the first 128 characters.",
  },
  {
    q: "Why does this page use 8-bit binary groups?",
    a: "Modern computer storage is commonly organized into 8-bit bytes. An 8-bit group is convenient for displaying byte values, although standard ASCII itself uses only 7 bits.",
  },
  {
    q: "Can I convert binary back to text?",
    a: "Yes. Choose Binary → Text and enter groups containing exactly eight 0/1 digits separated by spaces. Invalid groups are flagged instead of being silently decoded.",
  },
  {
    q: "What is the difference between binary and Morse code?",
    a: "Binary is primarily a numerical and machine representation used by digital systems. International Morse code is a human communication code that represents characters with short and long signals, usually written as dots and dashes.",
  },
];

export default function BinaryClient() {
  const [mode, setMode] = useState<Mode>("text-to-binary");
  const [text, setText] = useState("");
  const [binary, setBinary] = useState("");
  const [copied, setCopied] = useState(false);

  const decoded = useMemo(() => binaryToText(binary), [binary]);

  const output = useMemo(
    () => (mode === "text-to-binary" ? textToBinary(text) : decoded.text),
    [mode, text, decoded.text]
  );

  const inputValue = mode === "text-to-binary" ? text : binary;
  const invalidInput = mode === "binary-to-text" && decoded.invalid;

  const sourceText = mode === "text-to-binary" ? text : output;
  const binaryBits =
    mode === "text-to-binary"
      ? output.replace(/\s/g, "").length
      : binary.replace(/\s/g, "").length;

  const words = sourceText.trim()
    ? sourceText.trim().split(/\s+/).filter(Boolean).length
    : 0;

  function switchMode(nextMode: Mode) {
    if (nextMode === mode) return;

    if (nextMode === "binary-to-text") {
      setBinary(textToBinary(text));
    } else if (!decoded.invalid) {
      setText(decoded.text);
    }

    setMode(nextMode);
  }

  function handleSwap() {
    switchMode(mode === "text-to-binary" ? "binary-to-text" : "text-to-binary");
  }

  function handleReset() {
    setText("");
    setBinary("");
    setCopied(false);
  }

  async function handleCopy() {
    if (!output || invalidInput) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HOME-STYLE HERO */}
      <section className="w-full bg-gradient-to-r from-green-800 via-green-700 to-emerald-800 px-4 py-7 text-white shadow-sm sm:px-6 sm:py-8">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Binary Code Translator
          </h1>
          <p className="mx-auto mt-3 max-w-4xl text-base leading-7 text-green-50/90 sm:text-lg">
            Convert text to binary or decode valid 8-bit binary groups into readable
            text. Explore <strong>bits</strong>, <strong>bytes</strong>,
            <strong> ASCII</strong>, <strong>Unicode</strong>, and character encoding
            with a free online binary converter.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-green-50/90">
            <span>⚡ Real-Time Conversion</span>
            <span>⌘ Text ↔ Binary</span>
            <span>01 8-Bit Groups</span>
            <span>▣ ASCII & Encoding Guide</span>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* TOOL */}
        <section
          id="binary-translator"
          className="mb-12 w-full rounded-3xl border-t-4 border-green-600 bg-white p-5 shadow-sm sm:p-6 lg:p-7"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-green-700">
                Interactive Tool
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                Convert Text and Binary Instantly
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Enter text or space-separated 8-bit binary groups. Your result updates
                as you type.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleSwap}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-green-500 hover:bg-green-50 hover:text-green-700"
              >
                <ArrowDownUp className="h-4 w-4" />
                Switch Direction
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-700"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 rounded-2xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => switchMode("text-to-binary")}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                mode === "text-to-binary"
                  ? "bg-green-700 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Text → Binary
            </button>
            <button
              type="button"
              onClick={() => switchMode("binary-to-text")}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                mode === "binary-to-text"
                  ? "bg-green-700 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Binary → Text
            </button>
          </div>

          <div className="mt-5 grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <label className="font-semibold text-slate-800">
                  {mode === "text-to-binary" ? "Enter Text" : "Enter Binary Code"}
                </label>
                <span className="text-xs font-medium text-slate-500">
                  {mode === "text-to-binary" ? "8-bit byte output" : "8 bits per group"}
                </span>
              </div>

              <textarea
                value={inputValue}
                onChange={(event) =>
                  mode === "text-to-binary"
                    ? setText(event.target.value)
                    : setBinary(event.target.value)
                }
                placeholder={
                  mode === "text-to-binary"
                    ? "Type your message here..."
                    : "Example: 01001000 01100101 01101100 01101100 01101111"
                }
                className="block min-h-[210px] w-full resize-y rounded-xl border border-slate-200 bg-white p-4 font-mono text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />

              {invalidInput && (
                <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  Use only 0 and 1, with each character group containing exactly 8 bits.
                </p>
              )}
            </div>

            <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <label className="font-semibold text-slate-800">Output</label>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700">
                  ⚡ Live
                </span>
              </div>

              <div className="min-h-[210px] break-all rounded-xl border border-slate-200 bg-white p-4 font-mono text-sm leading-7 text-slate-700">
                {invalidInput
                  ? "Enter valid 8-bit binary groups to decode."
                  : output || "Your translation will appear here..."}
              </div>
            </div>
          </div>

          <div className="mt-5 grid w-full grid-cols-1 gap-4 border-t border-slate-100 pt-5 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!output || invalidInput}
              className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy Result"}
            </button>

            <div className="grid w-full grid-cols-2 gap-2 text-center text-xs sm:grid-cols-4">
              {[
                ["Characters", String(sourceText.length)],
                ["Words", String(words)],
                ["Bits", String(binaryBits)],
                ["Bytes", String(binaryBits ? Math.ceil(binaryBits / 8) : 0)],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-2.5">
                  <p className="text-slate-500">{label}</p>
                  <p className="mt-1 font-bold text-slate-900">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            What Is Binary Code?
          </h2>
          <div className="mt-4 space-y-4 text-slate-700 leading-8">
            <p>
              <strong>Binary</strong> is a base-2 number system that uses only
              <strong> 0</strong> and <strong>1</strong>. In digital electronics,
              those values can represent two distinguishable states. Computers then
              use combinations of bits to represent numbers, instructions, text,
              images, audio, and other digital data.
            </p>
            <p>
              A single binary digit is a <strong>bit</strong>. Eight bits form one
              <strong> byte</strong>, giving 2<sup>8</sup> = <strong>256 possible
              byte values</strong>. For a second communication system built around
              two signal types, compare this page with our{" "}
              <Link className="font-semibold text-green-700 underline underline-offset-4" href="/">
                Morse Code Translator
              </Link>{" "}
              and{" "}
              <Link className="font-semibold text-green-700 underline underline-offset-4" href="/what-is-morse-code">
                What Is Morse Code?
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="mb-12 grid gap-5 md:grid-cols-3">
          {[
            ["1 bit", "Two possible values: 0 or 1."],
            ["1 byte", "Exactly 8 bits, allowing 256 possible values."],
            ["ASCII", "Standard ASCII defines 128 code points, numbered 0–127."],
          ].map(([title, description]) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">{title}</h2>
              <p className="mt-3 leading-7 text-slate-700">{description}</p>
            </article>
          ))}
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            How Text Becomes Binary: A Simple Example
          </h2>
          <p className="mt-4 leading-8 text-slate-700">
            Character encoding maps a character to a numeric value. For the uppercase
            letter <strong>A</strong>, the ASCII decimal value is <strong>65</strong>.
            Written as an 8-bit binary value, 65 becomes{" "}
            <code className="rounded bg-slate-100 px-2 py-1 font-mono">01000001</code>.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-900">
                <tr>
                  <th className="border-b px-5 py-4 font-semibold">Stage</th>
                  <th className="border-b px-5 py-4 font-semibold">Value</th>
                  <th className="border-b px-5 py-4 font-semibold">Explanation</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr><td className="border-b px-5 py-4">Character</td><td className="border-b px-5 py-4 font-mono">A</td><td className="border-b px-5 py-4">Readable text symbol</td></tr>
                <tr><td className="border-b px-5 py-4">ASCII decimal</td><td className="border-b px-5 py-4 font-mono">65</td><td className="border-b px-5 py-4">Numeric code point in ASCII</td></tr>
                <tr><td className="px-5 py-4">Binary byte</td><td className="px-5 py-4 font-mono">01000001</td><td className="px-5 py-4">8-bit representation of decimal 65</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Bits, Bytes, ASCII, Unicode, and UTF-8
          </h2>
          <div className="mt-4 space-y-4 leading-8 text-slate-700">
            <p>
              These terms are related but they are not interchangeable. A <strong>bit</strong>
              is a binary digit. A <strong>byte</strong> contains 8 bits. Standard
              <strong> ASCII</strong> is a 7-bit character set with 128 code points.
              In practice, ASCII characters are often displayed or stored in 8-bit bytes.
            </p>
            <p>
              <strong>Unicode</strong> is a broader character standard covering writing
              systems and symbols from around the world. <strong>UTF-8</strong> is a
              variable-length Unicode encoding; its first 128 values are compatible with
              ASCII. This distinction matters when converting text because not every
              Unicode character can be represented as one 8-bit value.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Binary Code Examples
          </h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-900">
                <tr>
                  <th className="border-b px-5 py-4">Character</th>
                  <th className="border-b px-5 py-4">Decimal</th>
                  <th className="border-b px-5 py-4">8-Bit Binary</th>
                </tr>
              </thead>
              <tbody className="font-mono text-slate-700">
                {[
                  ["A", "65", "01000001"],
                  ["B", "66", "01000010"],
                  ["C", "67", "01000011"],
                  ["0", "48", "00110000"],
                  ["1", "49", "00110001"],
                  ["Space", "32", "00100000"],
                ].map(([character, decimal, value]) => (
                  <tr key={character}>
                    <td className="border-b px-5 py-4">{character}</td>
                    <td className="border-b px-5 py-4">{decimal}</td>
                    <td className="border-b px-5 py-4">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 leading-8 text-slate-700">
            For alphabet-based signal examples, see the{" "}
            <Link className="font-semibold text-green-700 underline underline-offset-4" href="/morse-code-alphabet">
              complete Morse Code Alphabet
            </Link>{" "}
            and compare digits with{" "}
            <Link className="font-semibold text-green-700 underline underline-offset-4" href="/morse-code-numbers">
              Morse Code Numbers
            </Link>.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Binary Code vs Morse Code
          </h2>
          <p className="mt-4 leading-8 text-slate-700">
            Binary and Morse code both use distinguishable symbols, but they solve
            different problems. Binary is a positional number system used throughout
            digital computing. International Morse code is a character encoding designed
            for human transmission using short and long signals.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-900">
                <tr>
                  <th className="border-b px-5 py-4">Feature</th>
                  <th className="border-b px-5 py-4">Binary</th>
                  <th className="border-b px-5 py-4">Morse Code</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {[
                  ["Primary role", "Digital representation and computation", "Human communication and signaling"],
                  ["Symbols", "0 and 1", "Dots and dashes"],
                  ["Character length", "Depends on encoding", "Varies by character"],
                  ["Typical medium", "Electronic and digital systems", "Sound, light, radio and telegraphy"],
                  ["Learning resource", "This binary converter", "Interactive Morse tools and practice"],
                ].map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={index} className="border-b px-5 py-4">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 leading-8 text-slate-700">
            Continue with the{" "}
            <Link className="font-semibold text-green-700 underline underline-offset-4" href="/morse-code-decoder">
              Morse Code Decoder
            </Link>
            , study{" "}
            <Link className="font-semibold text-green-700 underline underline-offset-4" href="/morse-code-timing">
              Morse Code Timing
            </Link>
            , or use the{" "}
            <Link className="font-semibold text-green-700 underline underline-offset-4" href="/morse-code-sounds">
              Morse Code Sounds guide
            </Link>{" "}
            to understand how dots and dashes become audible signals.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Why Binary Matters in Modern Technology
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {[
              ["Computer processors", "Processors execute instructions using digital logic and binary states."],
              ["Data storage", "Files are encoded as digital data and stored in memory or persistent storage."],
              ["Networking", "Digital information is encoded and transmitted through communication systems."],
              ["Programming", "High-level code is eventually represented in forms executable by computing hardware."],
              ["Cybersecurity", "Binary files and memory data are important in reverse engineering and digital forensics."],
              ["Artificial intelligence", "AI software runs on digital hardware that performs machine-level operations."],
            ].map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-3 leading-7 text-slate-700">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Common Binary Conversion Mistakes
          </h2>
          <div className="mt-5 space-y-5 text-slate-700">
            <article><h3 className="text-xl font-bold text-slate-900">Treating every binary value as ASCII</h3><p className="mt-2 leading-8">Binary has no single meaning without context. The same bits can represent a number, character, color value, instruction, or another data type depending on the format.</p></article>
            <article><h3 className="text-xl font-bold text-slate-900">Confusing 7-bit ASCII with an 8-bit byte</h3><p className="mt-2 leading-8">Standard ASCII contains 128 values and fits in 7 bits. An 8-bit byte can represent 256 values, so the terms should not be treated as identical.</p></article>
            <article><h3 className="text-xl font-bold text-slate-900">Ignoring character encoding</h3><p className="mt-2 leading-8">Unicode text may require multiple UTF-8 bytes. This tool intentionally focuses on single-byte 8-bit conversion rather than pretending every character is one ASCII byte.</p></article>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-xl border border-slate-200 bg-white p-5">
                <summary className="cursor-pointer font-semibold text-slate-900">{faq.q}</summary>
                <p className="mt-4 leading-7 text-slate-700">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Explore Related Tools and Guides
          </h2>
          <p className="mt-4 leading-8 text-slate-700">
            These internal links connect binary, character encoding, Morse code,
            decoding, timing, audio, and practice topics so visitors can continue
            through the site without reaching a dead end.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {internalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-green-500 hover:shadow-sm"
              >
                <span className="block font-bold text-slate-900">{item.title}</span>
                <span className="mt-2 block text-sm leading-6 text-slate-600">{item.text}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Final Thoughts
          </h2>
          <p className="mt-4 leading-8 text-slate-700">
            Binary is fundamental to digital representation, but understanding it is
            easier when the terminology is precise: bits and bytes describe storage
            units, ASCII is a 7-bit character standard, Unicode defines a much broader
            character repertoire, and UTF-8 is a Unicode encoding. Use the converter
            above for practical 8-bit examples, then continue with our{" "}
            <Link className="font-semibold text-green-700 underline underline-offset-4" href="/learn-morse-code">
              Learn Morse Code guide
            </Link>{" "}
            or test recognition skills in the{" "}
            <Link className="font-semibold text-green-700 underline underline-offset-4" href="/morse-code-quiz">
              Morse Code Quiz
            </Link>.
          </p>
        </section>
      </div>

      <section className="w-full bg-gradient-to-r from-green-800 via-green-700 to-emerald-800 px-4 py-8 text-center text-white sm:px-6 sm:py-9">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Continue Learning Digital Communication
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-green-100">
            Explore Morse code, character encoding, sound, timing, decoding, and
            interactive practice tools.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/learn-morse-code" className="rounded-xl bg-white px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50">
              Learn Morse Code
            </Link>
            <Link href="/morse-code-quiz" className="rounded-xl border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-green-700">
              Take Quiz
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}