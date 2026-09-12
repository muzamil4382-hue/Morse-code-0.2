import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  allowedDevOrigins: [
    "preview-chat-f3042776-c879-4bbb-88ee-9c3e4aca018a.space-z.ai",
    "space-z.ai",
  ],

  async redirects() {
    return [
      /*
       * Existing redirects
       */
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

      /*
       * Old individual Morse code letter pages
       * A–Z → Morse Code Alphabet sections
       */
      {
        source: "/morse-code-letter/:letter([a-zA-Z])",
        destination: "/morse-code-alphabet#letter-:letter",
        permanent: true,
      },

      /*
       * Old individual Morse code number pages
       * 0–9 → Morse Code Numbers sections
       */
      {
        source: "/morse-code-number/:number([0-9])",
        destination: "/morse-code-numbers#number-:number",
        permanent: true,
      },
      {
        source: "/love-in-morse-code",
        destination: "/i-love-you-in-morse-code",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;