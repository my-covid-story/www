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
import { useState } from 'react'

interface UpdateStoryProps {
  id: string
  approved: boolean
  deleted: boolean
  contentWarning: boolean
}

const updateStory = async ({ id, approved, deleted, contentWarning }: UpdateStoryProps) => {
  const res = await fetch('/api/admin/update', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ id, approved, deleted, contentWarning }),
  })

  return await res.json()
}

interface StoryCardProps {
  id: string
  createdAt: Date
  title: string
  content: string
  name: string
  postal: string
  email: string
  phone: string
  twitter: string
  approved: boolean
  deleted: boolean
  contentWarning: boolean
}

export default function StoryCard({
  id,
  createdAt,
  title,
  content,
  name,
  postal,
  email,
  phone,
  twitter,
  ...rest
}: StoryCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [deleted, setDeleted] = useState(rest.deleted)
  const [approved, setApproved] = useState(rest.approved)
  const [contentWarning, setContentWarning] = useState(rest.contentWarning)
  const [interacted, setInteracted] = useState(false)

  const handleDeletedInteraction = async () => {
    if (window.confirm(`Are you sure you want to ${deleted ? 'undelete' : 'delete'} this?`)) {
      const res = await updateStory({ id, deleted: !deleted, approved, contentWarning })
      setDeleted(res.deleted)
      setInteracted(true)
    }
  }

  const handleApprovedInteraction = async () => {
    const res = await updateStory({ id, deleted, approved: !approved, contentWarning })
    setApproved(res.approved)
    setInteracted(true)
  }

  const handleContentWarningInteraction = async () => {
    const res = await updateStory({ id, deleted, approved, contentWarning: !contentWarning })
    setContentWarning(res.contentWarning)
  }

  return (
    <>
      <Box mt={2} shadow="md" borderWidth="1px" opacity={interacted ? 0.6 : 1}>
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
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} p={5} bg={'gray.100'}>
          <Text>
            {name || `Anonymous`} from {postal}
          </Text>
          <Text>Contact: {email || twitter || phone ? `Yes` : 'No'}</Text>
          <Text>
            Submission Date:{' '}
            {new Intl.DateTimeFormat('en-CA', { dateStyle: 'long', timeStyle: 'short' }).format(
              createdAt
            )}
          </Text>
          <Text>
            ID:{' '}
            <SimpleLink href={`/story/${id}`} textDecoration={'underline'}>
              {id}
            </SimpleLink>
          </Text>
        </SimpleGrid>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          p={5}
          spacing={4}
          align={{ sm: 'center' }}
          bg={'gray.200'}
        >
          <Button
            colorScheme="red"
            variant="outline"
            type="button"
            bg={'white'}
            onClick={handleDeletedInteraction}
          >
            {deleted ? 'Undelete' : 'Delete'}
          </Button>
          <Button colorScheme="blue" type="button" onClick={handleApprovedInteraction}>
            {approved ? 'Unapprove' : 'Approve'}
          </Button>
          <Button
            colorScheme="blue"
            variant="outline"
            type="button"
            bg={'white'}
            onClick={handleContentWarningInteraction}
          >
            {contentWarning ? 'Remove Content Warning' : 'Add Content Warning'}
          </Button>
        </Stack>
      </Box>
    </>
  )
}
