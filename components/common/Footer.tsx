import { Box, Container, SimpleGrid, Text } from '@chakra-ui/react'
import MenuItem from './MenuItem'

export default function Footer() {
  return (
    <Box
      as="footer"
      backgroundColor="#202020"
      color="#FFF"
      paddingTop={4}
      paddingBottom={4}
      textAlign="left"
    >
      <Container centerContent maxW="container.sm">
        <SimpleGrid columns={3} width="100%" textAlign="center">
          <MenuItem>Home</MenuItem>
          <MenuItem to="/about">About</MenuItem>
          <MenuItem to="/faq">FAQ</MenuItem>
          <MenuItem to="https://kvmhxg5ojy6.typeform.com/to/gUsoYkft" externalLink={true}>
            Media Form
          </MenuItem>
          {/*<MenuItem>Releases</MenuItem>*/}
          <MenuItem to="https://github.com/my-covid-story/www" externalLink={true}>
            Github
          </MenuItem>
          <MenuItem
            to="https://app.usefathom.com/share/xnknpyhv/mycovidstory.ca"
            externalLink={true}
          >
            Analytics
          </MenuItem>
          <MenuItem to="mailto:info@mycovidstory.ca">Email Us</MenuItem>
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
