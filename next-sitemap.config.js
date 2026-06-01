/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://siacc.co.in', // remove www
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/qr/', '/qr-contact/', '/review/', '/icon.png'],
      },
    ],
  },
  exclude: ['/admin/*', '/qr', '/qr-contact/*', '/review'],
};