import { Box, Container, SimpleGrid, Text } from '@chakra-ui/react'
import SimpleLink from './SimpleLink'
import VercelSVG from '../icons/VercelSVG'

export default function Footer() {
  return (
    <Box
      as="footer"
      backgroundColor="#202020"
      color="#FFF"
      paddingTop={10}
      paddingBottom={8}
      textAlign="left"
    >
      <Container centerContent maxW="container.sm">
        <SimpleGrid columns={[2, 3]} width="100%" textAlign={['left', 'center']}>
          <SimpleLink href="/" padding={1} marginBottom={1}>
            Home
          </SimpleLink>
          <SimpleLink href="/about" padding={1} marginBottom={1}>
            About
          </SimpleLink>
          <SimpleLink href="/faq" padding={1} marginBottom={1}>
            FAQ
          </SimpleLink>
          <SimpleLink
            href="https://github.com/my-covid-story/www"
            isExternal={true}
            padding={1}
            marginBottom={1}
          >
            Github
          </SimpleLink>
          <SimpleLink
            href="https://app.usefathom.com/share/xnknpyhv/mycovidstory.ca"
            isExternal={true}
            padding={1}
            marginBottom={1}
          >
            Analytics
          </SimpleLink>
          <SimpleLink href="mailto:info@mycovidstory.ca" padding={1} marginBottom={1}>
            Email Us
          </SimpleLink>
          <SimpleLink
            href="mailto:info@mycovidstory.ca?subject=I'd like to help translate!"
            padding={1}
            marginBottom={1}
          >
            Help Us Translate
          </SimpleLink>
        </SimpleGrid>
        <Text as="strong" paddingTop={4} mb={4}>
          Made with love by Canadians{' '}
          <span role="img" aria-label="heart" style={{ filter: 'brightness(0) invert(1)' }}>
            ❤️
          </span>
        </Text>
        <SimpleLink
          href="https://vercel.com?utm_source=my-covid-story&utm_campaign=oss"
          isExternal={true}
        >
          <VercelSVG />
        </SimpleLink>
      </Container>
    </Box>
  )
}
