import Head from 'next/head'
import styles from '../styles/Home.module.css'

import StoryForm from '../components/form'

import { signIn, signOut, useSession } from 'next-auth/client'

export default function _Admin({ feed }) {
  const [ session ] = useSession()
  console.log(session);
  console.log(feed);
  return <>
    {!session && <>
      Not signed in <br/>
      <button onClick={() => signIn()}>Sign in</button>
    </>}
    {session && <>
      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>

      {feed && feed.map((story) => (
        <pre>
            <ul>
            <li>id: {story.id}</li>
            <li>content: {story.content}</li>
            <li>postal: {story.postal}</li>
            <li>approved: {story.approved}</li>
            <li>twitter: {story.twitter}</li>
            </ul>
        </pre>
        ))}

    </>}
  </>
}


export async function getServerSideProps({ req }) {
  const res = await fetch('http://localhost:3000/api/admin', req)
  const feed = await res.json()
  return {
    props: { feed },
  }
}
