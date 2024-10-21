/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '', // Leave this empty if you're using the default port
        pathname: '/**', // Allows all images from this domain
      },
    ],
  },
  output: 'export', // Enable static export
};

export default nextConfig;
