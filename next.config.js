/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
const withPWA = require('next-pwa')({
  dest: 'public'
})
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['thispersondoesnotexist.com']
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: [
        {
          loader: 'html-loader'
        },
        {
          loader: 'markdown-loader'
        }
      ]
    })

    return config
  }
}

module.exports = withBundleAnalyzer(nextTranslate(withPWA(nextConfig)))
