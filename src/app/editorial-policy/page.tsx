import type { Metadata } from "next";
import Link from "next/link";
import {
  generatePageMeta,
  generateBreadcrumbSchema,
} from "@/lib/seo";

export const metadata: Metadata = generatePageMeta(
  "Editorial Policy | Morse Code Translator",
  "Learn how Morse Code Translator creates, reviews, updates, and maintains accurate educational content about Morse code, communication, and related topics.",
  "/editorial-policy",
  [
    "editorial policy",
    "morse code translator editorial policy",
    "content standards",
    "morse code information",
  ]
);

export default function EditorialPolicyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Editorial Policy", url: "/editorial-policy" },
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
            Editorial Policy
          </span>
        </nav>

        {/* Hero */}
        <header className="mb-10 border-b border-slate-200 pb-8">
          <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-700">
            Our Content Standards
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Editorial Policy
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            At Morse Code Translator, we aim to provide clear, accurate, and
            useful information about Morse code, communication systems, and
            related educational topics.
          </p>
        </header>

        <div className="space-y-10 text-slate-700 leading-relaxed">
          {/* Who creates content */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Who Creates Our Content
            </h2>

            <p>
              Content published on{" "}
              <strong>Morse Code Translator</strong> is created and maintained
              by the <strong>Morse Code Translator Team</strong>. Our team
              researches educational topics, develops practical tools, and
              creates guides designed to help beginners, students, hobbyists,
              and anyone interested in learning Morse code.
            </p>

            <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-5">
              <p className="font-medium text-slate-900">
                Our editorial goal is simple:
              </p>

              <p className="mt-2 text-sm text-slate-700">
                Provide useful information that is easy to understand, based on
                reliable sources, and regularly reviewed when important details
                need to be updated.
              </p>
            </div>
          </section>

          {/* Research */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Research and Accuracy
            </h2>

            <p>
              Before publishing educational content, we research the subject
              using reliable references whenever appropriate. For topics
              involving Morse code standards, timing, communication systems, or
              historical information, we aim to use recognized technical,
              historical, and educational sources.
            </p>

            <p className="mt-4">
              We also review our content for clarity and consistency. However,
              no website is completely free from errors. If we identify an
              important mistake or receive credible feedback about inaccurate
              information, we review the issue and make corrections when
              necessary.
            </p>
          </section>

          {/* Standards */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Our Editorial Standards
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="mb-2 font-semibold text-slate-900">
                  Accuracy
                </h3>

                <p className="text-sm text-slate-600">
                  We aim to provide information that is factually correct and
                  based on reliable sources and recognized standards.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="mb-2 font-semibold text-slate-900">
                  Clarity
                </h3>

                <p className="text-sm text-slate-600">
                  Our content is written to make technical and historical
                  concepts easier to understand.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="mb-2 font-semibold text-slate-900">
                  Usefulness
                </h3>

                <p className="text-sm text-slate-600">
                  We focus on practical information, examples, tools, charts,
                  and learning resources that help visitors achieve their goal.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="mb-2 font-semibold text-slate-900">
                  Transparency
                </h3>

                <p className="text-sm text-slate-600">
                  We aim to clearly distinguish educational information,
                  practical guidance, and references to external sources.
                </p>
              </div>
            </div>
          </section>

          {/* Review process */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Our Content Review Process
            </h2>

            <p>
              New and updated content generally follows a structured editorial
              process:
            </p>

            <ol className="mt-5 space-y-4">
              <li className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                  1
                </span>

                <div>
                  <strong className="text-slate-900">Topic Research</strong>
                  <p className="mt-1 text-sm text-slate-600">
                    We identify the purpose of the content and research the
                    topic before preparing the article or guide.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                  2
                </span>

                <div>
                  <strong className="text-slate-900">Content Creation</strong>
                  <p className="mt-1 text-sm text-slate-600">
                    Content is structured to provide clear explanations,
                    examples, useful resources, and relevant internal links.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                  3
                </span>

                <div>
                  <strong className="text-slate-900">Editorial Review</strong>
                  <p className="mt-1 text-sm text-slate-600">
                    We review content for readability, relevance, consistency,
                    and obvious factual or technical errors.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                  4
                </span>

                <div>
                  <strong className="text-slate-900">Updates</strong>
                  <p className="mt-1 text-sm text-slate-600">
                    Important pages may be reviewed and updated when new
                    information, corrections, or improvements are needed.
                  </p>
                </div>
              </li>
            </ol>
          </section>

          {/* Sources */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Sources and References
            </h2>

            <p>
              When a topic requires external references, we aim to use relevant
              and credible sources. Depending on the subject, these may include
              official organizations, technical standards, educational
              institutions, historical archives, and recognized communication
              resources.
            </p>

            <p className="mt-4">
              External links are provided when they add useful context or allow
              readers to explore a subject in greater detail.
            </p>
          </section>

          {/* Updates */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Content Updates and Corrections
            </h2>

            <p>
              Morse code history and the International Morse code standard are
              relatively stable topics, but our website, tools, educational
              resources, and supporting information may change over time.
            </p>

            <p className="mt-4">
              We may update articles to improve accuracy, add new information,
              fix errors, improve internal linking, or make the content easier
              to understand.
            </p>

            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5">
              <h3 className="font-semibold text-slate-900">
                Found an error?
              </h3>

              <p className="mt-2 text-sm text-slate-700">
                If you believe that information on our website is inaccurate
                or outdated, please contact us and include the page and details
                about the issue. Our team will review the information.
              </p>
            </div>
          </section>

          {/* Independence */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Editorial Independence
            </h2>

            <p>
              Our editorial content is created with the goal of helping users
              understand and use Morse code. We aim to keep educational content
              useful, relevant, and independent from promotional claims.
            </p>

            <p className="mt-4">
              If the website displays advertising or references third-party
              services in the future, advertising relationships will not
              determine the factual conclusions or educational information
              presented in our guides.
            </p>
          </section>

          {/* Contact */}
          <section className="rounded-2xl border border-green-200 bg-green-50 p-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Questions About Our Content?
            </h2>

            <p className="mt-3">
              If you have feedback, corrections, or questions about how content
              is created and reviewed on Morse Code Translator, please get in
              touch with our team.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-lg bg-green-600 px-5 py-3 font-medium text-white transition-colors hover:bg-green-700"
              >
                Contact Our Team
              </Link>

              <Link
                href="/about"
                className="rounded-lg border border-green-300 bg-white px-5 py-3 font-medium text-green-700 transition-colors hover:bg-green-100"
              >
                Learn About Us
              </Link>
            </div>
          </section>

          {/* Related pages */}
          <section className="border-t border-slate-200 pt-8">
            <h2 className="mb-5 text-2xl font-bold text-slate-900">
              Related Pages
            </h2>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/about"
                className="rounded-xl border border-slate-200 p-4 transition-colors hover:border-green-300 hover:bg-green-50"
              >
                <strong className="text-slate-900">About Us</strong>
                <span className="mt-1 block text-sm text-slate-600">
                  Learn about Morse Code Translator and our mission.
                </span>
              </Link>

              <Link
                href="/contact"
                className="rounded-xl border border-slate-200 p-4 transition-colors hover:border-green-300 hover:bg-green-50"
              >
                <strong className="text-slate-900">Contact Us</strong>
                <span className="mt-1 block text-sm text-slate-600">
                  Contact the Morse Code Translator Team.
                </span>
              </Link>

              <Link
                href="/privacy"
                className="rounded-xl border border-slate-200 p-4 transition-colors hover:border-green-300 hover:bg-green-50"
              >
                <strong className="text-slate-900">Privacy Policy</strong>
                <span className="mt-1 block text-sm text-slate-600">
                  Learn how we handle website and visitor information.
                </span>
              </Link>

              <Link
                href="/disclaimer"
                className="rounded-xl border border-slate-200 p-4 transition-colors hover:border-green-300 hover:bg-green-50"
              >
                <strong className="text-slate-900">Disclaimer</strong>
                <span className="mt-1 block text-sm text-slate-600">
                  Important information about using this website.
                </span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}