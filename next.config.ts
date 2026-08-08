import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  reactStrictMode: false,

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

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,POST,PUT,DELETE",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "*",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
