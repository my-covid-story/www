import Head from 'next/head'
import { Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading } from "@chakra-ui/react"
import styles from '../styles/FaqPage.module.css'

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
          <Accordion allowMultiple defaultIndex={[0,1,2]}>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                  <Heading as="h2" size="sm">Who We Are</Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
              We are a group of concerned Ontarians who could no longer stand by as our province is led into a humanitarian crisis. We believe the power of storytelling is an effective means to drive government action.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading as="h2" size="sm">Why We’re Doing This</Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <p>It is clear that our government will not listen to numbers or scientific evidence. Data might be easy to dismiss but stories and the human connection they spark cannot be ignored.</p>
                <p>Many doctors, business owners, essential workers and concerned citizens have already spoken up and shared their stories, but many are fearful and don’t feel they have a voice; there are too many stories still left to be told.</p>
                <p>We created MyCovidStory as a way to amplify every voice that wanted to share - with government leaders, the media or the public -  regardless of whether they have their own platform or not.</p>
                <p>We believe the stories speak for themselves, and will use them to engage decision-makers to drive effective government policy and science-based practices that will save lives.</p>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem expanded={true}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading as="h2" size="sm">Our Mission</Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
              To amplify the stories of anyone impacted by COVID-19 and use the power of storytelling to drive effective government policy.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          </Box>
        </Box>
    </div>
  )
}
