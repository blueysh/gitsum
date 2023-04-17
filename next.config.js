/** @type {import('next').NextConfig} */

const withFonts = require('next-fonts')

module.exports = withFonts({
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"]
  }
})
