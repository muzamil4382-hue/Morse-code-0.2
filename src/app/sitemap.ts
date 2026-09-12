import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";
import { BASE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [
        `${BASE_URL}/images/home/modern-uses-of-morse-code.png`,
        `${BASE_URL}/images/home/morse-code-timing-rules.png`,
        `${BASE_URL}/images/home/morse-code-translator-guide.png`,
      ],
    },
    {
      url: `${BASE_URL}/morse-code-alphabet`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [
        `${BASE_URL}/images/alphabet/morse-code-alphabet-chart.png`,
        `${BASE_URL}/images/alphabet/how-to-read-morse-code.png`,
      ],
    },
    {
      url: `${BASE_URL}/morse-code-numbers`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [`${BASE_URL}/images/numbers/morse-code-numbers-chart.png`],
    },
    {
      url: `${BASE_URL}/binary-code-translator`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/learn-morse-code`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [
        `${BASE_URL}/images/blog/how-to-learn-morse-code.webp`,
        `${BASE_URL}/images/infographic/learn-morse-code-roadmap.webp`,
        `${BASE_URL}/images/infographic/koch-vs-farnsworth-method.webp`,
      ],
    },
    {
      url: `${BASE_URL}/what-is-morse-code`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [
        `${BASE_URL}/images/blog/what-is-morse-code.webp`,
        `${BASE_URL}/images/infographic/what-is-morse-code-infographic.webp`,
      ],
    },
    {
      url: `${BASE_URL}/morse-code-timing`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [
        `${BASE_URL}/images/infographic/morse-code-timing-guide.png`,
        `${BASE_URL}/images/infographic/morse-code-spacing-guide.png`,
      ],
    },
    {
      url: `${BASE_URL}/morse-code-sounds`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [
        `${BASE_URL}/images/infographic/morse-code-sounds-guide.png`,
      ],
    },
    {
      url: `${BASE_URL}/morse-code-quiz`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [`${BASE_URL}/images/blog/morse-code-quiz.png`],
    },
    {
      url: `${BASE_URL}/hi-in-morse-code`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/help-me-in-morse-code`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/yes-in-morse-code`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/no-in-morse-code`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/editorial-policy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/disclaimer`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // Legacy/redirected blog slugs are excluded from the sitemap.
  // Canonical pages are listed above instead.
  const redirectedBlogSlugs = new Set([
    "what-is-morse-code-complete-history-guide",
    "how-to-learn-morse-code-7-easy-steps",
  ]);

  const blogPages: MetadataRoute.Sitemap = blogPosts
    .filter((post) => !redirectedBlogSlugs.has(post.slug))
    .map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: [`${BASE_URL}/images/blog/${post.slug}.png`],
    }));

  return [...staticPages, ...blogPages];
}
