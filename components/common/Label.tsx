import { Box, BoxProps } from '@chakra-ui/react'

export default function Label({ children, ...props }: BoxProps) {
  const color = props.color || 'white'

  return (
    <Box
      py={1}
      px={2}
      border="1px"
      borderRadius="4px"
      borderColor={color}
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
