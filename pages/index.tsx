import NextLink from 'next/link'
import { Box, Link } from '@chakra-ui/react'
import { list } from '../lib/api/stories'
import StoryFeed from '../components/stories/StoryFeed'
import FloatingRibbon, { Button } from '../components/common/FloatingRibbon'
import SiteLayout from '../layouts/Default'

const MainPage = ({ stories }) => {
  return (
    <>
      <Box>
        <StoryFeed stories={stories} />
      </Box>
      <FloatingRibbon>
        <NextLink href="/new">
          <Link>
            <Button>Add Your Story</Button>
          </Link>
        </NextLink>
      </FloatingRibbon>
    </>
  )
}

export async function getStaticProps() {
  const stories = await list()
  return {
    props: { stories },
    revalidate: 600, // 10 minutes
  }
}

MainPage.getLayout = (page) => <SiteLayout navPosition="sticky">{page}</SiteLayout>

export default MainPage
