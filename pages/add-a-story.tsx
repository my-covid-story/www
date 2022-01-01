import Link from 'next/link'
import { Heading, Text } from '@chakra-ui/react'
import ContentBox from '../components/common/ContentBox'
import StoryForm from '../components/stories/StoryForm'
import HeadTags from '../components/common/HeadTags'

export default function CreateStory() {
  return (
    <>
      <HeadTags
        title="Post your story"
        description="Share your story of how COVID-19 has impacted you. If our leaders won't listen to the numbers, they must face our stories"
      />
      <ContentBox>
        <Heading as="h1" size="lg" pb={4}>
          Share your COVID story
        </Heading>
        <Text>
          Every number has a story. We believe in the power of storytelling to force government
          action in Ontario. We value your privacy.
        </Text>
        <Text pt={4} pb={2} fontWeight="bold" color="#55099D">
          <Link href="/faq">Read our FAQ</Link>
        </Text>
        <StoryForm />
      </ContentBox>
    </>
  )
}
