/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    agentUpgrade: "security",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.vandevoorttuinen.nl" }],
        destination: "https://vandevoorttuinen.nl/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "vanderpoltuinen.nl" }],
        destination: "https://vandevoorttuinen.nl/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.vanderpoltuinen.nl" }],
        destination: "https://vandevoorttuinen.nl/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
