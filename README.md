# MorseCodeTranslater.com — Morse Code Translator Website

A comprehensive, SEO-optimized Morse Code translator website built with **Next.js 16**, **TypeScript**, **Tailwind CSS 4**, **Framer Motion**, and **Lucide React**. The site provides free Morse code translation tools, educational content, and reference guides.

**Live URL:** [https://www.morsecodetranslater.com](https://www.morsecodetranslater.com)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Pages & Routes](#pages--routes)
- [Key Architecture Patterns](#key-architecture-patterns)
- [SEO Infrastructure](#seo-infrastructure)
- [Internal Linking Strategy](#internal-linking-strategy)
- [Components](#components)
- [Libraries & Utilities](#libraries--utilities)
- [Deployment](#deployment)
- [Scripts](#scripts)

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.1.x | React framework (App Router) |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Utility-first CSS |
| Framer Motion | 12.x | Animations & transitions |
| Lucide React | 0.525.x | Icon library |
| shadcn/ui | Radix-based | UI component library |
| Prisma | 6.x | Database ORM (if needed) |
| next-themes | 0.4.x | Dark/light mode |

---

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage (server component)
│   ├── home.client.tsx           # Homepage client (translator tool)
│   ├── layout.tsx                # Root layout (header, footer, JSON-LD)
│   ├── globals.css               # Global styles
│   ├── sitemap.ts                # Auto-generated XML sitemap
│   ├── blog/                     # Blog section
│   │   ├── page.tsx              # Blog listing
│   │   └── [slug]/page.tsx       # Individual blog posts
│   ├── morse-code-translator/    # Main translator tool
│   │   ├── page.tsx              # Server (metadata, JSON-LD, FAQs)
│   │   └── translator.client.tsx # Client (interactive tool)
│   ├── morse-code-decoder/       # Dedicated Morse-to-text decoder
│   │   ├── page.tsx
│   │   └── decoder.client.tsx
│   ├── morse-code-alphabet/      # Complete A-Z alphabet chart
│   │   ├── page.tsx
│   │   └── alphabet.client.tsx
│   ├── morse-code-letters/       # Letters A-Z detailed guide
│   │   ├── page.tsx
│   │   └── letters.client.tsx
│   ├── morse-code-numbers/       # Numbers 0-9 reference
│   │   └── page.tsx
│   ├── morse-code-sounds/        # Audio & frequency guide
│   │   └── page.tsx
│   ├── morse-code-timing/        # ITU timing & WPM reference
│   │   ├── page.tsx
│   │   └── timing.client.tsx
│   ├── morse-code-quiz/          # Interactive quiz
│   │   ├── page.tsx
│   │   └── quiz.client.tsx
│   ├── binary-code-translator/   # Binary code translator
│   │   ├── page.tsx
│   │   └── binary.client.tsx
│   ├── learn-morse-code/         # Step-by-step learning guide
│   │   └── page.tsx
│   ├── what-is-morse-code/       # History & info article
│   │   └── page.tsx
│   ├── sos-morse-code/           # SOS distress signal guide
│   │   └── page.tsx
│   ├── [word]-in-morse-code/     # Word-specific pages (9 pages)
│   │   ├── hello-in-morse-code/
│   │   ├── hi-in-morse-code/
│   │   ├── help-in-morse-code/
│   │   ├── help-me-in-morse-code/
│   │   ├── yes-in-morse-code/
│   │   ├── no-in-morse-code/
│   │   ├── love-in-morse-code/
│   │   ├── i-love-you-in-morse-code/
│   │   └── sos-morse-code/
│   ├── morse-code-letter/[letter]/ # Individual letter pages (26)
│   ├── morse-code-number/[number]/ # Individual number pages (10)
│   ├── contact/                   # Contact form
│   ├── about/                     # About page
│   ├── privacy/                   # Privacy policy
│   ├── terms/                     # Terms of service
│   ├── disclaimer/                # Disclaimer
│   └── api/route.ts              # API route
├── components/
│   ├── morse/                    # Morse-specific components
│   │   ├── header.tsx            # Site header/nav
│   │   ├── footer.tsx            # Site footer
│   │   ├── sections/index.tsx    # Reusable page sections
│   │   ├── word-page-template.tsx # Template for word pages
│   │   └── translator-core.tsx   # Core translator logic
│   ├── ui/                       # shadcn/ui components (50+)
│   └── theme/                    # Theme provider
├── lib/
│   ├── seo.ts                    # SEO utilities & JSON-LD generators
│   ├── morse.ts                  # Morse code data & audio functions
│   ├── morse-characters.ts       # Extended character data
│   ├── blog-data.ts              # Blog post data
│   ├── db.ts                     # Database connection
│   └── utils.ts                  # General utilities (cn, etc.)
└── hooks/                        # Custom React hooks
    ├── use-toast.ts
    └── use-mobile.ts
```

---

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm or bun package manager

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd <project-directory>

# Install dependencies
npm install
# or: bun install

# Start development server
npm run dev
# or: bun run dev
```

The site will be available at `http://localhost:3000`.

### Production Build

```bash
npm run build
npm run start
```

---

## Pages & Routes

### Tool Pages (Interactive)

| Route | Page Title | Primary Keyword |
|---|---|---|
| `/` | Morse Code Translator | morse code translator |
| `/morse-code-translator` | Morse Code Translator | morse code translator |
| `/morse-code-decoder` | Morse Code Decoder | morse code decoder |
| `/binary-code-translator` | Binary Code Translator | binary code translator |
| `/morse-code-quiz` | Morse Code Quiz | morse code quiz |

### Reference Pages (Educational)

| Route | Page Title | Primary Keyword |
|---|---|---|
| `/morse-code-alphabet` | Morse Code Alphabet | morse code alphabet |
| `/morse-code-letters` | Morse Code Letters A-Z | morse code letters |
| `/morse-code-numbers` | Morse Code Numbers 0-9 | morse code numbers |
| `/morse-code-sounds` | Morse Code Sounds | morse code sounds |
| `/morse-code-timing` | Morse Code Timing | morse code timing |
| `/learn-morse-code` | How to Learn Morse Code | learn morse code |
| `/what-is-morse-code` | What is Morse Code? | what is morse code |

### Word Pages (Translation Reference)

| Route | Word | Morse Code |
|---|---|---|
| `/hello-in-morse-code` | HELLO | .... . / .-.. .-.. / --- |
| `/hi-in-morse-code` | HI | .... .. |
| `/help-in-morse-code` | HELP | .... . .-.. .--. |
| `/help-me-in-morse-code` | HELP ME | .... . .-.. .--. / -- . |
| `/yes-in-morse-code` | YES | -.-- . ... |
| `/no-in-morse-code` | NO | -. --- |
| `/love-in-morse-code` | LOVE | .-.. --- ...- . |
| `/i-love-you-in-morse-code` | I LOVE YOU | .. / .-.. / --- / ...- / . / -.-- / --- / ..- |
| `/sos-morse-code` | SOS | ... --- ... |

### Dynamic Pages (SSG)

| Route | Description | Count |
|---|---|---|
| `/morse-code-letter/[letter]` | Individual letter pages | 26 pages |
| `/morse-code-number/[number]` | Individual number pages | 10 pages |
| `/blog/[slug]` | Blog post pages | Dynamic |

### Legal & Utility Pages

| Route | Description |
|---|---|
| `/about` | About the website |
| `/contact` | Contact form |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/disclaimer` | Disclaimer |
| `/sitemap.xml` | Auto-generated sitemap |

---

## Key Architecture Patterns

### Server/Client Split

Each tool page follows a consistent **server + client split** pattern:

```
morse-code-translator/
├── page.tsx              # Server Component
│   ├── Metadata export (title, description, keywords, OG)
│   ├── JSON-LD schemas (FAQ, SoftwareApp, HowTo, Breadcrumb)
│   └── Renders <ClientComponent faqs={faqs} />
└── translator.client.tsx  # Client Component ("use client")
    ├── Interactive UI (inputs, buttons, state)
    ├── Audio playback
    └── FAQ accordion + Explore More links
```

This pattern ensures:
- **SEO**: Metadata and JSON-LD are server-rendered for search engine crawlers
- **Interactivity**: Client components handle user interactions
- **Performance**: Server components don't add to client bundle size

### Word Page Template

All word pages (hello, hi, help, etc.) use a shared `WordPageTemplate` component that provides:
- Breadcrumb navigation
- Morse code visual display (dots/dashes)
- Letter-by-letter breakdown
- FAQ section with JSON-LD
- Related words grid (4 cross-links)
- Explore More grid (9 internal links)
- Custom content via `children` prop

---

## SEO Infrastructure

### Shared SEO Library (`src/lib/seo.ts`)

**Do NOT replace this file entirely.** It exports:

- `BASE_URL` — Canonical domain URL
- `DEFAULT_SOCIAL_IMAGE` — Default OG image path
- `generatePageMeta(title, desc, path, keywords, ogType?)` — Generates Next.js Metadata
- `generateArticleSchema(...)` — Article JSON-LD
- `generateFAQSchema(faqs)` — FAQPage JSON-LD
- `generateBreadcrumbSchema(items)` — BreadcrumbList JSON-LD
- `generateSoftwareApplicationSchema(...)` — SoftwareApplication JSON-LD
- `generateHowToSchema(steps)` — HowTo JSON-LD
- `generateOrganizationSchema()` — Organization JSON-LD
- `generateWebSiteSchema()` — WebSite JSON-LD
- `generatePersonSchema()` — Person JSON-LD

### JSON-LD Schemas Per Page

| Page Type | Schemas |
|---|---|
| Homepage | WebSite, Organization, SoftwareApplication, FAQ |
| Tool pages | FAQ, SoftwareApplication, Breadcrumb |
| Info pages | Article/FAQ, Breadcrumb |
| Word pages | FAQ, Breadcrumb |
| SOS page | FAQ, Breadcrumb, HowTo |
| Blog posts | Article, Breadcrumb |

### Technical SEO

- **robots.txt** — Allows all crawlers, links to sitemap
- **sitemap.xml** — Auto-generated from all routes via `src/app/sitemap.ts`
- **Canonical URLs** — Set via metadata `alternates.canonical`
- **Open Graph** — Title, description, image, type, URL on every page
- **Twitter Cards** — Summary large image cards
- **Structured Data** — JSON-LD for rich snippets
- **Breadcrumbs** — BreadcrumbList schema on every page
- **One primary keyword per page** — No keyword cannibalization
- **Research-based content** — ITU-R M.1677 standards, historical data, frequency data

---

## Internal Linking Strategy

The site uses a comprehensive internal linking structure:

### Link Types

1. **Navigation links** — Header nav and footer links (site-wide)
2. **Breadcrumb links** — Home > Current Page on every page
3. **Related Words** — 4 cross-links between word pages (on word pages)
4. **Explore More sections** — 6-9 contextual internal links at the bottom of every page
5. **Inline contextual links** — Links within body content to related pages
6. **Popular Tools sections** — 6 tool links on legal pages (about, privacy, terms, disclaimer)
7. **Resource cards** — 6-9 descriptive link cards on learning/reference pages
8. **Individual letter/number links** — 26 letter pages + 10 number pages linked from alphabet/numbers charts

### Link Distribution

Every page links to 8-15+ other internal pages through a combination of the above methods. The linking follows topic clusters:

- **Tools cluster**: translator, decoder, binary translator, quiz
- **Reference cluster**: alphabet, letters, numbers, sounds, timing
- **Learning cluster**: learn, quiz, what-is, word pages
- **Word cluster**: 9 word pages cross-linked via related words

---

## Components

### Morse-Specific (`src/components/morse/`)

| Component | File | Description |
|---|---|---|
| Header | `header.tsx` | Responsive navigation bar |
| Footer | `footer.tsx` | Site footer with links |
| Sections | `sections/index.tsx` | Reusable page section components |
| WordPageTemplate | `word-page-template.tsx` | Template for all word-in-morse-code pages |
| TranslatorCore | `translator-core.tsx` | Core translation logic component |

### UI Components (`src/components/ui/`)

50+ shadcn/ui components including Button, Card, Dialog, Accordion, Tabs, Input, etc.

---

## Libraries & Utilities

### `src/lib/morse.ts`

Core Morse code functionality:

- `MORSE_CODE` — Object mapping characters to Morse code strings
- `TEXT_CODE` — Reverse mapping (Morse to character)
- `textToMorse(text)` — Convert text to Morse code
- `morseToText(morse)` — Convert Morse code to text
- `playMorseAudio(code, options)` — Play Morse code as audio via Web Audio API
- `stopMorseAudio()` — Stop currently playing audio
- `getIsPlaying()` — Check if audio is currently playing

### `src/lib/seo.ts`

SEO utilities (see [SEO Infrastructure](#seo-infrastructure) above).

### `src/lib/blog-data.ts`

Blog post definitions (titles, slugs, content, dates).

---

## Deployment

### Build Command

```bash
npm run build
```

This produces a standalone output in `.next/standalone/`.

### Caddy Configuration

A `Caddyfile` is included for Caddy reverse proxy deployment.

### Environment

- Set `NODE_ENV=production` for production
- Database is optional (Prisma is included but not required for core functionality)

---

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Production build with standalone output |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push Prisma schema to database |

---

## Content Standards

- **One primary keyword per page** — No keyword cannibalization
- **Research-based content** — ITU-R M.1677 standards, historical facts, frequency data
- **No duplicate content** — Each page has unique, original content
- **Minimum content depth** — Every page has substantial paragraphs (3-5 sentences each)
- **FAQ sections** — Most pages include 3-5 FAQs with JSON-LD markup

---

## License

Private project. All rights reserved.
hello