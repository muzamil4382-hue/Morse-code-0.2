import Link from "next/link";
import {
  WordPageTemplate,
  generateWordPageMeta,
} from "@/components/morse/word-page-template";
import { getWordBySlug, getAllWordPages } from "@/lib/word-data";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getAllWordPages().map((word) => ({
    slug: word.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const word = getWordBySlug(slug);

  if (!word) {
    return {};
  }

  return generateWordPageMeta(word);
}

function InternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="font-medium text-green-700 underline decoration-green-300 underline-offset-2 transition-colors hover:text-green-800 hover:decoration-green-600"
    >
      {children}
    </Link>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="font-medium text-green-700 underline decoration-green-300 underline-offset-2 transition-colors hover:text-green-800 hover:decoration-green-600"
    >
      {children}
    </a>
  );
}

/**
 * Adds contextual internal/external links to the reusable word-page content
 * without changing the source text stored in word-data.ts.
 *
 * The links are intentionally contextual rather than repeated mechanically
 * after every paragraph. This keeps the page readable while creating useful
 * topical connections for users and search engines.
 */
function renderContextualText(text: string, currentSlug: string) {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  const rules = [
    {
      phrase: "Morse Code Translator",
      href: "/",
      type: "internal" as const,
    },
    {
      phrase: "Morse Code Alphabet",
      href: "/morse-code-alphabet",
      type: "internal" as const,
    },
    {
      phrase: "Morse Code learning guide",
      href: "/learn-morse-code",
      type: "internal" as const,
    },
    {
      phrase: "Hello in Morse Code",
      href: "/blog/hello-in-morse-code-and-common-phrases",
      type: "internal" as const,
    },
    {
      phrase: "SOS",
      href: "/blog/sos-signal-morse-code-everything-you-need-to-know",
      type: "internal" as const,
    },
    {
      phrase: "I Love You in Morse Code",
      href: "/blog/i-love-you-in-morse-code-meaning-translation",
      type: "internal" as const,
    },
    {
      phrase: "ITU-R Recommendation M.1677",
      href: "https://www.itu.int/rec/R-REC-M.1677",
      type: "external" as const,
    },
    {
      phrase: "ARRL",
      href: "https://www.arrl.org/code-characters",
      type: "external" as const,
    },
  ];

  while (remaining.length > 0) {
    let best:
      | {
          index: number;
          phrase: string;
          href: string;
          type: "internal" | "external";
        }
      | undefined;

    for (const rule of rules) {
      const index = remaining.indexOf(rule.phrase);

      if (index === -1) continue;

      // Avoid linking a page to itself when a phrase happens to appear in
      // its own content.
      if (rule.type === "internal" && rule.href.slice(1) === currentSlug) {
        continue;
      }

      if (!best || index < best.index) {
        best = {
          index,
          phrase: rule.phrase,
          href: rule.href,
          type: rule.type,
        };
      }
    }

    if (!best) {
      parts.push(remaining);
      break;
    }

    if (best.index > 0) {
      parts.push(remaining.slice(0, best.index));
    }

    const linkedText =
      best.type === "internal" ? (
        <InternalLink key={key++} href={best.href}>
          {best.phrase}
        </InternalLink>
      ) : (
        <ExternalLink key={key++} href={best.href}>
          {best.phrase}
        </ExternalLink>
      );

    parts.push(linkedText);
    remaining = remaining.slice(best.index + best.phrase.length);
  }

  return parts;
}

export default async function WordPage({ params }: PageProps) {
  const { slug } = await params;
  const word = getWordBySlug(slug);

  if (!word) {
    return null;
  }

  return (
    <WordPageTemplate config={word}>
      {/* Introduction */}
      <section className="mb-10">
        <p className="text-lg leading-8 text-slate-700">
          {renderContextualText(word.intro, word.slug)}
        </p>
      </section>

      {/* Main SEO Content */}
      {word.sections.map((section) => (
        <section key={section.heading} className="mb-10">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
            {section.heading}
          </h2>

          {section.paragraphs?.map((paragraph, index) => (
            <p
              key={`${section.heading}-paragraph-${index}`}
              className="mb-4 leading-7 text-slate-700"
            >
              {renderContextualText(paragraph, word.slug)}
            </p>
          ))}

          {section.bullets && section.bullets.length > 0 && (
            <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-700">
              {section.bullets.map((bullet, index) => (
                <li key={`${section.heading}-bullet-${index}`}>
                  {renderContextualText(bullet, word.slug)}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {/* Helpful Internal Links */}
      <section className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
          Continue Learning Morse Code
        </h2>

        <p className="mb-4 leading-7 text-slate-700">
          Want to practice another translation? Use our{" "}
          <InternalLink href="/">Morse Code Translator</InternalLink>{" "}
          to convert words, phrases, and messages into Morse code.
        </p>

        <p className="mb-4 leading-7 text-slate-700">
          For a complete letter reference, visit the{" "}
          <InternalLink href="/morse-code-alphabet">
            Morse Code Alphabet
          </InternalLink>{" "}
          to check individual characters and their dot-and-dash patterns.
        </p>

        <p className="leading-7 text-slate-700">
          If you are learning Morse code from scratch, follow our{" "}
          <InternalLink href="/learn-morse-code">
            Morse Code learning guide
          </InternalLink>{" "}
          for a structured introduction to recognition, timing, and practice.
        </p>
      </section>

      {/* Related Words */}
      {word.relatedWords.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-5 text-2xl font-bold tracking-tight text-slate-900">
            Related Morse Code Words
          </h2>

          <p className="mb-5 leading-7 text-slate-700">
            Explore these related Morse code words and phrases to compare
            different character patterns and build your vocabulary.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {word.relatedWords.map((related) => (
              <Link
                key={`${related.slug}-${related.word}`}
                href={`/${related.slug}`}
                className="group block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-green-400 hover:shadow-md"
              >
                <div className="mb-1 font-semibold text-slate-900 group-hover:text-green-700">
                  {related.word} in Morse Code
                </div>

                <div className="font-mono text-green-700">
                  {related.morse}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Sources */}
      {word.sources.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
            Sources & Further Reading
          </h2>

          <p className="mb-5 leading-7 text-slate-700">
            For additional information about International Morse code,
            standardized characters, and learning resources, these
            authoritative references are useful:
          </p>

          <div className="space-y-4">
            {word.sources.map((source) => (
              <div
                key={source.url}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <ExternalLink href={source.url}>
                  {source.title}
                </ExternalLink>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {source.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </WordPageTemplate>
  );
}
