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
      const res = await fetch('https://siacc-backend.onrender.com/api/blogs/published');
      const data = await res.json();
      for (const blog of data.data || []) {
        if (blog.slug) {
          results.push({
            loc: `/blog/${blog.slug}`,
            changefreq: 'monthly',
            priority: 0.7,
            lastmod: new Date(blog.updatedAt || blog.date || Date.now()).toISOString(),
          });
        }
      }
    } catch (err) {
      console.error('Sitemap blog fetch failed:', err);
    }
    return results;
  },
};

export default config;