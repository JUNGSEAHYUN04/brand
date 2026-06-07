import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // standalone 빌드 (Docker 배포용)
  output: 'standalone',

  // 불필요한 헤더 제거
  poweredByHeader: false,

  // 이미지 최적화
  images: {
    formats: ['image/webp', 'image/avif'],
  },

  // 번들 최적화
  experimental: {
    optimizePackageImports: ['culori'],
  },

  // 압축
  compress: true,
}

export default nextConfig;