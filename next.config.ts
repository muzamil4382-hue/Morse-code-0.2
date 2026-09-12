import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  allowedDevOrigins: [
    "preview-chat-f3042776-c879-4bbb-88ee-9c3e4aca018a.space-z.ai",
    "space-z.ai",
  ],

  async redirects() {
    return [
      {
        source: "/morse-code-translator",
        destination: "/",
        permanent: true,
      },
      {
        source: "/morse-code-decoder",
        destination: "/",
        permanent: true,
      },
      {
        source: "/morse-code-letters",
        destination: "/morse-code-alphabet",
        permanent: true,
      },
      {
        source: "/morse-code-letter/:letter([a-zA-Z])",
        destination: "/morse-code-alphabet#letter-:letter",
        permanent: true,
      },
      {
        source: "/morse-code-number/:number([0-9])",
        destination: "/morse-code-numbers#number-:number",
        permanent: true,
      },
      {
        source: "/love-in-morse-code",
        destination: "/blog/i-love-you-in-morse-code-meaning-translation",
        permanent: true,
      },
      {
        source: "/sos-morse-code",
        destination: "/blog/sos-signal-morse-code-everything-you-need-to-know",
        permanent: true,
      },
      {
        source: "/i-love-you-in-morse-code",
        destination: "/blog/i-love-you-in-morse-code-meaning-translation",
        permanent: true,
      },
      {
        source: "/hello-in-morse-code",
        destination: "/blog/hello-in-morse-code-and-common-phrases",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/hi-in-morse-code",
        destination: "/morse-code-word/hi-in-morse-code",
      },
      {
        source: "/help-me-in-morse-code",
        destination: "/morse-code-word/help-me-in-morse-code",
      },
      {
        source: "/yes-in-morse-code",
        destination: "/morse-code-word/yes-in-morse-code",
      },
      {
        source: "/no-in-morse-code",
        destination: "/morse-code-word/no-in-morse-code",
      },
    ];
  },
};

export default nextConfig;
