const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: [
    '/pages-sitemap.xml',
    '/insights-sitemap.xml',
    '/projects-sitemap.xml',
    '/services-sitemap.xml',
    '/industries-sitemap.xml',
    '/case-studies-sitemap.xml',
    '/*',
    '/insights/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
    ],
    additionalSitemaps: [
      `${SITE_URL}/pages-sitemap.xml`,
      `${SITE_URL}/insights-sitemap.xml`,
      `${SITE_URL}/projects-sitemap.xml`,
      `${SITE_URL}/services-sitemap.xml`,
      `${SITE_URL}/industries-sitemap.xml`,
      `${SITE_URL}/case-studies-sitemap.xml`,
    ],
  },
}
