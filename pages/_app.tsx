import '../styles/globals.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/400.css'

import Head from 'next/head'
import HeadTags from '../components/common/HeadTags'

import { ReactElement, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import * as Fathom from 'fathom-client'

import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

import SiteLayout from '../layouts/Default'
import { NextPage } from 'next'

Sentry.init({
  dsn: 'https://ff771404287542638b24e14b8de8edff@o573965.ingest.sentry.io/5724646',
  environment: process.env.NODE_ENV,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
})

type GetLayout = (page: ReactNode) => ReactElement
type PageWithLayout = NextPage & {
  getLayout: GetLayout
}

interface MyAppProps {
  Component: PageWithLayout
  pageProps: unknown
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const router = useRouter()

  useEffect(() => {
    Fathom.load('XNKNPYHV', {
      includedDomains: ['www.mycovidstory.ca'],
    })

    function onRouteChangeComplete(): void {
      Fathom.trackPageview()
    }

    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])

  const getLayout = Component.getLayout || ((page) => <SiteLayout>{page}</SiteLayout>)

  return getLayout(
    <>
      <Head>
        <link key="favicon" rel="icon" href="/favicon.ico" />
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@MyCOVIDStory_CA" />
        <meta property="og:type" content="website" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <script type="application/ld+json">
          {`{"@context": "https://schema.org", "@type": "Organization", "name": "MyCovidStory", "alternateName": "MyCovidStory.ca", "url": "https://MyCovidStory.ca", "logo": "", "sameAs": [ "https://www.facebook.com/MyCovidStoryCA", "https://twitter.com/MyCOVIDStory_CA", "https://www.instagram.com/MyCovidStory_CA/", "https://github.com/my-covid-story/www", "https://MyCovidStory.ca" ] }`}
        </script>
      </Head>
      <HeadTags />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
