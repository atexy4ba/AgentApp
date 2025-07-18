/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable access from network devices
  hostname: '0.0.0.0',
  port: 3000,
  // Performance optimizations
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
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
