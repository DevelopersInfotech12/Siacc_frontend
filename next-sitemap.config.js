/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://siacc.co.in',
  generateRobotsTxt: true,
  exclude: [
    '/admin',
    '/admin/*',
    '/qr',
    '/qr/*',
    '/qr-contact',
    '/qr-contact/*',
    '/review',
    '/icon.png',
    '/ai-recommendation',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/qr/',
          '/qr-contact/',
          '/review/',
          '/icon.png',
          '/ai-recommendation',
        ],
      },
    ],
  },
  additionalPaths: async (config) => {
    const results = [];
    try {
      const res = await fetch('https://siacc.co.in/api/blogs/public/all-slugs');
      const data = await res.json();
      for (const slug of data.slugs || []) {
        results.push({
          loc: `/blog/${slug}`,
          changefreq: 'monthly',
          priority: 0.7,
          lastmod: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error('Sitemap blog fetch failed:', err);
    }
    return results;
  },
};

export default config;