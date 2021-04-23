import NextLink from 'next/link'
import { Box, Link } from '@chakra-ui/react'
import { list } from '../lib/api/stories'
import StoryFeed from '../components/stories/StoryFeed'
import Footer, { FooterSpace, Button } from '../components/common/Footer'

export default function MainPage({ stories }) {
  return (
    <Box>
      <StoryFeed stories={stories} />
      <FooterSpace />
      <Footer>
        <NextLink href="/new">
          <Link>
            <Button>Add Your Story</Button>
          </Link>
        </NextLink>
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
