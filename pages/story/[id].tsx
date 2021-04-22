import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import { get } from '../../lib/api/stories'
import StoryDetail from '../../components/stories/StoryDetail'
import Footer, { FooterSpace, Button } from '../../components/common/Footer'

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

export async function getServerSideProps({ params }) {
  try {
    const prefected = await get(params.id)
    return { props: { prefected } }
  } catch (err) {
    return { notFound: true }
  }
}
