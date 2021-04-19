import Head from 'next/head'
import styles from '../styles/Home.module.css'

import StoryForm from '../components/form'

import { signIn, signOut, useSession, getSession } from 'next-auth/client'
import prisma from '../lib/prisma'

export default function _Admin({ stories }) {
  const [ session ] = useSession()

  return <>
    {!session && <>
      Not signed in <br/>
      <button onClick={() => signIn()}>Sign in</button>
    </>}
    {session && <>
      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>

      {stories.map((story) => (
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
  const session = await getSession({ req })

  let stories = {}
  if(session) {
    stories = await prisma.story.findMany({
        where: { approved: false },
        orderBy: { createdAt: 'asc' },
    })
  }

  return {
    props: { stories },
  }
}
