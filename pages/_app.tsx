// eslint-disable-next-line
import '../styles/globals.css'
import customTheme from '../styles/theme.js'
import '@fontsource/inter'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme(customTheme)

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { env } from 'node:process';

Sentry.init({
  dsn: "https://ff771404287542638b24e14b8de8edff@o573965.ingest.sentry.io/5724646",
  environment: process.env.NODE_ENV,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
