import { Box, Container, SimpleGrid, Text } from '@chakra-ui/react'
import MenuItem from './MenuItem'

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
        <SimpleGrid columns={3} width="100%" textAlign={['left', 'left', 'center']}>
          <MenuItem padding={1} marginBottom={1}>
            Home
          </MenuItem>
          <MenuItem to="/about" padding={1} marginBottom={1}>
            About
          </MenuItem>
          <MenuItem to="/faq" padding={1} marginBottom={1}>
            FAQ
          </MenuItem>
          <MenuItem
            to="https://kvmhxg5ojy6.typeform.com/to/gUsoYkft"
            externalLink={true}
            padding={1}
            marginBottom={1}
          >
            Media Form
          </MenuItem>
          {/*<MenuItem padding={1} marginBottom={1}>Releases</MenuItem>*/}
          <MenuItem
            to="https://github.com/my-covid-story/www"
            externalLink={true}
            padding={1}
            marginBottom={1}
          >
            Github
          </MenuItem>
          <MenuItem
            to="https://app.usefathom.com/share/xnknpyhv/mycovidstory.ca"
            externalLink={true}
            padding={1}
            marginBottom={1}
          >
            Analytics
          </MenuItem>
          <MenuItem to="mailto:info@mycovidstory.ca" padding={1} marginBottom={1}>
            Email Us
          </MenuItem>
        </SimpleGrid>
        <Text as="strong" paddingTop={4}>
          Made with love by Ontarians{' '}
          <span role="img" aria-label="heart" style={{ filter: 'brightness(0) invert(1)' }}>
            ❤️
          </span>
        </Text>
      </Container>
    </Box>
  )
}
