/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536, 1920],
  },
  async redirects() {
    return [{ source: '/location', destination: '/contact#location', permanent: true }]
  },
}

export default nextConfig
