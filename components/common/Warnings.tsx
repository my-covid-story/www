import { Box, BoxProps } from '@chakra-ui/react'

export function ContentWarningBox({ ...props }: BoxProps) {
  return (
    <Box
      display="table"
      my={2}
      py={1}
      px={2}
      border="2px"
      borderColor="#C01313"
      borderRadius="4px"
      fontSize="md"
      fontWeight="bold"
      color="#C01313"
      backgroundColor="rgba(192, 19, 19, 0.1)"
      {...props}
    >
      Warning - Sensitive Content
    </Box>
  )
}
