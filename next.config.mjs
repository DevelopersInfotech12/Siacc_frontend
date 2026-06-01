/** @type {import('next').NextConfig} */
const nextConfig = {
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
      {
        source: "/home-4",
        destination: "/",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/imei",
        destination: "/bis-crs",  // IMEI is closest to BIS-CRS registration
        permanent: true,
      },
      {
        source: "/isi",
        destination: "/bis-isi",  // Direct match ✅
        permanent: true,
      },
    ];
  },
};

export default nextConfig;