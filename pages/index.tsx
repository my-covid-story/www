import landing from '../styles/LandingPage.module.css'
import { Box, Button, Heading, HStack, Link, Text } from '@chakra-ui/react'

export default function Home() {
  return (
    <>
      <div className={landing.container}>
        <div className={landing.background} />
        <main className={landing.main}>
          <Box>
            <Heading pb={'1rem'} as="h1" size="3xl">
              My COVID Story
            </Heading>
            <Text>If our leaders won’t listen to the numbers, they must face our stories.</Text>
            <HStack p={'2rem 0'} spacing="1rem" justify="center">
              <Link href={'/stories/create'} style={{ display: 'inline-block' }}>
                <Button
                  variant="solid"
                  color="primary.100"
                  bg="white"
                  _hover={{
                    bg: ['gray.200'],
                  }}
                >
                  Add Your Story
                </Button>
              </Link>
              <Link
                href="https://kvmhxg5ojy6.typeform.com/to/gUsoYkft"
                style={{ display: 'inline-block', textDecoration: 'none' }}
                isExternal
              >
                <Button variant="solid">Media Sign-Up</Button>
              </Link>
            </HStack>
          </Box>
        </main>
      </div>
    </>
  )
}
