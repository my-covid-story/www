import { ChakraProvider, ChakraProviderProps, Grid } from '@chakra-ui/react'
import { Token } from '@chakra-ui/styled-system/dist/types/utils'

import Nav from '../components/common/Nav'
import Footer from '../components/common/Footer'

import theme from '../styles/theme'
import * as CSS from 'csstype'

interface SiteLayoutProps {
  navPosition?: Token<CSS.Property.Position>
}

const SiteLayout = ({
  children,
  navPosition = 'relative',
}: SiteLayoutProps & ChakraProviderProps) => {
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
