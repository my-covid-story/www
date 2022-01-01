import Link from 'next/link'
import { Heading, Text } from '@chakra-ui/react'
import ContentBox from '../components/common/ContentBox'
import HeadTags from '../components/common/HeadTags'

export default function CreateStory() {
  return (
    <>
      <HeadTags title="Report a Child Case" description="TBD" />
      <ContentBox>
        <Heading as="h1" size="lg" pb={4}>
          Report a Child Case
        </Heading>
        <Text>Description goes here</Text>
        <Text pt={4} pb={2} fontWeight="bold" color="#55099D">
          <Link href="/faq">Read our FAQ</Link>
        </Text>
      </ContentBox>
    </>
  )
}
