import { chakra, Flex, Heading, Spinner, Text } from '@chakra-ui/react'

interface ErrorPageProps {
  heading?: string
  description?: string
}

/**
 * A reusable fallback page.
 * @param message the message to display with the loading state.
 */
export default function FallbackPage({ heading, description }: ErrorPageProps) {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100%"
      flexDirection="column"
      py="100px"
    >
      {heading && <Heading>{heading}</Heading>}

      {description && <Text>{description}</Text>}

      {/* Use Chakra factory for easy styling through props. */}
      <chakra.img
        src="/svg/under-construction.svg"
        alt="Error illustration"
        width="75%"
        maxWidth="450px"
        my="50px"
      />

      <Spinner color="primary.100" />
    </Flex>
  )
}
