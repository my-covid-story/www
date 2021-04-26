import { ReactElement } from 'react'
import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { useSession, getSession } from 'next-auth/client'
import Link from 'next/link'

import prisma from '../../lib/prisma'
import Nav from './nav'
import ContentBox from '../../components/common/ContentBox'
import { GetServerSidePropsContext } from 'next'

function Story({ id, title, content, name, postal, email, phone, twitter, ...rest }): ReactElement {
  return (
    <Box mt={2} p={5} shadow="md" borderWidth="1px" {...rest}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{content}</Text>
      <Text mt={4} mb={4}>
        {name || `Anonymous`} from {postal}
      </Text>
      <Text mt={4} mb={4}>
        Contact: {email || twitter || phone ? `Yes` : 'No'}
      </Text>
      <Text mt={4} mb={4}>
        ID: <Link href={`/story/${id}`}>{id}</Link>
      </Text>
      <Stack direction="row" spacing={4} align="center">
        <Button
          colorScheme="red"
          variant="outline"
          type="button"
          data-id={id}
          data-type="deleted"
          onClick={(e) => {
            if (window.confirm('Are you sure you want to delete this?')) {
              updateStory(e).then()
            }
          }}
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

export default function _Admin({
  stories,
}: {
  stories: Record<string, unknown>[] | []
}): ReactElement {
  const [session] = useSession()

  return (
    <>
      <Nav session={session} />
      {session && (
        <>
          <ContentBox pb={2}>
            <Stack spacing={8}>
              {stories.map((story) => (
                <Story key={story.id} {...story} />
              ))}
            </Stack>
          </ContentBox>
        </>
      )}
    </>
  )
}

const updateStory = async (e): Promise<void> => {
  let approved = false
  let deleted = false

  switch (e.target.dataset.type) {
    case 'approved':
      approved = true
      break
    case 'deleted':
      deleted = true
      break
  }
  const story = {
    id: e.target.dataset.id,
    approved,
    deleted,
  }

  await fetch('/api/admin/update', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(story),
  })
}

export async function getServerSideProps({
  req,
  query,
}: GetServerSidePropsContext): Promise<{
  props: { stories: Record<string, unknown>[] | Record<string, never> }
}> {
  const session = await getSession({ req })

  const deleted = query.deleted ? true : false

  let stories = {}
  if (session) {
    stories = await prisma.story.findMany({
      where: {
        approved: false,
        deleted,
      },
      orderBy: { createdAt: 'asc' },
    })
  }

  return {
    props: { stories },
  }
}
