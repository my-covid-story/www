import Link from 'next/link'
import { Box } from '@chakra-ui/react'
import { list } from '../lib/api/stories'
import StoryFeed from '../components/stories/StoryFeed'
import Footer, { FooterSpace, Button } from '../components/common/Footer'

export default function MainPage({ stories }) {
  return (
    <Box as="main" mt={-6}>
      <StoryFeed stories={stories} />
      <FooterSpace />
      <Footer>
        <Link href="/new">
          <Button>Add Your Story</Button>
        </Link>
      </Footer>
    </Box>
  )
}

export async function getStaticProps() {
  const stories = await list()
  return {
    props: { stories },
    revalidate: 600, // 10 minutes
  }
}
