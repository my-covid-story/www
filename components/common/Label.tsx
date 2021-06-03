import { Box, BoxProps, useTheme } from '@chakra-ui/react'
import { getColor } from '@chakra-ui/theme-tools'
import Color from 'tinycolor2'

// Compute a simple color that is equivalent to alpha blending the given color with white.
function blendWhite(color: string, alpha: number) {
  const { r, g, b } = Color(color).toRgb()
  return Color({
    r: Math.round(255 - alpha * (255 - r)),
    g: Math.round(255 - alpha * (255 - g)),
    b: Math.round(255 - alpha * (255 - b)),
  }).toHexString()
}

interface LabelProps extends BoxProps {
  opaque?: boolean
}

export default function Label({ opaque, children, ...props }: LabelProps) {
  const theme = useTheme()

  const color = (props.color as string) || (opaque ? 'primary.100' : 'white')
  const background = opaque ? blendWhite(getColor(theme, color), 0.1) : undefined

  return (
    <Box
      display="table"
      py={1}
      px={2}
      border="1px"
      borderRadius="4px"
      borderColor={color}
      background={background}
      color={color}
      fontSize="md"
      fontWeight={600}
      lineHeight={1.2}
      {...props}
    >
      {children}
    </Box>
  )
}

export function ContentWarningLabel(props: LabelProps) {
  return (
    <Label opaque color="warning" {...props}>
      Warning: Sensitive Content
    </Label>
  )
}
