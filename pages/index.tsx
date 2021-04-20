import Head from 'next/head'
import landing from '../styles/LandingPage.module.css'
import { Box, Button, Heading, Link, Text } from '@chakra-ui/react'

export default function Home() {
  return (
    <>
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
