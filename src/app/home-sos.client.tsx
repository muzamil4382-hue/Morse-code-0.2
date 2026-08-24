"use client";

import Link from "next/link";
import { Volume2 } from "lucide-react";
import { playMorseAudio } from "@/lib/morse";

export default function HomeSos() {
  return (
    <section className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 border-y border-red-100 dark:border-red-900/50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-full text-sm font-semibold mb-4">
            ⚠ International Distress Signal
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            SOS in Morse Code
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            SOS is transmitted as{" "}
            <span className="font-mono font-bold text-green-700 dark:text-green-400">
              ··· --- ···
            </span>
            . Its distinctive pattern of three short signals, three long signals,
            and three short signals makes it easy to recognize and transmit in an emergency.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-red-100 dark:border-red-900/50 text-center">
          <div className="text-5xl sm:text-6xl font-mono font-extrabold text-green-700 dark:text-green-400 tracking-widest mb-4">
            ··· --- ···
          </div>

          <p className="text-slate-600 dark:text-slate-400 mb-6">
            SOS is a Morse code distress signal. It was selected because its
            pattern is simple, distinctive, and easy to send as a continuous sequence.
          </p>

          <button
            type="button"
            onClick={() =>
              playMorseAudio("... --- ...", {
                speed: 15,
                frequency: 600,
                volume: 0.7,
              })
            }
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            Play SOS Signal
          </button>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/sos-morse-code"
            className="text-red-600 dark:text-red-400 font-medium hover:underline"
          >
            Read the Complete SOS Morse Code Guide →
          </Link>
        </div>
      </div>
    </section>
  );
}