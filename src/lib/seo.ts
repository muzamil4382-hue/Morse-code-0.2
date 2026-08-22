import type { Metadata } from "next";

export const BASE_URL = "https://www.morsecodetranslater.com";

export const SITE_NAME = "Morse Code Translator";

export const ORGANIZATION_NAME = "Morse Code Translator Team";

export const DEFAULT_SOCIAL_IMAGE = `${BASE_URL}/og-image.png`;

export const LOGO_URL = `${BASE_URL}/logo.svg`;

/**
 * Generate page-level metadata for SEO
 */
export function generatePageMeta(
  title: string,
  description: string,
  path: string,
  keywords: string[] = [],
  options?: {
    ogType?: "website" | "article";
  }
): Metadata {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${BASE_URL}${normalizedPath}`;
  const ogType = options?.ogType || "website";

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: url,
    },

    openGraph: {
      type: ogType,
      url,
      title,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: DEFAULT_SOCIAL_IMAGE,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} - Free Online Morse Code Tools`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_SOCIAL_IMAGE],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Generate JSON-LD Article schema
 * Supports both object-style and positional arguments.
 */
type ArticleSchemaInput = {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
};

export function generateArticleSchema(
  input: ArticleSchemaInput
): object;

export function generateArticleSchema(
  title: string,
  description: string,
  url: string,
  datePublished: string,
  author?: string
): object;

export function generateArticleSchema(
  inputOrTitle: ArticleSchemaInput | string,
  descriptionArg?: string,
  urlArg?: string,
  datePublishedArg?: string,
  authorArg: string = ORGANIZATION_NAME
): object {
  let title: string;
  let description: string;
  let url: string;
  let datePublished: string;
  let dateModified: string;
  let author: string;

  if (typeof inputOrTitle === "object") {
    title = inputOrTitle.title;
    description = inputOrTitle.description;
    url = inputOrTitle.url;
    datePublished = inputOrTitle.datePublished;
    dateModified = inputOrTitle.dateModified || datePublished;
    author = inputOrTitle.author || ORGANIZATION_NAME;
  } else {
    title = inputOrTitle;
    description = descriptionArg!;
    url = urlArg!;
    datePublished = datePublishedArg!;
    dateModified = datePublishedArg!;
    author = authorArg;
  }

  const normalizedUrl = url.startsWith("/") ? url : `/${url}`;
  const fullUrl = `${BASE_URL}${normalizedUrl}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",

    headline: title,

    description,

    url: fullUrl,

    datePublished,

    dateModified,

    author: {
      "@type": "Organization",
      name: author,
      url: `${BASE_URL}/about`,
    },

    publisher: {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
      url: BASE_URL,

      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl,
    },
  };
}

/**
 * Generate JSON-LD FAQPage schema
 */
export function generateFAQSchema(
  faqs: {
    question: string;
    answer: string;
  }[]
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
  items: {
    name: string;
    url: string;
  }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: items.map((item, index) => {
      const normalizedUrl = item.url.startsWith("/")
        ? item.url
        : `/${item.url}`;

      return {
        "@type": "ListItem",

        position: index + 1,

        name: item.name,

        item: `${BASE_URL}${normalizedUrl}`,
      };
    }),
  };
}

/**
 * Generate JSON-LD HowTo schema
 */
export function generateHowToSchema(
  steps: {
    name: string;
    text: string;
  }[]
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
  offers?: {
    price: string;
    priceCurrency: string;
  };
}): object {
  const normalizedUrl = url.startsWith("/") ? url : `/${url}`;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",

    name,

    description,

    url: `${BASE_URL}${normalizedUrl}`,

    applicationCategory,

    operatingSystem,

    offers: offers || {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },

    publisher: {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
      url: BASE_URL,
    },
  };
}

/**
 * Generate JSON-LD Organization schema
 */
export function generateOrganizationSchema({
  name = ORGANIZATION_NAME,
  url = BASE_URL,
  logo = LOGO_URL,
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

    url,

    logo,

    description:
      description ||
      "Morse Code Translator Team provides free online Morse code tools, educational resources, reference charts, quizzes, and learning guides based on International Morse Code standards.",

    sameAs: [],
  };
}

/**
 * Generate JSON-LD WebSite schema
 */
export function generateWebSiteSchema({
  name = SITE_NAME,
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

    publisher: {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
      url: BASE_URL,
    },
  };
}

/**
 * Generate JSON-LD Person schema
 *
 * Use this only when a real, identifiable individual
 * is actually responsible for reviewing or writing content.
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

    url: url || `${BASE_URL}/about`,
  };
}