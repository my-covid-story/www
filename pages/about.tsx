import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function About() {
  return (
    <div className={styles.container}>
      <Head>
        <title>About - My Covid Story</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>About</div>
    </div>
  )
}
