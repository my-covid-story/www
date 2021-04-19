import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '@fontsource/inter'

import '../styles/globals.css'
import customTheme from '../styles/theme.js'
import { env } from 'node:process'
import DefaultLayout from '../layouts/default'

Sentry.init({
  dsn: 'https://ff771404287542638b24e14b8de8edff@o573965.ingest.sentry.io/5724646',
  environment: process.env.NODE_ENV,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
})

function MyApp({ Component, pageProps }) {
  const theme = extendTheme(customTheme)
  const getLayout = Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return getLayout(
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
