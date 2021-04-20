import Head from 'next/head'
import { Box, Button, Container, Flex, Grid, GridItem, Heading, Spacer, Stat, StatLabel, StatNumber, StatHelpText, Text } from '@chakra-ui/react'
import { providers, signIn, signOut, useSession, getSession } from 'next-auth/client'

import styles from '../styles/Home.module.css'
import StoryForm from '../../components/form'

import prisma from '../../lib/prisma'

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

export default function _Admin({ stories, providerList }) {
  const [ session ] = useSession()
  return <>
      {!session && <>
        <button onClick={() => signIn()}>Sign in</button>
      </>}
      {session && <>
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          padding="1.5rem"
          bg="teal.500"
          color="white"
          width="100%"
        >
          <Flex align="center" mr={5}>
            <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
              MyCovidStory
            </Heading>
          </Flex>
          <Spacer />
          <MenuItems>{session.user.email}</MenuItems>
          <MenuItems><button onClick={() => signOut()}>Sign out</button></MenuItems>
        </Flex>
        <Container>
          <Grid>
            {stories.map((story) => (
              <GridItem>
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
            </GridItem>
            ))}
          </Grid>
        </Container>
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
