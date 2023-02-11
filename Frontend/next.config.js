/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:["media.npr.org","encrypted-tbn0.gstatic.com","scpr.brightspotcdn.com"]
  }
}

module.exports = nextConfig
