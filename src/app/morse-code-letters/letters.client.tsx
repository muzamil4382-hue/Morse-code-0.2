"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Volume2, VolumeX } from "lucide-react";
import { MORSE_CODE, playMorseAudio, stopMorseAudio } from "@/lib/morse";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface LetterInfo {
  letter: string;
  code: string;
  pronunciation: string;
  memoryTip: string;
  frequency: string;
}

const letterData: LetterInfo[] = [
  { letter: "A", code: ".-", pronunciation: "dit-dah", memoryTip: "Think 'A-bove' — dot is above, like a small peak", frequency: "8.2%" },
  { letter: "B", code: "-...", pronunciation: "dah-dit-dit-dit", memoryTip: "'Boot' — one big step then three quick taps", frequency: "1.5%" },
  { letter: "C", code: "-.-.", pronunciation: "dah-dit-dah-dit", memoryTip: "'Co-co' — dash-dot repeated like a cuckoo clock", frequency: "2.8%" },
  { letter: "D", code: "-..", pronunciation: "dah-dit-dit", memoryTip: "'Dog' — one bark then two whines", frequency: "4.3%" },
  { letter: "E", code: ".", pronunciation: "dit", memoryTip: "The shortest and most common letter. Just a single tap.", frequency: "12.7%" },
  { letter: "F", code: "..-.", pronunciation: "dit-dit-dah-dit", memoryTip: "'Flip-flap' — two dots flip into dash then dot", frequency: "2.2%" },
  { letter: "G", code: "--.", pronunciation: "dah-dah-dit", memoryTip: "'Goo-goo' — two long sounds, one short", frequency: "2.0%" },
  { letter: "H", code: "....", pronunciation: "dit-dit-dit-dit", memoryTip: "'Hurry' — four quick taps like footsteps", frequency: "6.1%" },
  { letter: "I", code: "..", pronunciation: "dit-dit", memoryTip: "'I-I' — two small taps, like saying 'it it'", frequency: "7.0%" },
  { letter: "J", code: ".---", pronunciation: "dit-dah-dah-dah", memoryTip: "'J-ump' — one small step up then three big drops", frequency: "0.15%" },
  { letter: "K", code: "-.-", pronunciation: "dah-dit-dah", memoryTip: "'K-ite' — dash, then kite shape (dot-dash)", frequency: "0.77%" },
  { letter: "L", code: ".-..", pronunciation: "dit-dah-dit-dit", memoryTip: "'Ladder' — one rung up, then three steps down", frequency: "4.0%" },
  { letter: "M", code: "--", pronunciation: "dah-dah", memoryTip: "'M-mountain' — two big peaks", frequency: "2.4%" },
  { letter: "N", code: "-.", pronunciation: "dah-dit", memoryTip: "'N-othing' — one long, one short", frequency: "6.7%" },
  { letter: "O", code: "---", pronunciation: "dah-dah-dah", memoryTip: "'Oh-O-O' — three long sounds like surprise", frequency: "7.5%" },
  { letter: "P", code: ".--.", pronunciation: "dit-dah-dah-dit", memoryTip: "'P-ping' — short, two longs, short", frequency: "1.9%" },
  { letter: "Q", code: "--.-", pronunciation: "dah-dah-dit-dah", memoryTip: "'Q-uestion' — two dashes, dot, dash", frequency: "0.10%" },
  { letter: "R", code: ".-.", pronunciation: "dit-dah-dit", memoryTip: "'R-iver' — flowing: dot, dash, dot", frequency: "6.0%" },
  { letter: "S", code: "...", pronunciation: "dit-dit-dit", memoryTip: "'S-snake' — three quick hissing sounds", frequency: "6.3%" },
  { letter: "T", code: "-", pronunciation: "dah", memoryTip: "The second most common letter. One long signal.", frequency: "9.1%" },
  { letter: "U", code: "..-", pronunciation: "dit-dit-dah", memoryTip: "'U-p' — two short steps going up", frequency: "2.8%" },
  { letter: "V", code: "...-", pronunciation: "dit-dit-dit-dah", memoryTip: "'V-ictory' — three dots then a dash (like the V-for-victory rhythm)", frequency: "0.98%" },
  { letter: "W", code: ".--", pronunciation: "dit-dah-dah", memoryTip: "'W-ave' — small wave then two big waves", frequency: "2.4%" },
  { letter: "X", code: "-..-", pronunciation: "dah-dit-dit-dah", memoryTip: "'X-ray cross' — dash crossing two dots and a dash", frequency: "0.15%" },
  { letter: "Y", code: "-.--", pronunciation: "dah-dit-dah-dah", memoryTip: "'Y-odel' — long, short, then two long yodels", frequency: "2.0%" },
  { letter: "Z", code: "--..", pronunciation: "dah-dah-dit-dit", memoryTip: "'Z-zzz' — two longs, then drifting off to sleep", frequency: "0.07%" },
];

