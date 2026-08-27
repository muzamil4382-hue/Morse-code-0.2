# ⚡ Morse Code Translator

<p align="center">
  <strong>A fast, modern, and SEO-friendly Morse Code Translator built with Next.js.</strong>
</p>

<p align="center">
  Convert text to Morse code, decode Morse code to text, listen to Morse code audio, use visual flash signals, download WAV files, and explore interactive learning resources.
</p>

<p align="center">
  <a href="https://www.morsecodetranslater.com">🌐 Visit Live Website</a>
</p>

---

## ✨ Features

### 🔄 Morse Code Translation

- Convert **Text → Morse Code**
- Convert **Morse Code → Text**
- Real-time translation
- Copy translated output
- Random text generation

### 🔊 Audio & Controls

- Adjustable Morse code speed
- Frequency controls
- Volume controls
- Morse code audio playback
- Visual flash mode
- WAV audio download

### 📚 Learning Resources

- Morse Code Alphabet
- Morse Code Numbers
- Morse Code Sounds
- Morse Code Timing
- Learn Morse Code Guide
- SOS Morse Code
- Interactive Morse Code Quiz
- Binary Code Translator
- Morse Code blog resources

### 🔎 SEO Features

- Optimized metadata
- Canonical URLs
- Open Graph metadata
- Twitter metadata
- FAQ Schema
- Breadcrumb Schema
- HowTo Schema
- SoftwareApplication Schema
- WebSite Schema
- XML Sitemap
- Internal linking

---

## 🛠 Tech Stack

| Technology | Usage |
|---|---|
| **Next.js** | Framework and App Router |
| **React** | UI Components |
| **TypeScript** | Type Safety |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animations |
| **Lucide React** | Icons |
| **shadcn/ui** | UI Components |
| **next-themes** | Theme Management |

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   ├── sitemap.ts
│   ├── home.client.tsx
│   ├── home-content.tsx
│   ├── home-faq.client.tsx
│   └── home-sos.client.tsx
│
├── components/
│   ├── morse/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── sections/
│   │   ├── translator-core.tsx
│   │   └── word-page-template.tsx
│   ├── theme/
│   └── ui/
│
├── hooks/
│   ├── use-mobile.ts
│   └── use-toast.ts
│
└── lib/
    ├── morse.ts
    ├── morse-characters.ts
    ├── seo.ts
    ├── blog-data.ts
    ├── db.ts
    └── utils.ts

public/
└── images/
    └── home/
        ├── modern-user-morse-code.webp
        ├── morse-code-timing-rules.webp
        └── slator-guide.webp
