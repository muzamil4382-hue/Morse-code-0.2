import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMeta, generateFAQSchema, generateBreadcrumbSchema, generateHowToSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta(
  "How to Learn Morse Code - Complete Beginner Guide",
  "Step-by-step Morse code learning guide covering seven proven methods. Starts with the 8 most frequent letters covering 65% of English text, teaches mnemonic memory devices, introduces the Koch method for systematic full-speed learning, and provides daily practice routines with progress tracking recommendations.",
  "/learn-morse-code",
  [
    "learn morse code", "how to learn morse code", "morse code tutorial", "morse code for beginners", "morse code learning guide"
  ]
);
const howToSchema = generateHowToSchema([
  { name: "Step 1: Learn the Alphabet", text: "Start by memorizing the Morse code alphabet using the complete A-Z chart. Focus on the most common letters first." },
  { name: "Step 2: Master the Most Common Letters", text: "Focus on E, T, A, I, N, O, S, and H — these cover 33% of English text." },
  { name: "Step 3: Practice with Short Words", text: "Build fluency by translating simple words like SOS, CAT, DOG, HELLO." },
  { name: "Step 4: Use Mnemonic Devices", text: "Create memory aids to help you recall each letter's code pattern." },
  { name: "Step 5: Practice Listening Daily", text: "Train your ear to recognize Morse code by listening at slow speeds and gradually increasing." },
  { name: "Step 6: Use the Koch Method", text: "Add one new character at a time at full speed, achieving 90% accuracy before moving on." },
  { name: "Step 7: Test and Track Progress", text: "Use quizzes and practice tests to identify weak areas and track improvement." },
]);

