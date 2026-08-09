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
    `${post.title} | MorseCode.World Blog`,
    post.description,
    `/blog/${post.slug}`,
    post.keywords,
    { ogType: "article" }
  );
}

/**
 * Converts Markdown-style links and basic formatting
 * into HTML that can be rendered inside blog content.
 *
 * Example:
 * [Morse Code Alphabet](/morse-code-alphabet)
 *
 * becomes a clickable internal link.
 */
function renderInlineMarkdown(text: string): string {
  return text
    // Escape HTML characters first
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

    // Convert quotes BEFORE creating HTML links.
    // This prevents the quote replacement from corrupting href attributes.
    .replace(
      /"(.*?)"/g,
      "&ldquo;$1&rdquo;"
    )

    // Bold
    .replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    )

    // Inline code
    .replace(
      /`(.*?)`/g,
      '<code class="font-mono bg-slate-100 px-1 rounded text-sm">$1</code>'
    )

    // Markdown internal links
    // Example: [Morse Code Alphabet](/morse-code-alphabet)
    // IMPORTANT: Keep this replacement LAST so later replacements
    // cannot modify the href quotes or HTML attributes.
    .replace(
      /\[([^\]]+)\]\((\/[^)\s]+)\)/g,
      '<a href="$2" class="text-green-600 font-semibold underline decoration-green-500 underline-offset-2 hover:text-green-700 hover:decoration-green-700 transition-colors">$1</a>'
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
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

          <Link
            href="/blog"
            className="hover:text-green-600 transition-colors"
          >
            Blog
          </Link>

          <span className="text-slate-400">/</span>

          <span className="text-slate-900 font-medium line-clamp-1">
            {post.title}
          </span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
              {post.category}
            </span>

            <span className="text-xs text-slate-400">
              {post.readTime} read
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {post.title}
          </h1>

          <p className="text-lg text-slate-600 mb-4">
            {post.description}
          </p>

          <div className="flex items-center gap-3 text-sm text-slate-400 border-t border-slate-200 pt-4">
            <span>{post.author}</span>
            <span>·</span>
            <span>{post.date}</span>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-slate max-w-none mb-12">
          {post.content.split("\n\n").map((block, i) => {
            /* H2 headings */
            if (block.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="text-2xl font-bold text-slate-900 mt-8 mb-4"
                >
                  {block.replace("## ", "")}
                </h2>
              );
            }

            /* Unordered lists */
            if (block.startsWith("- ")) {
              const items = block.split("\n");

              return (
                <ul
                  key={i}
                  className="list-disc list-inside text-slate-700 space-y-2 mb-4"
                >
                  {items.map((item, j) => (
                    <li
                      key={j}
                      dangerouslySetInnerHTML={{
                        __html: renderInlineMarkdown(
                          item.replace(/^- /, "")
                        ),
                      }}
                    />
                  ))}
                </ul>
              );
            }

            /* Ordered lists */
            if (/^\d+\./.test(block)) {
              const items = block.split("\n");

              return (
                <ol
                  key={i}
                  className="list-decimal list-inside text-slate-700 space-y-2 mb-4"
                >
                  {items.map((item, j) => (
                    <li
                      key={j}
                      dangerouslySetInnerHTML={{
                        __html: renderInlineMarkdown(
                          item.replace(/^\d+\.\s*/, "")
                        ),
                      }}
                    />
                  ))}
                </ol>
              );
            }

            /* Normal paragraphs */
            return (
              <p
                key={i}
                className="text-slate-700 leading-relaxed mb-4"
                dangerouslySetInnerHTML={{
                  __html: renderInlineMarkdown(block),
                }}
              />
            );
          })}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-slate-200 pt-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Related Articles
            </h2>

            <div className="space-y-4">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all group"
                >
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full mt-0.5 flex-shrink-0">
                    {rp.category}
                  </span>

                  <div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors">
                      {rp.title}
                    </h3>

                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                      {rp.description}
                    </p>

                    <span className="text-xs text-slate-400 mt-2 block">
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
            className="inline-flex items-center gap-2 text-green-600 font-medium hover:text-green-700 transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
      </article>
    </>
  );
}