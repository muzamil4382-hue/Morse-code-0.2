import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMeta, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta(
  "Privacy Policy | Morse Code Translator",
  "Read the Privacy Policy for Morse Code Translator and learn how we handle website usage data, contact information, cookies, and your privacy.",
  "/privacy",
  [
    "privacy policy",
    "morse code translator privacy",
    "website privacy policy",
    "data privacy",
  ]
);

export default function PrivacyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Privacy Policy", url: "/privacy" },
  ]);

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-sm text-slate-500 mb-6"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="hover:text-green-600 transition-colors"
          >
            Home
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-medium">
            Privacy Policy
          </span>
        </nav>

        {/* Hero */}
        <div className="mb-10 border-b border-slate-200 pb-8">
          <div className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700 mb-4">
            Legal & Privacy
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Privacy Policy
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            This Privacy Policy explains how Morse Code Translator handles
            information when you use our website, Morse code tools, learning
            resources, and contact features.
          </p>

          <p className="text-sm text-slate-500 mt-5">
            <strong>Last updated:</strong> August 22, 2026
          </p>
        </div>

        {/* Quick Summary */}
        <section className="mb-10 not-prose">
          <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              Privacy at a Glance
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl bg-white border border-green-100 p-4">
                <div className="text-lg mb-2">🔒</div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  Your Translations
                </h3>
                <p className="text-sm text-slate-600">
                  Morse code translations are designed to be processed directly
                  through the website tool and are not intentionally stored as
                  personal messages.
                </p>
              </div>

              <div className="rounded-xl bg-white border border-green-100 p-4">
                <div className="text-lg mb-2">📩</div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  Contact Information
                </h3>
                <p className="text-sm text-slate-600">
                  Information you voluntarily send through our contact options
                  may be used to respond to your request.
                </p>
              </div>

              <div className="rounded-xl bg-white border border-green-100 p-4">
                <div className="text-lg mb-2">🍪</div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  Cookies & Technology
                </h3>
                <p className="text-sm text-slate-600">
                  Your browser or third-party services may use cookies or
                  similar technologies where applicable.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="prose prose-slate max-w-none space-y-7 text-slate-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-slate-900">
            1. Introduction
          </h2>

          <p>
            Morse Code Translator respects your privacy. This Privacy Policy
            explains how information may be collected, used, and handled when
            you visit and use{" "}
            <Link href="/" className="text-green-600 underline">
              Morse Code Translator
            </Link>{" "}
            and related pages on{" "}
            <strong>morsecodetranslater.com</strong>.
          </p>

          <p>
            By using our website, you agree to the practices described in this
            Privacy Policy. If you do not agree with this policy, please
            discontinue use of the website.
          </p>

          <h2 className="text-2xl font-bold text-slate-900">
            2. Information We May Collect
          </h2>

          <p>
            Depending on how you interact with the website, we may collect or
            receive limited categories of information.
          </p>

          <div className="not-prose overflow-hidden rounded-xl border border-slate-200 my-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="text-left p-4 font-semibold text-slate-900">
                      Information Type
                    </th>
                    <th className="text-left p-4 font-semibold text-slate-900">
                      Example
                    </th>
                    <th className="text-left p-4 font-semibold text-slate-900">
                      Why It May Be Used
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-4 font-medium text-slate-900">
                      Usage Information
                    </td>
                    <td className="p-4 text-slate-600">
                      Pages visited, browser information, device type
                    </td>
                    <td className="p-4 text-slate-600">
                      Website performance and improvement
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 font-medium text-slate-900">
                      Contact Information
                    </td>
                    <td className="p-4 text-slate-600">
                      Name, email address, and message you provide
                    </td>
                    <td className="p-4 text-slate-600">
                      Responding to questions or support requests
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 font-medium text-slate-900">
                      Technical Information
                    </td>
                    <td className="p-4 text-slate-600">
                      IP-related information, browser settings, cookies
                    </td>
                    <td className="p-4 text-slate-600">
                      Security, functionality, analytics, or service delivery
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            3. Morse Code Translation Data
          </h2>

          <div className="not-prose rounded-xl border-l-4 border-green-600 bg-green-50 p-5 my-6">
            <h3 className="font-bold text-slate-900 mb-2">
              How the Translator Handles Your Input
            </h3>

            <p className="text-sm text-slate-700 leading-relaxed">
              Morse Code Translator is designed to provide instant text-to-Morse
              and Morse-to-text conversion. Text entered into the translator is
              used to generate the requested output. We do not intentionally
              use your translation content as a personal profile or publish your
              private messages.
            </p>
          </div>

          <p>
            We recommend that you avoid entering highly sensitive personal,
            financial, medical, or confidential information into any public
            online tool unless you are comfortable with the applicable privacy
            and security practices.
          </p>

          <h2 className="text-2xl font-bold text-slate-900">
            4. How We May Use Information
          </h2>

          <p>Information may be used to:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and maintain website functionality.</li>
            <li>Improve the Morse code tools and educational content.</li>
            <li>Respond to messages and support requests.</li>
            <li>Understand general website performance and usage patterns.</li>
            <li>Protect the website from abuse, security issues, or technical problems.</li>
            <li>Maintain and improve the overall user experience.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900">
            5. Cookies and Similar Technologies
          </h2>

          <p>
            Our website or third-party services used with the website may use
            cookies, local storage, or similar technologies. These technologies
            can help maintain functionality, remember certain preferences, or
            provide aggregated information about website usage.
          </p>

          <p>
            Most web browsers allow you to manage or disable cookies through
            browser settings. Please note that disabling certain technologies
            may affect how some website features function.
          </p>

          <h2 className="text-2xl font-bold text-slate-900">
            6. Third-Party Services and External Links
          </h2>

          <p>
            Morse Code Translator may link to external websites, educational
            resources, or third-party services. These websites operate under
            their own privacy policies and practices.
          </p>

          <div className="not-prose rounded-xl border border-amber-200 bg-amber-50 p-5 my-6">
            <p className="text-sm text-amber-900">
              <strong>Important:</strong> We do not control external websites.
              Before providing personal information to a third-party website,
              review that website&apos;s privacy policy and terms.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            7. Data Security
          </h2>

          <p>
            We take reasonable steps to protect the information associated with
            operating our website. However, no internet-based service, website,
            or method of electronic transmission can be guaranteed to be
            completely secure.
          </p>

          <p>
            You use the website at your own discretion and should take normal
            precautions when sharing information online.
          </p>

          <h2 className="text-2xl font-bold text-slate-900">
            8. Children&apos;s Privacy
          </h2>

          <p>
            Morse Code Translator provides educational tools and content that
            may be useful to learners of different ages. We do not knowingly
            seek to collect unnecessary personal information from children.
          </p>

          <p>
            If you believe that a child has provided personal information
            through our website without appropriate permission, please{" "}
            <Link href="/contact" className="text-green-600 underline">
              contact us
            </Link>{" "}
            so that we can review the situation.
          </p>

          <h2 className="text-2xl font-bold text-slate-900">
            9. Your Privacy Choices
          </h2>

          <p>
            Depending on applicable law and the information involved, you may
            have rights relating to your personal information, including the
            ability to request access, correction, or deletion.
          </p>

          <p>
            To submit a privacy-related request, please use our{" "}
            <Link href="/contact" className="text-green-600 underline">
              Contact Us page
            </Link>.
          </p>

          <h2 className="text-2xl font-bold text-slate-900">
            10. Changes to This Privacy Policy
          </h2>

          <p>
            We may update this Privacy Policy as the website, its features, or
            applicable requirements change. When changes are made, the
            &quot;Last updated&quot; date at the top of this page will be
            revised.
          </p>

          <h2 className="text-2xl font-bold text-slate-900">
            11. Contact Us
          </h2>

          <p>
            If you have questions about this Privacy Policy, our website, or how
            information is handled, please visit our{" "}
            <Link href="/contact" className="text-green-600 underline">
              Contact Us page
            </Link>.
          </p>
        </div>

        {/* Related Pages */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Related Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/terms"
              className="group rounded-xl border border-slate-200 bg-white p-5 hover:border-green-400 hover:shadow-sm transition-all"
            >
              <span className="text-xl">📄</span>
              <h3 className="font-semibold text-slate-900 mt-3 group-hover:text-green-600">
                Terms & Conditions
              </h3>
              <p className="text-sm text-slate-600 mt-2">
                Review the terms for using our website and tools.
              </p>
            </Link>

            <Link
              href="/disclaimer"
              className="group rounded-xl border border-slate-200 bg-white p-5 hover:border-green-400 hover:shadow-sm transition-all"
            >
              <span className="text-xl">⚠️</span>
              <h3 className="font-semibold text-slate-900 mt-3 group-hover:text-green-600">
                Disclaimer
              </h3>
              <p className="text-sm text-slate-600 mt-2">
                Important information about the use of our content and tools.
              </p>
            </Link>

            <Link
              href="/contact"
              className="group rounded-xl border border-slate-200 bg-white p-5 hover:border-green-400 hover:shadow-sm transition-all"
            >
              <span className="text-xl">✉️</span>
              <h3 className="font-semibold text-slate-900 mt-3 group-hover:text-green-600">
                Contact Us
              </h3>
              <p className="text-sm text-slate-600 mt-2">
                Get in touch with the Morse Code Translator team.
              </p>
            </Link>
          </div>
        </section>

        {/* Popular Tools */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Explore Morse Code Tools
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors"
            >
              🔤 Translator
            </Link>

            <Link
              href="/morse-code-decoder"
              className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors"
            >
              🔓 Decoder
            </Link>

            <Link
              href="/morse-code-alphabet"
              className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors"
            >
              📋 Alphabet
            </Link>

            <Link
              href="/learn-morse-code"
              className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors"
            >
              📖 Learn
            </Link>

            <Link
              href="/morse-code-quiz"
              className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors"
            >
              🎯 Quiz
            </Link>

            <Link
              href="/morse-code-timing"
              className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors"
            >
              ⏱️ Timing Guide
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}