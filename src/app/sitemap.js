export const revalidate = 86400;

const FALLBACK_BLOGS = [
  { slug: 'bis-crs-certification-india-2026-complete-guide', date: '2026-06-02' },
  { slug: 'bis-crs-smart-home-devices-india-2025', date: '2025-05-28' },
  { slug: 'tec-mtcte-certification-india-2026', date: '2026-05-27' },
  { slug: 'epr-registration-e-waste-india-2025', date: '2025-05-27' },
  { slug: 'bis-crs-certification-electronics-india-2025', date: '2025-05-25' },
  { slug: 'bis-crs-registration-for-mobile-phones-in-india-complete-guide-2025', date: '2025-05-23' },
];

export default async function sitemap() {
  const BACKEND = 'https://siacc-backend.onrender.com';
  const staticPages = [ /* ...same as before... */ ];

  let blogPages = FALLBACK_BLOGS.map(b => ({
    url: `https://siacc.co.in/blog/${b.slug}`,
    lastModified: new Date(b.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  try {
    const res = await fetch(`${BACKEND}/api/blogs/published`, {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(5000),
    });
    const data = await res.json();
    if (data.data?.length) {
      blogPages = data.data.filter(b => b.slug).map(b => ({
        url: `https://siacc.co.in/blog/${b.slug}`,
        lastModified: new Date(b.updatedAt || b.date || Date.now()),
        changeFrequency: 'monthly',
        priority: 0.7,
      }));
    }
  } catch (err) {
    console.error('sitemap fetch failed, using fallback:', err);
  }

  return [...staticPages, ...blogPages];
}