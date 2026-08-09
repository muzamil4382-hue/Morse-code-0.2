import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";
import { letterData, numberData } from "@/lib/morse-characters";
import { BASE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  /*
   * Main static pages
   */
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    {
      url: `${BASE_URL}/morse-code-decoder`,
      changeFrequency: "monthly",
      priority: 0.93,
    },

    {
      url: `${BASE_URL}/morse-code-alphabet`,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${BASE_URL}/learn-morse-code`,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${BASE_URL}/morse-code-timing`,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${BASE_URL}/morse-code-numbers`,
      changeFrequency: "monthly",
      priority: 0.85,
    },

    {
      url: `${BASE_URL}/what-is-morse-code`,
      changeFrequency: "monthly",
      priority: 0.85,
    },

    {
      url: `${BASE_URL}/sos-morse-code`,
      changeFrequency: "monthly",
      priority: 0.85,
    },

    {
      url: `${BASE_URL}/binary-code-translator`,
      changeFrequency: "monthly",
      priority: 0.85,
    },

    {
      url: `${BASE_URL}/morse-code-sounds`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/morse-code-quiz`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/i-love-you-in-morse-code`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/hello-in-morse-code`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/hi-in-morse-code`,
      changeFrequency: "monthly",
      priority: 0.75,
    },

    {
      url: `${BASE_URL}/help-me-in-morse-code`,
      changeFrequency: "monthly",
      priority: 0.75,
    },

    {
      url: `${BASE_URL}/yes-in-morse-code`,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${BASE_URL}/no-in-morse-code`,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    /*
     * Blog index
     */
    {
      url: `${BASE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    /*
     * Informational / legal pages
     */
    {
      url: `${BASE_URL}/about`,
      changeFrequency: "yearly",
      priority: 0.3,
    },

    {
      url: `${BASE_URL}/contact`,
      changeFrequency: "yearly",
      priority: 0.3,
    },

    {
      url: `${BASE_URL}/privacy`,
      changeFrequency: "yearly",
      priority: 0.2,
    },

    {
      url: `${BASE_URL}/terms`,
      changeFrequency: "yearly",
      priority: 0.2,
    },

    {
      url: `${BASE_URL}/disclaimer`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  /*
   * Blog posts
   */
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  /*
   * Morse Code Letter pages
   * A-Z
   */
  const letterPages: MetadataRoute.Sitemap = letterData.map((letter) => ({
    url: `${BASE_URL}/morse-code-letter/${letter.char.toLowerCase()}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  /*
   * Morse Code Number pages
   * 0-9
   */
  const numberPages: MetadataRoute.Sitemap = numberData.map((number) => ({
    url: `${BASE_URL}/morse-code-number/${number.char}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  /*
   * Final sitemap
   */
  return [
    ...staticPages,
    ...blogPages,
    ...letterPages,
    ...numberPages,
  ];
}