import { Center, Heading, Text, Container, Button } from '@chakra-ui/react'
import Link from 'next/link'

export default function Thanks() {
  return (
    <Container pt="32">
      <Heading as="h1" size="lg" pb="8">
        Thank you for your story.
      </Heading>
      <Text>
        Thank you for sharing your story to help inform government leaders that make policy
        decisions. We hope you and your loved ones are staying safe and healthy. It may take 24-48
        hours for the story to appear on the site. You may be contacted if you selected you are
        willing to be interviewed by a journalist. If you have any questions, reach out to{' '}
        <a href="mailto:info@mycovidstory.ca">info@mycovidstory.ca</a>.
      </Text>
      <Center pt="8">
        <Button color="white">
          <Link href="/">Return to Stories</Link>
        </Button>
      </Center>
    </Container>
  )
}
