import { ChakraProvider } from '@chakra-ui/react'
import GlobalHead from '../components/common/GlobalHead'

import theme from '../styles/theme'

const BlankLayout = ({ children }) => {
  return (
    <>
      <GlobalHead />
      <ChakraProvider theme={theme}>
        <main>{children}</main>
      </ChakraProvider>
    </>
  )
}

export default BlankLayout
