import { useRouter } from 'next/router'
import { Box,
  Button,
  Container,
  Heading,
  Stack,
  Text } from '@chakra-ui/react'
import { useSession, getSession } from 'next-auth/client'

import prisma from '../../lib/prisma'
import Nav from './nav'

function Story({ id, title, content, name, postal, ...rest}) {
  return (
    <Box mt={2} p={5} shadow="md" borderWidth="1px" {...rest}>
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
      <Nav session={session} />
      {session && <>
        <Container>
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

export async function getServerSideProps({ req, query} ) {
  const session = await getSession({ req })

  const deleted = query.deleted ? true : false

  let stories = {}
  if(session) {
    stories = await prisma.story.findMany({
        where: {
          approved: false,
          deleted
        },
        orderBy: { createdAt: 'asc' },
    })
  }


  return {
    props: { stories },
  }
}
