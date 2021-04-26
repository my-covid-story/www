import { Box } from '@chakra-ui/react'

interface Props {
  color?: string
  children?: React.ReactNode
  [x: string]: unknown
}

export default function Label({ children, ...props }: Props) {
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
