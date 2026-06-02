export const revalidate = 86400; // regenerate daily

export default async function sitemap() {
  const BACKEND = 'https://siacc-backend.onrender.com';

  const staticPages = [
    { url: 'https://siacc.co.in', priority: 1.0, changeFrequency: 'daily' },
    { url: 'https://siacc.co.in/blog', priority: 0.9, changeFrequency: 'daily' },
    { url: 'https://siacc.co.in/about', priority: 0.7 },
    { url: 'https://siacc.co.in/contact', priority: 0.7 },
    { url: 'https://siacc.co.in/bis', priority: 0.8 },
    { url: 'https://siacc.co.in/bis-crs', priority: 0.8 },
    { url: 'https://siacc.co.in/epr', priority: 0.8 },
    { url: 'https://siacc.co.in/wpc', priority: 0.8 },
    { url: 'https://siacc.co.in/tec', priority: 0.8 },
    { url: 'https://siacc.co.in/bee', priority: 0.8 },
    { url: 'https://siacc.co.in/lmpc', priority: 0.8 },
    { url: 'https://siacc.co.in/iso', priority: 0.8 },
    { url: 'https://siacc.co.in/cdsco', priority: 0.8 },
  ];

  let blogPages = [];
  try {
  const res = await fetch(`${BACKEND}/api/blogs/published`, {
    next: { revalidate: 86400 },
    signal: AbortSignal.timeout(5000),
  });
  const data = await res.json();
  blogPages = (data.data || [])
    .filter(b => b.slug)
    .map(b => ({
      url: `https://siacc.co.in/blog/${b.slug}`,
      lastModified: new Date(b.updatedAt || b.date || Date.now()),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  } catch (err) {
    console.error('sitemap.js blog fetch failed:', err);
  }

  return [...staticPages, ...blogPages];
}