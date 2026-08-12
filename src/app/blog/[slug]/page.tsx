import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog-data";
import {
  generatePageMeta,
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  return generatePageMeta(
    `${post.title} | Morse Code Translator`,
    post.description,
    `/blog/${post.slug}`,
    post.keywords,
    { ogType: "article" }
  );
}

/**
 * Converts Markdown-style inline formatting
 * into HTML that can be rendered inside blog content.
 *
 * Supports:
 * - Bold
 * - Inline code
 * - Internal links
 * - Basic quotes
 */
function renderInlineMarkdown(text: string): string {
  return text
    // Escape HTML characters first
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

    // Quotes
    .replace(/"(.*?)"/g, "“$1”")

    // Bold
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

    // Inline code
    .replace(
      /`(.*?)`/g,
      '<code class="font-mono bg-slate-100 px-1 py-0.5 rounded text-sm">$1</code>'
    )

    // Markdown internal links
    .replace(
      /\[([^\]]+)\]\((\/[^)\s]*)\)/g,
      '<a href="$2" class="text-green-600 font-medium underline hover:text-green-700">$1</a>'
    );
}

/**
 * Detects whether a block is a Markdown table.
 *
 * Example:
 *
 * | Letter | Morse Code | Pronunciation |
 * |--------|------------|---------------|
 * | A      | · —        | dit-dah       |
 */
function isMarkdownTable(block: string): boolean {
  const lines = block.trim().split("\n");

  if (lines.length < 2) return false;

  const header = lines[0].trim();
  const separator = lines[1].trim();

  return (
    header.startsWith("|") &&
    header.endsWith("|") &&
    /^\|?[\s:-]+(\|[\s:-]+)+\|?$/.test(separator)
  );
}

/**
 * Converts a Markdown table into a responsive,
 * professional HTML table matching the site theme.
 */
function renderMarkdownTable(block: string, key: number) {
  const lines = block
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) return null;

  const parseRow = (line: string) => {
    return line
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());
  };

  const headers = parseRow(lines[0]);

  // Skip Markdown separator row
  const rows = lines.slice(2).map(parseRow);

  return (
    <div
      key={key}
      className="my-8 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="bg-slate-900">
              {headers.map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-white ${
                    index === 0
                      ? "border-l-4 border-green-500"
                      : ""
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: renderInlineMarkdown(header),
                  }}
                />
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-slate-100 last:border-b-0 odd:bg-white even:bg-slate-50/70 hover:bg-green-50/60 transition-colors"
              >
                {headers.map((_, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`px-5 py-4 align-middle ${
                      cellIndex === 0
                        ? "font-bold text-slate-900"
                        : cellIndex === 1
                        ? "font-mono text-base font-semibold tracking-wide text-green-700"
                        : "text-slate-600"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: renderInlineMarkdown(
                        row[cellIndex] ?? ""
                      ),
                    }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile table hint */}
      <div className="border-t border-slate-100 bg-slate-50 px-4 py-2.5 text-xs text-slate-400 sm:hidden">
        Swipe horizontally to view the full table
      </div>
    </div>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const posts = getAllPosts();

  /*
   * Keep current article out of Related Articles.
   * Prefer same-category articles first.
   */
  const sameCategoryPosts = posts.filter(
    (p) => p.slug !== slug && p.category === post.category
  );

  const otherPosts = posts.filter(
    (p) => p.slug !== slug && p.category !== post.category
  );

  const relatedPosts = [...sameCategoryPosts, ...otherPosts].slice(0, 3);

  const articleSchema = generateArticleSchema(
    post.title,
    post.description,
    `/blog/${post.slug}`,
    post.date
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  return (
    <>
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
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

          <Link
            href="/blog"
            className="transition-colors hover:text-green-600"
          >
            Blog
          </Link>

          <span className="text-slate-400">/</span>

          <span className="line-clamp-1 font-medium text-slate-900">
            {post.title}
          </span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
              {post.category}
            </span>

            <span className="text-xs text-slate-400">
              {post.readTime} read
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            {post.title}
          </h1>

          <p className="mb-4 text-lg text-slate-600">
            {post.description}
          </p>

          <div className="flex items-center gap-3 border-t border-slate-200 pt-4 text-sm text-slate-400">
            <span>{post.author}</span>
            <span>·</span>
            <span>{post.date}</span>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-slate max-w-none mb-12">
          {post.content.split("\n\n").map((block, i) => {
            const trimmedBlock = block.trim();

            /*
             * Markdown Tables
             */
            if (isMarkdownTable(trimmedBlock)) {
              return renderMarkdownTable(trimmedBlock, i);
            }

            /*
             * H3 headings
             */
            if (trimmedBlock.startsWith("### ")) {
              return (
                <h3
                  key={i}
                  className="mt-8 mb-4 text-xl font-bold text-slate-900 md:text-2xl"
                >
                  {trimmedBlock.replace(/^### /, "")}
                </h3>
              );
            }

            /*
             * H2 headings
             */
            if (trimmedBlock.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="mt-10 mb-4 text-2xl font-bold text-slate-900 md:text-3xl"
                >
                  {trimmedBlock.replace(/^## /, "")}
                </h2>
              );
            }

            /*
             * Unordered lists
             */
            if (
              trimmedBlock.startsWith("- ") ||
              trimmedBlock.includes("\n- ")
            ) {
              const items = trimmedBlock
                .split("\n")
                .filter((line) => line.trim().startsWith("- "));

              return (
                <ul
                  key={i}
                  className="mb-5 list-disc list-inside space-y-2 text-slate-700"
                >
                  {items.map((item, j) => (
                    <li
                      key={j}
                      dangerouslySetInnerHTML={{
                        __html: renderInlineMarkdown(
                          item.replace(/^\s*-\s*/, "")
                        ),
                      }}
                    />
                  ))}
                </ul>
              );
            }

            /*
             * Ordered lists
             */
            if (
              /^\d+\.\s/.test(trimmedBlock) ||
              /\n\d+\.\s/.test(trimmedBlock)
            ) {
              const items = trimmedBlock
                .split("\n")
                .filter((line) =>
                  /^\d+\.\s/.test(line.trim())
                );

              return (
                <ol
                  key={i}
                  className="mb-5 list-decimal list-inside space-y-2 text-slate-700"
                >
                  {items.map((item, j) => (
                    <li
                      key={j}
                      dangerouslySetInnerHTML={{
                        __html: renderInlineMarkdown(
                          item.replace(/^\s*\d+\.\s*/, "")
                        ),
                      }}
                    />
                  ))}
                </ol>
              );
            }

            /*
             * Normal paragraphs
             */
            return (
              <p
                key={i}
                className="mb-5 leading-relaxed text-slate-700"
                dangerouslySetInnerHTML={{
                  __html: renderInlineMarkdown(trimmedBlock),
                }}
              />
            );
          })}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-slate-200 pt-8">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Related Articles
            </h2>

            <div className="space-y-4">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-green-400 hover:shadow-sm"
                >
                  <span className="mt-0.5 flex-shrink-0 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-600">
                    {rp.category}
                  </span>

                  <div>
                    <h3 className="font-semibold text-slate-900 transition-colors group-hover:text-green-600">
                      {rp.title}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                      {rp.description}
                    </p>

                    <span className="mt-2 block text-xs text-slate-400">
                      {rp.date} · {rp.readTime}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to Blog */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-medium text-green-600 transition-colors hover:text-green-700"
          >
            ← Back to Blog
          </Link>
        </div>
      </article>
    </>
  );
}