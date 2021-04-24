import { useTheme, Box } from '@chakra-ui/react'

export const RESPONSIVE_PADDING = [4, null, 8]

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  py?: any
  children?: React.ReactNode
  [x: string]: unknown
}

export default function ContentBox({ py, children, ...props }: Props) {
  const { breakpoints } = useTheme()

  if (py === true) {
    py = RESPONSIVE_PADDING
  }

  return (
    <Box maxW={breakpoints.lg} m="auto" px={RESPONSIVE_PADDING} py={py} {...props}>
      {children}
    </Box>
  )
}
