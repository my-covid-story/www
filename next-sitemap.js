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
}
