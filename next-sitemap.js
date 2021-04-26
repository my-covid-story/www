module.exports = {
  siteUrl: process.env.SITE_URL || 'https://mycovidstory.ca',
  generateRobotsTxt: true,
  exclude: ['/_admin*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/_admin'],
      },
    ],
  },
  // TODO: We'll want to remove this once we're localizing content
  transform: async (config, path) => {
    return {
      loc: path.replace('/en-CA', ''),
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}
