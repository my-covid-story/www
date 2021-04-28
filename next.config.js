let baseUrl

// If we're in production (or this value is set), use this
if (process.env.NEXT_PUBLIC_BASE_URL) {
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  // If we're in preview, use the branch URL
} else if (process.env.VERCEL_ENV === 'preview') {
  baseUrl = `https://${process.env.VERCEL_URL}`
  // Fall back to local
} else {
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
