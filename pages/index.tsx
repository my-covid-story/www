import Head from 'next/head'
import styles from '../styles/Home.module.css'

import StoryForm from '../components/form'
import Footer from '../components/footer'

export default function Home({ feed }) {
  console.log(feed)
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
            <pre>
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
  const res = await fetch('http://localhost:3000/api/feed')
  const feed = await res.json()
  return {
    props: { feed },
  }
}
