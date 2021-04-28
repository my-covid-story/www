let baseUrl
if (process.env.VERCEL_PUBLIC_BASE_URL) {
  baseUrl = process.env.VERCEL_PUBLIC_BASE_URL
} else if (process.env.VERCEL_ENV) {
  baseUrl = `https://${process.env.VERCEL_URL}`
} else  {
  baseUrl = `http://localhost:${process.env.PORT || '3000'}`
}

console.log(`BASE_URL: ${baseUrl}`)

module.exports = {
  future: {
    webpack5: true,
  },
  i18n: {
    locales: ['en-CA'],
    defaultLocale: 'en-CA',
  },
  env: {
    BASE_URL: baseUrl,
  },
}
