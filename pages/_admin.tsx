import Head from 'next/head'
import styles from '../styles/Home.module.css'

import StoryForm from '../components/form'

import { signIn, signOut, useSession } from 'next-auth/client'

export default function _Admin() {
  const [ session, loading ] = useSession()

  return <>
    {!session && <>
      Not signed in <br/>
      <button onClick={() => signIn()}>Sign in</button>
    </>}
    {session && <>
      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </>}
  </>
}
