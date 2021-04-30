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

interface UpdateStoryProps {
  id: string
  approved: boolean
  deleted: boolean
  contentWarning: boolean
}

const updateStory = ({ id, approved, deleted, contentWarning }: UpdateStoryProps) => {
  fetch('/api/admin/update', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ id, approved, deleted, contentWarning }),
  })
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
  approved,
  deleted,
  contentWarning,
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
            onClick={() => {
              if (
                window.confirm(`Are you sure you want to ${deleted ? 'undelete' : 'delete'} this?`)
              ) {
                updateStory({ id, deleted: !deleted, approved, contentWarning })
              }
            }}
          >
            {deleted ? 'Undelete' : 'Delete'}
          </Button>
          <Button
            colorScheme="blue"
            type="button"
            onClick={() => updateStory({ id, deleted, approved: !approved, contentWarning })}
          >
            {approved ? 'Unapprove' : 'Approve'}
          </Button>
          <Button
            colorScheme="blue"
            variant="outline"
            type="button"
            bg={'white'}
            onClick={() => updateStory({ id, deleted, approved, contentWarning: !contentWarning })}
          >
            {contentWarning ? 'Remove Content Warning' : 'Add Content Warning'}
          </Button>
        </Stack>
      </Box>
    </>
  )
}
