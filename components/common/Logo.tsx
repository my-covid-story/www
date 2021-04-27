import { Box, BoxProps, Text } from '@chakra-ui/react'
import Link from 'next/link'

export default function Logo({ ...props }: BoxProps) {
  return (
    <Box {...props}>
      <Text color="white" fontSize="md" fontWeight="bold">
        <Link href="/">My COVID Story</Link>
      </Text>
    </Box>
  )
}
