import NextLink from 'next/link'
import { Box, Link } from '@chakra-ui/react'
import { list } from '../lib/api/stories'
import StoryFeed from '../components/stories/StoryFeed'
import FloatingRibbon, { Button } from '../components/common/FloatingRibbon'
import SiteLayout from '../layouts/Default'
import { ReactElement, ReactNode } from 'react'
import { Story } from '@prisma/client'

const MainPage = ({ stories }: { stories: Story[] }): ReactElement => {
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

export async function getStaticProps(): Promise<{
  props: { stories: Record<string, unknown>[] }
  revalidate: number
}> {
  const stories = await list()
  return {
    props: { stories },
    revalidate: 600, // 10 minutes
  }
}

const MainPageLayout = (page: ReactNode): ReactElement => (
  <SiteLayout navPosition="sticky">{page}</SiteLayout>
)

MainPage.getLayout = MainPageLayout

export default MainPage
