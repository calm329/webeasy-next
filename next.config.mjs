/** @type {import('next').NextConfig} */
const nextConfig = {
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
    domains: ['xhq5zxhb2o7dgubv.public.blob.vercel-storage.com'],
  },
};

export default nextConfig;
