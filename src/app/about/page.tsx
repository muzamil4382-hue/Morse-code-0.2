import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMeta, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta(
  "About MorseCode.World - Our Mission & Team",
  "Learn about MorseCode.World, our mission to make Morse code accessible to everyone, and the team behind the platform.",
  "/about",
  ["about morsecode.world", "morse code platform", "morse code tools"]
);

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://morsecode.world" },
    { name: "About", url: "https://morsecode.world/about" },
  ]);

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-medium">About</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">About MorseCode.World</h1>
          <p className="text-lg text-slate-600">
            The free, comprehensive Morse code resource for learners, hobbyists, and professionals.
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
          <p>
            MorseCode.World exists to make Morse code accessible to everyone. Whether you&apos;re a student
            learning about the history of communication, an amateur radio operator preparing for your license
            exam, or simply someone who finds the elegance of dots and dashes fascinating, our platform provides
            the tools and knowledge you need.
          </p>
          <p>
            We believe that Morse code is more than a historical curiosity — it&apos;s a living language that
            continues to serve vital roles in emergency communication, assistive technology, aviation, and
            amateur radio. Our goal is to preserve and promote this remarkable invention by making it easy and
            enjoyable to learn.
          </p>

          <h2 className="text-2xl font-bold text-slate-900">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <div className="p-5 bg-white border border-slate-200 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-2">🔤 Free Translator</h3>
              <p className="text-sm text-slate-600">Real-time text-to-Morse and Morse-to-text translation with audio playback, adjustable speed and frequency, and copy/download features.</p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-2">📋 Complete Reference Charts</h3>
              <p className="text-sm text-slate-600">Visual charts for the complete alphabet, numbers, and punctuation with dot and dash patterns and memory tips.</p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-2">📖 Learning Guides</h3>
              <p className="text-sm text-slate-600">Step-by-step tutorials covering the Koch method, mnemonic tricks, practice routines, and progress tracking.</p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-2">🎯 Interactive Quizzes</h3>
              <p className="text-sm text-slate-600">Test your knowledge with interactive quizzes that adapt to your level and help you identify areas for improvement.</p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-2">📚 Educational Content</h3>
              <p className="text-sm text-slate-600">In-depth articles on Morse code history, modern applications, sounds and timing, and word/phrase translations.</p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-2">💰 100% Free</h3>
              <p className="text-sm text-slate-600">No sign-up, no ads, no premium tiers. All tools and content are completely free and will remain so.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">Our Values</h2>
          <p>
            We built MorseCode.World around three core principles. First, <strong>accessibility</strong>: everything
            we create should be usable by anyone, regardless of their technical skill, age, or ability. Second,{" "}
            <strong>accuracy</strong>: our tools follow the International Morse Code standard (ITU-R M.1677), and
            our educational content is thoroughly researched and regularly updated. Third,{" "}
            <strong>simplicity</strong>: we believe the best tools are the ones that get out of your way and let
            you focus on learning.
          </p>

          <h2 className="text-2xl font-bold text-slate-900">Connect With Us</h2>
          <p>
            We&apos;d love to hear from you! Whether you have feedback, suggestions for new features, or questions
            about Morse code, don&apos;t hesitate to reach out. Visit our{" "}
            <Link href="/contact" className="text-green-600 underline">contact page</Link> or check out our{" "}
            <Link href="/blog" className="text-green-600 underline">blog</Link> for the latest articles and updates.
          </p>
        </div>
      </div>
    
        {/* Popular Tools */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Popular Morse Code Tools</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Link href="/" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              🔤 Translator
            </Link>
            <Link href="/morse-code-decoder" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              🔓 Decoder
            </Link>
            <Link href="/morse-code-alphabet" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              📋 Alphabet
            </Link>
            <Link href="/learn-morse-code" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              📖 Learn
            </Link>
            <Link href="/morse-code-quiz" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              🎯 Quiz
            </Link>
            <Link href="/contact" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              ✉️ Contact Us
            </Link>
          </div>
        </section>
      </main>
  );
}
