import Head from 'next/head'

import {
  Box,
  Heading,
  Link,
  Text,
} from '@chakra-ui/react'
import styles from '../styles/FaqPage.module.css'
import ContentBox from '../components/common/ContentBox'

export default function FAQ() {
  return (
    <div className={styles.faq}>
      <Head>
        <title>FAQ - My COVID Story</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentBox py>
        <Box pb={6}>
          <Heading as="h1" size="2xl" pb={6}>
            FAQ
          </Heading>
          <Text>Frequently Asked Questions</Text>

          <Box pb={6}>
            <Heading as="h2" size="l" pb={3}>
              Why does this website exist?
            </Heading>
            <Text>
              The site was created to help any Ontarian impacted by COVID-19 — from factory workers
              and family members to business owners and physicians — to easily and safely share
              their stories so that they can be seen by decision-makers, media and the public to
              drive effective government policy that will save lives.
            </Text>
          </Box>

          <Box pb={6}>
            <Heading as="h2" size="l" pb={3}>
              Can anyone share a story? How do we know if they’re true?
            </Heading>
            <Text>
              <p>
                Anyone over the age of 18 can submit their story. While our focus is currently on
                Ontario, we welcome stories from anyone throughout Canada.
              </p>

              <p>
                In order to keep you safe and establish trust with visitors, the content will be
                moderated using the following guidelines:
              </p>
              <ol>
                <li>
                  Content must be respectful, authentic, and captures their own or another’s story
                </li>
                <li>Content isn’t defamatory or bullying anyone</li>
                <li>
                  It’s not self-promoting (i.e. sell a product/business) or encouraging illegal
                  activity
                </li>
                <li>It’s not racist, homophobic, sexist, ableist</li>
                <li>Does not contain hate speech</li>
                <li>Does not promote or encourage self-harm</li>
                <li>
                  For storytellers who wish to remain anonymous, their content does not have any
                  personally identifiable information.
                </li>
                <li>
                  Stories should not have personal identifying information about other people
                  impacted by COVID-19 without their consent
                </li>
              </ol>

              <p>
                A story that does not meet these guidelines will not be shared publicly. If you have
                any questions or concerns, reach out to{' '}
                <a href="mailto:info@mycovidstory.ca">info@mycovidstory.ca</a>.
              </p>
            </Text>
          </Box>
          <Box pb={6}>
            <Heading as="h2" size="l" pb={3}>
              Who can access private data?
            </Heading>
            <Text>
              You have full control over who your information will be shared with — nobody else will
              have access to any personally identifiable information. We take your privacy seriously
              and have taken this into consideration at every step. This site does not use cookies
              or any third-party tracking tools. We use{' '}
              <Link href="https://app.usefathom.com/share/xnknpyhv/mycovidstory.ca#/" isExternal>
                Fathom
              </Link>{' '}
              to generate simple traffic metrics. Fathom does not track any personally identifiable
              information.
            </Text>
          </Box>
          <Box pb={6}>
            <Heading as="h2" size="l" pb={3}>
              Why might the media want to follow-up with storytellers? Is MyCovidStory.ca a direct
              line to media coverage?
            </Heading>
            <Text>
              <p>
                MyCovidStory.ca is not a direct line to media coverage. While the untold stories of
                the pandemic are important and we expect that the media may be interested in
                learning more, they will only contact you if you have given express consent for
                this.
              </p>

              <p>
                We expect that members of the media will respect the privacy of those who have
                shared their stories here and only contact storytellers by{' '}
                <a
                  href="https://kvmhxg5ojy6.typeform.com/to/gUsoYkft"
                  target="_blank"
                  rel="noreferrer"
                >
                  signing up for our media list
                </a>
                .
              </p>
            </Text>
          </Box>
          <Box pb={6}></Box>
          <Heading as="h2" size="l" pb={3}>
            Will any companies, media, or the government be able to find out that I posted this if I
            choose to remain anonymous?
          </Heading>
          <Text>
            <strong>No.</strong> Unless you have specifically consented to share your name publicly
            or with the media, no one else will have access to any personally identifiable
            information you have provided during story submission. We respect your choice.
          </Text>
        </Box>
        <Box pb={6}>
          <Heading as="h2" size="l" pb={3}>
            Who’s paying for this?
          </Heading>
          <Text>
            This page was built by volunteers and is fully funded by Ontarians concerned by the
            current COVID-19 response in our province.
          </Text>
        </Box>
        <Box pb={6}>
          <Heading as="h2" size="l" pb={3}>
            Who built the site?
          </Heading>
          <Text>
            We are a group of concerned Ontarians who can no longer stand by as our province is led
            into a humanitarian crisis. We believe the power of storytelling is an effective means
            to drive government action. Please view our <Link href="/about/">About</Link>
            page to view our full list of contributors.
          </Text>
        </Box>
        <Box pb={6}>
          <Heading as="h2" size="l" pb={3}>
            Are the website creators affiliated with any group?
          </Heading>
          <Text>
            No, we are not affiliated to any political group or agenda. We are simply a collection
            of Ontarians concerned by the COVID-19 response in our province and hope that by sharing
            real stories of the people impacted, decision makers at all levels will make the right
            decisions to keep Ontarians safe.
          </Text>
        </Box>
      </ContentBox>
    </div>
  )
}
