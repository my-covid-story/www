const baseUrl = process.env.BASE_URL
  ? process.env.BASE_URL
  : `http://localhost:${process.env.PORT} || '3000'}`

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
