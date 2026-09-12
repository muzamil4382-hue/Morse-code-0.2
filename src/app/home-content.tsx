import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock3,
  ExternalLink,
  Headphones,
  Lightbulb,
  Radio,
  Settings2,
  ShieldCheck,
  Volume2,
} from "lucide-react";

const MORSE_CODE: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.",
  G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..",
  M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
  S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.",
  "!": "-.-.--", "/": "-..-.", "(": "-.--.", ")": "-.--.-",
  "&": ".-...", ":": "---...", ";": "-.-.-.", "=": "-...-",
  "+": ".-.-.", "-": "-....-", "_": "..--.-", '"': ".-..-.",
  "$": "...-..-", "@": ".--.-.",
};

export const faqs = [
  {
    question: "What is a Morse code translator?",
    answer:
      "A Morse code translator converts ordinary text into Morse code and can decode Morse code back into readable text. This homepage tool also provides audio, visual signaling, copying, sharing, and download options.",
  },
  {
    question: "How do I translate text into Morse code?",
    answer:
      "Choose Text to Morse, type or paste your message, and the result is generated automatically. You can then copy, share, download, or listen to the Morse output.",
  },
  {
    question: "How do I decode Morse code into text?",
    answer:
      "Switch the translator to Morse to Text and enter the dots and dashes. Keep character spacing clear and use the word separator supported by the tool so the decoder can distinguish words correctly.",
  },
  {
    question: "What is SOS in Morse code?",
    answer: "SOS is ... --- ... and is one of the best-known Morse distress signals.",
  },
  {
    question: "Is Morse code still used today?",
    answer:
      "Yes. Morse code remains relevant in amateur radio, navigation identifiers, accessibility projects, education, hobbies, emergency signaling, historical research, and puzzles.",
  },
  {
    question: "What is the difference between International and American Morse?",
    answer:
      "International Morse is the standardized form used for international radiotelegraphy and modern Morse references. American Morse was an earlier U.S. telegraph system with different character patterns and timing conventions.",
  },
  {
    question: "Can I listen to Morse code as audio?",
    answer:
      "Yes. Enter text or Morse code and use the audio controls in the translator. You can adjust speed, frequency, and volume without changing the underlying translation.",
  },
  {
    question: "Is this Morse code translator free?",
    answer:
      "Yes. The online translator is provided as a free browser-based tool for converting and decoding supported Morse code.",
  },
  {
    question: "Can I learn Morse code using this tool?",
    answer:
      "Yes. Use the examples, alphabet and number tables, audio playback, flash mode, and practice messages to build recognition gradually.",
  },
  {
    question: "How are words separated in Morse code?",
    answer:
      "For written Morse notation, words are commonly separated with a slash, while character spacing separates individual letters. The exact visual separator can vary by notation or application.",
  },
  {
    question: "What timing is used in International Morse code?",
    answer:
      "The standard timing relationship is one unit for a dot, three units for a dash, one unit between elements within a character, three units between characters, and seven units between words.",
  },
  {
    question: "Can I use Morse code for accessibility?",
    answer:
      "Morse-based input can be useful in assistive technology. Google has documented Morse input in Gboard, including switch-access support for some users with limited mobility.",
  },
];

export const howToSteps = [
  {
    name: "Choose a direction",
    text: "Choose Text to Morse when you want to encode text, or Morse to Text when you want to decode dots and dashes.",
  },
  {
    name: "Enter the input",
    text: "Type or paste the supported English letters, numbers, punctuation, or Morse notation into the input area.",
  },
  {
    name: "Use audio or visual practice",
    text: "Play the generated Morse audio, adjust the available sound controls, or use the flash mode to practice timed signals.",
  },
  {
    name: "Save or share the result",
    text: "Copy the output, share it where supported, or download supported output formats from the translator.",
  },
];

const alphabet = Object.entries(MORSE_CODE).filter(([key]) => /^[A-Z]$/.test(key));
const numbers = Object.entries(MORSE_CODE).filter(([key]) => /^\d$/.test(key));
const punctuation = Object.entries(MORSE_CODE).filter(([key]) => !/^[A-Z\d]$/.test(key));

const mirrorAlphabet = alphabet.map(([letter], index) => [letter, String.fromCharCode(90 - index)]);

const cardClass =
  "group rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-green-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-green-700";
const sectionClass = "mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 lg:px-8 sm:py-16";
const headingClass = "text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl";
const bodyClass = "text-base leading-8 text-slate-600 dark:text-slate-300";
const inlineLinkClass = "font-semibold text-green-700 underline decoration-green-300 underline-offset-4 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300";

