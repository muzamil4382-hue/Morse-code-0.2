import Link from "next/link";
import type { ReactNode } from "react";
import {
  Radio,
  Clock,
  Sparkles,
  ArrowRight,
  HelpCircle,
  BookOpen,
  Volume2,
  Sliders,
  AlertCircle,
  ExternalLink as ExtIcon,
  CheckCircle2,
  Zap,
  Globe,
  Compass,
  Lightbulb,
  Cpu,
  Layers,
  FileText,
  ShieldAlert,
  Settings,
  Flame,
  Activity,
  Award,
  Terminal,
  Type
} from "lucide-react";

/* --- UI/UX EXPERT STYLING SYSTEM --- */

const sectionBaseClass =
  "relative mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8 border-b border-green-900/10 dark:border-green-500/10 transition-colors duration-300";

const sectionLightClass = `${sectionBaseClass} bg-slate-50/50 dark:bg-slate-950/40`;
const sectionAltClass = `${sectionBaseClass} bg-green-50/40 dark:bg-slate-900/60`;

const headingClass =
  "text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl lg:text-4xl text-center mb-4";

const leadTextClass =
  "text-center text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 mb-12 max-w-3xl mx-auto font-medium";

const bodyClass =
  "mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-normal";

const cardClass =
  "group relative overflow-hidden rounded-2xl border border-green-600/10 bg-white p-6 shadow-sm backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:border-green-600/30 hover:bg-green-50/20 hover:shadow-xl hover:shadow-green-600/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/80 dark:hover:border-green-500/30";

const gridCardClass =
  "group relative overflow-hidden rounded-2xl border border-green-600/10 bg-white p-6 shadow-sm backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:border-green-600/30 hover:bg-green-50/20 hover:shadow-xl hover:shadow-green-600/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/80 flex flex-col justify-between";

const linkClass =
  "inline-flex items-center gap-1 font-semibold text-green-700 underline decoration-green-400/40 decoration-2 underline-offset-4 transition-colors hover:text-green-800 hover:decoration-green-600 dark:text-green-400 dark:hover:text-green-300";

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClass}
    >
      {children}
      <ExtIcon className="inline-block h-3 w-3 opacity-70" />
    </a>
  );
}

export const howToSteps = [
  {
    name: "Pick a direction",
    text: "Choose whether you want to turn your code into text or you have text which you want to be translated into morse.",
  },
  {
    name: "Paste the input",
    text: "In input bar, paste your text or code or simply type it yourself.",
  },
  {
    name: "Use Audio",
    text: "Use the audio beats you already have or generate using our Audio Generator",
  },
  {
    name: "Save the output",
    text: "You can save, share, download the output, you can also swap between input and output.",
  },
];

export const faqs = [
  {
    question: "What is Morse Code?",
    answer:
      "Morse code is a communication code that represents letters, numbers and punctuation with combinations of dots and dashes, separated by precise timing.",
  },
  {
    question: "What is the difference between International Morse code and American Morse code?",
    answer:
      "International Morse is the standardized form used worldwide today. American Morse was an earlier telegraph code used primarily in the United States and has different patterns and timing conventions.",
  },
  {
    question: "How can I learn Morse code effectively?",
    answer:
      "Learn characters as sounds rather than visual dot-and-dash strings, practice consistently, start with a small set of characters, and gradually increase listening speed.",
  },
  {
    question: "Where is Morse code still used today?",
    answer:
      "Morse code is still used by amateur radio operators, in education and hobbies, for some aviation navigation identifiers, accessibility experiments, games and cultural applications.",
  },
  {
    question: "What characters does this Morse Code Translator support?",
    answer:
      "The translator supports English letters, numbers, common punctuation and Morse audio features provided by the tool.",
  },
  {
    question: "Can I copy or share my Morse code translation?",
    answer:
      "Yes. The translator provides output that can be copied and used for sharing or further practice.",
  },
];

const alphabet = [
  ["A", ".-", "di-dah", "ab-BOT"],
  ["B", "-...", "dah-di-di-dit", "BO-hi-mi-a"],
  ["C", "-.-.", "dah-di-dah-dit", "CO-ca-CO-la"],
  ["D", "-..", "dah-di-dit", "DAN-ger-ous"],
  ["E", ".", "dit", "ECH"],
  ["F", "..-.", "di-di-dah-dit", "fi-la-DEL-phia"],
  ["G", "--.", "dah-dah-dit", "GO-ING-to"],
  ["H", "....", "di-di-di-dit", "hi-de-ho-down"],
  ["I", "..", "di-dit", "IN-SECT"],
  ["J", ".---", "di-dah-dah-dah", "ja-BO-CA-DA"],
  ["K", "-.-", "dah-di-dah", "kan-KA-roo"],
  ["L", ".-..", "di-dah-di-dit", "le-MON-ad-ed"],
  ["M", "--", "dah-dah", "MO-ON"],
  ["N", "-.", "dah-dit", "NURse"],
  ["O", "---", "dah-dah-dah", "OVER-LORD"],
  ["P", ".--.", "di-dah-dah-dit", "pe-TRO-le-um"],
  ["Q", "--.-", "dah-dah-di-dah", "QUE-BE-COIS"],
  ["R", ".-.", "di-dah-dit", "re-TAR-ded"],
  ["S", "...", "di-di-dit", "SUL-FUR-ic"],
  ["T", "-", "dah", "TOE"],
  ["U", "..-", "di-di-dah", "u-ni-CORN"],
  ["V", "...-", "di-di-di-dah", "vi-o-lin-IST"],
  ["W", ".--", "di-dah-dah", "wa-TER-MELon"],
  ["X", "-..-", "dah-di-di-dah", "X-RA-RA-X"],
  ["Y", "-.--", "dah-di-dah-dah", "YANK-ee-DO-DLE"],
  ["Z", "--..", "dah-dah-di-dit", "ZOO-LOG-i-cal"],
];

