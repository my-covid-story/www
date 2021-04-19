import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Footer from '../components/footer'

export default function About() {
  return (
    <div className={styles.container}>
      <Head>
        <title>About - My Covid Story</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>About</main>

      <Footer />
    </div>
  )
}
