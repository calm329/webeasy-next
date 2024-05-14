/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.cdninstagram.com",
      },
    ],
    domains: [
      "xhq5zxhb2o7dgubv.public.blob.vercel-storage.com",
      "tailwindui.com",
      "images.unsplash.com",
    ],
  },
};

export default nextConfig;
