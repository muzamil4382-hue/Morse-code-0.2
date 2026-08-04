import Link from "next/link";
import { WordPageTemplate, generateWordPageMeta } from "@/components/morse/word-page-template";

const config = {
  word: "LOVE",
  morseStr: ".-.. / --- / ...- / .",
  title: "Love in Morse Code",
  metaTitle: "Love in Morse Code (.-.. --- ...- .) - Complete Guide",
  description: "Learn how to express 'Love' in Morse code with visual dot and dash patterns, letter-by-letter breakdown, and creative ways to use it in jewelry, tattoos, and messages.",
  slug: "love-in-morse-code",
  faqs: [
    { question: "What is love in Morse code?", answer: "\"Love\" in Morse code is: .-.. / --- / ...- / . That's L (dot-dash-dot-dot), O (three dashes), V (dot-dot-dot-dash), E (single dot)." },
    { question: "How is Morse code used in love jewelry?", answer: "Morse code jewelry uses two different bead sizes — small round beads for dots and longer oval or tube beads for dashes. The beads are arranged to spell out words like 'Love' in a beautiful, subtle pattern that looks like decorative beading to the untrained eye." },
  ],
  relatedWords: [
    { word: "I Love You", slug: "i-love-you-in-morse-code", morse: ".. / .-.. / --- / ...- / . / -.-- / --- / ..-" },
    { word: "Hi", slug: "hi-in-morse-code", morse: ".... .." },
    { word: "Hello", slug: "hello-in-morse-code", morse: ".... . / .-.. .-.. / ---" },
    { word: "Help", slug: "help-in-morse-code", morse: ".... . .-.. .--." },
  ],
};

export const metadata = generateWordPageMeta(config);

export default function LovePage() {
  return (
    <WordPageTemplate config={config}>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">The Word &quot;Love&quot; Encoded in Dots and Dashes</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        &quot;Love&quot; — perhaps the most powerful word in any language. In Morse code, this four-letter word
        becomes an elegant sequence of dots and dashes that has inspired jewelry designers, tattoo artists, and
        romantics around the world. The Morse code for &quot;love&quot; has a particularly beautiful rhythm that
        flows smoothly from one letter to the next, making it satisfying to both send and receive.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">Letter-by-Letter Breakdown</h2>
      <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
        <li><strong>L</strong> = <span className="font-mono text-green-600">.-..</span> (dot-dash-dot-dot) — starts with a quick tap, followed by a longer signal, then two more taps. Think of it as a heartbeat: quick pulse, long pulse, two quick taps.</li>
        <li><strong>O</strong> = <span className="font-mono text-green-600">---</span> (three dashes) — three long, sustained signals. The O in love is dramatic and full, like a deep breath before speaking your feelings.</li>
        <li><strong>V</strong> = <span className="font-mono text-green-600">...-</span> (three dots, one dash) — the famous &quot;V for Victory&quot; rhythm, three quick taps building to a strong finish.</li>
        <li><strong>E</strong> = <span className="font-mono text-green-600">.</span> (single dot) — the simplest and most common letter in English, just one quick tap. The final dot of &quot;love&quot; ends the word with a soft, quiet exclamation.</li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">Morse Code Love in Popular Culture</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        Morse code jewelry has become a massive trend in recent years, and the word &quot;love&quot; is by far
        the most popular choice. The concept is simple but brilliant: use two different sizes of beads (small for
        dots, elongated for dashes) strung on a bracelet or necklace to spell out a word in Morse code. To anyone
        who doesn&apos;t know the code, it looks like a beautiful piece of decorative jewelry. But to you and your
        loved one, it carries a secret message.
      </p>
      <p className="text-slate-700 leading-relaxed mb-4">
        The appeal lies in the privacy and intentionality of the gesture. Unlike a heart-shaped pendant or an
        engraved name — which broadcast their meaning to everyone — Morse code jewelry is subtle and personal.
        It says, &quot;This message is for you and you alone.&quot; This quality of secrecy has made Morse code
        particularly popular for romantic gifts, promise rings, and wedding accessories.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">Creative Uses for &quot;Love&quot; in Morse Code</h2>
      <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
        <li><strong>Bracelets and Necklaces:</strong> The most popular Morse code jewelry format. Beads in two sizes create the dot-dash pattern.</li>
        <li><strong>Tattoos:</strong> Minimalist dot and dash tattoos on wrists, behind ears, or along collarbones.</li>
        <li><strong>Wedding Bands:</strong> Engraved on the inside of rings, visible only to the wearer.</li>
        <li><strong>Love Letters:</strong> End a handwritten letter with the Morse code for &quot;love&quot; as a hidden sign-off.</li>
        <li><strong>Home Decor:</strong> Morse code spelled out in nails on a wooden board, or sewn into a quilt pattern.</li>
        <li><strong>Sticky Notes:</strong> Leave a small note with dots and dashes on your partner&apos;s mirror or lunch bag.</li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Romantic Phrases</h2>
      <p className="text-slate-700 leading-relaxed">
        Beyond &quot;love,&quot; there are many other romantic words and phrases you can express in Morse code.
        <Link href="/i-love-you-in-morse-code" className="text-green-600 underline"> &quot;I Love You&quot;</Link> is the
        most popular, but you can also try &quot;Kiss&quot; ({" "}
        <span className="font-mono text-green-600">-.- / .. / ... / ...</span>), &quot;Hug&quot; ({" "}
        <span className="font-mono text-green-600">.... / ..- / --.</span>), and &quot;Heart&quot; ({" "}
        <span className="font-mono text-green-600">.... / .- .-. -</span>). Use our{" "}
        <Link href="/morse-code-translator" className="text-green-600 underline">translator</Link> to convert any
        romantic phrase into Morse code.
      </p>
    </WordPageTemplate>
  );
}
