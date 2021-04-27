import { Box, BoxProps, useTheme } from '@chakra-ui/react'

export const RESPONSIVE_PADDING = [4, null, 8]

export default function ContentBox({ children, py = RESPONSIVE_PADDING, ...props }: BoxProps) {
  const { breakpoints } = useTheme()

  return (
    <Box maxW={breakpoints.lg} m="auto" px={RESPONSIVE_PADDING} py={py} {...props}>
      {children}
    </Box>
  )
}