const numbers = [
  ["0", "-----"], ["1", ".----"], ["2", "..---"], ["3", "...--"], ["4", "....-"],
  ["5", "....."], ["6", "-...."], ["7", "--..."], ["8", "---.."], ["9", "----."],
];

const punctuation = [
  [".", ".-.-.-"], [",", "--..--"], ["?", "..--.."], ["'", ".----."],
  ["!", "-.-.--"], ["/", "-..-."], ["(", "-.--."], [")", "-.--.-"],
  ["&", ".-..."], [":", "---..."], [";", "-.-.-."], ["=", "-...-"],
  ["+", ".-.-."], ["-", "-....-"], ["_", "..--.-"], ['"', ".-..-."],
  ["$", "...-..-"], ["@", ".--.-."],
];

const mirrorPairs = [
  ["A", ".-", "N", "-."],
  ["B", "-...", "V", "...-"],
  ["D", "-..", "U", "..-"],
  ["F", "..-.", "L", ".-.."],
  ["G", "--.", "W", ".--"],
  ["Q", "--.-", "Y", "-.--"],
];

const prosigns = [
  ["AR", ".-.-.", "End of message / end of transmission"],
  ["AS", ".-...", "Wait / stand by"],
  ["SK", "...-.-", "End of contact"],
  ["BT", "-...-", "Break / separator"],
  ["SOS", "...---...", "International distress signal"],
];

const qCodes = [
  ["QRL", "Is this frequency in use?"],
  ["QRZ", "Who is calling me?"],
  ["QRS", "Send more slowly."],
  ["QRT", "Stop sending / stop transmission."],
  ["QRU", "Have you anything for me?"],
  ["QRV", "I am ready."],
  ["QRX", "Wait / I will call again."],
  ["QSB", "Are my signals fading?"],
  ["QSL", "I acknowledge receipt."],
  ["QSO", "Can you communicate with ...? / A contact."],
];

const settings = [
  ["Speed / WPM", "Controls how quickly Morse characters are played or practiced. Higher WPM produces faster character timing."],
  ["Frequency", "Controls the audio tone used for Morse playback. It changes pitch, not the Morse character itself."],
  ["Volume", "Controls playback loudness on supported audio output."],
  ["Light / Flash", "Uses visual flashes to represent Morse timing. Short flashes correspond to dots and longer flashes to dashes."],
  ["Sound", "Enables or disables audible Morse playback."],
  ["Vibrate", "Uses device vibration where browser and device support it."],
  ["Repeat", "Repeats the generated Morse sequence so you can listen and practice again."],
];

const faqLinks = [
  ["/what-is-morse-code", "What is Morse Code?"],
  ["/learn-morse-code", "Learn Morse Code"],
  ["/morse-code-alphabet", "Morse Code Alphabet"],
];

