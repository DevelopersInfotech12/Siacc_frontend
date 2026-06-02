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
  const BACKEND = 'https://siacc-backend.onrender.com';

  const fetchWithRetry = async (retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch(`${BACKEND}/api/blogs/published`, {
          signal: AbortSignal.timeout(30000), // 30s timeout
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
      } catch (err) {
        console.warn(`Sitemap fetch attempt ${i + 1} failed:`, err.message);
        if (i < retries - 1) await new Promise(r => setTimeout(r, 5000)); // wait 5s before retry
      }
    }
    return null;
  };

  // Pre-ping to wake Render
  console.log('Waking up Render backend...');
  await fetch(`${BACKEND}/api/blogs/published`).catch(() => {});
  await new Promise(r => setTimeout(r, 10000)); // wait 10s for spin-up

  const data = await fetchWithRetry();
  if (data?.data) {
    for (const blog of data.data) {
      if (blog.slug) {
        results.push({
          loc: `/blog/${blog.slug}`,
          changefreq: 'monthly',
          priority: 0.7,
          lastmod: new Date(blog.updatedAt || blog.date || Date.now()).toISOString(),
        });
      }
    }
    console.log(`Sitemap: added ${results.length} blog URLs`);
  } else {
    console.error('Sitemap: no blog data fetched — Render may be sleeping');
  }

  return results;
  },
};

export default config;