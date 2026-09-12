import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog-data";
import {
  generatePageMeta,
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import { notFound } from "next/navigation";

/*
 * Blog image mapping
 *
 * All blog images are stored in:
 * public/images/blog/
 *
 * This mapping is used as a fallback when post.image
 * is not defined inside blog-data.ts.
 */
const blogImages: Record<string, string> = {
  /*
   * History
   */
  "when-was-morse-code-invented-history":
    "/images/blog/when-was-morse-code-invented.webp",

  "when-was-morse-code-invented-history-timeline":
    "/images/blog/when-was-morse-code-invented.webp",

  /*
   * Learning
   */
  /*
   * Reference
   */
  "morse-code-alphabet-chart-complete-reference":
    "/images/blog/morse-code-alphabet-chart.webp",

  /*
   * Emergency
   */
  "sos-signal-in-morse-code-complete-guide":
    "/images/blog/sos-signal-morse-code.webp",

  /*
   * Phrases
   */
  "i-love-you-in-morse-code-complete-guide":
    "/images/blog/i-love-you-in-morse-code.webp",

  "i-love-you-in-morse-code-meaning-translation":
    "/images/blog/i-love-you-in-morse-code.webp",

  "hello-in-morse-code-common-phrases":
    "/images/blog/hello-in-morse-code.webp",

  "hello-in-morse-code-and-common-phrases":
    "/images/blog/hello-in-morse-code.webp",

  /*
   * Facts
   */
  "25-amazing-morse-code-facts":
    "/images/blog/morse-code-facts.webp",

  "25-amazing-morse-code-facts-you-didnt-know":
    "/images/blog/morse-code-facts.webp",

  /*
   * Technical
   */
  "morse-code-timing-rules-dots-dashes-wpm":
    "/images/blog/morse-code-timing-rules.webp",

  "morse-code-timing-rules-and-speed-explained":
    "/images/blog/morse-code-timing-rules.webp",

  /*
   * Technology
   */
  "morse-code-in-modern-technology":
    "/images/blog/morse-code-modern-technology.webp",

  "morse-code-in-modern-technology-applications":
    "/images/blog/morse-code-modern-technology.webp",

  /*
   * Binary
   */
  "binary-code-translator-convert-text-guide":
    "/images/blog/binary-code-translator.webp",

  "binary-code-translator-guide":
    "/images/blog/binary-code-translator.webp",

  /*
   * Quiz
   */
  "morse-code-quiz-test-your-knowledge":
    "/images/blog/morse-code-quiz.webp",
};
/*
 * SEO-friendly image metadata
 *
 * Each blog image has:
 * - alt text for accessibility and image SEO
 * - caption for additional context
 */
const blogImageMeta: Record<
  string,
  {
    alt: string;
    caption: string;
  }
> = {
  /*
   * History
   */
  "when-was-morse-code-invented-history": {
    alt: "History of Morse code invention and early telegraph communication",
    caption:
      "Morse code was developed alongside the electric telegraph and transformed long-distance communication.",
  },

  "when-was-morse-code-invented-history-timeline": {
    alt: "Morse code invention history timeline and telegraph development",
    caption:
      "A timeline showing the development of Morse code and early telegraph communication.",
  },

  /*
   * Learning
   */
  /*
   * Reference
   */
  "morse-code-alphabet-chart-complete-reference": {
    alt: "Complete Morse code alphabet chart showing letters A to Z with dots and dashes",
    caption:
      "The International Morse code alphabet assigns a unique dot-and-dash pattern to every letter from A to Z.",
  },

  /*
   * Emergency
   */
  "sos-signal-in-morse-code-complete-guide": {
    alt: "SOS distress signal in Morse code shown as three dots three dashes and three dots",
    caption:
      "SOS is represented in Morse code as three dots, three dashes, and three dots: ... --- ...",
  },

  /*
   * Phrases
   */
  "i-love-you-in-morse-code-complete-guide": {
    alt: "I love you translated into Morse code using dots and dashes",
    caption:
      "The phrase I love you can be translated into International Morse code letter by letter.",
  },

  "i-love-you-in-morse-code-meaning-translation": {
    alt: "I love you Morse code translation with dot and dash patterns",
    caption:
      "A Morse code representation of the phrase I love you using International Morse code.",
  },

  "hello-in-morse-code-common-phrases": {
    alt: "Hello in Morse code translated using dots and dashes",
    caption:
      "HELLO in International Morse code is represented as four individual letter patterns.",
  },

  "hello-in-morse-code-and-common-phrases": {
    alt: "Hello in Morse code with common Morse code phrases",
    caption:
      "Common words and phrases can be translated into Morse code one letter at a time.",
  },

  /*
   * Facts
   */
  "25-amazing-morse-code-facts": {
    alt: "Interesting facts about Morse code history communication and modern use",
    caption:
      "Morse code has a long history and continues to be studied and used by communication enthusiasts today.",
  },

  "25-amazing-morse-code-facts-you-didnt-know": {
    alt: "Twenty five interesting facts about Morse code and its history",
    caption:
      "Explore interesting facts about the history, development, and continued use of Morse code.",
  },

  /*
   * Technical
   */
  "morse-code-timing-rules-dots-dashes-wpm": {
    alt: "Morse code timing rules showing dot dash spacing and words per minute",
    caption:
      "Correct Morse code timing uses specific ratios for dots, dashes, character gaps, and word spacing.",
  },

  "morse-code-timing-rules-and-speed-explained": {
    alt: "Morse code speed and timing explained with dots dashes spacing and WPM",
    caption:
      "Morse code speed is commonly measured in words per minute while maintaining standard timing relationships.",
  },

  /*
   * Technology
   */
  "morse-code-in-modern-technology": {
    alt: "Modern technology applications of Morse code communication signals",
    caption:
      "Morse code principles can still be used in amateur radio, accessibility, education, and signal-based communication.",
  },

  "morse-code-in-modern-technology-applications": {
    alt: "Morse code applications in modern communication technology",
    caption:
      "Modern applications continue to use simple encoded signals inspired by Morse code communication.",
  },

  /*
   * Binary
   */
  "binary-code-translator-convert-text-guide": {
    alt: "Binary code translator converting text into binary numbers",
    caption:
      "Binary code represents information using combinations of zeros and ones.",
  },

  "binary-code-translator-guide": {
    alt: "Binary code translator guide showing text to binary conversion",
    caption:
      "A binary translator can convert readable text into sequences of zeros and ones.",
  },

  /*
   * Quiz
   */
  "morse-code-quiz-test-your-knowledge": {
    alt: "Interactive Morse code quiz for testing Morse code knowledge",
    caption:
      "A Morse code quiz helps learners test their recognition of letters, numbers, and Morse patterns.",
  },
};

const fallbackImageMeta = {
  alt: "Morse code dots and dashes communication guide",
  caption:
    "Learn about Morse code, its alphabet, timing, history, and modern applications.",
};

const fallbackImage = "/images/blog/what-is-morse-code.webp";

/*
 * Always return an image for every blog post.
 *
 * Priority:
 * 1. post.image
 * 2. slug mapping
 * 3. fallback image
 */
function getPostImage(
  post: ReturnType<typeof getAllPosts>[number]
): string {
  return blogImages[post.slug] || fallbackImage;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
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

/*
 * Simple inline markdown renderer.
 *
 * Supports:
 * - Bold text
 * - Inline code
 * - Internal links
 * - External links
 */
function renderInlineMarkdown(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"(.*?)"/g, "“$1”")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(
      /`(.*?)`/g,
      '<code class="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-800">$1</code>'
    )
    .replace(
      /\[([^\]]+)\]\((\/[^)\s]*)\)/g,
      '<a href="$2" class="font-semibold text-green-700 underline decoration-green-300 underline-offset-4 transition hover:text-green-800">$1</a>'
    )
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)\s]*)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer nofollow" class="font-semibold text-green-700 underline decoration-green-300 underline-offset-4 transition hover:text-green-800">$1 ↗</a>'
    );
}

