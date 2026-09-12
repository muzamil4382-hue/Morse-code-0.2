import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  generatePageMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateHowToSchema,
} from "@/lib/seo";

export const metadata: Metadata = generatePageMeta(
  "How to Learn Morse Code: Beginner Guide, Koch Method & Practice",
  "Learn Morse code step by step with sound-first practice, common-character training, mnemonics, the Koch and Farnsworth methods, copying exercises, timing, and a practical daily routine.",
  "/learn-morse-code",
  [
    "how to learn morse code",
    "learn morse code",
    "morse code for beginners",
    "morse code learning guide",
    "morse code practice",
    "koch method morse code",
    "farnsworth method morse code",
    "morse code listening practice",
  ]
);

const howToSchema = generateHowToSchema([
  {
    name: "Step 1: Learn the Morse Code Alphabet",
    text: "Start with the International Morse Code alphabet and learn characters as sounds and rhythms rather than relying only on a visual chart.",
  },
  {
    name: "Step 2: Learn a Small Set of Characters",
    text: "Begin with a manageable group of simple characters and add new ones as recognition becomes reliable.",
  },
  {
    name: "Step 3: Practice Short Words",
    text: "Combine familiar characters into short words and simple messages so recognition becomes practical instead of purely memorized.",
  },
  {
    name: "Step 4: Use Mnemonics Carefully",
    text: "Use memorable associations as a temporary aid, while gradually shifting toward direct recognition of each character's sound pattern.",
  },
  {
    name: "Step 5: Practice Listening",
    text: "Listen to Morse code regularly and train yourself to recognize complete character rhythms without counting individual dots and dashes.",
  },
  {
    name: "Step 6: Choose a Structured Method",
    text: "Use a structured approach such as Koch-style character introduction or Farnsworth timing to organize practice and manage spacing.",
  },
  {
    name: "Step 7: Test and Track Progress",
    text: "Use quizzes, copying exercises, and simple accuracy or speed goals to identify weak characters and measure improvement over time.",
  },
]);

