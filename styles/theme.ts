import { extendTheme } from '@chakra-ui/react'

const global = {
  styles: {
    global: {
      a: {
        color: 'brand.100',
      },
    },
  },
}

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

  FormLabel: {
    baseStyle: {
      fontWeight: '700',
    },
  },
  Input: {
    defaultProps: {
      focusBorderColor: 'brand.100',
    },
  },
  Textarea: {
    defaultProps: {
      focusBorderColor: 'brand.100',
    },
  },
  Select: {
    defaultProps: {
      focusBorderColor: 'brand.100',
    },
  },
  Checkbox: {
    defaultProps: {
      colorScheme: 'purple',
    },
  },
  Radio: {
    defaultProps: {
      colorScheme: 'purple',
    },
  },
}

const overrides = { global, fonts, colors, components }

export default extendTheme(overrides)
