import NextLink from 'next/link'
import { Box, Flex, Heading, Link, SimpleGrid } from '@chakra-ui/react'
import { categoryLabel, storyCategoryLabel, storyImage, storyCite } from './model'
import ContentBox from '../common/ContentBox'
import Label from '../common/Label'
import { Story } from '@prisma/client'

function FeedHeader() {
  return (
    <Box
      bgImage="url('/img/landingpage-v2.jpg')"
      bgSize="cover"
      bgPosition="center 55%"
      color="white"
    >
      <Box bg="rgba(0, 0, 0, 0.5)">
        <ContentBox pt={[8, null, 14]} pb={[10, null, 32]}>
          <Heading as="h1" fontSize={['2xl', null, '4xl', '5xl']} fontWeight={300}>
            If our leaders won’t listen to the numbers, they must face our stories.
          </Heading>
        </ContentBox>
      </Box>
    </Box>
  )
}

interface StorySummaryProps {
  story: Story
}

function StorySummary({ story }: StorySummaryProps) {
  const href = `/story/${story.id}`

  return (
    <Box as="article">
      <NextLink href={`${href}?back=true`} as={href}>
        <Link _hover={{ textDecoration: 'none' }}>
          <Box
            borderRadius="8px"
            bgImage={`url(${storyImage(story)})`}
            bgSize="cover"
            bgPosition="center"
            color="white"
          >
            <Box p={[4, null, null, 6]} borderRadius="8px" bg="rgba(0, 0, 0, 0.5)">
              <Flex>
                <Label visibility={categoryLabel[story.category] ? 'visible' : 'hidden'}>
                  {storyCategoryLabel(story)}
                </Label>
              </Flex>
              <Box minH="6em" my={[4, null, null, 6]}>
                <Heading
                  as="h3"
                  fontSize="2xl"
                  fontWeight={600}
                  fontStyle="italic"
                  noOfLines={3}
                  _before={{ content: `"“"` }}
                  _after={{ content: `"”"` }}
                >
                  {story.title}
                </Heading>
              </Box>
              <Box lineHeight={1.2}>{storyCite(story)}</Box>
            </Box>
          </Box>

          <Box mt={2} color="#333333" fontSize="md" fontWeight={700} lineHeight={1.2}>
            Read Story
          </Box>
        </Link>
      </NextLink>
    </Box>
  )
}

interface StoryFeedProps {
  stories: Story[]
}

export default function StoryFeed({ stories }: StoryFeedProps) {
  return (
    <Box>
      <FeedHeader />
      <ContentBox>
        <Heading as="h2" mb={[6, null, 8]} color="primary.100">
          Stories
        </Heading>
        <SimpleGrid
          as="main"
          columns={[1, null, 2]}
          spacingY={[6, null, 8]}
          spacingX={[6, null, 10, 16]}
        >
          {stories.map((story) => (
            <StorySummary key={story.id} story={story} />
          ))}
        </SimpleGrid>
      </ContentBox>
    </Box>
  )
}
