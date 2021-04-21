import Head from 'next/head'
import { Box, Button, Container, Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react'
import { signIn, signOut, useSession, getSession } from 'next-auth/client'

import styles from '../styles/Home.module.css'
import StoryForm from '../../components/form'

import prisma from '../../lib/prisma'

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

function Story({ id, title, content, name, postal, ...rest}) {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{content}</Text>
      <Text mt={4}>{name} from {postal}</Text>
      <Stack direction="row" spacing={4} align="center">
        <Button
          colorScheme="blue"
          variant="outline"
          type="button"
          data-id={id}
          data-type="deleted"
          onClick={(e) => {if(window.confirm('Are you sure you want to delete this?')){updateStory(e)}}}
        >
          Delete
        </Button>
        <Button
          colorScheme="blue"
          type="button"
          data-id={id}
          data-type="approved"
          onClick={updateStory}
        >
          Approve
        </Button>
      </Stack>
    </Box>
  )
}

export default function _Admin({ stories }) {
  const [ session ] = useSession()
  return <>
      {!session && <>
        <button onClick={() => signIn()}>Sign in</button>
      </>}
      {session && <>
        <Container>
          <button onClick={() => signOut()}>Sign out</button>
          <Stack spacing={8}>
            {stories.map((story) => (
              <Story
                {...story}
             />
            ))}

          </Stack>
        </Container>
      </>}
  </>
}

const updateStory = async (e) =>  {
  let approved = false;
  let deleted = false;

  switch (e.target.dataset.type) {
    case 'approved':
      approved = true
      break
    case 'deleted':
      deleted=true;
      break
  }
  let story = {
    id: e.target.dataset.id,
    approved,
    deleted,
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

  let stories = {}
  if(session) {
    stories = await prisma.story.findMany({
        where: {
          approved: false,
          deleted: false
        },
        orderBy: { createdAt: 'asc' },
    })
  }


  return {
    props: { stories },
  }
}