export default function MorseCodeLettersPage() {
  const [playingLetter, setPlayingLetter] = useState<string | null>(null);

  const handlePlay = useCallback(async (letter: string) => {
    const code = MORSE_CODE[letter];
    if (!code) return;
    setPlayingLetter(letter);
    await playMorseAudio(code);
    setPlayingLetter(null);
  }, []);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-medium">Morse Code Letters</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Morse Code Letters A–Z
          </h1>
          <p className="text-lg text-slate-600">
            Complete reference guide for every letter in the International Morse Code alphabet. Click any letter to hear
            its sound, view visual dot/dash representations, and learn memory tips for each character.
          </p>
        </div>

        {/* Interactive Letters Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Interactive Letter Reference</h2>
          <div className="space-y-3">
            {letterData.map((item) => (
              <div
                key={item.letter}
                className="bg-white border border-slate-200 rounded-xl p-4 hover:border-green-400 hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* Letter */}
                  <button
                    onClick={() => handlePlay(item.letter)}
                    className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center flex-shrink-0 cursor-pointer transition-all ${
                      playingLetter === item.letter
                        ? "bg-green-600 text-white shadow-lg shadow-green-600/30"
                        : "bg-slate-100 text-slate-900 hover:bg-green-50 hover:text-green-700"
                    }`}
                    title={`Play ${item.letter}`}
                  >
                    <span className="text-2xl font-bold">{item.letter}</span>
                    <span className="text-xs mt-0.5">
                      {playingLetter === item.letter ? (
                        <VolumeX className="w-3 h-3" />
                      ) : (
                        <Volume2 className="w-3 h-3" />
                      )}
                    </span>
                  </button>

                  {/* Visual */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-1">
                        {item.code.split("").map((char, i) => {
                          if (char === ".") return <span key={i} className="inline-block w-3 h-3 rounded-full bg-green-600" />;
                          if (char === "-") return <span key={i} className="inline-block w-7 h-3 rounded-full bg-green-600" />;
                          return null;
                        })}
                      </div>
                      <span className="font-mono text-green-600 font-medium">{item.code}</span>
                      <span className="text-sm text-slate-400">({item.pronunciation})</span>
                    </div>
                    <p className="text-sm text-slate-600">{item.memoryTip}</p>
                  </div>

                  {/* Frequency */}
                  <div className="text-right flex-shrink-0 hidden sm:block">
                    <p className="text-xs text-slate-400">Frequency</p>
                    <p className="text-sm font-medium text-slate-700">{item.frequency}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Learning Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Tips for Learning Letters</h2>
          <div className="space-y-4">
            <div className="p-5 bg-green-50 border border-green-200 rounded-xl">
              <h3 className="font-semibold text-green-800 mb-2">Group Letters by Pattern</h3>
              <p className="text-green-700">Group letters with similar patterns together. For example, the &quot;all dots&quot; group (E, I, S, H) and the &quot;all dashes&quot; group (T, M, O). Letters that are reverses of each other (A/N, K/R, F/L) are also easy to learn in pairs.</p>
            </div>
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-2">Learn by Frequency</h3>
              <p className="text-slate-600">The letters E, T, A, I, N, O, S, and H make up about 33% of all English text. Learning these eight letters first means you can decode about one-third of any message. Then add R, D, L, C, U, M, W, F, G, and Y to cover over 90% of text.</p>
            </div>
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-2">Use the Koch Method</h3>
              <p className="text-slate-600">Start with just two letters at full speed (20 WPM). Once you can copy them at 90% accuracy for a minute, add a third letter. This method, developed by German psychologist Ludwig Koch in the 1930s, is considered the most effective way to learn Morse code. Read our <Link href="/learn-morse-code" className="text-green-600 underline">complete learning guide</Link>.</p>
            </div>
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-2">Practice with Words</h3>
              <p className="text-slate-600">Once you know several letters, practice with simple words like SOS, CAT, DOG, and HI. Then progress to common phrases. Use our <Link href="/morse-code-translator" className="text-green-600 underline">translator</Link> to check your work and <Link href="/morse-code-quiz" className="text-green-600 underline">quiz</Link> yourself.</p>
            </div>
          </div>
        </section>

        {/* Explore More */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Explore More</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Link href="/morse-code-alphabet" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium hover:border-green-400 hover:shadow-sm transition-all">
              📋 Full Alphabet Chart
            </Link>
            <Link href="/morse-code-numbers" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium hover:border-green-400 hover:shadow-sm transition-all">
              🔢 Number Reference
            </Link>
            <Link href="/morse-code-translator" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium hover:border-green-400 hover:shadow-sm transition-all">
              🔤 Translator Tool
            </Link>
            <Link href="/learn-morse-code" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium hover:border-green-400 hover:shadow-sm transition-all">
              📖 Learn Morse Code
            </Link>
            <Link href="/morse-code-quiz" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium hover:border-green-400 hover:shadow-sm transition-all">
              🎯 Take the Quiz
            </Link>
            <Link href="/morse-code-sounds" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium hover:border-green-400 hover:shadow-sm transition-all">
              🔊 Morse Sounds
            </Link>
                      <Link href="/morse-code-decoder" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium hover:border-green-400 hover:shadow-sm transition-all">
              🔓 Morse Decoder
            </Link>
            <Link href="/morse-code-sounds" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium hover:border-green-400 hover:shadow-sm transition-all">
              🔊 Morse Sounds
            </Link>
            <Link href="/morse-code-timing" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium hover:border-green-400 hover:shadow-sm transition-all">
              ⏱️ Morse Timing
            </Link>
          
</div>
        </section>
      </div>
    </main>
  );
}
