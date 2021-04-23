import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import theme from '../styles/theme'

const BlankLayout = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <main>{children}</main>
    </ChakraProvider>
  )
}

export default BlankLayout
