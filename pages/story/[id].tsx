import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useClipboard,
  useDisclosure,
  useToast,
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
import { GetStaticPropsResult } from 'next'
import ErrorPage from '../404'
import { CSSProperties } from 'react'
import CustomShareContainer from '../../components/common/CustomShareContainer'
import { LinkIcon } from '@chakra-ui/icons'
import storyIds from '../../generated/story-ids.json'
import Link from 'next/link'

type StoryContext = {
  next: string | null
  previous: string | null
}

type EnrichedStory = Story & StoryContext
interface StoryProps {
  success: true
  story: EnrichedStory
  url?: string
}

interface ErrorCodeProps {
  success: false
  errorMessage: string
}

type StoryPageProps = StoryProps | ErrorCodeProps

const shareIconSize = 64
const buttonStyle: CSSProperties = { marginRight: '12px', marginBottom: '12px' }

export default function StoryPage(props: StoryPageProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const url = props.success ? `${process.env.BASE_URL}/story/${props.story.id}` : ''
  const { onCopy } = useClipboard(url)
  const toast = useToast()

  /**
   * Return the custom error page with the relative status code. This can allow
   * passing different error codes like 404 in case a page is not found or a 500
   * in case of a server error.
   */
  if (props.success === false) {
    return <ErrorPage message={props.errorMessage} />
  }

  const { story } = props

  function handleURLCopy() {
    onCopy()

    toast({
      position: 'top',
      title: 'Link copied',
      status: 'success',
    })
  }

  // Get Story details
  const description = generateSocial(story)
  const emailSubject = 'Help me amplify this story'

  return (
    <>
      <HeadTags title={story.title} description={story.content} previewImage={storyImage(story)} />

      <Box>
        <StoryDetail story={story} onShare={onOpen} />
        <Box>
          {story.previous && <Link href={`${story.previous}`}>Previous Story</Link>}
          {story.next && <Link href={`${story.next}`}>Next Story</Link>}
        </Box>
      </Box>

      <FloatingRibbon>
        <Button onClick={onOpen} my={'5px'}>
          Share This Story
        </Button>

        <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerHeader>Share via</DrawerHeader>

              <DrawerBody>
                <Flex alignItems="flex-start" flexWrap="wrap">
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

                  <CustomShareContainer style={buttonStyle} onClick={handleURLCopy}>
                    <LinkIcon color="#fff" w={8} h={8} />
                  </CustomShareContainer>
                </Flex>
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

export async function getStaticProps({
  params,
}: GetStaticProps): Promise<GetStaticPropsResult<StoryPageProps>> {
  try {
    /**
     * Needed to use `as` keyword, but this should be refactored.
     */
    const story = (await get(params.id)) as EnrichedStory

    const storyIndex = storyIds.findIndex((s) => s === story.id)
    if (storyIndex !== -1) {
      const prevStory = storyIds[storyIndex - 1]
      const nextStory = storyIds[storyIndex + 1]
      if (prevStory) {
        story.previous = prevStory
      }
      if (nextStory) {
        story.next = nextStory
      }
    }

    return { props: { success: true, story }, revalidate: 60 }
  } catch (err) {
    return { props: { success: false, errorMessage: "Ooops. Can't find it." }, revalidate: 60 }
  }
}