```

---

# 🏠 Homepage Architecture

The homepage is structured into separate components to keep interactive functionality separate from static and SEO-focused content.

## `page.tsx`

The main homepage server component handles:

- Page metadata
- FAQ structured data
- Breadcrumb structured data
- HowTo structured data
- SoftwareApplication schema
- WebSite schema
- Homepage component rendering

## `home.client.tsx`

Contains the main interactive Morse Code Translator.

Main functionality includes:

- Text input
- Morse code output
- Text ↔ Morse switching
- Audio playback
- Visual flash mode
- Speed controls
- Frequency controls
- Volume controls
- Copy functionality
- WAV download
- Random text generation

## `home-content.tsx`

Contains static and SEO-focused homepage content, including:

- Educational Morse code content
- Internal links
- Resource sections
- Supporting content
- Homepage infographics

## `home-faq.client.tsx`

Contains the interactive FAQ section.

FAQ data is also used to generate FAQ structured data for search engines.

## `home-sos.client.tsx`

Contains the SOS-related homepage section.

---

# 🖼 Homepage Infographics

Homepage infographic images are stored in:

```text
public/images/home/
```

Current infographic files:

```text
modern-user-morse-code.webp
morse-code-timing-rules.webp
slator-guide.webp
```

Images should include:

- Descriptive `alt` text
- Defined dimensions
- Optimized file sizes
- Appropriate loading behavior

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

- Node.js 18 or later
- npm

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Move into the project directory:

```bash
cd Morse-code-0.2
```

Install dependencies:

```bash
npm install
```

---

## 💻 Development Server

Start the development server:

```bash
npm run dev
```

Open the local development environment:

```text
http://localhost:3000
```

---

## 🏗 Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

> For more accurate Lighthouse and performance testing, test the production build instead of relying only on development mode.

---

# 🧭 Main Routes

## 🔧 Tools

| Route | Description |
|---|---|
| `/` | Main Morse Code Translator |
| `/morse-code-decoder` | Decode Morse code to text |
| `/binary-code-translator` | Binary Code Translator |
| `/morse-code-quiz` | Interactive Morse Code Quiz |

## 📚 Learning & Reference

| Route | Description |
|---|---|
| `/morse-code-alphabet` | Complete Morse Code Alphabet |
| `/morse-code-numbers` | Morse Code Numbers |
| `/morse-code-sounds` | Morse Code Sounds |
| `/morse-code-timing` | Morse Code Timing Guide |
| `/learn-morse-code` | Learn Morse Code |
| `/what-is-morse-code` | What is Morse Code |
| `/sos-morse-code` | SOS Morse Code Guide |

## 💬 Popular Word Pages

```text
/hello-in-morse-code
/hi-in-morse-code
/help-me-in-morse-code
/yes-in-morse-code
/no-in-morse-code
/i-love-you-in-morse-code
```

---

# 📝 Blog

The website includes a blog section for educational Morse code and related topics.

Blog routes follow this structure:

```text
/blog
/blog/[slug]
```

Blog post data is managed through:

```text
src/lib/blog-data.ts
```

---

# 🔍 SEO Architecture

SEO functionality is managed through:

```text
src/lib/seo.ts
```

The project includes:

- SEO metadata
- Canonical URLs
- Open Graph tags
- Twitter metadata
- FAQ Schema
- Breadcrumb Schema
- HowTo Schema
- SoftwareApplication Schema
- WebSite Schema
- XML Sitemap
- Internal linking

---

# 📊 Structured Data

The homepage generates multiple structured data types.

## FAQ Schema

Provides structured FAQ information for search engines.

## Breadcrumb Schema

Defines the homepage position within the website structure.

## HowTo Schema

Explains how users can use the Morse Code Translator.

## SoftwareApplication Schema

Describes the Morse Code Translator as an online application.

## WebSite Schema

Provides general structured information about the website.

---

# ♿ Accessibility

The project focuses on accessibility through:

- Proper labels for form controls
- Accessible range sliders
- Sufficient color contrast
- Semantic HTML
- Proper heading hierarchy
- Descriptive image `alt` text
- Keyboard navigation
- Accessible buttons and links

When adding new components, accessibility should be checked alongside visual design and functionality.

---

# ⚡ Performance

Performance optimization focuses on:

- Reducing unnecessary JavaScript
- Separating static and interactive components
- Optimizing images
- Preventing layout shifts
- Reducing unused JavaScript
- Reducing render-blocking resources
- Testing both mobile and desktop performance

Recommended production testing:

```bash
npm run build
npm run start
```

---

# 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

---

# 📌 Development Guidelines

When adding a new page:

1. Create a dedicated route.
2. Add unique metadata.
3. Add structured data where relevant.
4. Add contextual internal links.
5. Use semantic heading structure.
6. Optimize images.
7. Check mobile responsiveness.
8. Test production performance.
9. Check accessibility.
10. Add the page to the sitemap when required.

---

# 🌐 Live Website

<p align="center">
  <a href="https://www.morsecodetranslater.com">
    <strong>🌐 www.morsecodetranslater.com</strong>
  </a>
</p>

---

# 📄 License

This is a private project.

**All rights reserved.**