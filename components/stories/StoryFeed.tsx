import NextLink from 'next/link'
import { Box, Heading, Link, Stack, Text } from '@chakra-ui/react'
import { storyImage, storyCite } from './model'

export default function StoryFeed({ stories }) {
  return (
    <Box>
      <FeedHeader />
      <Stack as="main" py={6} px={4} spacing={6}>
        {stories.map((story) => (
          <StorySummary key={story.id} story={story} />
        ))}
      </Stack>
    </Box>
  )
}

function FeedHeader() {
  return (
    <Box
      bgImage="url('/img/landingpage-v2.jpg')"
      bgSize="cover"
      bgPosition="center 55%"
      color="white"
    >
      <Box pt={8} pb={10} px={4} bg="rgba(0, 0, 0, 0.5)">
        <Heading as="h1" fontSize="2xl" fontWeight={300}>
          If our leaders won’t listen to the numbers, they must face our stories.
        </Heading>
      </Box>
    </Box>
  )
}

function StorySummary({ story }) {
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
            <Box py={4} px={6} borderRadius="8px" bg="rgba(0, 0, 0, 0.5)">
              <Heading
                as="h2"
                mb={4}
                minH="6rem"
                fontSize="2xl"
                fontWeight={600}
                fontStyle="italic"
                noOfLines={3}
                _before={{ content: `"“"` }}
                _after={{ content: `"”"` }}
              >
                {story.title}
              </Heading>
              <Text>{storyCite(story)}</Text>
            </Box>
          </Box>

          <Heading as="h3" mt={2} color="#333333" fontSize="md" fontWeight={700}>
            Read Story
          </Heading>
        </Link>
      </NextLink>
    </Box>
  )
}
