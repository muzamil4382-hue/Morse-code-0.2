import Link from "next/link";
import { Radio } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-9 h-9 bg-green-600 rounded-xl">
                <Radio className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Morse<span className="text-green-400">Code</span>
                <span className="text-slate-500 text-xs">Translator</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              The most comprehensive free Morse code translator online. Convert text to Morse code, play audio, and learn with our interactive tools.
            </p>
          </div>

          {/* Translator Tools */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Tools</h3>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-sm text-slate-400 hover:text-green-400 transition-colors">Text to Morse Code</Link></li>
              <li><Link href="/morse-code-decoder" className="text-sm text-slate-400 hover:text-green-400 transition-colors">Morse Code Decoder</Link></li>
              <li><Link href="/binary-code-translator" className="text-sm text-slate-400 hover:text-green-400 transition-colors">Binary Translator</Link></li>
              <li><Link href="/morse-code-sounds" className="text-sm text-slate-400 hover:text-green-400 transition-colors">Morse Code Sounds</Link></li>
              <li><Link href="/morse-code-timing" className="text-sm text-slate-400 hover:text-green-400 transition-colors">Morse Code Timing</Link></li>
              <li><Link href="/morse-code-quiz" className="text-sm text-slate-400 hover:text-green-400 transition-colors">Morse Code Quiz</Link></li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Learn</h3>
            <ul className="space-y-2.5">
              <li><Link href="/morse-code-alphabet" className="text-sm text-slate-400 hover:text-green-400 transition-colors">Morse Code Alphabet</Link></li>
              <li><Link href="/morse-code-numbers" className="text-sm text-slate-400 hover:text-green-400 transition-colors">Morse Code Numbers</Link></li>
              <li><Link href="/learn-morse-code" className="text-sm text-slate-400 hover:text-green-400 transition-colors">How to Learn</Link></li>
              <li><Link href="/what-is-morse-code" className="text-sm text-slate-400 hover:text-green-400 transition-colors">What is Morse Code?</Link></li>
            </ul>
          </div>

          {/* Popular Words */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Popular Words</h3>
            <ul className="space-y-2.5">
              <li><Link href="/sos-morse-code" className="text-sm text-slate-400 hover:text-green-400 transition-colors">SOS in Morse Code</Link></li>
              <li><Link href="/hello-in-morse-code" className="text-sm text-slate-400 hover:text-green-400 transition-colors">Hello in Morse Code</Link></li>
              <li><Link href="/i-love-you-in-morse-code" className="text-sm text-slate-400 hover:text-green-400 transition-colors">I Love You in Morse Code</Link></li>
              <li><Link href="/yes-in-morse-code" className="text-sm text-slate-400 hover:text-green-400 transition-colors">Yes in Morse Code</Link></li>
              <li><Link href="/no-in-morse-code" className="text-sm text-slate-400 hover:text-green-400 transition-colors">No in Morse Code</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-sm text-slate-400 hover:text-green-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-slate-400 hover:text-green-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-sm text-slate-400 hover:text-green-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-slate-400 hover:text-green-400 transition-colors">Terms &amp; Conditions</Link></li>
              <li><Link href="/disclaimer" className="text-sm text-slate-400 hover:text-green-400 transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Morse Code Translator. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-slate-500 hover:text-green-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-sm text-slate-500 hover:text-green-400 transition-colors">Terms</Link>
            <Link href="/disclaimer" className="text-sm text-slate-500 hover:text-green-400 transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
