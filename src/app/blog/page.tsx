import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog-data";
import { generatePageMeta, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta(
  "Morse Code Blog - Articles, Guides & Tutorials",
  "Read our latest articles, guides, and tutorials about Morse code. Learn history, tips, tricks, and fascinating facts.",
  "/blog",
  ["morse code blog", "morse code articles", "morse code guides", "morse code tutorials"]
);

export default function BlogPage() {
  const posts = getAllPosts();
  const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog" },
]);

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-medium">Blog</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Morse Code Blog</h1>
          <p className="text-lg text-slate-600">
            Articles, guides, and tutorials about Morse code — from history and learning tips to fascinating
            facts and modern applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-white border border-slate-200 rounded-xl p-6 hover:border-green-400 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-slate-400">{post.readTime} read</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-slate-600 mb-4 line-clamp-3">{post.description}</p>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>{post.author}</span>
                <span>·</span>
                <span>{post.date}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Explore More */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Explore Our Tools</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Link href="/" className="p-4 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all group">
              <span className="text-green-600 text-lg">🔤</span>
              <span className="ml-2 text-sm font-medium text-slate-900 group-hover:text-green-600">Morse Translator</span>
            </Link>
            <Link href="/morse-code-alphabet" className="p-4 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all group">
              <span className="text-green-600 text-lg">📋</span>
              <span className="ml-2 text-sm font-medium text-slate-900 group-hover:text-green-600">Alphabet Chart</span>
            </Link>
            <Link href="/learn-morse-code" className="p-4 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all group">
              <span className="text-green-600 text-lg">📖</span>
              <span className="ml-2 text-sm font-medium text-slate-900 group-hover:text-green-600">Learn Morse Code</span>
            </Link>
            <Link href="/morse-code-quiz" className="p-4 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all group">
              <span className="text-green-600 text-lg">🎯</span>
              <span className="ml-2 text-sm font-medium text-slate-900 group-hover:text-green-600">Morse Quiz</span>
            </Link>
            <Link href="/morse-code-decoder" className="p-4 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all group">
              <span className="text-green-600 text-lg">🔓</span>
              <span className="ml-2 text-sm font-medium text-slate-900 group-hover:text-green-600">Morse Decoder</span>
            </Link>
            <Link href="/what-is-morse-code" className="p-4 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all group">
              <span className="text-green-600 text-lg">📖</span>
              <span className="ml-2 text-sm font-medium text-slate-900 group-hover:text-green-600">History & Info</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
