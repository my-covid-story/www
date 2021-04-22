import React from 'react'
import Nav from '../components/nav'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../styles/theme'

const DefaultSiteLayout = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>

      {children}
    </ChakraProvider>
  )
}

export default DefaultSiteLayout
