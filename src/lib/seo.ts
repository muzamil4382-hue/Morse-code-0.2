import type { Metadata } from "next";

export const BASE_URL = "https://www.morsecodetranslater.com";
export const DEFAULT_SOCIAL_IMAGE = `${BASE_URL}/og-image.png`;

/**
 * Generate page-level metadata for SEO
 */
export function generatePageMeta(
  title: string,
  description: string,
  path: string,
  keywords: string[] = [],
  options?: { ogType?: "website" | "article" }
): Metadata {
  const url = `${BASE_URL}${path}`;
  const ogType = options?.ogType || "website";
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_SOCIAL_IMAGE],
    },
  };
}

/**
 * Generate JSON-LD Article schema
 */
export function generateArticleSchema(
  title: string,
  description: string,
  url: string,
  datePublished: string,
  author: string = "Morse Code Translator"
): object {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${BASE_URL}${url}`,
    datePublished,
    dateModified: datePublished,
    author: {
      "@type": "Organization",
      name: author,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Morse Code Translator",
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}${url}`,
    },
  };
}

/**
 * Generate JSON-LD FAQPage schema
 */
export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate JSON-LD BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate JSON-LD HowTo schema
 */
export function generateHowToSchema(
  steps: { name: string; text: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/**
 * Generate JSON-LD SoftwareApplication schema
 */
export function generateSoftwareApplicationSchema({
  name,
  description,
  url,
  applicationCategory = "UtilityApplication",
  operatingSystem = "Web",
  offers,
}: {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: { price: string; priceCurrency: string };
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: `${BASE_URL}${url}`,
    applicationCategory,
    operatingSystem,
    offers: offers || { price: "0", priceCurrency: "USD" },
  };
}

/**
 * Generate JSON-LD Organization schema
 */
export function generateOrganizationSchema({
  name = "Morse Code Translator",
  url = "",
  logo = "",
  description = "",
}: {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
} = {}): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url: url || BASE_URL,
    logo: logo || `${BASE_URL}/logo.svg`,
    description: description || "Free online Morse code translator with audio playback, visual flash, and comprehensive learning resources.",
  };
}

/**
 * Generate JSON-LD WebSite schema
 */
export function generateWebSiteSchema({
  name = "Morse Code Translator",
  description = "Free online Morse code translator. Convert text to Morse code and Morse code to text with audio playback.",
}: {
  name?: string;
  description?: string;
} = {}): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url: BASE_URL,
    description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate JSON-LD Person schema
 */
export function generatePersonSchema({
  name,
  role,
  bio,
  expertise,
  url,
}: {
  name: string;
  role?: string;
  bio?: string;
  expertise?: string[];
  url?: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle: role,
    description: bio,
    knowsAbout: expertise,
    url: url || BASE_URL,
  };
}
