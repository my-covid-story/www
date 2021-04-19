import Link from 'next/link'

import s from './footer.module.css'

export default function Footer() {
  return (
    <footer className={s.footer}>
      <Link href="/">
        <a>Home</a>
      </Link>

      <Link href="/faq">
        <a>FAQ</a>
      </Link>

      <Link href="/stories/create">
        <a>Create a Story</a>
      </Link>
    </footer>
  )
}
