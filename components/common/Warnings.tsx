import { Box, Text } from '@chakra-ui/react'

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

export function SuicidalBox({ ...props }) {
  return (
    <Text color="crimson" my={4} {...props}>
      This post discusses suicidal ideation, and some people might find it disturbing. If you or
      someone you know is suicidal, please, contact your physician, go to your local ER, or call the
      suicide prevention hotline in local community. If you don’t know the details, contact 211 to
      find the contact information.
    </Text>
  )
}
