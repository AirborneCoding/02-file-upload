/** @type {import('next').NextConfig} */
const nextConfig = {
 reactStrictMode: true,
 distDir: 'dist',
 output: 'export',
 server: {
  proxy: {
   '/api': 'http://localhost:5000',
  },
 },
};

module.exports = nextConfig;
