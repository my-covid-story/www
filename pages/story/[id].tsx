import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import { get, list } from '../../lib/api/stories'
import StoryDetail from '../../components/stories/StoryDetail'
import Footer, { FooterSpace, Button } from '../../components/common/Footer'
import { GetStaticPaths } from 'next'

export default function StoryPage() {
  const router = useRouter()
  const id = router.query.id as string

  // If we came from the feed, go back on cancel. If not, navigate forward to the feed.
  function handleCancel() {
    router.query.back === 'true' ? router.back() : router.push('/feed')
  }

  return (
    <Box>
      <StoryDetail id={id} onCancel={handleCancel} />
      <FooterSpace />
      <Footer>
        <Button>Share This Story</Button>
      </Footer>
    </Box>
  )
}

// For details, see https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export const getStaticPaths: GetStaticPaths = async () => {
  const storyIds = await list()
  const paths = storyIds.map((s) => ({ params: { id: s.id } }))
  return {
    paths,
    // If the ID being requested isn't in this array, getStaticProps will run on the server and fetch the data
    // Equivalent to getServerSideProps, plus the page is then cached for future visits
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const story = await get(params.id)
  return { props: { story } }
}