export default function HomeContent() {
  return (
    <main className="w-full bg-slate-50 dark:bg-slate-950 antialiased selection:bg-green-600 selection:text-white">

      {/* 1. What is Morse Code? */}
      <section id="translator" className={sectionLightClass}>
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-1 text-xs font-semibold text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 ring-1 ring-green-600/20">
            <Radio className="h-3.5 w-3.5 text-green-600 dark:text-green-400" /> Fundamentals
          </span>
        </div>
        <h2 className={headingClass}>What is Morse Code?</h2>
        <p className={leadTextClass}>
          In 1844, Samuel Morse and his partner formed a binary system where you can turn letters
          into coding with almost no effort. His method was based on binary system where there are
          only 2 options: On/Off. He used dots and dashes for this purpose
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Dot</h3>
            <p className={bodyClass}>
              The small pitches or beats are known as dots. Dots (dits) are short signals lasting only one time unit.
            </p>
          </div>

          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Activity className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Dashes</h3>
            <p className={bodyClass}>
              The long pitches or beats are known as dashes. Dashes (dahs) are long signals lasting 3 time units.
            </p>
          </div>

          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Pause/Space</h3>
            <p className={bodyClass}>
              Pause of 1 time unit indicates space between characters. Similarly, a pause of 3 time units for
              space between letters and 7 time units for space between two different words.
            </p>
          </div>

          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Volume2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Audio</h3>
            <p className={bodyClass}>
              Morse code can also be used in audio format. Dots become short beats, dashes are indicated by longer beats, and short pauses indicate gap/space.
            </p>
          </div>
        </div>

        <div className={`mt-8 ${cardClass}`}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Benefits</h3>
          </div>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Using <Link href="/what-is-morse-code" className={linkClass}>morse code</Link>, we can turn our text into codes and simple beats! Imagine listening to a random beat
            which gives you a secret message. Also, morse code is built easy for easy communication. For example,
            most common words in English like “E” are given small notations so that one can remember and type them
            easily in no time. E is represented by a single dot .
          </p>
          <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 border-t border-slate-200 pt-4 dark:border-slate-800">
            <span>For the standardized International Morse reference, see</span>
            <ExternalLink href="https://www.itu.int/rec/R-REC-M.1677-1-200910-I">
              ITU Recommendation M.1677
            </ExternalLink>.
          </p>
        </div>
      </section>

      {/* 2. When and who invented morse code */}
      <section className={sectionAltClass}>
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-1 text-xs font-semibold text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 ring-1 ring-green-600/20">
            <Clock className="h-3.5 w-3.5 text-green-600 dark:text-green-400" /> History Timeline
          </span>
        </div>
        <h2 className={headingClass}>When and Who Invented Morse Code</h2>
        <p className={leadTextClass}>
          Morse code was developed during the 1830s by Samuel Morse and his partner Alfred Vail.
        </p>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Clock className="h-6 w-6" />
            </div>
            <span className="inline-block rounded-md bg-green-600/10 border border-green-600/20 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-green-700 dark:bg-green-950 dark:text-green-400">
              PHASE 01: 1837-1838
            </span>
            <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">Phase 01</h3>
            <p className={bodyClass}>
              From 1837 to 1838: Samuel Morse and Alfred Vail created the early version of the code for their electrical telegraph system.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Zap className="h-6 w-6" />
            </div>
            <span className="inline-block rounded-md bg-green-600/10 border border-green-600/20 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-green-700 dark:bg-green-950 dark:text-green-400">
              PHASE 02: 1844
            </span>
            <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">Phase 02</h3>
            <p className={bodyClass}>
              Year 1844: The first famous public telegraph message (&quot;What hath God wrought?&quot;) was sent using the system from Washington, D.C. to Baltimore.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Globe className="h-6 w-6" />
            </div>
            <span className="inline-block rounded-md bg-green-600/10 border border-green-600/20 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-green-700 dark:bg-green-950 dark:text-green-400">
              PHASE 03: 1851
            </span>
            <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">Phase 03</h3>
            <p className={bodyClass}>
              1851: International Morse Code was created in Europe to handle letters with accent marks.
            </p>
          </div>
        </div>

        <div className={`mt-6 ${cardClass}`}>
          <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            The historical record also credits Alfred Vail with major work on the improved telegraph apparatus
            and the alphabetic code. The Smithsonian Institution Archives documents Vail&apos;s role in developing
            the alpha code used with the electromagnetic telegraph.{" "}
            <ExternalLink href="https://siarchives.si.edu/blog/forgotten-history-alfred-vail-and-samuel-morse">
              Smithsonian Institution Archives
            </ExternalLink>
          </p>
        </div>
      </section>

      {/* 3. How to translate Morse code step by step */}
      <section className={sectionLightClass}>
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-1 text-xs font-semibold text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 ring-1 ring-green-600/20">
            <Compass className="h-3.5 w-3.5 text-green-600 dark:text-green-400" /> Guide
          </span>
        </div>
        <h2 className={headingClass}>How to Translate Morse Code Step by Step</h2>
        <p className={leadTextClass}>
          Follow these simple steps to easily translate and practice Morse code signals.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className={cardClass}>
            <div className="flex items-center justify-between">
              <span className="text-4xl font-black text-green-600/20 dark:text-green-400/20">01</span>
              <div className="h-2.5 w-2.5 rounded-full bg-green-600 shadow-sm"></div>
            </div>
            <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">Pick a direction</h3>
            <p className={bodyClass}>
              Choose whether you want to turn your code into text or you have text which you want to be translated into morse.
              (Limitation: Only English alphabets, numbers, punctuations and audio beats are supported.)
            </p>
          </div>

          <div className={cardClass}>
            <div className="flex items-center justify-between">
              <span className="text-4xl font-black text-green-600/20 dark:text-green-400/20">02</span>
              <div className="h-2.5 w-2.5 rounded-full bg-green-600 shadow-sm"></div>
            </div>
            <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">Paste the input</h3>
            <p className={bodyClass}>
              In input bar, paste your text or code or simply type it yourself.
            </p>
          </div>

          <div className={cardClass}>
            <div className="flex items-center justify-between">
              <span className="text-4xl font-black text-green-600/20 dark:text-green-400/20">03</span>
              <div className="h-2.5 w-2.5 rounded-full bg-green-600 shadow-sm"></div>
            </div>
            <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">Use Audio</h3>
            <p className={bodyClass}>
              Use the audio beats you already have or generate using our Audio Generator
            </p>
          </div>

          <div className={cardClass}>
            <div className="flex items-center justify-between">
              <span className="text-4xl font-black text-green-600/20 dark:text-green-400/20">04</span>
              <div className="h-2.5 w-2.5 rounded-full bg-green-600 shadow-sm"></div>
            </div>
            <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">Save the output</h3>
            <p className={bodyClass}>
              You can save, share, download the output, you can also swap between input and output.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Learn to code with Morse Code Translator */}
      <section className={sectionAltClass}>
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-1 text-xs font-semibold text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 ring-1 ring-green-600/20">
            <BookOpen className="h-3.5 w-3.5 text-green-600 dark:text-green-400" /> Interactive Learning
          </span>
        </div>
        <h2 className={headingClass}>Learn to Code with Morse Code Translator</h2>
        <p className={leadTextClass}>
          By using our <Link href="/learn-morse-code" className={linkClass}>free web application</Link>, you can convert morse code into text, and text into morse
          code instantly. Within no time, our tool generates your output and you can use it by copying it,
          saving or sharing it to others!
        </p>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Read the Pattern</h3>
            <p className={bodyClass}>
              Our tool supports different modes to make this more interesting.
            </p>
          </div>

          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Activity className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Tap the Rhythm</h3>
            <p className={bodyClass}>
              Imagine coding to be as easy as tapping Piano buttons. In audio generation mode, you can tap and
              pause for small or longer beats and dashes which give you a custom made Morse Code audio.
            </p>
          </div>

          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Practice Live</h3>
            <p className={bodyClass}>
              You can also tap it using our telegraph typing tool. You can decode live signals within no time.
              Simple, Easy and 100% Private.
            </p>
          </div>
        </div>
      </section>

      {/* 5. When to Use This Morse Code Translator */}
      <section className={sectionLightClass}>
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-1 text-xs font-semibold text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 ring-1 ring-green-600/20">
            <Globe className="h-3.5 w-3.5 text-green-600 dark:text-green-400" /> Practical Uses
          </span>
        </div>
        <h2 className={headingClass}>When to Use This Morse Code Translator</h2>
        <p className={leadTextClass}>
          Today, we can learn morse code as a cultural heritage and as a hobby too.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Terminal className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Telegraph</h3>
            <p className={bodyClass}>
              In ancient times, it was first used by Samuel F. B Morse’s electric telegraph. Codes were recorded
              using key taps which recorded taps in the form of audio or dots and dashes.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Radio className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Radio</h3>
            <p className={bodyClass}>
              Same algorithm was used for radio transmission systems. In this case, morse coded audio was transmitted
              and then decoded by trained operators.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Flame className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Smoke Signals</h3>
            <p className={bodyClass}>
              This method can be used to transmit code without using electronics. A wet cloth is placed over fire
              and removed quickly to register a dot and a bit longer for dashes.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Electronics Debugging</h3>
            <p className={bodyClass}>
              Morse code can be used in electronics debugging to transmit error codes and system statuses through
              a single LED or buzzer when a full display is unavailable.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Activity className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Communication</h3>
            <p className={bodyClass}>
              It provides simple, easy communication system. You can just blink your eyes in dots and dashes
              (small and long duration) to say something!
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Accessibility & Heritage</h3>
            <p className={bodyClass}>
              For those who can’t speak or write, morse code flashes or audios can be very helpful. Google
              also has a special keyboard for such persons.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Features of Our Morse Code Translator */}
      <section className={sectionAltClass}>
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-1 text-xs font-semibold text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 ring-1 ring-green-600/20">
            <Sparkles className="h-3.5 w-3.5 text-green-600 dark:text-green-400" /> Key Features
          </span>
        </div>
        <h2 className={headingClass}>Features of Our Morse Code Translator</h2>
        <p className={leadTextClass}>
          real time counter • text to morse • morse to text • copy instantly • random messages • audio & flash playback
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className={cardClass}>
            <div className="mb-3 text-green-700 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Real Time Counter</h3>
            <p className={bodyClass}>
              Our tool counts the letters and spaces while you type. It helps to eliminate possible errors.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-3 text-green-700 dark:text-green-400 group-hover:scale-110 transition-transform">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Text to Morse Code</h3>
            <p className={bodyClass}>
              You can convert text into morse code by typing your text in the input bar and can instantly copy your results.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-3 text-green-700 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Radio className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Morse to Text</h3>
            <p className={bodyClass}>
              You can also convert your morse code into text and translate it to understand the encoded message.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-3 text-green-700 dark:text-green-400 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Instant Copy</h3>
            <p className={bodyClass}>
              As you type your input, the results instantly appear in the output section for immediate copying.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-3 text-green-700 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Lightbulb className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Inspire Me</h3>
            <p className={bodyClass}>
              By clicking the Inspire me button, our tool will automatically select the most used phrases and translate them.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-3 text-green-700 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Volume2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Audio</h3>
            <p className={bodyClass}>
              You can also use audio to get results and can also generate it yourself using our morse audio generator.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-3 text-green-700 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Flash</h3>
            <p className={bodyClass}>
              Another way to express morse code is using lights, our flash mode enables light timing playback.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-3 text-green-700 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Sliders className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Audio Customization</h3>
            <p className={bodyClass}>
              Audio customization lets learners adjust speed, tone frequency and volume.
            </p>
          </div>
        </div>
      </section>

      {/* 7. How to Read and Write Morse Code */}
      <section className={sectionLightClass}>
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-1 text-xs font-semibold text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 ring-1 ring-green-600/20">
            <BookOpen className="h-3.5 w-3.5 text-green-600 dark:text-green-400" /> Mechanics
          </span>
        </div>
        <h2 className={headingClass}>How to Read and Write Morse Code</h2>
        <p className={leadTextClass}>
          Learn Morse by sound, timing, and consistent practice.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
              <Volume2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Read Morse by Sound</h3>
            <p className={bodyClass}>
              For audio practice, learn each character as a sound pattern of dits and dahs rather than trying to
              count individual dots and dashes. This approach is also recommended in{" "}
              <ExternalLink href="https://www.arrl.org/learning-morse-code">ARRL learning resources</ExternalLink>.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Write Morse with Timing</h3>
            <p className={bodyClass}>
              Keep the signal lengths consistent: a dot is one time unit, a dash is three time units, the gap
              between parts of one character is one unit, the gap between characters is three units, and the gap
              between words is seven units.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Learn Morse Code with Sound */}
      <section className={sectionAltClass}>
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-1 text-xs font-semibold text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 ring-1 ring-green-600/20">
            <Volume2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400" /> Audio Mastery
          </span>
        </div>
        <h2 className={headingClass}>Learn Morse Code with Sound</h2>
        <p className={leadTextClass}>
          Learning Morse is like playing an instrument; at first rhythms sound random, but practice brings clarity.
        </p>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Start Small</h3>
            <p className={bodyClass}>
              Practice as sound: Start with a small group of characters and listen repeatedly.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Activity className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Listen, Tap, Repeat</h3>
            <p className={bodyClass}>
              Start tapping on your desk to make your muscles memorize timing and sequence just like we master typing.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Volume2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Recognize the Rhythm</h3>
            <p className={bodyClass}>
              It doesn&apos;t need electricity or tech, just a rhythm, a light, or a sound.
            </p>
          </div>
        </div>
      </section>

      {/* 9. What you'll learn about Morse code */}
      <section className={sectionLightClass}>
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-1 text-xs font-semibold text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 ring-1 ring-green-600/20">
            <Award className="h-3.5 w-3.5 text-green-600 dark:text-green-400" /> Overview
          </span>
        </div>
        <h2 className={headingClass}>What You&apos;ll Learn About Morse Code</h2>
        <p className={leadTextClass}>Master dots, dashes, character patterns, and timing gaps.</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Dot</h3>
            <p className={bodyClass}>
              Learn the short basic signal and how it combines with dashes.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Activity className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Dash</h3>
            <p className={bodyClass}>
              Understand the long signal and its three-unit relationship to a dot.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Common Patterns</h3>
            <p className={bodyClass}>
              Begin with short, frequently encountered characters such as E, T, I, A, N, M, S, O.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Timing and Rhythm</h3>
            <p className={bodyClass}>
              You will learn that Morse is more than a list of symbols: timing separates elements, characters, and words.
            </p>
          </div>
        </div>
      </section>

      {/* 10. Examples to try */}
      <section className={sectionAltClass}>
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-1 text-xs font-semibold text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 ring-1 ring-green-600/20">
            <Flame className="h-3.5 w-3.5 text-green-600 dark:text-green-400" /> Practice
          </span>
        </div>
        <h2 className={headingClass}>Examples to Try</h2>
        <p className={leadTextClass}>Try these common Morse code phrases in the translator.</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["SOS", "... --- ..."],
            ["HELLO", ".... . .-.. .-.. ---"],
            ["MORSE", "-- --- .-. ... ."],
            ["123", ".---- ..--- ...--"],
            ["HELP", ".... . .-.. .--."],
            ["GOOD", "--. --- --- -.."]
          ].map(([label, code]) => (
            <div key={label} className={gridCardClass}>
              <div>
                <span className="inline-block rounded-md bg-green-100 border border-green-300/40 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-green-700 dark:bg-green-950 dark:border-green-800 dark:text-green-400">
                  {label}
                </span>
                <p className="mt-4 font-mono text-2xl font-black tracking-widest text-green-700 dark:text-green-400">{code}</p>
              </div>
              <a href="#translator" className="mt-6 flex items-center gap-1.5 text-xs font-bold text-green-700 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors">
                Try in translator <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 11. Learn the Morse Code Alphabet, Numbers and Symbols */}
      <section className={sectionLightClass}>
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-1 text-xs font-semibold text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 ring-1 ring-green-600/20">
            <Layers className="h-3.5 w-3.5 text-green-600 dark:text-green-400" /> Reference Library
          </span>
        </div>
        <h2 className={headingClass}>Learn the <Link href="/morse-code-alphabet" className={linkClass}>Morse Code Alphabet</Link>, Numbers and Symbols</h2>
        <p className={leadTextClass}>Comprehensive reference charts for international Morse code.</p>

        <div className={cardClass}>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Morse Code Alphabet</h3>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner">
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-green-700 text-white dark:border-slate-800 dark:bg-green-900 font-bold">
                  <th className="py-3.5 px-4 sm:px-6">Letter</th>
                  <th className="py-3.5 px-4 sm:px-6">Morse Code</th>
                  <th className="py-3.5 px-4 sm:px-6">Spoken Rhythm</th>
                  <th className="py-3.5 px-4 sm:px-6">Memory Cue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                {alphabet.map(([letter, code, rhythm, cue]) => (
                  <tr key={letter} className="transition-colors hover:bg-green-50/50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4 sm:px-6 font-bold text-slate-900 dark:text-white">{letter}</td>
                    <td className="py-3 px-4 sm:px-6 font-mono font-bold text-green-700 dark:text-green-400">{code}</td>
                    <td className="py-3 px-4 sm:px-6 text-slate-700 dark:text-slate-300">{rhythm}</td>
                    <td className="py-3 px-4 sm:px-6 text-slate-700 dark:text-slate-300">{cue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-10 text-lg font-bold text-slate-900 dark:text-white mb-4">Morse Code Numbers</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {numbers.map(([number, code]) => (
              <div key={number} className="rounded-xl border border-slate-200 bg-green-50/30 p-3.5 text-center hover:border-green-600/40 hover:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-800 transition-all">
                <span className="block text-sm font-bold text-slate-900 dark:text-white">{number}</span>
                <span className="mt-1 block font-mono text-xs font-bold text-green-700 dark:text-green-400">{code}</span>
              </div>
            ))}
          </div>

          <h3 className="mt-10 text-lg font-bold text-slate-900 dark:text-white mb-4">Morse Code Symbols and Punctuation</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {punctuation.map(([symbol, code]) => (
              <div key={symbol} className="rounded-xl border border-slate-200 bg-green-50/30 p-3.5 text-center hover:border-green-600/40 hover:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-800 transition-all">
                <span className="block text-sm font-bold text-slate-900 dark:text-white">{symbol}</span>
                <span className="mt-1 block font-mono text-xs font-bold text-green-700 dark:text-green-400">{code}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Morse Code Sounds: The Rhythm of Communication */}
      <section className={sectionAltClass}>
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-1 text-xs font-semibold text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 ring-1 ring-green-600/20">
            <Volume2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400" /> Acoustics
          </span>
        </div>
        <h2 className={headingClass}>Morse Code Sounds: The Rhythm of Communication</h2>
        <p className={leadTextClass}>
          Morse is an audio language. Listen carefully and derive meaning from rhythms and timing.
        </p>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">E: The Shortest Character</h3>
            <p className={bodyClass}>
              E is a short tap. It is represented by a single dot .
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">SOS: A Memorable Rhythm</h3>
            <p className={bodyClass}>
              SOS sounds like a heartbeat rhythm, which contributed to its international popularity.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Why Rhythm Matters</h3>
            <p className={bodyClass}>
              Morse relies on consistent timing. If timing breaks, character recognition collapses.
            </p>
          </div>
        </div>
      </section>

      {/* 13. Modern Uses of Morse Code */}
      <section className={sectionLightClass}>
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-1 text-xs font-semibold text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 ring-1 ring-green-600/20">
            <Globe className="h-3.5 w-3.5 text-green-600 dark:text-green-400" /> Present Day
          </span>
        </div>
        <h2 className={headingClass}>Modern Uses of Morse Code</h2>
        <p className={leadTextClass}>
          Jewelry, tattoos, education, assistive tech, radio, navigation, military, rescue, and puzzles.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Jewellery</h3>
            <p className={bodyClass}>
              Today, jewellery items are designed with dots and dashes representing secret messages on their surface.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Tattoo</h3>
            <p className={bodyClass}>
              Tattoos are frequently created in Morse style using minimal dot and dash patterns.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Education</h3>
            <p className={bodyClass}>
              Students learn basic coding concepts, encode simple messages, and explore communications history.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Activity className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Assistive Communication</h3>
            <p className={bodyClass}>
              For non-verbal or motor-impaired individuals, Morse code flashes or audios serve as an alternative keyboard input.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Radio className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Radio</h3>
            <p className={bodyClass}>
              Ham Radio uses Morse code transmission (CW). Its narrow bandwidth cuts through heavy noise.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Compass className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Navigation</h3>
            <p className={bodyClass}>
              Aviation navigation aids like VORs continuously transmit their station identifiers in Morse code.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Encoded Messages</h3>
            <p className={bodyClass}>
              Send encoded Morse messages to friends who know how to decode dot-and-dash patterns.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Military Signals & Rescue</h3>
            <p className={bodyClass}>
              Emergency signals punch through extreme static. Morse played a vital role in historical field operations.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <HelpCircle className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Games & Puzzles</h3>
            <p className={bodyClass}>
              Escape rooms and online puzzle games use Morse flashes or audio signals for clues.
            </p>
          </div>
        </div>
      </section>

      {/* 14. Why Morse Code Still Matters Today */}
      <section className={sectionAltClass}>
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-1 text-xs font-semibold text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 ring-1 ring-green-600/20">
            <Lightbulb className="h-3.5 w-3.5 text-green-600 dark:text-green-400" /> Significance
          </span>
        </div>
        <h2 className={headingClass}>Why Morse Code Still Matters Today</h2>
        <p className={leadTextClass}>
          A historical treasure, emergency lifeline, and practical hobby.
        </p>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">As a Skill and Hobby</h3>
            <p className={bodyClass}>
              Morse remains a practical listening and timing skill for amateur radio enthusiasts.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">As Cultural Heritage</h3>
            <p className={bodyClass}>
              The telegraph helped transform global communication, laying the foundation for modern networks.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Radio className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">In Modern Communication</h3>
            <p className={bodyClass}>
              CW remains active in radio practice, accessibility experiments, and creative designs.
            </p>
          </div>
        </div>
      </section>

      {/* 15. International v American */}
      <section className={sectionLightClass}>
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-1 text-xs font-semibold text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 ring-1 ring-green-600/20">
            <Globe className="h-3.5 w-3.5 text-green-600 dark:text-green-400" /> Comparison
          </span>
        </div>
        <h2 className={headingClass}>International vs. American Morse Code</h2>
        <p className={leadTextClass}>Comparison between standard International Morse and historical American Morse.</p>

        <div className={cardClass}>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner">
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-green-700 text-white dark:border-slate-800 dark:bg-green-900 font-bold">
                  <th className="py-3.5 px-4 sm:px-6">Feature</th>
                  <th className="py-3.5 px-4 sm:px-6">International Morse</th>
                  <th className="py-3.5 px-4 sm:px-6">American Morse</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                <tr className="transition-colors hover:bg-green-50/50 dark:hover:bg-slate-800/50">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900 dark:text-white">Primary historical use</td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-700 dark:text-slate-300">International telegraph and radio communication</td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-700 dark:text-slate-300">Primarily American landline telegraph systems</td>
                </tr>
                <tr className="transition-colors hover:bg-green-50/50 dark:hover:bg-slate-800/50">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900 dark:text-white">Timing</td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-700 dark:text-slate-300">Standardized timing based on dot units</td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-700 dark:text-slate-300">Uses different historical spacing and character conventions</td>
                </tr>
                <tr className="transition-colors hover:bg-green-50/50 dark:hover:bg-slate-800/50">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900 dark:text-white">Use today</td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-700 dark:text-slate-300">Widely recognized and used in modern CW practice</td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-700 dark:text-slate-300">Primarily of historical and specialist interest</td>
                </tr>
                <tr className="transition-colors hover:bg-green-50/50 dark:hover:bg-slate-800/50">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900 dark:text-white">Reference</td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-700 dark:text-slate-300">ITU Recommendation M.1677</td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-700 dark:text-slate-300">Historical U.S. telegraph code</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 16. Mirror alphabets list */}
      <section className={sectionAltClass}>
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-1 text-xs font-semibold text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 ring-1 ring-green-600/20">
            <Layers className="h-3.5 w-3.5 text-green-600 dark:text-green-400" /> Symmetry
          </span>
        </div>
        <h2 className={headingClass}>Mirror Alphabets List</h2>
        <p className={leadTextClass}>
          In Morse, a reverse or mirror pair is formed when dots and dashes sequence is read backward.
        </p>

        <div className={cardClass}>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner">
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-green-700 text-white dark:border-slate-800 dark:bg-green-900 font-bold">
                  <th className="py-3.5 px-4 sm:px-6">Letter</th>
                  <th className="py-3.5 px-4 sm:px-6">Morse</th>
                  <th className="py-3.5 px-4 sm:px-6">Mirror</th>
                  <th className="py-3.5 px-4 sm:px-6">Morse</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                {mirrorPairs.map(([a, ac, b, bc]) => (
                  <tr key={a} className="transition-colors hover:bg-green-50/50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4 sm:px-6 font-bold text-slate-900 dark:text-white">{a}</td>
                    <td className="py-3 px-4 sm:px-6 font-mono font-bold text-green-700 dark:text-green-400">{ac}</td>
                    <td className="py-3 px-4 sm:px-6 font-bold text-slate-900 dark:text-white">{b}</td>
                    <td className="py-3 px-4 sm:px-6 font-mono font-bold text-green-700 dark:text-green-400">{bc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 17. Prosigns */}
      <section className={sectionLightClass}>
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-1 text-xs font-semibold text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 ring-1 ring-green-600/20">
            <ShieldAlert className="h-3.5 w-3.5 text-green-600 dark:text-green-400" /> Protocols
          </span>
        </div>
        <h2 className={headingClass}>Prosigns</h2>
        <p className={leadTextClass}>
          Prosigns are special Morse sequences sent as a single procedural signal.
        </p>

        <div className={cardClass}>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner">
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-green-700 text-white dark:border-slate-800 dark:bg-green-900 font-bold">
                  <th className="py-3.5 px-4 sm:px-6">Prosign</th>
                  <th className="py-3.5 px-4 sm:px-6">Morse</th>
                  <th className="py-3.5 px-4 sm:px-6">Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                {prosigns.map(([name, code, meaning]) => (
                  <tr key={name} className="transition-colors hover:bg-green-50/50 dark:hover:bg-slate-800/50">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900 dark:text-white">{name}</td>
                    <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-green-700 dark:text-green-400">{code}</td>
                    <td className="py-3.5 px-4 sm:px-6 text-slate-700 dark:text-slate-300">{meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 18. Q-codes */}
      <section className={sectionAltClass}>
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-1 text-xs font-semibold text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 ring-1 ring-green-600/20">
            <Radio className="h-3.5 w-3.5 text-green-600 dark:text-green-400" /> Radio Signals
          </span>
        </div>
        <h2 className={headingClass}>Q-Codes</h2>
        <p className={leadTextClass}>
          Standardized three-letter operating abbreviations used in radio communication.
        </p>

        <div className={cardClass}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {qCodes.map(([code, meaning]) => (
              <div key={code} className="rounded-xl border border-slate-200 bg-green-50/30 p-4 hover:border-green-600/40 hover:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-800 transition-all flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 font-mono font-bold">
                  <Radio className="h-5 w-5" />
                </div>
                <div>
                  <span className="inline-block font-mono text-base font-bold text-green-700 dark:text-green-400">{code}</span>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">{meaning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 19. Common mistakes */}
      <section className={sectionLightClass}>
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-1 text-xs font-semibold text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 ring-1 ring-green-600/20">
            <AlertCircle className="h-3.5 w-3.5 text-green-600 dark:text-green-400" /> Tips & Pitfalls
          </span>
        </div>
        <h2 className={headingClass}>Common Mistakes</h2>
        <p className={leadTextClass}>
          Avoid missing dots, swapping elements, or mismanaging word spacing.
        </p>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className={cardClass}>
            <div className="mb-3 text-amber-500">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Missing Signals</h3>
            <p className={bodyClass}>
              Missing a dot or holding a signal too long distorts the message. Always re-check the original timing.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-3 text-amber-500">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Swapping Dots & Dashes</h3>
            <p className={bodyClass}>
              During fast tapping, it is easy to swap dots and dashes. Consistent practice reduces errors.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-3 text-amber-500">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Incorrect Separation</h3>
            <p className={bodyClass}>
              Forgetting spaces merges distinct characters into unintended words. Maintain standard spacing.
            </p>
          </div>
        </div>
      </section>

      {/* 20. Understanding Your Settings */}
      <section className={sectionAltClass}>
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-1 text-xs font-semibold text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 ring-1 ring-green-600/20">
            <Settings className="h-3.5 w-3.5 text-green-600 dark:text-green-400" /> Configuration
          </span>
        </div>
        <h2 className={headingClass}>Understanding Your Settings</h2>
        <p className={leadTextClass}>Customization options and their effect on Morse audio/visual playback.</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {settings.map(([name, description]) => (
            <div key={name} className={cardClass}>
              <div className="mb-3 text-green-700 dark:text-green-400">
                <Sliders className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{name}</h3>
              <p className={bodyClass}>{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 21. Discover more */}
      <section className={sectionLightClass}>
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-1 text-xs font-semibold text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 ring-1 ring-green-600/20">
            <Globe className="h-3.5 w-3.5 text-green-600 dark:text-green-400" /> Deep Dive
          </span>
        </div>
        <h2 className={headingClass}>Discover More</h2>
        <p className={leadTextClass}>
          Learn about SOS signals, International standards, and historical Morse milestones.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              <ExternalLink href="https://www.itu.int/rec/R-REC-M.1677-1-200910-I">
                International Morse Code Standard
              </ExternalLink>
            </h3>
            <p className={bodyClass}>
              An internationally accepted system containing dots and dashes to express numbers, letters and punctuations.
            </p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 group-hover:scale-110 transition-transform">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Titanic Disaster 1912</h3>
            <p className={bodyClass}>
              Radio operators used CQD and SOS signals as the ship sank on April 15, 1912, bringing rescue assistance.
            </p>
          </div>
        </div>
      </section>

      {/* 22. Morse Font */}
      <section className={sectionAltClass}>
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-1 text-xs font-semibold text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 ring-1 ring-green-600/20">
            <Cpu className="h-3.5 w-3.5 text-green-600 dark:text-green-400" /> Visual Font
          </span>
        </div>
        <h2 className={headingClass}>Morse Font</h2>
        <p className={leadTextClass}>
          Morse code typography and digital fonts convert standard text characters directly into visual dot-and-dash glyphs. These specialized fonts allow designers and enthusiasts to render authentic telegraphic scripts for artistic projects, modern web displays, and typography encoding without manual translation.
        </p>

        <div className={cardClass}>
          <div className="flex items-center gap-2 mb-4">
            <Type className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Typography & Glyphs Overview</h3>
          </div>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            Digital Morse fonts map keyboard inputs directly to symbol sets consisting of dots ($\cdot$) and dashes ($-$). This styling is widely utilized in graphic design, cryptography themes, and educational software to preserve historical aesthetics.
          </p>
          <div className="rounded-xl border border-green-600/20 bg-green-50/40 p-4 dark:border-slate-800 dark:bg-slate-900/60">
            <p className="font-mono text-lg font-bold tracking-widest text-green-700 dark:text-green-400 text-center">
              $\cdot \cdot \cdot --- \cdot \cdot \cdot$ / $\cdot \cdot \cdot \cdot$ $\cdot$ $\cdot - \cdot \cdot$ $\cdot - \cdot \cdot$ $---$
            </p>
            <p className="mt-2 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Example: S-O-S / H-E-L-L-O rendered in symbol typography</p>
          </div>
        </div>
      </section>

      {/* 23. Troubleshoot */}
      <section className={sectionLightClass}>
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-1 text-xs font-semibold text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 ring-1 ring-green-600/20">
            <HelpCircle className="h-3.5 w-3.5 text-green-600 dark:text-green-400" /> Support
          </span>
        </div>
        <h2 className={headingClass}>Troubleshoot</h2>
        <p className={leadTextClass}>Common troubleshooting checks for Morse translation</p>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className={cardClass}>
            <div className="mb-3 text-green-700 dark:text-green-400">
              <HelpCircle className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Nothing appears in the output</h3>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">Check that you selected the correct direction, Text to Morse or Morse to Text.</p>
          </div>
          <div className={cardClass}>
            <div className="mb-3 text-green-700 dark:text-green-400">
              <Sliders className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">The Morse sounds too fast or slow</h3>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">Adjust the WPM or playback speed in settings.</p>
          </div>
          <div className={cardClass}>
            <div className="mb-3 text-green-700 dark:text-green-400">
              <Volume2 className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">The audio is too quiet or has wrong pitch</h3>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">Adjust volume and frequency settings, then test again.</p>
          </div>
          <div className={cardClass}>
            <div className="mb-3 text-green-700 dark:text-green-400">
              <FileText className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">The translation looks wrong</h3>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">Check the spaces between Morse characters.</p>
          </div>
        </div>
      </section>

      {/* 24. Conclusion */}
      <section className={sectionAltClass}>
        <div className={cardClass}>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Conclusion</h2>
          </div>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Morse code is a compact system built from dots, dashes and timing. It has a long connection with telegraphy,
            radio and communication history, while today it remains useful for learning, amateur radio, accessibility
            projects, puzzles and creative applications.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            The best way to learn it is to listen, practice short character groups, pay attention to timing and then
            gradually increase speed. You can use our{" "}
            <Link href="/learn-morse-code" className={linkClass}>Morse learning guide</Link>{" "}
            alongside the translator for practice.
          </p>
        </div>
      </section>

      {/* 25. Ready to Translate Banner */}
      <section className="relative overflow-hidden w-full bg-slate-950 px-6 py-20 text-center text-white shadow-2xl border-y border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,163,74,0.15),transparent_70%)]"></div>
        <div className="relative mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-4 py-1.5 text-xs font-semibold text-green-400 ring-1 ring-green-500/30 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-green-400" /> Start Translating Instantly
          </span>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            Ready to Translate?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-300 font-medium">
            Use the translator above to enter text or Morse code, listen to the result, and practice the same characters until their rhythm becomes familiar.
          </p>
          <a
            href="#translator"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-600/20 transition-all hover:bg-green-700 hover:scale-105 active:scale-95"
          >
            Return to translator ↑
          </a>
        </div>
      </section>

      {/* 26. Morse Code Translator FAQ */}
      <section className={sectionLightClass}>
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-1 text-xs font-semibold text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 ring-1 ring-green-600/20">
            <HelpCircle className="h-3.5 w-3.5 text-green-600 dark:text-green-400" /> Got Questions?
          </span>
        </div>
        <h2 className={headingClass}>Morse Code Translator FAQ</h2>
        <p className={leadTextClass}>Frequently asked questions about Morse translation.</p>

        <div className="grid gap-6 sm:grid-cols-2">
          {faqs.map((faq) => (
            <div key={faq.question} className={cardClass}>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{faq.question}</h3>
              <p className={bodyClass}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 27. Related Blogs */}
      <section className={sectionAltClass}>
        <div className="flex justify-center buttons mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-1 text-xs font-semibold text-green-700 shadow-sm dark:bg-green-950 dark:text-green-400 ring-1 ring-green-600/20">
            <BookOpen className="h-3.5 w-3.5 text-green-600 dark:text-green-400" /> Read More
          </span>
        </div>
        <h2 className={headingClass}>Related Blogs</h2>
        <p className={leadTextClass}>Explore related articles and learning guides.</p>

        <div className="grid gap-6 sm:grid-cols-3">
          {faqLinks.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={cardClass}
            >
              <span className="block text-sm font-bold text-slate-900 dark:text-white">{label}</span>
              <span className="mt-4 flex items-center gap-1 text-xs font-bold text-green-700 dark:text-green-400 group-hover:translate-x-1 transition-transform">
                Read more <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}