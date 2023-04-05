/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['thispersondoesnotexist.com']
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

module.exports = withBundleAnalyzer(nextTranslate(nextConfig))