export default function LearnMorseCodePage() {
  const faqSchema = generateFAQSchema([
    {
      question: "How long does it take to learn Morse code?",
      answer:
        "There is no single timeline. With regular practice, many beginners can learn the basic character set in weeks, while comfortable listening speed usually takes longer. Your results depend on practice frequency, method, starting speed, and the type of Morse you want to copy.",
    },
    {
      question: "What is the Koch method for learning Morse code?",
      answer:
        "The Koch method is a character-by-character training approach in which learners practice a small set of characters at a relatively high character speed and add new characters as recognition improves. The goal is to build direct character recognition rather than counting individual dots and dashes.",
    },
    {
      question: "What is Farnsworth timing?",
      answer:
        "Farnsworth timing keeps the individual characters relatively fast while adding more space between characters or words. This gives beginners extra processing time while helping them become familiar with faster character rhythms.",
    },
    {
      question: "What speed should I start practicing Morse code?",
      answer:
        "Choose a speed that lets you practice consistently without turning every character into a counting exercise. If you use a Koch-style approach, you can keep character speed higher and use wider spacing. If you are using another method, start comfortably and increase speed gradually.",
    },
    {
      question: "Should I learn Morse code as dots and dashes?",
      answer:
        "Dots and dashes are useful for reference, but listening practice should gradually move you toward recognizing the rhythm of complete characters. Sound-first practice helps reduce the habit of translating every dot and dash individually.",
    },
    {
      question: "Can I learn Morse code on my own?",
      answer:
        "Yes. A self-study routine can combine an alphabet reference, regular listening practice, copying exercises, a translator for checking work, and a quiz or progress log. External practice communities can also provide useful feedback and real-world copying practice.",
    },
  ]);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Learn Morse Code", url: "/learn-morse-code" },
  ]);

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-sm text-slate-500 mb-6"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="hover:text-green-600 transition-colors"
          >
            Home
          </Link>

          <span className="text-slate-400">/</span>

          <span className="text-slate-900 font-medium">
            Learn Morse Code
          </span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            How to Learn Morse Code
          </h1>

          <p className="text-lg text-slate-600">
            A comprehensive, step-by-step guide for complete beginners. Learn
            Morse code from zero to proficiency using proven methods, mnemonic
            tricks, and daily practice routines.
          </p>

          <p className="mt-4 text-base leading-7 text-slate-600">
            New to the subject? Start with our{" "}
            <Link
              href="/what-is-morse-code"
              className="font-semibold text-green-700 hover:underline"
            >
              guide to what Morse code is
            </Link>
            {" "}to understand the system before beginning structured practice.
          </p>
        </div>

        {/* Featured Guide Image */}
        <figure className="mb-12">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src="/images/blog/how-to-learn-morse-code.webp"
              alt="How to learn Morse code with a beginner-friendly step-by-step practice guide"
              width={1200}
              height={675}
              priority
              className="h-auto w-full"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
          <figcaption className="mt-3 text-center text-sm leading-6 text-slate-600">
            A practical visual guide to learning Morse code step by step, from character recognition to listening practice and speed building.
          </figcaption>
        </figure>

        {/* Steps */}
        <div className="space-y-8 mb-12">
          {[
            {
              num: 1,
              title: "Learn the Complete Morse Code Alphabet",
              content: (
                <>
                  <p>
                    Your first step is to become familiar with the
                    International Morse Code alphabet. Every letter from A to Z
                    is represented by a unique combination of dots (short
                    signals) and dashes (long signals). Start by reviewing the
                    complete{" "}
                    <Link
                      href="/morse-code-alphabet"
                      className="text-green-700 font-medium hover:underline"
                    >
                      Morse Code Alphabet
                    </Link>{" "}
                    chart. Don't try to memorize everything at once — just get
                    a feel for the overall system. Notice that simpler letters
                    like E (single dot) and T (single dash) are the shortest,
                    while less common letters like Q and J have four signals.
                    This is because Morse and Vail designed the code so that
                    the most frequently used letters are the quickest to
                    transmit, saving time and reducing errors over telegraph
                    lines.
                  </p>

                  <p>
                    Print out or bookmark the alphabet chart and keep it handy.
                    You'll refer to it constantly in the beginning.
                    Morse code uses two basic signal elements — short and long — combined with timing and spacing. That makes the system
                    compact, but successful learning depends on recognizing complete character patterns rather than treating
                    every message as a sequence of isolated dots and dashes. There are only 26
                    letters, 10 numbers, and a handful of punctuation marks to
                    learn, and many of them follow recognizable patterns. Once
                    you understand the letters, you can also study our{" "}
                    <Link
                      href="/morse-code-numbers"
                      className="text-green-700 font-medium hover:underline"
                    >
                      Morse Code Numbers
                    </Link>{" "}
                    guide to learn the digits 0–9.
                  </p>
                </>
              ),
            },

            {
              num: 2,
              title: "Master the Most Common Letters First",
              content: (
                <>
                  <p>
                    Not all characters need to be learned at once. A practical beginner strategy is to start with a small group of
                    simple, familiar characters and add more as recognition becomes reliable. E, T, A, I, N, O, S, and H
                    are often used as an introductory set, but exact character frequencies vary by language and text.
                    The real goal is fast, confident recognition rather than memorizing frequency statistics.
                  </p>

                  <p>
                    Here are the codes for these essential letters: E is a
                    single dot (.), T is a single dash (-), A is dot-dash
                    (.-), I is two dots (..), N is dash-dot (-.), O is three
                    dashes (---), S is three dots (...), and H is four dots
                    (....). Notice the patterns: E and T are the simplest (one
                    signal each), I and S extend the dot pattern, while N and O
                    use dashes. A bridges both worlds. Start with E and T, then
                    add A and N, then I and O, then S and H. Practice these
                    until you can recall them instantly without looking at the
                    chart.
                  </p>
                </>
              ),
            },

            {
              num: 3,
              title: "Practice with Short Words",
              content: (
                <>
                  <p>
                    Once you know the most common letters, start putting them
                    together in short words. This builds your reading speed and
                    helps you transition from recognizing individual
                    characters to reading words as wholes. Start with the
                    simplest words: "it" (.. -), "at" (.- -), "to" (- ---), "is"
                    (.. ...), "in" (.. -.), "an" (.- -.), "on" (--- -.), "no"
                    (-. ---), "so" (... ---), "as" (.- ...).
                  </p>

                  <p>
                    Then move on to slightly longer words: "the" (- .... .),
                    "and" (.- -. -..), "that" (- .... .- -), "this" (- .... ..
                    ...), "with" (.-- .. - ....). You'll notice that even with
                    just 8-10 letters, you can decode many common words. Use our{" "}
                    <Link
                      href="/"
                      className="text-green-700 font-medium hover:underline"
                    >
                      Morse Code Translator
                    </Link>{" "}
                    to practice — type a word, see the Morse code, then try to
                    write the code from memory and check your work. If you
                    already have Morse code and want to convert it back into
                    readable text, use our{" "}
                    <Link
                      href="/"
                      className="text-green-700 font-medium hover:underline"
                    >
                      Morse Code Translator
                    </Link>
                    .
                  </p>
                </>
              ),
            },

            {
              num: 4,
              title: "Use Mnemonic Devices",
              content: (
                <>
                  <p>
                    Mnemonic devices are memory aids that help you associate
                    each letter's code with something memorable. The more vivid
                    and personal the association, the better it works. Here are
                    some tried-and-true mnemonics for Morse code:
                  </p>

                  <p>
                    For E (.), think "Elmer Fudd's nose" — just one little dot.
                    For T (-), think "Tail" — one long dash. For A (.-), think
                    "A-bove" — a small peak going up. For N (-.), think "N-o" —
                    start with a negative (dash) then a small positive (dot).
                    For M (--), think "M-mountain" — two big peaks side by
                    side. For O (---), think "Oh my God!" — three long
                    exclamations. For S (...), think "S-snake" — three quick
                    hisses. For H (....), think "Hurry up!" — four rapid taps.
                  </p>

                  <p>
                    Create your own mnemonics for the remaining letters. The
                    best ones connect the sound or shape of the letter with the
                    rhythm of the dots and dashes. Silly, absurd, or emotionally
                    charged associations tend to be the most memorable.
                  </p>
                </>
              ),
            },

            {
              num: 5,
              title: "Practice Listening to Morse Code Audio",
              content: (
                <>
                  <p>
                    Reading Morse code from a chart is one skill; recognizing
                    it by ear is quite another. To become truly proficient, you
                    need to train your ears to identify characters by sound.
                    Start by listening to each letter individually at a slow
                    speed (5-10 WPM) using our{" "}
                    <Link
                      href="/morse-code-sounds"
                      className="text-green-700 font-medium hover:underline"
                    >
                      Morse Code Sounds
                    </Link>{" "}
                    resources and audio playback. Pay attention to the rhythm —
                    the relationship between the dot and dash lengths.
                  </p>

                  <p>
                    Once you can identify individual letters by ear, start
                    listening to short sequences of 2-3 letters, then whole
                    words. A critical aspect of listening practice is developing
                    your sense of timing. In Morse code, the space between
                    elements within a letter is equal to one dot, between
                    letters is three dots, and between words is seven dots. For
                    a deeper explanation of spacing and signal duration, see our{" "}
                    <Link
                      href="/morse-code-timing"
                      className="text-green-700 font-medium hover:underline"
                    >
                      Morse Code Timing
                    </Link>{" "}
                    reference. Set aside a short, repeatable block of time for listening
                    practice. Consistency is far more important than duration —
                    15 minutes every day will yield much better results than 3
                    hours once a week.
                  </p>
                </>
              ),
            },

            {
              num: "method",
              title: "Koch Method vs Farnsworth Method",
              content: (
                <figure className="my-4">
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <Image
                      src="/images/infographic/koch-vs-farnsworth-method.webp"
                      alt="Comparison infographic explaining the Koch method and Farnsworth method for learning Morse code, including character speed, spacing, and practice approach"
                      width={1200}
                      height={675}
                      className="h-auto w-full"
                      sizes="(max-width: 1024px) 100vw, 1024px"
                    />
                  </div>
                  <figcaption className="mt-3 text-center text-sm leading-6 text-slate-600">
                    The Koch method focuses on learning complete character sounds, while Farnsworth timing uses wider spacing to give beginners more processing time.
                  </figcaption>
                </figure>
              ),
            },

            {
              num: 6,
              title: "Use the Koch Method for Systematic Learning",
              content: (
                <>
                  <p>
                    The Koch method is a widely used structured approach to Morse code training. It introduces a small number of
                    characters and adds new ones as recognition improves. A key idea is to expose learners to the
                    characteristic sound of a character early, instead of teaching very slow dots and dashes that must
                    later be relearned at higher speeds.
                  </p>

                  <p>
                    In practice, a Koch-style lesson begins with a small set of characters presented at a relatively high character
                    speed. You copy what you hear, review the errors, and introduce additional characters as the current
                    set becomes familiar. Exact starting speeds, character sets, and accuracy thresholds can be adjusted
                    to suit the learner and the training program.
                  </p>

                  <p>
                    The main learning benefit is the emphasis on direct character recognition. Instead of consciously counting every dot
                    and dash, you gradually learn the rhythm of the complete character. With enough listening and copying
                    practice, familiar characters can become recognizable as distinct sound patterns. Use our{" "}
                    <Link
                      href="/morse-code-quiz"
                      className="text-green-700 font-medium hover:underline"
                    >
                      Morse Code Quiz
                    </Link>{" "}
                    to practice with this method.
                  </p>
                </>
              ),
            },

            {
              num: 7,
              title: "Test Yourself and Track Your Progress",
              content: (
                <>
                  <p>
                    Regular testing is essential for identifying weak spots and
                    maintaining motivation. Use our interactive Morse Code Quiz
                    to test yourself on individual characters, words, and even
                    full sentences. Track your scores over time to see your
                    improvement. Progress often feels uneven: some characters become automatic quickly while others need repeated exposure. Keep an
                    error log so you can spend more practice time on the characters you consistently confuse.
                  </p>

                  <p>
                    Set measurable goals that fit your starting point, such as recognizing a defined set of characters without a reference,
                    copying a short passage with fewer errors, or increasing your comfortable listening speed over time. Celebrate milestones along
                    the way — your first perfect score on the letter quiz, your
                    first 100% word decode, your first conversation in Morse
                    code. Joining an online community of Morse code learners
                    can provide accountability, encouragement, and practice
                    partners. Many amateur radio clubs offer free Morse code
                    practice sessions on the air. Remember: every expert was
                    once a beginner, and with daily practice, you'll be reading
                    Morse code fluently sooner than you think.
                  </p>
                </>
              ),
            },
          ].map((step) =>
            step.num === "method" ? (
              <div key={step.num}>
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h2>
                <div className="text-slate-700 leading-relaxed space-y-3">
                  {step.content}
                </div>
              </div>
            ) : (
              <div key={step.num} className="flex gap-5">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold">
                    {step.num}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3">
                    {step.title}
                  </h2>

                  <div className="text-slate-700 leading-relaxed space-y-3">
                    {step.content}
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Additional Resources
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/"
              className="p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all group"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors mb-1">
                🔤 Morse Code Translator
              </h3>

              <p className="text-sm text-slate-600">
                Practice translating text to Morse code and back, with audio
                playback to train your ears.
              </p>
            </Link>

            <Link
              href="/morse-code-alphabet"
              className="p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all group"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors mb-1">
                📋 Morse Code Alphabet
              </h3>

              <p className="text-sm text-slate-600">
                Complete A–Z Morse code alphabet chart with letters, numbers,
                punctuation, and interactive learning resources.
              </p>
            </Link>

            <Link
              href="/morse-code-quiz"
              className="p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all group"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors mb-1">
                🎯 Morse Code Quiz
              </h3>

              <p className="text-sm text-slate-600">
                Test your knowledge with interactive quizzes and track your
                progress over time.
              </p>
            </Link>

            <Link
              href="/morse-code-sounds"
              className="p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all group"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors mb-1">
                🔊 Morse Code Sounds
              </h3>

              <p className="text-sm text-slate-600">
                Practice Morse code audio and understand the timing, spacing, and listening skills used in
                sound-based training.
              </p>
            </Link>

            <Link
              href="/what-is-morse-code"
              className="p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all group"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors mb-1">
                📖 History & Background
              </h3>

              <p className="text-sm text-slate-600">
                Understand the fascinating history of Morse code and its modern
                applications.
              </p>
            </Link>

            <Link
              href="/"
              className="p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all group"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors mb-1">
                🔓 Morse Code Decoder
              </h3>

              <p className="text-sm text-slate-600">
                Use the translator to decode Morse code back into readable text and check unfamiliar character patterns.
              </p>
            </Link>

            <Link
              href="/morse-code-numbers"
              className="p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all group"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors mb-1">
                🔢 Numbers Guide
              </h3>

              <p className="text-sm text-slate-600">
                Complete reference for Morse code numerals 0-9 with the logical
                counting pattern.
              </p>
            </Link>

            <Link
              href="/morse-code-timing"
              className="p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all group"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors mb-1">
                ⏱️ Timing Reference
              </h3>

              <p className="text-sm text-slate-600">
                ITU-R M.1677 standard timing rules, WPM calculator, and
                Farnsworth method.
              </p>
            </Link>
          </div>
        </section>

        {/* Learning Roadmap Infographic */}
        <figure className="mb-12">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src="/images/infographic/learn-morse-code-roadmap.webp"
              alt="How to learn Morse code step-by-step roadmap for beginners, from learning characters and patterns to listening practice, timing, decoding words, and building speed"
              width={1200}
              height={675}
              className="h-auto w-full"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
          <figcaption className="mt-3 text-center text-sm leading-6 text-slate-600">
            A step-by-step Morse code learning roadmap, from recognizing basic characters to building listening speed and confidence.
          </figcaption>
        </figure>

        {/* Trusted External References */}
        <section className="mb-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Trusted Morse Code Learning References
          </h2>

          <p className="mb-5 leading-7 text-slate-700">
            Use our guide for a practical learning path, then compare terminology and standards with established
            organizations and training resources. These references are useful for deeper study of International Morse
            Code, operating practice, and structured listening exercises.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://www.itu.int/rec/R-REC-M.1677"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="rounded-xl border border-slate-200 bg-white p-5 hover:border-green-400 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-slate-900 mb-1">
                ITU-R Recommendation M.1677
              </h3>
              <p className="text-sm text-slate-600">
                The International Telecommunication Union reference for International Morse code.
              </p>
            </a>

            <a
              href="https://www.arrl.org/learning-morse-code"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="rounded-xl border border-slate-200 bg-white p-5 hover:border-green-400 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-slate-900 mb-1">
                ARRL: Learning Morse Code
              </h3>
              <p className="text-sm text-slate-600">
                Practical learning guidance and resources for people developing Morse code skills.
              </p>
            </a>

            <a
              href="https://lcwo.net/main/c"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="rounded-xl border border-slate-200 bg-white p-5 hover:border-green-400 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-slate-900 mb-1">
                Learn CW Online
              </h3>
              <p className="text-sm text-slate-600">
                Online exercises for character recognition, copying, and Morse code practice.
              </p>
            </a>

            <a
              href="https://cwops.org/cw-academy/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="rounded-xl border border-slate-200 bg-white p-5 hover:border-green-400 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-slate-900 mb-1">
                CWops CW Academy
              </h3>
              <p className="text-sm text-slate-600">
                Structured Morse code training resources for learners who want guided practice.
              </p>
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {[
              {
                q: "How long does it take to learn Morse code?",
                a: "There is no single timeline. With regular practice, many beginners can learn the basic character set in weeks, while comfortable listening speed usually takes longer. Your results depend on practice frequency, method, starting speed, and the type of Morse you want to copy.",
              },
              {
                q: "What is the Koch method?",
                a: "The Koch method introduces a small number of characters at a relatively high character speed and adds new characters as recognition improves. The goal is direct character recognition rather than counting individual dots and dashes.",
              },
              {
                q: "What is Farnsworth timing?",
                a: "Farnsworth timing keeps individual characters relatively fast while adding more space between characters or words, giving beginners extra processing time while they become familiar with faster character rhythms.",
              },
              {
                q: "What speed should I start at?",
                a: "Choose a speed that lets you practice consistently without turning every character into a counting exercise. A structured method can use faster character timing with wider spacing, while other learners may prefer a gradual increase.",
              },
              {
                q: "Should I learn Morse code as dots and dashes?",
                a: "Dots and dashes are useful as a reference, but listening practice should gradually move you toward recognizing complete character rhythms. This helps reduce the habit of translating every element individually.",
              },
              {
                q: "Can I learn Morse code on my own?",
                a: "Yes. Combine an alphabet reference, regular listening practice, copying exercises, a translator for checking work, and quizzes or progress tracking. External learning communities can also provide useful feedback.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="bg-white border border-slate-200 rounded-lg p-4 group"
              >
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                  {faq.q}

                  <span className="text-green-600 text-xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-slate-600 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}