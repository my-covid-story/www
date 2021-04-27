import { useRouter } from 'next/router'

import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share'

import { Story } from '@prisma/client'
import { get, list } from '../../lib/api/stories'
import generateSocial from '../../lib/social'
import StoryDetail from '../../components/stories/StoryDetail'
import FloatingRibbon, { Button } from '../../components/common/FloatingRibbon'
import HeadTags from '../../components/common/HeadTags'
import { storyImage } from '../../components/stories/model'

const shareIconSize = 64
const buttonStyle = { marginRight: '12px' }

interface StoryPageProps {
  story: Story
  url: string
}

export default function StoryPage({ story }: StoryPageProps) {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // If we came from the feed, go back on cancel. If not, navigate forward to the feed.
  function handleClose(): void {
    router.query.back === 'true' ? router.back() : router.push('/')
  }

  // Get Story details
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/story/${story.id}`
  const description = generateSocial(story)
  const emailSubject = 'Help me amplify this story'

  return (
    <>
      <HeadTags title={story.title} description={story.content} previewImage={storyImage(story)} />
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
                <TwitterShareButton
                  url={url}
                  title={description}
                  via="MyCOVIDStory_CA"
                  style={buttonStyle}
                >
                  <TwitterIcon size={shareIconSize} />
                </TwitterShareButton>
                <FacebookShareButton url={url} quote={description} style={buttonStyle}>
                  <FacebookIcon size={shareIconSize} />
                </FacebookShareButton>
                <WhatsappShareButton url={url} title={description} style={buttonStyle}>
                  <WhatsappIcon size={shareIconSize} />
                </WhatsappShareButton>
                <EmailShareButton
                  url={url}
                  subject={emailSubject}
                  body={description}
                  style={buttonStyle}
                >
                  <EmailIcon size={shareIconSize} />
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

interface GetStaticProps {
  params: {
    id: string
  }
}

export async function getStaticProps({ params }: GetStaticProps) {
  const story = await get(params.id)
  return { props: { story } }
}
