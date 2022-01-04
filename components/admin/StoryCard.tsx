import { useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  TextProps,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import { AdminStory, storyProvince } from '../../lib/model/story'
import SimpleLink from '../common/SimpleLink'
import { categoryLabel } from '../stories/utils'

interface UpdateStoryProps {
  id: string
  approved: boolean
  deleted: boolean
  contentWarning: boolean
}

const updateStory = async ({
  id,
  approved,
  deleted,
  contentWarning,
}: UpdateStoryProps) => {
  const res = await fetch('/api/admin/update', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ id, approved, deleted, contentWarning }),
  })

  return await res.json()
}

const Label = ({ children, ...props }: TextProps) => {
  return (
    <Text as="strong" display="block" fontSize="xs" {...props}>
      {children}:
    </Text>
  )
}

interface StoryCardProps {
  story: AdminStory
  filteredView: boolean
}

export default function StoryCard({ story, filteredView }: StoryCardProps) {
  const {
    id,
    createdAt,
    title,
    content,
    postal,
    postalCode,
    displayName,
    email,
    phone,
    twitter,
    category,
    mppMessageId,
    ...rest
  } = story
  const { name: location, hotspot, ridings } = postalCode ?? {}
  const riding = ridings?.[0]?.riding

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [{ deleted, approved, contentWarning }, setCardStatus] = useState({
    ...rest,
  })
  const [interacted, setInteracted] = useState(false)

  const handleDeleteInteraction = async (props) => {
    if (
      window.confirm(
        `Are you sure you want to ${
          props.deleted ? 'undelete' : 'delete'
        } this?`
      )
    ) {
      const { approved, deleted, ...rest } = await updateStory(props)
      setCardStatus({ approved, deleted, ...rest })
      setInteracted(approved || deleted)
    }
  }

  const handleInteraction = async (props) => {
    const { approved, deleted, ...rest } = await updateStory(props)
    setCardStatus({ approved, deleted, ...rest })
    setInteracted(approved || deleted)
  }

  return (
    <>
      <Box mt={2} shadow="md" borderWidth="1px" opacity={interacted ? 0.6 : 1}>
        <Box p={5}>
          <Heading fontSize="xl">{title}</Heading>
          <Text mt={4} noOfLines={!filteredView || isOpen ? null : 4}>
            {content}
          </Text>
          <Flex
            justifyContent={'flex-end'}
            pt={2}
            display={filteredView ? 'flex' : 'none'}
          >
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
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={4}
          p={5}
          bg={'gray.100'}
        >
          <Box>
            <Label>Display Name and Postal Code</Label>
            <Text>
              {displayName || `Anonymous`} from {postal}
              {hotspot && (
                <>
                  {' '}
                  <Tooltip hasArrow label="COVID-19 hotspot">
                    <span role="img" aria-label="COVID-19 hotspot">
                      🔥
                    </span>
                  </Tooltip>
                </>
              )}
            </Text>
          </Box>
          <Box>
            <Label>Location</Label>
            <Text>
              {location ? `${location}, ` : ''}
              {storyProvince(story) || 'Unknown'}
            </Text>
          </Box>
          <Box>
            <Label>Consent to be Contacted</Label>
            <Text>{email || twitter || phone ? `Yes` : 'No'}</Text>
          </Box>
          <Box>
            <Label>MPP and Riding</Label>
            <Text>
              {riding ? `${riding.mppName}, ${riding.name}` : 'Unknown'}
            </Text>
          </Box>
          <Box>
            <Label>Submission Date</Label>
            <Text>
              {new Intl.DateTimeFormat('en-CA', {
                dateStyle: 'long',
                timeStyle: 'short',
              }).format(createdAt)}
            </Text>
          </Box>
          <Box>
            <Label>Category</Label>
            <Text>{categoryLabel[category] || 'Other'}</Text>
          </Box>
          <Box>
            <Label>ID and Link</Label>
            <Text>
              <SimpleLink
                href={`/story/${id}`}
                textDecoration={'underline'}
                target="_blank"
              >
                {id}
              </SimpleLink>
            </Text>
          </Box>
          <Box>
            <Label>Emailed to Representatives</Label>
            <Text>{mppMessageId ? 'Yes' : 'No'}</Text>
          </Box>
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
            onClick={() =>
              handleDeleteInteraction({
                id,
                approved: false,
                deleted: !deleted,
                contentWarning,
              })
            }
          >
            {deleted ? 'Undelete' : 'Delete'}
          </Button>
          <Button
            colorScheme="blue"
            type="button"
            onClick={() =>
              handleInteraction({
                id,
                approved: !approved,
                deleted: false,
                contentWarning,
              })
            }
          >
            {approved ? 'Unapprove' : 'Approve'}
          </Button>
          <Button
            colorScheme="blue"
            variant="outline"
            type="button"
            bg={'white'}
            onClick={() =>
              handleInteraction({
                id,
                approved,
                deleted,
                contentWarning: !contentWarning,
              })
            }
          >
            {contentWarning ? 'Remove Content Warning' : 'Add Content Warning'}
          </Button>
        </Stack>
      </Box>
    </>
  )
}
