import type { NextConfig } from "next";

// Static export: the site is plain HTML/CSS/JS and can be hosted anywhere
// (GitHub Pages, Netlify, Vercel...). On GitHub Pages the site lives under
// /<repo>, so the workflow sets NEXT_PUBLIC_BASE_PATH=/portifolio.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
