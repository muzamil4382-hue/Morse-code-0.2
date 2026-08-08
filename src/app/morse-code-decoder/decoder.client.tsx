"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Copy, Check, ChevronDown, ChevronUp, ArrowRight, Trash2, Zap, Info } from "lucide-react";
import { MORSE_CODE, TEXT_CODE } from "@/lib/morse";

interface FAQ { question: string; answer: string; }
interface Props { faqs: FAQ[]; }

type SeparatorMode = "space" | "slash" | "pipe" | "bruteforce";

export default function DecoderClient({ faqs }: Props) {
  const [morseInput, setMorseInput] = useState("");
  const [separator, setSeparator] = useState<SeparatorMode>("space");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const decodeResult = useMemo(() => {
    if (!morseInput.trim()) return { text: "", analysis: [] as { morse: string; char: string; valid: boolean }[] };

    let tokens: string[] = [];

    if (separator === "bruteforce") {
      tokens = morseInput.trim().split(/\s+/);
    } else if (separator === "pipe") {
      tokens = morseInput.trim().split(/[|]/).map(s => s.trim()).filter(Boolean);
    } else if (separator === "slash") {
      tokens = morseInput.trim().replace(/\//g, " ").split(/\s+/).filter(Boolean);
    } else {
      tokens = morseInput.trim().split(/\s+/);
    }

    const analysis = tokens.map(token => {
      const char = TEXT_CODE[token] || "";
      return { morse: token, char, valid: !!char || token === "/" };
    });

    let text = analysis.map(a => {
      if (a.morse === "/") return " ";
      return a.char;
    }).join("");

    return { text, analysis };
  }, [morseInput, separator]);

  const handleCopy = useCallback(() => {
    if (!decodeResult.text) return;
    navigator.clipboard.writeText(decodeResult.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [decodeResult.text]);

  const handleClear = useCallback(() => setMorseInput(""), []);

  const validCount = decodeResult.analysis.filter(a => a.valid).length;
  const totalCount = decodeResult.analysis.length;
  const invalidChars = decodeResult.analysis.filter(a => !a.valid);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Home</Link>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <span className="text-slate-900 dark:text-white font-medium">Morse Code Decoder</span>
        </nav>
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Morse Code Decoder</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">Decode Morse code to readable text with support for custom separators, brute-force mode for unseparated input, and character-by-character analysis. Paste your dots and dashes and get instant results.</p>
        </div>
      </section>

      {/* Decoder Tool */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/60 dark:shadow-none border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8">
          {/* Separator Selection */}
          <div className="mb-5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 block flex items-center gap-2"><Info className="w-4 h-4 text-green-600" /> Separator Format</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {([
                { id: "space" as const, label: "Space", desc: ".- -... (standard)" },
                { id: "slash" as const, label: "Slash /", desc: ".-/-.../-.-." },
                { id: "pipe" as const, label: "Pipe |", desc: ".-|-...|-.-." },
                { id: "bruteforce" as const, label: "No Separator", desc: "Brute force" },
              ]).map(s => (
                <button key={s.id} onClick={() => setSeparator(s.id)} className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${separator === s.id ? "border-green-500 bg-green-50 dark:bg-green-900/30 dark:border-green-600" : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"}`}>
                  <span className={`text-sm font-semibold ${separator === s.id ? "text-green-700 dark:text-green-400" : "text-slate-700 dark:text-slate-300"}`}>{s.label}</span>
                  <span className="block text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">{s.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="mb-4">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Enter Morse Code</label>
            <div className="relative">
              <textarea value={morseInput} onChange={(e) => setMorseInput(e.target.value)} placeholder={separator === "bruteforce" ? "Enter Morse code without separators (e.g., .... . .-.. .-.. ---)" : "Enter Morse code with separators (e.g., .... . .-.. .-.. ---)"} className="w-full min-h-[140px] p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 resize-y font-mono text-lg transition-all" dir="ltr" />
              <button onClick={handleClear} className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all cursor-pointer"><Trash2 className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center justify-between mt-1.5 text-xs text-slate-400 dark:text-slate-500">
              <span>{morseInput.trim().split(/\s+/).filter(Boolean).length} tokens</span>
              <span>Use . (dot) and - (dash)</span>
            </div>
          </div>

          {/* Output */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Decoded Text</label>
              <div className="flex items-center gap-2">
                {totalCount > 0 && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${validCount === totalCount ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"}`}>
                    {validCount}/{totalCount} decoded
                  </span>
                )}
                <button onClick={handleCopy} disabled={!decodeResult.text} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-40 cursor-pointer">
                  {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 dark:bg-slate-950 text-green-400 font-mono text-lg min-h-[80px]" dir="ltr">
              {decodeResult.text ? <span>{decodeResult.text}</span> : <span className="text-slate-600 dark:text-slate-500">Decoded text will appear here...</span>}
            </div>
          </div>

          {/* Analysis Table */}
          {decodeResult.analysis.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Character Analysis</h3>
              <div className="max-h-64 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800 sticky top-0">
                    <tr>
                      <th className="text-left p-3 font-semibold text-slate-900 dark:text-white">Morse</th>
                      <th className="text-left p-3 font-semibold text-slate-900 dark:text-white">Character</th>
                      <th className="text-left p-3 font-semibold text-slate-900 dark:text-white">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {decodeResult.analysis.map((a, i) => (
                      <tr key={i} className={!a.valid ? "bg-red-50/50 dark:bg-red-900/10" : ""}>
                        <td className="p-3 font-mono text-slate-900 dark:text-white">{a.morse}</td>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">{a.morse === "/" ? "(space)" : a.char || "?"}</td>
                        <td className="p-3">{a.valid ? <span className="text-green-600 dark:text-green-400 text-xs font-medium">Valid</span> : <span className="text-red-500 dark:text-red-400 text-xs font-medium">Unknown</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {invalidChars.length > 0 && (
                <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg">
                  <p className="text-xs text-amber-700 dark:text-amber-400"><strong>Warning:</strong> {invalidChars.length} token(s) could not be decoded: {invalidChars.map(c => c.morse).join(", ")}. Check that your input uses standard International Morse code notation with dots (.) and dashes (-).</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* How Decoding Works */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">How Morse Code Decoding Works</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">Morse code decoding is the reverse process of encoding. The decoder receives a sequence of dots and dashes, splits them into individual character codes using separators, and looks up each code in the International Morse code table defined by ITU-R M.1677 to find the corresponding letter or number.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">The Decoding Process</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">When you paste Morse code into the decoder, it first identifies the separator pattern in your input. In standard format, single spaces separate individual character codes (e.g., &quot;.... . .-.. .-.. ---&quot; for HELLO). Forward slashes (/) indicate word boundaries. The decoder then processes each code by looking it up in a reverse mapping table where Morse code sequences are keys and their corresponding characters are values.</p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">For example, the code &quot;....&quot; maps to H, &quot;.&quot; maps to E, &quot;.-..&quot; maps to L, and &quot;---&quot; maps to O. The decoder concatenates these characters to produce the final readable text. If a code does not match any known character, it is flagged as unknown in the analysis table, helping you identify and correct errors in your input.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Challenges in Morse Code Decoding</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">The primary challenge in Morse code decoding is ambiguity when separators are missing. Without spaces between letters, the same sequence of dots and dashes can represent multiple valid decodings. For instance, &quot;.-.-.-&quot; could be decoded as AEA (.- .- -.-), EE (.. .. -.- -..-.), or the period symbol (.-.-.-). This is why the International Telecommunication Union established strict spacing standards — precise timing ratios prevent ambiguity in real-time transmission.</p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Another common challenge is distinguishing between similar-looking characters when written. The letter H (....) looks very similar to the number 5 (.....) — the difference is a single extra dot. Similarly, S (...) and H (....) differ by one dot. Our decoder&apos;s character analysis table helps you catch these subtle differences by showing the exact match for each input token.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Morse Code Quick Reference</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Use this reference table to manually verify your Morse code or learn the encoding for each character.</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800 sticky top-0 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="text-left p-3 font-semibold text-slate-900 dark:text-white">Character</th>
                  <th className="text-left p-3 font-semibold text-slate-900 dark:text-white">Morse Code</th>
                  <th className="text-left p-3 font-semibold text-slate-900 dark:text-white">Character</th>
                  <th className="text-left p-3 font-semibold text-slate-900 dark:text-white">Morse Code</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,?'/!()&:;=+-_\"\$@".split("").slice(0, 26).reduce<string[][]>((acc, char, i) => {
                  const row = Math.floor(i / 2);
                  if (!acc[row]) acc[row] = [];
                  acc[row].push(char);
                  return acc;
                }, []).map((row, i) => (
                  <tr key={i}>
                    {row.map(char => (
                      <>
                        <td className="p-3 font-bold text-slate-900 dark:text-white" key={`c${char}`}>{char}</td>
                        <td className="p-3 font-mono text-green-600 dark:text-green-400" key={`m${char}`}>{MORSE_CODE[char] || ""}</td>
                      </>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-16">
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
          Try Full Translator <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* FAQ */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Morse Code Decoder FAQ</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Common questions about decoding Morse code to text.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                  <span className="font-semibold text-slate-900 dark:text-white pr-4">{faq.question}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                </button>
                {openFaq === i && <div className="px-5 pb-5 -mt-1"><p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{faq.answer}</p></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore More */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Explore More</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Link href="/morse-code-translator" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
            <span className="text-green-600 text-lg">🔤</span>
            <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Translator</span>
          </Link>
          <Link href="/morse-code-alphabet" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
            <span className="text-green-600 text-lg">📋</span>
            <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Alphabet Chart</span>
          </Link>
          <Link href="/learn-morse-code" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
            <span className="text-green-600 text-lg">📖</span>
            <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Learn Morse Code</span>
          </Link>
          <Link href="/morse-code-quiz" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
            <span className="text-green-600 text-lg">🎯</span>
            <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Take the Quiz</span>
          </Link>
          <Link href="/what-is-morse-code" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
            <span className="text-green-600 text-lg">📖</span>
            <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">History & Info</span>
          </Link>
                  <Link href="/morse-code-numbers" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
            <span className="text-green-600 text-lg">🔢</span>
            <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Numbers Guide</span>
          </Link>
          <Link href="/morse-code-sounds" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
            <span className="text-green-600 text-lg">🔊</span>
            <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Morse Sounds</span>
          </Link>
          <Link href="/morse-code-timing" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
            <span className="text-green-600 text-lg">⏱️</span>
            <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Morse Timing</span>
          </Link>
</div>
      </section>
    </div>
  );
}
