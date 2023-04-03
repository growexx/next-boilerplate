/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin')

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

module.exports = nextTranslate(nextConfig)
