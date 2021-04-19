import Head from 'next/head'
import landing from '../styles/LandingPage.module.css'
import { Box, Button, Heading, Link, Text } from '@chakra-ui/react'

export default function Home() {
  const title = 'My Covid Story | Every number has a story'
  const description = 'Every covid number has a story which deserves to be shared'
  const previewImage = 'https://www.mycovidstory.ca/img/landingpage-v2.jpg'
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={previewImage} />

        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={previewImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className={landing.container}>
        <div className={landing.background} />
        <main className={landing.main}>
          <Box>
            <Heading className={landing.heading} as="h1" size="3xl">
              My Covid Story
            </Heading>
            <Text>Every number has a story</Text>
          </Box>
          <Box>
            <Heading size="xl">Coming Soon</Heading>
            <Text className={landing.blurb}>
              We are a group of concerned citizens who could no longer stand by as Ontario is led
              into a humanitarian crisis. We believe the power of storytelling is an effective means
              to drive government action.
            </Text>
          </Box>
          <Box>
            <Link
              href="https://kvmhxg5ojy6.typeform.com/to/gUsoYkft"
              rel="noopener"
              style={{ display: 'inline-block' }}
            >
              <Button variant="solid">Media Sign-Up</Button>
            </Link>
          </Box>
        </main>
      </div>
    </>
  )
}
