import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Volume2,
  Copy,
  Download,
  ArrowDownUp,
  Zap,
  BookOpen,
  Headphones,
  Eye,
  Shuffle,
  Clock,
  Globe,
  Cpu,
  BarChart3,
  Type,
  Hash,
  Star,
  Settings,
} from "lucide-react";

const MORSE_CODE: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.",
  G: "--.", H: "....", I: "..", J: ".---", K: "-.-.", L: ".-..",
  M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
  S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
};

interface Props {
  children?: ReactNode;
}

export default function HomeContent({ children }: Props) {
  return (
    <>
      {/* ─── STATISTICS BAR ─── */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              stat: "26",
              label: "Letters (A-Z)",
              icon: (
                <Type className="w-5 h-5" />
              ),
            },
            {
              stat: "10",
              label: "Numbers (0-9)",
              icon: (
                <Hash className="w-5 h-5" />
              ),
            },
            {
              stat: "8",
              label: "Supported Punctuation",
              icon: (
                <Star className="w-5 h-5" />
              ),
            },
            {
              stat: "ITU-R M.1677",
              label: "International Standard",
              icon: (
                <Globe className="w-5 h-5" />
              ),
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
            >
              <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg flex items-center justify-center shrink-0">
                {item.icon}
              </div>

              <div>
                <div className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {item.stat}
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── HOW TO USE ─── */}

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            How to Use This Morse Code
            Translator
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Convert text to Morse code
            or decode Morse code to
            text in three simple
            steps. If you&apos;re new to
            Morse code, explore our{" "}
            <Link
              href="/learn-morse-code"
              className="text-green-700 hover:underline font-semibold"
            >
              Learn Morse Code Guide
            </Link>
            , view the{" "}
            <Link
              href="/morse-code-alphabet"
              className="text-green-700 hover:underline font-semibold"
            >
              Morse Code Alphabet
            </Link>
            , or understand{" "}
            <Link
              href="/morse-code-timing"
              className="text-green-700 hover:underline font-semibold"
            >
              Morse Code Timing
            </Link>
            .
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <Type className="w-7 h-7" />
              ),
              step: "Step 1",
              title: "Enter Your Message",
              desc: "Type or paste your text into the translator. You can use English letters, numbers, spaces, and supported punctuation.",
            },
            {
              icon: (
                <Zap className="w-7 h-7" />
              ),
              step: "Step 2",
              title: "Get Instant Translation",
              desc: "Your message is converted in real time using dots and dashes. Switch modes at any time to decode Morse code back into readable text.",
            },
            {
              icon: (
                <Headphones className="w-7 h-7" />
              ),
              step: "Step 3",
              title: "Play, Save, or Share",
              desc: "Listen to the Morse code, activate visual flash mode, copy the result, or save your translation as a TXT or WAV file.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:shadow-green-500/5 transition-all group"
            >
              <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-700 group-hover:text-white transition-colors">
                {item.icon}
              </div>

              <span className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wider">
                {item.step}
              </span>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* ─── MORSE CODE TRANSLATOR INFOGRAPHIC ─── */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-16">
        <figure>
          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <Image
              src="/images/home/morse-code-translator-guide.webp"
              alt="Morse code translator infographic showing how to convert text into dots and dashes and decode Morse code back into readable text"
              width={1600}
              height={1100}
              className="w-full h-auto"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>

          <figcaption className="mt-4 text-center text-sm sm:text-base text-slate-500 dark:text-slate-400">
            Use the Morse Code Translator to encode normal text into dots and dashes or decode a Morse code message back into readable text.
          </figcaption>
        </figure>
      </section>

      {/* ─── KEY FEATURES ─── */}

      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Features of Our Morse Code
              Translator
            </h2>

            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Translate, decode,
              listen, practice, and
              explore Morse code from
              one interactive tool.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: (
                  <Zap className="w-5 h-5" />
                ),
                title:
                  "Real-Time Translation",
                desc: "Convert text to Morse code and decode Morse code to text as you type.",
              },
              {
                icon: (
                  <Volume2 className="w-5 h-5" />
                ),
                title:
                  "Audio Playback",
                desc: "Listen with adjustable speed, frequency, and volume controls.",
              },
              {
                icon: (
                  <Eye className="w-5 h-5" />
                ),
                title:
                  "Visual Flash Mode",
                desc: "Visualize dots and dashes as short and long light signals.",
              },
              {
                icon: (
                  <Download className="w-5 h-5" />
                ),
                title:
                  "WAV Audio Download",
                desc: "Save your Morse code as a WAV audio file using your selected settings.",
              },
              {
                icon: (
                  <ArrowDownUp className="w-5 h-5" />
                ),
                title:
                  "Text and Morse Decoder",
                desc: "Switch between encoding text and decoding Morse code.",
              },
              {
                icon: (
                  <Settings className="w-5 h-5" />
                ),
                title:
                  "Adjustable Controls",
                desc: "Customize WPM speed, tone frequency, and audio volume.",
              },
              {
                icon: (
                  <Copy className="w-5 h-5" />
                ),
                title:
                  "Copy and Share",
                desc: "Copy your translation or use your device sharing options.",
              },
              {
                icon: (
                  <Shuffle className="w-5 h-5" />
                ),
                title:
                  "Random Practice Messages",
                desc: "Generate sample messages for decoding and listening practice.",
              },
              {
                icon: (
                  <BarChart3 className="w-5 h-5" />
                ),
                title:
                  "Character Counter",
                desc: "Track characters and words while entering your message.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-green-200 dark:hover:border-green-800 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg flex items-center justify-center shrink-0">
                    {feature.icon}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                      {feature.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── QUICK MORSE REFERENCE ─── */}

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Quick Morse Code Reference
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Browse common Morse code
            letters and numbers. For a
            complete reference, visit
            our{" "}
            <Link
              href="/morse-code-alphabet"
              className="text-green-700 hover:underline font-semibold"
            >
              Morse Code Alphabet
            </Link>{" "}
            and explore the{" "}
            <Link
              href="/morse-code-decoder"
              className="text-green-700 hover:underline font-semibold"
            >
              Morse Code Decoder
            </Link>
            .
          </p>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Type className="w-5 h-5 text-green-700" />
          Letters (A-Z)
        </h3>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-2.5 mb-8">
          {Object.entries(MORSE_CODE)
            .filter(([key]) =>
              /^[A-Z]$/.test(key)
            )
            .map(([letter, code]) => (
              <Link
                key={letter}
                href={`/morse-code-alphabet#letter-${letter.toLowerCase()}`}
                className="group relative flex flex-col items-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-green-300 dark:hover:border-green-700 hover:shadow-md transition-all"
              >
                <span className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-green-700">
                  {letter}
                </span>

                <span className="text-xs font-mono text-green-700 dark:text-green-400 mt-1">
                  {code}
                </span>
              </Link>
            ))}
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Hash className="w-5 h-5 text-green-700" />
          Numbers (0-9)
        </h3>

        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2.5 mb-8">
          {Object.entries(MORSE_CODE)
            .filter(([key]) =>
              /^[0-9]$/.test(key)
            )
            .map(([number, code]) => (
              <Link
                key={number}
                href={`/morse-code-numbers#number-${number}`}
                className="group relative flex flex-col items-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-green-300 dark:hover:border-green-700 hover:shadow-md transition-all"
              >
                <span className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-green-700">
                  {number}
                </span>

                <span className="text-xs font-mono text-green-700 dark:text-green-400 mt-1">
                  {code}
                </span>
              </Link>
            ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/morse-code-alphabet"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            View Complete Morse Code
            Alphabet

            <BookOpen className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─── WHAT IS MORSE CODE ─── */}

      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              What Is Morse Code?
            </h2>

            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Morse code is a
              telecommunication system
              that represents
              characters with short and
              long signals. It is
              closely associated with
              Samuel F. B. Morse and
              Alfred Vail, whose work
              helped develop the
              electric telegraph in
              the nineteenth century.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                History and Origins
              </h3>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Morse code became
                historically important
                because the electric
                telegraph made it
                possible to transmit
                information across
                long distances much
                faster than physical
                transportation. The
                famous first public
                telegraph message,
                “What hath God
                wrought,” was sent in
                1844 between
                Washington, D.C. and
                Baltimore.
              </p>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                International Morse
                Code later provided a
                more standardized
                system for
                international
                communication. Today,
                the ITU publishes the
                Morse code standard
                used as the reference
                for modern
                International Morse
                Code.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                How Morse Code Works
              </h3>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                A dot represents one
                unit of time and a
                dash represents three
                units. The gap between
                elements of the same
                character is one unit,
                between characters is
                three units, and
                between words is seven
                units.
              </p>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Morse transmission
                speed is commonly
                measured in words per
                minute, or WPM. The
                word “PARIS” is
                traditionally used as
                the standard reference
                word for calculating
                Morse speed.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/what-is-morse-code"
              className="text-green-700 dark:text-green-400 font-medium hover:underline"
            >
              Read the Complete History
              of Morse Code →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── MORSE TIMING ─── */}

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Morse Code Timing Rules
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            International Morse Code
            uses a proportional timing
            system. Understanding
            these timing units is
            essential for accurate
            sending and receiving.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="text-left p-4 font-semibold">
                  Element
                </th>

                <th className="text-left p-4 font-semibold">
                  Duration
                </th>

                <th className="text-left p-4 font-semibold">
                  Description
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {[
                [
                  "Dot (dit)",
                  "1 unit",
                  "The basic unit of Morse code timing.",
                ],
                [
                  "Dash (dah)",
                  "3 units",
                  "Three times the duration of a dot.",
                ],
                [
                  "Intra-character gap",
                  "1 unit",
                  "Space between elements in one character.",
                ],
                [
                  "Inter-character gap",
                  "3 units",
                  "Space between complete characters.",
                ],
                [
                  "Inter-word gap",
                  "7 units",
                  "Space separating words.",
                ],
              ].map(
                (
                  [element, duration, description],
                  i
                ) => (
                  <tr key={i}>
                    <td className="p-4 font-medium text-slate-900 dark:text-white">
                      {element}
                    </td>

                    <td className="p-4 font-mono text-green-700 dark:text-green-400 font-semibold">
                      {duration}
                    </td>

                    <td className="p-4 text-slate-600 dark:text-slate-400">
                      {description}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-700" />
              Farnsworth Method
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Farnsworth timing is a
              training method that
              sends characters at a
              relatively high character
              speed while increasing
              the spacing between them.
              This helps learners
              recognize the sound and
              rhythm of complete
              characters.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-green-700" />
              Koch Method
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              The Koch method teaches
              Morse code by introducing
              a small number of
              characters and gradually
              adding more as recognition
              improves. The goal is to
              recognize the sound of
              each character rather
              than counting dots and
              dashes visually.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/morse-code-timing"
            className="text-green-700 dark:text-green-400 font-medium hover:underline"
          >
            Learn More About Morse
            Code Timing →
          </Link>
        </div>
      </section>


      {/* ─── MORSE CODE TIMING INFOGRAPHIC ─── */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-16">
        <figure>
          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <Image
              src="/images/home/morse-code-timing-rules.webp"
              alt="Morse code timing infographic showing dot and dash duration, character spacing, word spacing, and standard timing ratios"
              width={1600}
              height={1100}
              className="w-full h-auto"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>

          <figcaption className="mt-4 text-center text-sm sm:text-base text-slate-500 dark:text-slate-400">
            Standard Morse code timing uses fixed ratios: one unit for a dot, three for a dash, three between characters, and seven between words.
          </figcaption>
        </figure>
      </section>

      {/* Interactive sections are loaded separately */}
      {children}

      {/* ─── MODERN USES OF MORSE CODE INFOGRAPHIC ─── */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-16">
        <figure>
          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <Image
              src="/images/home/modern-uses-of-morse-code.webp"
              alt="Modern uses of Morse code infographic showing amateur radio, emergency signaling, education, accessibility, and visual communication"
              width={1600}
              height={1100}
              className="w-full h-auto"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>

          <figcaption className="mt-4 text-center text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Morse code remains useful for amateur radio, emergency signaling, education, accessibility, and simple communication using sound or light.
          </figcaption>
        </figure>
      </section>

      {/* ─── RELATED TOOLS ─── */}

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Explore More Morse Code
            Tools
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore the Morse code alphabet, numbers, sounds, timing, decoding,
            learning guides, quizzes, and popular Morse code words and phrases.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              href: "/morse-code-alphabet",
              title:
                "Morse Code Alphabet",
              desc: "Complete A-Z Morse code reference.",
            },
            {
              href: "/morse-code-decoder",
              title:
                "Morse Code Decoder",
              desc: "Decode dots and dashes into readable text.",
            },
            {
              href: "/morse-code-timing",
              title:
                "Morse Code Timing",
              desc: "Learn standard timing rules and WPM.",
            },
            {
              href: "/morse-code-numbers",
              title:
                "Morse Code Numbers",
              desc: "Learn all numbers from 0 to 9.",
            },
            {
              href: "/sos-morse-code",
              title:
                "SOS in Morse Code",
              desc: "Learn the history and pattern of SOS.",
            },
            {
              href: "/hello-in-morse-code",
              title:
                "Hello in Morse Code",
              desc: "Learn how to write and send HELLO.",
            },
            {
              href: "/i-love-you-in-morse-code",
              title:
                "I Love You in Morse Code",
              desc: "Translate the popular phrase into Morse.",
            },
            {
              href: "/morse-code-quiz",
              title:
                "Morse Code Quiz",
              desc: "Test your Morse code knowledge.",
            },
            {
              href: "/learn-morse-code",
              title:
                "Learn Morse Code",
              desc: "Step-by-step learning resources for beginners.",
            },
            {
              href: "/morse-code-sounds",
              title: "Morse Code Sounds",
              desc: "Understand how dots and dashes sound in Morse code.",
            },
            {
              href: "/what-is-morse-code",
              title: "What Is Morse Code?",
              desc: "Learn what Morse code is and how the signaling system works.",
            },
            {
              href: "/binary-code-translator",
              title: "Binary Code Translator",
              desc: "Convert text and binary code with a separate online tool.",
            },
            {
              href: "/hi-in-morse-code",
              title: "Hi in Morse Code",
              desc: "See the Morse code pattern for the short greeting HI.",
            },
            {
              href: "/help-me-in-morse-code",
              title: "Help Me in Morse Code",
              desc: "Translate the emergency phrase HELP ME into Morse code.",
            },
            {
              href: "/yes-in-morse-code",
              title: "Yes in Morse Code",
              desc: "Learn how to write YES using dots and dashes.",
            },
            {
              href: "/no-in-morse-code",
              title: "No in Morse Code",
              desc: "Learn how to write NO using dots and dashes.",
            },
          ].map((tool, i) => (
            <Link
              key={i}
              href={tool.href}
              className="group block bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 hover:border-green-300 dark:hover:border-green-700 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors mb-1">
                {tool.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {tool.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}

      <section className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 dark:from-green-800 dark:via-green-900 dark:to-emerald-950 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Start Translating Morse
            Code Now
          </h2>

          <p className="text-lg text-green-100 dark:text-green-200 max-w-2xl mx-auto mb-8">
            Use the free translator to
            encode text, decode Morse
            code, listen to audio,
            practice signal timing,
            and explore the complete
            Morse Code Alphabet.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#translator"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-green-700 rounded-lg font-bold hover:bg-green-50 transition-colors"
            >
              <Zap className="w-4 h-4" />
              Use the Translator
            </a>

            <Link
              href="/morse-code-alphabet"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-500/30 border border-green-400/30 text-white rounded-lg font-bold hover:bg-green-500/40 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Learn the Alphabet
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}