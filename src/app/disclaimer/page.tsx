import type { Metadata } from "next";
import Link from "next/link";
import {
  generatePageMeta,
  generateBreadcrumbSchema,
} from "@/lib/seo";

export const metadata: Metadata = generatePageMeta(
  "Disclaimer | Morse Code Translator",
  "Read the Morse Code Translator disclaimer, including information about educational use, translation accuracy, emergency communication, external links, and content limitations.",
  "/disclaimer",
  [
    "morse code translator disclaimer",
    "morse code disclaimer",
    "morse code educational use",
    "morse code translation accuracy",
  ]
);

export default function DisclaimerPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Disclaimer", url: "/disclaimer" },
  ]);

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        {/* Breadcrumb */}
        <nav
          className="mb-6 flex items-center gap-2 text-sm text-slate-500"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="transition-colors hover:text-green-600"
          >
            Home
          </Link>

          <span className="text-slate-400">/</span>

          <span className="font-medium text-slate-900">
            Disclaimer
          </span>
        </nav>

        {/* Page Header */}
        <header className="mb-10 border-b border-slate-200 pb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
            Website Information
          </div>

          <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Disclaimer
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-slate-600">
            Important information about the intended use, limitations, accuracy,
            and educational purpose of the tools and content available on
            Morse Code Translator.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-500">
            <span>
              Last updated:{" "}
              <time dateTime="2026-08-22">
                August 22, 2026
              </time>
            </span>

            <span className="hidden text-slate-300 sm:inline">
              •
            </span>

            <span>
              Published by Morse Code Translator Team
            </span>
          </div>
        </header>

        {/* Quick Summary */}
        <section className="mb-10 rounded-2xl border border-green-200 bg-green-50 p-6">
          <h2 className="mb-3 text-xl font-bold text-slate-900">
            Quick Summary
          </h2>

          <ul className="space-y-2 text-sm leading-relaxed text-slate-700">
            <li>
              • Our tools and educational content are provided for general
              informational and learning purposes.
            </li>

            <li>
              • We aim for accuracy, but you should independently verify
              information when it is required for professional or critical use.
            </li>

            <li>
              • Do not rely solely on this website during a life-threatening
              emergency.
            </li>

            <li>
              • External websites linked from our content are governed by their
              own content and privacy practices.
            </li>
          </ul>
        </section>

        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
          {/* General Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              General Disclaimer
            </h2>

            <p>
              The information, educational materials, and Morse code tools
              provided on{" "}
              <Link
                href="/"
                className="font-medium text-green-700 hover:underline"
              >
                Morse Code Translator
              </Link>{" "}
              are intended for general informational and educational purposes.
              We make reasonable efforts to provide useful and accurate content,
              but we do not guarantee that all information on the website is
              complete, current, or suitable for every situation.
            </p>

            <p>
              The website includes tools for translating text to Morse code,
              decoding Morse code, learning Morse code characters, practicing
              timing, and exploring related educational resources. These tools
              should be used as learning and reference aids rather than as a
              substitute for professional communication systems or specialized
              training.
            </p>
          </section>

          {/* Accuracy */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Translation Accuracy and Standards
            </h2>

            <p>
              Our tools are designed around commonly recognized International
              Morse code conventions. However, Morse code has historical and
              regional variations, and different organizations may follow
              specific procedures or communication requirements.
            </p>

            <div className="my-6 rounded-xl border border-slate-200 bg-slate-50 p-5 not-prose">
              <h3 className="mb-3 font-bold text-slate-900">
                For important or professional use
              </h3>

              <p className="text-sm leading-relaxed text-slate-600">
                If you are using Morse code for aviation, maritime operations,
                amateur radio licensing, military communication, emergency
                procedures, or another regulated environment, verify the
                required standard and procedures with the relevant authority or
                official documentation.
              </p>
            </div>

            <p>
              For general learning and everyday translations, you can use our{" "}
              <Link
                href="/"
                className="font-medium text-green-700 hover:underline"
              >
                Morse Code Translator
              </Link>
              ,{" "}
              <Link
                href="/morse-code-decoder"
                className="font-medium text-green-700 hover:underline"
              >
                Morse Code Decoder
              </Link>
              , and{" "}
              <Link
                href="/morse-code-alphabet"
                className="font-medium text-green-700 hover:underline"
              >
                Morse Code Alphabet
              </Link>{" "}
              as educational reference tools.
            </p>
          </section>

          {/* Emergency */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Emergency Use Disclaimer
            </h2>

            <div className="my-6 rounded-2xl border border-red-200 bg-red-50 p-6 not-prose">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-xl">
                  ⚠️
                </div>

                <div>
                  <h3 className="mb-2 font-bold text-red-900">
                    Do not rely solely on this website during an emergency
                  </h3>

                  <p className="text-sm leading-relaxed text-red-800">
                    Morse Code Translator is an online educational platform.
                    Internet access, devices, browsers, and online tools may
                    not be available or reliable during an emergency. In a
                    life-threatening situation, use officially recognized
                    emergency communication methods and contact local emergency
                    services whenever possible.
                  </p>
                </div>
              </div>
            </div>

            <p>
              Information about distress signals, including{" "}
              <Link
                href="/sos-morse-code"
                className="font-medium text-green-700 hover:underline"
              >
                SOS in Morse code
              </Link>
              , is provided for educational purposes. Readers should seek
              appropriate professional training before relying on Morse code for
              emergency communication.
            </p>
          </section>

          {/* Educational Content */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Educational Content
            </h2>

            <p>
              Our articles, guides, tutorials, charts, quizzes, and learning
              resources are created to help users understand Morse code and its
              history, timing, sounds, symbols, and practical applications.
              Educational content may be updated when we identify improvements,
              corrections, or information that needs clarification.
            </p>

            <p>
              To learn more about how our content is created and reviewed,
              please read our{" "}
              <Link
                href="/editorial-policy"
                className="font-medium text-green-700 hover:underline"
              >
                Editorial Policy
              </Link>
              . You can also learn more about the people and purpose behind the
              website on our{" "}
              <Link
                href="/about"
                className="font-medium text-green-700 hover:underline"
              >
                About Us page
              </Link>
              .
            </p>
          </section>

          {/* No Professional Advice */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              No Professional Advice
            </h2>

            <p>
              Nothing on this website should be interpreted as professional,
              legal, technical, safety, aviation, maritime, military, or
              regulatory advice. Requirements can vary depending on your
              location, organization, equipment, and intended use.
            </p>

            <p>
              For licensing requirements, professional training, operational
              procedures, or regulatory compliance, consult the appropriate
              authority, certified instructor, or official organization.
            </p>
          </section>

          {/* External Links */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              External Links and Third-Party Content
            </h2>

            <p>
              Some articles and pages may link to external websites, references,
              organizations, or educational resources. These links are provided
              for additional information and convenience.
            </p>

            <p>
              We do not control third-party websites and are not responsible for
              their content, availability, accuracy, security, or privacy
              practices. Visiting an external website is subject to that
              website&apos;s own terms and policies.
            </p>
          </section>

          {/* Updates and Corrections */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Updates and Corrections
            </h2>

            <p>
              We aim to maintain accurate and useful information. If you notice
              an error, outdated information, or a problem with one of our Morse
              code tools, we encourage you to contact us.
            </p>

            <div className="my-6 rounded-xl border border-green-200 bg-green-50 p-5 not-prose">
              <p className="text-sm leading-relaxed text-slate-700">
                You can report a potential error or send feedback through our{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-green-700 hover:underline"
                >
                  Contact Us page
                </Link>
                . The Morse Code Translator Team will review relevant reports
                and make corrections when appropriate.
              </p>
            </div>
          </section>

          {/* Related Pages */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Related Website Policies
            </h2>

            <div className="not-prose grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link
                href="/editorial-policy"
                className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-green-400 hover:shadow-sm"
              >
                <h3 className="font-bold text-slate-900 group-hover:text-green-700">
                  Editorial Policy
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Learn how our content is researched, reviewed, updated, and
                  corrected.
                </p>
              </Link>

              <Link
                href="/privacy"
                className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-green-400 hover:shadow-sm"
              >
                <h3 className="font-bold text-slate-900 group-hover:text-green-700">
                  Privacy Policy
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Understand how information is handled when you use our
                  website.
                </p>
              </Link>

              <Link
                href="/terms"
                className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-green-400 hover:shadow-sm"
              >
                <h3 className="font-bold text-slate-900 group-hover:text-green-700">
                  Terms &amp; Conditions
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Review the terms that apply when using Morse Code Translator.
                </p>
              </Link>

              <Link
                href="/about"
                className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-green-400 hover:shadow-sm"
              >
                <h3 className="font-bold text-slate-900 group-hover:text-green-700">
                  About Us
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Learn more about Morse Code Translator and our mission.
                </p>
              </Link>
            </div>
          </section>

          {/* Contact */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Contact Us
            </h2>

            <p>
              If you have questions or concerns about this disclaimer or believe
              that information on our website requires correction, please{" "}
              <Link
                href="/contact"
                className="font-medium text-green-700 hover:underline"
              >
                contact the Morse Code Translator Team
              </Link>
              .
            </p>
          </section>
        </div>

        {/* Popular Tools */}
        <section className="mt-14 border-t border-slate-200 pt-10">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
              Explore
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Popular Morse Code Tools
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 font-medium text-green-700 transition hover:bg-green-100"
            >
              🔤 Translator
            </Link>

            <Link
              href="/morse-code-decoder"
              className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 font-medium text-green-700 transition hover:bg-green-100"
            >
              🔓 Decoder
            </Link>

            <Link
              href="/morse-code-alphabet"
              className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 font-medium text-green-700 transition hover:bg-green-100"
            >
              📋 Alphabet
            </Link>

            <Link
              href="/learn-morse-code"
              className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 font-medium text-green-700 transition hover:bg-green-100"
            >
              📖 Learn
            </Link>

            <Link
              href="/morse-code-quiz"
              className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 font-medium text-green-700 transition hover:bg-green-100"
            >
              🎯 Quiz
            </Link>

            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 font-medium text-green-700 transition hover:bg-green-100"
            >
              ✉️ Contact Us
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}