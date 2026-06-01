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
      // HTTP → HTTPS
      {
        source: "/:path*",
        has: [{ type: "header", key: "x-forwarded-proto", value: "http" }],
        destination: "https://siacc.co.in/:path*",
        permanent: true,
      },

      // Block junk tracking URLs
      { source: "/", has: [{ type: "query", key: "trk" }], destination: "/", permanent: true },
      { source: "/", has: [{ type: "query", key: "page_id" }], destination: "/", permanent: true },

      // Previous fixes
      { source: "/home-4", destination: "/", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/imei", destination: "/bis-crs", permanent: true },
      { source: "/isi", destination: "/bis-isi", permanent: true },
      { source: "/bee/", destination: "/bee", permanent: true },
      { source: "/bis/", destination: "/bis", permanent: true },
      { source: "/tec/", destination: "/tec", permanent: true },

      // Missing trailing slash fixes (from GSC report)
      { source: "/about-us/", destination: "/about", permanent: true },
      { source: "/our-team/", destination: "/our-team", permanent: true },
      { source: "/contact-us/", destination: "/contact", permanent: true },
      { source: "/services/", destination: "/services", permanent: true },
      { source: "/nabl/", destination: "/nabl", permanent: true },
      { source: "/epr/", destination: "/epr", permanent: true },
    ];
  },
};

export default nextConfig;