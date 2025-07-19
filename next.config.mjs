/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  // Memory optimizations
  onDemandEntries: {
    // Keep pages in memory for 60 seconds
    maxInactiveAge: 60 * 1000,
    // Only keep 3 pages in memory
    pagesBufferLength: 3,
  },
  experimental: {
    // Enable CSS optimizations
    optimizeCss: true
  }
}

export default nextConfig