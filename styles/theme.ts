import { extendTheme } from '@chakra-ui/react'

const global = {
  styles: {
    global: {
      a: {
        textDecoration: 'none',
        color: '#55099D',
      },
    },
  },
}

const fonts = {
  body: 'Inter,sans-serif',
  heading: 'Inter,sans-serif',
}

const colors = {
  primary: {
    100: '#55099D',
    500: '#22006A',
    700: '#240c3a',
  },
  brand: {
    100: '#55099D',
    500: '#22006A',
    700: '#240c3a',
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
