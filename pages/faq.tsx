import Head from 'next/head'
import { Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading } from "@chakra-ui/react"
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
                The site was created to help any Ontarian impacted by COVID-19 — from factory workers to business owners to physicians — to easily and safely share their stories with government leaders, media and the public to drive effective government policy.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading as="h2" size="sm">Who can access private data? </Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Nobody beyond who you have allowed will be able to have access to any personally identifiable information you have provided during story submission.
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
                Nobody beyond who you have allowed will be able to have access to any personally identifiable information you have provided during story submission.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading as="h2" size="sm">Who’s paying for this page?</Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                This page is fully funded by Ontarians concerned by the current COVID-19 response in our province. Funding is sourced through GoFundMe to pay for any operations costs and this project was built by a group of volunteer  designers, developers, marketers, caregivers, and policy advocates.
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
                No, we are not affiliated to any political group - we are just a collection of Ontarians concerned by the COVID-19 response in our province and hope that by presenting real stories, policy makers in all levels of government will make the right decision to keep Ontarians safe.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          </Box>
        </Box>

      <Footer />
    </div>
  )
}
