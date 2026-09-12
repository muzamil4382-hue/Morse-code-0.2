
import Link from "next/link";
import {
  generatePageMeta,
  generateBreadcrumbSchema,
} from "@/lib/seo";

export const metadata: Metadata = generatePageMeta(
  "Morse Code Translator Disclaimer | Accuracy, Use & Limitations",
  "Understand how Morse Code Translator tools and educational content should be used, including translation accuracy, International Morse Code conventions, emergency communication limits, external links, and important website limitations.",
  "/disclaimer",
  [
    "morse code translator disclaimer",
    "morse code disclaimer",
    "morse code educational use",
    "morse code translation accuracy",
    "morse code tool limitations",
    "international morse code disclaimer",
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
              <time dateTime="2026-09-12">
                September 12, 2026
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
              are designed to make Morse code easier to understand and practice;
              they are not intended to replace official communication procedures,
              operational manuals, licensed instruction, or specialized training.
            </p>

            <p>
              Because online tools depend on the information entered by the user,
              the selected character set, and the way a message is formatted,
              users should review important output before relying on it. A
              translation result should not be treated as proof that a message is
              suitable for a particular radio, maritime, aviation, military, or
              other regulated communication system.
            </p>
          </section>

          {/* Accuracy */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Translation Accuracy and Standards
            </h2>

            <p>
              Our tools are intended to follow commonly used International Morse
              Code conventions for standard letters, numbers, and punctuation.
              Morse code has also been used in different historical, technical,
              and operational contexts, where procedures or available character
              sets may differ. For that reason, a result generated here should
              be checked against the standard or procedure that applies to your
              specific use case.
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

          {/* How to use the tools responsibly */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              How to Use Our Morse Code Tools
            </h2>

            <p>
              For ordinary learning, practice, and personal projects, you can
              use the translator and decoder to convert messages, check Morse
              characters, and understand how text is represented in dots and
              dashes. For best results, review the input and output rather than
              copying a result blindly.
            </p>

            <div className="my-6 grid gap-4 sm:grid-cols-3 not-prose">
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="font-bold text-slate-900">1. Enter carefully</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Check spelling, punctuation, spacing, and the message you want
                  to translate or decode.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="font-bold text-slate-900">2. Check the output</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Compare important characters with a trusted Morse code
                  reference, especially when the message matters.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="font-bold text-slate-900">3. Follow the right standard</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Use the applicable official procedure when your message is part
                  of a regulated or professional communication system.
                </p>
              </div>
            </div>
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
                href="/blog/sos-signal-morse-code-everything-you-need-to-know"
                className="font-medium text-green-700 hover:underline"
              >
                SOS in Morse code
              </Link>
              , is provided for educational purposes. Readers should seek
              appropriate professional training before relying on Morse code for
              emergency communication.
            </p>
          </section>

          {/* Educational vs operational use */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Educational Use vs. Operational Communication
            </h2>

            <p>
              There is an important difference between learning Morse code online
              and using Morse code as part of an operational communication
              procedure. An educational website can explain characters, timing,
              examples, and common conventions, but an operational environment
              may impose additional requirements for equipment, identification,
              message format, timing, authentication, or emergency procedures.
            </p>

            <p>
              If your use involves aviation, maritime operations, amateur radio,
              military procedures, public safety, or another regulated setting,
              follow the current instructions and standards issued by the
              responsible authority or organization.
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
              Nothing on this website should be interpreted as professional, legal,
              technical, safety, aviation, maritime, military, or regulatory
              advice. Requirements can vary depending on your
              location, organization, equipment, and intended use.
            </p>

            <p>
              For licensing requirements, professional training, operational
              procedures, or regulatory compliance, consult the appropriate
              authority, certified instructor, or official organization.
            </p>
          </section>

          {/* Website and tool limitations */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Website and Tool Limitations
            </h2>

            <p>
              Online services can be affected by browser behavior, device
              compatibility, network availability, software changes, maintenance,
              or other technical conditions. We do not guarantee uninterrupted
              availability of every page, feature, or tool.
            </p>

            <p>
              Information on this website may also change as pages are reviewed,
              corrected, expanded, or reorganized. Where a specific external
              standard or procedure controls your situation, that official source
              should take priority over general educational information published
              here.
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
              We do not control third-party websites and cannot guarantee the
              accuracy, availability, security, or privacy practices of external
              services. A link does not necessarily mean that we endorse every
              statement, product, or service found on the destination website.
              Visiting an external website is subject to that website&apos;s own
              terms, policies, and privacy practices.
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
                . We review relevant reports and, when a correction is warranted,
                may update the affected page or tool.
              </p>
            </div>
          </section>

          {/* Reader responsibility */}
          <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 not-prose">
            <h2 className="text-2xl font-bold text-slate-900">
              What This Means for You
            </h2>

            <p className="mt-3 text-slate-700 leading-relaxed">
              You are welcome to use Morse Code Translator for learning,
              experimentation, personal projects, and general reference. For
              decisions where an incorrect Morse code message could create a
              safety, legal, regulatory, or operational risk, verify the
              information with the appropriate official source or qualified
              professional before acting on it.
            </p>
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