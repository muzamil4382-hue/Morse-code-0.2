import type { Metadata } from "next";
import Link from "next/link";
import {
  generatePageMeta,
  generateBreadcrumbSchema,
} from "@/lib/seo";

export const metadata: Metadata = generatePageMeta(
  "Terms & Conditions | Morse Code Translator",
  "Read the Terms and Conditions for using Morse Code Translator, including acceptable use, intellectual property, translation accuracy, limitations, and website policies.",
  "/terms",
  [
    "morse code translator terms",
    "terms and conditions",
    "morse code terms of service",
    "website terms",
  ]
);

export default function TermsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Terms & Conditions", url: "/terms" },
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
            Terms &amp; Conditions
          </span>
        </nav>

        {/* Header */}
        <header className="mb-10 border-b border-slate-200 pb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
            Website Terms
          </div>

          <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Terms &amp; Conditions
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-slate-600">
            These Terms and Conditions explain the rules and guidelines for
            using Morse Code Translator, including our tools, educational
            content, and other website resources.
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
              Morse Code Translator Team
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
              • You may use our tools and educational resources for lawful
              personal and educational purposes.
            </li>

            <li>
              • You must not attempt to disrupt, misuse, or gain unauthorized
              access to the website.
            </li>

            <li>
              • Morse code translations should be independently verified when
              used for professional, regulated, or critical purposes.
            </li>

            <li>
              • The website and its services are provided subject to these
              Terms and Conditions.
            </li>
          </ul>
        </section>

        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">

          {/* Acceptance */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              1. Acceptance of These Terms
            </h2>

            <p>
              By accessing or using{" "}
              <Link
                href="/"
                className="font-medium text-green-700 hover:underline"
              >
                Morse Code Translator
              </Link>
              , you agree to be bound by these Terms and Conditions. If you do
              not agree with these terms, you should not use the website or its
              services.
            </p>

            <p>
              These Terms apply to your use of our Morse code translation
              tools, decoder, educational resources, blog articles, quizzes,
              reference charts, and other content available on the website.
            </p>
          </section>

          {/* Service */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              2. Description of the Service
            </h2>

            <p>
              Morse Code Translator provides free online tools and educational
              resources related to International Morse code. Our website may
              include text-to-Morse translation, Morse-to-text decoding,
              alphabet and number references, timing guides, audio tools,
              quizzes, tutorials, and informational articles.
            </p>

            <div className="my-6 rounded-xl border border-slate-200 bg-slate-50 p-5 not-prose">
              <h3 className="mb-3 font-bold text-slate-900">
                Popular tools and resources
              </h3>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  href="/"
                  className="rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium text-green-700 transition hover:border-green-400"
                >
                  Morse Code Translator →
                </Link>

                <Link
                  href="/morse-code-decoder"
                  className="rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium text-green-700 transition hover:border-green-400"
                >
                  Morse Code Decoder →
                </Link>

                <Link
                  href="/morse-code-alphabet"
                  className="rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium text-green-700 transition hover:border-green-400"
                >
                  Morse Code Alphabet →
                </Link>

                <Link
                  href="/learn-morse-code"
                  className="rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium text-green-700 transition hover:border-green-400"
                >
                  Learn Morse Code →
                </Link>
              </div>
            </div>

            <p>
              We may modify, improve, add, remove, or update website features
              and content at any time without prior notice.
            </p>
          </section>

          {/* Acceptable Use */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              3. Acceptable Use
            </h2>

            <p>
              You agree to use Morse Code Translator only for lawful purposes
              and in a manner that does not interfere with the website, its
              users, or its infrastructure.
            </p>

            <div className="my-6 rounded-2xl border border-slate-200 bg-white p-6 not-prose">
              <h3 className="mb-4 font-bold text-slate-900">
                You agree not to:
              </h3>

              <ul className="space-y-3 text-sm leading-relaxed text-slate-700">
                <li>
                  <strong>• Violate applicable laws:</strong> Use the website
                  for any unlawful or prohibited activity.
                </li>

                <li>
                  <strong>• Attempt unauthorized access:</strong> Try to access
                  restricted systems, servers, or website functionality without
                  authorization.
                </li>

                <li>
                  <strong>• Disrupt the service:</strong> Interfere with the
                  website&apos;s operation, security, or availability.
                </li>

                <li>
                  <strong>• Abuse automated systems:</strong> Use automated
                  methods in a way that places an unreasonable load on the
                  website or bypasses normal access controls.
                </li>

                <li>
                  <strong>• Misrepresent the website:</strong> Present Morse
                  Code Translator content or services as your own without
                  appropriate permission.
                </li>
              </ul>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              4. Intellectual Property
            </h2>

            <p>
              Unless otherwise stated, the original website design, software,
              branding, written content, graphics, and other materials created
              for Morse Code Translator are owned by or licensed to the website
              and are protected by applicable intellectual property laws.
            </p>

            <p>
              You may use the website and its publicly available resources for
              personal and educational purposes. You may not reproduce,
              redistribute, or commercially exploit substantial portions of our
              original content without appropriate permission, except where
              permitted by applicable law.
            </p>

            <p>
              Morse code itself and the translation output generated by the
              tools are not claimed as exclusive property of Morse Code
              Translator. Users remain responsible for how they use generated
              output.
            </p>
          </section>

          {/* Accuracy */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              5. Accuracy of Information and Tools
            </h2>

            <p>
              We make reasonable efforts to provide accurate information and
              useful Morse code translations. However, no online tool or
              educational resource can guarantee suitability for every use
              case.
            </p>

            <p>
              Our content is intended primarily for learning and general
              reference. If Morse code is being used in a professional,
              regulated, maritime, aviation, emergency, or other critical
              environment, you should verify the relevant standards and
              procedures independently.
            </p>

            <p>
              For more information about the limitations of our tools and
              content, please read our{" "}
              <Link
                href="/disclaimer"
                className="font-medium text-green-700 hover:underline"
              >
                Disclaimer
              </Link>
              .
            </p>
          </section>

          {/* Emergency */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              6. Emergency Use
            </h2>

            <div className="my-6 rounded-2xl border border-red-200 bg-red-50 p-6 not-prose">
              <h3 className="mb-2 font-bold text-red-900">
                ⚠️ Do not rely solely on this website in an emergency
              </h3>

              <p className="text-sm leading-relaxed text-red-800">
                Morse Code Translator is an educational website and online
                tool. In a genuine emergency, internet access and online
                services may not be available. Use officially recognized
                emergency communication methods and contact local emergency
                services whenever possible.
              </p>
            </div>

            <p>
              Information about signals such as{" "}
              <Link
                href="/sos-morse-code"
                className="font-medium text-green-700 hover:underline"
              >
                SOS in Morse code
              </Link>{" "}
              is provided for educational purposes and should not replace
              appropriate emergency training or communication equipment.
            </p>
          </section>

          {/* Third Party Links */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              7. Third-Party Links
            </h2>

            <p>
              Our website may include links to third-party websites,
              organizations, research sources, or educational resources. These
              links are provided for convenience and additional information.
            </p>

            <p>
              We do not control third-party websites and are not responsible
              for their content, availability, security, policies, or
              practices. Accessing an external website is subject to that
              website&apos;s own terms and privacy policies.
            </p>
          </section>

          {/* Privacy */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              8. Privacy
            </h2>

            <p>
              Your use of Morse Code Translator is also subject to our{" "}
              <Link
                href="/privacy"
                className="font-medium text-green-700 hover:underline"
              >
                Privacy Policy
              </Link>
              , which explains how information may be handled when you visit
              and use the website.
            </p>
          </section>

          {/* Changes */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              9. Changes to These Terms
            </h2>

            <p>
              We may update these Terms and Conditions when necessary to
              reflect changes to the website, its services, or applicable
              requirements.
            </p>

            <p>
              When changes are made, the &quot;Last updated&quot; date at the
              top of this page may be revised. Your continued use of the
              website after updated terms are posted constitutes acceptance of
              the revised Terms and Conditions.
            </p>
          </section>

          {/* Related Policies */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Related Policies and Information
            </h2>

            <div className="not-prose grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link
                href="/privacy"
                className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-green-400 hover:shadow-sm"
              >
                <h3 className="font-bold text-slate-900 group-hover:text-green-700">
                  Privacy Policy
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Learn how information may be handled when using our website.
                </p>
              </Link>

              <Link
                href="/disclaimer"
                className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-green-400 hover:shadow-sm"
              >
                <h3 className="font-bold text-slate-900 group-hover:text-green-700">
                  Disclaimer
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Important limitations and intended uses of our tools and
                  educational content.
                </p>
              </Link>

              <Link
                href="/editorial-policy"
                className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-green-400 hover:shadow-sm"
              >
                <h3 className="font-bold text-slate-900 group-hover:text-green-700">
                  Editorial Policy
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Learn how the Morse Code Translator Team creates and reviews
                  website content.
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
                  Learn more about our mission and the purpose of the website.
                </p>
              </Link>
            </div>
          </section>

          {/* Contact */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              10. Contact Us
            </h2>

            <p>
              If you have questions about these Terms and Conditions, please
              visit our{" "}
              <Link
                href="/contact"
                className="font-medium text-green-700 hover:underline"
              >
                Contact Us page
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