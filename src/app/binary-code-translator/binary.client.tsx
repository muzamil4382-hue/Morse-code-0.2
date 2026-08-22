"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Copy, Check, ArrowDownUp } from "lucide-react";

function textToBinary(text: string): string {
  return text
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
}

function binaryToText(binary: string): string {
  return binary
    .trim()
    .split(/\s+/)
    .filter((b) => b.length === 8 && /^[01]+$/.test(b))
    .map((b) => String.fromCharCode(parseInt(b, 2)))
    .join("");
}

export default function BinaryClient() {
  const [mode, setMode] = useState<"text-to-binary" | "binary-to-text">(
    "text-to-binary"
  );

  const [text, setText] = useState("");
  const [binary, setBinary] = useState("");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    return mode === "text-to-binary"
      ? textToBinary(text)
      : binaryToText(binary);
  }, [mode, text, binary]);

  function handleSwap() {
    if (mode === "text-to-binary") {
      setBinary(textToBinary(text));
      setMode("binary-to-text");
    } else {
      setText(binaryToText(binary));
      setMode("text-to-binary");
    }
  }

  async function handleCopy() {
    if (!output) return;

    await navigator.clipboard.writeText(output);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HOME-STYLE HERO — FULL WIDTH */}
      <section className="w-full bg-gradient-to-r from-green-800 via-green-700 to-emerald-800 px-4 py-7 text-white shadow-sm sm:px-6 sm:py-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Binary Code Translator
            </h1>

            <p className="mx-auto mt-3 max-w-4xl text-base leading-7 text-green-50/90 sm:text-lg">
              Convert text to binary or decode binary to readable text instantly.
              Explore <strong>8-bit binary</strong>, <strong>ASCII character encoding</strong>,
              bits, bytes, and practical binary examples with a free online converter.
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-green-50/90">
              <span>⚡ Real-Time Conversion</span>
              <span>⌘ Text ↔ Binary</span>
              <span>01 8-Bit Examples</span>
              <span>▣ ASCII Reference</span>
            </div>
          </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* BINARY TRANSLATOR — HOME-STYLE TOOL */}
        <section
          id="translator"
          className="mb-10 w-full rounded-3xl border-t-4 border-green-600 bg-white p-5 shadow-sm sm:p-6 lg:p-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
                Interactive Tool
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                Convert Text and Binary Instantly
              </h2>
            </div>

            <button
              onClick={handleSwap}
              aria-label="Swap conversion direction"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-green-500 hover:bg-green-50 hover:text-green-700"
            >
              <ArrowDownUp className="h-4 w-4" />
              Switch Direction
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 rounded-2xl bg-slate-100 p-1">
            <button
              onClick={() => setMode("text-to-binary")}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                mode === "text-to-binary"
                  ? "bg-green-700 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Text → Binary
            </button>

            <button
              onClick={() => setMode("binary-to-text")}
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
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <label className="font-semibold text-slate-800">
                  {mode === "text-to-binary" ? "Enter Text" : "Enter Binary Code"}
                </label>
                <span className="text-xs font-medium text-slate-500">
                  {mode === "text-to-binary" ? "ASCII-compatible text" : "Use 8-bit groups"}
                </span>
              </div>

              <textarea
                value={mode === "text-to-binary" ? text : binary}
                onChange={(e) =>
                  mode === "text-to-binary"
                    ? setText(e.target.value)
                    : setBinary(e.target.value)
                }
                placeholder={
                  mode === "text-to-binary"
                    ? "Type your message here..."
                    : "Example: 01001000 01100101 01101100 01101100 01101111"
                }
                className="block min-h-[210px] w-full resize-y rounded-xl border border-slate-200 bg-white p-4 font-mono text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <label className="font-semibold text-slate-800">Output</label>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700">
                  ⚡ Live
                </span>
              </div>

              <div className="min-h-[210px] break-all rounded-xl border border-slate-200 bg-white p-4 font-mono text-sm leading-7 text-slate-700">
                {output || "Your translation will appear here..."}
              </div>
            </div>
          </div>

          <div className="mt-5 grid w-full grid-cols-1 gap-4 border-t border-slate-100 pt-5 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center">
            <button
              onClick={handleCopy}
              disabled={!output}
              className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy Result"}
            </button>

            <div className="grid w-full grid-cols-2 gap-2 text-center text-xs sm:grid-cols-4">
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-2.5">
                <p className="text-slate-500">Characters</p>
                <p className="mt-1 font-bold text-slate-900">{mode === "text-to-binary" ? text.length : output.length}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-2.5">
                <p className="text-slate-500">Words</p>
                <p className="mt-1 font-bold text-slate-900">
                  {(mode === "text-to-binary" ? text : output).trim().split(/\s+/).filter(Boolean).length}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-2.5">
                <p className="text-slate-500">Bits</p>
                <p className="mt-1 font-bold text-slate-900">{output.replace(/\s/g, "").length}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-2.5">
                <p className="text-slate-500">Bytes</p>
                <p className="mt-1 font-bold text-slate-900">{Math.ceil(output.replace(/\s/g, "").length / 8)}</p>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================
            WHAT IS BINARY CODE
        ======================================================== */}

        <section className="mb-10">

          <h2 className="text-3xl font-bold text-slate-900">
            What Is Binary Code?
          </h2>

          <div className="mt-6 space-y-6 text-slate-700 leading-8">

            <p>
              <strong>Binary code</strong> is the language that computers use
              to store, process, and communicate information.
              Unlike the decimal number system that humans use every day,
              binary uses only two digits:
              <strong> 0 </strong>
              and
              <strong> 1</strong>.
            </p>

            <p>
              These two values represent electrical states inside digital
              hardware. A value of
              <strong> 1 </strong>
              usually represents an ON signal, while
              <strong> 0 </strong>
              represents an OFF signal.
              Every file, image, website, application, song,
              and video is ultimately stored as long sequences
              of binary digits.
            </p>

            <p>
              This Binary Code Translator converts ordinary text into
              <strong> ASCII binary </strong>
              and converts binary back into readable text.
              If you also want to learn human communication systems,
              visit our{" "}
              <Link
                href="/morse-code-translator"
                className="text-green-600 hover:underline"
              >
                Morse Code Translator
              </Link>{" "}
              to compare binary encoding with Morse code.
            </p>

          </div>

        </section>

        {/* =======================================================
            BITS & BYTES
        ======================================================== */}

        <section className="mb-10">

          <h2 className="text-3xl font-bold text-slate-900">
            Understanding Bits and Bytes
          </h2>

          <div className="mt-6 space-y-6 text-slate-700 leading-8">

            <p>
              A single binary digit is called a
              <strong> bit </strong>
              (short for Binary Digit).
              Every bit can contain only one of two possible values:
              <strong> 0 </strong>
              or
              <strong> 1</strong>.
            </p>

            <p>
              Eight bits together form one
              <strong> byte</strong>.
              A byte is one of the most important building blocks in modern
              computing because one byte usually stores one ASCII character.
            </p>

          </div>

          <div className="mt-8 overflow-x-auto">

            <table className="w-full border-collapse rounded-2xl border border-slate-200">

              <thead>

                <tr className="bg-slate-50">

                  <th className="border px-4 py-3 text-left">
                    Unit
                  </th>

                  <th className="border px-4 py-3 text-left">
                    Size
                  </th>

                  <th className="border px-4 py-3 text-left">
                    Description
                  </th>

                </tr>

              </thead>

              <tbody>

                <tr>

                  <td className="border px-4 py-3">
                    Bit
                  </td>

                  <td className="border px-4 py-3">
                    0 or 1
                  </td>

                  <td className="border px-4 py-3">
                    Smallest unit of digital information.
                  </td>

                </tr>

                <tr>

                  <td className="border px-4 py-3">
                    Byte
                  </td>

                  <td className="border px-4 py-3">
                    8 Bits
                  </td>

                  <td className="border px-4 py-3">
                    Usually stores one ASCII character.
                  </td>

                </tr>

                <tr>

                  <td className="border px-4 py-3">
                    Kilobyte
                  </td>

                  <td className="border px-4 py-3">
                    1024 Bytes
                  </td>

                  <td className="border px-4 py-3">
                    Small text files.
                  </td>

                </tr>

                <tr>

                  <td className="border px-4 py-3">
                    Megabyte
                  </td>

                  <td className="border px-4 py-3">
                    1024 KB
                  </td>

                  <td className="border px-4 py-3">
                    Images, documents and apps.
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </section>

        {/* =======================================================
            BASE 2
        ======================================================== */}

        <section className="mb-10">

          <h2 className="text-3xl font-bold text-slate-900">
            The Base-2 Number System
          </h2>

          <div className="mt-6 space-y-6 text-slate-700 leading-8">

            <p>
              Binary is known as a
              <strong> Base-2 Number System </strong>
              because it contains only two digits:
              0 and 1.
              Decimal uses ten digits (0–9),
              while hexadecimal uses sixteen symbols.
            </p>

            <p>
              Every additional binary digit doubles the number of possible
              combinations. This simple idea makes binary extremely reliable
              for electronic devices because hardware only needs to detect
              two stable electrical states.
            </p>

          </div>

        </section>

        {/* =======================================================
            ASCII
        ======================================================== */}

        <section className="mb-10">

          <h2 className="text-3xl font-bold text-slate-900">
            ASCII Character Encoding
          </h2>

          <div className="mt-6 space-y-6 text-slate-700 leading-8">

            <p>
              ASCII stands for
              <strong>
                {" "}American Standard Code for Information Interchange
              </strong>.
              It assigns a unique number to letters,
              numbers,
              punctuation marks,
              and symbols.
            </p>

            <p>
              For example,
              the letter
              <strong> A </strong>
              has the decimal value
              <strong> 65</strong>,
              which becomes
              <code className="mx-2 rounded bg-slate-100 px-2 py-1">
                01000001
              </code>
              in binary.
            </p>

            <p>
              If you want to learn how letters are represented using another
              encoding system, see our{" "}
              <Link
                href="/morse-code-alphabet"
                className="text-green-600 hover:underline"
              >
                Morse Code Alphabet
              </Link>{" "}
              guide.
            </p>

          </div>

        </section>

        {/* =======================================================
            UNICODE
        ======================================================== */}

        <section className="mb-10">

          <h2 className="text-3xl font-bold text-slate-900">
            ASCII vs Unicode
          </h2>

          <div className="mt-6 space-y-6 text-slate-700 leading-8">

            <p>
              ASCII supports English characters,
              while
              <strong> Unicode </strong>
              supports thousands of characters from languages all around the
              world including Arabic,
              Urdu,
              Chinese,
              Japanese,
              Korean,
              emojis,
              and many mathematical symbols.
            </p>

            <p>
              Modern websites,
              applications,
              operating systems,
              and programming languages primarily use UTF-8,
              which is based on Unicode while remaining compatible with ASCII.
            </p>

          </div>

        </section>
                {/* =======================================================
            HISTORY OF BINARY CODE
        ======================================================== */}

        <section className="mb-10">

          <h2 className="text-3xl font-bold text-slate-900">
            History of Binary Code
          </h2>

          <div className="mt-6 space-y-6 text-slate-700 leading-8">

            <p>
              Although modern computers popularized binary code,
              the mathematical ideas behind binary are much older.
              Several influential mathematicians and engineers helped shape
              the binary systems used in today's digital world.
            </p>

            <h3 className="text-2xl font-semibold text-slate-900">
              Gottfried Wilhelm Leibniz
            </h3>

            <p>
              In the late 17th century,
              German mathematician
              <strong> Gottfried Wilhelm Leibniz </strong>
              formally described the binary number system using only
              the digits 0 and 1.
              His work demonstrated that every number could be represented
              using two symbols, making binary one of the foundations of
              modern computer science.
            </p>

            <h3 className="text-2xl font-semibold text-slate-900">
              George Boole
            </h3>

            <p>
              During the nineteenth century,
              <strong> George Boole </strong>
              developed Boolean Algebra.
              Boolean logic uses TRUE/FALSE and ON/OFF relationships,
              which closely match binary values of 1 and 0.
              Today Boolean logic is fundamental to CPUs,
              programming,
              digital electronics,
              and search algorithms.
            </p>

            <h3 className="text-2xl font-semibold text-slate-900">
              Claude Shannon
            </h3>

            <p>
              In the twentieth century,
              <strong> Claude Shannon </strong>
              demonstrated that Boolean Algebra could be implemented
              using electrical switching circuits.
              His work became one of the foundations of modern digital
              computers and communication systems.
            </p>

            <h3 className="text-2xl font-semibold text-slate-900">
              ASCII and Modern Computing
            </h3>

            <p>
              During the 1960s,
              ASCII standardized how computers represent letters,
              numbers,
              and symbols.
              Today Unicode extends ASCII and enables software to represent
              thousands of languages while remaining compatible with
              standard ASCII characters.
            </p>

          </div>

        </section>

        {/* =======================================================
            HOW BINARY WORKS
        ======================================================== */}

        <section className="mb-10">

          <h2 className="text-3xl font-bold text-slate-900">
            How Binary Code Works
          </h2>

          <div className="mt-6 space-y-6 text-slate-700 leading-8">

            <p>
              Every character you type is first converted into a numerical
              value using a character encoding standard such as ASCII.
              That decimal value is then converted into binary so the CPU
              can process and store it.
            </p>

            <div className="overflow-x-auto">

              <table className="w-full border-collapse rounded-2xl border border-slate-200">

                <thead>

                  <tr className="bg-slate-50">

                    <th className="border px-4 py-3 text-left">
                      Step
                    </th>

                    <th className="border px-4 py-3 text-left">
                      Example
                    </th>

                  </tr>

                </thead>

                <tbody>

                  <tr>

                    <td className="border px-4 py-3">
                      Character
                    </td>

                    <td className="border px-4 py-3">
                      A
                    </td>

                  </tr>

                  <tr>

                    <td className="border px-4 py-3">
                      ASCII
                    </td>

                    <td className="border px-4 py-3">
                      65
                    </td>

                  </tr>

                  <tr>

                    <td className="border px-4 py-3">
                      Binary
                    </td>

                    <td className="border px-4 py-3 font-mono">
                      01000001
                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </section>

        {/* =======================================================
            BINARY EXAMPLES
        ======================================================== */}

        <section className="mb-10">

          <h2 className="text-3xl font-bold text-slate-900">
            Binary Code Examples
          </h2>

          <p className="mt-4 text-slate-700 leading-8">
            The following examples demonstrate how common characters
            and words are represented in ASCII binary.
          </p>

          <div className="mt-8 overflow-x-auto">

            <table className="w-full border-collapse rounded-2xl border border-slate-200">

              <thead>

                <tr className="bg-slate-50">

                  <th className="border px-4 py-3 text-left">
                    Character
                  </th>

                  <th className="border px-4 py-3 text-left">
                    ASCII
                  </th>

                  <th className="border px-4 py-3 text-left">
                    Binary
                  </th>

                </tr>

              </thead>

              <tbody>

                <tr>
                  <td className="border px-4 py-3">A</td>
                  <td className="border px-4 py-3">65</td>
                  <td className="border px-4 py-3 font-mono">01000001</td>
                </tr>

                <tr>
                  <td className="border px-4 py-3">B</td>
                  <td className="border px-4 py-3">66</td>
                  <td className="border px-4 py-3 font-mono">01000010</td>
                </tr>

                <tr>
                  <td className="border px-4 py-3">C</td>
                  <td className="border px-4 py-3">67</td>
                  <td className="border px-4 py-3 font-mono">01000011</td>
                </tr>

                <tr>
                  <td className="border px-4 py-3">1</td>
                  <td className="border px-4 py-3">49</td>
                  <td className="border px-4 py-3 font-mono">00110001</td>
                </tr>

                <tr>
                  <td className="border px-4 py-3">2</td>
                  <td className="border px-4 py-3">50</td>
                  <td className="border px-4 py-3 font-mono">00110010</td>
                </tr>

                <tr>
                  <td className="border px-4 py-3">3</td>
                  <td className="border px-4 py-3">51</td>
                  <td className="border px-4 py-3 font-mono">00110011</td>
                </tr>

              </tbody>

            </table>

          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">

            <h3 className="text-xl font-semibold text-slate-900">
              Word Examples
            </h3>

            <div className="mt-6 space-y-5 font-mono text-sm">

              <div>
                <strong>Hello</strong>

                <p className="mt-2 break-all">
                  01001000 01100101 01101100 01101100 01101111
                </p>
              </div>

              <div>
                <strong>OpenAI</strong>

                <p className="mt-2 break-all">
                  01001111 01110000 01100101 01101110
                  01000001 01001001
                </p>
              </div>

              <div>
                <strong>ChatGPT</strong>

                <p className="mt-2 break-all">
                  01000011 01101000 01100001 01110100
                  01000111 01010000 01010100
                </p>
              </div>

              <div>
                <strong>123</strong>

                <p className="mt-2 break-all">
                  00110001 00110010 00110011
                </p>
              </div>

            </div>

          </div>

        </section>
                {/* =======================================================
            BINARY VS MORSE CODE
        ======================================================== */}

        <section className="mb-10">

          <h2 className="text-3xl font-bold text-slate-900">
            Binary Code vs Morse Code
          </h2>

          <p className="mt-4 text-slate-700 leading-8">
            Binary code and Morse code both represent information using two
            distinct states, but they were designed for completely different
            purposes. Binary is optimized for computers and digital electronics,
            while Morse code was created for efficient human communication over
            telegraph systems.
          </p>

          <div className="mt-8 overflow-x-auto">

            <table className="w-full border-collapse rounded-2xl border border-slate-200">

              <thead>

                <tr className="bg-slate-50">

                  <th className="border px-4 py-3 text-left">Feature</th>
                  <th className="border px-4 py-3 text-left">Binary Code</th>
                  <th className="border px-4 py-3 text-left">Morse Code</th>

                </tr>

              </thead>

              <tbody>

                <tr>
                  <td className="border px-4 py-3 font-semibold">Purpose</td>
                  <td className="border px-4 py-3">Computer processing</td>
                  <td className="border px-4 py-3">Human communication</td>
                </tr>

                <tr>
                  <td className="border px-4 py-3 font-semibold">Encoding</td>
                  <td className="border px-4 py-3">0 and 1</td>
                  <td className="border px-4 py-3">Dots and Dashes</td>
                </tr>

                <tr>
                  <td className="border px-4 py-3 font-semibold">Length</td>
                  <td className="border px-4 py-3">Usually fixed (8-bit ASCII)</td>
                  <td className="border px-4 py-3">Variable length</td>
                </tr>

                <tr>
                  <td className="border px-4 py-3 font-semibold">Speed</td>
                  <td className="border px-4 py-3">Electronic speed</td>
                  <td className="border px-4 py-3">Human transmission speed</td>
                </tr>

                <tr>
                  <td className="border px-4 py-3 font-semibold">Human Use</td>
                  <td className="border px-4 py-3">Very difficult</td>
                  <td className="border px-4 py-3">Easy after practice</td>
                </tr>

                <tr>
                  <td className="border px-4 py-3 font-semibold">Computer Use</td>
                  <td className="border px-4 py-3">Primary language</td>
                  <td className="border px-4 py-3">Rare</td>
                </tr>

                <tr>
                  <td className="border px-4 py-3 font-semibold">Inventor</td>
                  <td className="border px-4 py-3">Based on work by Leibniz, Boole and Shannon</td>
                  <td className="border px-4 py-3">Samuel Morse & Alfred Vail</td>
                </tr>

                <tr>
                  <td className="border px-4 py-3 font-semibold">Applications</td>
                  <td className="border px-4 py-3">Computers, AI, Networks</td>
                  <td className="border px-4 py-3">Radio, Emergency communication</td>
                </tr>

                <tr>
                  <td className="border px-4 py-3 font-semibold">Advantages</td>
                  <td className="border px-4 py-3">Reliable and machine-readable</td>
                  <td className="border px-4 py-3">Simple and human-readable</td>
                </tr>

                <tr>
                  <td className="border px-4 py-3 font-semibold">Disadvantages</td>
                  <td className="border px-4 py-3">Not practical for manual reading</td>
                  <td className="border px-4 py-3">Not suitable for digital computing</td>
                </tr>

              </tbody>

            </table>

          </div>

          <p className="mt-6 text-slate-700 leading-8">
            Interested in learning Morse? Explore our{" "}
            <Link
              href="/learn-morse-code"
              className="text-green-600 hover:underline"
            >
              Learn Morse Code
            </Link>{" "}
            guide or practice using the{" "}
            <Link
              href="/morse-code-quiz"
              className="text-green-600 hover:underline"
            >
              Morse Code Quiz
            </Link>.
          </p>

        </section>

        {/* =======================================================
            BINARY IN REAL LIFE
        ======================================================== */}

        <section className="mb-10">

          <h2 className="text-3xl font-bold text-slate-900">
            Binary Code in Real Life
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">

            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-semibold">💻 CPUs</h3>
              <p className="mt-3 text-slate-700 leading-7">
                Process billions of binary instructions every second using
                digital logic circuits.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-semibold">🧠 RAM</h3>
              <p className="mt-3 text-slate-700 leading-7">
                Temporarily stores binary data while applications are running.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-semibold">💾 SSD Storage</h3>
              <p className="mt-3 text-slate-700 leading-7">
                Files, photos, videos and software are stored internally as
                binary values.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-semibold">🌐 Internet</h3>
              <p className="mt-3 text-slate-700 leading-7">
                Every webpage, email and download ultimately travels as binary
                data across computer networks.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-semibold">📡 Wi-Fi & Networking</h3>
              <p className="mt-3 text-slate-700 leading-7">
                Routers and networking equipment continuously transmit binary
                packets between connected devices.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-semibold">🤖 Artificial Intelligence</h3>
              <p className="mt-3 text-slate-700 leading-7">
                AI models, machine learning systems and neural networks all run
                on digital hardware that processes binary instructions.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-semibold">📱 Smartphones</h3>
              <p className="mt-3 text-slate-700 leading-7">
                Every message, photo and application stored on your phone is
                represented using binary data.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-semibold">⚙️ Robotics</h3>
              <p className="mt-3 text-slate-700 leading-7">
                Robots use binary instructions to interpret sensor data and
                control motors with precision.
              </p>
            </div>

          </div>

        </section>
                {/* =======================================================
            INTERESTING BINARY FACTS
        ======================================================== */}

        <section className="mb-10">

          <h2 className="text-3xl font-bold text-slate-900">
            10 Interesting Facts About Binary Code
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            {[
              "Every computer processes information using binary.",
              "A single binary digit is called a bit.",
              "Eight bits together make one byte.",
              "ASCII characters are commonly stored using 8-bit values.",
              "Unicode extends ASCII to support thousands of languages.",
              "Binary is the foundation of machine language.",
              "Modern CPUs perform billions of binary operations every second.",
              "Internet data is ultimately transmitted as binary signals.",
              "Digital photos, videos and music are stored as binary.",
              "Artificial Intelligence ultimately runs on binary hardware."
            ].map((fact, index) => (

              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <h3 className="font-semibold text-green-600">
                  Fact {index + 1}
                </h3>

                <p className="mt-3 text-slate-700 leading-7">
                  {fact}
                </p>

              </div>

            ))}

          </div>

        </section>

        {/* =======================================================
            COMMON MISTAKES
        ======================================================== */}

        <section className="mb-10">

          <h2 className="text-3xl font-bold text-slate-900">
            Common Mistakes Beginners Make
          </h2>

          <div className="mt-8 space-y-6 text-slate-700 leading-8">

            <div>

              <h3 className="text-xl font-semibold text-slate-900">
                Confusing Binary with Decimal
              </h3>

              <p>
                Binary uses only two digits (0 and 1), while decimal uses ten
                digits (0–9). Beginners often read binary numbers as decimal
                numbers, leading to incorrect conversions.
              </p>

            </div>

            <div>

              <h3 className="text-xl font-semibold text-slate-900">
                Forgetting 8-bit Groups
              </h3>

              <p>
                ASCII characters are commonly represented using groups of
                eight bits. Missing or extra digits can produce invalid
                results.
              </p>

            </div>

            <div>

              <h3 className="text-xl font-semibold text-slate-900">
                Mixing ASCII and Unicode
              </h3>

              <p>
                Standard ASCII supports English characters only, whereas
                Unicode supports thousands of international characters.
              </p>

            </div>

            <div>

              <h3 className="text-xl font-semibold text-slate-900">
                Ignoring Character Encoding
              </h3>

              <p>
                Binary values only make sense when interpreted using the
                correct encoding standard such as ASCII or UTF-8.
              </p>

            </div>

          </div>

        </section>

        {/* =======================================================
            COMMON APPLICATIONS
        ======================================================== */}

        <section className="mb-10">

          <h2 className="text-3xl font-bold text-slate-900">
            Common Applications of Binary Code
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-semibold">
                Software Development
              </h3>

              <p className="mt-3 text-slate-700 leading-7">
                Programming languages are eventually compiled or interpreted
                into machine instructions represented as binary.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-semibold">
                Cybersecurity
              </h3>

              <p className="mt-3 text-slate-700 leading-7">
                Security professionals analyze binary files, executables,
                malware samples and memory dumps.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-semibold">
                Embedded Systems
              </h3>

              <p className="mt-3 text-slate-700 leading-7">
                Smart appliances, industrial controllers and automotive
                electronics operate using binary instructions.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-semibold">
                Internet of Things (IoT)
              </h3>

              <p className="mt-3 text-slate-700 leading-7">
                Connected sensors continuously exchange binary information
                across networks.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-semibold">
                Cloud Computing
              </h3>

              <p className="mt-3 text-slate-700 leading-7">
                Cloud servers process enormous volumes of binary data every
                second for websites and applications.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-semibold">
                Artificial Intelligence
              </h3>

              <p className="mt-3 text-slate-700 leading-7">
                AI models rely on CPUs, GPUs and specialized hardware that
                execute binary machine instructions.
              </p>
            </div>

          </div>

        </section>

        {/* =======================================================
            LEARNING TIPS
        ======================================================== */}

        <section className="mb-10">

          <h2 className="text-3xl font-bold text-slate-900">
            Tips for Learning Binary Faster
          </h2>

          <ul className="mt-8 list-disc space-y-4 pl-6 text-slate-700 leading-8">

            <li>Learn powers of two from 1 to 128.</li>

            <li>Practice converting small decimal numbers into binary.</li>

            <li>Memorize common ASCII values like A, B, C and space.</li>

            <li>Use this Binary Code Translator to verify your answers.</li>

            <li>
              Compare binary with our{" "}
              <Link
                href="/what-is-morse-code"
                className="text-green-600 hover:underline"
              >
                What Is Morse Code
              </Link>{" "}
              guide to better understand different encoding systems.
            </li>

            <li>
              Practice regularly using the{" "}
              <Link
                href="/morse-code-translator"
                className="text-green-600 hover:underline"
              >
                Morse Code Translator
              </Link>{" "}
              and related educational resources.
            </li>

          </ul>

        </section>
                {/* =======================================================
            FREQUENTLY ASKED QUESTIONS
        ======================================================== */}

        <section className="mb-10">

          <h2 className="text-3xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>

          <div className="mt-8 space-y-4">

            {[
              {
                q: "What is binary code?",
                a: "Binary code is a base-2 numbering system that uses only 0 and 1 to represent digital information."
              },
              {
                q: "How does this Binary Code Translator work?",
                a: "It converts text into ASCII binary values and converts valid binary values back into readable text."
              },
              {
                q: "Is this Binary Code Translator free?",
                a: "Yes. You can convert unlimited text and binary without registration."
              },
              {
                q: "What is ASCII?",
                a: "ASCII is a standard character encoding system that maps characters to numerical values."
              },
              {
                q: "Does this support Unicode?",
                a: "The current translator focuses on standard ASCII characters."
              },
              {
                q: "Why does binary use only 0 and 1?",
                a: "Electronic circuits naturally represent two stable states, making binary reliable for computers."
              },
              {
                q: "Can I convert numbers into binary?",
                a: "Yes. Numbers, letters, punctuation and spaces all have ASCII binary values."
              },
              {
                q: "Is binary still used today?",
                a: "Yes. Every modern computer, smartphone and digital device processes binary data."
              },
              {
                q: "What is the difference between binary and Morse code?",
                a: "Binary is designed for computers while Morse code is designed for human communication."
              },
              {
                q: "Where can I learn more?",
                a: "Explore our Morse Code guides, alphabet charts and blog articles."
              }
            ].map((faq, index) => (

              <details
                key={index}
                className="rounded-xl border border-slate-200 p-5 group"
              >
                <summary className="cursor-pointer font-semibold text-slate-900">
                  {faq.q}
                </summary>

                <p className="mt-4 leading-7 text-slate-700">
                  {faq.a}
                </p>

              </details>

            ))}

          </div>

        </section>

        {/* =======================================================
            IMPROVED ASCII TABLE
        ======================================================== */}

        <section className="mb-16 overflow-x-auto">

          <h2 className="text-3xl font-bold text-slate-900">
            ASCII Reference Table
          </h2>

          <table className="mt-8 w-full border-collapse rounded-2xl border border-slate-200">

            <thead>

              <tr className="bg-slate-50">

                <th className="border px-4 py-3 text-left">Character</th>
                <th className="border px-4 py-3 text-left">ASCII</th>
                <th className="border px-4 py-3 text-left">Binary</th>

              </tr>

            </thead>

            <tbody>

              {[
                ["A",65,"01000001"],
                ["B",66,"01000010"],
                ["C",67,"01000011"],
                ["D",68,"01000100"],
                ["E",69,"01000101"],
                ["F",70,"01000110"],
                ["0",48,"00110000"],
                ["1",49,"00110001"],
                ["2",50,"00110010"],
                ["3",51,"00110011"],
                ["Space",32,"00100000"],
                [".",46,"00101110"]
              ].map((row)=>(

                <tr key={String(row[0])}>

                  <td className="border px-4 py-3">{row[0]}</td>

                  <td className="border px-4 py-3">{row[1]}</td>

                  <td className="border px-4 py-3 font-mono">
                    {row[2]}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </section>

        {/* =======================================================
            EXPLORE MORE
        ======================================================== */}

        <section className="mb-10">

          <h2 className="text-3xl font-bold text-slate-900">
            Explore More
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {[
              ["/morse-code-translator","Morse Code Translator"],
              ["/morse-code-decoder","Morse Code Decoder"],
              ["/morse-code-alphabet","Morse Code Alphabet"],
                            ["/morse-code-numbers","Morse Code Numbers"],
              ["/learn-morse-code","Learn Morse Code"],
              ["/morse-code-quiz","Morse Code Quiz"],
              ["/morse-code-timing","Morse Timing"],
              ["/what-is-morse-code","What is Morse Code"],
              ["/blog","Blog"]
            ].map(([href,title])=>(

              <Link
                key={href}
                href={href}
                className="rounded-xl border border-slate-200 p-5 transition hover:border-green-500 hover:shadow-sm"
              >
                <span className="font-semibold text-slate-900">
                  {title}
                </span>
              </Link>

            ))}

          </div>

        </section>

        {/* =======================================================
            CONCLUSION
        ======================================================== */}

        <section className="mb-8">

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Final Thoughts
          </h2>

          <p className="mt-6 leading-8 text-slate-700">
            Binary code is the foundation of every modern computing system.
            Understanding bits, bytes, ASCII, Unicode and binary encoding
            helps explain how computers process information. Whether you're
            studying computer science, learning programming, preparing for
            cybersecurity, or simply curious about digital technology, this
            Binary Code Translator provides an easy way to convert text,
            explore binary values and understand how digital systems work.
          </p>

        </section>
        <section className="relative left-1/2 mb-0 w-screen -translate-x-1/2 bg-gradient-to-r from-green-800 via-green-700 to-emerald-800 px-4 py-8 text-center text-white sm:px-6 sm:py-9">
          <div className="mx-auto max-w-7xl">

  <h2 className="text-2xl font-bold sm:text-3xl">
    Continue Learning Digital Communication
  </h2>

  <p className="mx-auto mt-3 max-w-2xl text-green-100">
    Explore Morse Code, learn character encoding, practice with interactive
    quizzes, and improve your understanding of digital communication systems.
  </p>

  <div className="mt-6 flex flex-wrap justify-center gap-4">

    <Link
      href="/learn-morse-code"
      className="rounded-xl bg-white px-6 py-3 font-semibold text-green-700 hover:bg-green-50"
    >
      Learn Morse Code
    </Link>

    <Link
      href="/morse-code-quiz"
      className="rounded-xl border border-white px-6 py-3 font-semibold text-white hover:bg-white hover:text-green-700"
    >
      Take Quiz
    </Link>

  </div>
          </div>

</section>

      </div>

    </main>

  );

}