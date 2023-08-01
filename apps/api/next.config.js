/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/api',
    reactStrictMode: true,
    transpilePackages: ['@digi/zerodha', '@digi/upstox', '@digi/angelone'],
}

module.exports = nextConfig
