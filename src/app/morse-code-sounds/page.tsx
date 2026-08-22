import type { Metadata } from "next";
import Link from "next/link";
import {
  generatePageMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";

const faqs = [
  {
    question: "What do Morse code sounds mean?",
    answer:
      "Morse code sounds represent short and long signal elements. A short sound is called a dot or dit, while a long sound is called a dash or dah. Different combinations form letters, numbers, punctuation, and other Morse symbols.",
  },
  {
    question: "What frequency is used for Morse code sounds?",
    answer:
      "There is no single mandatory audio frequency for Morse code. A tone around 600 Hz is commonly used for practice because it is comfortable to hear, while many Morse code oscillators and training tools allow the pitch to be adjusted.",
  },
  {
    question: "How long is a Morse code dot?",
    answer:
      "Morse code timing is measured in units. A dot lasts for 1 time unit, while a dash lasts for 3 units. At 20 WPM using standard PARIS timing, one dot unit is approximately 60 milliseconds.",
  },
  {
    question: "How long is a Morse code dash?",
    answer:
      "A dash lasts three times as long as a dot. If one dot unit is 60 milliseconds, a dash is approximately 180 milliseconds.",
  },
  {
    question: "What is the gap between Morse code letters?",
    answer:
      "The standard gap between two letters is 3 dot units. The gap between elements within the same letter is 1 dot unit, while the gap between words is 7 dot units.",
  },
  {
    question: "What does PARIS mean in Morse code speed?",
    answer:
      "PARIS is a standard reference word used to calculate Morse code speed in words per minute. Under standard timing, PARIS represents 50 dot units, allowing Morse code speed to be measured consistently.",
  },
  {
    question: "How can I learn Morse code by sound?",
    answer:
      "Start by listening to individual character patterns and gradually build recognition. Avoid counting every dot and dash at higher speeds. Regular listening practice, correct timing, and character recognition exercises can help develop faster auditory recognition.",
  },
  {
    question: "What is the difference between a Morse code sound and written Morse code?",
    answer:
      "Written Morse code displays dots and dashes visually. Audio Morse code communicates the same information using short and long tones separated by precisely timed gaps.",
  },
  {
    question: "Can I listen to Morse code online?",
    answer:
      "Yes. You can use the Morse Code Translator on this website to convert text into Morse code and use its audio playback controls to hear the corresponding Morse signals.",
  },
  {
    question: "Is Morse code still used today?",
    answer:
      "Yes. Although Morse code is no longer a primary method for most commercial communication, it remains relevant in amateur radio, aviation and maritime history, emergency signaling, education, accessibility discussions, and recreational communication.",
  },
];

export const metadata: Metadata = generatePageMeta(
  "Morse Code Sounds | Audio, Frequency, Timing & Listening Guide",
  "Learn how Morse code sounds work with dots, dashes, audio frequency, pitch, WPM, PARIS timing, character gaps, word spacing, listening practice, and Morse code recognition techniques.",
  "/morse-code-sounds",
  [
    "morse code sounds",
    "morse code audio",
    "morse code sound",
    "morse code frequency",
    "morse code tone",
    "morse code pitch",
    "morse code timing",
    "morse code audio frequency",
    "listen to morse code",
    "morse code practice",
    "morse code wpm",
    "dot and dash sounds",
    "morse code dits and dahs",
    "morse code audio practice",
    "international morse code",
  ]
);

const internalLinks = [
  {
    href: "/",
    icon: "↔",
    title: "Morse Code Translator",
    text: "Convert text to Morse code and listen to the generated audio.",
  },
  {
    href: "/morse-code-decoder",
    icon: "⌁",
    title: "Morse Code Decoder",
    text: "Decode dots and dashes back into readable text.",
  },
  {
    href: "/morse-code-alphabet",
    icon: "A–Z",
    title: "Morse Code Alphabet",
    text: "Study the complete alphabet and individual Morse patterns.",
  },
  {
    href: "/morse-code-numbers",
    icon: "0–9",
    title: "Morse Code Numbers",
    text: "Learn how all ten digits are represented using five signals.",
  },
  {
    href: "/morse-code-timing",
    icon: "⏱",
    title: "Morse Code Timing",
    text: "Understand dots, dashes, character gaps, word gaps, and WPM.",
  },
  {
    href: "/learn-morse-code",
    icon: "↗",
    title: "Learn Morse Code",
    text: "Follow a structured approach for memorizing and recognizing Morse.",
  },
  {
    href: "/morse-code-quiz",
    icon: "✓",
    title: "Morse Code Quiz",
    text: "Test your knowledge and recognition of Morse code characters.",
  },
  {
    href: "/sos-morse-code",
    icon: "SOS",
    title: "SOS Morse Code",
    text: "Learn why ... --- ... became the internationally recognized distress signal.",
  },
  {
    href: "/what-is-morse-code",
    icon: "?",
    title: "What Is Morse Code?",
    text: "Explore the history, purpose, technology, and modern uses of Morse code.",
  },
];

export default function MorseCodeSoundsPage() {
  const faqSchema = generateFAQSchema(faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Morse Code Sounds",
      url: "/morse-code-sounds",
    },
  ]);

  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="w-full border-b border-green-950/10 bg-gradient-to-br from-green-800 via-green-800 to-emerald-900 py-12 sm:py-14 md:py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Morse Code Sounds
          </h1>

          <p className="mx-auto mt-4 max-w-4xl text-base leading-7 text-green-50/90 sm:text-lg sm:leading-8">
            Learn how <strong>Morse code audio</strong> works through short
            and long tones, sound frequency, pitch, WPM, dots, dashes,
            character spacing, word gaps, and practical listening techniques.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-green-50/90">
            <span className="inline-flex items-center gap-2">
              ⚡ Dot &amp; Dash Audio
            </span>

            <span className="inline-flex items-center gap-2">
              🎧 Listening Practice
            </span>

            <span className="inline-flex items-center gap-2">
              ⏱ Standard Timing
            </span>

            <span className="inline-flex items-center gap-2">
              ♫ Frequency &amp; Pitch
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* =====================================================
            INTRODUCTION
        ====================================================== */}

        <section className="mb-16">
          <div className="max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-green-700 dark:text-green-400">
              Morse Code Audio Guide
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Understanding How Morse Code Sounds Work
            </h2>

            <div className="mt-6 space-y-5 text-base leading-8 text-slate-600 dark:text-slate-300">
              <p>
                Morse code can be understood visually as dots and dashes, but
                its original communication system was fundamentally based on{" "}
                <strong>signals, timing, and rhythm</strong>. When Morse code
                is transmitted as audio, a short tone represents a{" "}
                <strong>dot</strong>, also called a <strong>dit</strong>, while
                a longer tone represents a <strong>dash</strong>, also called a{" "}
                <strong>dah</strong>.
              </p>

              <p>
                Every character in the{" "}
                <Link
                  href="/morse-code-alphabet"
                  className="font-semibold text-green-700 underline underline-offset-4 hover:text-green-800 dark:text-green-400"
                >
                  Morse Code Alphabet
                </Link>{" "}
                has its own pattern. For example, the letter E is represented
                by one short signal, while T is represented by one long signal.
                More complex characters combine multiple dots and dashes into
                recognizable audio patterns.
              </p>

              <p>
                The goal of listening practice is not to count every dot and
                dash forever. With repeated exposure, experienced learners
                begin recognizing the overall rhythm of a character. You can
                generate and listen to custom messages using the{" "}
                <Link
                  href="/"
                  className="font-semibold text-green-700 underline underline-offset-4 hover:text-green-800 dark:text-green-400"
                >
                  Morse Code Translator
                </Link>
                , then verify unfamiliar signals with the{" "}
                <Link
                  href="/morse-code-decoder"
                  className="font-semibold text-green-700 underline underline-offset-4 hover:text-green-800 dark:text-green-400"
                >
                  Morse Code Decoder
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            QUICK FACTS
        ====================================================== */}

        <section className="mb-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                1 Unit
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Standard duration of one Morse code dot.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                3 Units
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Standard duration of a dash and the gap between letters.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                7 Units
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Standard timing relationship used between words.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                50 Units
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Timing reference associated with the standard word PARIS.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            DOT DASH
        ====================================================== */}

        <section className="mb-16">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Dots, Dashes and Morse Code Rhythm
            </h2>

            <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
              The difference between a dot and dash is based primarily on{" "}
              <strong>duration</strong>. Correct timing is just as important as
              the sound itself. If the timing relationship changes too much,
              the listener may have difficulty identifying where one element,
              letter, or word ends.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-green-200 bg-green-50 p-6 dark:border-green-900/50 dark:bg-green-950/20">
              <span className="text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-400">
                Short Signal
              </span>

              <h3 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                Dot / Dit
              </h3>

              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                A dot lasts for one timing unit. It is the shortest sound
                element used in International Morse Code.
              </p>

              <div className="mt-5 rounded-xl border border-green-200 bg-white p-4 font-mono text-xl font-bold text-green-700 dark:border-green-900/50 dark:bg-slate-900 dark:text-green-400">
                .
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Long Signal
              </span>

              <h3 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                Dash / Dah
              </h3>

              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                A dash lasts for three timing units, making it exactly three
                times the duration of a standard dot.
              </p>

              <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xl font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
                -
              </div>
            </div>
          </div>

          <p className="mt-6 max-w-4xl leading-8 text-slate-600 dark:text-slate-300">
            To understand how these patterns form complete characters, browse
            the full{" "}
            <Link
              href="/morse-code-alphabet"
              className="font-semibold text-green-700 underline underline-offset-4 hover:text-green-800 dark:text-green-400"
            >
              A–Z Morse Code Alphabet
            </Link>{" "}
            or study{" "}
            <Link
              href="/morse-code-numbers"
              className="font-semibold text-green-700 underline underline-offset-4 hover:text-green-800 dark:text-green-400"
            >
              Morse Code Numbers from 0–9
            </Link>
            .
          </p>
        </section>

        {/* =====================================================
            FREQUENCY
        ====================================================== */}

        <section className="mb-16 border-t border-slate-200 pt-16 dark:border-slate-800">
          <div className="max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-green-700 dark:text-green-400">
              Audio Frequency
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Morse Code Frequency and Audio Pitch
            </h2>

            <div className="mt-5 space-y-5 leading-8 text-slate-600 dark:text-slate-300">
              <p>
                Morse code does not require one fixed audio pitch. The
                information is carried by the{" "}
                <strong>pattern and timing of the signal</strong>, rather than
                by a specific frequency. Different radios, oscillators,
                software applications, and training tools can use different
                tones.
              </p>

              <p>
                For practice, tones around the middle of the audible range are
                commonly comfortable for extended listening. A setting near{" "}
                <strong>600 Hz</strong> is often used by Morse code training
                tools because it produces a clear tone without being extremely
                low or high.
              </p>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="grid border-b border-slate-200 bg-slate-50 text-sm font-bold text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-white md:grid-cols-[180px_1fr]">
              <div className="p-4">Example Range</div>
              <div className="border-t border-slate-200 p-4 md:border-l md:border-t-0 dark:border-slate-800">
                Listening Character
              </div>
            </div>

            {[
              {
                range: "Lower pitch",
                text: "A deeper audio tone that may feel less sharp during listening.",
              },
              {
                range: "Around 600 Hz",
                text: "A balanced practice pitch commonly used for clear Morse code training.",
              },
              {
                range: "Higher pitch",
                text: "A brighter tone that can improve perceived contrast for some listeners.",
              },
            ].map((item) => (
              <div
                key={item.range}
                className="grid border-b border-slate-200 last:border-b-0 dark:border-slate-800 md:grid-cols-[180px_1fr]"
              >
                <div className="p-4 font-semibold text-green-700 dark:text-green-400">
                  {item.range}
                </div>

                <div className="border-t border-slate-200 p-4 leading-7 text-slate-600 md:border-l md:border-t-0 dark:border-slate-800 dark:text-slate-300">
                  {item.text}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 leading-8 text-slate-600 dark:text-slate-300">
            You can experiment with audio playback through the{" "}
            <Link
              href="/"
              className="font-semibold text-green-700 underline underline-offset-4 hover:text-green-800 dark:text-green-400"
            >
              Morse Code Translator
            </Link>
            , where text can be converted into Morse code and played as audio.
          </p>
        </section>

        {/* =====================================================
            TIMING
        ====================================================== */}

        <section className="mb-16 border-t border-slate-200 pt-16 dark:border-slate-800">
          <div className="max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-green-700 dark:text-green-400">
              International Morse Timing
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              The 1–3–7 Timing Relationship
            </h2>

            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
              Morse code timing is based on a simple unit system. A dot is the
              fundamental measurement, and the duration of dashes and spaces is
              calculated relative to that dot.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["Dot", "1 Unit"],
              ["Dash", "3 Units"],
              ["Element Gap", "1 Unit"],
              ["Letter Gap", "3 Units"],
              ["Word Gap", "7 Units"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  {label}
                </div>

                <div className="mt-2 text-xl font-bold text-green-700 dark:text-green-400">
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6 dark:border-green-900/50 dark:bg-green-950/20">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Example: 20 WPM Timing
            </h3>

            <div className="mt-4 space-y-2 font-mono text-sm leading-7 text-slate-700 dark:text-slate-300">
              <p>Dot = approximately 60 milliseconds</p>
              <p>Dash = approximately 180 milliseconds</p>
              <p>Letter gap = approximately 180 milliseconds</p>
              <p>Word gap = approximately 420 milliseconds</p>
            </div>

            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
              These values follow the standard timing relationship derived from
              WPM. For detailed explanations and speed calculations, visit the{" "}
              <Link
                href="/morse-code-timing"
                className="font-semibold text-green-700 underline underline-offset-4 hover:text-green-800 dark:text-green-400"
              >
                complete Morse Code Timing guide
              </Link>
              .
            </p>
          </div>
        </section>

        {/* =====================================================
            PARIS
        ====================================================== */}

        <section className="mb-16 border-t border-slate-200 pt-16 dark:border-slate-800">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Why Morse Code Speed Uses the Word PARIS
            </h2>

            <div className="mt-5 space-y-5 leading-8 text-slate-600 dark:text-slate-300">
              <p>
                Morse code speed is commonly measured in{" "}
                <strong>words per minute (WPM)</strong>. The word{" "}
                <strong>PARIS</strong> is traditionally used as a timing
                reference because, under standard Morse timing, it represents{" "}
                <strong>50 dot units</strong>.
              </p>

              <p>
                This creates a consistent mathematical relationship between WPM
                and the duration of one dot. A commonly used formula is:
              </p>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 font-mono text-center text-lg font-bold text-green-700 dark:border-slate-800 dark:bg-slate-900 dark:text-green-400">
                Dot duration (ms) = 1200 ÷ WPM
              </div>

              <p>
                At 20 WPM, this calculation gives approximately{" "}
                <strong>60 milliseconds per dot</strong>. At 10 WPM, one dot
                is approximately 120 milliseconds. This relationship makes it
                possible to scale the entire Morse code timing system as speed
                changes.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            LEARNING BY SOUND
        ====================================================== */}

        <section className="mb-16 border-t border-slate-200 pt-16 dark:border-slate-800">
          <div className="max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-green-700 dark:text-green-400">
              Listening Practice
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              How to Learn Morse Code by Listening
            </h2>

            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
              Learning Morse code visually and learning it by sound are related
              but different skills. Visual study helps you understand the
              symbols, while listening practice develops faster recognition of
              the rhythm associated with each character.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {[
              {
                number: "01",
                title: "Learn the Character Sounds",
                text: "Begin with a small number of characters and focus on recognizing the complete sound pattern instead of manually counting dots and dashes.",
              },
              {
                number: "02",
                title: "Keep Timing Consistent",
                text: "A clear timing relationship helps your brain distinguish dots, dashes, letters, and words. Practice with standard spacing whenever possible.",
              },
              {
                number: "03",
                title: "Increase Difficulty Gradually",
                text: "Start with comfortable practice sessions, then gradually increase the amount of text, character variety, or transmission speed.",
              },
              {
                number: "04",
                title: "Test Recognition Regularly",
                text: "Use interactive exercises to identify gaps in your knowledge and revisit characters that are difficult to recognize by ear.",
              },
            ].map((item) => (
              <article
                key={item.number}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-green-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-green-800"
              >
                <div className="text-sm font-bold text-green-700 dark:text-green-400">
                  {item.number}
                </div>

                <h3 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                  {item.text}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-8 max-w-4xl leading-8 text-slate-600 dark:text-slate-300">
            For a structured learning path, continue with{" "}
            <Link
              href="/learn-morse-code"
              className="font-semibold text-green-700 underline underline-offset-4 hover:text-green-800 dark:text-green-400"
            >
              Learn Morse Code
            </Link>
            . Once you are comfortable with the alphabet, test your recognition
            using the{" "}
            <Link
              href="/morse-code-quiz"
              className="font-semibold text-green-700 underline underline-offset-4 hover:text-green-800 dark:text-green-400"
            >
              Morse Code Quiz
            </Link>
            .
          </p>
        </section>

        {/* =====================================================
            CONTEXTUAL LEARNING
        ====================================================== */}

        <section className="mb-16 border-t border-slate-200 pt-16 dark:border-slate-800">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Morse Code Sounds in Real Communication
            </h2>

            <div className="mt-5 space-y-5 leading-8 text-slate-600 dark:text-slate-300">
              <p>
                Morse code developed as a communication system for transmitting
                information through timed electrical signals. Over time, the
                system became closely associated with the telegraph, radio
                communication, amateur radio, maritime communication, aviation
                history, and emergency signaling.
              </p>

              <p>
                One of the best-known Morse patterns is{" "}
                <Link
                  href="/sos-morse-code"
                  className="font-semibold text-green-700 underline underline-offset-4 hover:text-green-800 dark:text-green-400"
                >
                  SOS: ... --- ...
                </Link>
                . Its simple rhythm consists of three short signals, three long
                signals, and three short signals.
              </p>

              <p>
                Understanding audio also helps when decoding a message. If you
                hear an unfamiliar pattern, you can compare it with the{" "}
                <Link
                  href="/morse-code-alphabet"
                  className="font-semibold text-green-700 underline underline-offset-4 hover:text-green-800 dark:text-green-400"
                >
                  Morse alphabet reference
                </Link>{" "}
                or enter the written dots and dashes into the{" "}
                <Link
                  href="/morse-code-decoder"
                  className="font-semibold text-green-700 underline underline-offset-4 hover:text-green-800 dark:text-green-400"
                >
                  Morse Code Decoder
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            FAQ
        ====================================================== */}

        <section className="mb-16 border-t border-slate-200 pt-16 dark:border-slate-800">
          <div className="max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-green-700 dark:text-green-400">
              Common Questions
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Morse Code Sounds FAQ
            </h2>

            <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
              Common questions about Morse code audio, tone frequency, pitch,
              timing, WPM, dots, dashes, spacing, and listening practice.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-5 font-bold text-slate-900 dark:text-white">
                  <span>{faq.question}</span>

                  <span className="shrink-0 text-xl font-normal text-green-700 transition-transform group-open:rotate-45 dark:text-green-400">
                    +
                  </span>
                </summary>

                <div className="px-5 pb-5">
                  <p className="leading-8 text-slate-600 dark:text-slate-300">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* =====================================================
            EXPLORE MORE
        ====================================================== */}

        <section className="border-t border-slate-200 pt-16 dark:border-slate-800">
          <div className="max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-green-700 dark:text-green-400">
              Related Resources
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Continue Learning Morse Code
            </h2>

            <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
              Explore related tools, references, learning guides, character
              charts, timing explanations, and interactive practice resources.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {internalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-green-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-green-800"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-green-50 text-sm font-bold text-green-700 dark:bg-green-950/40 dark:text-green-400">
                    {item.icon}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 transition group-hover:text-green-700 dark:text-white dark:group-hover:text-green-400">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {item.text}
                    </p>

                    <span className="mt-4 inline-flex text-sm font-semibold text-green-700 dark:text-green-400">
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* =====================================================
          FINAL CTA – BEFORE FOOTER
      ====================================================== */}

      <section className="w-full bg-gradient-to-r from-green-800 to-emerald-800 py-14 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Hear Morse Code in Action?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-green-50/90">
            Convert your own message into International Morse Code, listen to
            the dots and dashes, adjust the playback settings, and build your
            recognition skills through practical listening.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-bold text-green-800 transition hover:bg-green-50"
            >
              Open Morse Code Translator →
            </Link>

            <Link
              href="/learn-morse-code"
              className="inline-flex items-center justify-center rounded-xl border border-green-300/60 px-6 py-3 font-bold text-white transition hover:bg-white/10"
            >
              Learn Morse Code
            </Link>

            <Link
              href="/morse-code-quiz"
              className="inline-flex items-center justify-center rounded-xl border border-green-300/60 px-6 py-3 font-bold text-white transition hover:bg-white/10"
            >
              Take Quiz
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}