import { Box, Text } from '@chakra-ui/react'
import Link from 'next/link'

export default function Logo(props) {
  return (
    <Box {...props}>
      <Text color="white" fontSize="md" fontWeight="bold">
        <Link href="/">My Covid Story</Link>
      </Text>
    </Box>
  )
}
