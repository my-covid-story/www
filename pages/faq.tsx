import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Footer from '../components/footer'

export default function FAQ() {
    return (
      <div className={styles.container}>
        <Head>
          <title>FAQ - My Covid Story</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className={styles.main}>
          FAQ
        </main>
  
        <Footer />
      </div>
    )
  }
  