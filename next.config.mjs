/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "5000" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },
  async redirects() {
    return [
      // Previous 404 fixes
      { source: "/home-4", destination: "/", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/imei", destination: "/bis-crs", permanent: true },
      { source: "/isi", destination: "/bis-isi", permanent: true },

      // Trailing slash fixes
      { source: "/bee/", destination: "/bee", permanent: true },
      { source: "/bis/", destination: "/bis", permanent: true },
      { source: "/tec/", destination: "/tec", permanent: true },
    ];
  },
};

export default nextConfig;