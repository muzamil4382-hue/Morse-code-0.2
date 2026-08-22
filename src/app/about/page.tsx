import type { Metadata } from "next";
import Link from "next/link";
import {
  generatePageMeta,
  generateBreadcrumbSchema,
} from "@/lib/seo";

export const metadata: Metadata = generatePageMeta(
  "About Morse Code Translater - Our Mission, Content & Team",
  "Learn about Morse Code Translater, our mission, the Morse Code Translater Team, our approach to content accuracy, and the free tools and learning resources available on our website.",
  "/about",
  [
    "about morse code translater",
    "morse code translater team",
    "morse code tools",
    "morse code learning resources",
  ]
);

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-sm text-slate-500 mb-8"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="hover:text-green-600 transition-colors"
          >
            Home
          </Link>

          <span className="text-slate-400">/</span>

          <span className="text-slate-900 dark:text-white font-medium">
            About
          </span>
        </nav>

        {/* Hero */}
        <section className="mb-12">
          <div className="inline-flex items-center rounded-full bg-green-50 border border-green-100 px-3 py-1 text-sm font-medium text-green-700 mb-4">
            About Morse Code Translater
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-5">
            Making Morse Code Easier to Translate, Learn and Explore
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            MorseCodeTranslater.com provides free tools, reference pages,
            learning resources and educational content designed to help people
            translate, understand and practice Morse code.
          </p>
        </section>

        {/* Mission */}
        <section className="mb-12">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-2xl">
                🎯
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Our Mission
                </h2>

                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Our goal is simple: make Morse code easier to access and
                  understand. Whether you want to translate a message, decode
                  dots and dashes, learn the alphabet, practice timing or test
                  your knowledge, we aim to provide useful resources in one
                  place.
                </p>

                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Morse code is still studied and practiced by people around
                  the world, including hobbyists, students and amateur radio
                  enthusiasts. We focus on making the core concepts easier to
                  explore through practical tools and clear educational
                  content.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mb-12">
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-2xl">
                👥
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  The Morse Code Translater Team
                </h2>

                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  The Morse Code Translater Team creates and maintains the
                  tools, guides, reference pages and educational content
                  published on MorseCodeTranslater.com.
                </p>

                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Our focus is on building practical resources that are easy
                  to use and easy to understand. Content is reviewed for
                  clarity and relevance before publication, and important
                  pages may be updated when corrections or improvements are
                  needed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="mb-12">
          <div className="mb-7">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              What You Can Find on Our Website
            </h2>

            <p className="text-slate-600 dark:text-slate-400 max-w-3xl">
              Our resources are organized around translating, decoding,
              learning and practicing Morse code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Link
              href="/"
              className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-green-400 hover:shadow-md transition-all"
            >
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-green-600 transition-colors">
                🔤 Morse Code Translator
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Convert supported text into Morse code or decode Morse code
                back into readable text.
              </p>
            </Link>

            <Link
              href="/morse-code-decoder"
              className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-green-400 hover:shadow-md transition-all"
            >
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-green-600 transition-colors">
                🔓 Morse Code Decoder
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Decode dots and dashes and better understand how Morse code
                characters and spacing work.
              </p>
            </Link>

            <Link
              href="/morse-code-alphabet"
              className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-green-400 hover:shadow-md transition-all"
            >
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-green-600 transition-colors">
                📋 Morse Code Alphabet
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Explore the Morse code patterns for letters and use the
                alphabet as a practical reference while learning.
              </p>
            </Link>

            <Link
              href="/morse-code-numbers"
              className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-green-400 hover:shadow-md transition-all"
            >
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-green-600 transition-colors">
                🔢 Morse Code Numbers
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Learn how numbers from 0 to 9 are represented using dots and
                dashes.
              </p>
            </Link>

            <Link
              href="/learn-morse-code"
              className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-green-400 hover:shadow-md transition-all"
            >
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-green-600 transition-colors">
                📖 Learn Morse Code
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Follow learning resources and practice techniques designed to
                help beginners build recognition and confidence.
              </p>
            </Link>

            <Link
              href="/morse-code-quiz"
              className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-green-400 hover:shadow-md transition-all"
            >
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-green-600 transition-colors">
                🎯 Morse Code Quiz
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Test your recognition and understanding through interactive
                Morse code practice.
              </p>
            </Link>
          </div>
        </section>

        {/* Accuracy & Content */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Our Approach to Accuracy
              </h2>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                We aim to provide clear and accurate information about Morse
                code and the tools available on this website. When explaining
                International Morse code, timing or historical information, we
                review content and update important pages when necessary.
              </p>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                If you find an error or believe information needs correction,
                you can contact our team so it can be reviewed.
              </p>
            </div>

            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Content and Updates
              </h2>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                Our website includes tools, reference content, guides and
                articles. We may update pages to improve clarity, correct
                information, add useful resources or reflect changes to the
                website.
              </p>

              <Link
                href="/editorial-policy"
                className="inline-flex items-center font-semibold text-green-600 hover:text-green-700 underline"
              >
                Read our Editorial Policy →
              </Link>
            </div>
          </div>
        </section>

        {/* Trust & Transparency */}
        <section className="mb-12 bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/40 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Transparency and Website Information
          </h2>

          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 max-w-3xl">
            We believe visitors should be able to understand who operates the
            website, how to contact us and where to find important information
            about the use of our tools and content.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              href="/contact"
              className="p-4 bg-white dark:bg-slate-900 border border-green-100 dark:border-slate-800 rounded-xl text-center font-medium text-slate-800 dark:text-slate-200 hover:border-green-400 hover:text-green-600 transition-colors"
            >
              Contact
            </Link>

            <Link
              href="/editorial-policy"
              className="p-4 bg-white dark:bg-slate-900 border border-green-100 dark:border-slate-800 rounded-xl text-center font-medium text-slate-800 dark:text-slate-200 hover:border-green-400 hover:text-green-600 transition-colors"
            >
              Editorial Policy
            </Link>

            <Link
              href="/privacy"
              className="p-4 bg-white dark:bg-slate-900 border border-green-100 dark:border-slate-800 rounded-xl text-center font-medium text-slate-800 dark:text-slate-200 hover:border-green-400 hover:text-green-600 transition-colors"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="p-4 bg-white dark:bg-slate-900 border border-green-100 dark:border-slate-800 rounded-xl text-center font-medium text-slate-800 dark:text-slate-200 hover:border-green-400 hover:text-green-600 transition-colors"
            >
              Terms
            </Link>
          </div>
        </section>

        {/* Popular Tools */}
        <section className="mb-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Explore Popular Morse Code Tools
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium hover:bg-green-100 transition-colors"
            >
              🔤 Translator
            </Link>

            <Link
              href="/morse-code-decoder"
              className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium hover:bg-green-100 transition-colors"
            >
              🔓 Decoder
            </Link>

            <Link
              href="/morse-code-alphabet"
              className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium hover:bg-green-100 transition-colors"
            >
              📋 Alphabet
            </Link>

            <Link
              href="/morse-code-sounds"
              className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium hover:bg-green-100 transition-colors"
            >
              🔊 Sounds
            </Link>

            <Link
              href="/learn-morse-code"
              className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium hover:bg-green-100 transition-colors"
            >
              📖 Learn
            </Link>

            <Link
              href="/morse-code-quiz"
              className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium hover:bg-green-100 transition-colors"
            >
              🎯 Quiz
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}