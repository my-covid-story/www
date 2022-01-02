const { withSentryConfig } = require('@sentry/nextjs')
const { withSuperjson } = require('next-superjson')

let baseUrl
if (process.env.NEXT_PUBLIC_BASE_URL) {
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL
} else if (process.env.VERCEL_ENV) {
  baseUrl = `https://${process.env.VERCEL_URL}`
} else {
  baseUrl = `http://localhost:${process.env.PORT || '3000'}`
}

console.log(`BASE_URL: ${baseUrl}`)

const moduleExports = withSuperjson()({
  i18n: {
    locales: ['en-CA'],
    defaultLocale: 'en-CA',
  },
  env: {
    BASE_URL: baseUrl,
  },
})

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)
