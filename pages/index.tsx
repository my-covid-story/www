import NextLink from 'next/link'
import { Box, Link } from '@chakra-ui/react'
import { list } from '../lib/api/stories'
import StoryFeed from '../components/stories/StoryFeed'
import FloatingRibbon, { Button } from '../components/common/FloatingRibbon'
import SiteLayout from '../layouts/Default'
import { Story } from '@prisma/client'
import { ReactNode } from 'react'
import HeadTags from '../components/common/HeadTags'

interface MainPageProps {
  stories: Story[]
}

const MainPage = ({ stories }: MainPageProps) => {
  return (
    <>
      <HeadTags>
        <link rel="canonical" href="https://www.mycovidstory.ca" />
      </HeadTags>
      <Box>
        <Button
          type="button"
          onClick={() => {
            throw new Error('Sentry Frontend Error')
          }}
        >
          Throw error
        </Button>
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
    revalidate: 60, // 1 minute
  }
}

const MainPageLayout = (page: ReactNode) => <SiteLayout navPosition="sticky">{page}</SiteLayout>

MainPage.getLayout = MainPageLayout

export default MainPage
