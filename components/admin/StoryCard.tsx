import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import SimpleLink from '../common/SimpleLink'

const updateStory = (e) => {
  let approved = false
  let deleted = false

  // `unapprove` and `undelete` aren't technically needed but it helps when reading the code
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

  fetch('/api/admin/update', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(story),
  })
}

interface StoryCardProps {
  id: string
  title: string
  content: string
  name: string
  postal: string
  email: string
  phone: string
  twitter: string
  approved: boolean
  deleted: boolean
}

export default function StoryCard({
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
}: StoryCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box mt={2} shadow="md" borderWidth="1px">
        <Box p={5}>
          <Heading fontSize="xl">{title}</Heading>
          <Text mt={4} noOfLines={isOpen ? null : 4}>
            {content}
          </Text>
          <Flex justifyContent={'flex-end'} pt={2}>
            <Button
              textAlign={'right'}
              size={'sm'}
              variant="outline"
              onClick={isOpen ? onClose : onOpen}
            >
              {isOpen ? 'Collapse' : 'Read Full'}
            </Button>
          </Flex>
        </Box>
        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} p={5} bg={'gray.100'}>
          <Text>
            {name || `Anonymous`} from {postal}
          </Text>
          <Text>Contact: {email || twitter || phone ? `Yes` : 'No'}</Text>
          <Text>
            ID:{' '}
            <SimpleLink href={`/story/${id}`} textDecoration={'underline'}>
              {id}
            </SimpleLink>
          </Text>
        </SimpleGrid>
        <Stack direction="row" p={5} spacing={4} align="center" bg={'gray.200'}>
          <Button
            colorScheme="red"
            variant="outline"
            type="button"
            data-id={id}
            data-type={deleted ? 'undelete' : 'delete'}
            bg={'white'}
            onClick={(e) => {
              if (
                window.confirm(`Are you sure you want to ${deleted ? 'undelete' : 'delete'} this?`)
              ) {
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
    </>
  )
}
