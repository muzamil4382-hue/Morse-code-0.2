import Link from "next/link";
import { Radio } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600">
                <Radio className="h-5 w-5 text-white" />
              </div>

              <span className="text-lg font-bold text-white">
                Morse<span className="text-green-300">Code</span>
                <span className="text-xs text-slate-400">
                  Translator
                </span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-slate-300">
              A free online Morse Code Translator and educational resource.
              Convert text to Morse code, decode dots and dashes, explore
              reference charts, and learn with practical tools and guides.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Tools
            </h3>

            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="text-sm text-slate-300 transition-colors hover:text-green-300"
                >
                  Text to Morse Code
                </Link>
              </li>

              <li>
                <Link
                  href="/morse-code-decoder"
                  className="text-sm text-slate-300 transition-colors hover:text-green-300"
                >
                  Morse Code Decoder
                </Link>
              </li>

              <li>
                <Link
                  href="/binary-code-translator"
                  className="text-sm text-slate-300 transition-colors hover:text-green-300"
                >
                  Binary Translator
                </Link>
              </li>

              <li>
                <Link
                  href="/morse-code-sounds"
                  className="text-sm text-slate-300 transition-colors hover:text-green-300"
                >
                  Morse Code Sounds
                </Link>
              </li>

              <li>
                <Link
                  href="/morse-code-timing"
                  className="text-sm text-slate-300 transition-colors hover:text-green-300"
                >
                  Morse Code Timing
                </Link>
              </li>

              <li>
                <Link
                  href="/morse-code-quiz"
                  className="text-sm text-slate-300 transition-colors hover:text-green-300"
                >
                  Morse Code Quiz
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Learn
            </h3>

            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/morse-code-alphabet"
                  className="text-sm text-slate-300 transition-colors hover:text-green-300"
                >
                  Morse Code Alphabet
                </Link>
              </li>

              <li>
                <Link
                  href="/morse-code-numbers"
                  className="text-sm text-slate-300 transition-colors hover:text-green-300"
                >
                  Morse Code Numbers
                </Link>
              </li>

              <li>
                <Link
                  href="/learn-morse-code"
                  className="text-sm text-slate-300 transition-colors hover:text-green-300"
                >
                  How to Learn
                </Link>
              </li>

              <li>
                <Link
                  href="/what-is-morse-code"
                  className="text-sm text-slate-300 transition-colors hover:text-green-300"
                >
                  What is Morse Code?
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Words */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Popular Words
            </h3>

            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/sos-morse-code"
                  className="text-sm text-slate-300 transition-colors hover:text-green-300"
                >
                  SOS in Morse Code
                </Link>
              </li>

              <li>
                <Link
                  href="/hello-in-morse-code"
                  className="text-sm text-slate-300 transition-colors hover:text-green-300"
                >
                  Hello in Morse Code
                </Link>
              </li>

              <li>
                <Link
                  href="/i-love-you-in-morse-code"
                  className="text-sm text-slate-300 transition-colors hover:text-green-300"
                >
                  I Love You in Morse Code
                </Link>
              </li>

              <li>
                <Link
                  href="/yes-in-morse-code"
                  className="text-sm text-slate-300 transition-colors hover:text-green-300"
                >
                  Yes in Morse Code
                </Link>
              </li>

              <li>
                <Link
                  href="/no-in-morse-code"
                  className="text-sm text-slate-300 transition-colors hover:text-green-300"
                >
                  No in Morse Code
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>

            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-300 transition-colors hover:text-green-300"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/editorial-policy"
                  className="text-sm text-slate-300 transition-colors hover:text-green-300"
                >
                  Editorial Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-sm text-slate-300 transition-colors hover:text-green-300"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-slate-300 transition-colors hover:text-green-300"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="text-sm text-slate-300 transition-colors hover:text-green-300"
                >
                  Terms &amp; Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="/disclaimer"
                  className="text-sm text-slate-300 transition-colors hover:text-green-300"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-700 pt-8 md:flex-row">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Morse Code Translator. All
            rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              href="/about"
              className="text-sm text-slate-400 transition-colors hover:text-green-300"
            >
              About
            </Link>

            <Link
              href="/editorial-policy"
              className="text-sm text-slate-400 transition-colors hover:text-green-300"
            >
              Editorial Policy
            </Link>

            <Link
              href="/privacy"
              className="text-sm text-slate-400 transition-colors hover:text-green-300"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-sm text-slate-400 transition-colors hover:text-green-300"
            >
              Terms
            </Link>

            <Link
              href="/disclaimer"
              className="text-sm text-slate-400 transition-colors hover:text-green-300"
            >
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}