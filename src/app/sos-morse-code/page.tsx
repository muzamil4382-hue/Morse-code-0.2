import Link from "next/link";
import {
  WordPageTemplate,
  generateWordPageMeta,
} from "@/components/morse/word-page-template";
import { generateHowToSchema } from "@/lib/seo";

const sosHowToSteps = [
  {
    name: "Produce Three Short Signals",
    text: "Using your chosen method (flashlight, whistle, tapping, or radio), produce three short signals. Each short signal should last approximately one second. This represents the three dots (...) in SOS Morse code.",
  },
  {
    name: "Produce Three Long Signals",
    text: "Immediately after the three short signals, produce three long signals. Each long signal should last approximately three seconds, which is precisely three times the length of a short signal. This represents the three dashes (---) in SOS.",
  },
  {
    name: "Produce Three Short Signals Again",
    text: "Complete the pattern with three more short signals, identical to step one. The full three-short, three-long, three-short sequence forms the complete SOS distress signal. Pause briefly, then repeat the entire pattern at regular intervals until you receive a response.",
  },
];

const config = {
  word: "SOS",
  morseStr: "... --- ...",
  title: "SOS in Morse Code",
  metaTitle: "SOS in Morse Code (... --- ...) - The Universal Distress Signal",
  description:
    "Learn everything about SOS in Morse code: its history as the universal distress signal, how to transmit it, when to use it, and the story of the Titanic.",
  slug: "sos-morse-code",

  faqs: [
    {
      question: "What does SOS stand for?",
      answer:
        "SOS doesn't stand for anything — it was chosen purely because its pattern of three dots, three dashes, three dots is easy to transmit and unmistakable in an emergency. The popular meanings 'Save Our Souls' and 'Save Our Ship' are backronyms created after the fact.",
    },
    {
      question: "When was SOS adopted?",
      answer:
        "SOS was adopted as the international distress signal at the International Radio Telegraphic Convention of 1906 in Berlin, and it became the official global standard in 1908, replacing the earlier CQD distress call.",
    },
    {
      question: "How do you signal SOS with a flashlight?",
      answer:
        "Flash three short bursts, three long bursts, then three short bursts. Repeat this pattern at regular intervals. The key is consistency — rescuers will be looking for a repeated pattern of three-short, three-long, three-short.",
    },
  ],

  relatedWords: [
    {
      word: "Help Me",
      slug: "help-me-in-morse-code",
      morse: ".... . .-.. .--. / -- .",
    },
    {
      word: "Hello",
      slug: "hello-in-morse-code",
      morse: ".... . / .-.. .-.. / ---",
    },
    {
      word: "I Love You",
      slug: "i-love-you-in-morse-code",
      morse: ".. / .-.. / --- / ...- / . / -.-- / --- / ..-",
    },
  ],
};

export const metadata = generateWordPageMeta(config);

export default function SOSPage() {
  const howToSchema = generateHowToSchema(sosHowToSteps);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      <WordPageTemplate config={config}>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          The Universal Distress Signal
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          SOS is perhaps the most universally recognized signal in human
          history. Its Morse code representation —{" "}
          <strong className="font-mono text-green-600">
            ... --- ...
          </strong>{" "}
          (three dots, three dashes, three dots) — is instantly identifiable
          by anyone who has ever been near a radio, a television, or a movie
          theater. SOS transcends language barriers, cultural differences, and
          technological changes. Whether transmitted by telegraph, radio,
          flashlight, or even smoke signal, the pattern is unmistakable.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          History of SOS
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Before SOS became the standard, maritime distress was signaled using{" "}
          <strong>CQD</strong> (general call all stations, distress). CQD was
          proposed by the Marconi Company and was used beginning in 1904, but
          it had significant drawbacks: the letters CQD didn&apos;t have a
          distinctive rhythm that was easy to recognize in poor conditions,
          and it could be confused with the general call CQ.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          The German government first proposed SOS (then called{" "}
          <em>Notzeichen</em>) in 1905. At the{" "}
          <strong>International Radio Telegraphic Convention of 1906</strong>{" "}
          in Berlin, SOS was officially adopted as the international distress
          signal. It became effective on July 1, 1908. The new signal was
          chosen because its simple, symmetrical pattern of three-three-three
          is easy to transmit even under extreme stress and difficult
          conditions, and it&apos;s nearly impossible to confuse with any other
          signal.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          The Titanic and SOS
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          The most famous SOS call in history came from the{" "}
          <strong>RMS Titanic</strong> on the night of April 14–15, 1912.
          After striking an iceberg, the Titanic&apos;s wireless operators Jack
          Phillips and Harold Bride initially sent CQD calls before switching
          to the newer SOS signal. They sent both signals repeatedly, becoming
          one of the first ships to use SOS in a real emergency. Their distress
          calls were received by the SS Carpathia, which steamed through
          dangerous ice fields to reach the stricken liner, ultimately
          rescuing 706 survivors.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          The Titanic disaster was a watershed moment for maritime safety. It
          led to the first International Convention for the Safety of Life at
          Sea (SOLAS) in 1914, which mandated that all ships maintain 24-hour
          radio watch and carry sufficient lifeboat capacity for all passengers
          and crew. The event cemented SOS as the undisputed universal distress
          signal.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          How to Signal SOS
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          SOS can be signaled using virtually any medium. The key is the{" "}
          <strong>three-short, three-long, three-short</strong> pattern,
          repeated at regular intervals. You can also practice the signal with
          our{" "}
          <Link
            href="/morse-code-sounds"
            className="text-green-600 underline"
          >
            Morse code sounds
          </Link>{" "}
          resource to become familiar with the rhythm and timing.
        </p>

        <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
          <li>
            <strong>Light (flashlight):</strong> Three short flashes, three
            long flashes, three short flashes
          </li>

          <li>
            <strong>Sound (whistle/horn):</strong> Three short blasts, three
            long blasts, three short blasts
          </li>

          <li>
            <strong>Radio:</strong> Transmit ... --- ... on any frequency
          </li>

          <li>
            <strong>Visual (mirror/flag):</strong> Three short signals, three
            long signals, three short signals
          </li>

          <li>
            <strong>Tapping:</strong> Tap the pattern on any hard surface
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          When to Use SOS
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          SOS should only be used in genuine emergencies where there is{" "}
          <strong>immediate danger to life</strong>. False SOS signals are
          illegal in most jurisdictions and can divert critical rescue
          resources from actual emergencies, potentially costing lives. If
          you&apos;re in doubt about whether your situation warrants an SOS
          call, err on the side of caution — rescue authorities would rather
          respond to a non-emergency than miss a genuine one.
        </p>

        <p className="text-slate-700 leading-relaxed">
          Practice signaling SOS now so that you can do it instinctively in an
          emergency. Our{" "}
          <Link href="/" className="text-green-600 underline">
            Morse code translator
          </Link>{" "}
          can help you practice the rhythm. For a deeper understanding of dot,
          dash, and spacing durations, see our{" "}
          <Link
            href="/morse-code-timing"
            className="text-green-600 underline"
          >
            Morse code timing
          </Link>{" "}
          guide. Understanding this simple signal could one day save your life
          or the life of someone you love.
        </p>
      </WordPageTemplate>
    </>
  );
}