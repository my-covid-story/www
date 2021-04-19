import Head from 'next/head'
import styles from '../styles/Home.module.css'
import landing from '../styles/LandingPage.module.css'
import prisma from '../lib/prisma'

import StoryForm from '../components/form'
import Footer from '../components/footer'
import { Box, Heading } from '@chakra-ui/react'

export default function Home({ feed }) {
  if (process.env.NODE_ENV !== 'production') {
    return (
      <div className={styles.container}>
        <Head>
          <title>My Covid Story | Every number has a story</title>
          <meta
            name="description"
            content="Every covid number has a story which deserves to be shared"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <Box className={landing.heading}>
            <Heading as="h1" size="2xl">My Covid Story</Heading>
            <p>Every number has a story</p>
          </Box>
        </main>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>My Covid Story</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Share your Covid Story</h1>
        <div className={styles.storyContainer}>
          <h3>Latest stories</h3>
          {feed.map((story) => (
            <pre key={story.id}>
              <ul>
                <li>id: {story.id}</li>
                <li>content: {story.content}</li>
                <li>postal: {story.postal}</li>
                <li>approved: {story.approved}</li>
                <li>email: {story.email}</li>
                <li>twitter: {story.twitter}</li>
              </ul>
            </pre>
          ))}
        </div>
        <div className={styles.storyContainer}>
          <StoryForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function getServerSideProps() {
  const feed = await prisma.story.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'asc' },
  })

  return {
    props: { feed },
  }
}
