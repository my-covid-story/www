import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import { Story } from '@prisma/client'
import { list, get } from '../../lib/api/stories'
import StoryDetail from '../../components/stories/StoryDetail'

interface Props {
  story: Story
}

export default function StoryPage({ story }: Props) {
  const router = useRouter()

  // If we came from the feed, go back on cancel. If not, navigate forward to the feed.
  function handleCancel() {
    router.query.back === 'true' ? router.back() : router.push('/feed')
  }

  return (
    <Box>
      <StoryDetail story={story} onCancel={handleCancel} />
    </Box>
  )
}

// Return the latest story IDs to pre-render those pages on the server with getStaticProps().
// If a page with another ID is requested, getStaticProps() will be called to fetch the data.
// The page will be rendered on the server, and the page will be cached for future requests.
// Details: https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
//
export async function getStaticPaths() {
  const stories = await list()
  const paths = stories.map((s) => ({ params: { id: s.id } }))
  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const story = await get(params.id)
  return { props: { story } }
}
