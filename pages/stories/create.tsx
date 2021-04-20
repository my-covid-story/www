import { Box, Text, Heading } from '@chakra-ui/react'
import StoryForm from '../../components/form'

export default function CreateStory() {
  return (
    <div>
      <Box w="100%" p={8}>
        <Heading>Share your COVID story</Heading>
        <Text>
          Every number has a story. We believe in the power of storytelling to force government
          action in Ontario. We value your privacy.
        </Text>
        <StoryForm />
      </Box>
    </div>
  )
}