function SectionHeading({ title, intro }: { title: string; intro?: ReactNode }) {
  return (
    <div className="mb-10 max-w-3xl">
      <h2 className={headingClass}>{title}</h2>
      {intro ? <div className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">{intro}</div> : null}
    </div>
  );
}

function ExternalReference({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={inlineLinkClass}>
      {children} <ExternalLink className="mb-0.5 inline-block h-3.5 w-3.5" aria-hidden="true" />
    </a>
  );
}

export default function HomeContent() {
  return (
    <main className="w-full bg-slate-50/80 dark:bg-slate-950">
      {/* H2: What is Morse Code? */}
      <section className={sectionClass}>
        <SectionHeading
          title="What is Morse Code?"
          intro={
            <>
              Morse code is a signaling system that represents letters, numbers, and punctuation with combinations of short and long signals. In practice, a dot is a short signal and a dash is a longer signal; the timing between signals is just as important as the signals themselves. The system grew alongside the electric telegraph work associated with Samuel Morse and Alfred Vail.
            </>
          }
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className={cardClass}>
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"><span className="font-mono text-xl font-black">·</span></div>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white">Dot</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">A dot, or dit, is one basic timing unit and forms the short element of a Morse character.</p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"><span className="font-mono text-xl font-black">—</span></div>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white">Dashes</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">A dash, or dah, lasts three dot units and forms the long element of a Morse character.</p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"><Clock3 className="h-5 w-5" /></div>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white">Pause / Space</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">One unit separates elements inside a character, three units separate characters, and seven units separate words in standard timing.</p>
          </div>
          <div className={cardClass}>
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"><Headphones className="h-5 w-5" /></div>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white">Audio</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">Morse can be heard as short and long tones. Correct rhythm and spacing make the signal recognizable by ear.</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-green-200 bg-green-50/80 p-6 dark:border-green-900/60 dark:bg-green-950/20">
          <h3 className="flex items-center gap-2 text-lg font-bold text-slate-950 dark:text-white"><Lightbulb className="h-5 w-5 text-green-600" />Benefits</h3>
          <p className="mt-2 leading-8 text-slate-700 dark:text-slate-300">Morse code turns language into a compact pattern that can be transmitted by sound, light, electrical signaling, or typed notation. Common characters can be learned as rhythms instead of being treated as a complicated alphabet of symbols.</p>
        </div>
      </section>

      {/* H2: When and who invented Morse code */}
      <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40">
        <div className={sectionClass}>
          <SectionHeading title="When and Who Invented Morse Code" intro={<>Morse code developed during the 1830s alongside the electric telegraph work of Samuel Morse and Alfred Vail. The historical record is more collaborative than the shorthand story that credits one person alone; Vail made major contributions to the apparatus and alphabetic code.</>} />
          <div className="grid gap-5 md:grid-cols-3">
            <div className={cardClass}><span className="text-xs font-bold uppercase tracking-widest text-green-700 dark:text-green-400">Phase 01 · 1837–1838</span><h3 className="mt-2 text-xl font-bold text-slate-950 dark:text-white">Early Telegraph Code</h3><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">Morse and Vail worked on an electrical telegraph system and developed a practical alphabetic signaling method.</p></div>
            <div className={cardClass}><span className="text-xs font-bold uppercase tracking-widest text-green-700 dark:text-green-400">Phase 02 · 1844</span><h3 className="mt-2 text-xl font-bold text-slate-950 dark:text-white">The Famous Message</h3><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">On May 24, 1844, the famous “What hath God wrought?” message was sent between Washington, D.C. and Baltimore.</p></div>
            <div className={cardClass}><span className="text-xs font-bold uppercase tracking-widest text-green-700 dark:text-green-400">Phase 03 · Internationalization</span><h3 className="mt-2 text-xl font-bold text-slate-950 dark:text-white">International Morse</h3><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">European telegraph standardization in the mid-19th century led toward the International Morse form used in later radiotelegraphy.</p></div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-700 dark:bg-slate-800">Historical reference: Smithsonian Institution</span>
            <ExternalReference href="https://siarchives.si.edu/blog/forgotten-history-alfred-vail-and-samuel-morse">Read the Smithsonian history of Morse and Vail</ExternalReference>
          </div>
        </div>
      </section>

      {/* H2: How to translate Morse code step by step */}
      <section className={sectionClass}>
        <SectionHeading title="How to Translate Morse Code Step by Step" intro={<>The translator is designed to keep the conversion process simple. Follow the same sequence whether you are learning, decoding a message, or preparing a Morse signal for audio practice.</>} />
        <div className="grid gap-5 md:grid-cols-4">
          {[
            ["01", "Pick a Direction", "Choose Text to Morse when encoding normal text, or Morse to Text when decoding dots and dashes."],
            ["02", "Paste the Input", "Type or paste your English letters, numbers, supported punctuation, or Morse notation into the input box."],
            ["03", "Use Audio", "Play the generated Morse signal, adjust speed, frequency, and volume, or use visual flash practice."],
            ["04", "Save the Output", "Copy, share, or download the result using the actions available in the translator."],
          ].map(([num, title, text]) => (
            <div key={num} className={cardClass}>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-green-700 text-sm font-extrabold text-white">{num}</span>
              <h3 className="mt-4 text-lg font-bold text-slate-950 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* H2: Learn to code */}
      <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40">
        <div className={sectionClass}>
          <SectionHeading title="Learn to Code with Morse Code Translator" intro={<>Use the free web application as a practice space as well as a converter. Real-time translation lets you see how a character pattern is built, while audio and visual modes help connect the written pattern with its rhythm.</>} />
          <div className="grid gap-5 md:grid-cols-3">
            <div className={cardClass}><h3 className="text-lg font-bold text-slate-950 dark:text-white">Read the Pattern</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">Try one character at a time, then move to short words. Compare your answer with the alphabet reference below.</p></div>
            <div className={cardClass}><h3 className="text-lg font-bold text-slate-950 dark:text-white">Tap the Rhythm</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">Treat a dot as a short beat and a dash as a long beat. Consistent gaps are part of the code.</p></div>
            <div className={cardClass}><h3 className="text-lg font-bold text-slate-950 dark:text-white">Practice Live</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">Generate a message, listen to it, and try to identify the characters before checking the written output. The tool does not require an account for normal use.</p></div>
          </div>
          <p className="mt-7 text-sm leading-7 text-slate-600 dark:text-slate-300">For a structured learning path, continue to our <Link href="/learn-morse-code" className={inlineLinkClass}>Learn Morse Code guide</Link> and use the <Link href="/morse-code-quiz" className={inlineLinkClass}>Morse Code Quiz</Link> for recall practice.</p>
        </div>
      </section>

      {/* H2: When to use */}
      <section className={sectionClass}>
        <SectionHeading title="When to Use This Morse Code Translator" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Telegraph", "Explore the signaling method that grew with 19th-century electric telegraphy and practice translating historical-style messages."],
            ["Radio", "Prepare and decode Morse patterns for amateur-radio learning and CW practice. Morse remains part of amateur-radio culture."],
            ["Smoke Signals", "Morse is fundamentally a timed signaling idea, so learners can compare dots, dashes, and pauses with visual signaling methods. It should not be treated as a guaranteed emergency technique."],
            ["Electronics Debugging", "Simple on/off signals can represent status or error patterns on an LED or buzzer when a full display is unavailable."],
            ["Communication", "Morse can carry information through sound or light when a simple, low-bandwidth signaling method is useful."],
            ["Accessibility & Heritage", "Morse is studied as a communication method, an assistive-input technique, a historical technology, and a hobby."],
          ].map(([title, text]) => <div key={title} className={cardClass}><h3 className="text-lg font-bold text-slate-950 dark:text-white">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{text}</p></div>)}
        </div>
        <p className="mt-7 text-sm leading-7 text-slate-600 dark:text-slate-300">For amateur-radio context, see the <ExternalReference href="https://www.arrl.org/cw-mode">ARRL overview of CW/Morse operation</ExternalReference>.</p>
      </section>

      {/* H2: Features */}
      <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40">
        <div className={sectionClass}>
          <SectionHeading title="Features of Our Morse Code Translator" intro={<>The interactive tool keeps the main actions together so you can translate, listen, practice, and save without leaving the page.</>} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Real-Time Counter", "Counts characters and words while you type, helping you keep track of your message."],
              ["Text to Morse Code", "Convert supported text into dots and dashes instantly without waiting for a separate translate button."],
              ["Morse to Text", "Decode a supported Morse pattern into readable text and switch back to the encoding mode when needed."],
              ["Instant Copy", "Copy the generated result directly from the translator for use in another app or document."],
              ["Inspire Me", "Use the random-message action to generate a practice phrase and immediately see its Morse representation."],
              ["Audio", "Play the generated Morse as timed tones and adjust the available speed, frequency, and volume settings."],
              ["Flash", "Use timed visual signals to practice Morse through light instead of sound."],
              ["Audio Customization", "Change WPM speed, tone frequency, and volume without changing the encoded character sequence."],
              ["Download & Share", "Use the available share and download controls to keep or send your translation."],
            ].map(([title, text]) => <div key={title} className={cardClass}><div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"><Check className="h-5 w-5" /></div><h3 className="text-lg font-bold text-slate-950 dark:text-white">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{text}</p></div>)}
          </div>
        </div>
      </section>

      {/* H2: How to Read and Write */}
      <section className={sectionClass}>
        <SectionHeading title="How to Read and Write Morse Code" intro={<>Morse becomes easier when you separate the job into recognition, timing, and spacing. Use your ears for audio, your eyes for visual signals, and your written reference when you are still learning individual characters.</>} />
        <div className="grid gap-5 md:grid-cols-2">
          <div className={cardClass}><h3 className="text-lg font-bold text-slate-950 dark:text-white">Decode Signals</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">Identify each complete character from its dot-and-dash pattern. Avoid guessing from isolated dots when the surrounding timing gives you more information.</p></div>
          <div className={cardClass}><h3 className="text-lg font-bold text-slate-950 dark:text-white">Encode One Character at a Time</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">Convert each letter separately, then preserve the correct character and word spacing. The same pattern should be recognizable whether it is written, heard, or flashed.</p></div>
          <div className={cardClass}><h3 className="text-lg font-bold text-slate-950 dark:text-white">Keep Practicing</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">Start with common letters and short words. Repetition helps you move from looking up patterns to recognizing them automatically.</p></div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900/60 dark:bg-amber-950/20"><h3 className="text-lg font-bold text-slate-950 dark:text-white">Think in Rhythm, Not Counting</h3><p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">When learning by sound, try to hear the whole character as one rhythm instead of counting every element. This is especially useful as your speed increases.</p></div>
        </div>
      </section>

      {/* H2: Learn Morse Code with Sound */}
      <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40">
        <div className={sectionClass}>
          <SectionHeading title="Learn Morse Code with Sound" intro={<>Learning Morse by sound can feel like learning a musical instrument. At first, the rhythms may seem random; with repeated listening, familiar characters begin to sound distinct. Morse does not require a complicated musical system—just consistent timing between short and long signals.</>} />
          <div className="grid gap-5 md:grid-cols-3">
            <div className={cardClass}><Volume2 className="h-6 w-6 text-green-600" /><h3 className="mt-4 text-lg font-bold text-slate-950 dark:text-white">Start Small</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">Use a few easy characters and short words before attempting long passages.</p></div>
            <div className={cardClass}><Radio className="h-6 w-6 text-green-600" /><h3 className="mt-4 text-lg font-bold text-slate-950 dark:text-white">Listen, Tap, Repeat</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">Listen to a character, tap its rhythm, then listen again. Repetition builds timing memory.</p></div>
            <div className={cardClass}><Headphones className="h-6 w-6 text-green-600" /><h3 className="mt-4 text-lg font-bold text-slate-950 dark:text-white">Recognize the Rhythm</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">Try to recognize the sound as a complete character instead of translating each beat separately.</p></div>
          </div>
          <p className="mt-7 text-sm leading-7 text-slate-600 dark:text-slate-300">For additional listening practice, the <ExternalReference href="https://www.arrl.org/code-practice-files">ARRL W1AW code-practice archive</ExternalReference> provides recorded Morse practice files.</p>
        </div>
      </section>

      {/* H2: What you'll learn */}
      <section className={sectionClass}>
        <SectionHeading title="What You'll Learn About Morse Code" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[['Dash', 'Understand the long signal and its three-unit relationship to a dot.'], ['Dot', 'Learn the short basic signal and how it combines with dashes.'], ['Common Letters', 'Build a starting vocabulary from frequent and simple characters.'], ['Gaps', 'Understand the timing that separates elements, characters, and words.']].map(([title, text]) => <div key={title} className={cardClass}><h3 className="text-lg font-bold text-slate-950 dark:text-white">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{text}</p></div>)}
        </div>
      </section>

      {/* H2: Examples */}
      <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40">
        <div className={sectionClass}>
          <SectionHeading title="Examples to Try" intro={<>Use these examples in the translator, listen to their rhythm, and then try to reproduce them from memory.</>} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['SOS', '... --- ...'], ['HELLO', '.... . .-.. .-.. ---'], ['HELP', '.... . . .-.. .--.'], ['I LOVE YOU', '.. / .-.. --- ...- . / -.-- --- ..-'], ['GOOD', '--. --- --- -..'], ['THANK YOU', '- .... .- -. -.- / -.-- --- ..-'],
            ].map(([text, code]) => <Link href="#translator" key={text} className={`${cardClass} block`}><span className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">{text}</span><span className="mt-3 block break-words font-mono text-lg font-bold tracking-wide text-green-700 dark:text-green-400">{code}</span><span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-slate-500 group-hover:text-green-700 dark:text-slate-400">Try in translator <ArrowRight className="h-3.5 w-3.5" /></span></Link>)}
          </div>
        </div>
      </section>

      {/* H2: Alphabet, Numbers and Symbols */}
      <section id="alphabet" className={sectionClass}>
        <SectionHeading title="Learn the Morse Code Alphabet, Numbers and Symbols" intro={<>This reference uses International Morse patterns for English letters, digits, and common punctuation. For the full alphabet reference, see our <Link href="/morse-code-alphabet" className={inlineLinkClass}>Morse Code Alphabet</Link> page and for numbers see <Link href="/morse-code-numbers" className={inlineLinkClass}>Morse Code Numbers</Link>.</>} />
        <h3 className="mb-4 text-xl font-bold text-slate-950 dark:text-white">Alphabet</h3>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full min-w-[560px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-800 dark:text-slate-400"><tr><th className="px-4 py-3">Letter</th><th className="px-4 py-3">Morse</th><th className="px-4 py-3">Letter</th><th className="px-4 py-3">Morse</th></tr></thead><tbody className="divide-y divide-slate-100 dark:divide-slate-800">{Array.from({length:13},(_,i)=>{const a=alphabet[i];const b=alphabet[i+13];return <tr key={a[0]}><td className="px-4 py-3 font-bold">{a[0]}</td><td className="px-4 py-3 font-mono font-semibold text-green-700 dark:text-green-400">{a[1]}</td><td className="px-4 py-3 font-bold">{b[0]}</td><td className="px-4 py-3 font-mono font-semibold text-green-700 dark:text-green-400">{b[1]}</td></tr>})}</tbody></table>
        </div>
        <h3 className="mb-4 mt-10 text-xl font-bold text-slate-950 dark:text-white">Numbers</h3>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full min-w-[500px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-800 dark:text-slate-400"><tr><th className="px-4 py-3">Number</th><th className="px-4 py-3">Morse</th><th className="px-4 py-3">Number</th><th className="px-4 py-3">Morse</th></tr></thead><tbody className="divide-y divide-slate-100 dark:divide-slate-800">{Array.from({length:5},(_,i)=>{const a=numbers[i];const b=numbers[i+5];return <tr key={a[0]}><td className="px-4 py-3 font-bold">{a[0]}</td><td className="px-4 py-3 font-mono font-semibold text-green-700 dark:text-green-400">{a[1]}</td><td className="px-4 py-3 font-bold">{b[0]}</td><td className="px-4 py-3 font-mono font-semibold text-green-700 dark:text-green-400">{b[1]}</td></tr>})}</tbody></table>
        </div>
        <h3 className="mb-4 mt-10 text-xl font-bold text-slate-950 dark:text-white">Common Symbols</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{punctuation.map(([char,code])=><div key={char} className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900"><div className="flex items-center justify-between"><span className="font-bold text-slate-950 dark:text-white">{char}</span><span className="font-mono text-sm font-semibold text-green-700 dark:text-green-400">{code}</span></div></div>)}</div>
      </section>

      {/* H2: Sounds */}
      <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40">
        <div className={sectionClass}>
          <SectionHeading title="Morse Code Sounds: The Rhythm of Communication" intro={<>Morse is not only something you type or read; it is a timed audio language. A short tone, a longer tone, and the gaps between them create a rhythm that can be learned as a recognizable pattern.</>} />
          <div className="grid gap-5 md:grid-cols-3">
            <div className={cardClass}><h3 className="text-lg font-bold text-slate-950 dark:text-white">E: The Shortest Character</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">E is represented by a single dot, making it a useful starting point for hearing the shortest basic signal.</p></div>
            <div className={cardClass}><h3 className="text-lg font-bold text-slate-950 dark:text-white">SOS: A Memorable Rhythm</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">SOS is <span className="font-mono font-bold text-green-700 dark:text-green-400">... --- ...</span>, a pattern of three short signals, three long signals, and three short signals.</p></div>
            <div className={cardClass}><h3 className="text-lg font-bold text-slate-950 dark:text-white">Timing Creates Meaning</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">If the spaces are inconsistent, a stream of tones can become difficult to recognize. Timing is part of the information.</p></div>
          </div>
        </div>
      </section>

      {/* H2: Modern Uses */}
      <section className={sectionClass}>
        <SectionHeading title="Modern Uses of Morse Code" intro={<>Morse code is no longer limited to telegraph offices. It survives in radio practice, accessibility technology, navigation identifiers, education, creative work, puzzles, and signaling.</>} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ['Jewellery', 'Dot-and-dash patterns can be used to encode names, dates, or private messages in jewelry and gifts.'],
            ['Tattoo', 'Morse patterns are sometimes used as a compact visual way to represent names or short phrases in tattoos.'],
            ['Education', 'Teachers can use Morse to demonstrate encoding, timing, communication history, and pattern recognition.'],
            ['Assistive Communication', 'Morse-based input has been used in assistive technology. Google has documented Morse input in Gboard and switch-access possibilities.'],
            ['Radio', 'Morse remains an established amateur-radio mode commonly called CW.'],
            ['Navigation', 'Some aviation navigation aids use Morse identifiers. FAA guidance describes Morse identification for VORs and other navigation facilities.'],
            ['Encoded Messages', 'Morse is a simple way to turn an ordinary phrase into a pattern that another person can decode.'],
            ['Military Signals', 'Morse has a long history in military and field communications, although modern systems are much broader than Morse alone.'],
            ['Rescue', 'Morse can be used for signaling when simple sound or light is available; it is especially well known through SOS.'],
            ['Games & Puzzles', 'Escape rooms, puzzles, games, and challenges often use Morse as a decoding layer.'],
          ].map(([title,text])=><div key={title} className={cardClass}><h3 className="text-lg font-bold text-slate-950 dark:text-white">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{text}</p></div>)}
        </div>
        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm leading-7">
          <ExternalReference href="https://blog.google/products-and-platforms/products/search/making-morse-code-available-more-people-gboard/">Google on Morse input and accessibility</ExternalReference>
          <ExternalReference href="https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap1_section_1.html">FAA guidance on Morse navigation identifiers</ExternalReference>
        </div>
      </section>

      {/* H2: Why Morse Code Still Matters */}
      <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40">
        <div className={sectionClass}>
          <SectionHeading title="Why Morse Code Still Matters Today" />
          <div className="grid gap-5 md:grid-cols-5">
            {[
              ['Skill & Hobby', 'It remains a practical learning challenge and an enjoyable hobby.'],
              ['Cultural Heritage', 'Morse connects modern learners with the history of telegraphy and radiotelegraphy.'],
              ['Emergency Signaling', 'Simple timed signals can communicate through light or sound when appropriate.'],
              ['Technology', 'Morse-based input continues to appear in software and assistive interfaces.'],
              ['Communication', 'Its small alphabet of timed signals can work across several physical media.'],
            ].map(([title,text])=><div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900"><h3 className="font-bold text-slate-950 dark:text-white">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{text}</p></div>)}
          </div>
        </div>
      </section>

      {/* H2: International v American */}
      <section className={sectionClass}>
        <SectionHeading title="International Morse Code vs American Morse Code" intro={<>The two systems are related historically but are not interchangeable. International Morse is the modern international reference used for radiotelegraphy; American Morse was used in U.S. landline telegraphy and has different character patterns and conventions.</>} />
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-800 dark:text-slate-400"><tr><th className="px-5 py-4">Feature</th><th className="px-5 py-4">International Morse</th><th className="px-5 py-4">American Morse</th></tr></thead><tbody className="divide-y divide-slate-100 dark:divide-slate-800"><tr><td className="px-5 py-4 font-semibold">Main context</td><td className="px-5 py-4">International telegraphy and radiotelegraphy</td><td className="px-5 py-4">Historical U.S. landline telegraphy</td></tr><tr><td className="px-5 py-4 font-semibold">Character patterns</td><td className="px-5 py-4">Uses the International Morse character set</td><td className="px-5 py-4">Contains historical patterns that differ from International Morse</td></tr><tr><td className="px-5 py-4 font-semibold">Modern reference</td><td className="px-5 py-4">ITU Recommendation M.1677 is the current published International Morse reference</td><td className="px-5 py-4">Primarily studied as telegraph history</td></tr></tbody></table>
        </div>
        <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">Reference: <ExternalReference href="https://www.itu.int/rec/R-REC-M.1677">ITU-R Recommendation M.1677 — International Morse code</ExternalReference>.</p>
      </section>

      {/* H2: mirror alphabets list */}
      <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40">
        <div className={sectionClass}>
          <SectionHeading title="Mirror Alphabet List" intro={<>A mirror alphabet pairs the first letter with the last letter, the second with the second-to-last, and so on. This is a simple reverse-alphabet learning reference—not a standard Morse-code rule.</>} />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">{mirrorAlphabet.map(([left,right])=><div key={left} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center dark:border-slate-800 dark:bg-slate-900"><span className="text-lg font-extrabold text-slate-950 dark:text-white">{left}</span><span className="mx-2 text-slate-400">↔</span><span className="text-lg font-extrabold text-green-700 dark:text-green-400">{right}</span></div>)}</div>
        </div>
      </section>

      {/* H2: Prosigns */}
      <section className={sectionClass}>
        <SectionHeading title="Morse Code Prosigns" intro={<>Prosigns are special sequences sent as a single procedural signal in Morse communication. They are useful when you are studying radio operating practice, but their exact use depends on the operating context.</>} />
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-800 dark:text-slate-400"><tr><th className="px-5 py-4">Prosign</th><th className="px-5 py-4">Morse</th><th className="px-5 py-4">Common meaning</th></tr></thead><tbody className="divide-y divide-slate-100 dark:divide-slate-800">{[['AR','.-.-.','End of message'],['SK','...-.-','End of contact / transmission'],['BT','-...-','Break or separator'],['AS','.-...','Wait'],['KN','-.--.','Invitation for a specific station to transmit']].map(([a,b,c])=><tr key={a}><td className="px-5 py-4 font-bold">{a}</td><td className="px-5 py-4 font-mono font-bold text-green-700 dark:text-green-400">{b}</td><td className="px-5 py-4">{c}</td></tr>)}</tbody></table></div>
      </section>

      {/* H2: Q-codes */}
      <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40">
        <div className={sectionClass}>
          <SectionHeading title="Morse Code Q-Codes" intro={<>Q-codes are standardized three-letter radio signals. They are not Morse characters themselves, but many are commonly sent as Morse abbreviations in radio communication.</>} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[['QTH','Location / position'],['QRM','Interference from other stations'],['QRN','Atmospheric or natural noise'],['QRS','Send more slowly'],['QRZ','Who is calling?'],['QSL','Acknowledgment / confirmation']].map(([code,meaning])=><div key={code} className={cardClass}><div className="font-mono text-xl font-black text-green-700 dark:text-green-400">{code}</div><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{meaning}</p></div>)}</div>
          <p className="mt-6 text-sm leading-7 text-slate-600 dark:text-slate-300">For radio-operating context and common procedural abbreviations, see the <ExternalReference href="https://www.arrl.org/quick-reference-operating-aids">ARRL quick-reference operating aids</ExternalReference>.</p>
        </div>
      </section>

      {/* H2: Common mistakes */}
      <section className={sectionClass}>
        <SectionHeading title="Common Morse Code Mistakes" />
        <div className="grid gap-5 md:grid-cols-3">
          <div className={cardClass}><h3 className="text-lg font-bold text-slate-950 dark:text-white">Forget and Miss Something</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">Missing one dot or holding a signal too long can change the character. If a message looks wrong, re-check the original signal instead of forcing a guess.</p></div>
          <div className={cardClass}><h3 className="text-lg font-bold text-slate-950 dark:text-white">Swapping Dot and Dash</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">Fast tapping can cause a dot to become a dash or a dash to become a dot. Slow the practice speed and focus on complete character rhythms.</p></div>
          <div className={cardClass}><h3 className="text-lg font-bold text-slate-950 dark:text-white">Separation</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">Incorrect spacing can merge characters or split a word incorrectly. Keep letter and word boundaries consistent when writing or decoding.</p></div>
        </div>
      </section>

      {/* H2: Understanding Your Settings */}
      <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40">
        <div className={sectionClass}>
          <SectionHeading title="Understanding Your Settings" intro={<>The controls change how the signal is presented; they do not change the underlying International Morse character pattern.</>} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[['Speed','Controls how quickly the Morse signal is played. A lower WPM can make practice easier for beginners.'],['Frequency','Changes the audio tone in hertz. A comfortable mid-range tone is often easier to hear.'],['Volume','Controls playback loudness. It does not alter dot or dash timing.'],['Flash','Turns the encoded sequence into timed visual signals for practice.'],['Repeat','Repeats playback when enabled, useful for listening drills.'],['Sound','Lets you turn audio output on or off while keeping the translation visible.'],['Vibrate','Uses supported device vibration for a simple tactile signal pattern.'],['WAV Download','Creates an audio file from the current Morse output and selected audio settings.']].map(([title,text])=><div key={title} className={cardClass}><div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"><Settings2 className="h-5 w-5" /></div><h3 className="text-lg font-bold text-slate-950 dark:text-white">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{text}</p></div>)}
          </div>
          <p className="mt-6 text-sm leading-7 text-slate-600 dark:text-slate-300">For the underlying timing rules, see our <Link href="/morse-code-timing" className={inlineLinkClass}>Morse Code Timing guide</Link>.</p>
        </div>
      </section>

      {/* H2: Discover more */}
      <section className={sectionClass}>
        <SectionHeading title="Discover More" intro={<>Go deeper into the most recognizable parts of Morse code and related topics. These are contextual links rather than a separate generic resource list.</>} />
        <div className="grid gap-5 md:grid-cols-3">
          <Link href="/sos-morse-code" className={cardClass}><h3 className="text-lg font-bold text-slate-950 dark:text-white">SOS Morse Code</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">Explore <span className="font-mono font-bold">... --- ...</span>, its history, and how to practice it.</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-green-700 dark:text-green-400">Read SOS guide <ArrowRight className="h-4 w-4" /></span></Link>
          <Link href="/morse-code-sounds" className={cardClass}><h3 className="text-lg font-bold text-slate-950 dark:text-white">International Morse & Audio</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">Learn the standardized character patterns and practice recognizing them by sound.</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-green-700 dark:text-green-400">Explore Morse sounds <ArrowRight className="h-4 w-4" /></span></Link>
          <div className={cardClass}><h3 className="text-lg font-bold text-slate-950 dark:text-white">Titanic and SOS</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">Morse radio operators on the Titanic used the older CQD signal alongside the newer SOS distress signal during the 1912 disaster.</p><p className="mt-3 text-xs leading-6 text-slate-500 dark:text-slate-400">Historical context should be read alongside primary or institutional sources.</p></div>
        </div>
        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm leading-7">
          <ExternalReference href="https://www.itu.int/rec/R-REC-M.1677">ITU International Morse standard</ExternalReference>
          <ExternalReference href="https://siarchives.si.edu/blog/forgotten-history-alfred-vail-and-samuel-morse">Smithsonian history of Morse and Vail</ExternalReference>
          <ExternalReference href="https://blog.google/products-and-platforms/products/search/making-morse-code-available-more-people-gboard/">Google Morse accessibility example</ExternalReference>
        </div>
      </section>

      {/* H2: Morse Font */}
      <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40">
        <div className={sectionClass}>
          <SectionHeading title="Morse Font" intro={<>A Morse font or visual Morse reference can display ordinary characters alongside their dot-and-dash representations. This is useful for educational worksheets, posters, creative projects, and quick study—not as a replacement for learning the timing of real Morse signals.</>} />
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-800 dark:text-slate-400"><tr><th className="px-5 py-4">Character</th><th className="px-5 py-4">Morse representation</th><th className="px-5 py-4">Character</th><th className="px-5 py-4">Morse representation</th></tr></thead><tbody className="divide-y divide-slate-100 dark:divide-slate-800">{Array.from({length:13},(_,i)=>{const a=alphabet[i];const b=alphabet[i+13];return <tr key={a[0]}><td className="px-5 py-3 font-bold">{a[0]}</td><td className="px-5 py-3 font-mono text-green-700 dark:text-green-400">{a[1]}</td><td className="px-5 py-3 font-bold">{b[0]}</td><td className="px-5 py-3 font-mono text-green-700 dark:text-green-400">{b[1]}</td></tr>})}</tbody></table></div>
        </div>
      </section>

      {/* H2: Troubleshoot */}
      <section className={sectionClass}>
        <SectionHeading title="Troubleshoot" intro={<>Most translation problems come from unsupported characters, incorrect spacing, or audio settings that make the signal difficult to hear. Use the checks below before assuming the translator is malfunctioning.</>} />
        <div className="space-y-3">
          {[
            ['Morse code is not translating', 'Check that the input uses recognizable dots and dashes and that character boundaries are separated correctly.'],
            ['Words are separating incorrectly', 'Review the word separator and make sure spaces have not been inserted or removed inside a character.'],
            ['Audio is too fast', 'Lower the Speed/WPM setting and replay the message. Beginners often benefit from slower practice before increasing speed.'],
            ['Audio is hard to hear', 'Adjust Frequency and Volume, and check that the Sound control is enabled.'],
            ['Flash or vibration is not available', 'Some browser/device capabilities depend on hardware and browser permissions. Use audio or the written output when those capabilities are unavailable.'],
          ].map(([q,a])=><details key={q} className="group rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><summary className="cursor-pointer list-none font-bold text-slate-950 marker:hidden dark:text-white">{q}<span className="float-right text-green-600">+</span></summary><p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">{a}</p></details>)}
        </div>
      </section>

      {/* H2: conclusion */}
      <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40">
        <div className={sectionClass}>
          <div className="rounded-3xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-7 sm:p-10 dark:border-green-900/50 dark:from-green-950/30 dark:to-slate-900">
            <h2 className={headingClass}>Conclusion</h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300">Morse code is a compact language of timed signals that connects communication history with modern learning, radio, accessibility, navigation, and creative projects. The easiest way to understand it is to combine the written patterns with sound, timing, and repeated practice.</p>
            <div className="mt-6 flex flex-wrap gap-3"><Link href="/learn-morse-code" className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-800">Start learning <ArrowRight className="h-4 w-4" /></Link><Link href="/morse-code-alphabet" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-green-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white">View alphabet <BookOpen className="h-4 w-4" /></Link></div>
          </div>
        </div>
      </section>

      {/* H2: Ready to Translate? */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white dark:from-green-800 dark:via-green-900 dark:to-emerald-950">
        <div className="mx-auto w-full max-w-5xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Ready to Translate?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-green-50">Jump back to the translator above and turn your text into Morse code, decode dots and dashes, or practice the signal with audio and visual modes.</p>
          <a href="#translator" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-green-700 shadow-lg transition hover:bg-green-50">Scroll to Translator <ArrowRight className="h-4 w-4" /></a>
        </div>
      </section>

      {/* H2: FAQ */}
      <section id="faq" className={sectionClass}>
        <SectionHeading title="Morse Code Translator FAQ" intro={<>Answers to the most common questions about translating, decoding, timing, audio, learning, and modern Morse-code use.</>} />
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          {faqs.map((faq, index) => <details key={faq.question} className="group border-b border-slate-200 px-5 py-5 last:border-b-0 dark:border-slate-800"><summary className="cursor-pointer list-none pr-8 font-bold text-slate-950 marker:hidden dark:text-white">{faq.question}<span className="float-right text-xl font-normal text-green-600 transition group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">{faq.answer}</p></details>)}
        </div>
      </section>

      {/* H2: Related Blogs */}
      <section className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40">
        <div className={sectionClass}>
          <SectionHeading title="Related Blogs" intro={<>Continue exploring the topics that support the translator: learning, timing, sounds, history, and common Morse-code phrases.</>} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['/learn-morse-code','How to Learn Morse Code','Build recognition with sound, rhythm, repetition, and structured practice.'],
              ['/morse-code-timing','Morse Code Timing','Understand dot, dash, character, and word timing before increasing speed.'],
              ['/morse-code-sounds','Morse Code Sounds','Practice listening to Morse as a rhythm rather than a stream of random tones.'],
              ['/what-is-morse-code','What Is Morse Code?','Read a broader introduction to the history and signaling system.'],
              ['/sos-morse-code','SOS in Morse Code','Learn the famous distress signal and its historical context.'],
              ['/morse-code-quiz','Morse Code Quiz','Test your recognition of letters, numbers, and common patterns.'],
              ['/hello-in-morse-code','Hello in Morse Code','See how a familiar word is represented character by character.'],
              ['/i-love-you-in-morse-code','I Love You in Morse Code','Explore a popular phrase and practice its Morse representation.'],
              ['/morse-code-decoder','Morse Code Decoder','Decode Morse into readable text with a dedicated tool.'],
            ].map(([href,title,text])=><Link key={href} href={href} className={cardClass}><h3 className="text-lg font-bold text-slate-950 dark:text-white">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{text}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-green-700 dark:text-green-400">Read more <ArrowRight className="h-4 w-4" /></span></Link>)}
          </div>
        </div>
      </section>
    </main>
  );
}
