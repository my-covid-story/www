import { ReactElement, ReactNode } from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import theme from '../styles/theme'

const BlankLayout = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <ChakraProvider theme={theme}>
      <main>{children}</main>
    </ChakraProvider>
  )
}

export default BlankLayout
