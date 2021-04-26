import { Box, BoxProps, useTheme } from '@chakra-ui/react'

export const RESPONSIVE_PADDING = [4, null, 8]

interface ContentBoxProps extends BoxProps {
  responsivePaddingY?: boolean
}

export default function ContentBox({
  responsivePaddingY,
  children,
  py,
  ...props
}: ContentBoxProps) {
  const { breakpoints } = useTheme()

  if (responsivePaddingY === true) {
    py = RESPONSIVE_PADDING
  }

  return (
    <Box maxW={breakpoints.lg} m="auto" px={RESPONSIVE_PADDING} py={py} {...props}>
      {children}
    </Box>
  )
}
