import { extendTheme } from '@chakra-ui/react'

const fonts = {
  body: 'Inter',
  heading: 'Inter',
}

const colors = {
  brand: {
    100: '#55099D',
    500: '#22006A',
  },
}

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'bold',
    },
    variants: {
      solid: {
        bg: 'brand.100',
        _hover: {
          bg: 'brand.500',
        },
      },
    },
  },
}

const overrides = { fonts, colors, components }

export default extendTheme(overrides)
