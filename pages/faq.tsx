import { Box, Heading, Link, Text } from '@chakra-ui/react'
import styles from '../styles/FaqPage.module.css'
import ContentBox from '../components/common/ContentBox'
import HeadTags from '../components/common/HeadTags'
import SimpleLink from '../components/common/SimpleLink'

export default function FAQ() {
  return (
    <div className={styles.faq}>
      <HeadTags
        title="Frequently Asked Questions"
        description="View our list of Frequently Asked Questions to learn more about how the site began, moderation guidelines and how we protect your privacy."
      />
      <ContentBox>
        <Heading as="h1" size="2xl" pb={6}>
          Frequently Asked Questions
        </Heading>

        <Box pb={6}>
          <Heading as="h2" size="l" pb={3}>
            Why does this website exist?
          </Heading>
          <Text>
            The site was created to help any Ontarian impacted by COVID-19 — from factory workers
            and family members to business owners and physicians — to easily and safely share their
            stories so that they can be seen by decision-makers, media and the public to drive
            effective government policy that will save lives.
          </Text>
        </Box>
        <Box pb={6}>
          <Heading as="h2" size="l" pb={3}>
            Can anyone share a story?
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
              <li>Respects science</li>
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
                personally identifiable information
              </li>
              <li>
                Stories should not have personal identifying information about other people impacted
                by COVID-19 without their consent
              </li>
            </ol>
            <p>
              A story that does not meet these guidelines will not be shared publicly. If you have
              any questions or concerns, reach out to{' '}
              <SimpleLink
                href="mailto:info@mycovidstory.ca"
                isExternal={true}
                color="primary.100"
                fontWeight="600"
              >
                info@mycovidstory.ca
              </SimpleLink>
              . For additional support or resources, please see{' '}
              <SimpleLink
                href="https://211ontario.ca"
                isExternal={true}
                color="primary.100"
                fontWeight="600"
              >
                https://211ontario.ca
              </SimpleLink>{' '}
              .
            </p>
          </Text>
        </Box>
        <Box pb={6}>
          <Heading as="h2" size="l" pb={3}>
            How do you know these stories are true?
          </Heading>
          <Text>
            <p>
              The stories published by mycovidstory.ca represent the lived experience, opinions, and
              truths of the people telling them. They have not been verified for accuracy.
            </p>
            <p>
              These stories do not represent the opinions or beliefs of mycovidstory.ca or any of
              the many volunteers working on this project.
            </p>
            <p>
              We encourage all readers to consult respected scientific sources for verified, factual
              information related to COVID-19.
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
            and have taken this into consideration at every step. This site does not use cookies or
            any third-party tracking tools. We use{' '}
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
              the pandemic are important and we expect that the media may be interested in learning
              more, they will only contact you if you have given express consent for this.
            </p>

            <p>
              We expect that members of the media will respect the privacy of those who have shared
              their stories here and only contact storytellers by{' '}
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
        <Box pb={6}>
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
            current COVID-19 response in our province. We are using{' '}
            <Link href="https://vercel.com?utm_source=my-covid-story&utm_campaign=oss" isExternal>
              Vercel
            </Link>{' '}
            to host the site.{' '}
            <Link href="https://vercel.com?utm_source=my-covid-story&utm_campaign=oss" isExternal>
              Vercel
            </Link>{' '}
            is sponsoring the project by providing free hosting services.
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
        <Box pb={6}>
          <Heading as="h2" size="l" pb={3}>
            What sites and sources do you recommend to learn about the science of COVID-19 and
            related vaccines?
          </Heading>
          <Text>
            <strong>Websites:</strong>
            <ol>
              <li>
                <SimpleLink
                  href="https://covid19-sciencetable.ca/"
                  isExternal={true}
                  color="primary.100"
                  fontWeight="600"
                >
                  Ontario COVID-19 Science Advisory Table
                </SimpleLink>
              </li>
              <li>
                <SimpleLink
                  href="https://howsmyflattening.ca/"
                  isExternal={true}
                  color="primary.100"
                  fontWeight="600"
                >
                  #HowsMyFlattening
                </SimpleLink>
              </li>
              <li>
                <SimpleLink
                  href="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/prevention-risks.html"
                  isExternal={true}
                  color="primary.100"
                  fontWeight="600"
                >
                  Government of Canada: COVID-19 prevention and risks
                </SimpleLink>
              </li>
              <li>
                <SimpleLink
                  href="https://www.canada.ca/en/public-health/services/diseases/coronavirus-disease-covid-19/vaccines.html"
                  isExternal={true}
                  color="primary.100"
                  fontWeight="600"
                >
                  Government of Canada: Vaccines for COVID-19
                </SimpleLink>
              </li>
            </ol>
            <strong>Social media:</strong>
            <ol>
              <li>
                <SimpleLink
                  href="https://twitter.com/VaxHuntersCan"
                  isExternal={true}
                  color="primary.100"
                  fontWeight="600"
                >
                  Vaccine Hunters Canada
                </SimpleLink>
              </li>
              <li>
                <SimpleLink
                  href="https://www.instagram.com/unambiguousscience/"
                  isExternal={true}
                  color="primary.100"
                  fontWeight="600"
                >
                  Unambiguous Science
                </SimpleLink>
              </li>
              <li>
                <SimpleLink
                  href="https://www.instagram.com/covidvaccinefacts/"
                  isExternal={true}
                  color="primary.100"
                  fontWeight="600"
                >
                  COVID Vaccine Facts
                </SimpleLink>
              </li>
            </ol>
          </Text>
        </Box>
      </ContentBox>
    </div>
  )
}
