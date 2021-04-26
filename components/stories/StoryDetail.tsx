import { Box, IconButton, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { Story } from '@prisma/client'
import { storyCategoryLabel, storyImage, storyName, storyDate, storyParagraphs } from './model'
import ContentBox from '../common/ContentBox'
import Label from '../common/Label'

interface Props {
  story: Story
  onClose: () => void
}

export default function StoryDetail({ story, onClose }: Props) {
  return (
    <Box>
      <Box bgImage={storyImage(story)} bgSize="cover" bgPosition="center" color="white">
        <Box bg="rgba(0, 0, 0, 0.5)">
          <ContentBox py>
            <Flex justifyContent="space-between">
              <Label>{storyCategoryLabel(story)}</Label>
              <IconButton
                size="md"
                mr={-2}
                py={2}
                variant="link"
                colorScheme="white"
                aria-label="Close"
                icon={<CloseIcon />}
                onClick={onClose}
              />
            </Flex>
            <Heading
              as="h1"
              my={[5, null, 10]}
              fontSize={['2xl', null, '4xl', '5xl']}
              fontWeight={600}
              fontStyle="italic"
              _before={{ content: `"“"` }}
              _after={{ content: `"”"` }}
            >
              {story.title}
            </Heading>
            <Box fontSize="md" fontWeight={600} lineHeight={1.2}>
              From {story.postal}
            </Box>
          </ContentBox>
        </Box>
      </Box>
      <ContentBox py>
        <Heading as="h2" mb={3} fontSize="md" fontWeight={700}>
          {storyDate(story)}
        </Heading>
        <Heading as="h2" mb={4} fontSize="md" fontWeight={700}>
          {storyName(story)}
        </Heading>
        <Stack spacing={2}>
          {storyParagraphs(story).map((p, i) => (
            <Text key={i}>{p}</Text>
          ))}
        </Stack>
      </ContentBox>
    </Box>
  )
}
