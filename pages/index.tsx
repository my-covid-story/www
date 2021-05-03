import NextLink from 'next/link'
import { Box, Link } from '@chakra-ui/react'
import { list } from '../lib/api/stories'
import StoryFeed from '../components/stories/StoryFeed'
import FloatingRibbon, { Button } from '../components/common/FloatingRibbon'
import SiteLayout from '../layouts/Default'
import { Story } from '@prisma/client'
import HeadTags from '../components/common/HeadTags'
import useTranslation from 'next-translate/useTranslation'

interface MainPageProps {
  stories: Story[]
}

const MainPage = ({ stories }: MainPageProps) => {
  const { t } = useTranslation('common')
  return (
    <>
      <HeadTags>
        <link rel="canonical" href="https://www.mycovidstory.ca" />
      </HeadTags>

      <Box>
        <StoryFeed stories={stories} />
      </Box>

      <FloatingRibbon>
        <NextLink href="/new" passHref>
          <Link>
            <Button my={'5px'}>{t('add_story')}</Button>
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

const MainPageLayout = ({ children }) => <SiteLayout navPosition="sticky">{children}</SiteLayout>

MainPage.setLayout = MainPageLayout

export default MainPage
