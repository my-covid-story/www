// eslint-disable-next-line
import '../styles/globals.css'
import customTheme from '../styles/theme.js'
import '@fontsource/inter'

import { ChakraProvider, extendTheme } from "@chakra-ui/react"

const theme = extendTheme(customTheme);

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
