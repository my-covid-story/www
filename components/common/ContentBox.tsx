import { ReactElement, ReactNode } from 'react'
import { useTheme, Box } from '@chakra-ui/react'
import { RESPONSIVE_PADDING } from '../lib/Definitions'
import { Token } from '@chakra-ui/styled-system/dist/types/utils'
import * as CSS from 'csstype'

interface Props {
  py?: boolean | Token<CSS.Property.Padding | number, 'space'>
  children?: ReactNode
  [x: string]: unknown
}

export default function ContentBox({ py, children, ...props }: Props): ReactElement {
  const { breakpoints } = useTheme()

  if (py === true) {
    py = RESPONSIVE_PADDING
  } else {
    py = {}
  }

  return (
    <Box maxW={breakpoints.lg} m="auto" px={RESPONSIVE_PADDING} py={py} {...props}>
      {children}
    </Box>
  )
}
