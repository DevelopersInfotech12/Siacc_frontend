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
        disallow: ['/admin/', '/qr/', '/qr-contact/', '/review/', '/icon.png', '/ai-recommendation'],
      },
    ],
  },
};

export default config;