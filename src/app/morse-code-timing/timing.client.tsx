"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Clock, ArrowRight, Info } from "lucide-react";
import { playMorseAudio } from "@/lib/morse";

interface FAQ { question: string; answer: string; }
interface Props { faqs: FAQ[]; }

const TIMING_ELEMENTS = [
  { name: "Dot (dit)", units: 1, type: "signal" as const },
  { name: "Intra-character gap", units: 1, type: "gap-short" as const },
  { name: "Dash (dah)", units: 3, type: "signal" as const },
  { name: "Intra-character gap", units: 1, type: "gap-short" as const },
  { name: "Inter-character gap", units: 3, type: "gap-letter" as const },
  { name: "Inter-word gap", units: 7, type: "gap-word" as const },
];

const WPM_TABLE = [
  { wpm: 5, dot: 240, dash: 720, intraChar: 240, interChar: 720, wordGap: 1680 },
  { wpm: 10, dot: 120, dash: 360, intraChar: 120, interChar: 360, wordGap: 840 },
  { wpm: 15, dot: 80, dash: 240, intraChar: 80, interChar: 240, wordGap: 560 },
  { wpm: 20, dot: 60, dash: 180, intraChar: 60, interChar: 180, wordGap: 420 },
  { wpm: 25, dot: 48, dash: 144, intraChar: 48, interChar: 144, wordGap: 336 },
  { wpm: 30, dot: 40, dash: 120, intraChar: 40, interChar: 120, wordGap: 280 },
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
    playMorseAudio(".... . .-.. .-.. ---", { speed: wpm, frequency: 600, volume: 0.5 });
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Home</Link>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <span className="text-slate-900 dark:text-white font-medium">Morse Code Timing</span>
        </nav>
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Morse Code Timing</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">The definitive reference for Morse code timing rules, ITU-R M.1677 standard, Farnsworth timing method, and exact millisecond durations at every common WPM speed from 5 to 30 words per minute.</p>
        </div>
      </section>

      {/* ITU-R M.1677 Standard */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">ITU-R M.1677 Timing Standard</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">The International Telecommunication Union recommendation ITU-R M.1677 defines the precise timing ratios that govern all Morse code transmission. These ratios have been the international standard since 1865 and ensure that Morse code can be reliably decoded regardless of the operator&apos;s location, language, or equipment.</p>
          </div>

          {/* Visual Diagram */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 sm:p-8 mb-8">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Timing Element Diagram</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">All Morse code timing is measured in multiples of the dot duration (1 unit). A dash is exactly 3 units long. Gaps between signal elements within a character are 1 unit, between characters are 3 units, and between words are 7 units.</p>
            <div className="space-y-4">
              {TIMING_ELEMENTS.map((el, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-sm text-slate-700 dark:text-slate-300 w-48 shrink-0 font-medium">{el.name}</span>
                  <div className="flex-1 flex items-center">
                    <div
                      className={`h-10 rounded flex items-center justify-center text-xs font-bold ${
                        el.type === "signal"
                          ? "bg-green-500 text-white"
                          : el.type === "gap-short"
                          ? "bg-slate-300 dark:bg-slate-600"
                          : el.type === "gap-letter"
                          ? "bg-amber-400 dark:bg-amber-600"
                          : "bg-red-400 dark:bg-red-600 text-white"
                      }`}
                      style={{ width: `${Math.max(el.units * 60, 48)}px` }}
                    >
                      {el.units} unit{el.units > 1 ? "s" : ""}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 mt-6 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-green-500 rounded-sm inline-block"></span>Signal (dot/dash)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-slate-300 dark:bg-slate-600 rounded-sm inline-block"></span>Intra-char gap (1u)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-amber-400 dark:bg-amber-600 rounded-sm inline-block"></span>Letter gap (3u)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-red-400 dark:bg-red-600 rounded-sm inline-block"></span>Word gap (7u)</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Element</th>
                  <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Duration (units)</th>
                  <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {[
                  ["Dot (dit)", "1 unit", "The fundamental timing unit. All other durations are multiples of this. At 20 WPM, one dot equals 60 milliseconds exactly."],
                  ["Dash (dah)", "3 units", "Exactly three dot durations. Creates the distinctive long signal. At 20 WPM, one dash equals 180 milliseconds."],
                  ["Intra-character gap", "1 unit", "Silence between dots and dashes within the same letter. Equal to one dot duration. At 20 WPM, 60 milliseconds."],
                  ["Inter-character gap", "3 units", "Silence between complete characters. Crucial for distinguishing letters. At 20 WPM, 180 milliseconds."],
                  ["Inter-word gap", "7 units", "Long silence between words. Often represented as a slash (/) in written Morse. At 20 WPM, 420 milliseconds."],
                ].map(([elem, dur, desc], i) => (
                  <tr key={i}>
                    <td className="p-4 font-medium text-slate-900 dark:text-white">{elem}</td>
                    <td className="p-4 font-mono text-green-600 dark:text-green-400 font-semibold">{dur}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Interactive WPM Calculator */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Interactive WPM Timing Calculator</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Adjust the WPM slider to see the exact millisecond durations for each timing element at any speed. The reference word PARIS (50 dot units) is used to calibrate all WPM measurements.</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
          <div className="mb-6">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Speed: <span className="text-green-600 dark:text-green-400 font-bold text-lg">{wpm} WPM</span></label>
            <input type="range" min="5" max="35" value={wpm} onChange={(e) => setWpm(Number(e.target.value))} className="w-full accent-green-600" />
            <div className="flex justify-between text-xs text-slate-400 mt-1"><span>5 WPM</span><span>35 WPM</span></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {[
              { label: "Dot", value: dotDur, unit: "ms" },
              { label: "Dash", value: dashDur, unit: "ms" },
              { label: "Intra-char", value: intraGap, unit: "ms" },
              { label: "Letter gap", value: interCharGap, unit: "ms" },
              { label: "Word gap", value: wordGap, unit: "ms" },
            ].map((item, i) => (
              <div key={i} className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="text-2xl font-extrabold text-green-700 dark:text-green-400">{item.value}<span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-0.5">{item.unit}</span></div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button onClick={handlePlayExample} className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors cursor-pointer">
              <Clock className="w-4 h-4" /> Play &quot;HELLO&quot; at {wpm} WPM
            </button>
          </div>
        </div>
      </section>

      {/* WPM Speed Reference Table */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">WPM Speed Reference Table</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">The table below shows exact millisecond durations for each timing element at the six most common Morse code speeds. These values are calculated using the formula: dot duration = 1200 / WPM milliseconds.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">WPM</th>
                    <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Dot (ms)</th>
                    <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Dash (ms)</th>
                    <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Intra-char (ms)</th>
                    <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Letter gap (ms)</th>
                    <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Word gap (ms)</th>
                    <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Typical Use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {[
                    [5, 240, 720, 240, 720, 1680, "Complete beginner"],
                    [10, 120, 360, 120, 360, 840, "Basic practice"],
                    [15, 80, 240, 80, 240, 560, "Intermediate"],
                    [20, 60, 180, 60, 180, 420, "Standard ham radio"],
                    [25, 48, 144, 48, 144, 336, "Advanced operator"],
                    [30, 40, 120, 40, 120, 280, "Expert / contest"],
                  ].map(([w, d, da, ic, lc, wg, use], i) => (
                    <tr key={i} className={wpm === w ? "bg-green-50 dark:bg-green-900/20" : ""}>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{w} WPM</td>
                      <td className="p-4 font-mono text-green-600 dark:text-green-400">{d} ms</td>
                      <td className="p-4 font-mono text-slate-600 dark:text-slate-400">{da} ms</td>
                      <td className="p-4 font-mono text-slate-600 dark:text-slate-400">{ic} ms</td>
                      <td className="p-4 font-mono text-slate-600 dark:text-slate-400">{lc} ms</td>
                      <td className="p-4 font-mono text-slate-600 dark:text-slate-400">{wg} ms</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Farnsworth Timing */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Farnsworth Timing Method</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">The Farnsworth timing method, developed by Donald R. Farnsworth, is the most widely used training technique for learning Morse code. It solves a fundamental problem in Morse code education: learning characters at slow speeds and then trying to increase speed later causes a &quot;speed wall&quot; around 10 WPM where the learner must transition from counting dots to recognizing rhythmic patterns.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2"><Info className="w-5 h-5 text-green-600" /> How Farnsworth Works</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">Farnsworth timing sends each character at a higher speed (e.g., 20 WPM) but inserts extra-long gaps between characters so the overall transmission speed averages much lower (e.g., 5 WPM). The character itself — its dots, dashes, and intra-character gaps — uses standard timing ratios at 20 WPM. Only the inter-character gap is stretched from 180ms to approximately 1400ms.</p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">This approach lets the learner hear each character at its proper rhythmic proportions from day one. As proficiency improves, the extra inter-character gap is gradually reduced until standard timing is reached. The learner never has to unlearn slow-speed character recognition, because they always heard characters at full speed.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2"><Clock className="w-5 h-5 text-green-600" /> Farnsworth vs. Standard</h3>
            <div className="space-y-4">
              <div>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">Standard 5 WPM timing:</span>
                <div className="flex items-center gap-1 mt-1">
                  <div className="h-6 w-12 bg-green-500 rounded-sm"></div>
                  <div className="h-3 w-6 bg-slate-300 dark:bg-slate-600 rounded-sm"></div>
                  <div className="h-6 w-36 bg-green-500 rounded-sm"></div>
                  <div className="h-3 w-6 bg-slate-300 dark:bg-slate-600 rounded-sm"></div>
                  <div className="h-3 w-18 bg-amber-400 dark:bg-amber-600 rounded-sm"></div>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">Dot=240ms, Dash=720ms, gaps=240ms — all stretched equally</span>
              </div>
              <div>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">Farnsworth 20/5 WPM timing:</span>
                <div className="flex items-center gap-1 mt-1">
                  <div className="h-6 w-6 bg-green-500 rounded-sm"></div>
                  <div className="h-3 w-3 bg-slate-300 dark:bg-slate-600 rounded-sm"></div>
                  <div className="h-6 w-18 bg-green-500 rounded-sm"></div>
                  <div className="h-3 w-3 bg-slate-300 dark:bg-slate-600 rounded-sm"></div>
                  <div className="h-3 w-28 bg-blue-400 dark:bg-blue-600 rounded-sm"></div>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">Dot=60ms, Dash=180ms — normal speed, extra gap between letters</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Explore More */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">Explore More</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Link href="/morse-code-alphabet" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
            <span className="text-green-600 text-lg">📋</span>
            <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Alphabet Chart</span>
          </Link>
          <Link href="/morse-code-sounds" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
            <span className="text-green-600 text-lg">🔊</span>
            <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Morse Code Sounds</span>
          </Link>
          <Link href="/learn-morse-code" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
            <span className="text-green-600 text-lg">📖</span>
            <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Learn Morse Code</span>
          </Link>
          <Link href="/morse-code-quiz" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
            <span className="text-green-600 text-lg">🎯</span>
            <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Morse Code Quiz</span>
          </Link>
          <Link href="/what-is-morse-code" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
            <span className="text-green-600 text-lg">📖</span>
            <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">History & Info</span>
          </Link>
                  <Link href="/" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
            <span className="text-green-600 text-lg">🔤</span>
            <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Translator</span>
          </Link>
          <Link href="/morse-code-decoder" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
            <span className="text-green-600 text-lg">🔓</span>
            <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Decoder</span>
          </Link>
          <Link href="/morse-code-numbers" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
            <span className="text-green-600 text-lg">🔢</span>
            <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Numbers</span>
          </Link>
</div>
      </section>

      {/* FAQ */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Morse Code Timing FAQ</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Common questions about Morse code timing, speed measurement, and the Farnsworth method.</p>
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
    </div>
  );
}
