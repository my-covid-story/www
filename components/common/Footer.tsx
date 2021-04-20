import { Box, Button as BaseButton, Center } from '@chakra-ui/react'

export default function Footer({ children }) {
  return (
    <Center
      pos="fixed"
      bottom={0}
      left={0}
      right={0}
      p={4}
      borderTopRadius="8px"
      boxShadow="0px -4px 4px rgba(0, 0, 0, 0.1)"
      bg="white"
    >
      {children}
    </Center>
  )
}

export function FooterSpace() {
  return <Box h="72px" />
}

export function Button({ children, ...props }) {
  return (
    <BaseButton
      py={2}
      px={8}
      bg="#55099D"
      color="white"
      borderRadius="4px"
      fontWeight={600}
      {...props}
    >
      {children}
    </BaseButton>
  )
}
