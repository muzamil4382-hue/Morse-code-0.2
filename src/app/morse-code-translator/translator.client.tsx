"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Volume2, Zap, Copy, Share2, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { textToMorse } from "@/lib/morse";

const TranslatorCore = dynamic(() => import("@/components/morse/translator-core"), { ssr: false });

const WORD_PAGES = [
  { word: "SOS", morse: "... --- ...", slug: "sos-morse-code" },
  { word: "I Love You", morse: ".. / .-.. / --- / ...- / . / -.-- / --- / ..-", slug: "i-love-you-in-morse-code" },
  { word: "Hello", morse: ".... . / .-.. .-.. / ---", slug: "hello-in-morse-code" },
  { word: "Help Me", morse: ".... . .-.. .--. / -- .", slug: "help-me-in-morse-code" },
  { word: "Hi", morse: ".... ..", slug: "hi-in-morse-code" },
  { word: "Love", morse: ".-.. / --- / ...- / .", slug: "love-in-morse-code" },
  { word: "Help", morse: ".... . .-.. .--.", slug: "help-in-morse-code" },
  { word: "Yes", morse: "-.-- / . / ...", slug: "yes-in-morse-code" },
  { word: "No", morse: "-. / ---", slug: "no-in-morse-code" },
];

interface FAQ { question: string; answer: string; }

interface Props { faqs: FAQ[]; }

export default function TranslatorClient({ faqs }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-medium">Morse Code Translator</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Morse Code Translator
          </h1>
          <p className="text-lg text-slate-600">
            Convert text to Morse code and Morse code to text for free. Real-time translation with audio playback,
            copy, and download options.
          </p>
        </div>

        {/* Translator */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 md:p-8 mb-12">
          <TranslatorCore />
        </div>

        {/* How to Use */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">How to Use This Morse Code Translator</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="w-10 h-10 bg-green-600 text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Enter Your Text or Morse Code</h3>
                <p className="text-slate-600">Type any English text in the input area, or switch to Morse-to-text mode and enter dots and dashes. The translator supports uppercase and lowercase letters, numbers, spaces, and common punctuation.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="w-10 h-10 bg-green-600 text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">View Instant Translation</h3>
                <p className="text-slate-600">Your translation appears in real-time in the dark output panel below. Each letter is converted to its Morse code equivalent using the International Morse Code standard. Letters are separated by single spaces, and words by forward slashes.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="w-10 h-10 bg-green-600 text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Listen, Copy, or Download</h3>
                <p className="text-slate-600">Click Play Audio to hear the Morse code spoken aloud with adjustable speed and frequency. Use Copy to copy the result to your clipboard, or Download to save it as a text file.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Volume2, title: "Audio Playback", desc: "Listen to Morse code with adjustable speed, frequency, and volume settings. Perfect for learning by ear." },
              { icon: Zap, title: "Real-time Conversion", desc: "Instant text-to-Morse and Morse-to-text translation as you type. No waiting, no buttons to press." },
              { icon: Copy, title: "Copy & Download", desc: "Copy your Morse code to clipboard instantly or download as a .txt file for offline use." },
              { icon: Shield, title: "Free & Private", desc: "No sign-up, no tracking, no ads. Your translations stay in your browser." },
            ].map((f) => (
              <div key={f.title} className="flex gap-4 p-4 bg-white border border-slate-200 rounded-xl">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{f.title}</h3>
                  <p className="text-sm text-slate-600">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Translations */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Popular Translations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WORD_PAGES.map((item) => (
              <Link key={item.slug} href={`/${item.slug}`} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
                <span className="font-medium text-slate-900 group-hover:text-green-600 transition-colors">{item.word}</span>
                <span className="text-sm font-mono text-green-600">{item.morse}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-slate-50 transition-colors">
                  <span className="font-semibold text-slate-900">{faq.question}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-green-600 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4">
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Explore More */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Explore More</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Link href="/morse-code-decoder" className="flex items-center gap-2 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium hover:border-green-400 hover:shadow-sm transition-all">
              🔓 Morse Decoder
              </Link>
            <Link href="/morse-code-alphabet" className="flex items-center gap-2 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium hover:border-green-400 hover:shadow-sm transition-all">
              📋 Alphabet Chart
            </Link>
            <Link href="/morse-code-numbers" className="flex items-center gap-2 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium hover:border-green-400 hover:shadow-sm transition-all">
              🔢 Numbers Guide
            </Link>
            <Link href="/morse-code-sounds" className="flex items-center gap-2 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium hover:border-green-400 hover:shadow-sm transition-all">
              🔊 Morse Sounds
            </Link>
            <Link href="/morse-code-timing" className="flex items-center gap-2 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium hover:border-green-400 hover:shadow-sm transition-all">
              ⏱️ Morse Timing
            </Link>
            <Link href="/what-is-morse-code" className="flex items-center gap-2 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium hover:border-green-400 hover:shadow-sm transition-all">
              📖 History & Info
            </Link>
                      <Link href="/learn-morse-code" className="flex items-center gap-2 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium hover:border-green-400 hover:shadow-sm transition-all">
              📖 Learn Morse Code
            </Link>
          
</div>
        </section>
      </div>
    </main>
  );
}
