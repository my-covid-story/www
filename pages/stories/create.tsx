import { Box, Text, Heading } from '@chakra-ui/react'
import StoryForm from '../../components/form'
import Link from 'next/link'

export default function CreateStory() {
  return (
    <div>
      <Box w="100%" p={8} pb={24} maxWidth="4xl">
        <Box pb={4}>
          <Heading as="h1" size="lg" pb={4}>
            Share your COVID story
          </Heading>
          <Text>
            Every number has a story. We believe in the power of storytelling to force government
            action in Ontario. We value your privacy.
          </Text>
          <Text pt={4} fontWeight="bold" color="#55099D">
            <Link href="/faq">Read our FAQ</Link>
          </Text>
        </Box>
        <StoryForm />
      </Box>
    </div>
  )
}
