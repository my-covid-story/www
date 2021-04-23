import React from 'react'
import { ChakraProvider, Grid } from '@chakra-ui/react'

import Nav from '../components/common/Nav'
import Footer from '../components/common/Footer'

import theme from '../styles/theme'

const SiteLayout = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <Grid templateRows="auto 1fr auto" templateColumns="auto" minH="100vh">
        <Nav />
        <main>{children}</main>
        <Footer />
      </Grid>
    </ChakraProvider>
  )
}

export default SiteLayout
