import Head from 'next/head'
import {Button} from '@chakra-ui/react'
import { providers, signIn, signOut, useSession, getSession } from 'next-auth/client'

import styles from '../styles/Home.module.css'
import StoryForm from '../../components/form'

import prisma from '../../lib/prisma'

export default function _Admin({ stories, providerList }) {
  const [ session ] = useSession()
  return <>
    {!session && <>
      Not signed in <br/>
    
      {Object.values(providerList).map(provider => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
        </div>
      ))}
    </>}
    {session && <>

      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>

      {stories.map((story) => (
        <pre>
            <ul>
            <li>content: {story.content}</li>
            <li>postal: {story.postal}</li>
            <li>approved: {story.approved}</li>
            <li>twitter: {story.twitter}</li>
            </ul>
            <Button
              mt={4}
              colorScheme="blue"
              variant="outline"
              type="button"
              data-id={story.id}
              onClick={deleteStory}
            >
              Delete
            </Button>
            <Button
              mt={4}
              colorScheme="blue"
              type="button"
              data-id={story.id}
              onClick={approveStory}
            >
              Approve
            </Button>
        </pre>
        ))}
    </>}
  </>
}

const deleteStory = async (e) =>  {
  let story = {
    id: e.target.dataset.id,
  };

  let response = await fetch('/api/admin/update', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(story)
  });
}

const approveStory = async (e) =>  {
  let story = {
    id: e.target.dataset.id,
    approved: true
  };

  let response = await fetch('/api/admin/update', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(story)
  });
}


export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  const providerList = await providers()

  let stories = {}
  if(session) {
    stories = await prisma.story.findMany({
        where: { approved: false },
        orderBy: { createdAt: 'asc' },
    })
  }


  return {
    props: { stories, providerList },
  }
}
