import { Box, Flex, Heading, IconButton, Stack, Text } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { Story } from '@prisma/client'
import {
  categoryLabel,
  storyCategoryLabel,
  storyImage,
  storyName,
  storyDate,
  storyParagraphs,
} from './model'
import ContentBox from '../common/ContentBox'
import Label from '../common/Label'

import { ContentWarningBox } from '../common/Warnings'
import ShareSVG from '../icons/ShareSVG'

function StoryParagraphs(p: string, i: number) {
  return <Text key={i}>{p}</Text>
}

interface StoryDetailProps {
  story: Story
  onClose: () => void
  onShare: () => void
}

export default function StoryDetail({ story, onClose, onShare }: StoryDetailProps) {
  return (
    <Box>
      <Box bgImage={`url(${storyImage(story)})`} bgSize="cover" bgPosition="center" color="white">
        <Box bg="rgba(0, 0, 0, 0.5)">
          <ContentBox>
            <Flex justifyContent="space-between">
              <Label visibility={categoryLabel[story.category] ? 'visible' : 'hidden'}>
                {storyCategoryLabel(story)}
              </Label>

              <Flex>
                <IconButton
                  size="md"
                  variant="link"
                  colorScheme="white"
                  aria-label="Share"
                  icon={<ShareSVG />}
                  onClick={onShare}
                />

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
      <ContentBox>
        {story.contentWarning && <ContentWarningBox />}
        <Heading as="h2" mb={3} fontSize="md" fontWeight={700}>
          {storyDate(story)}
        </Heading>
        <Heading as="h2" mb={4} fontSize="md" fontWeight={700}>
          {storyName(story)}
        </Heading>
        <Stack spacing={2}>{storyParagraphs(story).map(StoryParagraphs)}</Stack>
      </ContentBox>
    </Box>
  )
}
