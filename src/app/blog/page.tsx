import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog-data";
import { generatePageMeta, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta(
  "Morse Code Blog: Guides, History, Learning Tips & Facts",
  "Explore expert guides about Morse code, including history, the Morse code alphabet, SOS, timing, learning methods, phrases, technology, binary code, and interactive practice.",
  "/blog",
  [
    "morse code blog",
    "morse code articles",
    "morse code guides",
    "morse code tutorials",
    "learn morse code",
    "morse code history",
    "morse code facts",
    "morse code alphabet",
  ]
);

const blogImages: Record<string, string> = {
  "what-is-morse-code-complete-history-guide":
    "/images/blog/what-is-morse-code.webp",

  "how-to-learn-morse-code-7-easy-steps":
    "/images/blog/how-to-learn-morse-code.webp",

  "morse-code-alphabet-chart-complete-reference":
    "/images/blog/morse-code-alphabet-chart.webp",

  "sos-signal-morse-code-everything-you-need-to-know":
    "/images/blog/sos-signal-morse-code.webp",

  "i-love-you-in-morse-code-meaning-translation":
    "/images/blog/i-love-you-in-morse-code.webp",

  "25-amazing-morse-code-facts-you-didnt-know":
    "/images/blog/morse-code-facts.webp",

  "morse-code-timing-rules-and-speed-explained":
    "/images/blog/morse-code-timing-rules.webp",

  "hello-in-morse-code-and-common-phrases":
    "/images/blog/hello-in-morse-code.webp",

  "when-was-morse-code-invented-history-timeline":
    "/images/blog/when-was-morse-code-invented.webp",

  "morse-code-in-modern-technology-applications":
    "/images/blog/morse-code-modern-technology.webp",

  "binary-code-translator-guide":
    "/images/blog/binary-code-translator.webp",

  "morse-code-quiz-test-your-knowledge":
    "/images/blog/morse-code-quiz.webp",
};

const fallbackImage = "/images/blog/what-is-morse-code.webp";

const canonicalPostRoutes: Record<string, string> = {
  "what-is-morse-code-complete-history-guide": "/what-is-morse-code",
  "how-to-learn-morse-code-7-easy-steps": "/learn-morse-code",
};

function getPostHref(slug: string) {
  return canonicalPostRoutes[slug] || `/blog/${slug}`;
}

const categoryStyles: Record<string, string> = {
  History: "bg-amber-50 text-amber-700 border-amber-100",
  Learning: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Reference: "bg-blue-50 text-blue-700 border-blue-100",
  Emergency: "bg-red-50 text-red-700 border-red-100",
  Phrases: "bg-purple-50 text-purple-700 border-purple-100",
  Facts: "bg-cyan-50 text-cyan-700 border-cyan-100",
  Technical: "bg-slate-100 text-slate-700 border-slate-200",
  Technology: "bg-indigo-50 text-indigo-700 border-indigo-100",
  Quiz: "bg-orange-50 text-orange-700 border-orange-100",
};

export default function BlogPage() {
  const posts = getAllPosts();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <main className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* HERO */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
          <nav
            className="mb-7 flex items-center gap-2 text-sm text-slate-500"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="transition-colors hover:text-green-700"
            >
              Home
            </Link>

            <span className="text-slate-300">/</span>

            <span className="font-medium text-slate-800">Blog</span>
          </nav>

          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
              MORSE CODE KNOWLEDGE HUB
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Morse Code Blog
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Clear guides, practical tutorials, historical insights, and
              useful references covering the Morse code alphabet, timing,
              SOS, phrases, amateur radio, binary communication, and modern
              technology.
            </p>

            <div className="mt-7 flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
                📚 {posts.length} in-depth guides
              </span>

              <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
                🔤 Alphabet to advanced practice
              </span>

              <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
                📡 History, technology & communication
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        {/* FEATURED ARTICLE */}
        {featuredPost && (
          <section className="mb-14">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
                  Featured Article
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  Start Here
                </h2>
              </div>

              <span className="hidden text-sm text-slate-500 sm:block">
                Latest guide
              </span>
            </div>

            <Link
              href={getPostHref(featuredPost.slug)}
              className="group grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-xl md:grid-cols-2"
            >
              <div className="relative min-h-[260px] overflow-hidden md:min-h-full">
                <Image
                  src={blogImages[featuredPost.slug] || fallbackImage}
                  alt={featuredPost.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
              </div>

              <div className="flex flex-col justify-center p-7 md:p-10">
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      categoryStyles[featuredPost.category] ||
                      "border-green-100 bg-green-50 text-green-700"
                    }`}
                  >
                    {featuredPost.category}
                  </span>

                  <span className="text-xs text-slate-400">
                    {featuredPost.readTime} read
                  </span>
                </div>

                <h2 className="text-2xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-green-700 md:text-3xl">
                  {featuredPost.title}
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  {featuredPost.description}
                </p>

                <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-green-700">
                  Read the complete guide
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* ALL ARTICLES */}
        <section>
          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
                Explore Articles
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                Morse Code Guides & Resources
              </h2>
            </div>

            <p className="text-sm text-slate-500">
              Browse practical guides, facts, history, and reference material.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {remainingPosts.map((post) => (
              <article
                key={post.slug}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg"
              >
                <Link
                  href={getPostHref(post.slug)}
                  className="relative block aspect-[16/9] overflow-hidden"
                  aria-label={`Read ${post.title}`}
                >
                  <Image
                    src={blogImages[post.slug] || fallbackImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent opacity-70" />
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
                        categoryStyles[post.category] ||
                        "border-green-100 bg-green-50 text-green-700"
                      }`}
                    >
                      {post.category}
                    </span>

                    <span className="text-xs text-slate-400">
                      {post.readTime} read
                    </span>
                  </div>

                  <Link href={getPostHref(post.slug)}>
                    <h2 className="text-xl font-bold leading-7 text-slate-900 transition-colors group-hover:text-green-700">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                    {post.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5">
                    <span className="text-xs text-slate-400">
                      {post.date}
                    </span>

                    <Link
                      href={getPostHref(post.slug)}
                      className="text-sm font-semibold text-green-700 transition-colors hover:text-green-800"
                    >
                      Read article →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* LEARNING PATH */}
        <section className="mt-16 rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6 sm:p-8 md:p-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
              New to Morse Code?
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Follow a simple learning path
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Start with the alphabet, understand how dots and dashes are
              timed, practice translating simple words, and then test your
              recognition skills with progressively more difficult exercises.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/morse-code-alphabet"
              className="rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-green-400 hover:shadow-md"
            >
              <span className="text-2xl">①</span>
              <h3 className="mt-3 font-bold text-slate-900">
                Learn the Alphabet
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Start with A–Z.
              </p>
            </Link>

            <Link
              href="/morse-code-timing"
              className="rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-green-400 hover:shadow-md"
            >
              <span className="text-2xl">②</span>
              <h3 className="mt-3 font-bold text-slate-900">
                Understand Timing
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Learn dots, dashes and spacing.
              </p>
            </Link>

            <Link
              href="/"
              className="rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-green-400 hover:shadow-md"
            >
              <span className="text-2xl">③</span>
              <h3 className="mt-3 font-bold text-slate-900">
                Practice Translation
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Encode and decode messages.
              </p>
            </Link>

            <Link
              href="/morse-code-quiz"
              className="rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-green-400 hover:shadow-md"
            >
              <span className="text-2xl">④</span>
              <h3 className="mt-3 font-bold text-slate-900">
                Test Yourself
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Challenge your recognition skills.
              </p>
            </Link>
          </div>
        </section>

        {/* EXPLORE TOOLS */}
        <section className="mt-16">
          <div className="mb-7">
            <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
              Practice & Reference
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              Explore Our Morse Code Tools
            </h2>

            <p className="mt-2 max-w-2xl text-slate-600">
              Move from reading about Morse code to actively practicing it
              with our translator, decoder, reference charts, timing guide,
              sounds, and quiz.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ToolCard
              href="/"
              icon="↔"
              title="Morse Code Translator"
              description="Convert text to Morse code and decode patterns."
            />

            <ToolCard
              href="/morse-code-alphabet"
              icon="A"
              title="Morse Code Alphabet"
              description="View the complete A–Z reference chart."
            />

            <ToolCard
              href="/morse-code-numbers"
              icon="123"
              title="Morse Code Numbers"
              description="Learn how numbers 0–9 are represented."
            />

            <ToolCard
              href="/morse-code-decoder"
              icon="⌁"
              title="Morse Code Decoder"
              description="Decode dots and dashes into readable text."
            />

            <ToolCard
              href="/morse-code-timing"
              icon="◷"
              title="Morse Code Timing"
              description="Understand WPM, spacing and timing rules."
            />

            <ToolCard
              href="/morse-code-quiz"
              icon="✓"
              title="Morse Code Quiz"
              description="Test your knowledge with progressive levels."
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function ToolCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:border-green-400 hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-green-50 text-sm font-bold text-green-700">
          {icon}
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 transition-colors group-hover:text-green-700">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
