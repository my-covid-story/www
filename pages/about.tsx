import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import ContentBox from '../components/common/ContentBox'
import HeadTags from '../components/common/HeadTags'

export default function About() {
  return (
    <div>
      <HeadTags
        title="About The Project and Team"
        description="Learn about why MyCovidStory.ca exists, how it began and meet the team of volunteers who came together in just 5 days to bring it to life."
      />
      <ContentBox>
        <Heading as="h1" size="2xl" pb={6}>
          About
        </Heading>
        <Box pb={6}>
          <Heading as="h2" size="l" pb={3}>
            Who We Are
          </Heading>
          <Text>
            Born in Ontario, we are a group of concerned Canadians who could not stand by as parts
            of our country were led into a humanitarian crisis. We believe the power of storytelling
            is an effective means to emphasize the human element of the pandemic, encouraging
            compassion amongst the Canadian public and offering first-hand insight to
            decision-makers and the media.
          </Text>
        </Box>
        <Box pb={6}>
          <Heading as="h2" size="l" pb={3}>
            Our Mission
          </Heading>
          <Text>
            To be a trusted platform that collects and amplifies the experiences of any Canadian
            impacted by the COVID-19 pandemic.
          </Text>
        </Box>
        <Box pb={6}>
          <Heading as="h2" size="l" pb={3}>
            Why We Created MyCovidStory.ca
          </Heading>
          <Stack spacing={4}>
            <Text>
              It is clear that not all elected officials and key decision-makers are willing to
              listen to numbers or scientific evidence. Data might be easy to dismiss, but stories
              and the human connection they spark cannot be ignored.
            </Text>
            <Text>
              Many doctors, business owners, essential workers and concerned individuals have
              already spoken up and shared their stories, but many are fearful and don’t feel they
              have a voice; there are too many stories still left to be told.
            </Text>
            <Text>
              We created My COVID Story as a way to amplify every voice that wants to share - with
              government leaders, the media or the public - regardless of whether they have their
              own platform or not. We strive to make it as easy as possible for anyone to share
              their story in a safe, anonymous way.
            </Text>
            <Text>
              The stories we collect help to surface insights about the unique impact of the
              pandemic on certain neighbourhoods, populations, industries and institutions. By
              sharing them with decision-makers, we hope to highlight the need for a pandemic
              response that promotes physical, emotional and economic well-being for all.
            </Text>
            <Text>
              We believe the stories speak for themselves, and by amplifying them we hope to foster
              compassion and deeper understanding of the experiences of others and get them in front
              of the people that have the power to influence change.
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
            <Text>Hannah White</Text>
            <Text>Jamieson Roberts</Text>
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
