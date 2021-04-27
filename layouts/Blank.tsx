import { ChakraProvider, ChakraProviderProps } from '@chakra-ui/react'

import theme from '../styles/theme'

const BlankLayout = ({ children }: ChakraProviderProps) => {
  return (
    <ChakraProvider theme={theme}>
      <main>{children}</main>
    </ChakraProvider>
  )
}

export default BlankLayout
