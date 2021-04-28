import { ReactNode, useEffect } from 'react'
import { Button, Center, Container, Flex, Heading, Link, Text, VStack } from '@chakra-ui/react'

import HeadTags from '../components/common/HeadTags'

import BlankLayout from '../layouts/Blank'
import TwitterSVG from '../components/icons/TwitterSVG'
import FacebookSVG from '../components/icons/FacebookSVG'
import InstagramSVG from '../components/icons/InstagramSVG'
import NextLink from 'next/link'

const Thanks = () => {
  // Triggers a Story goal event on Fathom
  useEffect(() => {
    window?.fathom?.trackGoal('RT0FH11Y', 0)
  }, [])

  return (
    <>
      <HeadTags
        title="Thanks for sharing your story"
        description="Thank you for sharing your story of the impact that COVID-19 has had on you. We'll be reviewing your submission soon."
      />
      <Container pt="32">
        <Center>
          <Heading as="h1" size="lg" pb="8">
            Thank you for your story
          </Heading>
        </Center>
        <VStack spacing="12px" align="left">
          <Text>
            <strong>Thank you for submitting your story.</strong> We will amplify your story to
            engage decision-makers and drive effective government policy with science-based
            practices that will save lives.
          </Text>
          <Text>It may take 24-48 hours for your story to appear on the site.</Text>
          <Text>
            If you selected that you are willing to be contacted by the media, they may reach out to
            you with the contact information that you provided.
          </Text>
          <Text>
            {' '}
            If you have any questions, reach out to{' '}
            <a style={{ fontWeight: 'bold', color: '#55099D' }} href="mailto:info@mycovidstory.ca">
              info@mycovidstory.ca
            </a>
            .
          </Text>
        </VStack>
        <VStack pt="8" align="center" spacing={8}>
          <Heading as="h2" size="md">
            Spread the word
          </Heading>

          <Flex flexWrap="wrap" justifyContent="center">
            <Link href="https://twitter.com/MyCOVIDStory_CA" isExternal margin="5px">
              <Button color="white" leftIcon={<TwitterSVG />}>
                Share @MyCOVIDStory_CA
              </Button>
            </Link>

            <Link href="https://www.facebook.com/MyCovidStoryCA" isExternal margin="5px">
              <Button color="white" leftIcon={<FacebookSVG />}>
                Share @MyCovidStoryCA
              </Button>
            </Link>

            <Link href="https://www.instagram.com/mycovidstory_ca/" isExternal margin="5px">
              <Button color="white" leftIcon={<InstagramSVG />}>
                Share @mycovidstory_ca
              </Button>
            </Link>
          </Flex>

          <NextLink href="/">
            <Link>
              <Button variant="outline" size="sm" marginBottom="40px">
                Return to Stories
              </Button>
            </Link>
          </NextLink>
        </VStack>
      </Container>
    </>
  )
}

const ThanksLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Thanks.getLayout = ThanksLayout

export default Thanks
