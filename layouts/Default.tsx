import { ChakraProvider, Grid } from '@chakra-ui/react'

import Nav from '../components/common/Nav'
import Footer from '../components/common/Footer'

import theme from '../styles/theme'

const SiteLayout = ({ children, navPosition = 'relative' }) => {
  return (
    <ChakraProvider theme={theme}>
      <Grid templateRows="auto 1fr auto" templateColumns="auto" minH="100vh">
        <Nav pos={navPosition} />
        <Grid as="main" templateRows="1fr auto" templateColumns="auto">
          {children}
        </Grid>
        <Footer />
      </Grid>
    </ChakraProvider>
  )
}

export default SiteLayout
