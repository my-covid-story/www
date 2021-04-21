// eslint-disable-next-line
import '../styles/globals.css'

import { ChakraProvider } from '@chakra-ui/react'

import { env } from 'node:process';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
