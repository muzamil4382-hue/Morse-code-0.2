"use client";

import { useState } from "react";
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

export default function BinaryCodeTranslatorPage() {
  const [text, setText] = useState("");
  const [binary, setBinary] = useState("");
  const [mode, setMode] = useState<"text-to-binary" | "binary-to-text">("text-to-binary");
  const [copied, setCopied] = useState(false);

  const output = mode === "text-to-binary" ? textToBinary(text) : binaryToText(binary);

  const handleSwap = () => {
    if (mode === "text-to-binary") {
      setMode("binary-to-text");
      const bin = textToBinary(text);
      setBinary(bin);
    } else {
      setMode("text-to-text");
      const txt = binaryToText(binary);
      setText(txt);
      setMode("text-to-binary");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-medium">Binary Code Translator</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Binary Code Translator</h1>
          <p className="text-lg text-slate-600">
            Convert text to binary code and binary code to text. Learn how binary code works and why it&apos;s the
            foundation of all modern computing.
          </p>
        </div>

        {/* Translator */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 md:p-8 mb-12 space-y-5">
          {/* Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`text-sm font-semibold transition-colors ${mode === "text-to-binary" ? "text-green-600" : "text-slate-400"}`}>
                Text → Binary
              </span>
              <button
                onClick={handleSwap}
                className="p-2 rounded-full bg-slate-100 hover:bg-green-100 hover:text-green-600 transition-all cursor-pointer"
              >
                <ArrowDownUp className="w-4 h-4" />
              </button>
              <span className={`text-sm font-semibold transition-colors ${mode === "binary-to-text" ? "text-green-600" : "text-slate-400"}`}>
                Binary → Text
              </span>
            </div>
          </div>

          {/* Input */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              {mode === "text-to-binary" ? "Enter Text" : "Enter Binary Code"}
            </label>
            <textarea
              value={mode === "text-to-binary" ? text : binary}
              onChange={(e) => {
                if (mode === "text-to-binary") setText(e.target.value);
                else setBinary(e.target.value);
              }}
              placeholder={mode === "text-to-binary" ? "Type your text here..." : "Enter 8-bit binary (e.g., 01001000 01100101)"}
              className="w-full min-h-[120px] p-4 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 resize-y font-mono text-lg transition-all"
              dir="ltr"
            />
          </div>

          {/* Output */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Output</label>
            <div className="p-4 rounded-xl bg-slate-900 text-green-400 font-mono text-lg min-h-[80px]">
              {output ? (
                <span>{output}</span>
              ) : (
                <span className="text-slate-600">Output will appear here...</span>
              )}
            </div>
          </div>

          {/* Copy */}
          <button
            onClick={handleCopy}
            disabled={!output}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors disabled:opacity-40 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Educational Content */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What is Binary Code?</h2>
          <div className="text-slate-700 leading-relaxed space-y-4">
            <p>
              Binary code is a numbering system that uses only two digits: <strong>0</strong> and <strong>1</strong>.
              It is the fundamental language of all computers and digital systems. Every piece of data in your computer
              — text, images, videos, programs — is ultimately stored and processed as binary code.
            </p>
            <p>
              In text encoding (specifically ASCII), each character is represented by an 8-bit binary number. For example,
              the letter &quot;A&quot; is <code className="font-mono bg-slate-100 px-2 py-0.5 rounded">01000001</code>,
              the letter &quot;B&quot; is <code className="font-mono bg-slate-100 px-2 py-0.5 rounded">01000010</code>,
              and the space character is{" "}
              <code className="font-mono bg-slate-100 px-2 py-0.5 rounded">00100000</code>. Extended character sets like
              Unicode use more bits to represent a wider range of characters.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How Binary Differs from Morse Code</h2>
          <div className="text-slate-700 leading-relaxed space-y-4">
            <p>
              While both Morse code and binary code use two-state systems, they serve very different purposes.
              Morse code is a <strong>variable-length encoding</strong> where common characters get shorter codes
              (E = one dot, T = one dash), making it efficient for human communication. Binary code uses{" "}
              <strong>fixed-length encoding</strong> (8 bits per character in ASCII), which makes it easier for
              machines to process but less efficient for human use.
            </p>
            <p>
              Interestingly, Morse code was an early inspiration for digital communication. The concept of encoding
              information as a sequence of two states (on/off, dot/dash) is the same principle that underlies all
              modern digital computing. Samuel Morse&apos;s telegraph was, in essence, the world&apos;s first
              digital communication device.
            </p>
          </div>
        </section>

        {/* ASCII Reference */}
        <section className="mb-12 overflow-x-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Common ASCII Binary Values</h2>
          <table className="w-full border-collapse bg-white border border-slate-200 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Character</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Decimal</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Binary</th>
              </tr>
            </thead>
            <tbody>
              {[
                { ch: "A", dec: 65, bin: "01000001" }, { ch: "B", dec: 66, bin: "01000010" },
                { ch: "C", dec: 67, bin: "01000011" }, { ch: "0", dec: 48, bin: "00110000" },
                { ch: "1", dec: 49, bin: "00110001" }, { ch: " ", dec: 32, bin: "00100000" },
                { ch: "!", dec: 33, bin: "00100001" }, { ch: ".", dec: 46, bin: "00101110" },
                { ch: "Z", dec: 90, bin: "01011010" }, { ch: "a", dec: 97, bin: "01100001" },
                { ch: "z", dec: 122, bin: "01111010" }, { ch: "9", dec: 57, bin: "00111001" },
              ].map((item) => (
                <tr key={item.ch} className="border-b border-slate-100 hover:bg-green-50/50 transition-colors">
                  <td className="px-4 py-2 font-bold text-slate-900">{item.ch === " " ? "(space)" : item.ch}</td>
                  <td className="px-4 py-2 text-slate-600">{item.dec}</td>
                  <td className="px-4 py-2 font-mono text-green-600">{item.bin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Explore More */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Explore More</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Link href="/morse-code-translator" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
              <span className="text-green-600">🔤</span>
              <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Morse Translator</span>
            </Link>
            <Link href="/morse-code-decoder" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
              <span className="text-green-600">🔓</span>
              <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Morse Decoder</span>
            </Link>
            <Link href="/morse-code-alphabet" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
              <span className="text-green-600">📋</span>
              <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Alphabet Chart</span>
            </Link>
            <Link href="/morse-code-letters" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
              <span className="text-green-600">🔠</span>
              <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Letters Guide</span>
            </Link>
            <Link href="/learn-morse-code" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
              <span className="text-green-600">📖</span>
              <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Learn Morse Code</span>
            </Link>
            <Link href="/morse-code-quiz" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
              <span className="text-green-600">🎯</span>
              <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Morse Quiz</span>
            </Link>
          
            <Link href="/morse-code-numbers" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
              <span className="text-green-600">🔢</span>
              <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Numbers Guide</span>
            </Link>
            <Link href="/morse-code-sounds" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
              <span className="text-green-600">🔊</span>
              <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Morse Sounds</span>
            </Link>
            <Link href="/morse-code-timing" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
              <span className="text-green-600">⏱️</span>
              <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Morse Timing</span>
            </Link></div>
        </section>
      </div>
    </main>
  );
}