function isMarkdownTable(
  lines: string[],
  index: number
): boolean {
  if (index + 1 >= lines.length) return false;

  return (
    lines[index].trim().startsWith("|") &&
    lines[index].trim().endsWith("|") &&
    /^\|?[\s:-]+(\|[\s:-]+)+\|?$/.test(
      lines[index + 1].trim()
    )
  );
}

function parseTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

/*
 * Professional table
 */
function MarkdownTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="bg-slate-900">
              {headers.map((header, index) => (
                <th
                  key={`${header}-${index}`}
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
                className="border-b border-slate-100 last:border-b-0 odd:bg-white even:bg-slate-50/70 hover:bg-green-50/60"
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
    </div>
  );
}

/*
 * Stats cards
 *
 * Usage:
 *
 * :::stats
 * 1844|First famous telegraph message
 * 25|Facts covered in this guide
 * 3|Core parts of the SOS pattern
 * :::
 */
function StatsBlock({
  items,
}: {
  items: string[];
}) {
  const stats = items
    .map((item) => {
      const [value, label] = item.split("|");

      return {
        value: value?.trim(),
        label: label?.trim(),
      };
    })
    .filter((item) => item.value && item.label);

  return (
    <div className="my-8 grid gap-4 sm:grid-cols-3">
      {stats.map((stat, index) => (
        <div
          key={`${stat.value}-${index}`}
          className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-5"
        >
          <div className="text-2xl font-bold text-green-700">
            {stat.value}
          </div>

          <div className="mt-1 text-sm leading-6 text-slate-600">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/*
 * Visual percentage chart
 *
 * Usage:
 *
 * :::chart
 * Learning|80
 * History|60
 * Emergency|90
 * :::
 */
function ChartBlock({
  items,
}: {
  items: string[];
}) {
  const chart = items
    .map((item) => {
      const [label, rawValue] = item.split("|");

      const value = Math.max(
        0,
        Math.min(100, Number(rawValue))
      );

      return {
        label: label?.trim(),
        value,
      };
    })
    .filter(
      (item) =>
        item.label &&
        Number.isFinite(item.value)
    );

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h3 className="mb-5 text-lg font-bold text-slate-900">
        At a Glance
      </h3>

      <div className="space-y-5">
        {chart.map((item, index) => (
          <div
            key={`${item.label}-${index}`}
          >
            <div className="mb-2 flex items-center justify-between gap-4 text-sm">
              <span className="font-medium text-slate-700">
                {item.label}
              </span>

              <span className="font-semibold text-green-700">
                {item.value}%
              </span>
            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-green-600"
                style={{
                  width: `${item.value}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/*
 * Key takeaways box
 */
function TakeawaysBlock({
  items,
}: {
  items: string[];
}) {
  return (
    <section className="my-10 rounded-2xl border border-green-200 bg-green-50/60 p-6 sm:p-8">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-sm text-white">
          ✓
        </span>

        <h2 className="text-xl font-bold text-slate-900">
          Key Takeaways
        </h2>
      </div>

      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex gap-3 leading-7 text-slate-700"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />

            <span
              dangerouslySetInnerHTML={{
                __html: renderInlineMarkdown(
                  item.replace(/^\s*-\s*/, "")
                ),
              }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

/*
 * Internal tool CTA
 */
function ToolBlock({
  value,
}: {
  value: string;
}) {
  const [title, description, href] = value
    .split("|")
    .map((part) => part.trim());

  if (!title || !description || !href) {
    return null;
  }

  return (
    <section className="my-10 overflow-hidden rounded-2xl bg-slate-900 p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-wider text-green-400">
        Practice Tool
      </p>

      <h2 className="mt-2 text-2xl font-bold text-white">
        {title}
      </h2>

      <p className="mt-3 max-w-2xl leading-7 text-slate-300">
        {description}
      </p>

      <Link
        href={href}
        className="mt-5 inline-flex items-center rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-500"
      >
        Open Tool →
      </Link>
    </section>
  );
}

/*
 * Quick answer box
 */
function AnswerBlock({
  text,
}: {
  text: string;
}) {
  return (
    <div className="my-8 rounded-2xl border-l-4 border-green-600 bg-slate-50 p-5 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-wider text-green-700">
        Quick Answer
      </p>

      <p
        className="mt-2 leading-7 text-slate-700"
        dangerouslySetInnerHTML={{
          __html: renderInlineMarkdown(text),
        }}
      />
    </div>
  );
}

/*
 * Content renderer
 */
function renderContent(content: string) {
  const lines = content
    .replace(/\r\n/g, "\n")
    .split("\n");

  const nodes: ReactNode[] = [];

  let i = 0;
  let key = 0;

  const pushParagraph = (
    paragraphLines: string[]
  ) => {
    const text = paragraphLines
      .join(" ")
      .trim();

    if (!text) return;

    nodes.push(
      <p
        key={`p-${key++}`}
        className="mb-6 text-[17px] leading-8 text-slate-700"
        dangerouslySetInnerHTML={{
          __html: renderInlineMarkdown(text),
        }}
      />
    );
  };

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i++;
      continue;
    }

    /*
     * Stats
     */
    if (line === ":::stats") {
      i++;

      const items: string[] = [];

      while (
        i < lines.length &&
        lines[i].trim() !== ":::"
      ) {
        if (lines[i].trim()) {
          items.push(lines[i].trim());
        }

        i++;
      }

      if (lines[i]?.trim() === ":::") {
        i++;
      }

      nodes.push(
        <StatsBlock
          key={`stats-${key++}`}
          items={items}
        />
      );

      continue;
    }

    /*
     * Chart
     */
    if (line === ":::chart") {
      i++;

      const items: string[] = [];

      while (
        i < lines.length &&
        lines[i].trim() !== ":::"
      ) {
        if (lines[i].trim()) {
          items.push(lines[i].trim());
        }

        i++;
      }

      if (lines[i]?.trim() === ":::") {
        i++;
      }

      nodes.push(
        <ChartBlock
          key={`chart-${key++}`}
          items={items}
        />
      );

      continue;
    }

    /*
     * Takeaways
     */
    if (line === ":::takeaways") {
      i++;

      const items: string[] = [];

      while (
        i < lines.length &&
        lines[i].trim() !== ":::"
      ) {
        if (lines[i].trim()) {
          items.push(lines[i].trim());
        }

        i++;
      }

      if (lines[i]?.trim() === ":::") {
        i++;
      }

      nodes.push(
        <TakeawaysBlock
          key={`takeaways-${key++}`}
          items={items}
        />
      );

      continue;
    }

    /*
     * Tool CTA
     */
    if (line === ":::tool") {
      i++;

      const toolLines: string[] = [];

      while (
        i < lines.length &&
        lines[i].trim() !== ":::"
      ) {
        if (lines[i].trim()) {
          toolLines.push(lines[i].trim());
        }

        i++;
      }

      if (lines[i]?.trim() === ":::") {
        i++;
      }

      nodes.push(
        <ToolBlock
          key={`tool-${key++}`}
          value={toolLines.join(" ")}
        />
      );

      continue;
    }

    /*
     * Quick answer
     */
    if (line.startsWith("> [!ANSWER]")) {
      const answer = line
        .replace(
          /^>\s*\[!ANSWER\]\s*/,
          ""
        )
        .trim();

      i++;

      nodes.push(
        <AnswerBlock
          key={`answer-${key++}`}
          text={answer}
        />
      );

      continue;
    }

    /*
     * Markdown table
     */
    if (isMarkdownTable(lines, i)) {
      const headers = parseTableRow(
        lines[i]
      );

      i += 2;

      const rows: string[][] = [];

      while (
        i < lines.length &&
        lines[i].trim().startsWith("|") &&
        lines[i].trim().endsWith("|")
      ) {
        rows.push(
          parseTableRow(lines[i])
        );

        i++;
      }

      nodes.push(
        <MarkdownTable
          key={`table-${key++}`}
          headers={headers}
          rows={rows}
        />
      );

      continue;
    }

    /*
     * H3
     */
    if (line.startsWith("### ")) {
      nodes.push(
        <h3
          key={`h3-${key++}`}
          className="mt-10 mb-4 text-xl font-bold leading-8 text-slate-900 md:text-2xl"
        >
          {line.replace(/^###\s+/, "")}
        </h3>
      );

      i++;

      continue;
    }

    /*
     * H2
     */
    if (line.startsWith("## ")) {
      nodes.push(
        <h2
          key={`h2-${key++}`}
          className="mt-12 mb-5 text-2xl font-bold leading-tight text-slate-900 md:text-3xl"
        >
          {line.replace(/^##\s+/, "")}
        </h2>
      );

      i++;

      continue;
    }

    /*
     * Bullet list
     */
    if (/^-\s+/.test(line)) {
      const items: string[] = [];

      while (
        i < lines.length &&
        /^-\s+/.test(
          lines[i].trim()
        )
      ) {
        items.push(
          lines[i]
            .trim()
            .replace(/^\-\s+/, "")
        );

        i++;
      }

      nodes.push(
        <ul
          key={`ul-${key++}`}
          className="mb-7 space-y-3"
        >
          {items.map((item, index) => (
            <li
              key={index}
              className="flex gap-3 leading-7 text-slate-700"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />

              <span
                dangerouslySetInnerHTML={{
                  __html:
                    renderInlineMarkdown(item),
                }}
              />
            </li>
          ))}
        </ul>
      );

      continue;
    }

    /*
     * Numbered list
     */
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];

      while (
        i < lines.length &&
        /^\d+\.\s+/.test(
          lines[i].trim()
        )
      ) {
        items.push(
          lines[i]
            .trim()
            .replace(/^\d+\.\s+/, "")
        );

        i++;
      }

      nodes.push(
        <ol
          key={`ol-${key++}`}
          className="mb-7 space-y-3"
        >
          {items.map((item, index) => (
            <li
              key={index}
              className="flex gap-4 leading-7 text-slate-700"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-50 text-sm font-bold text-green-700">
                {index + 1}
              </span>

              <span
                className="pt-0.5"
                dangerouslySetInnerHTML={{
                  __html:
                    renderInlineMarkdown(item),
                }}
              />
            </li>
          ))}
        </ol>
      );

      continue;
    }

    /*
     * Normal paragraph
     */
    const paragraphLines: string[] = [];

    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i]
        .trim()
        .startsWith("## ") &&
      !lines[i]
        .trim()
        .startsWith(":::") &&
      !lines[i]
        .trim()
        .startsWith("> [!ANSWER]") &&
      !/^-\s+/.test(
        lines[i].trim()
      ) &&
      !/^\d+\.\s+/.test(
        lines[i].trim()
      ) &&
      !isMarkdownTable(lines, i)
    ) {
      paragraphLines.push(
        lines[i].trim()
      );

      i++;
    }

    pushParagraph(paragraphLines);
  }

  return nodes;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // These legacy Blog URLs are canonicalized to the dedicated knowledge pages
  // through next.config.ts (301 redirects). They are intentionally not rendered
  // as duplicate Blog articles here.
  if (slug === "what-is-morse-code-complete-history-guide" || slug === "how-to-learn-morse-code-7-easy-steps") {
    notFound();
  }

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(
    post.slug,
    3
  );

  /*
   * Always resolve image through central mapping.
   */
  const heroImage = getPostImage(post);

  /*
   * Get SEO-friendly alt text and visible caption
   * for the current blog post image.
   */
  const heroImageMeta =
    blogImageMeta[post.slug] || fallbackImageMeta;

  const articleSchema = generateArticleSchema(
    post.title,
    post.description,
    `/blog/${post.slug}`,
    post.date
  );

  const breadcrumbSchema =
    generateBreadcrumbSchema([
      {
        name: "Home",
        url: "/",
      },
      {
        name: "Blog",
        url: "/blog",
      },
      {
        name: post.title,
        url: `/blog/${post.slug}`,
      },
    ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema
          ),
        }}
      />

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        {/* Breadcrumb */}
        <nav
          className="mb-7 flex items-center gap-2 text-sm text-slate-500"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="transition hover:text-green-600"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/blog"
            className="transition hover:text-green-600"
          >
            Blog
          </Link>

          <span>/</span>

          <span className="line-clamp-1 font-medium text-slate-900">
            {post.title}
          </span>
        </nav>

        {/* Article Header */}
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              {post.category}
            </span>

            <span className="text-sm text-slate-400">
              {post.readTime} read
            </span>
          </div>

          <h1 className="max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            {post.title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {post.description}
          </p>

          {/* Author & Editorial Information */}
<div className="mt-7 border-t border-slate-200 pt-5">
  <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-start">
    
    {/* Team Icon */}
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
      MC
    </div>

    <div className="flex-1">
      <p className="text-sm text-slate-500">
        Written and reviewed by
      </p>

      <Link
        href="/about"
        className="mt-1 inline-block text-base font-bold text-slate-900 transition hover:text-green-700"
      >
        Morse Code Translator Team
      </Link>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
        Our editorial team researches, writes, and reviews content to provide
        clear and accurate information about Morse code, communication
        standards, learning methods, and related topics.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-500">
        <span>
          Published:{" "}
          <time dateTime={post.date}>
            {post.date}
          </time>
        </span>

        <span className="hidden text-slate-300 sm:inline">
          •
        </span>

        <span>
          Reviewed for accuracy
        </span>

        <span className="hidden text-slate-300 sm:inline">
          •
        </span>

        <Link
          href="/editorial-policy"
          className="font-semibold text-green-700 transition hover:text-green-800 hover:underline"
        >
          Editorial Policy →
        </Link>
      </div>
    </div>
  </div>
</div>
        </header>

        {/* Hero Image */}
        <figure className="mb-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
            <Image
              src={heroImage}
              alt={heroImageMeta.alt}
              fill
              preload
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>

          <figcaption className="mt-3 px-1 text-center text-sm leading-6 text-slate-500">
            {heroImageMeta.caption}
          </figcaption>
        </figure>

        {/* Article Content */}
        <div className="mx-auto mb-14 max-w-3xl">
          {renderContent(post.content)}
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-slate-200 pt-10">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
                  Keep Learning
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  Related Articles
                </h2>
              </div>

              <Link
                href="/blog"
                className="text-sm font-semibold text-green-700 hover:text-green-800"
              >
                View all →
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {relatedPosts.map(
                (relatedPost) => {
                  const relatedImage =
                    getPostImage(relatedPost);

                  const relatedImageMeta =
                    blogImageMeta[relatedPost.slug] ||
                    fallbackImageMeta;

                  return (
                    <Link
                      key={
                        relatedPost.slug
                      }
                      href={`/blog/${relatedPost.slug}`}
                      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-green-300 hover:shadow-lg"
                    >
                      {/* Related Article Image */}
                      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                        <Image
                          src={
                            relatedImage
                          }
                          alt={
                            relatedImageMeta.alt
                          }
                          fill
                          className="object-cover transition duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>

                      <div className="p-5">
                        <span className="text-xs font-semibold text-green-700">
                          {
                            relatedPost.category
                          }
                        </span>

                        <h3 className="mt-2 font-bold leading-6 text-slate-900 transition group-hover:text-green-700">
                          {
                            relatedPost.title
                          }
                        </h3>

                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                          {
                            relatedPost.description
                          }
                        </p>
                      </div>
                    </Link>
                  );
                }
              )}
            </div>
          </section>
        )}

        {/* Back Button */}
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-xl border border-green-200 bg-green-50 px-5 py-3 text-sm font-semibold text-green-700 transition hover:border-green-300 hover:bg-green-100"
          >
            ← Back to Blog
          </Link>
        </div>
      </article>
    </>
  );
}