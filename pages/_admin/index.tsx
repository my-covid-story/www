import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react'
import { useSession, getSession } from 'next-auth/client'
import Link from 'next/link'

import prisma from '../../lib/prisma'
import Nav from './nav'

function Story({
  id,
  title,
  content,
  name,
  postal,
  email,
  phone,
  twitter,
  approved,
  deleted,
  ...rest
}) {
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
          data-type={deleted ? 'undelete' : 'delete'}
          onClick={(e) => {
            if (window.confirm('Are you sure you want to delete this?')) {
              updateStory(e)
            }
          }}
        >
          {deleted ? 'Undelete' : 'Delete'}
        </Button>
        <Button
          colorScheme="blue"
          type="button"
          data-id={id}
          data-type={approved ? 'unapprove' : 'approve'}
          onClick={updateStory}
        >
          {approved ? 'Unapprove' : 'Approve'}
        </Button>
      </Stack>
    </Box>
  )
}

export default function _Admin({ stories }) {
  const [session] = useSession()

  return (
    <>
      <Nav session={session} />
      {session && (
        <>
          <Container>
            <Stack spacing={8}>
              {stories.map((story) => (
                <Story key={story.id} {...story} />
              ))}
            </Stack>
          </Container>
        </>
      )}
    </>
  )
}

// `unapprove` and `undelete` aren't technically needed but it helps when reading the code
const updateStory = async (e) => {
  let approved = false
  let deleted = false

  switch (e.target.dataset.type) {
    case 'approve':
      approved = true
      break
    case 'delete':
      deleted = true
      break
    case 'unapprove':
      approved = false
      break
    case 'undelete':
      deleted = false
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

export async function getServerSideProps({ req, query }) {
  const session = await getSession({ req })

  const deleted = query.deleted === 'true'
  const approved = query.approved === 'true'

  let stories = {}
  if (session) {
    stories = await prisma.story.findMany({
      where: {
        approved,
        deleted,
      },
      orderBy: { createdAt: 'asc' },
    })
  }

  return {
    props: { stories },
  }
}
