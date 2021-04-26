import { ReactElement } from 'react'
import NextLink from 'next/link'
import { Box, Heading, Link, SimpleGrid } from '@chakra-ui/react'
import { storyImage, storyCite } from './model'
import ContentBox from '../common/ContentBox'
import { Story } from '@prisma/client'

export default function StoryFeed({ stories }: { stories: Story[] }): ReactElement {
  return (
    <Box>
      <FeedHeader />
      <ContentBox py={5}>
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

function FeedHeader(): ReactElement {
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

function StorySummary({ story }: { story: Story }): ReactElement {
  const href = `/story/${story.id}`

  return (
    <Box as="article">
      <NextLink href={`${href}?back=true`} as={href}>
        <Link _hover={{ textDecoration: 'none' }}>
          <Box
            borderRadius="8px"
            bgImage={storyImage(story)}
            bgSize="cover"
            bgPosition="center"
            color="white"
          >
            <Box pt={4} pb={4} px={[6, null, 7]} borderRadius="8px" bg="rgba(0, 0, 0, 0.5)">
              <Box minH="6em" mt={[0, null, 4, 6]} mb={[4, null, 8, 12]}>
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
