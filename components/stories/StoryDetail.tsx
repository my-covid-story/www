import { Box, IconButton, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { Story } from '@prisma/client'
import { storyCategory, storyImage, storyName, storyDate, storyParagraphs } from './model'

interface Props {
  story: Story
  onCancel: () => void
}

export default function StoryDetail({ story, onCancel }: Props) {
  return (
    <Box as="main">
      <Box bgImage={storyImage(story)} bgSize="cover" bgPosition="center" color="white">
        <Box pos="relative" p={4} bg="rgba(0, 0, 0, 0.5)">
          <IconButton
            pos="absolute"
            top={4}
            right={4}
            size="md"
            py={2}
            variant="link"
            colorScheme="white"
            aria-label="Close"
            icon={<CloseIcon />}
            onClick={onCancel}
          />
          <Flex>
            <Heading
              as="h2"
              visibility={story.category === 'other' ? 'hidden' : 'visible'}
              py={1}
              px={2}
              border="2px"
              borderColor="gray.200"
              borderRadius="4px"
              fontSize="md"
              fontWeight={600}
            >
              {storyCategory(story)}
            </Heading>
          </Flex>
          <Heading
            as="h1"
            mt={5}
            mb={4}
            fontSize="2xl"
            fontWeight={600}
            fontStyle="italic"
            _before={{ content: `"“"` }}
            _after={{ content: `"”"` }}
          >
            {story.title}
          </Heading>
          <Heading as="h3" fontSize="md" fontWeight={600}>
            From {story.postal}
          </Heading>
        </Box>
      </Box>
      <Box m={4}>
        <Heading as="h3" mb={2} fontSize="md" fontWeight={700}>
          {storyDate(story)}
        </Heading>
        <Heading as="h3" mb={4} fontSize="md" fontWeight={700}>
          {storyName(story)}
        </Heading>
        <Stack spacing={2}>
          {storyParagraphs(story).map((p, i) => (
            <Text key={i}>{p}</Text>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
