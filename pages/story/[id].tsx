import { useRouter } from 'next/router'

import {
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react'
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share'

import { Story } from '@prisma/client'
import { list, get } from '../../lib/api/stories'
import StoryDetail from '../../components/stories/StoryDetail'
import FloatingRibbon, { Button } from '../../components/common/FloatingRibbon'

interface Props {
  story: Story
  url: string
}

export default function StoryPage({ story }: Props) {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const shareIconSize = 64
  // If we came from the feed, go back on cancel. If not, navigate forward to the feed.
  function handleClose() {
    router.query.back === 'true' ? router.back() : router.push('/')
  }

  const url = `/story/${story.id}`
  return (
    <>
      <Box>
        <StoryDetail story={story} onClose={handleClose} />
      </Box>
      <FloatingRibbon>
        <Button onClick={onOpen}>Share This Story</Button>
        <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerHeader>Share via</DrawerHeader>
              <DrawerBody>
                <TwitterShareButton url={url}>
                  <TwitterIcon size={shareIconSize} round={true} />
                </TwitterShareButton>
                <FacebookShareButton url={url}>
                  <FacebookIcon size={shareIconSize} round={true} />
                </FacebookShareButton>
                <WhatsappShareButton url={url}>
                  <WhatsappIcon size={shareIconSize} round={true} />
                </WhatsappShareButton>
                <EmailShareButton url={url}>
                  <EmailIcon size={shareIconSize} round={true} />
                </EmailShareButton>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </FloatingRibbon>
    </>
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
