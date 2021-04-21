import Head from 'next/head'
import { Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Text } from "@chakra-ui/react"
import styles from '../styles/FaqPage.module.css'


import Footer from '../components/footer'


export default function FAQ() {
  return (
    <div className={styles.faq}>
      <Head>
        <title>FAQ - My Covid Story</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box w="95%" p={8} pb={24}>
        <Box pb={4}>
          <Heading as="h1" size="2xl" pb={4}>
            FAQ
          </Heading>
          <Text>Frequently Asked Questions</Text>
          <Accordion allowMultiple defaultIndex={[0,1,2,3,4]}>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                  <Heading as="h2" size="sm">Why does this website exist?</Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
              The site was created to help any Ontarian impacted by COVID-19 — from factory workers and family members to business owners and physicians — to easily and safely share their stories so that they can be seen by decision-makers, media and the public to drive effective government policy that will save lives.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading as="h2" size="sm">Can anyone share a story? How do we know if they’re true?</Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <p>Anyone over the age of 18 can submit their story. While our focus is currently on Ontario, we welcome stories from anyone throughout Canada.</p>

                <p>In order to keep you safe and establish trust with visitors, the content will be moderated using the following guidelines:</p>
                <ol>
                  <li>Content must be respectful, authentic, and captures their own or another’s story</li>
                  <li>Content isn’t defamatory or bullying anyone</li>
                  <li>It’s not self-promoting (i.e. sell a product/business) or encouraging illegal activity</li>
                  <li>It’s not racist, homophobic, sexist, ableist</li>
                  <li>Does not contain hate speech</li>
                  <li>Does not promote or encourage self-harm</li>
                  <li>For storytellers who wish to remain anonymous, their content does not have any personally identifiable information.</li>
                  <li>Stories should not have personal identifying information about other people impacted by COVID-19 without their consent</li>
                </ol>
                
                <p>A story that does not meet these guidelines will not be shared publicly. If you have any questions or concerns, reach out to <a href="mailto:info@mycovidstory.ca">info@mycovidstory.ca</a>.</p>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading as="h2" size="sm">Who can access private data?</Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                You have full control over who your information will be shared with — nobody else will have access to any personally identifiable information. We take your privacy seriously and have taken this into consideration at every step. The site does not use any third-party tracking or analytics tools.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading as="h2" size="sm">Why might the media want to follow-up with storytellers? Is MyCovidStory.ca a direct line to media coverage?</Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <p>MyCovidStory.ca is not a direct line to media coverage. While the untold stories of the pandemic are important and we expect that the media may be interested in learning more, they will only contact you if you have given express consent for this. </p>

                <p>We expect that members of the media will respect the privacy of those who have shared their stories here and only contact storytellers by <a href="https://kvmhxg5ojy6.typeform.com/to/gUsoYkft" target="_blank">signing up for our media list</a>.</p>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading as="h2" size="sm">Will any companies, media, or the government be able to find out that I posted this if I choose to remain anonymous?</Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <strong>No.</strong> Unless you have specifically consented to share your name publicly or with the media, no one else will have access to any personally identifiable information you have provided during story submission. We respect your choice.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading as="h2" size="sm">Who’s paying for this?</Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                This page was built by volunteers and is fully funded by Ontarians concerned by the current COVID-19 response in our province.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading as="h2" size="sm">Who built the site?</Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                We are a group of concerned Ontarians who can no longer stand by as our province is led into a humanitarian crisis. We believe the power of storytelling is an effective means to drive government action. Please view our <a href='/about/'>About</a> page to view our full list of contributors.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading as="h2" size="sm">Are the website creators affiliated with any group?</Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                No, we are not affiliated to any political group or agenda. We are simply a collection of Ontarians concerned by the COVID-19 response in our province and hope that by sharing real stories of the people impacted, decision makers at all levels will make the right decisions to keep Ontarians safe.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          </Box>
        </Box>

      <Footer />
    </div>
  )
}
