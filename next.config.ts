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
        source: "/morse-code-letters",
        destination: "/morse-code-alphabet",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;