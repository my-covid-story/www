import { Box } from '@chakra-ui/react'

export function ContentWarningBox({ ...props }) {
  return (
    <Box
      display="table"
      my={2}
      py={1}
      px={2}
      border="2px"
      borderColor="crimson"
      borderRadius="4px"
      fontSize="md"
      fontWeight="bold"
      color="crimson"
      backgroundColor="rgba(192, 19, 19, 0.1);"
      {...props}
    >
      Warning - Sensitive Content
    </Box>
  )
}
