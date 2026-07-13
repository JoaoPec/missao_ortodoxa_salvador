import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Permite que o Google Fonts carregue via CSS @import
  // (já tratado no globals.css)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; " +
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com; " +
              "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com; " +
              "img-src 'self' data: https://www.google-analytics.com https://*.google-analytics.com; " +
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
              "font-src 'self' https://fonts.gstatic.com; " +
              "frame-src 'self' https://pay.hotmart.com https://ig.me;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
