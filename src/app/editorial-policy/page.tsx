import type { Metadata } from "next";
import Link from "next/link";
import {
  generatePageMeta,
  generateBreadcrumbSchema,
} from "@/lib/seo";

export const metadata: Metadata = generatePageMeta(
  "Editorial Policy | Morse Code Translator",
  "Read the Morse Code Translator editorial policy covering research, accuracy, sources, content reviews, corrections, updates, and editorial independence.",
  "/editorial-policy",
  [
    "editorial policy",
    "content standards",
    "morse code content standards",
    "content accuracy",
    "editorial standards",
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
          <span className="font-medium text-slate-900">Editorial Policy</span>
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
            Our editorial policy explains how Morse Code Translator researches,
            creates, reviews, updates, and corrects educational content about
            Morse code and related communication topics.
          </p>
        </header>

        <div className="space-y-10 text-slate-700 leading-relaxed">
          {/* Purpose and scope */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Our Editorial Purpose
            </h2>

            <p>
              <Link
                href="/"
                className="font-medium text-green-700 underline decoration-green-300 underline-offset-2 hover:text-green-800"
              >
                Morse Code Translator
              </Link>{" "}
              is designed to make Morse code easier to understand and use. Our
              educational pages, examples, reference material, and tools are
              intended to answer practical questions clearly without making
              technical subjects unnecessarily difficult to follow.
            </p>

            <p className="mt-4">
              Our content is written for a broad audience, including beginners,
              students, hobbyists, educators, and people who simply want to
              decode or learn Morse code. We aim to explain terminology in plain
              language while preserving the technical meaning of important
              standards and concepts.
            </p>
          </section>

          {/* Who creates content */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Who Creates Our Content
            </h2>

            <p>
              Content published on <strong>Morse Code Translator</strong> is
              created and maintained by the <strong>Morse Code Translator Team</strong>.
              Our team develops practical tools, researches educational topics,
              and prepares guides intended to help visitors learn and use Morse
              code.
            </p>

            <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-5">
              <p className="font-medium text-slate-900">
                Our editorial goal is straightforward:
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Publish information that is useful, understandable, carefully
                researched, and reviewed when corrections or meaningful updates
                are needed.
              </p>
            </div>
          </section>

          {/* Research and accuracy */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Research and Accuracy
            </h2>

            <p>
              We research subjects before publishing or substantially updating
              educational content. When a topic involves Morse code standards,
              timing, communication practices, history, or technical details,
              we seek relevant and credible references appropriate to the subject.
            </p>

            <p className="mt-4">
              We also review pages for clarity, consistency, and obvious factual
              or technical errors. We do not claim that every page will always be
              error-free. When a credible error is identified, we investigate the
              issue and update the page when a correction is warranted.
            </p>
          </section>

          {/* Editorial standards */}
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
                  We aim to present factually accurate information and use
                  reliable references when a subject requires external
                  verification.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="mb-2 font-semibold text-slate-900">
                  Clarity
                </h3>
                <p className="text-sm text-slate-600">
                  We explain technical concepts in language that a general
                  reader can understand while retaining important terminology
                  and distinctions.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="mb-2 font-semibold text-slate-900">
                  Usefulness
                </h3>
                <p className="text-sm text-slate-600">
                  Content should help visitors accomplish a real task, answer a
                  question, learn a concept, or find a relevant next resource.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="mb-2 font-semibold text-slate-900">
                  Transparency
                </h3>
                <p className="text-sm text-slate-600">
                  We aim to make the purpose of a page clear and distinguish
                  educational information from external references and practical
                  guidance.
                </p>
              </div>
            </div>
          </section>

          {/* Review process */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              How We Review Content
            </h2>

            <p>
              New and substantially updated content generally follows a
              structured process. The exact process can vary by page type, but
              the main editorial checks are:
            </p>

            <ol className="mt-5 space-y-4">
              <li className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                  1
                </span>
                <div>
                  <strong className="text-slate-900">Define the purpose</strong>
                  <p className="mt-1 text-sm text-slate-600">
                    We identify what the page should help the visitor understand
                    or accomplish and keep the content focused on that purpose.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                  2
                </span>
                <div>
                  <strong className="text-slate-900">Research the topic</strong>
                  <p className="mt-1 text-sm text-slate-600">
                    We review appropriate references and source material before
                    writing or making significant factual changes.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                  3
                </span>
                <div>
                  <strong className="text-slate-900">Write and structure</strong>
                  <p className="mt-1 text-sm text-slate-600">
                    We organize information with useful headings, examples,
                    concise explanations, and relevant internal links where they
                    genuinely help the reader.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                  4
                </span>
                <div>
                  <strong className="text-slate-900">Review</strong>
                  <p className="mt-1 text-sm text-slate-600">
                    We check the content for readability, relevance, consistency,
                    and obvious factual or technical issues.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                  5
                </span>
                <div>
                  <strong className="text-slate-900">Update when necessary</strong>
                  <p className="mt-1 text-sm text-slate-600">
                    Pages may be revised when we identify an error, find a
                    meaningful improvement, or determine that supporting
                    information needs to be updated.
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
              We use sources that are appropriate to the subject being covered.
              Depending on the topic, these can include official organizations,
              technical standards, educational institutions, historical archives,
              and recognized communication resources.
            </p>

            <p className="mt-4">
              External references are included when they add meaningful context,
              support a technical or historical claim, or give readers a useful
              way to explore the subject further. We do not add external links
              simply to increase the number of links on a page. When a primary
              or authoritative source is available, we prefer linking readers
              directly to that source rather than relying only on secondary
              summaries.
            </p>

            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-900">
                Source selection matters
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                For standards and technical subjects, we prefer authoritative
                sources when they are available. For historical subjects, we
                consider the reliability and relevance of the reference rather
                than relying on a single unsourced statement.
              </p>
            </div>
          </section>

          {/* Helpful resources and references */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Helpful Morse Code Resources
            </h2>

            <p>
              Our editorial standards are easier to evaluate when readers can
              also check the primary resources behind Morse code standards and
              practical guidance. The links below point to established
              organizations and relevant pages that provide additional
              technical or educational context.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <a
                href="https://www.itu.int/rec/R-REC-M.1677"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-green-300 hover:bg-green-50"
              >
                <strong className="text-slate-900">
                  ITU-R Recommendation M.1677
                </strong>
                <span className="mt-1 block text-sm text-slate-600">
                  Consult the International Telecommunication Union reference
                  for International Morse code characteristics and conventions.
                </span>
              </a>

              <a
                href="https://www.arrl.org/code-characters"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-green-300 hover:bg-green-50"
              >
                <strong className="text-slate-900">
                  ARRL Code Characters
                </strong>
                <span className="mt-1 block text-sm text-slate-600">
                  Explore a practical reference for Morse code characters and
                  amateur radio use.
                </span>
              </a>
            </div>

            <p className="mt-4 text-sm text-slate-600">
              These external resources are provided for further reading and
              verification. Their content is maintained by the respective
              organizations and is outside our editorial control.
            </p>
          </section>

          {/* Useful site navigation */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Explore Morse Code Translator
            </h2>

            <p>
              If you are researching Morse code rather than reviewing our
              editorial standards, these internal resources can help you move
              directly to the relevant tool or guide.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link
                href="/"
                className="rounded-xl border border-slate-200 p-4 transition-colors hover:border-green-300 hover:bg-green-50"
              >
                <strong className="text-slate-900">Morse Code Translator</strong>
                <span className="mt-1 block text-sm text-slate-600">
                  Translate text to Morse code and Morse code back to text.
                </span>
              </Link>

              <Link
                href="/morse-code-alphabet"
                className="rounded-xl border border-slate-200 p-4 transition-colors hover:border-green-300 hover:bg-green-50"
              >
                <strong className="text-slate-900">Morse Code Alphabet</strong>
                <span className="mt-1 block text-sm text-slate-600">
                  Browse letters and their International Morse code patterns.
                </span>
              </Link>

              <Link
                href="/learn-morse-code"
                className="rounded-xl border border-slate-200 p-4 transition-colors hover:border-green-300 hover:bg-green-50"
              >
                <strong className="text-slate-900">Learn Morse Code</strong>
                <span className="mt-1 block text-sm text-slate-600">
                  Follow a practical guide for learning and practicing Morse
                  code.
                </span>
              </Link>

              <Link
                href="/what-is-morse-code"
                className="rounded-xl border border-slate-200 p-4 transition-colors hover:border-green-300 hover:bg-green-50"
              >
                <strong className="text-slate-900">What Is Morse Code?</strong>
                <span className="mt-1 block text-sm text-slate-600">
                  Understand the history, purpose, and basic structure of Morse
                  code.
                </span>
              </Link>
            </div>
          </section>

          {/* Updates and corrections */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Content Updates and Corrections
            </h2>

            <p>
              Some Morse code fundamentals are stable, while individual pages,
              tools, examples, references, and supporting information can change.
              We may revise content to correct errors, improve explanations,
              clarify terminology, add useful information, or keep supporting
              references relevant.
            </p>

            <p className="mt-4">
              A page may also be updated when its structure or examples can be
              improved for readers. Updates are intended to make the information
              more useful and accurate, not to change content merely for the sake
              of making a page appear new.
            </p>

            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5">
              <h3 className="font-semibold text-slate-900">
                Found an error?
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                If you believe information on our website is inaccurate,
                incomplete, or outdated, please contact us with the page URL and
                the specific issue. Providing a source or explanation is helpful
                and allows our team to investigate the correction more efficiently.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
              >
                Contact Our Team
              </Link>
            </div>
          </section>

          {/* Independence */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Editorial Independence
            </h2>

            <p>
              Our educational content is created with the goal of helping
              visitors understand and use Morse code. We aim to keep factual
              explanations and educational guidance independent from promotional
              messaging.
            </p>

            <p className="mt-4">
              If the website contains advertising or references to third-party
              services, those commercial relationships should not determine the
              factual conclusions or educational information presented in our
              guides.
            </p>
          </section>

          {/* What this policy does not mean */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              What This Policy Means for Readers
            </h2>

            <p>
              This policy is our commitment to a consistent editorial approach,
              not a guarantee that every page will be perfect. Morse Code
              Translator is an educational resource, and visitors should consider
              the nature of the information and consult authoritative references
              when a decision depends on a formal standard or specialized
              technical requirement.
            </p>

            <p className="mt-4">
              Our priority is to make useful information easier to access while
              being honest about the limits of a general educational website.
            </p>
          </section>

          {/* Contact */}
          <section className="rounded-2xl border border-green-200 bg-green-50 p-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Questions About Our Content?
            </h2>

            <p className="mt-3">
              If you have a correction, source suggestion, editorial question,
              or other feedback about content published on Morse Code Translator,
              please get in touch with our team.
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
                  Send feedback, questions, or correction requests.
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
