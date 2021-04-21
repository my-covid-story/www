import { Box, Heading, Stack, Text } from '@chakra-ui/react'

export default function StoryFeed({ stories }) {
  return (
    <Stack spacing={6} p={4}>
      {stories.map((story) => (
        <StorySummary key={story.id} story={story} />
      ))}
    </Stack>
  )
}

function StorySummary({ story }) {
  return (
    <Box as="article">
      <Box py={4} px={6} bg="#55099D" color="white" borderRadius="8px">
        <Heading
          as="h2"
          fontSize="2xl"
          fontWeight={600}
          fontStyle="italic"
          noOfLines={3}
          _before={{ content: `"“"` }}
          _after={{ content: `"”"` }}
        >
          {story.title}
        </Heading>
        <Text mt={4}>{cite(story)}</Text>
      </Box>

      <Heading as="h3" mt={2} color="#333333" fontSize="md" fontWeight={700}>
        Read Story
      </Heading>
      {/*
      <div>id: {story.id}</div>
      <div>created: {story.createdAt}</div>
      <div>category: {story.category}</div>
      <div>title: {story.title}</div>
      <div>content: {story.content}</div>
      <div>postal: {story.postal}</div>
      <div>email: {story.email}</div>
      <div>twitter: {story.twitter}</div>
      */}
    </Box>
  )
}

function cite(story) {
  return story.anonymous || !story.name ? story.postal : `${story.name}, ${story.postal}`
}
