/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: ['react-force-graph-3d', 'three-spritetext', '3d-force-graph', 'force-graph'],
};

module.exports = nextConfig;
