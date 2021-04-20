// eslint-disable-next-line
import '../styles/globals.css'
import theme from '../styles/theme'
import '@fontsource/inter/700.css'
import '@fontsource/inter/400.css'
import Head from 'next/head'
import StandardHead from '../components/standard-head'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as Fathom from 'fathom-client'

import { ChakraProvider } from '@chakra-ui/react'

import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

import Nav from '../components/nav'
import Footer from '../components/footer'

Sentry.init({
  dsn: 'https://ff771404287542638b24e14b8de8edff@o573965.ingest.sentry.io/5724646',
  environment: process.env.NODE_ENV,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
})

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    Fathom.load('XNKNPYHV', {
      includedDomains: ['staging.mycovidstory.ca', 'www.mycovidstory.ca'],
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [])

  // Default meta tag data
  const title = 'Every number has a story'
  const description = 'Every covid number has a story which deserves to be shared'
  const previewImage = 'https://www.mycovidstory.ca/img/landingpage-v2.jpg'

  return (
    <>
      <Head>
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <StandardHead title={title} description={description} previewImage={previewImage} />
      <ChakraProvider theme={theme}>
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </>
  )
}

export default MyApp