export default function LearnMorseCodePage() {
  const faqSchema = generateFAQSchema([
    {
      question: "How long does it take to learn Morse code?",
      answer: "With consistent daily practice of 15-30 minutes, most people can learn all 26 letters and 10 numbers in about 2-4 weeks. Reaching comfortable conversational speed (15-20 WPM) typically takes 2-3 months. The Koch method can accelerate this timeline significantly.",
    },
    {
      question: "What is the Koch method for learning Morse code?",
      answer: "The Koch method teaches Morse code by starting with just two characters at full speed (typically 20 WPM). Once you can copy those two characters at 90% accuracy for one minute, you add a third. This process continues until all characters are learned. This method avoids building a 'lookup table' in your brain and instead develops instant character recognition.",
    },
    {
      question: "What speed should I start practicing Morse code?",
      answer: "If using the Koch method, start at 15-20 WPM with a character speed of 15-20 WPM and a much slower effective speed (long spacing between characters). For traditional methods, start at 5 WPM and gradually increase. The key is consistency — 15 minutes daily is far more effective than 3 hours once a week.",
    },
    {
      question: "Can I learn Morse code on my own?",
      answer: "Absolutely! Morse code is one of the easiest skills to learn independently. All you need is a reference chart, an audio source (like our online translator), and consistent practice. Many people have reached 20+ WPM entirely through self-study.",
    },
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Learn Morse Code", url: "//learn-morse-code" },
  ]);

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-medium">Learn Morse Code</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            How to Learn Morse Code
          </h1>
          <p className="text-lg text-slate-600">
            A comprehensive, step-by-step guide for complete beginners. Learn Morse code from zero to
            proficiency using proven methods, mnemonic tricks, and daily practice routines.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-12">
          {[
            {
              num: 1,
              title: "Learn the Complete Morse Code Alphabet",
              content: `Your first step is to become familiar with the International Morse Code alphabet. Every letter from A to Z is represented by a unique combination of dots (short signals) and dashes (long signals). Start by reviewing the complete alphabet chart on our Morse Code Alphabet page. Don't try to memorize everything at once — just get a feel for the overall system. Notice that simpler letters like E (single dot) and T (single dash) are the shortest, while less common letters like Q and J have four signals. This is because Morse and Vail designed the code so that the most frequently used letters are the quickest to transmit, saving time and reducing errors over telegraph lines.

              Print out or bookmark the alphabet chart and keep it handy. You'll refer to it constantly in the beginning. Understanding that Morse code is essentially a binary system — just dots and dashes arranged in different patterns — makes it less intimidating. There are only 26 letters, 10 numbers, and a handful of punctuation marks to learn, and many of them follow recognizable patterns.`
            },
            {
              num: 2,
              title: "Master the Most Common Letters First",
              content: `Not all letters are created equal in English. The eight most common letters — E, T, A, I, N, O, S, and H — account for approximately 33% of all English text. If you learn just these eight letters, you'll be able to recognize about one-third of any Morse code message. This is a powerful motivator because you see progress immediately.

              Here are the codes for these essential letters: E is a single dot (.), T is a single dash (-), A is dot-dash (.-), I is two dots (..), N is dash-dot (-.), O is three dashes (---), S is three dots (...), and H is four dots (....). Notice the patterns: E and T are the simplest (one signal each), I and S extend the dot pattern, while N and O use dashes. A bridges both worlds. Start with E and T, then add A and N, then I and O, then S and H. Practice these until you can recall them instantly without looking at the chart.`
            },
            {
              num: 3,
              title: "Practice with Short Words",
              content: `Once you know the most common letters, start putting them together in short words. This builds your reading speed and helps you transition from recognizing individual characters to reading words as wholes. Start with the simplest words: "it" (.. -), "at" (.- -), "to" (- ---), "is" (.. ...), "in" (.. -.), "an" (.- -.), "on" (--- -.), "no" (-. ---), "so" (... ---), "as" (.- ...).

              Then move on to slightly longer words: "the" (- .... .), "and" (.- -. -..), "that" (- .... .- -), "this" (- .... .. ...), "with" (.-- .. - ....). You'll notice that even with just 8-10 letters, you can decode many common words. Use our online Morse code translator to practice — type a word, see the Morse code, then try to write the code from memory and check your work. As you learn more letters, gradually tackle longer and more complex words.`
            },
            {
              num: 4,
              title: "Use Mnemonic Devices",
              content: `Mnemonic devices are memory aids that help you associate each letter's code with something memorable. The more vivid and personal the association, the better it works. Here are some tried-and-true mnemonics for Morse code:

              For E (.), think "Elmer Fudd's nose" — just one little dot. For T (-), think "Tail" — one long dash. For A (.-), think "A-bove" — a small peak going up. For N (-.), think "N-o" — start with a negative (dash) then a small positive (dot). For M (--), think "M-mountain" — two big peaks side by side. For O (---), think "Oh my God!" — three long exclamations. For S (...), think "S-snake" — three quick hisses. For H (....), think "Hurry up!" — four rapid taps.

              Create your own mnemonics for the remaining letters. The best ones connect the sound or shape of the letter with the rhythm of the dots and dashes. Silly, absurd, or emotionally charged associations tend to be the most memorable.`
            },
            {
              num: 5,
              title: "Practice Listening to Morse Code Audio",
              content: `Reading Morse code from a chart is one skill; recognizing it by ear is quite another. To become truly proficient, you need to train your ears to identify characters by sound. Start by listening to each letter individually at a slow speed (5-10 WPM) using our online translator's audio playback feature. Pay attention to the rhythm — the relationship between the dot and dash lengths.

              Once you can identify individual letters by ear, start listening to short sequences of 2-3 letters, then whole words. A critical aspect of listening practice is developing your sense of timing. In Morse code, the space between elements within a letter is equal to one dot, between letters is three dots, and between words is seven dots. This timing is what allows you to distinguish between, say, E-E (..  = I) and A (.-). Set aside 15 minutes daily for listening practice. Consistency is far more important than duration — 15 minutes every day will yield much better results than 3 hours once a week.`
            },
            {
              num: 6,
              title: "Use the Koch Method for Systematic Learning",
              content: `The Koch method, developed by German psychologist Ludwig Koch in the 1930s, is widely regarded as the most effective approach to learning Morse code. Unlike traditional methods that start at slow speeds and gradually increase, the Koch method starts at your target speed from the very beginning.

              Here's how it works: You start with just two characters (typically K and M) at full speed (15-20 WPM). You listen to random sequences of these two characters and write down what you hear. When you can copy them at 90% accuracy for one full minute, you add a third character. The process repeats — add a new character only when you've mastered the current set at 90% accuracy.

              The genius of this method is that you never build a "counting" habit (counting dots and dashes to figure out the letter). Instead, you develop instant, reflexive recognition of each character's sound pattern. This is how experienced operators actually read Morse code — they don't "decode" it letter by letter; they recognize each character's rhythm the way you recognize a spoken word. Use our morse code quiz to practice with this method.`
            },
            {
              num: 7,
              title: "Test Yourself and Track Your Progress",
              content: `Regular testing is essential for identifying weak spots and maintaining motivation. Use our interactive Morse Code Quiz to test yourself on individual characters, words, and even full sentences. Track your scores over time to see your improvement. Most learners find that progress is slow at first, then accelerates dramatically around the 2-3 week mark as the characters start to become automatic.

              Set specific, measurable goals: "I want to copy all 26 letters at 90% accuracy by the end of month one" or "I want to reach 15 WPM by month three." Celebrate milestones along the way — your first perfect score on the letter quiz, your first 100% word decode, your first conversation in Morse code. Joining an online community of Morse code learners can provide accountability, encouragement, and practice partners. Many amateur radio clubs offer free Morse code practice sessions on the air. Remember: every expert was once a beginner, and with daily practice, you'll be reading Morse code fluently sooner than you think.`
            },
          ].map((step) => (
            <div key={step.num} className="flex gap-5">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold">
                  {step.num}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h2>
                <div className="text-slate-700 leading-relaxed space-y-3">
                  {step.content.split("\n\n").map((p, i) => (
                    <p key={i}>{p.trim()}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Additional Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/" className="p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all group">
              <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors mb-1">🔤 Morse Code Translator</h3>
              <p className="text-sm text-slate-600">Practice translating text to Morse code and back, with audio playback to train your ears.</p>
            </Link>
            <Link href="/morse-code-alphabet" className="p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all group">
              <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors mb-1">📋 Alphabet Chart</h3>
              <p className="text-sm text-slate-600">Complete visual reference with all letters, numbers, and punctuation in Morse code.</p>
            </Link>
            <Link href="/morse-code-alphabet" className="p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all group">
  <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors mb-1">
    📋 Morse Code Alphabet
  </h3>
  <p className="text-sm text-slate-600">
    Complete A–Z Morse code alphabet chart with letters, numbers, punctuation, and interactive learning resources.
  </p>
</Link>
            <Link href="/morse-code-quiz" className="p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all group">
              <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors mb-1">🎯 Morse Code Quiz</h3>
              <p className="text-sm text-slate-600">Test your knowledge with interactive quizzes and track your progress over time.</p>
            </Link>
            <Link href="/morse-code-sounds" className="p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all group">
              <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors mb-1">🔊 Morse Code Sounds</h3>
              <p className="text-sm text-slate-600">Learn about Morse code audio, frequency ranges, and timing rules.</p>
            </Link>
            <Link href="/what-is-morse-code" className="p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all group">
              <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors mb-1">📖 History & Background</h3>
              <p className="text-sm text-slate-600">Understand the fascinating history of Morse code and its modern applications.</p>
            </Link>
            <Link href="/morse-code-decoder" className="p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all group">
              <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors mb-1">🔓 Morse Code Decoder</h3>
              <p className="text-sm text-slate-600">Dedicated tool for converting Morse code back to readable text with character analysis.</p>
            </Link>
            <Link href="/morse-code-numbers" className="p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all group">
              <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors mb-1">🔢 Numbers Guide</h3>
              <p className="text-sm text-slate-600">Complete reference for Morse code numerals 0-9 with the logical counting pattern.</p>
            </Link>
            <Link href="/morse-code-timing" className="p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all group">
              <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors mb-1">⏱️ Timing Reference</h3>
              <p className="text-sm text-slate-600">ITU-R M.1677 standard timing rules, WPM calculator, and Farnsworth method.</p>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: "How long does it take to learn Morse code?", a: "With consistent daily practice of 15-30 minutes, most people can learn all 26 letters and 10 numbers in about 2-4 weeks. Reaching comfortable conversational speed (15-20 WPM) typically takes 2-3 months." },
              { q: "What is the Koch method?", a: "The Koch method starts with two characters at full speed (20 WPM). Once you achieve 90% accuracy, you add a third character. This builds instant recognition rather than counting habits." },
              { q: "What speed should I start at?", a: "Start at 5-10 WPM for traditional learning, or 15-20 WPM for the Koch method. The key is daily consistency — 15 minutes daily beats 3 hours once a week." },
              { q: "Can I learn Morse code on my own?", a: "Absolutely! Morse code is one of the easiest skills to learn independently. All you need is a reference chart, audio practice (like our online translator), and consistent daily practice." },
            ].map((faq, i) => (
              <details key={i} className="bg-white border border-slate-200 rounded-lg p-4 group">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-green-600 text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
