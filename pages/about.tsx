import { ReactElement } from 'react'
import Head from 'next/head'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import ContentBox from '../components/common/ContentBox'

export default function About(): ReactElement {
  return (
    <div>
      <Head>
        <title>About - My COVID Story</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentBox py>
        <Heading as="h1" size="2xl" pb={6}>
          About
        </Heading>
        <Box pb={6}>
          <Heading as="h2" size="l" pb={3}>
            Who We Are
          </Heading>
          <Text>
            We are a group of concerned Ontarians who can no longer stand by as our province is led
            into a humanitarian crisis. We believe the power of storytelling is an effective means
            to drive government action.
          </Text>
        </Box>
        <Box pb={6}>
          <Heading as="h2" size="l" pb={3}>
            Our Mission
          </Heading>
          <Text>
            To amplify the stories of anyone impacted by COVID-19 and use the power of storytelling
            to drive effective government policy that will save lives.
          </Text>
        </Box>
        <Box pb={6}>
          <Heading as="h2" size="l" pb={3}>
            Why We Created MyCovidStory.ca
          </Heading>
          <Stack spacing={4}>
            <Text>
              It is clear that our government will not listen to numbers or scientific evidence.
              Data might be easy to dismiss but stories, and the human connection they spark, cannot
              be ignored.
            </Text>
            <Text>
              Many doctors, business owners, essential workers and concerned Ontarians have already
              spoken up and shared their stories, but many are fearful and don’t feel they have a
              voice; there are too many stories still left to be told.
            </Text>
            <Text>
              We created MyCovidStory as a way to amplify every voice that wants to share - with
              government leaders, the media or the public - regardless of whether they have their
              own platform or not.
            </Text>
            <Text>
              We believe the stories speak for themselves, and will use them to engage
              decision-makers to drive effective government policy and the adoption of science-based
              practices that will save lives.
            </Text>
          </Stack>
        </Box>
        <Box>
          <Heading as="h2" size="l" pb={3}>
            Made With Love By
          </Heading>
          <Stack spacing={1}>
            <Text>Adam McKerlie</Text>
            <Text>Alyssa Schwartz</Text>
            <Text>Angelo Gio Mateo</Text>
            <Text>Anisa Nazir</Text>
            <Text>Anna Foat</Text>
            <Text>Ben Fine</Text>
            <Text>Charles Chan</Text>
            <Text>Curtis VanderGriendt</Text>
            <Text>Dave Steinberg</Text>
            <Text>Hannah W.</Text>
            <Text>Jamieson Roberts</Text>
            <Text>Kapil Haresh Vigneswaren</Text>
            <Text>Kathryn Adams-Sloan</Text>
            <Text>Krishn Ramesh</Text>
            <Text>Mike Wickett</Text>
            <Text>Natasha Burtenshaw-deVries</Text>
            <Text>Rhea Plosker</Text>
            <Text>Sue Robins</Text>
            <Text>Surkhab Peerzada</Text>
          </Stack>
        </Box>
      </ContentBox>
    </div>
  )
}
